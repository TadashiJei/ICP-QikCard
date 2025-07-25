"use client"

import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FeaturesSection from "@/components/features-section"

const featureComparisons = [
  {
    category: "Event Engagement",
    traditional: "Manual check-ins, paper forms, lost tickets",
    qikcard: "Instant NFC tap interactions, digital tracking, secure storage",
  },
  {
    category: "Networking",
    traditional: "Business card exchanges, manual contact entry",
    qikcard: "Digital QikProfile sharing, automatic connections, Web3 identity",
  },
  {
    category: "Rewards",
    traditional: "Physical stamps, paper certificates, easy to lose",
    qikcard: "Permanent NFT collectibles, blockchain-verified achievements",
  },
  {
    category: "Analytics",
    traditional: "Limited data, manual counting, delayed insights",
    qikcard: "Real-time analytics, predictive insights, automated reporting",
  },
  {
    category: "Security",
    traditional: "Vulnerable to fraud, no verification",
    qikcard: "Blockchain verification, cryptographic security, tamper-proof",
  },
]

const advancedFeatures = [
  {
    title: "Cross-Chain Compatibility",
    description: "Support for Bitcoin, Ethereum, and ICP networks",
    benefits: ["Multi-asset portfolio management", "Cross-chain transactions", "Universal wallet functionality"],
  },
  {
    title: "AI-Powered Analytics",
    description: "Machine learning insights for event optimization",
    benefits: ["Predictive attendance modeling", "Engagement pattern analysis", "Automated recommendations"],
  },
  {
    title: "Enterprise Integration",
    description: "Seamless integration with existing event platforms",
    benefits: ["API-first architecture", "Custom webhook support", "White-label solutions"],
  },
  {
    title: "Privacy Controls",
    description: "Granular privacy settings for user data",
    benefits: ["Selective information sharing", "GDPR compliance", "Zero-knowledge proofs"],
  },
]

export default function FeaturesPage() {
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
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-400/30">Platform Features</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Revolutionary Event Technology</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Discover how QikCard's advanced features transform traditional events into engaging Web3 experiences that
            participants will never forget.
          </p>
        </div>
      </section>

      {/* Main Features Section */}
      <FeaturesSection />

      {/* Traditional vs QikCard Comparison */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Traditional Events vs QikCard</h2>
            <p className="text-white/70 text-lg">
              See how QikCard revolutionizes every aspect of event management and participation.
            </p>
          </div>

          <div className="space-y-6">
            {featureComparisons.map((comparison, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">{comparison.category}</h3>
                    </div>
                    <div className="space-y-2">
                      <Badge variant="outline" className="border-red-400/30 text-red-300 mb-2">
                        Traditional
                      </Badge>
                      <p className="text-white/60 text-sm">{comparison.traditional}</p>
                    </div>
                    <div className="space-y-2">
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30 mb-2">QikCard</Badge>
                      <p className="text-white/80 text-sm">{comparison.qikcard}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Advanced Capabilities</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Cutting-edge features that set QikCard apart from traditional event solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-white/80 text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-light text-white mb-6">Why Event Organizers Choose QikCard</h2>
              <div className="space-y-4">
                {[
                  "75% reduction in check-in time compared to traditional methods",
                  "300% increase in participant engagement and interaction",
                  "Real-time analytics provide actionable insights during events",
                  "Blockchain security ensures tamper-proof attendance records",
                  "Cross-platform compatibility works with existing event tools",
                  "Scalable infrastructure handles events from 50 to 50,000 participants",
                ].map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-white/80">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">Ready to Get Started?</h3>
              <p className="text-white/70 mb-6 text-sm">
                Join thousands of event organizers who are already transforming their events with QikCard.
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Start Free Trial</Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
