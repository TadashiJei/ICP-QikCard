"use client"

import Link from "next/link"
import { ArrowLeft, Check, X, Zap, Users, Crown, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

const pricingPlans = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for small events and meetups",
    monthlyPrice: 99,
    yearlyPrice: 990,
    participants: "Up to 500",
    scanners: "5 QikPoints",
    features: [
      "Basic event management",
      "Standard NFT rewards",
      "Email support",
      "Basic analytics",
      "Mobile app access",
      "Community forum access",
    ],
    limitations: ["No custom branding", "No API access", "No advanced analytics", "No priority support"],
    popular: false,
  },
  {
    name: "Professional",
    icon: Users,
    description: "Ideal for corporate events and conferences",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    participants: "Up to 2,000",
    scanners: "20 QikPoints",
    features: [
      "Advanced event management",
      "Custom NFT collections",
      "Priority email support",
      "Advanced analytics & insights",
      "Custom branding",
      "API access (limited)",
      "Webhook integrations",
      "Multi-event management",
    ],
    limitations: ["No white-label solution", "No dedicated support", "Limited API calls"],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building,
    description: "For large-scale events and organizations",
    monthlyPrice: 999,
    yearlyPrice: 9990,
    participants: "Unlimited",
    scanners: "100+ QikPoints",
    features: [
      "Full platform access",
      "White-label solutions",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom integrations",
      "Unlimited API access",
      "Advanced security features",
      "Custom analytics dashboards",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    limitations: [],
    popular: false,
  },
  {
    name: "Custom",
    icon: Crown,
    description: "Tailored solutions for Fortune 500 companies",
    monthlyPrice: null,
    yearlyPrice: null,
    participants: "Custom",
    scanners: "Custom",
    features: [
      "Everything in Enterprise",
      "Custom development",
      "Dedicated infrastructure",
      "Custom SLA terms",
      "On-site training",
      "24/7 dedicated support team",
      "Custom compliance requirements",
      "Multi-region deployment",
    ],
    limitations: [],
    popular: false,
  },
]

const hardwarePricing = [
  {
    name: "QikCard Device",
    variants: [
      { name: "Basic", price: 39, features: ["NFC + basic crypto wallet", "Standard materials", "1-year warranty"] },
      {
        name: "Pro",
        price: 59,
        features: ["Enhanced security", "Bitcoin support", "Premium materials", "2-year warranty"],
      },
      {
        name: "Premium",
        price: 79,
        features: ["Multi-chain support", "Premium materials", "Custom branding", "3-year warranty"],
      },
    ],
  },
  {
    name: "QikPoint Scanner",
    variants: [
      {
        name: "Standard",
        price: 45,
        features: ["All scanner types", "WiFi connectivity", "1-year warranty", "Basic support"],
      },
      {
        name: "Pro",
        price: 65,
        features: ["Enhanced range", "Cellular backup", "2-year warranty", "Priority support"],
      },
    ],
  },
]

const addOns = [
  {
    name: "Advanced Analytics",
    price: 199,
    period: "month",
    description: "Detailed participant insights and custom reports",
  },
  { name: "Real-time Dashboard", price: 99, period: "month", description: "Live event monitoring and alerts" },
  {
    name: "Custom Integrations",
    price: 10000,
    period: "one-time",
    description: "Enterprise API integrations and custom development",
  },
  {
    name: "Professional Services",
    price: 2500,
    period: "event",
    description: "Full-service event setup and management",
  },
  { name: "Training & Support", price: 199, period: "hour", description: "Dedicated training and premium support" },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

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
            <Button className="bg-blue-500 hover:bg-blue-600">Start Free Trial</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30">Pricing</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your events. All plans include core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-white/70 ${!isYearly ? "text-white font-medium" : ""}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-white/70 ${isYearly ? "text-white font-medium" : ""}`}>
              Yearly <Badge className="ml-2 bg-green-500/20 text-green-300 border-green-400/30">Save 17%</Badge>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`bg-white/10 border-white/20 backdrop-blur-sm relative ${
                  plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <plan.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-white/70">{plan.description}</CardDescription>

                  <div className="py-4">
                    {plan.monthlyPrice ? (
                      <div>
                        <span className="text-4xl font-bold text-white">
                          ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                        </span>
                        <span className="text-white/60">/month</span>
                        {isYearly && (
                          <div className="text-sm text-green-400 mt-1">Billed annually (${plan.yearlyPrice}/year)</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-white">Custom Quote</div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Participants:</span>
                      <span className="text-white">{plan.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Scanners:</span>
                      <span className="text-white">{plan.scanners}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-white/80 text-sm">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="flex items-start text-white/50 text-sm">
                        <X className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                        {limitation}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-white/10 hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    {plan.monthlyPrice ? "Get Started" : "Contact Sales"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Pricing */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Hardware Pricing</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {hardwarePricing.map((hardware, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{hardware.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {hardware.variants.map((variant, idx) => (
                      <div key={idx} className="border border-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-white font-medium">{variant.name}</h4>
                          <span className="text-2xl font-bold text-white">${variant.price}</span>
                        </div>
                        <ul className="space-y-1">
                          {variant.features.map((feature, fidx) => (
                            <li key={fidx} className="text-white/70 text-sm flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/70 mb-4">Volume discounts available:</p>
            <div className="flex justify-center space-x-8 text-sm">
              <span className="text-white/60">10+ devices: 10% off</span>
              <span className="text-white/60">50+ devices: 20% off</span>
              <span className="text-white/60">100+ devices: 30% off</span>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Add-ons & Services</h2>

          <div className="space-y-4">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{addon.name}</h3>
                      <p className="text-white/70 text-sm">{addon.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-white">${addon.price.toLocaleString()}</span>
                      <span className="text-white/60">/{addon.period}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Pricing FAQ</h2>

          <div className="space-y-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-white/70">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and you'll be
                  prorated for the current billing period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-white/70">
                  Yes, we offer a 14-day free trial for all plans. No credit card required to start your trial.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">What happens if I exceed my participant limit?</h3>
                <p className="text-white/70">
                  We'll automatically suggest an upgrade to accommodate your needs. You won't be charged extra without
                  your approval.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-white/70">
                  We offer a 30-day money-back guarantee for new subscriptions. Hardware purchases are subject to our
                  return policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Ready to Transform Your Events?</h3>
              <p className="text-white/80 mb-6">
                Start your free trial today and see how QikCard can revolutionize your event experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Start Free Trial</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
