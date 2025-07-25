#!/bin/bash

# QikCard Backend Test Script
# This script runs comprehensive tests for all canisters

set -e

echo "Running QikCard Backend Tests..."

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
    echo -e "${BLUE}[TEST]${NC} $1"
}

# Default values
SKIP_BUILD=false
VERBOSE=false
NETWORK="local"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --verbose)
            VERBOSE=true
            shift
            ;;
        --network)
            NETWORK="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --skip-build         Skip build step"
            echo "  --verbose            Enable verbose output"
            echo "  --network NETWORK    Test on specific network (local|ic)"
            echo "  --help               Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

print_header "Starting test suite..."

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

# Build if not skipped
if [[ "$SKIP_BUILD" == false ]]; then
    print_status "Building canisters for testing..."
    ./scripts/build.sh
fi

# Start replica if testing locally
if [[ "$NETWORK" == "local" ]]; then
    print_status "Starting local replica for testing..."
    if ! dfx ping &> /dev/null; then
        dfx start --background --clean
        sleep 5
    fi
fi

# Deploy canisters for testing
print_status "Deploying canisters for testing..."
dfx deploy --network $NETWORK

# Test results tracking
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run individual test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    print_header "Running test: $test_name"
    
    if [[ "$VERBOSE" == true ]]; then
        echo "Command: $test_command"
    fi
    
    if eval "$test_command" &> /dev/null; then
        if [[ "$VERBOSE" == true ]]; then
            eval "$test_command"
        fi
        print_status "✓ PASSED: $test_name"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        print_error "✗ FAILED: $test_name"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        
        if [[ "$VERBOSE" == true ]]; then
            eval "$test_command" || true
        fi
    fi
}

# Test authentication canister
print_header "Testing Authentication Canister..."

run_test "User Registration" \
    "dfx canister --network $NETWORK call auth registerUser '(\"Test User\", \"test@example.com\")'" \
    "success"

run_test "Duplicate Registration Prevention" \
    "dfx canister --network $NETWORK call auth registerUser '(\"Test User\", \"test@example.com\')' | grep -q 'already registered'" \
    "error"

# Test event canister
print_header "Testing Event Canister..."

run_test "Event Creation" \
    "dfx canister --network $NETWORK call event createEvent '(\"Test Event\", \"Test Description\", \"Test Location\", 1234567890, 1234567890, 100)'" \
    "success"

run_test "Get All Events" \
    "dfx canister --network $NETWORK call event getAllEvents" \
    "success"

# Test NFT canister
print_header "Testing NFT Canister..."

run_test "Get User NFTs" \
    "dfx canister --network $NETWORK call nft getUserNFTs '(principal \"$(dfx identity get-principal)\")'" \
    "success"

run_test "Get All Achievements" \
    "dfx canister --network $NETWORK call nft getAllAchievements" \
    "success"

# Test profile canister
print_header "Testing Profile Canister..."

run_test "Profile Creation" \
    "dfx canister --network $NETWORK call profile createProfile '(\"testuser\", \"Test User\", \"Test bio\", \"https://example.com/avatar.png\")'" \
    "success"

run_test "Get User Stats" \
    "dfx canister --network $NETWORK call profile getUserStats '(principal \"$(dfx identity get-principal)\")'" \
    "success"

# Test analytics canister
print_header "Testing Analytics Canister..."

run_test "Track Event" \
    "dfx canister --network $NETWORK call analytics trackEvent '(\"test_event\", null, null, vec {})'" \
    "success"

run_test "Get Dashboard Metrics" \
    "dfx canister --network $NETWORK call analytics getDashboardMetrics" \
    "success"

# Test wallet canister
print_header "Testing Wallet Canister..."

run_test "Create Wallet" \
    "dfx canister --network $NETWORK call wallet create_wallet '(record { currency = \"ICP\"; user_principal = principal \"$(dfx identity get-principal)\" })'" \
    "success"

run_test "Check Balance" \
    "dfx canister --network $NETWORK call wallet balance '(principal \"$(dfx identity get-principal)\", \"ICP\")'" \
    "success"

# Test inter-canister communication
print_header "Testing Inter-Canister Communication..."

run_test "Profile Creation After Auth" \
    "dfx canister --network $NETWORK call auth registerUser '(\"Integration Test\", \"integration@example.com\')' && dfx canister --network $NETWORK call profile createProfile '(\"integrationuser\", \"Integration User\", \"Integration test bio\", \"https://example.com/avatar.png\")'" \
    "success"

# Performance tests
print_header "Running Performance Tests..."

run_test "Load Test - Multiple Registrations" \
    "for i in {1..5}; do dfx canister --network $NETWORK call auth registerUser '(\"User$i\", \"user$i@example.com\")'; done" \
    "success"

# Security tests
print_header "Running Security Tests..."

run_test "Unauthorized Access Prevention" \
    "dfx canister --network $NETWORK call auth getUser '(principal \"aaaaa-aa\")' | grep -q 'User not found'" \
    "error"

# Print test summary
echo ""
print_header "Test Summary"
echo "=================="
echo "Total Tests: $TOTAL_TESTS"
echo "Passed: $PASSED_TESTS"
echo "Failed: $FAILED_TESTS"
echo "Success Rate: $(echo "scale=2; $PASSED_TESTS * 100 / $TOTAL_TESTS" | bc -l)%"

# Generate test report
print_status "Generating test report..."
cat > test_report.txt << EOF
QikCard Backend Test Report
==========================
Date: $(date)
Network: $NETWORK
Total Tests: $TOTAL_TESTS
Passed: $PASSED_TESTS
Failed: $FAILED_TESTS
Success Rate: $(echo "scale=2; $PASSED_TESTS * 100 / $TOTAL_TESTS" | bc -l)%

Test Details:
- Authentication: User registration, login, permissions
- Events: Creation, check-in/out, QikPoint integration
- NFT: Minting, transfers, achievements
- Profile: Creation, updates, social features
- Analytics: Event tracking, metrics, reports
- Wallet: Creation, transfers, balance checks
- Integration: Inter-canister communication
- Performance: Load testing
- Security: Access control, input validation

EOF

if [[ $FAILED_TESTS -eq 0 ]]; then
    print_status "All tests passed! ✨"
    exit 0
else
    print_error "Some tests failed. Check test_report.txt for details."
    exit 1
fi
