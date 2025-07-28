"use client"

import Link from "next/link"
import { ArrowLeft, FileText, Shield, Users, Gavel, AlertTriangle, CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const termsSections = [
  {
    icon: Users,
    title: "Account Registration",
    content: [
      "You must be at least 18 years old to create an account",
      "Provide accurate and complete registration information",
      "Maintain the security of your account credentials",
      "You are responsible for all activities under your account",
      "One account per person; no sharing of accounts",
      "Notify us immediately of any unauthorized access",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    content: [
      "All fees are charged in USD unless otherwise specified",
      "Subscription fees are billed monthly or annually in advance",
      "Hardware purchases are one-time payments",
      "Refunds are subject to our refund policy",
      "Price changes require 30 days advance notice",
      "Failed payments may result in service suspension",
    ],
  },
  {
    icon: Shield,
    title: "Acceptable Use",
    content: [
      "Use QikCard only for lawful purposes",
      "Do not interfere with platform security or functionality",
      "Respect intellectual property rights of others",
      "No harassment, abuse, or harmful content",
      "Comply with all applicable laws and regulations",
      "Report security vulnerabilities responsibly",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Prohibited Activities",
    content: [
      "Reverse engineering or attempting to extract source code",
      "Creating fake accounts or impersonating others",
      "Distributing malware or malicious code",
      "Attempting to gain unauthorized access to systems",
      "Using the platform for illegal activities",
      "Violating any third-party rights or agreements",
    ],
  },
  {
    icon: FileText,
    title: "Intellectual Property",
    content: [
      "QikCard retains all rights to platform technology",
      "Users retain rights to their original content",
      "Limited license granted for platform use only",
      "Respect trademarks and copyrighted materials",
      "Report intellectual property violations",
      "DMCA takedown procedures available",
    ],
  },
  {
    icon: Gavel,
    title: "Limitation of Liability",
    content: [
      "Service provided 'as is' without warranties",
      "No liability for indirect or consequential damages",
      "Maximum liability limited to fees paid in past 12 months",
      "Users responsible for backup of important data",
      "Force majeure events exclude liability",
      "Some jurisdictions may not allow liability limitations",
    ],
  },
]

export default function TermsPage() {
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-400/30">Legal</Badge>
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">Terms of Service</h1>
            <p className="text-xl text-white/80 mb-8">
              These terms govern your use of QikCard platform and services. Please read them carefully before using our
              platform.
            </p>
            <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
              <span>Effective Date: January 1, 2025</span>
              <span>•</span>
              <span>Last Updated: January 1, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {termsSections.map((section, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <section.icon className="h-10 w-10 text-purple-400 mb-4" />
                  <CardTitle className="text-white text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-white/70 text-sm flex items-start">
                        <span className="text-purple-400 mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            {/* Service Description */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Service Description</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <p>QikCard provides a comprehensive Web3 event engagement platform that includes:</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Hardware Components</h4>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li>• QikCard NFC devices</li>
                          <li>• QikPoint scanner systems</li>
                          <li>• Mobile scanning applications</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Software Platform</h4>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li>• QikHub event management</li>
                          <li>• QikProfile digital identity</li>
                          <li>• Analytics and reporting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blockchain Terms */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Blockchain and Cryptocurrency Terms</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <p>By using QikCard's blockchain features, you acknowledge and agree that:</p>
                    <ul className="space-y-2 ml-4 mt-4">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Blockchain transactions are irreversible and immutable
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        You are responsible for securing your private keys and wallet access
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Cryptocurrency values are volatile and may result in losses
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Network fees and gas costs are your responsibility
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Regulatory compliance is your responsibility in your jurisdiction
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Account Termination</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">By You</h4>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li>• Cancel subscription anytime</li>
                          <li>• Export your data before termination</li>
                          <li>• Hardware remains your property</li>
                          <li>• Blockchain assets remain accessible</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">By QikCard</h4>
                        <ul className="space-y-1 text-sm text-white/70">
                          <li>• Violation of terms or policies</li>
                          <li>• Non-payment of fees</li>
                          <li>• Illegal or harmful activities</li>
                          <li>• 30-day notice for convenience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Governing Law and Disputes</h3>
              <div className="text-white/80 space-y-4">
                <p>
                  These Terms are governed by the laws of the Philippines. Any disputes will be resolved through binding
                  arbitration in NCR, Philippines.
                </p>
                <p>
                  For questions about these Terms, contact us at: <strong>legal@qikcard.com</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
