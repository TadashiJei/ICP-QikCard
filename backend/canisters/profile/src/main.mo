import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Nat "mo:base/Nat";

actor Profile {
    type UserId = Principal;
    type AchievementId = Text;
    
    type UserProfile = {
        principal: UserId;
        username: Text;
        displayName: Text;
        bio: Text;
        avatar: Text;
        achievements: [Achievement];
        reputation: Nat;
        level: Nat;
        totalEventsAttended: Nat;
        totalEventsOrganized: Nat;
        joinDate: Time.Time;
        lastActivity: Time.Time;
        isVerified: Bool;
        socialLinks: [SocialLink];
    };
    
    type Achievement = {
        id: AchievementId;
        title: Text;
        description: Text;
        icon: Text;
        rarity: {
            #COMMON;
            #RARE;
            #EPIC;
            #LEGENDARY;
        };
        earnedAt: Time.Time;
        progress: Nat;
        maxProgress: Nat;
    };
    
    type SocialLink = {
        platform: Text;
        url: Text;
        verified: Bool;
    };
    
    type SocialConnection = {
        userPrincipal: UserId;
        friendPrincipal: UserId;
        connectionType: {
            #FRIEND;
            #FOLLOWER;
            #FOLLOWING;
        };
        connectedAt: Time.Time;
        mutual: Bool;
    };
    
    type UserStats = {
        totalEventsAttended: Nat;
        totalEventsOrganized: Nat;
        totalAchievements: Nat;
        totalFriends: Nat;
        reputation: Nat;
        level: Nat;
        streak: Nat;
    };
    
    // State
    private stable var profiles: HashMap.HashMap<UserId, UserProfile> = HashMap.HashMap<UserId, UserProfile>(0, Principal.equal, Principal.hash);
    private stable var socialConnections: HashMap.HashMap<(UserId, UserId), SocialConnection> = 
        HashMap.HashMap<(UserId, UserId), SocialConnection>(0, func(a, b) { a.0 == b.0 and a.1 == b.1 }, func(pair) { Principal.hash(pair.0) });
    private stable var usernameToPrincipal: HashMap.HashMap<Text, UserId> = HashMap.HashMap<Text, UserId>(0, Text.equal, Text.hash);
    
    // Profile management
    public shared(msg) func createProfile(
        username: Text,
        displayName: Text,
        bio: Text,
        avatar: Text
    ): async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        let now = Time.now();
        
        // Check if username is taken
        if (usernameToPrincipal.get(username) != null) {
            return #err("Username already taken");
        };
        
        // Check if profile already exists
        switch (profiles.get(caller)) {
            case (?profile) {
                return #err("Profile already exists");
            };
            case null {
                let newProfile: UserProfile = {
                    principal = caller;
                    username = username;
                    displayName = displayName;
                    bio = bio;
                    avatar = avatar;
                    achievements = [];
                    reputation = 100; // Starting reputation
                    level = 1;
                    totalEventsAttended = 0;
                    totalEventsOrganized = 0;
                    joinDate = now;
                    lastActivity = now;
                    isVerified = false;
                    socialLinks = [];
                };
                
                profiles.put(caller, newProfile);
                usernameToPrincipal.put(username, caller);
                return #ok(newProfile);
            };
        };
    };
    
    public shared(msg) func updateProfile(
        displayName: Text,
        bio: Text,
        avatar: Text,
        socialLinks: [SocialLink]
    ): async Result.Result<UserProfile, Text> {
        let caller = msg.caller;
        
        switch (profiles.get(caller)) {
            case (?profile) {
                var updatedProfile = profile;
                updatedProfile.displayName := displayName;
                updatedProfile.bio := bio;
                updatedProfile.avatar := avatar;
                updatedProfile.socialLinks := socialLinks;
                updatedProfile.lastActivity := Time.now();
                
                profiles.put(caller, updatedProfile);
                return #ok(updatedProfile);
            };
            case null {
                return #err("Profile not found");
            };
        };
    };
    
    public shared(msg) func updateUsername(newUsername: Text): async Result.Result<(), Text> {
        let caller = msg.caller;
        
        switch (profiles.get(caller)) {
            case (?profile) {
                if (usernameToPrincipal.get(newUsername) != null and newUsername != profile.username) {
                    return #err("Username already taken");
                };
                
                // Remove old username mapping
                usernameToPrincipal.remove(profile.username);
                
                // Update username
                var updatedProfile = profile;
                updatedProfile.username := newUsername;
                profiles.put(caller, updatedProfile);
                
                // Add new username mapping
                usernameToPrincipal.put(newUsername, caller);
                
                return #ok(());
            };
            case null {
                return #err("Profile not found");
            };
        };
    };
    
    // Achievement management
    public shared(msg) func addAchievement(
        userPrincipal: UserId,
        achievement: Achievement
    ): async Result.Result<(), Text> {
        // In production, this would be restricted to authorized services
        
        switch (profiles.get(userPrincipal)) {
            case (?profile) {
                var updatedProfile = profile;
                
                // Check if achievement already exists
                let existingAchievements = Array.filter<Achievement>(
                    profile.achievements,
                    func(a) { a.id == achievement.id }
                );
                
                if (existingAchievements.size() > 0) {
                    return #err("Achievement already earned");
                };
                
                updatedProfile.achievements := Array.append(profile.achievements, [achievement]);
                updatedProfile.reputation := profile.reputation + calculateReputationGain(achievement.rarity);
                updatedProfile.level := calculateLevel(updatedProfile.reputation);
                updatedProfile.lastActivity := Time.now();
                
                profiles.put(userPrincipal, updatedProfile);
                return #ok(());
            };
            case null {
                return #err("Profile not found");
            };
        };
    };
    
    public shared(msg) func incrementEventsAttended(userPrincipal: UserId): async Result.Result<(), Text> {
        // In production, this would be restricted to authorized services
        
        switch (profiles.get(userPrincipal)) {
            case (?profile) {
                var updatedProfile = profile;
                updatedProfile.totalEventsAttended := profile.totalEventsAttended + 1;
                updatedProfile.reputation := profile.reputation + 10; // 10 points per event
                updatedProfile.level := calculateLevel(updatedProfile.reputation);
                updatedProfile.lastActivity := Time.now();
                
                profiles.put(userPrincipal, updatedProfile);
                return #ok(());
            };
            case null {
                return #err("Profile not found");
            };
        };
    };
    
    public shared(msg) func incrementEventsOrganized(userPrincipal: UserId): async Result.Result<(), Text> {
        // In production, this would be restricted to authorized services
        
        switch (profiles.get(userPrincipal)) {
            case (?profile) {
                var updatedProfile = profile;
                updatedProfile.totalEventsOrganized := profile.totalEventsOrganized + 1;
                updatedProfile.reputation := profile.reputation + 50; // 50 points per organized event
                updatedProfile.level := calculateLevel(updatedProfile.reputation);
                updatedProfile.lastActivity := Time.now();
                
                profiles.put(userPrincipal, updatedProfile);
                return #ok(());
            };
            case null {
                return #err("Profile not found");
            };
        };
    };
    
    // Social connections
    public shared(msg) func sendFriendRequest(friendPrincipal: UserId): async Result.Result<(), Text> {
        let caller = msg.caller;
        
        if (caller == friendPrincipal) {
            return #err("Cannot send friend request to yourself");
        };
        
        let key = (caller, friendPrincipal);
        switch (socialConnections.get(key)) {
            case (?connection) {
                return #err("Connection already exists");
            };
            case null {
                let connection: SocialConnection = {
                    userPrincipal = caller;
                    friendPrincipal = friendPrincipal;
                    connectionType = #FOLLOWING;
                    connectedAt = Time.now();
                    mutual = false;
                };
                
                socialConnections.put(key, connection);
                
                // Check if mutual connection exists
                let reverseKey = (friendPrincipal, caller);
                switch (socialConnections.get(reverseKey)) {
                    case (?reverseConnection) {
                        // Update both connections to mutual
                        var updatedConnection = connection;
                        updatedConnection.mutual := true;
                        socialConnections.put(key, updatedConnection);
                        
                        var updatedReverse = reverseConnection;
                        updatedReverse.mutual := true;
                        socialConnections.put(reverseKey, updatedReverse);
                    };
                    case null {};
                };
                
                return #ok(());
            };
        };
    };
    
    public shared(msg) func removeFriend(friendPrincipal: UserId): async Result.Result<(), Text> {
        let caller = msg.caller;
        let key = (caller, friendPrincipal);
        
        switch (socialConnections.get(key)) {
            case (?connection) {
                socialConnections.remove(key);
                
                // Update reverse connection if exists
                let reverseKey = (friendPrincipal, caller);
                switch (socialConnections.get(reverseKey)) {
                    case (?reverseConnection) {
                        var updatedReverse = reverseConnection;
                        updatedReverse.mutual := false;
                        socialConnections.put(reverseKey, updatedReverse);
                    };
                    case null {};
                };
                
                return #ok(());
            };
            case null {
                return #err("Connection not found");
            };
        };
    };
    
    // Query functions
    public query func getProfile(principal: UserId): async Result.Result<UserProfile, Text> {
        switch (profiles.get(principal)) {
            case (?profile) { #ok(profile) };
            case null { #err("Profile not found") };
        };
    };
    
    public query func getProfileByUsername(username: Text): async Result.Result<UserProfile, Text> {
        switch (usernameToPrincipal.get(username)) {
            case (?principal) { getProfile(principal) };
            case null { #err("Username not found") };
        };
    };
    
    public query func getUserStats(principal: UserId): async Result.Result<UserStats, Text> {
        switch (profiles.get(principal)) {
            case (?profile) {
                let friends = getFriends(principal);
                let stats: UserStats = {
                    totalEventsAttended = profile.totalEventsAttended;
                    totalEventsOrganized = profile.totalEventsOrganized;
                    totalAchievements = profile.achievements.size();
                    totalFriends = friends.size();
                    reputation = profile.reputation;
                    level = profile.level;
                    streak = calculateStreak(principal);
                };
                return #ok(stats);
            };
            case null {
                return #err("Profile not found");
            };
        };
    };
    
    public query func getFriends(principal: UserId): async [UserProfile] {
        let connections = Array.filter<((UserId, UserId), SocialConnection)>(
            Array.freeze(HashMap.toArray(socialConnections)),
            func(pair) { 
                let connection = pair.1;
                (connection.userPrincipal == principal or connection.friendPrincipal == principal) and connection.mutual
            }
        );
        
        Array.map<((UserId, UserId), SocialConnection), UserProfile>(connections, func(pair) {
            let connection = pair.1;
            let friendPrincipal = if (connection.userPrincipal == principal) connection.friendPrincipal else connection.userPrincipal;
            Option.unwrap(profiles.get(friendPrincipal))
        })
    };
    
    public query func getFollowers(principal: UserId): async [UserProfile] {
        let connections = Array.filter<((UserId, UserId), SocialConnection)>(
            Array.freeze(HashMap.toArray(socialConnections)),
            func(pair) { 
                let connection = pair.1;
                connection.friendPrincipal == principal and not connection.mutual
            }
        );
        
        Array.map<((UserId, UserId), SocialConnection), UserProfile>(connections, func(pair) {
            let connection = pair.1;
            Option.unwrap(profiles.get(connection.userPrincipal))
        })
    };
    
    public query func getFollowing(principal: UserId): async [UserProfile] {
        let connections = Array.filter<((UserId, UserId), SocialConnection)>(
            Array.freeze(HashMap.toArray(socialConnections)),
            func(pair) { 
                let connection = pair.1;
                connection.userPrincipal == principal and not connection.mutual
            }
        );
        
        Array.map<((UserId, UserId), SocialConnection), UserProfile>(connections, func(pair) {
            let connection = pair.1;
            Option.unwrap(profiles.get(connection.friendPrincipal))
        })
    };
    
    public query func searchUsers(query: Text): async [UserProfile] {
        let allProfiles = Array.map<(UserId, UserProfile), UserProfile>(
            Array.freeze(HashMap.toArray(profiles)),
            func(pair) { pair.1 }
        );
        
        Array.filter<UserProfile>(allProfiles, func(profile) {
            Text.contains(profile.username, query) or
            Text.contains(profile.displayName, query) or
            Text.contains(profile.bio, query)
        })
    };
    
    // Helper functions
    private func calculateReputationGain(rarity: {
        #COMMON;
        #RARE;
        #EPIC;
        #LEGENDARY;
    }): Nat {
        switch (rarity) {
            case (#COMMON) 10;
            case (#RARE) 25;
            case (#EPIC) 50;
            case (#LEGENDARY) 100;
        }
    };
    
    private func calculateLevel(reputation: Nat): Nat {
        if (reputation < 100) 1
        else if (reputation < 250) 2
        else if (reputation < 500) 3
        else if (reputation < 1000) 4
        else if (reputation < 2000) 5
        else if (reputation < 5000) 6
        else if (reputation < 10000) 7
        else if (reputation < 25000) 8
        else if (reputation < 50000) 9
        else 10
    };
    
    private func calculateStreak(principal: UserId): Nat {
        // This would require integration with event attendance data
        // For now, return a placeholder
        0
    };
};
