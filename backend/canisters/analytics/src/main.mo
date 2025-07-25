import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Float "mo:base/Float";

actor Analytics {
    type UserId = Principal;
    type EventId = Text;
    type QikPointId = Text;
    type ReportId = Text;
    
    type AnalyticsEvent = {
        id: Text;
        type: Text;
        userPrincipal: ?UserId;
        eventId: ?EventId;
        timestamp: Time.Time;
        data: HashMap.HashMap<Text, Text>;
    };
    
    type Metric = {
        name: Text;
        value: Float;
        timestamp: Time.Time;
        category: Text;
        dimensions: HashMap.HashMap<Text, Text>;
    };
    
    type Report = {
        id: ReportId;
        type: Text;
        title: Text;
        description: Text;
        data: HashMap.HashMap<Text, Text>;
        generatedAt: Time.Time;
        filters: HashMap.HashMap<Text, Text>;
        period: {
            start: Time.Time;
            end: Time.Time;
        };
    };
    
    type DashboardMetrics = {
        totalUsers: Nat;
        totalEvents: Nat;
        totalCheckIns: Nat;
        activeUsers: Nat;
        avgEventAttendance: Float;
        topEvents: [EventAnalytics];
        userGrowth: [TimeSeriesData];
        eventGrowth: [TimeSeriesData];
    };
    
    type EventAnalytics = {
        eventId: EventId;
        name: Text;
        totalAttendees: Nat;
        uniqueAttendees: Nat;
        checkInRate: Float;
        peakAttendanceTime: Time.Time;
        avgCheckInDuration: Float;
        qikPointUsage: [QikPointAnalytics];
    };
    
    type QikPointAnalytics = {
        deviceId: QikPointId;
        totalScans: Nat;
        successRate: Float;
        avgResponseTime: Float;
        lastUsed: Time.Time;
    };
    
    type TimeSeriesData = {
        timestamp: Time.Time;
        value: Float;
        label: Text;
    };
    
    type UserAnalytics = {
        userPrincipal: UserId;
        totalEventsAttended: Nat;
        totalEventsOrganized: Nat;
        favoriteEventType: Text;
        avgCheckInTime: Float;
        streak: Nat;
        achievements: Nat;
        socialConnections: Nat;
    };
    
    // State
    private stable var events: HashMap.HashMap<Text, AnalyticsEvent> = HashMap.HashMap<Text, AnalyticsEvent>(0, Text.equal, Text.hash);
    private stable var metrics: HashMap.HashMap<Text, [Metric]> = HashMap.HashMap<Text, [Metric]>(0, Text.equal, Text.hash);
    private stable var reports: HashMap.HashMap<ReportId, Report> = HashMap.HashMap<ReportId, Report>(0, Text.equal, Text.hash);
    private stable var eventAnalytics: HashMap.HashMap<EventId, EventAnalytics> = HashMap.HashMap<EventId, EventAnalytics>(0, Text.equal, Text.hash);
    private stable var userAnalytics: HashMap.HashMap<UserId, UserAnalytics> = HashMap.HashMap<UserId, UserAnalytics>(0, Principal.equal, Principal.hash);
    private stable var nextEventId: Nat = 1;
    
    // Event tracking
    public shared(msg) func trackEvent(
        eventType: Text,
        userPrincipal: ?UserId,
        eventId: ?EventId,
        data: HashMap.HashMap<Text, Text>
    ): async Result.Result<Text, Text> {
        let eventIdStr = generateEventId();
        let now = Time.now();
        
        let analyticsEvent: AnalyticsEvent = {
            id = eventIdStr;
            type = eventType;
            userPrincipal = userPrincipal;
            eventId = eventId;
            timestamp = now;
            data = data;
        };
        
        events.put(eventIdStr, analyticsEvent);
        
        // Update related analytics
        switch (userPrincipal) {
            case (?user) {
                updateUserAnalytics(user, eventType, data);
            };
            case null {};
        };
        
        switch (eventId) {
            case (?eid) {
                updateEventAnalytics(eid, eventType, data);
            };
            case null {};
        };
        
        return #ok(eventIdStr);
    };
    
    // Metric collection
    public shared(msg) func recordMetric(
        name: Text,
        value: Float,
        category: Text,
        dimensions: HashMap.HashMap<Text, Text>
    ): async Result.Result<(), Text> {
        let now = Time.now();
        
        let metric: Metric = {
            name = name;
            value = value;
            timestamp = now;
            category = category;
            dimensions = dimensions;
        };
        
        let existingMetrics = Option.get(metrics.get(name), []);
        metrics.put(name, Array.append(existingMetrics, [metric]));
        
        return #ok(());
    };
    
    // Report generation
    public shared(msg) func generateReport(
        reportType: Text,
        title: Text,
        description: Text,
        filters: HashMap.HashMap<Text, Text>,
        period: {
            start: Time.Time;
            end: Time.Time;
        }
    ): async Result.Result<Report, Text> {
        let reportId = generateReportId();
        let now = Time.now();
        
        let reportData = switch (reportType) {
            case "dashboard" {
                generateDashboardReport(period)
            };
            case "event" {
                switch (filters.get("eventId")) {
                    case (?eventId) {
                        generateEventReport(eventId, period)
                    };
                    case null {
                        return #err("Event ID required for event report");
                    };
                }
            };
            case "user" {
                switch (filters.get("userPrincipal")) {
                    case (?userPrincipal) {
                        let principal = Principal.fromText(userPrincipal);
                        generateUserReport(principal, period)
                    };
                    case null {
                        return #err("User principal required for user report");
                    };
                }
            };
            case _ {
                return #err("Unsupported report type");
            };
        };
        
        let report: Report = {
            id = reportId;
            type = reportType;
            title = title;
            description = description;
            data = reportData;
            generatedAt = now;
            filters = filters;
            period = period;
        };
        
        reports.put(reportId, report);
        return #ok(report);
    };
    
    // Analytics calculations
    private func updateUserAnalytics(userPrincipal: UserId, eventType: Text, data: HashMap.HashMap<Text, Text>) {
        switch (userAnalytics.get(userPrincipal)) {
            case (?analytics) {
                var updated = analytics;
                
                switch (eventType) {
                    case "check_in" {
                        updated.totalEventsAttended := analytics.totalEventsAttended + 1;
                    };
                    case "event_created" {
                        updated.totalEventsOrganized := analytics.totalEventsOrganized + 1;
                    };
                    case _ {};
                };
                
                userAnalytics.put(userPrincipal, updated);
            };
            case null {
                let newAnalytics: UserAnalytics = {
                    userPrincipal = userPrincipal;
                    totalEventsAttended = if (eventType == "check_in") 1 else 0;
                    totalEventsOrganized = if (eventType == "event_created") 1 else 0;
                    favoriteEventType = "general";
                    avgCheckInTime = 0.0;
                    streak = 0;
                    achievements = 0;
                    socialConnections = 0;
                };
                userAnalytics.put(userPrincipal, newAnalytics);
            };
        };
    };
    
    private func updateEventAnalytics(eventId: EventId, eventType: Text, data: HashMap.HashMap<Text, Text>) {
        switch (eventAnalytics.get(eventId)) {
            case (?analytics) {
                var updated = analytics;
                
                switch (eventType) {
                    case "check_in" {
                        updated.totalAttendees := analytics.totalAttendees + 1;
                        updated.uniqueAttendees := analytics.uniqueAttendees + 1;
                    };
                    case _ {};
                };
                
                eventAnalytics.put(eventId, updated);
            };
            case null {
                // This would typically be populated when event is created
                let newAnalytics: EventAnalytics = {
                    eventId = eventId;
                    name = Option.get(data.get("eventName"), "Unknown Event");
                    totalAttendees = if (eventType == "check_in") 1 else 0;
                    uniqueAttendees = if (eventType == "check_in") 1 else 0;
                    checkInRate = 0.0;
                    peakAttendanceTime = Time.now();
                    avgCheckInDuration = 0.0;
                    qikPointUsage = [];
                };
                eventAnalytics.put(eventId, newAnalytics);
            };
        };
    };
    
    // Report generation functions
    private func generateDashboardReport(period: { start: Time.Time; end: Time.Time }): HashMap.HashMap<Text, Text> {
        let allEvents = Array.filter<(Text, AnalyticsEvent)>(
            Array.freeze(HashMap.toArray(events)),
            func(pair) {
                let event = pair.1;
                event.timestamp >= period.start and event.timestamp <= period.end
            }
        );
        
        let totalUsers = Float.fromInt(userAnalytics.size());
        let totalEvents = Float.fromInt(eventAnalytics.size());
        let totalCheckIns = Float.fromInt(Array.size(allEvents));
        
        let reportData = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
        reportData.put("totalUsers", Float.toText(totalUsers));
        reportData.put("totalEvents", Float.toText(totalEvents));
        reportData.put("totalCheckIns", Float.toText(totalCheckIns));
        reportData.put("avgEventAttendance", Float.toText(totalCheckIns / totalEvents));
        
        reportData
    };
    
    private func generateEventReport(eventId: EventId, period: { start: Time.Time; end: Time.Time }): HashMap.HashMap<Text, Text> {
        switch (eventAnalytics.get(eventId)) {
            case (?analytics) {
                let reportData = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
                reportData.put("eventId", eventId);
                reportData.put("name", analytics.name);
                reportData.put("totalAttendees", Nat.toText(analytics.totalAttendees));
                reportData.put("uniqueAttendees", Nat.toText(analytics.uniqueAttendees));
                reportData.put("checkInRate", Float.toText(analytics.checkInRate));
                reportData.put("peakAttendanceTime", Time.toText(analytics.peakAttendanceTime));
                
                reportData
            };
            case null {
                let empty = HashMap.HashMap<Text, Text>(1, Text.equal, Text.hash);
                empty.put("error", "Event not found");
                empty
            };
        };
    };
    
    private func generateUserReport(userPrincipal: UserId, period: { start: Time.Time; end: Time.Time }): HashMap.HashMap<Text, Text> {
        switch (userAnalytics.get(userPrincipal)) {
            case (?analytics) {
                let reportData = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
                reportData.put("userPrincipal", Principal.toText(userPrincipal));
                reportData.put("totalEventsAttended", Nat.toText(analytics.totalEventsAttended));
                reportData.put("totalEventsOrganized", Nat.toText(analytics.totalEventsOrganized));
                reportData.put("favoriteEventType", analytics.favoriteEventType);
                reportData.put("avgCheckInTime", Float.toText(analytics.avgCheckInTime));
                reportData.put("streak", Nat.toText(analytics.streak));
                reportData.put("achievements", Nat.toText(analytics.achievements));
                reportData.put("socialConnections", Nat.toText(analytics.socialConnections));
                
                reportData
            };
            case null {
                let empty = HashMap.HashMap<Text, Text>(1, Text.equal, Text.hash);
                empty.put("error", "User not found");
                empty
            };
        };
    };
    
    // Query functions
    public query func getDashboardMetrics(): async DashboardMetrics {
        let now = Time.now();
        let period = {
            start = now - 30 * 24 * 60 * 60 * 1000000000; // 30 days ago
            end = now;
        };
        
        let reportData = generateDashboardReport(period);
        
        let metrics: DashboardMetrics = {
            totalUsers = userAnalytics.size();
            totalEvents = eventAnalytics.size();
            totalCheckIns = 0; // This would be calculated from events
            activeUsers = 0; // This would be calculated from recent activity
            avgEventAttendance = 0.0; // This would be calculated
            topEvents = []; // This would be populated
            userGrowth = []; // This would be calculated
            eventGrowth = []; // This would be calculated
        };
        
        metrics
    };
    
    public query func getEventAnalytics(eventId: EventId): async Result.Result<EventAnalytics, Text> {
        switch (eventAnalytics.get(eventId)) {
            case (?analytics) { #ok(analytics) };
            case null { #err("Event analytics not found") };
        };
    };
    
    public query func getUserAnalytics(userPrincipal: UserId): async Result.Result<UserAnalytics, Text> {
        switch (userAnalytics.get(userPrincipal)) {
            case (?analytics) { #ok(analytics) };
            case null { #err("User analytics not found") };
        };
    };
    
    public query func getReport(reportId: ReportId): async Result.Result<Report, Text> {
        switch (reports.get(reportId)) {
            case (?report) { #ok(report) };
            case null { #err("Report not found") };
        };
    };
    
    public query func getEvents(
        eventType: ?Text,
        userPrincipal: ?UserId,
        eventId: ?EventId,
        limit: Nat
    ): async [AnalyticsEvent] {
        let allEvents = Array.map<(Text, AnalyticsEvent), AnalyticsEvent>(
            Array.freeze(HashMap.toArray(events)),
            func(pair) { pair.1 }
        );
        
        let filtered = Array.filter<AnalyticsEvent>(allEvents, func(event) {
            var matches = true;
            
            switch (eventType) {
                case (?type) {
                    matches := matches and (event.type == type);
                };
                case null {};
            };
            
            switch (userPrincipal) {
                case (?user) {
                    matches := matches and (event.userPrincipal == ?user);
                };
                case null {};
            };
            
            switch (eventId) {
                case (?eid) {
                    matches := matches and (event.eventId == ?eid);
                };
                case null {};
            };
            
            matches
        });
        
        Array.take<AnalyticsEvent>(filtered, limit)
    };
    
    public query func getMetrics(
        name: Text,
        category: ?Text,
        limit: Nat
    ): async [Metric] {
        switch (metrics.get(name)) {
            case (?metricList) {
                let filtered = Array.filter<Metric>(metricList, func(metric) {
                    switch (category) {
                        case (?cat) { metric.category == cat };
                        case null { true };
                    }
                });
                Array.take<Metric>(filtered, limit)
            };
            case null { [] };
        }
    };
    
    // Helper functions
    private func generateEventId(): Text {
        let id = nextEventId;
        nextEventId += 1;
        Text.concat("analytics_", Text.fromInt(id))
    };
    
    private func generateReportId(): ReportId {
        let now = Time.now();
        Text.concat("report_", Text.fromInt(Int.abs(Time.toInt(now))))
    };
};
