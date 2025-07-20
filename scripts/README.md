# QikCard Deployment & Utility Scripts

## Overview

Collection of deployment scripts, utilities, and automation tools for the QikCard Platform development and production workflows.

## Script Organization

```
scripts/
├── deployment/           # Deployment automation
│   ├── deploy-mainnet.sh    # Deploy to ICP mainnet
│   ├── deploy-local.sh      # Local development deployment
│   ├── deploy-staging.sh    # Staging environment deployment
│   └── rollback.sh          # Rollback deployment
├── database/            # Database management
│   ├── migrate.sh          # Run database migrations
│   ├── seed.sh             # Seed test data
│   ├── backup.sh           # Database backup
│   └── restore.sh          # Database restore
├── hardware/            # Hardware management
│   ├── flash-firmware.sh   # Flash QikPoint firmware
│   ├── provision-cards.sh  # Provision QikCard devices
│   ├── test-hardware.sh    # Hardware testing suite
│   └── update-ota.sh       # Over-the-air updates
├── monitoring/          # Monitoring and alerts
│   ├── health-check.sh     # System health monitoring
│   ├── log-analysis.sh     # Log processing
│   ├── metrics-export.sh   # Export metrics
│   └── alert-setup.sh      # Configure alerting
├── development/         # Development utilities
│   ├── setup-dev.sh        # Development environment setup
│   ├── reset-env.sh        # Reset development environment
│   ├── generate-keys.sh    # Generate test keys
│   └── mock-data.sh        # Generate mock data
└── ci-cd/              # CI/CD pipeline scripts
    ├── build.sh            # Build pipeline
    ├── test.sh             # Test pipeline
    ├── deploy.sh           # Deployment pipeline
    └── notify.sh           # Notification scripts
```

## Deployment Scripts

### Mainnet Deployment
```bash
#!/bin/bash
# scripts/deployment/deploy-mainnet.sh

set -e

echo "Deploying QikCard Platform to ICP Mainnet..."

# Check prerequisites
if ! command -v dfx &> /dev/null; then
    echo "DFX not found. Please install DFX first."
    exit 1
fi

# Check cycles balance
CYCLES_BALANCE=$(dfx wallet balance --network ic | grep -o '[0-9,]*' | tr -d ',')
MIN_CYCLES=50000000000000  # 50T cycles minimum

if [ "$CYCLES_BALANCE" -lt "$MIN_CYCLES" ]; then
    echo "Insufficient cycles balance: $CYCLES_BALANCE"
    echo "Please top up your cycles wallet"
    exit 1
fi

# Build all canisters
echo "Building canisters..."
dfx build --network ic

# Deploy canisters with cycles
echo "Deploying to mainnet..."
dfx deploy --network ic --with-cycles 10000000000000

# Update canister settings
echo "Configuring production settings..."
dfx canister call auth_canister setEnvironment '("production")' --network ic
dfx canister call event_canister setApiEndpoint '("https://api.qikcard.com")' --network ic

# Verify deployment
echo "Verifying deployment..."
dfx canister status auth_canister --network ic
dfx canister status event_canister --network ic

echo "Deployment completed successfully!"
echo "Canister IDs saved to canister_ids.json"
```

### Local Development Setup
```bash
#!/bin/bash
# scripts/development/setup-dev.sh

set -e

echo "Setting up QikCard development environment..."

# Check prerequisites
check_prerequisites() {
    local missing_tools=()
    
    command -v node &> /dev/null || missing_tools+=("node")
    command -v dfx &> /dev/null || missing_tools+=("dfx")
    command -v cargo &> /dev/null || missing_tools+=("cargo")
    command -v docker &> /dev/null || missing_tools+=("docker")
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        echo "Missing required tools: ${missing_tools[*]}"
        echo "Please install them before continuing."
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    echo "Installing dependencies..."
    
    # Frontend dependencies
    cd frontend && npm install && cd ..
    
    # QikHub dependencies
    cd qikhub && npm install && cd ..
    
    # Test dependencies
    cd tests && npm install && cd ..
    
    # Rust dependencies
    cd backend && cargo build && cd ..
}

# Setup local replica
setup_replica() {
    echo "Starting local ICP replica..."
    dfx start --clean --background
    
    echo "Deploying canisters locally..."
    dfx deploy
    
    echo "Canister URLs:"
    dfx canister call auth_canister --query getCanisterInfo
}

# Run setup
check_prerequisites
install_dependencies
setup_replica

echo "Development environment ready!"
echo "Frontend: http://localhost:3000"
echo "QikHub: http://localhost:3001"
```

