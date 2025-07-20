# QikCard Backend Canisters

## Overview

The QikCard backend consists of six specialized ICP canisters that handle authentication, event management, NFT operations, user profiles, analytics, and wallet functionality. Built with Rust for performance and security.

## Canister Architecture

### Canister Structure
```
backend/
├── auth_canister/         # Authentication & Identity Management
├── event_canister/        # Event Management & QikPoint Integration
├── nft_canister/          # NFT & Collectibles System
├── profile_canister/      # User Profiles & Social Features
├── analytics_canister/    # Analytics & Reporting
├── wallet_canister/       # Crypto Wallet Operations
├── shared/                # Shared utilities and types
├── scripts/               # Deployment and utility scripts
└── Cargo.toml            # Workspace configuration
```

## 1. Authentication Canister (`auth_canister`)

### Purpose
Handles user authentication, session management, and access control using Internet Identity integration.

### Key Features
- Internet Identity integration
- Session token management
- Role-based access control
- Hardware device registration

### API Endpoints
```rust
// Core authentication methods
#[update]
async fn authenticate(ii_principal: Principal) -> Result<AuthSession, String>

#[update]
async fn register_device(device_id: String, device_type: DeviceType) -> Result<(), String>

#[query]
fn get_user_session(principal: Principal) -> Option<AuthSession>

#[update]
fn logout(session_token: String) -> Result<(), String>
```

## 2. Event Canuster (`event_canister`)

### Purpose
Manages event lifecycle, QikPoint scanner integration, and real-time participant tracking.

### Key Features
- Event creation and configuration
- QikPoint device management
- Real-time interaction logging
- HTTP outcalls for external APIs

### API Endpoints
```rust
// Event management
#[update]
async fn create_event(event_data: EventData) -> Result<EventId, String>

#[update]
async fn register_qikpoint(device_id: String, event_id: EventId) -> Result<(), String>

#[update]
async fn log_interaction(interaction: QikPointInteraction) -> Result<(), String>

#[query]
fn get_event_analytics(event_id: EventId) -> EventAnalytics
```

## 3. NFT Canister (`nft_canister`)

### Purpose
Handles NFT minting, metadata management, and collectible distribution for achievements and rewards.

### Key Features
- Achievement NFT minting
- Metadata storage on IPFS
- Collection management
- Marketplace functionality

### API Endpoints
```rust
// NFT operations
#[update]
async fn mint_achievement_nft(
    recipient: Principal,
    achievement_type: String,
    event_id: EventId
) -> Result<TokenId, String>

#[query]
fn get_user_nfts(owner: Principal) -> Vec<NFTMetadata>

#[update]
async fn transfer_nft(token_id: TokenId, to: Principal) -> Result<(), String>
```

## 4. Profile Canister (`profile_canister`)

### Purpose
Manages user profiles, achievements, social connections, and privacy settings.

### Key Features
- Comprehensive user profiles
- Achievement tracking
- Social networking
- Privacy controls

### API Endpoints
```rust
// Profile management
#[update]
fn update_profile(profile_data: ProfileData) -> Result<(), String>

#[query]
fn get_public_profile(principal: Principal) -> Option<PublicProfile>

#[update]
fn add_connection(target_principal: Principal) -> Result<(), String>

#[query]
fn get_achievements(principal: Principal) -> Vec<Achievement>
```

## 5. Analytics Canister (`analytics_canister`)

### Purpose
Processes event data, generates insights, and provides reporting capabilities with automated timer-based operations.

### Key Features
- Real-time analytics processing
- Automated report generation
- Business intelligence
- Performance metrics

### API Endpoints
```rust
// Analytics operations
#[query]
fn get_event_metrics(event_id: EventId) -> EventMetrics

#[query]
fn get_platform_analytics() -> PlatformAnalytics

#[update]
async fn generate_report(report_type: ReportType, event_id: Option<EventId>) -> Result<Report, String>
```

## 6. Wallet Canister (`wallet_canister`)

### Purpose
Provides crypto wallet functionality with t-ECDSA signing, Bitcoin integration, and cross-chain operations.

### Key Features
- ICP and Bitcoin support
- t-ECDSA transaction signing
- Cross-chain functionality
- Asset management

### API Endpoints
```rust
// Wallet operations
#[update]
async fn get_balance(asset_type: AssetType) -> Result<Balance, String>

#[update]
async fn send_transaction(
    to_address: String,
    amount: u64,
    asset_type: AssetType
) -> Result<TransactionId, String>

#[query]
fn get_transaction_history(principal: Principal) -> Vec<Transaction>
```

## Shared Components (`shared/`)

