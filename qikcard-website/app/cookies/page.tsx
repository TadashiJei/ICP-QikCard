"use client"

import Link from "next/link"
import { ArrowLeft, Cookie, Settings, BarChart3, Shield, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

const cookieTypes = [
  {
    icon: Shield,
    title: "Essential Cookies",
    description: "Required for basic platform functionality",
    required: true,
    examples: [
      "Authentication and session management",
      "Security and fraud prevention",
      "Load balancing and performance",
      "User preferences and settings",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    description: "Help us understand how users interact with our platform",
    required: false,
    examples: [
      "Page views and user journeys",
      "Feature usage statistics",
      "Performance monitoring",
      "Error tracking and debugging",
    ],
  },
  {
    icon: Settings,
    title: "Functional Cookies",
    description: "Enable enhanced features and personalization",
    required: false,
    examples: [
      "Language and region preferences",
      "Customized dashboard layouts",
      "Saved search filters",
      "Accessibility settings",
    ],
  },
  {
    icon: Globe,
    title: "Marketing Cookies",
    description: "Used for targeted advertising and marketing campaigns",
    required: false,
    examples: [
      "Ad personalization and targeting",
      "Campaign effectiveness measurement",
      "Social media integration",
      "Cross-platform tracking",
    ],
  },
]

export default function CookiesPage() {
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
            <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-400/30">Legal</Badge>
            <h1 className="text-4xl lg:text-5xl font-light text-white mb-6">Cookie Policy</h1>
            <p className="text-xl text-white/80 mb-8">
              Learn how QikCard uses cookies and similar technologies to enhance your experience and provide our
              services.
            </p>
            <div className="flex items-center justify-center space-x-4 text-white/60 text-sm">
              <span>Effective Date: January 1, 2025</span>
              <span>•</span>
              <span>Last Updated: January 1, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cookie Preferences */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-12">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Settings className="w-6 h-6 mr-3" />
                Cookie Preferences
              </CardTitle>
              <CardDescription className="text-white/70">
                Manage your cookie preferences below. Essential cookies cannot be disabled as they are required for the
                platform to function.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-start space-x-4 flex-1">
                    <type.icon className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h3 className="text-white font-medium mb-1">{type.title}</h3>
                      <p className="text-white/70 text-sm mb-3">{type.description}</p>
                      <ul className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="text-white/60 text-xs flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="ml-4">
                    <Switch disabled={type.required} defaultChecked={type.required} />
                    {type.required && <p className="text-white/50 text-xs mt-1">Required</p>}
                  </div>
                </div>
              ))}
              <div className="flex space-x-4 pt-4">
                <Button className="bg-blue-500 hover:bg-blue-600">Save Preferences</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Accept All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light text-white mb-6">What Are Cookies?</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <p>
                      Cookies are small text files that are stored on your device when you visit our website. They help
                      us provide you with a better experience by remembering your preferences and enabling certain
                      functionality.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">First-Party Cookies</h4>
                        <p className="text-sm text-white/70">
                          Set directly by QikCard for core functionality and user experience
                        </p>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Third-Party Cookies</h4>
                        <p className="text-sm text-white/70">
                          Set by our partners for analytics, advertising, and social media features
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* How We Use Cookies */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">How We Use Cookies</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6 text-white/80">
                    <div>
                      <h4 className="text-white font-medium mb-3">Platform Functionality</h4>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Maintain your login session across pages
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Remember your dashboard preferences and settings
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Enable secure transactions and prevent fraud
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-3">Analytics and Improvement</h4>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Understand how users navigate and use our platform
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Identify and fix technical issues
                        </li>
                        <li className="flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          Measure the effectiveness of new features
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Managing Cookies */}
            <div>
              <h2 className="text-2xl font-light text-white mb-6">Managing Your Cookies</h2>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4 text-white/80">
                    <p>You have several options for managing cookies:</p>
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="text-white font-medium mb-2">Browser Settings</h4>
                        <p className="text-sm text-white/70 mb-2">
                          Configure cookie preferences in your browser settings
                        </p>
                        <ul className="space-y-1 text-xs text-white/60">
                          <li>• Chrome: Settings → Privacy and Security → Cookies</li>
                          <li>• Firefox: Settings → Privacy & Security</li>
                          <li>• Safari: Preferences → Privacy</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">Platform Controls</h4>
                        <p className="text-sm text-white/70 mb-2">Use our cookie preference center above</p>
                        <ul className="space-y-1 text-xs text-white/60">
                          <li>• Granular control over cookie types</li>
                          <li>• Real-time preference updates</li>
                          <li>• Easy opt-out options</li>
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

      {/* Third-Party Services */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-light text-white mb-8 text-center">Third-Party Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Google Analytics</h3>
                <p className="text-white/70 text-sm">Website usage analytics and performance monitoring</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Intercom</h3>
                <p className="text-white/70 text-sm">Customer support and communication platform</p>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Globe className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Cloudflare</h3>
                <p className="text-white/70 text-sm">Content delivery and security services</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <Cookie className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-4">Questions About Cookies?</h3>
              <p className="text-white/80 mb-6">
                If you have any questions about our use of cookies or this policy, please contact us.
              </p>
              <div className="space-y-2 text-white/70">
                <p>
                  <strong>Email:</strong> privacy@qikcard.com
                </p>
                <p>
                  <strong>Subject:</strong> Cookie Policy Inquiry
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
