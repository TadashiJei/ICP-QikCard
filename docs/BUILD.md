# Build and Deployment Instructions

## Prerequisites

### System Requirements
- **Node.js**: v18.0.0 or higher
- **Rust**: 1.70.0 or higher
- **DFX**: 0.15.0 or higher
- **Git**: Latest version
- **Docker**: For containerized deployments (optional)

### Development Tools
```bash
# Install DFX (Internet Computer SDK)
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Install Node.js dependencies
npm install -g npm@latest

# Install Rust and Cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
rustup target add wasm32-unknown-unknown
```

## Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/qikcard/icp-qikcard.git
cd icp-qikcard
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies (if using Node.js backend)
cd qikhub
npm install
cd ..

# Install test dependencies
cd tests
npm install
cd ..
```

### 3. Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit configuration file
nano .env
```

Required environment variables:
```env
# Development
NODE_ENV=development
DFX_NETWORK=local

# API Keys (for external integrations)
IPFS_API_KEY=your_ipfs_key
ANALYTICS_API_KEY=your_analytics_key

# Database (if applicable)
DATABASE_URL=your_database_url

# Hardware Integration
MQTT_BROKER_URL=mqtt://localhost:1883
NFC_SERVICE_ENDPOINT=http://localhost:8080
```

### 4. Start Local ICP Replica
```bash
# Start local Internet Computer replica
dfx start --clean --background

# Deploy canisters locally
dfx deploy
```

### 5. Start Development Servers
```bash
# Terminal 1: Frontend development server
cd frontend
npm run dev

# Terminal 2: QikHub management platform
cd qikhub
npm run dev

# Terminal 3: Hardware simulator (optional)
cd hardware
npm run simulate
```

## Canister Development

### Backend Canisters Structure
```
backend/
├── auth_canister/          # Authentication & Identity
├── event_canister/         # Event Management
├── nft_canister/           # NFT & Collectibles
├── profile_canister/       # User Profiles
├── analytics_canister/     # Analytics & Reporting
├── wallet_canister/        # Wallet Operations
└── shared/                 # Shared utilities
```

### Build Individual Canisters
```bash
# Build specific canister
dfx build auth_canister

# Build all canisters
dfx build

# Deploy specific canister
dfx deploy auth_canister

# Deploy with specific arguments
dfx deploy auth_canister --argument '(opt record { admin = principal "rdmx6-jaaaa-aaaah-qcaiq-cai" })'
```

### Canister Management
```bash
# Check canister status
dfx canister status auth_canister

# Get canister info
dfx canister info auth_canister

# Upgrade canister
dfx deploy auth_canister --mode upgrade

# Stop/Start canister
dfx canister stop auth_canister
dfx canister start auth_canister
```

## Frontend Development

### React/Next.js Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start
```

### Frontend Structure
```
frontend/
├── components/             # Reusable UI components
├── pages/                  # Next.js pages
├── hooks/                  # Custom React hooks
├── services/               # API services
├── utils/                  # Utility functions
├── styles/                 # CSS/Styling
├── public/                 # Static assets
└── types/                  # TypeScript definitions
```

## Hardware Development

### ESP32 Firmware Setup
```bash
cd hardware

# Install PlatformIO
pip install platformio

# Build firmware
pio run

# Upload to device
pio run --target upload

# Monitor serial output
pio device monitor
```

### NFC Module Configuration
```cpp
// hardware/src/nfc_config.h
#define NFC_MODULE_TYPE PN532
#define NFC_INTERFACE I2C
#define NFC_I2C_ADDRESS 0x24
#define WIFI_SSID "your_wifi_ssid"
#define WIFI_PASSWORD "your_wifi_password"
#define API_ENDPOINT "https://theqikcard.com/api"
```

## Testing

### Unit Tests
```bash
# Run frontend tests
cd frontend
npm test

# Run backend tests (Rust)
cd backend
cargo test

# Run integration tests
cd tests
npm test
```

### PocketIC Integration Tests
```bash
# Install PocketIC
cargo install pocket-ic

# Run PocketIC tests
cd tests
cargo test --features pocket-ic
```

### Hardware Tests
```bash
# Hardware-in-the-loop testing
cd hardware
pio test

# NFC communication tests
npm run test:nfc
```

## Production Deployment

### Mainnet Deployment

#### 1. Prepare for Mainnet
```bash
# Switch to mainnet
dfx start --network ic

# Check wallet balance
dfx wallet balance --network ic
```

#### 2. Deploy Canisters
```bash
# Deploy all canisters to mainnet
dfx deploy --network ic

# Deploy with cycles
dfx deploy --network ic --with-cycles 1000000000000
```

#### 3. Configure Production Settings
```bash
# Set production environment variables
dfx canister call auth_canister setEnvironment '("production")' --network ic

# Configure HTTPS endpoints
dfx canister call event_canister setApiEndpoint '("https://api.theqikcard.com")' --network ic
```

### Frontend Deployment

#### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
cd frontend
vercel --prod
```

#### ICP Hosting
```bash
# Deploy to ICP asset canister
cd frontend
npm run build
dfx deploy frontend --network ic
```

## CI/CD Pipeline

### GitHub Actions Setup
```yaml
# .github/workflows/deploy.yml
name: Deploy to ICP
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - name: Install DFX
        run: sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
      - name: Deploy
        run: |
          dfx start --background
          dfx deploy
```

## Monitoring & Maintenance

### Health Checks
```bash
# Check canister health
dfx canister status --all --network ic

# Monitor cycles consumption
dfx canister status auth_canister --network ic | grep cycles
```

### Updates & Upgrades
```bash
# Upgrade canister with new code
dfx deploy auth_canister --mode upgrade --network ic

# Backup canister state before upgrade
dfx canister call auth_canister backup_state --network ic
```

## Troubleshooting

### Common Issues

#### DFX Issues
```bash
# Reset local replica
dfx stop
dfx start --clean

# Clear dfx cache
rm -rf .dfx/
```

#### Build Issues
```bash
# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Clear Rust build cache
cargo clean
```

#### Network Issues
```bash
# Check network connectivity
dfx ping ic

# Verify canister deployment
dfx canister id auth_canister --network ic
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Cycles balance sufficient
- [ ] Security audit completed
- [ ] Backup procedures in place

### Post-Deployment
- [ ] Canister IDs documented
- [ ] Health checks passing
- [ ] Monitoring configured
- [ ] Documentation updated
- [ ] Team notified

## Mainnet Canister IDs

```bash
# Production Canister IDs
auth_canister: rdmx6-jaaaa-aaaah-qcaiq-cai
event_canister: rrkah-fqaaa-aaaah-qcaiq-cai
nft_canister: rqvl3-sqaaa-aaaah-qcaiq-cai
profile_canister: rwr7z-4qaaa-aaaah-qcaiq-cai
analytics_canister: rwfgd-liaaa-aaaah-qcaiq-cai
wallet_canister: rxzep-hqaaa-aaaah-qcaiq-cai
frontend: r6r7a-aqaaa-aaaah-qcaiq-cai
```

---

*For additional support, contact the development team or check our troubleshooting guide.*
