"use client"

import Link from "next/link"
import { ArrowLeft, TrendingUp, Users, Award, BarChart3, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const caseStudies = [
  {
    title: "Web3 Developer Conference 2024",
    company: "DevCon Global",
    industry: "Technology",
    participants: "2,500+",
    location: "San Francisco, CA",
    duration: "3 days",
    challenge:
      "Managing check-ins for 2,500+ developers across 50+ sessions while providing meaningful networking opportunities and verifiable attendance certificates.",
    solution:
      "Deployed 25 QikPoint scanners throughout the venue with custom NFT rewards for each session. Integrated QikProfile for professional networking.",
    results: [
      { metric: "Check-in Time Reduction", value: "85%", description: "From 5 minutes to 45 seconds average" },
      { metric: "Engagement Increase", value: "300%", description: "Session attendance tracking improved" },
      { metric: "NFTs Distributed", value: "12,000+", description: "Unique collectibles for each session" },
      { metric: "New Connections", value: "8,500+", description: "Professional connections made via QikProfile" },
    ],
    testimonial: {
      quote:
        "QikCard transformed our event experience. Attendees loved collecting NFTs for each session, and our analytics improved dramatically.",
      author: "Sarah Chen",
      role: "Event Director, DevCon Global",
    },
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Crypto Innovation Summit",
    company: "Blockchain Events Inc",
    industry: "Finance",
    participants: "1,800+",
    location: "New York, NY",
    duration: "2 days",
    challenge:
      "Creating exclusive experiences for VIP attendees while maintaining security and providing verifiable proof of attendance for regulatory compliance.",
    solution:
      "Implemented tiered access control with QikCards, VIP-only areas with special scanners, and compliance-ready attendance records on blockchain.",
    results: [
      { metric: "Security Incidents", value: "0", description: "Perfect access control with QikCards" },
      { metric: "VIP Satisfaction", value: "98%", description: "Exclusive experiences highly rated" },
      { metric: "Compliance Records", value: "100%", description: "All attendance blockchain-verified" },
      { metric: "Revenue Increase", value: "45%", description: "Premium ticket sales boost" },
    ],
    testimonial: {
      quote:
        "The blockchain-verified attendance records were crucial for our regulatory requirements. QikCard made compliance seamless.",
      author: "Michael Rodriguez",
      role: "CEO, Blockchain Events Inc",
    },
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Global Startup Festival",
    company: "Innovation Hub",
    industry: "Startup Ecosystem",
    participants: "5,000+",
    location: "Austin, TX",
    duration: "4 days",
    challenge:
      "Managing the largest startup event in Texas with multiple venues, complex scheduling, and need for investor-startup matching.",
    solution:
      "Deployed 50+ QikPoint scanners across 3 venues with AI-powered networking recommendations and real-time analytics dashboard.",
    results: [
      { metric: "Venue Utilization", value: "95%", description: "Optimal space usage with real-time data" },
      { metric: "Investor Meetings", value: "2,300+", description: "Successful startup-investor connections" },
      { metric: "Event App Downloads", value: "4,800+", description: "High mobile engagement" },
      { metric: "Sponsor ROI", value: "250%", description: "Measurable sponsor value delivery" },
    ],
    testimonial: {
      quote:
        "QikCard's analytics helped us optimize our venue usage in real-time. The networking features created genuine value for attendees.",
      author: "Jennifer Park",
      role: "Festival Director, Innovation Hub",
    },
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function CaseStudiesPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Start Your Success Story</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30">Case Studies</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Success Stories</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Discover how event organizers around the world are transforming their events with QikCard's Web3 technology.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">{study.industry}</Badge>
                      <div className="flex items-center text-white/60 text-sm space-x-4">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {study.participants}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {study.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {study.duration}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-light text-white mb-2">{study.title}</h2>
                    <p className="text-blue-300 mb-6">{study.company}</p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-semibold mb-2">Challenge</h3>
                        <p className="text-white/70 text-sm">{study.challenge}</p>
                      </div>

                      <div>
                        <h3 className="text-white font-semibold mb-2">Solution</h3>
                        <p className="text-white/70 text-sm">{study.solution}</p>
                      </div>

                      {/* Results Grid */}
                      <div>
                        <h3 className="text-white font-semibold mb-4">Results</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="bg-white/5 p-4 rounded-lg">
                              <div className="text-2xl font-bold text-green-400 mb-1">{result.value}</div>
                              <div className="text-white font-medium text-sm mb-1">{result.metric}</div>
                              <div className="text-white/60 text-xs">{result.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      <div className="bg-white/5 p-6 rounded-lg border-l-4 border-blue-400">
                        <p className="text-white/80 italic mb-4">"{study.testimonial.quote}"</p>
                        <div>
                          <p className="text-white font-medium">{study.testimonial.author}</p>
                          <p className="text-white/60 text-sm">{study.testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="lg:p-8 p-4">
                    <img
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Impact Across All Events</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">150%</div>
                <div className="text-white/70 text-sm">Average ROI Increase</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/70 text-sm">Total Participants</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-white/70 text-sm">Satisfaction Rate</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">75%</div>
                <div className="text-white/70 text-sm">Time Savings</div>
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
              <h3 className="text-white font-semibold text-xl mb-4">Ready to Create Your Success Story?</h3>
              <p className="text-white/80 mb-6">
                Join these successful event organizers and transform your events with QikCard's Web3 technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Schedule a Demo</Button>
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
