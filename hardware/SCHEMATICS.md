# QikCard Hardware Schematics

## Overview
Detailed schematic diagrams for QikCard Platform hardware components including circuit diagrams, pin assignments, and electrical specifications.

---

## QikPoint Scanner Schematic

### Main System Block Diagram
```
    +----------------+     +----------------+     +----------------+
    |   Power        |     |   ESP32        |     |   NFC          |
    |   Management   |---->|   WROOM-32E    |<--->|   PN532        |
    |   (TP4056)     |     |   MCU          |     |   Controller   |
    +----------------+     +----------------+     +----------------+
            |                       |                       |
            v                       v                       v
    +----------------+     +----------------+     +----------------+
    |   Battery      |     |   Display      |     |   NFC          |
    |   18650        |     |   OLED         |     |   Antenna      |
    |   Li-ion       |     |   128x64       |     |   50mm         |
    +----------------+     +----------------+     +----------------+
                                   |
                                   v
                        +----------------+
                        |   User         |
                        |   Interface    |
                        |   (LED/Buzzer) |
                        +----------------+
```

### ESP32 Main Controller Circuit
```
                    ESP32-WROOM-32E
                   ┌─────────────────────┐
            3.3V ──┤1  VDD        GND  38├── GND
                   ├─────────────────────┤
         BOOT_SW ──┤2  EN         IO0   37├── BOOT (Pull-up 10kΩ)
                   ├─────────────────────┤
             LED ──┤3  SENSOR_VP  IO2   36├── NFC_IRQ
                   ├─────────────────────┤
          NFC_SS ──┤4  SENSOR_VN  IO4   35├── OLED_SDA
                   ├─────────────────────┤
         NFC_SCK ──┤5  IO34       IO5   34├── OLED_SCL
                   ├─────────────────────┤
        NFC_MISO ──┤6  IO35       IO18  33├── NFC_SCK
                   ├─────────────────────┤
        NFC_MOSI ──┤7  IO32       IO19  32├── NFC_MISO
                   ├─────────────────────┤
          BTN_1  ──┤8  IO33       IO21  31├── NFC_MOSI
                   ├─────────────────────┤
          BTN_2  ──┤9  IO25       RXD0  30├── UART_RX
                   ├─────────────────────┤
          BTN_3  ──┤10 IO26       TXD0  29├── UART_TX
                   ├─────────────────────┤
          BUZZER ──┤11 IO27       IO22  28├── OLED_RST
                   ├─────────────────────┤
            GND ──┤12 IO14       IO23  27├── RGB_LED
                   ├─────────────────────┤
                   ├13            IO13  26├──
                   ├─────────────────────┤
                   ├14 GND       IO12  25├── NFC_RST
                   ├─────────────────────┤
                   ├15            IO15  24├──
                   ├─────────────────────┤
                   ├16            IO16  23├──
                   ├─────────────────────┤
                   ├17            IO17  22├──
                   ├─────────────────────┤
                   ├18            IO1   21├──
                   ├─────────────────────┤
            GND ──┤19 GND        IO3   20├──
                   └─────────────────────┘
```

### Power Management Circuit
```
Battery Input (18650 Li-ion 3.7V)
      |
      +── [FUSE 2A] ── [Power Switch] ──┐
                                        |
                    TP4056 Li-ion Charger IC
                   ┌─────────────────────┐
USB 5V Input ────── PROG ── VCC ── BAT ──┴── Battery +
      |            │                    │
      GND ─────────┤ GND ────────────────┤
                   │                    │
                   │ STDBY          CHRG │── Status LEDs
                   └─────────────────────┘
                            |
                        AMS1117-3.3V Regulator
                       ┌─────────────────┐
        Battery + ──── VIN         VOUT ├── 3.3V Rail
                       │                │
        GND ─────────── GND         ADJ ├── GND
                       └─────────────────┘
                            |
                   [100uF Capacitor Input]
                            |
                   [10uF Capacitor Output]
```

### NFC Controller Circuit (PN532)
```
                      PN532 NFC Controller
                   ┌─────────────────────────┐
            3.3V ──┤ VCC                 SCK ├── SPI_SCK (ESP32 IO18)
             GND ──┤ GND                MISO ├── SPI_MISO (ESP32 IO19)
   ESP32_IO12/RST ──┤ RSTPDN             MOSI ├── SPI_MOSI (ESP32 IO21)
    ESP32_IO2/IRQ ──┤ IRQ                  SS ├── SPI_SS (ESP32 IO5)
                   ├─────────────────────────┤
          SEL0/I0 ──┤ P30            XTAL1/P20├── 13.56MHz Crystal
          SEL1/I1 ──┤ P31            XTAL2/P21├── 13.56MHz Crystal
                   ├─────────────────────────┤
                   │ ANT1              ANT2  ├── NFC Antenna
                   └─────────────────────────┘
                            |
                    NFC Antenna Matching Network
                   ┌─────────────────────────┐
     ANT1 ────────── L1 (220nH) ── C1 (180pF) ── Antenna Coil
                   │                         │
     ANT2 ────────── L2 (220nH) ── C2 (180pF) ── Antenna Coil
                   │                         │
                   │ C3 (1nF)     C4 (1nF)  │
                   └──── GND ──────── GND ───┘
```

