# QikCard Hardware Wiring Diagrams

## Overview
Comprehensive wiring diagrams and connection details for QikCard Platform hardware assembly including cable routing, connector pinouts, and installation guidelines.

---

## QikPoint Scanner Wiring Diagram

### Main System Connections
```
                    QikPoint Scanner System Wiring
    
    Power Input                     ESP32 Main Controller
    ┌─────────────┐                ┌──────────────────────┐
    │ USB-C       │                │                      │
    │ Charging    │────────────────┤ Power Management     │
    │ Port        │  5V/2A         │ Circuit              │
    └─────────────┘                └──────────────────────┘
                                            │ 3.3V Rail
                                            │
    ┌─────────────┐                ┌──────────────────────┐
    │ 18650       │                │                      │
    │ Li-ion      │────────────────┤ ESP32-WROOM-32E      │
    │ Battery     │  3.7V/2600mAh  │ Main Controller      │
    └─────────────┘                └──────────────────────┘
                                            │
                ┌───────────────────────────┼───────────────────────────┐
                │                           │                           │
    ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
    │ PN532 NFC       │          │ OLED Display    │          │ User Interface  │
    │ Controller      │          │ 128x64 I2C      │          │ LEDs/Buttons    │
    │ Module          │          │ Module          │          │ Buzzer          │
    └─────────────────┘          └─────────────────┘          └─────────────────┘
            │                            │                            │
    ┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
    │ NFC Antenna     │          │                 │          │ Status          │
    │ 50mm Loop       │          │                 │          │ Indicators      │
    │ 13.56MHz        │          │                 │          │                 │
    └─────────────────┘          └─────────────────┘          └─────────────────┘
```

### Detailed Connection Matrix

#### ESP32 to PN532 NFC Controller
```
ESP32 Pin          Wire Color      PN532 Pin       Function
────────────────────────────────────────────────────────────
GPIO18 (IO18)      Orange          SCK             SPI Clock
GPIO19 (IO19)      Yellow          MISO            SPI Data Out
GPIO21 (IO21)      Green           MOSI            SPI Data In
GPIO5  (IO5)       Blue            SS              Chip Select
GPIO2  (IO2)       Purple          IRQ             Interrupt
GPIO12 (IO12)      Brown           RSTPDN          Reset
3.3V               Red             VCC             Power
GND                Black           GND             Ground
```

#### ESP32 to OLED Display (I2C)
```
ESP32 Pin          Wire Color      OLED Pin        Function
────────────────────────────────────────────────────────────
GPIO4  (IO4)       White           SDA             I2C Data
GPIO5  (IO5)       Gray            SCL             I2C Clock
GPIO22 (IO22)      Pink            RES             Reset
3.3V               Red             VCC             Power
GND                Black           GND             Ground
```

#### ESP32 to User Interface Components
```
ESP32 Pin          Wire Color      Component       Function
────────────────────────────────────────────────────────────
GPIO33 (IO33)      Blue            Button 1        User Input
GPIO25 (IO25)      Green           Button 2        User Input
GPIO26 (IO26)      Yellow          Button 3        User Input
GPIO23 (IO23)      Orange          RGB LED         Status Display
GPIO27 (IO27)      Purple          Buzzer          Audio Alert
3.3V               Red             Pull-ups        Power
GND                Black           Common          Ground
```

### Power Distribution Wiring
```
Battery Management System Wiring

18650 Battery
     │
     ├── [Red Wire] ──── Positive Terminal ──── Power Switch
     │                                              │
     └── [Black Wire] ─── Negative Terminal ──── GND Bus
                                                    │
                                            TP4056 Charger
                                           ┌─────────────────┐
USB-C Connector ── [Red] ── VCC ──────────┤ Charging IC     │
                │                         │                 │
                └─ [Black] ── GND ────────┤                 │
                                          └─────────────────┘
                                                    │
                                            AMS1117 Regulator
                                           ┌─────────────────┐
Switched Battery + ── [Red] ── VIN ───────┤ 3.3V Regulator  │
                                          │                 │
GND Bus ──────────── [Black] ── GND ──────┤                 │
                                          └─────────────────┘
                                                    │
                                          3.3V Distribution
                                         ┌─────────────────┐
                                         │ ESP32 Module    │
                                         │ PN532 Module    │
                                         │ OLED Display    │
                                         │ Pull-up Network │
                                         └─────────────────┘
```

