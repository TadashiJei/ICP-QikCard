"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, Calendar, MapPin, Users, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const upcomingEvents = [
  {
    title: "Web3 Developer Conference 2025",
    date: "March 15-17, 2025",
    location: "San Francisco, CA",
    participants: "2,500+",
    type: "Technology",
    status: "Registration Open",
    description:
      "The largest Web3 developer gathering featuring QikCard integration for seamless networking and NFT rewards.",
    features: ["Digital Collectibles", "Live Voting", "Networking Hub", "Real-time Analytics"],
  },
  {
    title: "Crypto Innovation Summit",
    date: "April 8-10, 2025",
    location: "New York, NY",
    participants: "1,800+",
    type: "Finance",
    status: "Early Bird",
    description: "Explore the future of cryptocurrency with interactive QikCard experiences and exclusive NFT drops.",
    features: ["Exclusive NFTs", "Hardwallet Demo", "Cross-chain Showcase", "VIP Access"],
  },
  {
    title: "Blockchain Builders Meetup",
    date: "May 22, 2025",
    location: "Austin, TX",
    participants: "500+",
    type: "Community",
    status: "Coming Soon",
    description: "Monthly community gathering powered by QikCard for authentic Web3 networking experiences.",
    features: ["Community Rewards", "Skill Matching", "Project Showcase", "Mentorship"],
  },
]

const pastEvents = [
  {
    title: "WCHL 2025 Hackathon",
    date: "January 2025",
    location: "Global (Virtual + Physical)",
    participants: "5,000+",
    achievements: "QikCard won 1st place with revolutionary Web3 event platform",
    stats: {
      interactions: "50,000+",
      nfts: "12,000+",
      satisfaction: "98%",
    },
  },
  {
    title: "DeFi Conference Miami",
    date: "December 2024",
    location: "Miami, FL",
    participants: "3,200+",
    achievements: "First major conference to implement full QikCard integration",
    stats: {
      interactions: "75,000+",
      nfts: "18,500+",
      satisfaction: "96%",
    },
  },
]

const eventTypes = [
  {
    icon: Users,
    title: "Corporate Events",
    description: "Team building, training sessions, company meetings",
    examples: ["Annual conferences", "Product launches", "Training workshops", "Team retreats"],
  },
  {
    icon: Trophy,
    title: "Competitions & Hackathons",
    description: "Coding competitions, innovation challenges, contests",
    examples: ["Hackathons", "Coding bootcamps", "Innovation contests", "Startup pitches"],
  },
  {
    icon: Star,
    title: "Community Gatherings",
    description: "Meetups, networking events, social gatherings",
    examples: ["Tech meetups", "Networking events", "Social mixers", "Community forums"],
  },
  {
    icon: Calendar,
    title: "Conferences & Summits",
    description: "Large-scale professional conferences and industry summits",
    examples: ["Industry conferences", "Academic summits", "Trade shows", "Exhibitions"],
  },
]

export default function EventsPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Host an Event</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30">Events Powered by QikCard</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">
            Transform Your Events with Web3 Technology
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            From intimate meetups to massive conferences, QikCard powers engaging Web3 experiences that participants
            will remember forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Host Your Event
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Browse Events
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Upcoming QikCard Events</h2>
            <p className="text-white/70 text-lg">
              Join these exciting events and experience the future of Web3 engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">{event.type}</Badge>
                    <Badge variant="outline" className="border-green-400/30 text-green-300">
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-white/70">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-white/60 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participants} expected
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2 text-sm">Event Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {event.features.map((feature, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600 mt-4">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Perfect for Every Event Type</h2>
            <p className="text-white/70 text-lg">QikCard adapts to any event format, size, or industry.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventTypes.map((type, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardHeader>
                  <type.icon className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                  <CardTitle className="text-white text-lg">{type.title}</CardTitle>
                  <CardDescription className="text-white/70 text-sm">{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="text-white/60 text-xs">
                        {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Success Stories */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Success Stories</h2>
            <p className="text-white/70 text-lg">See how QikCard has transformed events around the world.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-white/70">{event.achievements}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-white/60 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-white/60 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{event.stats.interactions}</div>
                      <div className="text-white/60 text-xs">Interactions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{event.stats.nfts}</div>
                      <div className="text-white/60 text-xs">NFTs Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{event.stats.satisfaction}</div>
                      <div className="text-white/60 text-xs">Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Ready to Host Your Web3 Event?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join the revolution and create unforgettable experiences with QikCard's Web3 event platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Planning Your Event
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Contact Event Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
