import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";

actor NFT {
    type TokenId = Nat;
    type UserId = Principal;
    type EventId = Text;
    
    type NFTMetadata = {
        name: Text;
        description: Text;
        image: Text;
        attributes: [NFTAttribute];
        eventId: EventId;
        achievementType: Text;
        rarity: Text;
        createdAt: Time.Time;
    };
    
    type NFTAttribute = {
        trait_type: Text;
        value: Text;
    };
    
    type Achievement = {
        id: Text;
        type: Text;
        title: Text;
        description: Text;
        criteria: Text;
        rewardAmount: Nat;
        rarity: Text;
        image: Text;
    };
    
    type NFT = {
        tokenId: TokenId;
        owner: UserId;
        metadata: NFTMetadata;
        mintedAt: Time.Time;
        transferCount: Nat;
    };
    
    type Reward = {
        userPrincipal: UserId;
        amount: Nat;
        reason: Text;
        timestamp: Time.Time;
        eventId: EventId;
    };
    
    // State
    private stable var nfts: HashMap.HashMap<TokenId, NFT> = HashMap.HashMap<TokenId, NFT>(0, Nat.equal, func(n) { Int.abs(Int.fromNat(n)) });
    private stable var userNFTs: HashMap.HashMap<UserId, [TokenId]> = HashMap.HashMap<UserId, [TokenId]>(0, Principal.equal, Principal.hash);
    private stable var achievements: HashMap.HashMap<Text, Achievement> = HashMap.HashMap<Text, Achievement>(0, Text.equal, Text.hash);
    private stable var userAchievements: HashMap.HashMap<UserId, [Text]> = HashMap.HashMap<UserId, [Text]>(0, Principal.equal, Principal.hash);
    private stable var rewards: HashMap.HashMap<UserId, [Reward]> = HashMap.HashMap<UserId, [Reward]>(0, Principal.equal, Principal.hash);
    private stable var nextTokenId: TokenId = 1;
    
    // Initialize achievements
    system func postupgrade() {
        // Initialize default achievements if not exists
        if (achievements.get("first_checkin") == null) {
            achievements.put("first_checkin", {
                id = "first_checkin";
                type = "attendance";
                title = "First Check-in";
                description = "Attend your first event";
                criteria = "Check in to any event";
                rewardAmount = 100;
                rarity = "common";
                image = "ipfs://QmFirstCheckin";
            });
        };
        
        if (achievements.get("event_host") == null) {
            achievements.put("event_host", {
                id = "event_host";
                type = "organizer";
                title = "Event Host";
                description = "Successfully host an event";
                criteria = "Create and complete an event with at least 10 attendees";
                rewardAmount = 500;
                rarity = "rare";
                image = "ipfs://QmEventHost";
            });
        };
        
        if (achievements.get("social_butterfly") == null) {
            achievements.put("social_butterfly", {
                id = "social_butterfly";
                type = "social";
                title = "Social Butterfly";
                description = "Attend 10 different events";
                criteria = "Check in to 10 unique events";
                rewardAmount = 1000;
                rarity = "epic";
                image = "ipfs://QmSocialButterfly";
            });
        };
    };
    
    // NFT minting
    public shared(msg) func mintAchievementNFT(
        userPrincipal: UserId,
        achievementId: Text,
        eventId: EventId
    ): async Result.Result<NFT, Text> {
        // For now, allow anyone to mint (in production, this would be restricted)
        switch (achievements.get(achievementId)) {
            case (?achievement) {
                // Check if user already has this achievement for this event
                let userAchieves = Option.get(userAchievements.get(userPrincipal), []);
                for (achieveId in userAchieves.vals()) {
                    if (achieveId == achievementId) {
                        return #err("User already has this achievement");
                    };
                };
                
                let tokenId = nextTokenId;
                nextTokenId += 1;
                
                let metadata: NFTMetadata = {
                    name = achievement.title;
                    description = achievement.description;
                    image = achievement.image;
                    attributes = [
                        { trait_type = "Achievement Type"; value = achievement.type },
                        { trait_type = "Rarity"; value = achievement.rarity },
                        { trait_type = "Event ID"; value = eventId },
                        { trait_type = "Criteria"; value = achievement.criteria }
                    ];
                    eventId = eventId;
                    achievementType = achievement.type;
                    rarity = achievement.rarity;
                    createdAt = Time.now();
                };
                
                let nft: NFT = {
                    tokenId = tokenId;
                    owner = userPrincipal;
                    metadata = metadata;
                    mintedAt = Time.now();
                    transferCount = 0;
                };
                
                nfts.put(tokenId, nft);
                
                // Add to user's NFT collection
                let userNftList = Option.get(userNFTs.get(userPrincipal), []);
                userNFTs.put(userPrincipal, Array.append(userNftList, [tokenId]));
                
                // Add to user's achievements
                userAchievements.put(userPrincipal, Array.append(userAchieves, [achievementId]));
                
                // Create reward record
                let reward: Reward = {
                    userPrincipal = userPrincipal;
                    amount = achievement.rewardAmount;
                    reason = achievement.title;
                    timestamp = Time.now();
                    eventId = eventId;
                };
                
                let userRewards = Option.get(rewards.get(userPrincipal), []);
                rewards.put(userPrincipal, Array.append(userRewards, [reward]));
                
                return #ok(nft);
            };
            case null {
                return #err("Achievement not found");
            };
        };
    };
    
    public shared(msg) func transferNFT(
        tokenId: TokenId,
        to: UserId
    ): async Result.Result<(), Text> {
        switch (nfts.get(tokenId)) {
            case (?nft) {
                if (nft.owner != msg.caller) {
                    return #err("Not the owner of this NFT");
                };
                
                // Update NFT owner
                var updatedNft = nft;
                updatedNft.owner := to;
                updatedNft.transferCount := nft.transferCount + 1;
                nfts.put(tokenId, updatedNft);
                
                // Remove from sender's collection
                let senderNfts = Option.get(userNFTs.get(msg.caller), []);
                let newSenderNfts = Array.filter<TokenId>(senderNfts, func(t) { t != tokenId });
                userNFTs.put(msg.caller, newSenderNfts);
                
                // Add to recipient's collection
                let recipientNfts = Option.get(userNFTs.get(to), []);
                userNFTs.put(to, Array.append(recipientNfts, [tokenId]));
                
                return #ok(());
            };
            case null {
                return #err("NFT not found");
            };
        };
    };
    
    // Achievement management
    public shared(msg) func createAchievement(
        id: Text,
        type: Text,
        title: Text,
        description: Text,
        criteria: Text,
        rewardAmount: Nat,
        rarity: Text,
        image: Text
    ): async Result.Result<Achievement, Text> {
        // In production, this would require admin authorization
        
        if (achievements.get(id) != null) {
            return #err("Achievement already exists");
        };
        
        let achievement: Achievement = {
            id = id;
            type = type;
            title = title;
            description = description;
            criteria = criteria;
            rewardAmount = rewardAmount;
            rarity = rarity;
            image = image;
        };
        
        achievements.put(id, achievement);
        return #ok(achievement);
    };
    
    // Query functions
    public query func getNFT(tokenId: TokenId): async Result.Result<NFT, Text> {
        switch (nfts.get(tokenId)) {
            case (?nft) { #ok(nft) };
            case null { #err("NFT not found") };
        };
    };
    
    public query func getUserNFTs(userPrincipal: UserId): async [NFT] {
        let tokenIds = Option.get(userNFTs.get(userPrincipal), []);
        Array.map<TokenId, NFT>(tokenIds, func(tokenId) {
            Option.unwrap(nfts.get(tokenId))
        })
    };
    
    public query func getAchievement(achievementId: Text): async Result.Result<Achievement, Text> {
        switch (achievements.get(achievementId)) {
            case (?achievement) { #ok(achievement) };
            case null { #err("Achievement not found") };
        };
    };
    
    public query func getAllAchievements(): async [Achievement] {
        Array.map<(Text, Achievement), Achievement>(
            Array.freeze(HashMap.toArray(achievements)),
            func(pair) { pair.1 }
        )
    };
    
    public query func getUserAchievements(userPrincipal: UserId): async [Achievement] {
        let achieveIds = Option.get(userAchievements.get(userPrincipal), []);
        Array.map<Text, Achievement>(achieveIds, func(id) {
            Option.unwrap(achievements.get(id))
        })
    };
    
    public query func getUserRewards(userPrincipal: UserId): async [Reward] {
        Option.get(rewards.get(userPrincipal), [])
    };
    
    public query func getTotalRewards(userPrincipal: UserId): async Nat {
        let userRewards = Option.get(rewards.get(userPrincipal), []);
        var total: Nat = 0;
        for (reward in userRewards.vals()) {
            total += reward.amount;
        };
        total
    };
    
    // Batch operations
    public query func getUserStats(userPrincipal: UserId): async {
        totalNFTs: Nat;
        totalAchievements: Nat;
        totalRewards: Nat;
        uniqueAchievements: [Achievement];
    } {
        let userNfts = await getUserNFTs(userPrincipal);
        let userAchieves = await getUserAchievements(userPrincipal);
        let totalRew = await getTotalRewards(userPrincipal);
        
        {
            totalNFTs = userNfts.size();
            totalAchievements = userAchieves.size();
            totalRewards = totalRew;
            uniqueAchievements = userAchieves;
        }
    };
};