---

## QikCard Device Wiring Diagram

### Flexible PCB Layout and Connections
```
QikCard Internal Wiring (Flex PCB)

                 Card Outline (85.6mm x 53.98mm)
    ┌─────────────────────────────────────────────────────────────┐
    │                                                             │
    │  ┌─ Secure Element (SE050C2) ────────┐                      │
    │  │ ┌─────────────────────────────────┼───── I2C Bus        │
    │  │ │  ┌─ NTAG216F NFC Controller ────┼──┐                  │
    │  │ │  │ ┌───────────────────────────────┼──┼─ Power Rail   │
    │  │ │  │ │                           │  │  │                │
    │  ▼ ▼  ▼ ▼                           ▼  ▼  ▼                │
    │ ┌─────────────────────────────────────────────────────────┐ │
    │ │ Component Area (20mm x 15mm)                           │ │
    │ │                                                       │ │
    │ │  SE050C2    NTAG216F    Passives                     │ │
    │ │    ┌──┐       ┌──┐       ┌─┐                         │ │
    │ │    │  │       │  │       │C│                         │ │
    │ │    └──┘       └──┘       └─┘                         │ │
    │ └─────────────────────────────────────────────────────────┘ │
    │                                                             │
    │  NFC Antenna Loop (Etched Copper - 4 Turns)                │
    │  ┌───────────────────────────────────────────────────────┐   │
    │  │                                                       │   │
    │  │     ╔═══════════════════════════════════════════╗     │   │
    │  │     ║                                         ║     │   │
    │  │     ║         ╔═══════════════════════╗       ║     │   │
    │  │     ║         ║                     ║       ║     │   │
    │  │     ║         ║    ╔═══════════╗    ║       ║     │   │
    │  │     ║         ║    ║           ║    ║       ║     │   │
    │  │     ║         ║    ║  CENTER   ║    ║       ║     │   │
    │  │     ║         ║    ╚═══════════╝    ║       ║     │   │
    │  │     ║         ╚═══════════════════════╝       ║     │   │
    │  │     ╚═══════════════════════════════════════════╝     │   │
    │  │                                                       │   │
    │  └───────────────────────────────────────────────────────┘   │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
```

### Component Interconnection Detail
```
SE050C2 Secure Element Connections:
    Pin 1 (VDD) ──── 3.3V Rail (from NFC field)
    Pin 2 (VSS) ──── Ground Plane
    Pin 3 (SDA) ──── I2C Data Line ──── NTAG216F Pin 6 (SDA)
    Pin 4 (SCL) ──── I2C Clock Line ─── NTAG216F Pin 7 (SCL)
    Pin 5 (RST) ──── Reset Network ──── Pull-up Resistor (10kΩ)
    Pin 6 (GPIO)──── Status/Control ─── Optional Status LED

NTAG216F NFC Controller Connections:
    Pin 1 (LA) ───── NFC Antenna Terminal A
    Pin 2 (VSSA) ─── Analog Ground
    Pin 3 (VSS) ──── Digital Ground
    Pin 4 (VDD) ──── Internal Power (No Connection)
    Pin 5 (LB) ───── NFC Antenna Terminal B
    Pin 6 (SDA) ──── I2C Data ─────────── SE050C2 Pin 3
    Pin 7 (SCL) ──── I2C Clock ────────── SE050C2 Pin 4
    Pin 8 (FD) ───── Field Detect ──────── Optional Status

Passive Components:
    C1 (100pF) ──── Between VDD and VSS for SE050C2
    C2 (100nF) ──── Between VDD and VSS for NTAG216F
    R1 (10kΩ) ───── Pull-up for SE050C2 Reset
    C3 (180pF) ──── Antenna tuning capacitor A
    C4 (180pF) ──── Antenna tuning capacitor B
```