### Display & User Interface Circuit
```
OLED Display (SSD1306 128x64)
                   ┌─────────────────┐
            3.3V ──┤ VCC         SDA ├── I2C_SDA (ESP32 IO4)
             GND ──┤ GND         SCL ├── I2C_SCL (ESP32 IO5)
   ESP32_IO22/RST ──┤ RES             ├
                   └─────────────────┘

RGB LED (WS2812B)
                   ┌─────────────────┐
            3.3V ──┤ VDD         DIN ├── ESP32_IO23
             GND ──┤ GND        DOUT ├── (Next LED)
                   └─────────────────┘

Tactile Buttons (3x)
    [BTN1] ── [10kΩ Pull-up] ── 3.3V
       |
       └── ESP32_IO33

    [BTN2] ── [10kΩ Pull-up] ── 3.3V
       |
       └── ESP32_IO25

    [BTN3] ── [10kΩ Pull-up] ── 3.3V
       |
       └── ESP32_IO26

Buzzer Circuit
              ┌─ [330Ω Resistor] ─ ESP32_IO27
              │
    [Buzzer] ─┤
              │
              └─ GND
```

---

## QikCard Device Schematic

### NFC Tag Circuit (NTAG216)
```
                    NTAG216F NFC Tag IC
                   ┌─────────────────────┐
                   │ LA               LB ├── Antenna Coil Terminal A
                   ├─────────────────────┤
                   │ VSSA          VDD   ├── Internal Power (No Connection)
                   ├─────────────────────┤
                   │ VSS           SDA   ├── I2C Data (Optional)
                   ├─────────────────────┤
                   │ FD            SCL   ├── I2C Clock (Optional)
                   └─────────────────────┘
                            |
                    NFC Antenna (25mm Loop)
                   ┌─────────────────────┐
        Terminal A ──┤                     ├── Terminal B
                   │   Etched Copper      │
                   │   Loop Antenna       │
                   │   25mm Diameter      │
                   │   4 Turns, 0.2mm     │
                   └─────────────────────┘
```

### Secure Element Circuit (SE050C2)
```
                    SE050C2 Secure Element
                   ┌─────────────────────┐
                   │ VDD             SDA ├── I2C Data (NTAG216 SDA)
                   ├─────────────────────┤
                   │ VSS             SCL ├── I2C Clock (NTAG216 SCL)
                   ├─────────────────────┤
                   │ RST_N          GPIO ├── Status/Control Pin
                   └─────────────────────┘
                            |
                   Bypass Capacitors
                   [100nF] ── VDD ── VSS
                   [100pF] ── VDD ── VSS
```

### Card Layer Stack-up
```
Layer 7: Protective Overlay (Clear PET Film)
         ┌─────────────────────────────────┐
Layer 6: │ Printed Graphics & Text         │
         ├─────────────────────────────────┤
Layer 5: │ Adhesive Layer                  │
         ├─────────────────────────────────┤
Layer 4: │ Flex PCB with Components        │
         │ ┌─ NTAG216 IC                   │
         │ ├─ SE050C2 IC                   │
         │ └─ Passive Components           │
         ├─────────────────────────────────┤
Layer 3: │ Adhesive Layer                  │
         ├─────────────────────────────────┤
Layer 2: │ NFC Antenna (Etched Copper)     │
         ├─────────────────────────────────┤
Layer 1: │ PVC Card Substrate (30mil)      │
         └─────────────────────────────────┘
         
Total Thickness: 0.76mm (Standard Card Thickness)
```

---

## Pin Assignment Tables

### ESP32-WROOM-32E Pin Assignments
| GPIO | Function | Direction | Description | Pull-up/down |
|------|----------|-----------|-------------|--------------|
| IO0 | BOOT | Input | Boot mode selection | External 10kΩ |
| IO2 | NFC_IRQ | Input | PN532 interrupt signal | Internal |
| IO4 | OLED_SDA | Bidirectional | I2C data for OLED | Internal |
| IO5 | OLED_SCL | Output | I2C clock for OLED | None |
| IO12 | NFC_RST | Output | PN532 reset signal | None |
| IO18 | NFC_SCK | Output | SPI clock for PN532 | None |
| IO19 | NFC_MISO | Input | SPI data from PN532 | None |
| IO21 | NFC_MOSI | Output | SPI data to PN532 | None |
| IO22 | OLED_RST | Output | OLED reset signal | None |
| IO23 | RGB_LED | Output | WS2812B data signal | None |
| IO25 | BTN_2 | Input | User button 2 | External 10kΩ |
| IO26 | BTN_3 | Input | User button 3 | External 10kΩ |
| IO27 | BUZZER | Output | Buzzer control signal | None |
| IO33 | BTN_1 | Input | User button 1 | External 10kΩ |

