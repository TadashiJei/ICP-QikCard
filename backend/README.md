# QikCard Backend

This directory contains the backend implementation for the QikCard platform, built on the Internet Computer Protocol (ICP) using Motoko and Rust.

## Architecture Overview

The backend consists of six specialized canisters, each serving a specific purpose:

### Canisters

1. **Authentication Canister** (`auth/`) - User authentication and session management
2. **Event Canister** (`event/`) - Event lifecycle management and QikPoint scanner integration
3. **NFT Canister** (`nft/`) - NFT minting, metadata management, and rewards
4. **Profile Canister** (`profile/`) - User profile management and social features
5. **Analytics Canister** (`analytics/`) - Event data collection and reporting
6. **Wallet Canister** (`wallet/`) - Cryptocurrency wallet management with multi-currency support

## Quick Start

### Prerequisites

- [DFINITY SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (dfx)
- [Node.js 18+](https://nodejs.org/) (for frontend development)
- [Rust 1.70+](https://rust-lang.org/) (for wallet canister)
- [Motoko compiler](https://internetcomputer.org/docs/current/motoko/main/getting-started)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TadashiJei/ICP-QikCard.git
cd ICP-QikCard/backend
```

2. Install dependencies:
```bash
# Install Rust dependencies
cd canisters/wallet
cargo check
cd ../..

# Make scripts executable
chmod +x scripts/*.sh
```

3. Start local development:
```bash
# Start local replica
dfx start --background

# Deploy all canisters
dfx deploy

# Run tests
./scripts/test.sh
```

## Development Workflow

### Local Development

1. **Start the local replica**:
   ```bash
   dfx start --background --clean
   ```

2. **Build and deploy**:
   ```bash
   ./scripts/build.sh
   ./scripts/deploy.sh --network local
   ```

3. **Test the APIs**:
   ```bash
   # Register a user
   dfx canister call auth registerUser '("John Doe", "john@example.com")'

   # Create an event
   dfx canister call event createEvent '("Tech Meetup", "Web3 networking event", "San Francisco", 1234567890, 1234567890, 100)'

   # Check user balance
   dfx canister call wallet balance '(principal "$(dfx identity get-principal)", "ICP")'
   ```

### Mainnet Deployment

1. **Configure mainnet**:
   ```bash
   # Set up cycles wallet
   dfx identity --network ic deploy-wallet <cycles-wallet-id>
   
   # Deploy to mainnet
   ./scripts/deploy.sh --network ic
   ```

2. **Verify deployment**:
   ```bash
   dfx canister --network ic status --all
   ```

## API Documentation

For detailed API documentation, see:
- [API.md](API.md) - Complete API reference
- [CANISTERS.md](CANISTERS.md) - Canister-specific documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture overview

## Testing

### Running Tests

```bash
# Run all tests
./scripts/test.sh

# Run specific test categories
./scripts/test.sh --verbose
./scripts/test.sh --skip-build

# Run tests on mainnet (use with caution)
./scripts/test.sh --network ic
```

### Test Coverage

The test suite covers:
- **Unit Tests**: Individual function testing
- **Integration Tests**: Inter-canister communication
- **Security Tests**: Access control and validation
- **Performance Tests**: Load and stress testing
- **End-to-End Tests**: Complete user workflows

## Scripts

### Available Scripts

- `scripts/build.sh` - Build all canisters
- `scripts/deploy.sh` - Deploy to local or mainnet
- `scripts/test.sh` - Run comprehensive test suite
- `scripts/setup.sh` - Initial environment setup
- `scripts/clean.sh` - Clean build artifacts

### Script Usage

```bash
# Build all canisters
./scripts/build.sh

# Deploy to local network
./scripts/deploy.sh --network local

# Deploy to mainnet with confirmation
./scripts/deploy.sh --network ic

# Run tests with verbose output
./scripts/test.sh --verbose
```

## Configuration

### dfx.json

The `dfx.json` file configures all canisters:

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

### Environment Variables

Create a `.env` file for local development:

```bash
# Network configuration
NETWORK=local

# Canister IDs (auto-generated after deployment)
AUTH_CANISTER_ID=ryjl3-tyaaa-aaaaa-aaaba-cai
EVENT_CANISTER_ID=ryjl3-tyaaa-aaaaa-aaaba-cai
NFT_CANISTER_ID=ryjl3-tyaaa-aaaaa-aaaba-cai
PROFILE_CANISTER_ID=ryjl3-tyaaa-aaaaa-aaaba-cai
ANALYTICS_CANISTER_ID=ryjl3-tyaaa-aaaaa-aaaba-cai
WALLET_CANISTER_ID=ryjl3-tyaaa-aaaaa-aaaba-cai

# Frontend URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

## Security

### Authentication
- Internet Identity integration for secure authentication
- Session management with configurable expiration
- Role-based access control (RBAC)
- Principal-based user identification

### Data Protection
- Encrypted storage for sensitive data
- Secure key management in wallet canister
- Input validation and sanitization
- Rate limiting and DDoS protection

### Access Control
- Granular permissions system
- Canister-level access restrictions
- API endpoint authentication
- Audit trail maintenance

## Monitoring

### Metrics Collection
- Canister performance metrics
- User activity tracking
- Error rate monitoring
- Resource utilization

### Logging
- Structured logging across all canisters
- Centralized log aggregation
- Real-time alerting
- Audit trail maintenance

## Deployment

### Local Development
```bash
# Start local replica
dfx start --background

# Deploy all canisters
dfx deploy

# Check deployment status
dfx canister status --all
```

### Production Deployment
```bash
# Build for production
./scripts/build.sh

# Deploy to mainnet
./scripts/deploy.sh --network ic

# Verify deployment
dfx canister --network ic status --all
```

## Troubleshooting

### Common Issues

1. **Build failures**:
   ```bash
   # Clean and rebuild
   dfx clean
   ./scripts/build.sh
   ```

2. **Deployment issues**:
   ```bash
   # Check network connectivity
   dfx ping
   
   # Check canister status
   dfx canister status --all
   ```

3. **Authentication issues**:
   ```bash
   # Reset identity
   dfx identity new test
   dfx identity use test
   ```

### Debug Commands

```bash
# View canister logs
dfx canister logs --follow auth

# Check canister cycles
dfx canister status auth

# Inspect canister state
dfx canister call auth getUser '(principal "ryjl3-tyaaa-aaaaa-aaaba-cai")'
```

## Contributing

### Development Setup

1. **Fork the repository**
2. **Create feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make changes and test**:
   ```bash
   ./scripts/test.sh
   ```
4. **Submit pull request**

### Code Style

- Follow Motoko and Rust best practices
- Use descriptive variable names
- Add comprehensive tests
- Document all public APIs
- No emojis in commit messages

## Resources

### Documentation
- [ICP Developer Docs](https://internetcomputer.org/docs/)
- [Motoko Language Guide](https://internetcomputer.org/docs/current/motoko/main/getting-started)
- [Rust CDK Documentation](https://docs.rs/ic-cdk/)

### Community
- [DFINITY Developer Forum](https://forum.dfinity.org/)
- [ICP Discord](https://discord.gg/internetcomputer)
- [GitHub Issues](https://github.com/TadashiJei/ICP-QikCard/issues)

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

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
