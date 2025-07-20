# QikCard Hardware Bill of Materials (BOM)

## Overview
Complete component listing for QikCard Platform hardware including QikPoint scanners and QikCard devices with part numbers, specifications, and supplier information.

## QikPoint Scanner BOM

### Microcontroller & Core Components
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| ESP32-WROOM-32E | ESP32-WROOM-32E | 1 | WiFi/Bluetooth MCU Module | Espressif | $4.50 | $4.50 |
| PCB (4-layer) | QPS-PCB-v1.2 | 1 | Custom 4-layer PCB 85x55mm | JLCPCB | $12.00 | $12.00 |

### NFC Components
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| PN532 NFC Controller | PN532 | 1 | NFC/RFID Controller IC | NXP | $8.75 | $8.75 |
| NFC Antenna | ANT-NFC-50mm | 1 | 50mm diameter NFC antenna | Abracon | $2.20 | $2.20 |
| NFC Matching Network | - | 1 | L/C matching components | Various | $0.85 | $0.85 |

### Display & User Interface
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| OLED Display | SSD1306-128x64 | 1 | 0.96" I2C OLED Display | Adafruit | $15.95 | $15.95 |
| Tactile Switch | SPST-B3F-4055 | 3 | 6x6mm tactile push button | Omron | $0.45 | $1.35 |
| RGB LED | WS2812B | 1 | Addressable RGB LED | WorldSemi | $0.25 | $0.25 |
| Buzzer | CMT-8540S-SMT | 1 | 5V Magnetic Buzzer | CUI Devices | $1.80 | $1.80 |

### Power Management
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| LDO Regulator | AMS1117-3.3 | 1 | 3.3V 1A Linear Regulator | AMS | $0.35 | $0.35 |
| Battery Holder | BH-18650-PC2 | 1 | 18650 Battery Holder | Keystone | $2.10 | $2.10 |
| Charging IC | TP4056 | 1 | Li-ion Battery Charger | Nanjing | $0.55 | $0.55 |
| Power Switch | SS-12D00G3 | 1 | SPDT Slide Switch | CUI Devices | $0.95 | $0.95 |

### Passive Components
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| Capacitor 100nF | C1608X7R1H104K | 10 | 0603 Ceramic Capacitor | TDK | $0.02 | $0.20 |
| Capacitor 10uF | C1608X5R1V106K | 4 | 0603 Ceramic Capacitor | TDK | $0.05 | $0.20 |
| Capacitor 1000uF | EEE-FK1V102P | 2 | Electrolytic Capacitor | Panasonic | $0.85 | $1.70 |
| Resistor 10k | RC1608F103CS | 8 | 0603 1% Resistor | Samsung | $0.01 | $0.08 |
| Resistor 1k | RC1608F102CS | 4 | 0603 1% Resistor | Samsung | $0.01 | $0.04 |
| Resistor 330R | RC1608F331CS | 3 | 0603 1% Resistor | Samsung | $0.01 | $0.03 |

### Mechanical Components
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| Enclosure | 1455N1601BK | 1 | ABS Enclosure 160x78x43mm | Hammond | $18.50 | $18.50 |
| Standoffs | M3x10-HEX | 4 | M3x10mm Hex Standoffs | RAF | $0.15 | $0.60 |
| Screws | M3x6-PH | 8 | M3x6mm Phillips Screws | McMaster | $0.05 | $0.40 |

### **QikPoint Scanner Total: $72.35**

---

## QikCard Device BOM

### NFC & Security Components
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| NTAG216 NFC Chip | NTAG216F | 1 | 924-byte NFC Tag IC | NXP | $0.85 | $0.85 |
| Secure Element | SE050C2 | 1 | IoT Secure Element | NXP | $2.45 | $2.45 |
| NFC Antenna | ANT-NFC-25mm | 1 | 25mm etched NFC antenna | Custom | $0.45 | $0.45 |

### Card Substrate & Assembly
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| PVC Card Blank | CR80-30mil-WHITE | 1 | Standard credit card size PVC | UltraCard | $0.12 | $0.12 |
| Overlay Film | TESLIN-10mil | 1 | Synthetic paper overlay | PPG | $0.08 | $0.08 |
| Adhesive Layer | 3M-467MP | 1 | Double-sided adhesive | 3M | $0.15 | $0.15 |

