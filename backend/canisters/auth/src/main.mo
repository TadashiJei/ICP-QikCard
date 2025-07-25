import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Array "mo:base/Array";

actor Auth {
    type UserId = Principal;
    type SessionId = Text;
    
    type UserProfile = {
        principal: UserId;
        displayName: Text;
        email: Text;
        roles: [Text];
        createdAt: Time.Time;
        lastLogin: Time.Time;
    };
    
    type Session = {
        sessionId: SessionId;
        principal: UserId;
        expiresAt: Time.Time;
        deviceInfo: Text;
    };
    
    type Role = {
        name: Text;
        permissions: [Text];
    };
    
    // State
    private stable var users: HashMap.HashMap<UserId, UserProfile> = HashMap.HashMap<UserId, UserProfile>(0, Principal.equal, Principal.hash);
    private stable var sessions: HashMap.HashMap<SessionId, Session> = HashMap.HashMap<SessionId, Session>(0, Text.equal, Text.hash);
    private stable var roles: HashMap.HashMap<Text, Role> = HashMap.HashMap<Text, Role>(0, Text.equal, Text.hash);
    
    // Initialize default roles
    system func preupgrade() {
        // Save state before upgrade
    };
    
    system func postupgrade() {
        // Restore state after upgrade
        // Initialize default roles if not exists
        if (roles.get("user") == null) {
            roles.put("user", {
                name = "user";
                permissions = ["read_events", "check_in", "view_profile"];
            });
        };
        
        if (roles.get("organizer") == null) {
            roles.put("organizer", {
                name = "organizer";
                permissions = ["create_events", "manage_events", "view_analytics", "read_events", "check_in", "view_profile"];
            });
        };
        
        if (roles.get("admin") == null) {
            roles.put("admin", {
                name = "admin";
                permissions = ["*"]; // All permissions
            });
        };
    };
    
    // Public functions
    public shared(msg) func registerUser(displayName: Text, email: Text): async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case (?existingUser) {
                return #err("User already registered");
            };
            case null {
                let now = Time.now();
                let newUser: UserProfile = {
                    principal = caller;
                    displayName = displayName;
                    email = email;
                    roles = ["user"];
                    createdAt = now;
                    lastLogin = now;
                };
                
                users.put(caller, newUser);
                return #ok(newUser);
            };
        };
    };
    
    public shared(msg) func login(deviceInfo: Text): async Result.Result<Session, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case (?user) {
                let sessionId = generateSessionId();
                let now = Time.now();
                let expiresAt = now + 24 * 60 * 60 * 1000000000; // 24 hours
                
                let session: Session = {
                    sessionId = sessionId;
                    principal = caller;
                    expiresAt = expiresAt;
                    deviceInfo = deviceInfo;
                };
                
                sessions.put(sessionId, session);
                
                // Update last login
                var updatedUser = user;
                updatedUser.lastLogin := now;
                users.put(caller, updatedUser);
                
                return #ok(session);
            };
            case null {
                return #err("User not found");
            };
        };
    };
    
    public shared(msg) func logout(sessionId: SessionId): async Result.Result<(), Text> {
        switch (sessions.get(sessionId)) {
            case (?session) {
                if (session.principal != msg.caller) {
                    return #err("Unauthorized");
                };
                sessions.remove(sessionId);
                return #ok(());
            };
            case null {
                return #err("Session not found");
            };
        };
    };
    
    public query func getUser(principal: UserId): async Result.Result<UserProfile, Text> {
        switch (users.get(principal)) {
            case (?user) { #ok(user) };
            case null { #err("User not found") };
        };
    };
    
    public query func getCurrentUser(): async Result.Result<UserProfile, Text> {
        // This would typically use the session to identify the user
        // For now, return error as this needs session validation
        #err("Use getUser with specific principal or implement session-based lookup")
    };
    
    public shared(msg) func updateUserProfile(displayName: Text, email: Text): async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        
        switch (users.get(caller)) {
            case (?user) {
                var updatedUser = user;
                updatedUser.displayName := displayName;
                updatedUser.email := email;
                users.put(caller, updatedUser);
                return #ok(updatedUser);
            };
            case null {
                return #err("User not found");
            };
        };
    };
    
    public query func validateSession(sessionId: SessionId): async Result.Result<UserId, Text> {
        switch (sessions.get(sessionId)) {
            case (?session) {
                let now = Time.now();
                if (session.expiresAt < now) {
                    sessions.remove(sessionId);
                    return #err("Session expired");
                };
                return #ok(session.principal);
            };
            case null {
                return #err("Session not found");
            };
        };
    };
    
    public query func hasPermission(principal: UserId, permission: Text): async Bool {
        switch (users.get(principal)) {
            case (?user) {
                for (roleName in user.roles.vals()) {
                    switch (roles.get(roleName)) {
                        case (?role) {
                            if (Array.find<Text>(role.permissions, func(p) { p == permission }) != null or 
                                Array.find<Text>(role.permissions, func(p) { p == "*" }) != null) {
                                return true;
                            };
                        };
                        case null {};
                    };
                };
                false
            };
            case null { false };
        };
    };
    
    // Helper functions
    private func generateSessionId(): SessionId {
        let now = Time.now();
        let random = Time.now(); // Simple random generation
        Text.concat("session_", Text.concat(Principal.toText(Principal.fromActor(Auth)), Text.fromInt(now)))
    };
    
    // Admin functions
    public shared(msg) func assignRole(userPrincipal: UserId, roleName: Text): async Result.Result<(), Text> {
        // Only admin can assign roles
        if (not await hasPermission(msg.caller, "manage_roles")) {
            return #err("Unauthorized: Admin access required");
        };
        
        switch (users.get(userPrincipal)) {
            case (?user) {
                var updatedUser = user;
                if (Array.find<Text>(user.roles, func(r) { r == roleName }) == null) {
                    updatedUser.roles := Array.append(user.roles, [roleName]);
                    users.put(userPrincipal, updatedUser);
                };
                return #ok(());
            };
            case null {
                return #err("User not found");
            };
        };
    };
};