### PN532 NFC Controller Pin Functions
| Pin | Function | Type | Description |
|-----|----------|------|-------------|
| VCC | Power | Power | 3.3V power supply |
| GND | Ground | Power | Ground reference |
| SCK | SPI Clock | Input | SPI clock from ESP32 |
| MISO | SPI Data Out | Output | SPI data to ESP32 |
| MOSI | SPI Data In | Input | SPI data from ESP32 |
| SS | Chip Select | Input | SPI chip select |
| IRQ | Interrupt | Output | Interrupt to ESP32 |
| RSTPDN | Reset | Input | Reset signal from ESP32 |
| ANT1 | Antenna A | Analog | NFC antenna terminal A |
| ANT2 | Antenna B | Analog | NFC antenna terminal B |

---

## Circuit Analysis & Specifications

### Power Consumption Analysis
```
QikPoint Scanner Power Budget:
┌─────────────────────────┬─────────┬─────────┬─────────┐
│ Component               │ Typical │ Peak    │ Sleep   │
├─────────────────────────┼─────────┼─────────┼─────────┤
│ ESP32-WROOM-32E         │ 160mA   │ 240mA   │ 10µA    │
│ PN532 NFC Controller    │ 150mA   │ 150mA   │ 1mA     │
│ OLED Display (Active)   │ 20mA    │ 20mA    │ 0mA     │
│ RGB LED (Full White)    │ 60mA    │ 60mA    │ 0mA     │
│ Buzzer (Active)         │ 30mA    │ 30mA    │ 0mA     │
│ Voltage Regulator Loss  │ 15mA    │ 20mA    │ 5mA     │
├─────────────────────────┼─────────┼─────────┼─────────┤
│ Total System Power      │ 435mA   │ 520mA   │ 16mA    │
│ Battery Life (2600mAh)  │ 6.0hrs  │ 5.0hrs  │ 162hrs  │
└─────────────────────────┴─────────┴─────────┴─────────┘
```

### NFC Performance Specifications
```
Operating Frequency: 13.56 MHz ± 7 kHz
Communication Protocol: ISO14443 Type A/B
Read Range: 0-40mm (depending on tag type)
Data Rate: 106, 212, 424, 847 kbps
Antenna Resonance: 13.56 MHz ± 100 kHz
Quality Factor (Q): 35-45
Antenna Inductance: 1.5µH ± 10%
Antenna Resistance: 2.5Ω ± 0.5Ω
```

### Environmental Specifications
```
Operating Temperature: -10°C to +60°C
Storage Temperature: -40°C to +85°C
Operating Humidity: 10% to 90% RH (non-condensing)
Ingress Protection: IP54 (dust and splash resistant)
Shock Resistance: 1.5m drop onto concrete
Vibration: IEC 60068-2-6 (10-55 Hz, 1.5mm amplitude)
ESD Protection: ±8kV contact, ±15kV air discharge
```

---

## Design Notes & Considerations

### EMC/EMI Design Guidelines
1. **Ground Plane**: Continuous ground plane on layer 2 for signal integrity
2. **Power Decoupling**: 100nF ceramic capacitors near each IC VCC pin
3. **Crystal Layout**: Keep 13.56MHz crystal traces short and symmetric
4. **Antenna Isolation**: Maintain 5mm clearance around NFC antenna
5. **Switching Noise**: RC filtering on all switching signals

### Thermal Management
1. **Heat Dissipation**: ESP32 and PN532 are primary heat sources
2. **Thermal Vias**: Use thermal vias under high-power components
3. **Air Circulation**: Ventilation slots in enclosure design
4. **Component Spacing**: Maintain adequate spacing between heat sources

### Manufacturing Considerations
1. **Component Orientation**: All polarized components clearly marked
2. **Test Points**: Accessible test points for production testing
3. **Assembly Order**: Power circuits first, then digital, finally RF
4. **Rework Access**: Space around components for rework operations

### Compliance Requirements
1. **FCC Part 15**: Unintentional radiator compliance for digital circuits
2. **FCC Part 18**: ISM band operation for 13.56MHz NFC
3. **CE RED**: European radio equipment directive compliance
4. **RoHS**: Restriction of hazardous substances compliance

---

*Schematic Version: 2.1*  
*Last Updated: 2025-07-20*  
*Next Review: Q2 2025*