## Database Scripts

### Migration Script
```bash
#!/bin/bash
# scripts/database/migrate.sh

set -e

DB_URL=${DATABASE_URL:-"postgresql://postgres:password@localhost:5432/qikcard"}

echo "Running database migrations..."

# Check if database exists
if ! psql "$DB_URL" -c '\q' 2>/dev/null; then
    echo "Cannot connect to database: $DB_URL"
    exit 1
fi

# Run migrations
cd qikhub/server
npx prisma migrate deploy

echo "Database migrations completed"
```

## Hardware Scripts

### Firmware Flashing
```bash
#!/bin/bash
# scripts/hardware/flash-firmware.sh

set -e

DEVICE_PORT=${1:-"/dev/ttyUSB0"}
FIRMWARE_PATH="hardware/qikpoint-scanner/firmware"

echo "Flashing QikPoint Scanner firmware..."

# Check if PlatformIO is installed
if ! command -v pio &> /dev/null; then
    echo "PlatformIO not found. Installing..."
    pip install platformio
fi

# Build and flash firmware
cd "$FIRMWARE_PATH"
pio run --target upload --upload-port "$DEVICE_PORT"

echo "Firmware flashed successfully to $DEVICE_PORT"
```

## Monitoring Scripts

### Health Check
```bash
#!/bin/bash
# scripts/monitoring/health-check.sh

API_BASE_URL=${API_BASE_URL:-"https://api.qikcard.com"}
WEBHOOK_URL=${WEBHOOK_URL:-""}

check_endpoint() {
    local endpoint=$1
    local name=$2
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$API_BASE_URL$endpoint" || echo "000")
    
    if [ "$response" = "200" ]; then
        echo "$name: OK ($response)"
        return 0
    else
        echo "$name: FAIL ($response)"
        return 1
    fi
}

# Run health checks
echo "QikCard Platform Health Check"
echo "================================"

failed=0

check_endpoint "/health" "API Health" || failed=$((failed + 1))
check_endpoint "/events" "Events API" || failed=$((failed + 1))
check_endpoint "/auth/status" "Auth Service" || failed=$((failed + 1))

# Check canister status
if command -v dfx &> /dev/null; then
    echo "Checking ICP Canisters..."
    dfx canister status auth_canister --network ic >/dev/null 2>&1 && echo "Auth Canister: OK" || { echo "Auth Canister: FAIL"; failed=$((failed + 1)); }
fi

# Send alert if failures
if [ $failed -gt 0 ] && [ -n "$WEBHOOK_URL" ]; then
    curl -X POST "$WEBHOOK_URL" \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"QikCard Health Check: $failed failures detected\"}"
fi

exit $failed
```

## Testing Scripts

### Comprehensive Test Runner
```bash
#!/bin/bash
# scripts/ci-cd/test.sh

set -e

echo "Running QikCard Test Suite..."

# Function to run tests with timeout
run_test_suite() {
    local suite_name=$1
    local command=$2
    local timeout=${3:-300}  # 5 minutes default
    
    echo "Running $suite_name..."
    
    if timeout $timeout bash -c "$command"; then
        echo "$suite_name: PASSED"
        return 0
    else
        echo "$suite_name: FAILED"
        return 1
    fi
}

failed_suites=0

# Frontend tests
run_test_suite "Frontend Unit Tests" "cd frontend && npm test -- --watchAll=false" 180 || failed_suites=$((failed_suites + 1))

# Backend tests
run_test_suite "Backend Unit Tests" "cd backend && cargo test" 300 || failed_suites=$((failed_suites + 1))

# Integration tests
run_test_suite "Integration Tests" "cd tests && npm run test:integration" 600 || failed_suites=$((failed_suites + 1))

# PocketIC tests
run_test_suite "PocketIC Tests" "cd tests/pocketic && cargo test" 900 || failed_suites=$((failed_suites + 1))

# Hardware simulation tests
run_test_suite "Hardware Tests" "cd hardware && pio test" 240 || failed_suites=$((failed_suites + 1))

# Performance tests
run_test_suite "Performance Tests" "cd tests && npm run test:performance" 300 || failed_suites=$((failed_suites + 1))

# Generate coverage report
echo "Generating coverage report..."
npm run coverage:generate

echo "Test Summary:"
echo "==============="
if [ $failed_suites -eq 0 ]; then
    echo "All test suites passed!"
    exit 0
else
    echo "$failed_suites test suite(s) failed"
    exit 1
fi
```

