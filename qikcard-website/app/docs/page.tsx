"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, Book, Code, Zap, Shield, Users, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const documentationSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Quick start guide for developers and event organizers",
    links: [
      { title: "Installation Guide", href: "#", type: "guide" },
      { title: "First Event Setup", href: "#", type: "tutorial" },
      { title: "QikCard Pairing", href: "#", type: "tutorial" },
      { title: "Basic Configuration", href: "#", type: "guide" },
    ],
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Complete API documentation for developers",
    links: [
      { title: "REST API Endpoints", href: "#", type: "reference" },
      { title: "WebSocket Events", href: "#", type: "reference" },
      { title: "Authentication", href: "#", type: "guide" },
      { title: "Rate Limiting", href: "#", type: "guide" },
    ],
  },
  {
    icon: Zap,
    title: "Hardware Integration",
    description: "QikPoint scanner and QikCard hardware documentation",
    links: [
      { title: "QikPoint Setup", href: "#", type: "tutorial" },
      { title: "NFC Communication", href: "#", type: "reference" },
      { title: "Hardware Troubleshooting", href: "#", type: "guide" },
      { title: "Firmware Updates", href: "#", type: "tutorial" },
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Security best practices and privacy controls",
    links: [
      { title: "Cryptographic Security", href: "#", type: "guide" },
      { title: "Privacy Settings", href: "#", type: "tutorial" },
      { title: "Data Protection", href: "#", type: "guide" },
      { title: "Compliance", href: "#", type: "reference" },
    ],
  },
  {
    icon: Users,
    title: "Event Management",
    description: "Comprehensive guide for event organizers",
    links: [
      { title: "Event Creation", href: "#", type: "tutorial" },
      { title: "Participant Management", href: "#", type: "guide" },
      { title: "Analytics Dashboard", href: "#", type: "tutorial" },
      { title: "Reward Distribution", href: "#", type: "guide" },
    ],
  },
  {
    icon: Download,
    title: "SDKs & Tools",
    description: "Development tools and software development kits",
    links: [
      { title: "JavaScript SDK", href: "#", type: "sdk" },
      { title: "Python SDK", href: "#", type: "sdk" },
      { title: "Mobile SDK", href: "#", type: "sdk" },
      { title: "CLI Tools", href: "#", type: "tool" },
    ],
  },
]

const quickLinks = [
  {
    title: "Architecture Overview",
    description: "System architecture and component interactions",
    badge: "Popular",
    href: "#",
  },
  {
    title: "ICP Integration Guide",
    description: "How QikCard leverages Internet Computer Protocol",
    badge: "Technical",
    href: "#",
  },
  {
    title: "Event Setup Checklist",
    description: "Step-by-step checklist for event organizers",
    badge: "Essential",
    href: "#",
  },
  {
    title: "Troubleshooting Guide",
    description: "Common issues and their solutions",
    badge: "Support",
    href: "#",
  },
]

const codeExample = `// Initialize QikCard SDK
import { QikCard } from '@qikcard/sdk';

const qikcard = new QikCard({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Create a new event
const event = await qikcard.events.create({
  name: 'Web3 Developer Conference',
  startDate: '2025-03-15',
  endDate: '2025-03-17',
  location: 'San Francisco, CA'
});

// Set up QikPoint scanners
const scanner = await qikcard.scanners.create({
  eventId: event.id,
  type: 'BoothTag',
  location: 'Main Entrance'
});

console.log('Event created:', event.id);`

export default function DocsPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">API Keys</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-400/30">Documentation</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Build with QikCard</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Everything you need to integrate QikCard into your events, applications, and workflows. From quick start
            guides to advanced API references.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View API Reference
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Popular Documentation</h2>
            <p className="text-white/70 text-lg">Most accessed guides and references to get you started quickly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30">{link.badge}</Badge>
                    <ExternalLink className="w-4 h-4 text-white/50" />
                  </div>
                  <CardTitle className="text-white text-lg">{link.title}</CardTitle>
                  <CardDescription className="text-white/70">{link.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Complete Documentation</h2>
            <p className="text-white/70 text-lg">
              Comprehensive guides, tutorials, and references for all QikCard features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documentationSections.map((section, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <section.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <CardTitle className="text-white text-xl">{section.title}</CardTitle>
                  <CardDescription className="text-white/70">{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between text-white/80 hover:text-white transition-colors group"
                        >
                          <span className="text-sm">{link.title}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="border-white/20 text-white/60 text-xs">
                              {link.type}
                            </Badge>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Quick Start Example</h2>
              <p className="text-white/70 mb-6">
                Get up and running with QikCard in just a few lines of code. Our SDK makes integration simple and
                straightforward.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <span className="text-white/80">Install the QikCard SDK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <span className="text-white/80">Initialize with your API key</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <span className="text-white/80">Create events and scanners</span>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-blue-500 hover:bg-blue-600 mr-4">View Full Tutorial</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  API Reference
                </Button>
              </div>
            </div>
            <div>
              <Card className="bg-slate-900/80 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">JavaScript SDK</CardTitle>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Latest</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-white/80 overflow-x-auto">
                    <code>{codeExample}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Need Help?</h2>
            <p className="text-white/70 text-lg">Our team is here to support you every step of the way.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Book className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Documentation</h3>
                <p className="text-white/70 text-sm mb-4">Comprehensive guides and tutorials</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Browse Docs
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Community</h3>
                <p className="text-white/70 text-sm mb-4">Connect with other developers</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Join Discord
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Support</h3>
                <p className="text-white/70 text-sm mb-4">Direct support from our team</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
