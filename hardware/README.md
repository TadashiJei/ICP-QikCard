# QikCard Hardware Components

## Overview

The QikCard hardware ecosystem consists of two main components: QikPoint scanners (ESP32-based NFC readers) and QikCard devices (NFC-enabled crypto hardware wallets). This documentation covers firmware, PCB designs, and integration protocols.

## Hardware Architecture

### System Components
```
hardware/
├── qikpoint-scanner/      # ESP32-based NFC scanner devices
│   ├── firmware/         # C++/Arduino firmware
│   ├── pcb/             # PCB designs and schematics
│   ├── enclosure/       # 3D printable cases
│   └── docs/            # Technical specifications
├── qikcard-device/       # NFC crypto wallet hardware
│   ├── firmware/        # Secure element firmware
│   ├── pcb/            # PCB designs and layouts
│   ├── mechanical/     # Physical design files
│   └── testing/        # Hardware testing suites
├── shared/              # Shared libraries and protocols
├── simulators/          # Hardware simulation tools
├── tools/              # Development and flashing tools
└── manufacturing/      # Production specifications
```

## QikPoint Scanner

### Hardware Specifications
- **Microcontroller**: ESP32-WROOM-32E
- **NFC Module**: PN532 (13.56 MHz)
- **Connectivity**: WiFi 802.11 b/g/n, Bluetooth 4.2
- **Power**: USB-C, 3.7V Li-Po battery backup
- **Display**: 128x64 OLED (optional)
- **Indicators**: RGB LED, Piezo buzzer
- **Enclosure**: IP65-rated ABS plastic

### Firmware Features
```cpp
// Core functionality
- NFC card detection and reading
- WiFi connectivity management  
- HTTP client for API communication
- Local data caching and sync
- Over-the-air (OTA) updates
- Device health monitoring
```

### Pin Configuration
```cpp
// hardware/qikpoint-scanner/firmware/src/pins.h
#define NFC_SDA_PIN     21
#define NFC_SCL_PIN     22
#define NFC_IRQ_PIN     19
#define NFC_RESET_PIN   18

#define LED_RED_PIN     2
#define LED_GREEN_PIN   4
#define LED_BLUE_PIN    5
#define BUZZER_PIN      23

#define OLED_SDA_PIN    21
#define OLED_SCL_PIN    22
#define OLED_RESET_PIN  16
```

## QikCard Device

### Hardware Specifications
- **NFC Chip**: NTAG216 (924 bytes EEPROM)
- **Secure Element**: ATECC608A (Crypto authentication)
- **Form Factor**: Credit card size (85.6mm × 53.98mm)
- **Thickness**: 0.8mm standard card thickness
- **Material**: PVC with embedded antenna
- **Durability**: 10,000+ read/write cycles

### Security Features
```cpp
// Secure element capabilities
- Hardware-based key generation
- Secure key storage (16 slots)
- ECDSA P-256 signature generation
- SHA-256 hash computation
- True random number generation
- Tamper resistance
```

## Communication Protocols

### NFC Data Format
```json
{
  "version": "1.0",
  "device_id": "QK-ABC123456789",
  "user_principal": "rdmx6-jaaaa-aaaah-qcaiq-cai",
  "timestamp": 1640995200,
  "signature": "3045022100...",
  "interaction_type": "booth_checkin",
  "event_id": "evt_12345"
}
```

### MQTT Protocol (QikPoint to Backend)
```json
{
  "topic": "qikcard/interactions",
  "payload": {
    "scanner_id": "QP-XYZ987654321",
    "card_data": {...},
    "location": {"lat": 37.7749, "lng": -122.4194},
    "signal_strength": -45,
    "battery_level": 87
  }
}
```

## Development Environment

### Prerequisites
```bash
# Install PlatformIO
pip install platformio

# Install ESP32 board support
pio pkg install --platform espressif32

# Install required libraries
pio pkg install --library "adafruit/Adafruit PN532"
pio pkg install --library "bblanchon/ArduinoJson"
pio pkg install --library "knolleary/PubSubClient"
```

### Build and Flash
```bash
cd hardware/qikpoint-scanner

# Build firmware
pio run

# Flash to device
pio run --target upload

# Monitor serial output
pio device monitor

# OTA update
pio run --target uploadfs
```

## QikPoint Scanner Firmware

### Main Application Loop
```cpp
// hardware/qikpoint-scanner/firmware/src/main.cpp
#include "QikPointScanner.h"

QikPointScanner scanner;

void setup() {
  Serial.begin(115200);
  
  // Initialize hardware components
  scanner.initializeNFC();
  scanner.initializeWiFi();
  scanner.initializeDisplay();
  scanner.initializeMQTT();
  
  // Load configuration
  scanner.loadConfig();
  
  Serial.println("QikPoint Scanner initialized");
}

void loop() {
  // Check for NFC card presence
  if (scanner.isCardPresent()) {
    NFCData cardData = scanner.readCard();
    if (cardData.isValid()) {
      scanner.processInteraction(cardData);
      scanner.publishToBackend(cardData);
      scanner.showSuccess();
    } else {
      scanner.showError("Invalid card");
    }
  }
  
  // Handle MQTT messages
  scanner.processMQTTMessages();
  
  // Update display
  scanner.updateDisplay();
  
  // Check for OTA updates
  scanner.checkForUpdates();
  
  delay(100);
}
```

