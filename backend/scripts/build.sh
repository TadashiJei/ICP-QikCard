#!/bin/bash

# QikCard Backend Build Script
# This script builds all canisters for the QikCard platform

set -e

echo "Building QikCard Backend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

print_status "Starting build process..."

# Clean previous builds
print_status "Cleaning previous builds..."
dfx clean

# Install dependencies for Rust canister
print_status "Installing Rust dependencies..."
cd canisters/wallet
cargo check
cd ../..

# Build all canisters
print_status "Building all canisters..."
dfx build

print_status "Build completed successfully!"

# Display build results
print_status "Canister build summary:"
dfx canister --network local info auth 2>/dev/null || print_warning "Auth canister not built"
dfx canister --network local info event 2>/dev/null || print_warning "Event canister not built"
dfx canister --network local info nft 2>/dev/null || print_warning "NFT canister not built"
dfx canister --network local info profile 2>/dev/null || print_warning "Profile canister not built"
dfx canister --network local info analytics 2>/dev/null || print_warning "Analytics canister not built"
dfx canister --network local info wallet 2>/dev/null || print_warning "Wallet canister not built"

echo ""
print_status "Next steps:"
echo "1. Start local replica: dfx start --background"
echo "2. Deploy canisters: dfx deploy"
echo "3. Test endpoints: dfx canister call auth registerUser '(\"Test User\", \"test@example.com\")'"
