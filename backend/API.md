# QikCard Backend API Documentation

## Overview

This document provides comprehensive API documentation for all QikCard backend canisters. All endpoints use Candid for serialization and support both Motoko and Rust clients.

## Authentication

### Internet Identity Integration
All API calls require authentication through Internet Identity. The authentication flow:
1. User logs in via Internet Identity
2. Frontend obtains authenticated principal
3. Principal is used for all subsequent API calls

### Session Management
- Sessions expire after 24 hours
- Each device gets a unique session ID
- Sessions can be invalidated via logout

## API Endpoints by Canister

### Auth Canister API

#### User Registration
```motoko
registerUser : (displayName: Text, email: Text) -> async Result<UserProfile, Text>
```
**Description**: Register a new user with the platform
**Parameters**:
- `displayName`: User's display name
- `email`: User's email address
**Returns**: User profile on success, error message on failure

#### User Login
```motoko
login : (deviceInfo: Text) -> async Result<Session, Text>
```
**Description**: Create a new session for authenticated user
**Parameters**:
- `deviceInfo`: Device information for session tracking
**Returns**: Session details including session ID

#### User Logout
```motoko
logout : (sessionId: Text) -> async Result<(), Text>
```
**Description**: Terminate an active session
**Parameters**:
- `sessionId`: Session ID to terminate
**Returns**: Success confirmation or error

#### User Profile Retrieval
```motoko
getUser : (principal: Principal) -> async Result<UserProfile, Text>
```
**Description**: Retrieve user profile by principal
**Parameters**:
- `principal`: User's principal ID
**Returns**: User profile or error if not found

### Event Canister API

#### Event Creation
```motoko
createEvent : (
    name: Text,
    description: Text,
    location: Text,
    startTime: Time,
    endTime: Time,
    maxAttendees: Nat
) -> async Result<Event, Text>
```
**Description**: Create a new event
**Parameters**:
- `name`: Event name
- `description`: Event description
- `location`: Event location
- `startTime`: Event start time
- `endTime`: Event end time
- `maxAttendees`: Maximum number of attendees
**Returns**: Created event details

#### User Check-in
```motoko
checkIn : (eventId: Text, qikPointId: ?Text) -> async Result<AttendanceRecord, Text>
```
**Description**: Check user into an event
**Parameters**:
- `eventId`: Event identifier
- `qikPointId`: Optional QikPoint scanner ID
**Returns**: Attendance record

#### Event Retrieval
```motoko
getEvent : (eventId: Text) -> async Result<Event, Text>
getAllEvents : () -> async [Event]
getActiveEvents : () -> async [Event]
```
**Description**: Retrieve event information
**Returns**: Event details or list of events

#### QikPoint Management
```motoko
registerQikPointDevice : (deviceId: Text, location: Text) -> async Result<QikPointDevice, Text>
getQikPointDevice : (deviceId: Text) -> async Result<QikPointDevice, Text>
```
**Description**: Manage QikPoint scanner devices

### NFT Canister API

#### NFT Minting
```motoko
mintAchievementNFT : (
    userPrincipal: Principal,
    achievementId: Text,
    eventId: Text
) -> async Result<NFT, Text>
```
**Description**: Mint NFT for user achievement
**Parameters**:
- `userPrincipal`: User's principal
- `achievementId`: Achievement type identifier
- `eventId`: Associated event ID
**Returns**: Created NFT details

#### NFT Transfer
```motoko
transferNFT : (tokenId: Nat, to: Principal) -> async Result<(), Text>
```
**Description**: Transfer NFT to another user
**Parameters**:
- `tokenId`: NFT token identifier
- `to`: Recipient principal
**Returns**: Success confirmation

#### User NFTs
```motoko
getUserNFTs : (userPrincipal: Principal) -> async [NFT]
getUserStats : (userPrincipal: Principal) -> async {
    totalNFTs: Nat,
    totalAchievements: Nat,
    totalRewards: Nat,
    uniqueAchievements: [Achievement]
}
```
**Description**: Retrieve user's NFT collection and statistics

### Profile Canister API

#### Profile Creation
```motoko
createProfile : (
    username: Text,
    displayName: Text,
    bio: Text,
    avatar: Text
) -> async Result<UserProfile, Text>
```
**Description**: Create new user profile
**Parameters**:
- `username`: Unique username
- `displayName`: Display name
- `bio`: User biography
- `avatar`: Avatar URL/image
**Returns**: Created profile

#### Profile Updates
```motoko
updateProfile : (
    displayName: Text,
    bio: Text,
    avatar: Text,
    socialLinks: [SocialLink]
) -> async Result<UserProfile, Text>
```
**Description**: Update existing profile

#### Social Features
```motoko
sendFriendRequest : (friendPrincipal: Principal) -> async Result<(), Text>
removeFriend : (friendPrincipal: Principal) -> async Result<(), Text>
```
**Description**: Manage social connections

#### User Search
```motoko
searchUsers : (query: Text) -> async [UserProfile]
```
**Description**: Search user profiles by username, display name, or bio

### Analytics Canister API

#### Event Tracking
```motoko
trackEvent : (
    eventType: Text,
    userPrincipal: ?Principal,
    eventId: ?Text,
    data: HashMap<Text, Text>
) -> async Result<Text, Text>
```
**Description**: Record analytics event
**Parameters**:
- `eventType`: Type of event (check_in, event_created, etc.)
- `userPrincipal`: Optional user principal
- `eventId`: Optional associated event ID
- `data`: Additional event data
**Returns**: Event tracking ID

