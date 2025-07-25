"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, Zap, Shield, Users, Smartphone, BarChart3, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const productFeatures = [
  {
    icon: Zap,
    title: "QikPoint Scanner Network",
    description: "Four specialized scanner types for different event interactions",
    details: [
      "BoothTag - Digital reward claims at vendor booths",
      "TimeMark - Entry/exit tracking for event flow monitoring",
      "ClaimTag - Controlled distribution of exclusive merchandise",
      "VoteMark - Secure polling and community voting",
    ],
  },
  {
    icon: Shield,
    title: "ICP Hardwallet Integration",
    description: "Secure crypto wallet functionality built into your QikCard",
    details: [
      "t-ECDSA threshold cryptography for enhanced security",
      "Bitcoin network integration for cross-chain functionality",
      "Hardware-based transaction signing",
      "Portable crypto storage with NFC convenience",
    ],
  },
  {
    icon: Users,
    title: "QikProfile Digital Identity",
    description: "Your professional Web3 identity and networking platform",
    details: [
      "Display achievements, NFTs, and credentials publicly",
      "Network with fellow participants and builders",
      "LinkedIn meets Web3 for professional connections",
      "Privacy controls for selective information sharing",
    ],
  },
  {
    icon: Coins,
    title: "Digital Collectibles System",
    description: "Earn and collect unique NFTs and achievements",
    details: [
      "Event-specific commemorative NFTs",
      "Achievement badges for participation milestones",
      "Exclusive collectibles for premium experiences",
      "Marketplace for trading and showcasing collections",
    ],
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive insights for event organizers",
    details: [
      "Live participant engagement tracking",
      "Venue flow optimization data",
      "ROI measurement for sponsors and exhibitors",
      "Predictive analytics for future event planning",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Seamless integration across all devices",
    details: [
      "Progressive Web App for offline functionality",
      "Real-time notifications and updates",
      "Cross-platform synchronization",
      "Intuitive user interface design",
    ],
  },
]

export default function ProductPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-400/30">Product Overview</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">The Complete Web3 Event Platform</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            QikCard combines physical NFC hardware with ICP blockchain technology to create the most advanced event
            engagement platform ever built.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Product Features Grid */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Everything You Need for Web3 Events</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              From hardware to software, QikCard provides a complete ecosystem for modern event engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-white/60 text-sm flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Technical Specifications</h2>
            <p className="text-white/70 text-lg">
              Built on cutting-edge technology for maximum performance and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* QikCard Hardware */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">QikCard Hardware</CardTitle>
                <CardDescription className="text-white/70">
                  Physical NFC device with integrated crypto wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">NFC Technology</h4>
                  <p className="text-white/60 text-sm">NTAG213/215/216 compatible, 13.56MHz frequency</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Security</h4>
                  <p className="text-white/60 text-sm">Secure element for hardware wallet functionality</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Durability</h4>
                  <p className="text-white/60 text-sm">Waterproof, scratch-resistant, event-ready design</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Battery Life</h4>
                  <p className="text-white/60 text-sm">30+ days active use, wireless charging support</p>
                </div>
              </CardContent>
            </Card>

            {/* QikPoint Scanners */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">QikPoint Scanners</CardTitle>
                <CardDescription className="text-white/70">
                  ESP32-based scanning devices for event interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Processing</h4>
                  <p className="text-white/60 text-sm">ESP32 microcontroller with WiFi connectivity</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">NFC Module</h4>
                  <p className="text-white/60 text-sm">PN532 for reliable NFC communication</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Feedback</h4>
                  <p className="text-white/60 text-sm">LED status indicators and audio confirmation</p>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Power</h4>
                  <p className="text-white/60 text-sm">USB-C charging with 48-hour battery life</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ICP Integration */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Powered by Internet Computer Protocol</h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              QikCard leverages advanced ICP features to deliver unparalleled security, scalability, and functionality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "t-ECDSA",
                description: "Threshold cryptography for secure transaction signing",
              },
              {
                title: "HTTP Outcalls",
                description: "Real-time external API integration and data sync",
              },
              {
                title: "Bitcoin API",
                description: "Cross-chain functionality with Bitcoin network",
              },
              {
                title: "Timers",
                description: "Automated reward distribution and maintenance",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Ready to Transform Your Events?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of event organizers who are already using QikCard to create unforgettable Web3 experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get Your QikCard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
