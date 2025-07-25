"use client"

import Link from "next/link"
import { ArrowLeft, MessageCircle, Book, Mail, Phone, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7",
    responseTime: "< 2 minutes",
    action: "Start Chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message about your issue",
    availability: "24/7",
    responseTime: "< 4 hours",
    action: "Send Email",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our technical experts",
    availability: "Mon-Fri 9AM-6PM PST",
    responseTime: "Immediate",
    action: "Call Now",
  },
]

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        question: "How do I set up my first QikCard event?",
        answer:
          "Start by creating an account, then use our event wizard to configure your event settings, add QikPoint scanners, and customize your NFT rewards.",
      },
      {
        question: "What hardware do I need to get started?",
        answer:
          "You'll need QikPoint scanners for your event and QikCards for participants. We offer starter packages that include everything you need.",
      },
      {
        question: "How long does it take to set up QikCard for an event?",
        answer:
          "Most events can be set up in under 30 minutes using our guided setup process. Complex events with custom integrations may take longer.",
      },
    ],
  },
  {
    title: "Technical Issues",
    questions: [
      {
        question: "My QikPoint scanner isn't connecting to WiFi",
        answer:
          "Check your network settings, ensure the scanner is within range, and verify your WiFi credentials. Try restarting the scanner if issues persist.",
      },
      {
        question: "QikCards aren't being recognized by the scanner",
        answer:
          "Ensure the QikCard is properly positioned on the scanner, check for physical damage, and verify the scanner's NFC module is functioning.",
      },
      {
        question: "How do I update my scanner firmware?",
        answer:
          "Firmware updates are pushed automatically over WiFi. You can also manually trigger updates through the QikHub dashboard.",
      },
    ],
  },
  {
    title: "Account & Billing",
    questions: [
      {
        question: "How do I upgrade my subscription plan?",
        answer:
          "Visit your account settings in QikHub and select 'Upgrade Plan'. Changes take effect immediately and you'll be prorated for the current billing period.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer:
          "Yes, you can cancel anytime from your account settings. Your subscription will remain active until the end of your current billing period.",
      },
      {
        question: "Do you offer refunds?",
        answer:
          "We offer a 30-day money-back guarantee for new subscriptions. Hardware purchases are subject to our return policy.",
      },
    ],
  },
]

export default function SupportPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Contact Support</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30">Support Center</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">How Can We Help?</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Get the support you need to make your QikCard events successful. Our team is here to help 24/7.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              placeholder="Search for help articles, guides, and FAQs..."
              className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Get Support</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardHeader>
                  <option.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-white/70">{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Availability:</span>
                      <span className="text-white">{option.availability}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Response Time:</span>
                      <span className="text-green-400">{option.responseTime}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">{option.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Frequently Asked Questions</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <Card key={idx} className="bg-white/10 border-white/20 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-white text-base">{faq.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-white/70 text-sm">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Additional Resources</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Book className="h-10 w-10 text-blue-400 mb-4" />
                <CardTitle className="text-white text-xl">Documentation</CardTitle>
                <CardDescription className="text-white/70">Comprehensive guides and API references</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm mb-6">
                  <li>• Getting Started Guide</li>
                  <li>• API Reference</li>
                  <li>• Hardware Setup</li>
                  <li>• Best Practices</li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  View Documentation
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white text-xl">Community</CardTitle>
                <CardDescription className="text-white/70">
                  Connect with other QikCard users and developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-white/80 text-sm mb-6">
                  <li>• Discord Community</li>
                  <li>• Developer Forums</li>
                  <li>• User Groups</li>
                  <li>• Feature Requests</li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Still Need Help?</h3>
              <p className="text-white/80 mb-6">Our support team is available 24/7 to help you succeed with QikCard.</p>
              <div className="grid md:grid-cols-3 gap-6 text-white/70">
                <div>
                  <Mail className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <p className="font-medium">Email</p>
                  <p className="text-sm">support@qikcard.com</p>
                </div>
                <div>
                  <Phone className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <p className="font-medium">Phone</p>
                  <p className="text-sm">+63 991 009 7448</p>
                </div>
                <div>
                  <Clock className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <p className="font-medium">Hours</p>
                  <p className="text-sm">24/7 Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
