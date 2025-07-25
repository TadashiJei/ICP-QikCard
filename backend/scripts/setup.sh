#!/bin/bash

# QikCard Backend Setup Script
# This script sets up the development environment for the QikCard backend

set -e

echo "Setting up QikCard Backend Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[SETUP]${NC} $1"
}

# Check if we're in the backend directory
if [[ ! -f "dfx.json" ]]; then
    print_error "dfx.json not found. Please run this script from the backend directory."
    exit 1
fi

print_header "Checking prerequisites..."

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    print_error "dfx is not installed. Please install DFINITY SDK first."
    echo "Visit: https://internetcomputer.org/docs/current/developer-docs/setup/install"
    exit 1
else
    print_status "dfx version: $(dfx --version)"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_warning "Node.js is not installed. Install Node.js 18+ for frontend development."
    echo "Visit: https://nodejs.org/"
else
    print_status "Node.js version: $(node --version)"
fi

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
    print_error "Rust is not installed. Please install Rust 1.70+ for wallet canister."
    echo "Visit: https://rust-lang.org/tools/install"
    exit 1
else
    print_status "Rust version: $(rustc --version)"
fi

# Check if Motoko compiler is available
if ! dfx build --help &> /dev/null; then
    print_error "Motoko compiler not available. Please check DFINITY SDK installation."
    exit 1
else
    print_status "Motoko compiler available"
fi

print_header "Setting up development environment..."

# Create necessary directories
mkdir -p logs
mkdir -p temp
mkdir -p test-data

# Make scripts executable
chmod +x scripts/*.sh

# Install Rust dependencies for wallet canister
print_status "Installing Rust dependencies..."
cd canisters/wallet
if [[ -f "Cargo.toml" ]]; then
    cargo check
    cargo build --release
    print_status "Rust dependencies installed successfully"
else
    print_warning "Cargo.toml not found in wallet canister"
fi
cd ../..

# Create .env template
print_status "Creating environment template..."
cat > .env.template << EOF
# QikCard Backend Environment Configuration
# Copy this file to .env and update with your values

# Network configuration
NETWORK=local

# Canister IDs (auto-generated after deployment)
AUTH_CANISTER_ID=
EVENT_CANISTER_ID=
NFT_CANISTER_ID=
PROFILE_CANISTER_ID=
ANALYTICS_CANISTER_ID=
WALLET_CANISTER_ID=

# Frontend URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000

# Development settings
DEBUG=true
LOG_LEVEL=info

# Security settings
SESSION_TIMEOUT=86400
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60
EOF

# Create .gitignore if it doesn't exist
if [[ ! -f ".gitignore" ]]; then
    print_status "Creating .gitignore..."
    cat > .gitignore << EOF
# Build artifacts
.wasm
.did
.most
.mo
.did.js
.did.d.ts

# DFX
.dfx/

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Rust
target/
Cargo.lock

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
logs/
*.log

# OS
.DS_Store
Thumbs.db

# Temporary files
temp/
test-data/
EOF
fi

# Create development configuration
print_status "Creating development configuration..."
cat > development.json << EOF
{
  "network": {
    "local": {
      "bind": "127.0.0.1:8000",
      "type": "ephemeral"
    }
  },
  "canisters": {
    "auth": {
      "init": {
        "internet_identity_canister_id": "rdmx6-jaaaa-aaaah-qcaiq-cai"
      }
    },
    "event": {
      "init": {
        "max_events": 1000,
        "max_attendees": 10000
      }
    },
    "nft": {
      "init": {
        "max_supply": 1000000,
        "royalty_fee": 250
      }
    },
    "profile": {
      "init": {
        "max_username_length": 50,
        "max_bio_length": 500
      }
    },
    "analytics": {
      "init": {
        "retention_days": 365,
        "aggregation_interval": 3600
      }
    },
    "wallet": {
      "init": {
        "supported_currencies": ["ICP", "BTC", "ETH"],
        "min_transfer_amount": 1000
      }
    }
  }
}
EOF

# Create test data
print_status "Creating test data..."
mkdir -p test-data/fixtures
cat > test-data/fixtures/users.json << EOF
[
  {
    "principal": "2vxsx-fae",
    "username": "admin",
    "display_name": "Admin User",
    "email": "admin@qikcard.com",
    "role": "admin"
  },
  {
    "principal": "2vxsx-fae",
    "username": "organizer",
    "display_name": "Event Organizer",
    "email": "organizer@qikcard.com",
    "role": "organizer"
  },
  {
    "principal": "2vxsx-fae",
    "username": "user1",
    "display_name": "Test User 1",
    "email": "user1@example.com",
    "role": "user"
  }
]
EOF

cat > test-data/fixtures/events.json << EOF
[
  {
    "name": "Web3 Meetup",
    "description": "Monthly Web3 networking event",
    "location": "San Francisco, CA",
    "start_time": 1234567890,
    "end_time": 1234567890,
    "max_attendees": 100,
    "status": "active"
  },
  {
    "name": "Blockchain Workshop",
    "description": "Hands-on blockchain development workshop",
    "location": "Virtual",
    "start_time": 1234567890,
    "end_time": 1234567890,
    "max_attendees": 50,
    "status": "draft"
  }
]
EOF

# Create documentation summary
print_status "Creating documentation summary..."
cat > README_SETUP.md << EOF
# QikCard Backend Setup Complete

## What's Been Set Up

✅ Prerequisites checked (dfx, Node.js, Rust, Motoko)
✅ Scripts made executable
✅ Rust dependencies installed
✅ Environment template created
✅ .gitignore configured
✅ Development configuration created
✅ Test data fixtures prepared
✅ Documentation structure established

## Next Steps

1. **Copy environment template**:
   \`\`\`bash
   cp .env.template .env
   \`\`\`

2. **Start local development**:
   \`\`\`bash
   dfx start --background
   dfx deploy
   \`\`\`

3. **Run tests**:
   \`\`\`bash
   ./scripts/test.sh
   \`\`\`

4. **Test APIs**:
   \`\`\`bash
   dfx canister call auth registerUser '("Test User", "test@example.com")'
   \`\`\`

## Directory Structure

\`\`\`
backend/
├── canisters/
│   ├── auth/
│   ├── event/
│   ├── nft/
│   ├── profile/
│   ├── analytics/
│   └── wallet/
├── scripts/
│   ├── build.sh
│   ├── deploy.sh
│   ├── test.sh
│   └── setup.sh
├── docs/
├── logs/
├── temp/
├── test-data/
├── .env.template
├── development.json
└── README.md
\`\`\`

## Support

For issues or questions:
- Check the [troubleshooting guide](README.md#troubleshooting)
- Review [API documentation](API.md)
- Open an issue on GitHub
EOF

print_header "Setup completed successfully!"
echo ""
print_status "Setup summary:"
echo "- Prerequisites verified"
echo "- Scripts configured"
echo "- Environment template created"
echo "- Test data prepared"
echo "- Documentation updated"
echo ""
print_status "Next steps:"
echo "1. Copy .env.template to .env"
echo "2. Start local development with: dfx start --background"
echo "3. Deploy with: dfx deploy"
echo "4. Run tests with: ./scripts/test.sh"
echo ""
print_header "Happy coding!"