#### Report Generation
```motoko
generateReport : (
    reportType: Text,
    title: Text,
    description: Text,
    filters: HashMap<Text, Text>,
    period: { start: Time; end: Time }
) -> async Result<Report, Text>
```
**Description**: Generate custom analytics report

#### Metrics Retrieval
```motoko
getDashboardMetrics : () -> async DashboardMetrics
getEventAnalytics : (eventId: Text) -> async Result<EventAnalytics, Text>
getUserAnalytics : (userPrincipal: Principal) -> async Result<UserAnalytics, Text>
```
**Description**: Retrieve analytics data

### Wallet Canister API (Rust)

#### Wallet Creation
```rust
async fn create_wallet(request: CreateWalletRequest) -> Result<Wallet, String>
```
**Description**: Create new cryptocurrency wallet
**Parameters**:
- `currency`: Currency type (ICP, BTC, ETH)
- `user_principal`: User's principal ID
**Returns**: Wallet details

#### Transfer
```rust
async fn transfer(request: TransferRequest) -> Result<String, String>
```
**Description**: Execute cryptocurrency transfer
**Parameters**:
- `from`: Sender principal
- `to`: Recipient principal
- `amount`: Transfer amount
- `currency`: Currency type
- `memo`: Optional transaction memo
**Returns**: Transaction ID

#### Balance Check
```rust
async fn balance(user_principal: Principal, currency: String) -> Result<BalanceResponse, String>
```
**Description**: Check wallet balance

#### Transaction History
```rust
async fn get_user_transactions(user_principal: Principal) -> Result<Vec<Transaction>, String>
```
**Description**: Retrieve user's transaction history

## Error Handling

### Common Error Types
- `Unauthorized`: Insufficient permissions
- `NotFound`: Resource not found
- `AlreadyExists`: Duplicate resource
- `InvalidInput`: Invalid parameter values
- `InsufficientBalance`: Wallet balance too low
- `SessionExpired`: Authentication session expired

### Error Response Format
```motoko
Result<T, Text>
```
- `Ok(T)`: Success with result
- `Err(Text)`: Error with message

## Rate Limiting

### Default Limits
- **Registration**: 5 attempts per hour per IP
- **Login**: 10 attempts per minute per user
- **API Calls**: 100 requests per minute per user
- **Transfers**: 5 transactions per minute per wallet

### Rate Limit Headers
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: Time when rate limit resets

## Pagination

### Supported Endpoints
- `getAllEvents()`: Supports pagination
- `getUserTransactions()`: Supports pagination
- `searchUsers()`: Supports pagination

### Pagination Parameters
- `limit`: Maximum items to return (default: 50, max: 100)
- `offset`: Number of items to skip (default: 0)
- `cursor`: Continuation token for next page

### Response Format
```motoko
{
    data: [T],
    pagination: {
        limit: Nat,
        offset: Nat,
        total: Nat,
        has_next: Bool,
        cursor: ?Text
    }
}
```

## Webhooks

### Supported Events
- `user.registered`: New user registration
- `event.created`: New event created
- `checkin.completed`: User checked into event
- `nft.minted`: New NFT minted
- `transfer.completed`: Wallet transfer completed

### Webhook Payload
```json
{
    "event": "event.created",
    "timestamp": 1234567890,
    "data": {
        "event_id": "event_123",
        "user_principal": "ryjl3-tyaaa-aaaaa-aaaba-cai",
        "details": {...}
    }
}
```

## SDK Examples

### JavaScript/TypeScript
```typescript
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from './declarations/auth';

const authClient = await AuthClient.create();
await authClient.login();

const identity = authClient.getIdentity();
const auth = createActor(canisterId, { agentOptions: { identity } });

// Register user
const result = await auth.registerUser("John Doe", "john@example.com");
```

### Motoko
```motoko
let auth = actor "ryjl3-tyaaa-aaaaa-aaaba-cai" : Auth;
let result = await auth.registerUser("Alice", "alice@example.com");
```

### Rust
```rust
use ic_cdk::api::call::call;

let result: Result<Wallet, String> = call(
    Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
    "create_wallet",
    (CreateWalletRequest {
        currency: "ICP".to_string(),
        user_principal: ic_cdk::caller(),
    },)
).await?;
```

## Testing

### Test Environment
- Local replica: `http://localhost:8000`
- Test canisters: `http://localhost:4943`
- Mock data available for all endpoints

### Test Users
- **Admin**: `admin-principal-id`
- **Organizer**: `organizer-principal-id`
- **Regular User**: `user-principal-id`

### Test Commands
```bash
# Deploy to local replica
dfx deploy

# Test authentication
dfx canister call auth registerUser '("Test User", "test@example.com")'

# Test event creation
dfx canister call event createEvent '("Test Event", "Description", "Location", 1234567890, 1234567890, 100)'

# Test NFT minting
dfx canister call nft mintAchievementNFT '(principal "user-principal-id", "first_checkin", "event_1")'
```

## Versioning

### API Version: v1.0.0
### Breaking Changes Policy
- Major version changes may include breaking changes
- Minor version changes add new features
- Patch version changes fix bugs only

### Deprecation Policy
- Deprecated endpoints marked with `@deprecated`
- 6-month deprecation notice period
- Migration guides provided for breaking changes
