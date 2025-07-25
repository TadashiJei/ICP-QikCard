# QikCard Backend Canisters

## Overview

This document provides detailed information about the six core canisters that power the QikCard platform. Each canister serves a specific purpose and can be deployed and scaled independently.

## Canister Details

### 1. Authentication Canister (`auth`)
**Language**: Motoko  
**Purpose**: User authentication and identity management

#### Key Features:
- Internet Identity integration
- Session management with 24-hour expiration
- Role-based access control (RBAC)
- Principal-based user identification
- JWT token generation and validation

#### Data Structures:
- `UserProfile`: Stores user information and roles
- `Session`: Manages active user sessions
- `Role`: Defines permissions for different user types

#### API Endpoints:
- `registerUser(displayName: Text, email: Text)`: Register new user
- `login(deviceInfo: Text)`: Create new session
- `logout(sessionId: Text)`: Terminate session
- `getUser(principal: Principal)`: Retrieve user profile
- `validateSession(sessionId: Text)`: Check session validity
- `hasPermission(principal: Principal, permission: Text)`: Check user permissions

### 2. Event Canister (`event`)
**Language**: Motoko  
**Purpose**: Event lifecycle management and QikPoint scanner integration

#### Key Features:
- Event creation and management
- QR/NFC code generation for events
- Real-time attendance tracking
- QikPoint device registration
- Event status management (DRAFT, ACTIVE, COMPLETED, CANCELLED)

#### Data Structures:
- `Event`: Complete event information
- `AttendanceRecord`: User check-in/check-out tracking
- `QikPointDevice`: Scanner device management

#### API Endpoints:
- `createEvent(...)`: Create new event
- `checkIn(eventId: Text, qikPointId: ?Text)`: User check-in
- `checkOut(eventId: Text)`: User check-out
- `registerQikPointDevice(deviceId: Text, location: Text)`: Register scanner
- `getEvent(eventId: Text)`: Retrieve event details
- `getActiveEvents()`: List all active events

### 3. NFT Canister (`nft`)
**Language**: Motoko  
**Purpose**: NFT minting, metadata management, and rewards distribution

#### Key Features:
- Dynamic NFT minting based on achievements
- Achievement badge system
- Reward calculation and distribution
- NFT transfer capabilities
- Rarity-based reward system

#### Data Structures:
- `NFT`: NFT token with metadata
- `Achievement`: Achievement definitions
- `Reward`: User reward tracking

#### API Endpoints:
- `mintAchievementNFT(...)`: Mint achievement-based NFT
- `transferNFT(tokenId: Nat, to: Principal)`: Transfer NFT
- `getUserNFTs(userPrincipal: Principal)`: Get user's NFT collection
- `getUserStats(userPrincipal: Principal)`: Get user statistics
- `createAchievement(...)`: Define new achievement type

### 4. Profile Canister (`profile`)
**Language**: Motoko  
**Purpose**: User profile management and social features

#### Key Features:
- User profile creation and updates
- Achievement tracking
- Social connections (friends/followers)
- Reputation system with levels
- Username management

#### Data Structures:
- `UserProfile`: Complete user profile
- `Achievement`: User-specific achievements
- `SocialConnection`: Friend/follower relationships

#### API Endpoints:
- `createProfile(...)`: Create new user profile
- `updateProfile(...)`: Update profile information
- `sendFriendRequest(friendPrincipal: Principal)`: Send friend request
- `getUserStats(principal: Principal)`: Get user statistics
- `searchUsers(query: Text)`: Search user profiles

### 5. Analytics Canister (`analytics`)
**Language**: Motoko  
**Purpose**: Event data collection, processing, and reporting

#### Key Features:
- Real-time event analytics
- User behavior tracking
- Performance metrics collection
- Custom report generation
- Time-series data analysis

#### Data Structures:
- `AnalyticsEvent`: Tracked events
- `Metric`: Performance metrics
- `Report`: Generated analytics reports

