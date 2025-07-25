"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Users, Coins, Smartphone, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Interactive Event Engagement",
    description:
      "Seamless booth check-ins, activity logs, and session entries via QikPoint Scanners. Track real-time participant engagement and venue analytics.",
    badge: "For Events",
  },
  {
    icon: Shield,
    title: "Secure ICP Hardwallet",
    description:
      "Securely store credentials, NFTs, and tokens with ICP integration. Sign and authenticate transactions with your QikCard—portable and always in your control.",
    badge: "Crypto Life",
  },
  {
    icon: Users,
    title: "Public Crypto Portfolio",
    description:
      "Display achievements, NFTs, and credentials via your QikProfile. Network with fellow participants and builders in the QikCommunity Platform.",
    badge: "Community",
  },
  {
    icon: Coins,
    title: "Digital Collectibles & NFTs",
    description:
      "Earn exclusive digital stamps, NFT rewards, and commemorative collectibles. Build your unique collection as you participate in events.",
    badge: "Rewards",
  },
  {
    icon: Smartphone,
    title: "QikPoint Scanner Network",
    description:
      "BoothTag for check-ins, TimeMark for tracking, ClaimTag for exclusive items, and VoteMark for secure community voting.",
    badge: "Hardware",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Event organizers get powerful insights into participant behavior, engagement metrics, and venue optimization data.",
    badge: "Analytics",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 px-4 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-800/30" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Everything You Need for Web3 Events</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            QikCard combines physical hardware with blockchain technology to create seamless, engaging event
            experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
