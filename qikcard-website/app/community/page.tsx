"use client"

import Link from "next/link"
import { ArrowLeft, Users, MessageCircle, Calendar, Trophy, Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const communityStats = [
  { label: "Active Members", value: "15,234", change: "+1,234 this month" },
  { label: "Events Hosted", value: "2,456", change: "+89 this week" },
  { label: "NFTs Traded", value: "45,678", change: "+2,345 today" },
  { label: "Countries", value: "67", change: "+3 this month" },
]

const featuredMembers = [
  {
    name: "Alex Chen",
    role: "Event Organizer",
    avatar: "/placeholder.svg?height=60&width=60",
    events: 23,
    reputation: 4.9,
    badges: ["Top Organizer", "Community Leader"],
  },
  {
    name: "Sarah Rodriguez",
    role: "Developer",
    avatar: "/placeholder.svg?height=60&width=60",
    events: 45,
    reputation: 4.8,
    badges: ["Code Contributor", "Beta Tester"],
  },
  {
    name: "Michael Park",
    role: "NFT Creator",
    avatar: "/placeholder.svg?height=60&width=60",
    events: 12,
    reputation: 4.7,
    badges: ["Artist", "Creator"],
  },
]

const recentPosts = [
  {
    author: "Jennifer Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    title: "Best practices for NFT reward design",
    content:
      "Just finished organizing a 500+ person conference and wanted to share some insights on creating engaging NFT rewards...",
    likes: 23,
    replies: 8,
    tags: ["NFTs", "Event Design", "Best Practices"],
  },
  {
    author: "David Liu",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "4 hours ago",
    title: "QikPoint scanner troubleshooting guide",
    content: "Created a comprehensive guide for common scanner issues. Hope this helps other event organizers...",
    likes: 45,
    replies: 12,
    tags: ["Hardware", "Troubleshooting", "Guide"],
  },
  {
    author: "Lisa Wang",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "6 hours ago",
    title: "Successful 2000+ person event recap",
    content:
      "Just wrapped up our biggest event yet! Here's what we learned about scaling QikCard for large conferences...",
    likes: 67,
    replies: 19,
    tags: ["Case Study", "Large Events", "Success Story"],
  },
]

const upcomingEvents = [
  {
    title: "QikCard Community Meetup",
    date: "March 15, 2025",
    time: "7:00 PM PST",
    type: "Virtual",
    attendees: 234,
    description: "Monthly community gathering to discuss new features and share experiences.",
  },
  {
    title: "Developer Workshop",
    date: "March 22, 2025",
    time: "2:00 PM PST",
    type: "Hybrid",
    attendees: 89,
    description: "Hands-on workshop for integrating QikCard APIs into your applications.",
  },
  {
    title: "NFT Design Contest",
    date: "April 1, 2025",
    time: "All Day",
    type: "Online",
    attendees: 156,
    description: "Community contest for the best event NFT designs. Prizes for top submissions!",
  },
]

export default function CommunityPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Join Community</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30">Community</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">QikCard Community</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Connect with event organizers, developers, and Web3 enthusiasts from around the world. Share experiences,
            learn from experts, and shape the future of event technology.
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/70 text-sm mb-1">{stat.label}</div>
                  <div className="text-green-400 text-xs">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-white mb-8">Featured Community Members</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {featuredMembers.map((member, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-blue-500 text-white">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-white font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{member.role}</p>

                  <div className="flex justify-center space-x-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-bold">{member.events}</div>
                      <div className="text-white/60">Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {member.reputation}
                      </div>
                      <div className="text-white/60">Rating</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.badges.map((badge, idx) => (
                      <Badge key={idx} className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Discussion */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Posts */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-light text-white mb-8">Recent Discussions</h2>

              <div className="space-y-6">
                {recentPosts.map((post, index) => (
                  <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={post.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-500 text-white text-sm">
                            {post.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-white font-medium">{post.author}</span>
                            <span className="text-white/50 text-sm">{post.time}</span>
                          </div>

                          <h3 className="text-white font-semibold mb-2">{post.title}</h3>
                          <p className="text-white/70 text-sm mb-4">{post.content}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {post.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="border-white/20 text-white/60 text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center space-x-4 text-white/60 text-sm">
                              <span className="flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                {post.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {post.replies}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Events */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                        <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
                        <p className="text-white/60 text-xs mb-2">
                          {event.date} • {event.time}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                            {event.type}
                          </Badge>
                          <span className="text-white/60 text-xs">{event.attendees} attending</span>
                        </div>
                        <p className="text-white/70 text-xs">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Links */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Join the Conversation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 justify-start">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Discord Server
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent justify-start"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Telegram Group
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent justify-start"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      GitHub Discussions
                      <ExternalLink className="w-4 h-4 ml-auto" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Ready to Join Our Community?</h3>
              <p className="text-white/80 mb-6">
                Connect with thousands of event organizers and Web3 enthusiasts. Share your experiences and learn from
                the best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Join Discord</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Browse Discussions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
