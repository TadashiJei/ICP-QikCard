#!/bin/bash

# QikCard Backend Deployment Script
# This script deploys all canisters to local or mainnet environments

set -e

echo "Deploying QikCard Backend..."

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
    echo -e "${BLUE}[DEPLOY]${NC} $1"
}

# Default values
NETWORK="local"
SKIP_BUILD=false
SKIP_TESTS=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --network)
            NETWORK="$2"
            shift 2
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --network NETWORK    Deploy to specific network (local|ic)"
            echo "  --skip-build         Skip build step"
            echo "  --skip-tests         Skip running tests"
            echo "  --help               Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

print_header "Starting deployment to $NETWORK..."

# Check if dfx is installed
if ! command -v dfx &> /dev/null; then
    print_error "dfx is not installed. Please install DFINITY SDK first."
    exit 1
fi

# Check if we're in the backend directory
if [[ ! -f "dfx.json" ]]; then
    print_error "dfx.json not found. Please run this script from the backend directory."
    exit 1
fi

# Check network configuration
if [[ "$NETWORK" == "ic" ]]; then
    print_warning "Deploying to mainnet! This will use real cycles."
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled."
        exit 0
    fi
fi

# Run tests if not skipped
if [[ "$SKIP_TESTS" == false ]]; then
    print_status "Running tests..."
    if [[ -f "scripts/test.sh" ]]; then
        ./scripts/test.sh
    else
        print_warning "Test script not found, skipping tests"
    fi
fi

# Build if not skipped
if [[ "$SKIP_BUILD" == false ]]; then
    print_status "Building canisters..."
    if [[ -f "scripts/build.sh" ]]; then
        ./scripts/build.sh
    else
        dfx build
    fi
fi

# Start replica if deploying locally
if [[ "$NETWORK" == "local" ]]; then
    print_status "Starting local replica..."
    if ! dfx ping &> /dev/null; then
        dfx start --background --clean
        sleep 5
    fi
fi

# Deploy canisters
print_header "Deploying canisters..."

# Deploy in dependency order
print_status "Deploying auth canister..."
dfx deploy auth --network $NETWORK

print_status "Deploying profile canister..."
dfx deploy profile --network $NETWORK

print_status "Deploying event canister..."
dfx deploy event --network $NETWORK

print_status "Deploying nft canister..."
dfx deploy nft --network $NETWORK

print_status "Deploying analytics canister..."
dfx deploy analytics --network $NETWORK

print_status "Deploying wallet canister..."
dfx deploy wallet --network $NETWORK

# Display deployment results
print_header "Deployment completed!"

echo ""
print_status "Canister IDs:"
dfx canister --network $NETWORK id auth
dfx canister --network $NETWORK id event
dfx canister --network $NETWORK id nft
dfx canister --network $NETWORK id profile
dfx canister --network $NETWORK id analytics
dfx canister --network $NETWORK id wallet

echo ""
print_status "Environment configuration:"
echo "Network: $NETWORK"
echo "DFX version: $(dfx --version)"
echo "Canister status: $(dfx canister --network $NETWORK status --all | grep -c 'Running') running"

# Create environment file
print_status "Creating environment file..."
cat > .env << EOF
# QikCard Backend Configuration
NETWORK=$NETWORK

# Canister IDs
AUTH_CANISTER_ID=$(dfx canister --network $NETWORK id auth)
EVENT_CANISTER_ID=$(dfx canister --network $NETWORK id event)
NFT_CANISTER_ID=$(dfx canister --network $NETWORK id nft)
PROFILE_CANISTER_ID=$(dfx canister --network $NETWORK id profile)
ANALYTICS_CANISTER_ID=$(dfx canister --network $NETWORK id analytics)
WALLET_CANISTER_ID=$(dfx canister --network $NETWORK id wallet)

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
EOF

print_status "Environment file created: .env"

echo ""
print_status "Next steps:"
if [[ "$NETWORK" == "local" ]]; then
    echo "1. Test the APIs: dfx canister call auth registerUser '(\"Test User\", \"test@example.com\")'"
    echo "2. Start frontend development: npm start"
    echo "3. View canister logs: dfx canister logs --follow auth"
else
    echo "1. Update frontend with mainnet canister IDs"
    echo "2. Configure Internet Identity for mainnet"
    echo "3. Test with real cycles and tokens"
fi

print_header "Deployment summary saved to deployment.log"
date > deployment.log
echo "Network: $NETWORK" >> deployment.log
dfx canister --network $NETWORK id auth >> deployment.log
dfx canister --network $NETWORK id event >> deployment.log
dfx canister --network $NETWORK id nft >> deployment.log
dfx canister --network $NETWORK id profile >> deployment.log
dfx canister --network $NETWORK id analytics >> deployment.log
dfx canister --network $NETWORK id wallet >> deployment.log