### NFC Communication
```cpp
// hardware/qikpoint-scanner/firmware/src/NFCManager.cpp
class NFCManager {
private:
  Adafruit_PN532 nfc;
  
public:
  bool initialize() {
    nfc.begin();
    nfc.setPassiveActivationRetries(0xFF);
    nfc.SAMConfig();
    return true;
  }
  
  NFCData readCard() {
    uint8_t uid[7];
    uint8_t uidLength;
    
    if (nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength)) {
      return parseCardData(uid, uidLength);
    }
    
    return NFCData(); // Invalid data
  }
  
  bool writeCard(const NFCData& data) {
    // Write NDEF record to card
    return nfc.ntag2xx_WriteNDEFURI(data.toNDEFRecord());
  }
};
```

## QikCard Security Implementation

### Secure Element Integration
```cpp
// hardware/qikcard-device/firmware/src/SecureElement.cpp
class SecureElement {
private:
  ATECC608A crypto;
  
public:
  bool generateKeyPair(uint8_t slot) {
    // Generate ECDSA P-256 key pair
    return crypto.createKey(KEY_TYPE_P256_ECC_KEY, slot);
  }
  
  bool signData(uint8_t slot, const uint8_t* data, size_t length, uint8_t* signature) {
    uint8_t hash[32];
    
    // Compute SHA-256 hash
    crypto.sha256(data, length, hash);
    
    // Sign hash with private key
    return crypto.sign(slot, hash, signature);
  }
  
  bool verifySignature(const uint8_t* publicKey, const uint8_t* data, 
                      size_t length, const uint8_t* signature) {
    uint8_t hash[32];
    crypto.sha256(data, length, hash);
    return crypto.verify(publicKey, hash, signature);
  }
};
```

## Hardware Testing

### Test Suite Structure
```cpp
// hardware/testing/unit_tests/
├── test_nfc_communication/
├── test_wifi_connectivity/
├── test_mqtt_protocol/
├── test_secure_element/
└── test_power_management/
```

### Automated Testing
```cpp
// Example unit test
void test_nfc_read_write() {
  NFCManager nfc;
  nfc.initialize();
  
  // Test data
  NFCData testData;
  testData.device_id = "TEST123";
  testData.user_principal = "test-principal";
  
  // Write and read back
  assert(nfc.writeCard(testData));
  NFCData readData = nfc.readCard();
  assert(readData.device_id == testData.device_id);
  
  Serial.println("NFC read/write test passed");
}
```

## Manufacturing Specifications

### Production Requirements
- **PCB Fabrication**: 4-layer PCB, HASL finish
- **Component Sourcing**: Automotive-grade components
- **Assembly**: SMT assembly with AOI inspection
- **Testing**: 100% functional testing before shipping
- **Certification**: FCC, CE, IC certification required

### Quality Control
```cpp
// Manufacturing test sequence
1. Power-on self-test (POST)
2. NFC functionality verification
3. WiFi connectivity test
4. Secure element validation
5. Physical inspection
6. Final quality assurance
```

## Performance Specifications

### QikPoint Scanner Performance
- **NFC Read Range**: Up to 4cm (ISO14443A)
- **Read Speed**: <500ms per interaction
- **WiFi Range**: Up to 100m (open space)
- **Battery Life**: 8+ hours continuous operation
- **Operating Temperature**: -10°C to +60°C

### QikCard Performance
- **Read/Write Cycles**: 10,000+ guaranteed
- **Data Retention**: 10+ years
- **Response Time**: <100ms
- **Operating Range**: -25°C to +85°C
- **Durability**: ISO7816 compliant

## Troubleshooting Guide

### Common Issues
```cpp
// Debug output examples
Serial.println("NFC initialization failed");
Serial.println("WiFi connection timeout");
Serial.println("MQTT broker unreachable");
Serial.println("Secure element error");
```

### Diagnostic Tools
- **Serial Monitor**: Real-time debugging output
- **MQTT Client**: Message flow verification
- **WiFi Analyzer**: Network connectivity testing
- **Oscilloscope**: Hardware signal analysis

## Deployment Guide

### QikPoint Scanner Deployment
1. **Hardware Setup**: Mount scanner at optimal height (table level)
2. **Network Configuration**: Connect to event WiFi
3. **Backend Registration**: Register device with QikHub
4. **Testing**: Verify end-to-end functionality
5. **Monitoring**: Enable remote monitoring

### QikCard Distribution
1. **Personalization**: Program unique device IDs
2. **User Registration**: Associate with user accounts
3. **Security Setup**: Initialize secure element
4. **Quality Assurance**: Final functionality testing
5. **Packaging**: Professional packaging for distribution

---

*The QikCard hardware ecosystem provides the physical foundation for seamless Web3 event engagement, combining cutting-edge NFC technology with robust security and reliability.*
