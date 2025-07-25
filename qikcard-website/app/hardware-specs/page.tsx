"use client"

import Link from "next/link"
import { ArrowLeft, Cpu, Zap, Shield, Wifi, Thermometer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const qikCardSpecs = [
  {
    category: "NFC Technology",
    specs: [
      { label: "NFC Chip", value: "NTAG216" },
      { label: "Memory", value: "924 bytes EEPROM" },
      { label: "Frequency", value: "13.56 MHz" },
      { label: "Read/Write Cycles", value: "10,000+ guaranteed" },
      { label: "Data Retention", value: "10+ years" },
      { label: "Response Time", value: "<100ms" },
    ],
  },
  {
    category: "Secure Element",
    specs: [
      { label: "Crypto Chip", value: "ATECC608A" },
      { label: "Key Storage", value: "16 secure slots" },
      { label: "Cryptography", value: "ECDSA P-256" },
      { label: "Hash Function", value: "SHA-256" },
      { label: "Random Number", value: "True RNG" },
      { label: "Tamper Resistance", value: "Hardware-based" },
    ],
  },
  {
    category: "Physical",
    specs: [
      { label: "Form Factor", value: "Credit card size" },
      { label: "Dimensions", value: "85.6mm × 53.98mm" },
      { label: "Thickness", value: "0.8mm standard" },
      { label: "Material", value: "PVC with embedded antenna" },
      { label: "Weight", value: "5.5g" },
      { label: "Durability", value: "ISO7816 compliant" },
    ],
  },
  {
    category: "Environmental",
    specs: [
      { label: "Operating Temp", value: "-25°C to +85°C" },
      { label: "Storage Temp", value: "-40°C to +125°C" },
      { label: "Humidity", value: "0% to 95% RH" },
      { label: "Water Resistance", value: "IPX7 rated" },
      { label: "Shock Resistance", value: "1.5m drop test" },
      { label: "Bend Test", value: "ISO/IEC 10373-1" },
    ],
  },
]

const qikPointSpecs = [
  {
    category: "Processing",
    specs: [
      { label: "Microcontroller", value: "ESP32-WROOM-32E" },
      { label: "CPU", value: "Dual-core Xtensa 32-bit LX6" },
      { label: "Clock Speed", value: "240 MHz" },
      { label: "RAM", value: "520 KB SRAM" },
      { label: "Flash Memory", value: "4 MB" },
      { label: "Co-processor", value: "Ultra Low Power" },
    ],
  },
  {
    category: "Connectivity",
    specs: [
      { label: "WiFi", value: "802.11 b/g/n (2.4 GHz)" },
      { label: "Bluetooth", value: "v4.2 BR/EDR and BLE" },
      { label: "NFC Module", value: "PN532 (13.56 MHz)" },
      { label: "Range", value: "Up to 4cm NFC read" },
      { label: "Antenna", value: "Integrated PCB antenna" },
      { label: "Protocols", value: "ISO14443A/B, FeliCa" },
    ],
  },
  {
    category: "Power & Battery",
    specs: [
      { label: "Input Power", value: "USB-C 5V/2A" },
      { label: "Battery", value: "3.7V 2000mAh Li-Po" },
      { label: "Battery Life", value: "48+ hours continuous" },
      { label: "Charging Time", value: "2 hours (0-100%)" },
      { label: "Power Consumption", value: "150mA active, 10μA sleep" },
      { label: "Power Management", value: "Automatic sleep mode" },
    ],
  },
  {
    category: "Interface",
    specs: [
      { label: "Display", value: "128x64 OLED (optional)" },
      { label: "LED Indicators", value: "RGB LED (status)" },
      { label: "Audio", value: "Piezo buzzer" },
      { label: "Buttons", value: "2x tactile switches" },
      { label: "Mounting", value: "VESA 75x75 compatible" },
      { label: "Enclosure", value: "IP65-rated ABS plastic" },
    ],
  },
]

const performanceMetrics = [
  { metric: "NFC Read Speed", qikcard: "<100ms", qikpoint: "<500ms", description: "Time to complete interaction" },
  { metric: "WiFi Range", qikcard: "N/A", qikpoint: "100m open space", description: "Maximum wireless range" },
  {
    metric: "Battery Life",
    qikcard: "Passive (no battery)",
    qikpoint: "48+ hours",
    description: "Continuous operation",
  },
  {
    metric: "Operating Temp",
    qikcard: "-25°C to +85°C",
    qikpoint: "-10°C to +60°C",
    description: "Safe operating range",
  },
  { metric: "Durability", qikcard: "10,000+ cycles", qikpoint: "Industrial grade", description: "Expected lifespan" },
  {
    metric: "Certification",
    qikcard: "ISO7816, NFC Forum",
    qikpoint: "FCC, CE, IC",
    description: "Regulatory compliance",
  },
]

export default function HardwareSpecsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #2d4663 0%, #1a2b42 50%, #0a1628 100%)",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4 bg-slate-900/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-semibold text-xl">
            QikCard
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Home
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-600">Download Specs</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-400/30">Technical Specifications</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Hardware Specifications</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Detailed technical specifications for QikCard devices and QikPoint scanners. Built with cutting-edge
            technology for maximum performance and reliability.
          </p>
        </div>
      </section>

      {/* Hardware Tabs */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="qikcard" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 mb-12">
              <TabsTrigger value="qikcard" className="data-[state=active]:bg-blue-500">
                QikCard Device
              </TabsTrigger>
              <TabsTrigger value="qikpoint" className="data-[state=active]:bg-blue-500">
                QikPoint Scanner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="qikcard">
              <div className="space-y-8">
                {qikCardSpecs.map((category, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.specs.map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-white/70 text-sm">{spec.label}</span>
                            <span className="text-white font-medium text-sm">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qikpoint">
              <div className="space-y-8">
                {qikPointSpecs.map((category, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white text-xl">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.specs.map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center py-2 border-b border-white/10">
                            <span className="text-white/70 text-sm">{spec.label}</span>
                            <span className="text-white font-medium text-sm">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Performance Comparison */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Performance Comparison</h2>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left text-white font-semibold py-4">Metric</th>
                      <th className="text-center text-white font-semibold py-4">QikCard</th>
                      <th className="text-center text-white font-semibold py-4">QikPoint</th>
                      <th className="text-left text-white font-semibold py-4">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceMetrics.map((metric, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="text-white/80 py-4">{metric.metric}</td>
                        <td className="text-center text-blue-400 py-4 font-medium">{metric.qikcard}</td>
                        <td className="text-center text-green-400 py-4 font-medium">{metric.qikpoint}</td>
                        <td className="text-white/60 py-4 text-sm">{metric.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">System Architecture</h2>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                    <Cpu className="w-5 h-5 mr-2" />
                    QikCard Architecture
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">NFC Antenna Layer</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">NTAG216 NFC Chip</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">ATECC608A Secure Element</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">PVC Card Body</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    QikPoint Architecture
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">ESP32 Microcontroller</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">PN532 NFC Module</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">WiFi/Bluetooth Radio</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-white/80 text-sm">Power Management Unit</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Certifications & Compliance</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Security</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>Common Criteria EAL4+</li>
                  <li>FIPS 140-2 Level 3</li>
                  <li>ISO/IEC 15408</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Wifi className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Wireless</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>FCC Part 15</li>
                  <li>CE RED 2014/53/EU</li>
                  <li>IC RSS-247</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Thermometer className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Environmental</h3>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>RoHS Compliant</li>
                  <li>REACH Regulation</li>
                  <li>ISO 14001</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-red-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Download Technical Documentation</h3>
              <p className="text-white/80 mb-6">
                Get detailed datasheets, CAD files, and integration guides for QikCard hardware components.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Download Datasheets</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  CAD Files & Models
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
