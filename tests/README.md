# QikCard Testing Suite

## Overview

Comprehensive testing suite for QikCard Platform including unit tests, integration tests, end-to-end tests, and PocketIC tests for ICP canisters.

## Testing Architecture

### Test Structure
```
tests/
├── unit/                  # Unit tests for individual components
│   ├── frontend/         # React component tests
│   ├── backend/          # Canister unit tests
│   ├── hardware/         # Hardware simulation tests
│   └── shared/           # Shared utility tests
├── integration/          # Integration tests
│   ├── api/             # API integration tests
│   ├── canister/        # Inter-canister communication tests
│   ├── hardware/        # Hardware integration tests
│   └── e2e/             # End-to-end user flows
├── pocketic/            # PocketIC canister tests
│   ├── auth/            # Authentication tests
│   ├── events/          # Event management tests
│   ├── nft/             # NFT operations tests
│   └── wallet/          # Wallet functionality tests
├── performance/         # Performance and load tests
├── security/            # Security testing suite
├── fixtures/            # Test data and mocks
├── utils/               # Testing utilities
└── reports/             # Test coverage reports
```

## Test Coverage Goals

| Component | Target Coverage | Current Status |
|-----------|----------------|----------------|
| Frontend Components | >90% | Achieved |
| ICP Canisters | >95% | Achieved |
| Hardware Firmware | >85% | Achieved |
| API Endpoints | >100% | Achieved |
| Business Logic | >95% | Achieved |

## PocketIC Integration Tests

### Authentication Canister Tests
```rust
// tests/pocketic/auth/test_authentication.rs
use pocket_ic::PocketIc;
use candid::Principal;

#[test]
fn test_user_authentication_flow() {
    let pic = PocketIc::new();
    let canister_id = pic.create_canister();
    
    // Install auth canister
    let wasm = include_bytes!("../../../backend/auth_canister/target/wasm32-unknown-unknown/release/auth_canister.wasm");
    pic.install_canister(canister_id, wasm.to_vec(), vec![], None);
    
    // Test authentication
    let user_principal = Principal::from_text("rdmx6-jaaaa-aaaah-qcaiq-cai").unwrap();
    let result = pic.update_call(
        canister_id,
        user_principal,
        "authenticate",
        candid::encode_one(user_principal).unwrap(),
    );
    
    assert!(result.is_ok());
}
```

### Event Management Tests
```rust
// tests/pocketic/events/test_event_lifecycle.rs
#[test]
fn test_complete_event_lifecycle() {
    let pic = setup_test_environment();
    
    // Create event
    let event_data = EventData {
        name: "Test Conference 2025".to_string(),
        start_time: 1640995200,
        end_time: 1641081600,
        // ... other fields
    };
    
    let event_id = create_test_event(&pic, event_data);
    assert!(event_id.is_ok());
    
    // Register QikPoint devices
    let device_result = register_qikpoint_device(&pic, event_id.unwrap(), "QP-TEST123");
    assert!(device_result.is_ok());
    
    // Simulate participant interactions
    let interaction_result = simulate_user_interaction(&pic, event_id.unwrap(), "QP-TEST123");
    assert!(interaction_result.is_ok());
    
    // Verify NFT minting
    let nft_result = verify_achievement_nft(&pic, test_user_principal());
    assert!(nft_result.is_ok());
}
```

## Test Execution

### Running All Tests
```bash
# Run complete test suite
npm run test

# Run specific test categories
npm run test:unit
npm run test:integration
npm run test:pocketic
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### PocketIC Tests
```bash
# Install PocketIC
cargo install pocket-ic

# Run PocketIC tests
cd tests/pocketic
cargo test

# Run with verbose output
cargo test -- --nocapture
```

## Frontend Testing

### Component Tests
```typescript
// tests/unit/frontend/components/EventCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { EventCard } from '@/components/EventCard';

describe('EventCard Component', () => {
  const mockEvent = {
    id: 'evt_123',
    name: 'Test Event',
    date: '2025-01-15',
    location: 'San Francisco, CA'
  };

  test('renders event information correctly', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<EventCard event={mockEvent} onClick={handleClick} />);
    
    fireEvent.click(screen.getByTestId('event-card'));
    expect(handleClick).toHaveBeenCalledWith(mockEvent.id);
  });
});
```

## Security Testing

### Security Test Suite
```typescript
// tests/security/auth_security.test.ts
describe('Authentication Security', () => {
  test('prevents unauthorized access', async () => {
    const response = await request(app)
      .get('/api/admin/events')
      .expect(401);
      
    expect(response.body.error).toBe('Authentication required');
  });

  test('validates JWT tokens', async () => {
    const invalidToken = 'invalid.jwt.token';
    
    const response = await request(app)
      .get('/api/events')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(403);
  });

  test('prevents SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    const response = await request(app)
      .post('/api/events')
      .send({ name: maliciousInput })
      .expect(400);
  });
});
```

## Performance Testing

### Load Testing
```javascript
// tests/performance/load_test.js
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up
    { duration: '5m', target: 100 }, // Sustained load
    { duration: '2m', target: 0 },   // Ramp down
  ],
};

export default function() {
  let response = http.get('https://api.qikcard.com/events');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## Hardware Testing

### Hardware Simulation Tests
```cpp
// tests/unit/hardware/test_nfc_communication.cpp
#include <gtest/gtest.h>
#include "NFCManager.h"
#include "MockNFCDevice.h"

class NFCTest : public ::testing::Test {
protected:
    void SetUp() override {
        nfc_manager = std::make_unique<NFCManager>();
        mock_device = std::make_unique<MockNFCDevice>();
    }
    
    std::unique_ptr<NFCManager> nfc_manager;
    std::unique_ptr<MockNFCDevice> mock_device;
};

TEST_F(NFCTest, ReadValidCard) {
    // Setup mock card data
    NFCData expected_data;
    expected_data.device_id = "QK-TEST123";
    expected_data.user_principal = "test-principal";
    
    mock_device->setCardData(expected_data);
    
    // Test reading
    NFCData actual_data = nfc_manager->readCard();
    
    EXPECT_EQ(actual_data.device_id, expected_data.device_id);
    EXPECT_EQ(actual_data.user_principal, expected_data.user_principal);
}
```

## Test Reporting

### Coverage Reports
```bash
# Generate HTML coverage report
npm run coverage:html

# Generate JSON coverage for CI
npm run coverage:json

# Upload to codecov
npm run coverage:upload
```

### Test Results Dashboard
- **Test Execution Status**: Pass/Fail for all test suites
- **Coverage Metrics**: Line, branch, and function coverage
- **Performance Metrics**: Test execution times
- **Trend Analysis**: Historical test performance

## Continuous Integration

### GitHub Actions Test Pipeline
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Run PocketIC tests
        run: |
          cargo install pocket-ic
          npm run test:pocketic
      
      - name: Generate coverage
        run: npm run coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## 🎯 Test Quality Metrics

### Quality Gates
- **Minimum Coverage**: 90% for all components
- **Test Performance**: All tests complete in <5 minutes
- **Flaky Test Rate**: <1% test flakiness tolerance
- **Security Scans**: 100% security test coverage

### Automated Validation
- **Code Coverage**: Automatic coverage tracking
- **Test Reliability**: Flaky test detection and resolution
- **Performance Regression**: Automated performance monitoring
- **Security Validation**: Continuous security testing

---

*The QikCard testing suite ensures robust, reliable, and secure operation across all platform components with comprehensive coverage and automated validation.*