### Common Types and Utilities
```rust
// shared/src/types.rs
pub struct EventData {
    pub name: String,
    pub description: String,
    pub start_time: u64,
    pub end_time: u64,
    pub location: String,
    pub organizer: Principal,
}

pub struct QikPointInteraction {
    pub device_id: String,
    pub user_principal: Principal,
    pub interaction_type: InteractionType,
    pub timestamp: u64,
    pub event_id: EventId,
}
```

## Development Setup

### Prerequisites
```bash
# Install Rust and DFX
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

### Build and Deploy
```bash
# Build all canisters
cd backend
dfx build

# Deploy locally
dfx deploy

# Deploy to mainnet
dfx deploy --network ic --with-cycles 10000000000000
```

### Testing
```bash
# Run unit tests
cargo test

# Run integration tests with PocketIC
cargo test --features pocket-ic

# Run specific canister tests
cd auth_canister && cargo test
```

## Inter-Canister Communication

### Communication Patterns
```rust
// Example: Event canister calling NFT canister
use ic_cdk::call;

#[update]
async fn award_achievement(
    user: Principal,
    event_id: EventId,
    achievement: String
) -> Result<TokenId, String> {
    // Call NFT canister to mint achievement
    let result: Result<(TokenId,), _> = call(
        NFT_CANISTER_ID,
        "mint_achievement_nft",
        (user, achievement, event_id)
    ).await;
    
    match result {
        Ok((token_id,)) => {
            // Update event analytics
            let _: Result<((),), _> = call(
                ANALYTICS_CANISTER_ID,
                "log_achievement",
                (user, event_id, token_id)
            ).await;
            
            Ok(token_id)
        },
        Err(e) => Err(format!("NFT minting failed: {:?}", e))
    }
}
```

## Security Best Practices

### Access Control
```rust
// Role-based access control
fn require_admin() -> Result<(), String> {
    let caller = ic_cdk::caller();
    if !is_admin(caller) {
        return Err("Admin access required".to_string());
    }
    Ok(())
}

// Input validation
fn validate_event_data(data: &EventData) -> Result<(), String> {
    if data.name.len() > 100 {
        return Err("Event name too long".to_string());
    }
    if data.start_time >= data.end_time {
        return Err("Invalid event timing".to_string());
    }
    Ok(())
}
```

## Deployment Configuration

### Mainnet Canister IDs
```bash
# Production canister identifiers
AUTH_CANISTER_ID="rdmx6-jaaaa-aaaah-qcaiq-cai"
EVENT_CANISTER_ID="rrkah-fqaaa-aaaah-qcaiq-cai"
NFT_CANISTER_ID="rqvl3-sqaaa-aaaah-qcaiq-cai"
PROFILE_CANISTER_ID="rwr7z-4qaaa-aaaah-qcaiq-cai"
ANALYTICS_CANISTER_ID="rwfgd-liaaa-aaaah-qcaiq-cai"
WALLET_CANISTER_ID="rxzep-hqaaa-aaaah-qcaiq-cai"
```

### dfx.json Configuration
```json
{
  "canisters": {
    "auth_canister": {
      "type": "rust",
      "package": "auth_canister",
      "candid": "auth_canister/auth_canister.did"
    },
    "event_canister": {
      "type": "rust", 
      "package": "event_canister",
      "candid": "event_canister/event_canister.did"
    }
  },
  "networks": {
    "ic": {
      "providers": ["https://mainnet.dfinity.network"],
      "type": "persistent"
    }
  }
}
```

## Performance Monitoring

### Cycles Management
```rust
// Monitor canister cycles
#[query]
fn get_cycles_balance() -> u64 {
    ic_cdk::api::canister_balance()
}

#[heartbeat]
async fn monitor_health() {
    let balance = ic_cdk::api::canister_balance();
    if balance < MINIMUM_CYCLES {
        // Send alert to monitoring system
        alert_low_cycles(balance).await;
    }
}
```

### Error Handling
```rust
// Comprehensive error handling
#[derive(Debug)]
enum QikCardError {
    AuthenticationFailed,
    InvalidInput(String),
    ResourceNotFound,
    InsufficientPermissions,
    ExternalServiceError(String),
}

impl From<QikCardError> for String {
    fn from(error: QikCardError) -> Self {
        match error {
            QikCardError::AuthenticationFailed => "Authentication failed".to_string(),
            QikCardError::InvalidInput(msg) => format!("Invalid input: {}", msg),
            QikCardError::ResourceNotFound => "Resource not found".to_string(),
            QikCardError::InsufficientPermissions => "Insufficient permissions".to_string(),
            QikCardError::ExternalServiceError(msg) => format!("External service error: {}", msg),
        }
    }
}
```

---

*The QikCard backend provides a robust, scalable foundation for Web3 event engagement, leveraging the full power of the Internet Computer Protocol.*
