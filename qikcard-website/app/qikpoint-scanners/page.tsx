"use client"

import Link from "next/link"
import { ArrowLeft, Wifi, Battery, Shield, Settings, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const scannerTypes = [
  {
    name: "BoothTag Scanner",
    description: "Perfect for vendor booths and sponsor activations",
    features: ["Instant reward distribution", "Sponsor branding support", "Offline mode capability", "LED feedback"],
    price: "$45",
    image: "/placeholder.svg?height=200&width=300&text=BoothTag+Scanner",
  },
  {
    name: "TimeMark Scanner",
    description: "Track entry/exit times and session attendance",
    features: ["Precise time tracking", "Session management", "Capacity monitoring", "Real-time sync"],
    price: "$45",
    image: "/placeholder.svg?height=200&width=300&text=TimeMark+Scanner",
  },
  {
    name: "ClaimTag Scanner",
    description: "Controlled distribution of exclusive items",
    features: ["Inventory management", "Access control", "Fraud prevention", "Admin override"],
    price: "$45",
    image: "/placeholder.svg?height=200&width=300&text=ClaimTag+Scanner",
  },
  {
    name: "VoteMark Scanner",
    description: "Secure voting and polling system",
    features: ["Anonymous voting", "Real-time results", "Tamper-proof", "Multi-choice support"],
    price: "$45",
    image: "/placeholder.svg?height=200&width=300&text=VoteMark+Scanner",
  },
]

const specifications = [
  { label: "Processor", value: "ESP32-WROOM-32E" },
  { label: "NFC Module", value: "PN532 (13.56 MHz)" },
  { label: "Connectivity", value: "WiFi 802.11 b/g/n, Bluetooth 4.2" },
  { label: "Power", value: "USB-C, 3.7V Li-Po backup" },
  { label: "Battery Life", value: "48+ hours continuous use" },
  { label: "Operating Range", value: "Up to 4cm NFC read distance" },
  { label: "Display", value: "128x64 OLED (optional)" },
  { label: "Indicators", value: "RGB LED, Piezo buzzer" },
  { label: "Enclosure", value: "IP65-rated ABS plastic" },
  { label: "Dimensions", value: "120mm x 80mm x 25mm" },
  { label: "Weight", value: "180g" },
  { label: "Operating Temp", value: "-10°C to +60°C" },
]

export default function QikPointScannersPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Order Scanners</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-400/30">Hardware</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">QikPoint Scanner Network</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Professional-grade NFC scanners designed for seamless event interactions. Choose from four specialized
            scanner types or use our mobile app solution.
          </p>
        </div>
      </section>

      {/* Scanner Options */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="hardware" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 border border-white/20 mb-12">
              <TabsTrigger value="hardware" className="data-[state=active]:bg-blue-500">
                Hardware Scanners
              </TabsTrigger>
              <TabsTrigger value="mobile" className="data-[state=active]:bg-blue-500">
                Mobile App Scanner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hardware">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {scannerTypes.map((scanner, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={scanner.image || "/placeholder.svg"}
                        alt={scanner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{scanner.name}</CardTitle>
                      <CardDescription className="text-white/70">{scanner.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {scanner.features.map((feature, idx) => (
                          <li key={idx} className="text-white/80 text-sm flex items-start">
                            <span className="text-orange-400 mr-2">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-white">{scanner.price}</span>
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30">In Stock</Badge>
                      </div>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">Add to Cart</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="mobile">
              <div className="max-w-4xl mx-auto">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="p-8">
                      <div className="flex items-center space-x-3 mb-6">
                        <Smartphone className="w-8 h-8 text-blue-400" />
                        <h2 className="text-2xl font-light text-white">QikScanner Mobile App</h2>
                      </div>
                      <p className="text-white/70 mb-6">
                        Transform any smartphone or tablet into a QikPoint scanner. Perfect for smaller events or as a
                        backup solution.
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-start space-x-3">
                          <span className="text-blue-400 mt-1">✓</span>
                          <div>
                            <h4 className="text-white font-medium">Cross-Platform Support</h4>
                            <p className="text-white/60 text-sm">iOS and Android compatible</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="text-blue-400 mt-1">✓</span>
                          <div>
                            <h4 className="text-white font-medium">Real-time Sync</h4>
                            <p className="text-white/60 text-sm">Instant data synchronization</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="text-blue-400 mt-1">✓</span>
                          <div>
                            <h4 className="text-white font-medium">Offline Mode</h4>
                            <p className="text-white/60 text-sm">Works without internet connection</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <span className="text-blue-400 mt-1">✓</span>
                          <div>
                            <h4 className="text-white font-medium">Multi-Scanner Support</h4>
                            <p className="text-white/60 text-sm">All four scanner types in one app</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button className="bg-blue-500 hover:bg-blue-600">Download for iOS</Button>
                        <Button
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        >
                          Download for Android
                        </Button>
                      </div>
                    </div>
                    <div className="p-8">
                      <img
                        src="/placeholder.svg?height=400&width=300&text=Mobile+App+Screenshot"
                        alt="QikScanner Mobile App"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Technical Specifications</h2>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white/70">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Advanced Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Wifi className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">WiFi Connectivity</h3>
                <p className="text-white/70 text-sm">Reliable wireless connection with automatic reconnection</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Battery className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Long Battery Life</h3>
                <p className="text-white/70 text-sm">48+ hours of continuous operation with backup battery</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Secure Communication</h3>
                <p className="text-white/70 text-sm">End-to-end encryption for all data transmission</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Settings className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Remote Management</h3>
                <p className="text-white/70 text-sm">Over-the-air updates and remote configuration</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-orange-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Ready to Deploy QikPoint Scanners?</h3>
              <p className="text-white/80 mb-6">
                Get professional-grade scanning hardware or start with our mobile app solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Order Hardware</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Download Mobile App
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
