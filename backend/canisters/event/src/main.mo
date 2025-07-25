import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor Event {
    type EventId = Text;
    type UserId = Principal;
    type QikPointId = Text;
    
    type EventStatus = {
        #DRAFT;
        #ACTIVE;
        #COMPLETED;
        #CANCELLED;
    };
    
    type Event = {
        id: EventId;
        name: Text;
        description: Text;
        location: Text;
        startTime: Time.Time;
        endTime: Time.Time;
        organizer: UserId;
        status: EventStatus;
        maxAttendees: Nat;
        currentAttendees: Nat;
        qrCode: Text;
        nfcTag: Text;
        createdAt: Time.Time;
        updatedAt: Time.Time;
    };
    
    type AttendanceRecord = {
        eventId: EventId;
        userPrincipal: UserId;
        checkInTime: Time.Time;
        checkOutTime: ?Time.Time;
        qikPointId: ?QikPointId;
        verified: Bool;
    };
    
    type QikPointDevice = {
        deviceId: QikPointId;
        location: Text;
        status: {
            #ONLINE;
            #OFFLINE;
            #MAINTENANCE;
        };
        lastSeen: Time.Time;
        assignedEvent: ?EventId;
    };
    
    // State
    private stable var events: HashMap.HashMap<EventId, Event> = HashMap.HashMap<EventId, Event>(0, Text.equal, Text.hash);
    private stable var attendanceRecords: HashMap.HashMap<(EventId, UserId), AttendanceRecord> = 
        HashMap.HashMap<(EventId, UserId), AttendanceRecord>(0, func(a, b) { a.0 == b.0 and a.1 == b.1 }, func(pair) { Text.hash(pair.0) });
    private stable var qikPointDevices: HashMap.HashMap<QikPointId, QikPointDevice> = 
        HashMap.HashMap<QikPointId, QikPointDevice>(0, Text.equal, Text.hash);
    private stable var nextEventId: Nat = 1;
    
    // Event management
    public shared(msg) func createEvent(
        name: Text,
        description: Text,
        location: Text,
        startTime: Time.Time,
        endTime: Time.Time,
        maxAttendees: Nat
    ): async Result.Result<Event, Text> {
        let caller = msg.caller;
        let eventId = generateEventId();
        let now = Time.now();
        
        let newEvent: Event = {
            id = eventId;
            name = name;
            description = description;
            location = location;
            startTime = startTime;
            endTime = endTime;
            organizer = caller;
            status = #DRAFT;
            maxAttendees = maxAttendees;
            currentAttendees = 0;
            qrCode = generateQRCode(eventId);
            nfcTag = generateNFCTag(eventId);
            createdAt = now;
            updatedAt = now;
        };
        
        events.put(eventId, newEvent);
        return #ok(newEvent);
    };
    
    public shared(msg) func updateEvent(
        eventId: EventId,
        name: Text,
        description: Text,
        location: Text,
        startTime: Time.Time,
        endTime: Time.Time,
        maxAttendees: Nat
    ): async Result.Result<Event, Text> {
        switch (events.get(eventId)) {
            case (?event) {
                if (event.organizer != msg.caller) {
                    return #err("Only organizer can update event");
                };
                
                var updatedEvent = event;
                updatedEvent.name := name;
                updatedEvent.description := description;
                updatedEvent.location := location;
                updatedEvent.startTime := startTime;
                updatedEvent.endTime := endTime;
                updatedEvent.maxAttendees := maxAttendees;
                updatedEvent.updatedAt := Time.now();
                
                events.put(eventId, updatedEvent);
                return #ok(updatedEvent);
            };
            case null {
                return #err("Event not found");
            };
        };
    };
    
    public shared(msg) func activateEvent(eventId: EventId): async Result.Result<(), Text> {
        switch (events.get(eventId)) {
            case (?event) {
                if (event.organizer != msg.caller) {
                    return #err("Only organizer can activate event");
                };
                
                var updatedEvent = event;
                updatedEvent.status := #ACTIVE;
                updatedEvent.updatedAt := Time.now();
                
                events.put(eventId, updatedEvent);
                return #ok(());
            };
            case null {
                return #err("Event not found");
            };
        };
    };
    
    public shared(msg) func completeEvent(eventId: EventId): async Result.Result<(), Text> {
        switch (events.get(eventId)) {
            case (?event) {
                if (event.organizer != msg.caller) {
                    return #err("Only organizer can complete event");
                };
                
                var updatedEvent = event;
                updatedEvent.status := #COMPLETED;
                updatedEvent.updatedAt := Time.now();
                
                events.put(eventId, updatedEvent);
                return #ok(());
            };
            case null {
                return #err("Event not found");
            };
        };
    };
    
    // Attendance management
    public shared(msg) func checkIn(
        eventId: EventId,
        qikPointId: ?QikPointId
    ): async Result.Result<AttendanceRecord, Text> {
        let caller = msg.caller;
        
        switch (events.get(eventId)) {
            case (?event) {
                if (event.status != #ACTIVE) {
                    return #err("Event is not active");
                };
                
                if (event.currentAttendees >= event.maxAttendees) {
                    return #err("Event is full");
                };
                
                let key = (eventId, caller);
                switch (attendanceRecords.get(key)) {
                    case (?record) {
                        return #err("Already checked in");
                    };
                    case null {
                        let now = Time.now();
                        let record: AttendanceRecord = {
                            eventId = eventId;
                            userPrincipal = caller;
                            checkInTime = now;
                            checkOutTime = null;
                            qikPointId = qikPointId;
                            verified = true;
                        };
                        
                        attendanceRecords.put(key, record);
                        
                        // Update event attendee count
                        var updatedEvent = event;
                        updatedEvent.currentAttendees := event.currentAttendees + 1;
                        events.put(eventId, updatedEvent);
                        
                        return #ok(record);
                    };
                };
            };
            case null {
                return #err("Event not found");
            };
        };
    };
    
    public shared(msg) func checkOut(eventId: EventId): async Result.Result<AttendanceRecord, Text> {
        let caller = msg.caller;
        let key = (eventId, caller);
        
        switch (attendanceRecords.get(key)) {
            case (?record) {
                if (record.checkOutTime != null) {
                    return #err("Already checked out");
                };
                
                var updatedRecord = record;
                updatedRecord.checkOutTime := ?Time.now();
                attendanceRecords.put(key, updatedRecord);
                
                return #ok(updatedRecord);
            };
            case null {
                return #err("No check-in record found");
            };
        };
    };
    
    // QikPoint device management
    public shared(msg) func registerQikPointDevice(
        deviceId: QikPointId,
        location: Text
    ): async Result.Result<QikPointDevice, Text> {
        let now = Time.now();
        
        switch (qikPointDevices.get(deviceId)) {
            case (?device) {
                return #err("Device already registered");
            };
            case null {
                let device: QikPointDevice = {
                    deviceId = deviceId;
                    location = location;
                    status = #ONLINE;
                    lastSeen = now;
                    assignedEvent = null;
                };
                
                qikPointDevices.put(deviceId, device);
                return #ok(device);
            };
        };
    };
    
    public shared(msg) func updateQikPointStatus(
        deviceId: QikPointId,
        status: {
            #ONLINE;
            #OFFLINE;
            #MAINTENANCE;
        }
    ): async Result.Result<(), Text> {
        switch (qikPointDevices.get(deviceId)) {
            case (?device) {
                var updatedDevice = device;
                updatedDevice.status := status;
                updatedDevice.lastSeen := Time.now();
                qikPointDevices.put(deviceId, updatedDevice);
                return #ok(());
            };
            case null {
                return #err("Device not found");
            };
        };
    };
    
    // Query functions
    public query func getEvent(eventId: EventId): async Result.Result<Event, Text> {
        switch (events.get(eventId)) {
            case (?event) { #ok(event) };
            case null { #err("Event not found") };
        };
    };
    
    public query func getAllEvents(): async [Event] {
        Array.map<(EventId, Event), Event>(
            Array.freeze(HashMap.toArray(events)),
            func(pair) { pair.1 }
        )
    };
    
    public query func getActiveEvents(): async [Event] {
        Array.filter<Event>(
            Array.map<(EventId, Event), Event>(
                Array.freeze(HashMap.toArray(events)),
                func(pair) { pair.1 }
            ),
            func(event) { event.status == #ACTIVE }
        )
    };
    
    public query func getUserAttendance(userPrincipal: UserId): async [AttendanceRecord] {
        Array.filter<AttendanceRecord>(
            Array.map<((EventId, UserId), AttendanceRecord), AttendanceRecord>(
                Array.freeze(HashMap.toArray(attendanceRecords)),
                func(pair) { pair.1 }
            ),
            func(record) { record.userPrincipal == userPrincipal }
        )
    };
    
    public query func getEventAttendance(eventId: EventId): async [AttendanceRecord] {
        Array.filter<AttendanceRecord>(
            Array.map<((EventId, UserId), AttendanceRecord), AttendanceRecord>(
                Array.freeze(HashMap.toArray(attendanceRecords)),
                func(pair) { pair.1 }
            ),
            func(record) { record.eventId == eventId }
        )
    };
    
    public query func getQikPointDevice(deviceId: QikPointId): async Result.Result<QikPointDevice, Text> {
        switch (qikPointDevices.get(deviceId)) {
            case (?device) { #ok(device) };
            case null { #err("Device not found") };
        };
    };
    
    public query func getAllQikPointDevices(): async [QikPointDevice] {
        Array.map<(QikPointId, QikPointDevice), QikPointDevice>(
            Array.freeze(HashMap.toArray(qikPointDevices)),
            func(pair) { pair.1 }
        )
    };
    
    // Helper functions
    private func generateEventId(): EventId {
        let id = nextEventId;
        nextEventId += 1;
        Text.concat("event_", Text.fromInt(id))
    };
    
    private func generateQRCode(eventId: EventId): Text {
        Text.concat("QR_", eventId)
    };
    
    private func generateNFCTag(eventId: EventId): Text {
        Text.concat("NFC_", eventId)
    };
};