### NFC Antenna Specifications
```
Antenna Design Parameters:
┌─────────────────────────┬─────────────────────────────────┐
│ Parameter               │ Specification                   │
├─────────────────────────┼─────────────────────────────────┤
│ Antenna Type            │ Rectangular Spiral Loop         │
│ Number of Turns         │ 4 turns                         │
│ Trace Width             │ 0.2mm                           │
│ Trace Spacing           │ 0.15mm                          │
│ Outer Dimensions        │ 45mm x 30mm                     │
│ Inner Dimensions        │ 25mm x 10mm                     │
│ Inductance              │ 1.5µH ± 10%                     │
│ Resistance              │ 2.5Ω ± 0.5Ω                     │
│ Self-Resonance Freq.    │ >50MHz                          │
│ Operating Frequency     │ 13.56MHz                        │
│ Quality Factor (Q)      │ 35-45                           │
│ Coupling Coefficient    │ 0.1-0.3 (depending on reader)  │
└─────────────────────────┴─────────────────────────────────┘

Antenna Tuning Network:
    LA ──── [C3: 180pF] ──── [L1: 10nH] ──── Antenna Terminal A
                                                     │
                                              Antenna Coil
                                                     │
    LB ──── [C4: 180pF] ──── [L2: 10nH] ──── Antenna Terminal B
```

---

## Assembly Wiring Guidelines

### QikPoint Scanner Assembly Process

#### Step 1: Power Circuit Assembly
```
1. Install TP4056 charging circuit on main PCB
2. Connect USB-C connector with 5V (Red) and GND (Black) wires
3. Install 18650 battery holder with positive (Red) and negative (Black) leads
4. Install power switch in positive battery path
5. Connect AMS1117 3.3V regulator with input/output filtering capacitors
6. Verify 3.3V rail voltage before proceeding
```

#### Step 2: Digital Circuit Connections
```
1. Mount ESP32-WROOM-32E module to PCB
2. Connect all digital I/O as per connection matrix
3. Install pull-up resistors (10kΩ) on all button inputs
4. Connect programming header (TX, RX, GND, 3.3V)
5. Verify connectivity with multimeter before power-on
```

#### Step 3: Peripheral Connections
```
1. Connect PN532 NFC module using SPI interface
2. Install NFC antenna with proper matching network
3. Connect OLED display using I2C interface
4. Install user interface components (buttons, LED, buzzer)
5. Route all wires through strain relief points
```

### QikCard Device Assembly Process

#### Step 1: Flex PCB Preparation
```
1. Inspect flex PCB for defects and contamination
2. Clean with isopropyl alcohol before component placement
3. Apply solder paste using stencil for fine-pitch components
4. Place components using pick-and-place equipment or manually
5. Reflow solder in controlled temperature profile
```

#### Step 2: Card Lamination Process
```
Layer Stacking Order (bottom to top):
1. PVC substrate (30mil thickness)
2. Adhesive layer (3M 467MP double-sided tape)
3. Flex PCB with mounted components
4. Adhesive layer (3M 467MP double-sided tape)
5. Printed overlay with graphics
6. Protective laminate (10mil PET film)

Lamination Parameters:
- Temperature: 140°C ± 5°C
- Pressure: 40 PSI
- Time: 45 seconds
- Cool-down: Room temperature under pressure
```

#### Step 3: Quality Control Testing
```
1. Visual inspection for lamination defects
2. NFC functionality test at 13.56MHz
3. I2C communication test between components
4. Secure element authentication test
5. Card thickness verification (0.76mm ± 0.05mm)
6. Bend/flex test for durability
```

---

## Troubleshooting Guide

### Common Wiring Issues