## Key Generation Scripts

### Development Keys Script
```bash
#!/bin/bash
# scripts/development/generate-keys.sh

set -e

KEYS_DIR="keys"
mkdir -p "$KEYS_DIR"

echo "Generating development keys and certificates..."

# Generate JWT secret
openssl rand -hex 32 > "$KEYS_DIR/jwt_secret.key"

# Generate API keys
openssl rand -hex 16 > "$KEYS_DIR/api_key.key"

# Generate certificates for HTTPS
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "$KEYS_DIR/private.key" \
    -out "$KEYS_DIR/certificate.crt" \
    -subj "/C=US/ST=CA/L=San Francisco/O=QikCard/CN=localhost"

echo "Keys generated in $KEYS_DIR/"
echo "DO NOT commit these keys to version control!"

# Create .env template
cat > .env.development << EOF
# Development Environment Variables
JWT_SECRET=$(cat "$KEYS_DIR/jwt_secret.key")
API_KEY=$(cat "$KEYS_DIR/api_key.key")
DATABASE_URL=postgresql://postgres:password@localhost:5432/qikcard_dev
REDIS_URL=redis://localhost:6379
MQTT_BROKER_URL=mqtt://localhost:1883

# ICP Configuration
DFX_NETWORK=local
CANISTER_ID_AUTH=rdmx6-jaaaa-aaaah-qcaiq-cai
CANISTER_ID_EVENT=rrkah-fqaaa-aaaah-qcaiq-cai

# External Services
IPFS_API_KEY=your-ipfs-key-here
ANALYTICS_API_KEY=your-analytics-key-here
EOF

echo "Created .env.development template"
```

## Mock Data Scripts

### Mock Data Generation
```bash
#!/bin/bash
# scripts/development/mock-data.sh

set -e

echo "🎭 Generating mock data for development..."

# Generate test events
cat > test-data/events.json << EOF
[
  {
    "name": "Web3 Conference 2025",
    "description": "The premier Web3 technology conference",
    "startDate": "2025-03-15T09:00:00Z",
    "endDate": "2025-03-17T18:00:00Z",
    "location": "San Francisco, CA",
    "activities": [
      {"name": "Registration", "type": "checkin"},
      {"name": "Keynote", "type": "session"},
      {"name": "Networking", "type": "social"}
    ]
  }
]
EOF

# Generate test users
cat > test-data/users.json << EOF
[
  {
    "principal": "test-user-1",
    "name": "Alice Developer",
    "email": "alice@example.com",
    "role": "participant"
  },
  {
    "principal": "test-user-2", 
    "name": "Bob Organizer",
    "email": "bob@example.com",
    "role": "organizer"
  }
]
EOF

echo "✅ Mock data generated in test-data/"
```

## 📋 Usage Instructions

### Quick Commands
```bash
# Setup development environment
./scripts/development/setup-dev.sh

# Deploy to mainnet
./scripts/deployment/deploy-mainnet.sh

# Run health check
./scripts/monitoring/health-check.sh

# Flash hardware firmware
./scripts/hardware/flash-firmware.sh /dev/ttyUSB0

# Run complete test suite
./scripts/ci-cd/test.sh

# Generate development keys
./scripts/development/generate-keys.sh
```

### Environment Variables
```bash
# Required for deployment scripts
export DFX_NETWORK=ic
export CYCLES_WALLET_ID=your-wallet-id

# Required for database scripts
export DATABASE_URL=postgresql://user:pass@host:port/db

# Required for monitoring
export WEBHOOK_URL=https://hooks.slack.com/your-webhook
export API_BASE_URL=https://api.qikcard.com
```

---

*These scripts automate common development, deployment, and maintenance tasks for the QikCard Platform, ensuring consistent and reliable operations across all environments.*
