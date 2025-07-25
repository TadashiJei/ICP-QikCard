"use client"

import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    number: "500K+",
    label: "Event Participants",
    description: "Engaged through QikCard platform",
  },
  {
    number: "2,500+",
    label: "Events Powered",
    description: "Successful implementations worldwide",
  },
  {
    number: "50K+",
    label: "Digital Collectibles",
    description: "NFTs and achievements earned",
  },
  {
    number: "99.9%",
    label: "Uptime",
    description: "Reliable ICP blockchain infrastructure",
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 px-4 lg:px-8 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-300 font-medium mb-1">{stat.label}</div>
                <div className="text-white/60 text-sm">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
