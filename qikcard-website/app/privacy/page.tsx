"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const privacySections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "Account information (name, email, profile details)",
      "Event participation data and interaction logs",
      "QikCard device identifiers and usage statistics",
      "Blockchain wallet addresses and transaction data",
      "Location data during event participation (with consent)",
      "Device information and technical logs for support",
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      "Provide and improve QikCard platform services",
      "Process event registrations and manage participation",
      "Generate analytics and insights for event organizers",
      "Facilitate networking and professional connections",
      "Send important updates and security notifications",
      "Comply with legal obligations and prevent fraud",
    ],
  },
  {
    icon: Users,
    title: "Information Sharing",
    content: [
      "Event organizers receive aggregated participation data",
      "Public QikProfile information is visible to other users",
      "Blockchain transactions are publicly verifiable",
      "Service providers who assist in platform operations",
      "Legal authorities when required by law",
      "Business partners with your explicit consent",
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      "End-to-end encryption for sensitive communications",
      "Hardware security modules for crypto operations",
      "Regular security audits and penetration testing",
      "Multi-factor authentication for account access",
      "Secure data centers with 24/7 monitoring",
      "Employee background checks and security training",
    ],
  },
  {
    icon: Shield,
    title: "Your Rights",
    content: [
      "Access and download your personal data",
      "Correct inaccurate or incomplete information",
      "Delete your account and associated data",
      "Restrict processing of your information",
      "Data portability to other platforms",
      "Withdraw consent for optional data processing",
    ],
  },
  {
    icon: Globe,
    title: "International Transfers",
    content: [
      "Data may be processed in multiple jurisdictions",
      "Adequate protection measures for international transfers",
      "Compliance with GDPR, CCPA, and other privacy laws",
      "Data localization options for enterprise customers",
      "Regular review of data transfer mechanisms",
      "User notification of significant changes",
    ],
  },
]

export default function PrivacyPage() {
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
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-400/30">Legal</Badge>
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">Privacy Policy</h1>
            <p className="text-xl text-white/80 mb-8">
              Your privacy is fundamental to how we build and operate QikCard. This policy explains how we collect, use,
              and protect your information.
            </p>
            <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
              <span>Effective Date: January 1, 2025</span>
              <span>•</span>
              <span>Last Updated: January 1, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {privacySections.map((section, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <section.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <CardTitle className="text-white text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-white/70 text-sm flex items-start">
                        <span className="text-blue-400 mr-2 mt-1">•</span>
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

      {/* Detailed Sections */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            {/* Blockchain Specific Privacy */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Blockchain and Cryptocurrency Privacy</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <p>QikCard integrates with blockchain networks, which have unique privacy considerations:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        Blockchain transactions are publicly visible and immutable
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        We use privacy-preserving techniques like zero-knowledge proofs where possible
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        Your crypto wallet addresses may be linked to your QikProfile
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        NFT ownership and transfers are recorded on public blockchains
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Data Retention</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <p>We retain your information for different periods based on the type of data:</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Account Data</h4>
                        <p className="text-sm text-white/70">
                          Retained until account deletion or 3 years of inactivity
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Event Data</h4>
                        <p className="text-sm text-white/70">Retained for 7 years for analytics and compliance</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Transaction Logs</h4>
                        <p className="text-sm text-white/70">Retained for 10 years for financial compliance</p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Marketing Data</h4>
                        <p className="text-sm text-white/70">Retained until consent is withdrawn</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Contact Us</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-white/80">
                    <p className="mb-4">
                      If you have questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2">
                      <p>
                        <strong>Email:</strong> privacy@qikcard.com
                      </p>
                      <p>
                        <strong>Address:</strong> QikCard Inc., NCR, Philippines
                      </p>
                      <p>
                        <strong>Data Protection Officer:</strong> dpo@qikcard.com
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Updates Notice */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Policy Updates</h3>
              <p className="text-white/80 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by email
                or through our platform.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">Subscribe to Updates</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