### Electronics Assembly
| Component | Part Number | Quantity | Description | Supplier | Unit Cost | Total Cost |
|-----------|-------------|----------|-------------|----------|-----------|------------|
| Flex PCB | QC-FLEX-v1.0 | 1 | Custom flexible PCB | OSH Park | $5.50 | $5.50 |
| Chip Capacitor | GRM1885C1H101JA01D | 2 | 0603 100pF Capacitor | Murata | $0.02 | $0.04 |
| Chip Resistor | RC1608J104CS | 1 | 0603 100k Resistor | Samsung | $0.01 | $0.01 |

### **QikCard Device Total: $9.65**

---

## Production Quantities & Pricing

### Development/Prototype Quantities (10 units each)
- **QikPoint Scanner**: 10 units × $72.35 = $723.50
- **QikCard Device**: 10 units × $9.65 = $96.50
- **Development Total**: $820.00

### Small Production Run (100 units each)
- **QikPoint Scanner**: 100 units × $58.50 = $5,850.00 (19% volume discount)
- **QikCard Device**: 100 units × $7.25 = $725.00 (25% volume discount)
- **Small Production Total**: $6,575.00

### Volume Production (1000 units each)
- **QikPoint Scanner**: 1000 units × $45.20 = $45,200.00 (37% volume discount)
- **QikCard Device**: 1000 units × $5.85 = $5,850.00 (39% volume discount)
- **Volume Production Total**: $51,050.00

## Additional Costs

### Tooling & Setup
| Item | Cost | Description |
|------|------|-------------|
| PCB Fabrication Setup | $850 | Initial tooling for custom PCBs |
| Enclosure Tooling | $2,400 | Injection molding tool for custom enclosure |
| NFC Antenna Tooling | $1,200 | Custom antenna fabrication setup |
| Assembly Fixtures | $650 | Production assembly jigs and fixtures |
| **Total Tooling**: | **$5,100** | One-time setup costs |

### Compliance & Certification
| Item | Cost | Description |
|------|------|-------------|
| FCC Certification | $8,500 | RF emissions testing and certification |
| CE Marking | $6,200 | European compliance testing |
| RoHS Testing | $1,800 | Material compliance testing |
| ISO14443 Testing | $3,400 | NFC interoperability certification |
| **Total Certification**: | **$19,900** | Required for commercial deployment |

## Supplier Information

### Primary Suppliers
- **Mouser Electronics**: Electronic components, competitive pricing, global shipping
- **Digi-Key**: Electronic components, excellent availability, technical support
- **JLCPCB**: PCB fabrication, competitive pricing for prototyping and production
- **OSH Park**: Specialty PCBs, high quality for complex designs
- **Espressif**: ESP32 modules direct from manufacturer
- **NXP**: NFC and security ICs, automotive grade quality

### Secondary/Backup Suppliers
- **Arrow Electronics**: Alternative electronic component source
- **PCBWAY**: Alternative PCB fabrication
- **SeeedStudio**: Prototyping and small volume production
- **McMaster-Carr**: Mechanical hardware and fasteners

## Quality & Testing Requirements

### Incoming Inspection
- Visual inspection of all components
- Electrical parameter verification for critical components
- Sample testing of passive components

### Production Testing
- In-circuit testing (ICT) for PCB assemblies
- Functional testing of NFC communication
- Battery life verification
- Environmental stress screening

### Reliability Testing
- Temperature cycling (-40°C to +85°C)
- Humidity testing (85% RH at 85°C)
- Vibration and shock testing
- MTBF analysis and life testing

## Lead Times & Availability

### Standard Lead Times
- **Electronic Components**: 2-8 weeks (depending on allocation)
- **Custom PCB**: 1-2 weeks (prototype), 2-4 weeks (production)
- **Enclosures**: 4-6 weeks (machined), 8-12 weeks (molded)
- **NFC Components**: 4-8 weeks (subject to allocation)
- **Assembly**: 1-2 weeks (prototype), 2-4 weeks (production)

### Critical Path Items
- ESP32 modules (semiconductor shortage sensitive)
- NFC controller ICs (specialized component)
- Custom enclosure tooling (long lead time)
- Certification timeline (regulatory dependency)

## Risk Mitigation

### Supply Chain Risks
- Maintain 90-day safety stock of critical components
- Qualify secondary suppliers for all major components
- Monitor component lifecycle and plan for obsolescence
- Establish strategic partnerships with key suppliers

### Cost Management
- Negotiate volume pricing commitments
- Consider vertical integration for high-volume components
- Implement design-for-manufacturability reviews
- Regular cost optimization and value engineering

---

*BOM Version: 1.2*  
*Last Updated: 2025-07-20*  
*Review Date: Q2 2025*