#### QikPoint Scanner Troubleshooting
```
Problem: Device won't power on
├── Check battery voltage (should be >3.0V)
├── Verify power switch continuity
├── Check fuse continuity (if applicable)
├── Measure 3.3V regulator output
└── Inspect USB charging port connections

Problem: NFC not working
├── Verify PN532 power supply (3.3V)
├── Check SPI bus connections (SCK, MISO, MOSI, SS)
├── Measure antenna inductance (should be ~1.5µH)
├── Check antenna matching network values
└── Verify IRQ and Reset signal connections

Problem: Display not working
├── Check I2C bus connections (SDA, SCL)
├── Verify OLED power supply (3.3V)
├── Test I2C address scanning
├── Check reset signal timing
└── Measure I2C bus voltage levels
```

#### QikCard Device Troubleshooting
```
Problem: NFC not readable
├── Check antenna continuity with multimeter
├── Measure antenna inductance and resistance
├── Verify NTAG216F power from NFC field
├── Check component placement and orientation
└── Test with known-good NFC reader

Problem: Secure element not responding
├── Verify I2C bus connections
├── Check power supply stability
├── Test reset signal timing
├── Verify component part numbers
└── Check for solder bridges or opens
```

### Test Equipment Required
```
Basic Test Equipment:
├── Digital Multimeter (Fluke 87V or equivalent)
├── Oscilloscope (100MHz minimum bandwidth)
├── Logic Analyzer (8+ channels)
├── NFC Reader/Writer (ACR122U or equivalent)
├── Function Generator (for antenna testing)
├── LCR Meter (for antenna characterization)
└── Power Supply (adjustable 0-5V, 2A)

Specialized Test Equipment:
├── Vector Network Analyzer (for antenna optimization)
├── Spectrum Analyzer (for EMC testing)
├── Temperature Chamber (for environmental testing)
├── Laminating Press (for card manufacturing)
└── Pick-and-Place Machine (for SMT assembly)
```

---

## Cable Specifications

### Internal Interconnect Cables

#### QikPoint Scanner Internal Cables
```
Power Harness:
- Wire Gauge: 22 AWG stranded copper
- Insulation: PVC rated for 105°C
- Length: 150mm ± 10mm
- Connectors: JST-XH 2.54mm pitch
- Colors: Red (+), Black (-)

Digital Signal Cables:
- Wire Gauge: 28 AWG stranded copper
- Insulation: PVC rated for 80°C
- Length: 100mm ± 5mm
- Connectors: JST-PH 2.0mm pitch
- Colors: Standard EIA color code

High-Speed Signals (SPI):
- Cable Type: Twisted pair with shield
- Impedance: 100Ω differential
- Length: <50mm to minimize reflections
- Connectors: Board-to-board fine pitch
```

#### External Charging Cable
```
USB-C to QikPoint Scanner:
- Cable Standard: USB-C 2.0 compliant
- Current Rating: 3A maximum
- Length: 1.0m ± 50mm
- Wire Gauge: 20 AWG for power, 28 AWG for data
- Shielding: Overall foil shield with drain wire
- Connectors: USB-C male to proprietary magnetic connector
```

---

## Safety and Compliance Notes

### Electrical Safety
```
1. All exposed metal parts connected to safety ground
2. Double insulation between primary and secondary circuits
3. Overcurrent protection on all power inputs
4. ESD protection on all user-accessible connections
5. Proper strain relief on all cable connections
```

### RF Safety and EMC
```
1. NFC transmission power limited to 42 dBµA/m at 10m
2. Spurious emissions below FCC Part 15 limits
3. Immunity to industrial EMC environment per EN 61000-6-2
4. ESD immunity to ±8kV contact, ±15kV air discharge
5. Proper grounding and shielding of all RF circuits
```

### Manufacturing Safety
```
1. Lead-free solder processes (SAC305 alloy recommended)
2. RoHS compliant materials throughout
3. Proper ventilation during soldering operations
4. Anti-static procedures for component handling
5. Quality control testing at each assembly stage
```

---

*Wiring Diagram Version: 1.3*  
*Last Updated: 2025-07-20*  
*Assembly Revision: Rev A*
