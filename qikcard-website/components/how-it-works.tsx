"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Zap, Trophy } from "lucide-react"

const steps = [
  {
    icon: CreditCard,
    step: "01",
    title: "Get Your QikCard",
    description:
      "Order your physical QikCard device with built-in NFC technology and secure crypto wallet functionality.",
    color: "from-blue-500 to-purple-600",
  },
  {
    icon: Smartphone,
    step: "02",
    title: "Download the App",
    description: "Install the QikCard mobile app and pair it with your physical card to create your digital identity.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: Zap,
    step: "03",
    title: "Tap & Engage",
    description:
      "At events, simply tap your QikCard on QikPoint scanners to check-in, claim rewards, and participate in activities.",
    color: "from-pink-500 to-red-600",
  },
  {
    icon: Trophy,
    step: "04",
    title: "Earn & Collect",
    description:
      "Build your digital collection of NFTs, achievements, and credentials while networking in the QikCommunity.",
    color: "from-red-500 to-orange-600",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-400/30">How It Works</Badge>
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Simple Steps to Web3 Event Engagement</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Get started with QikCard in minutes and transform your event experience forever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10`} />

              <CardHeader className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <step.icon className="h-8 w-8 text-white" />
                  <Badge variant="outline" className="border-white/30 text-white/80">
                    {step.step}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-white/70 leading-relaxed">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