#### API Endpoints:
- `trackEvent(...)`: Record analytics event
- `recordMetric(...)`: Store performance metric
- `generateReport(...)`: Create custom report
- `getDashboardMetrics()`: Get platform overview
- `getEventAnalytics(eventId: Text)`: Event-specific analytics

### 6. Wallet Canister (`wallet`)
**Language**: Rust  
**Purpose**: Cryptocurrency wallet management with multi-currency support

#### Key Features:
- Multi-currency wallet support (ICP, BTC, ETH)
- Secure key management
- Transaction history
- Balance tracking
- Cross-chain compatibility

#### Data Structures:
- `Wallet`: User wallet information
- `Transaction`: Transaction records
- `KeyPair`: Cryptographic key management

#### API Endpoints:
- `create_wallet(request: CreateWalletRequest)`: Create new wallet
- `transfer(request: TransferRequest)`: Execute transfer
- `balance(user_principal: Principal, currency: String)`: Check balance
- `get_user_transactions(user_principal: Principal)`: Get transaction history
- `get_wallet_info(...)`: Get wallet details

## Deployment Configuration

### dfx.json Configuration
```json
{
  "canisters": {
    "auth": {
      "main": "canisters/auth/src/main.mo",
      "type": "motoko"
    },
    "event": {
      "main": "canisters/event/src/main.mo",
      "type": "motoko"
    },
    "nft": {
      "main": "canisters/nft/src/main.mo",
      "type": "motoko"
    },
    "profile": {
      "main": "canisters/profile/src/main.mo",
      "type": "motoko"
    },
    "analytics": {
      "main": "canisters/analytics/src/main.mo",
      "type": "motoko"
    },
    "wallet": {
      "main": "canisters/wallet/src/lib.rs",
      "type": "rust"
    }
  }
}
```

## Inter-Canister Communication

### Communication Patterns
1. **Synchronous Calls**: For immediate data retrieval
2. **Asynchronous Messages**: For background processing
3. **Event-Driven Architecture**: Using ICP's messaging system

### Data Flow Examples

#### User Registration Flow
1. Frontend → Auth Canister (register with Internet Identity)
2. Auth Canister → Profile Canister (create user profile)
3. Auth Canister → Wallet Canister (create user wallet)

#### Event Check-in Flow
1. QikPoint Scanner → Event Canister (scan NFC/QR)
2. Event Canister → Auth Canister (verify user)
3. Event Canister → NFT Canister (mint achievement NFT)
4. Event Canister → Analytics Canister (log attendance)
5. Event Canister → Profile Canister (update user achievements)

## Development Setup

### Prerequisites
- DFINITY SDK (dfx)
- Node.js 18+ (for frontend)
- Rust 1.70+ (for wallet canister)
- Motoko compiler

### Local Development
```bash
# Install DFINITY SDK
dfx --version

# Start local replica
dfx start --background

# Deploy canisters locally
dfx deploy

# Check canister status
dfx canister status --all
```

### Testing
Each canister includes comprehensive test suites:
- Unit tests for individual functions
- Integration tests for inter-canister communication
- Security tests for access control
- Performance tests for scalability

## Security Considerations

### Authentication & Authorization
- Internet Identity for primary authentication
- Role-based access control across all canisters
- Principal-based permission system
- Session management with expiration

### Data Protection
- Encrypted storage for sensitive data
- Secure key management in Wallet canister
- Input validation and sanitization
- Rate limiting and DDoS protection

## Monitoring & Observability

### Metrics Collection
- Canister performance metrics
- User activity metrics
- Error rates and patterns
- Resource utilization

### Logging
- Structured logging across all canisters
- Centralized log aggregation
- Real-time alerting
- Audit trail maintenance

## Future Enhancements

### Planned Features
- Advanced analytics with ML
- Multi-signature wallets
- Cross-chain bridges
- Decentralized identity verification
- Advanced NFT marketplace
- Social governance features

### Scaling Considerations
- Horizontal scaling for high-traffic events
- Caching strategies for frequently accessed data
- Database optimization for large datasets
- CDN integration for global performance
