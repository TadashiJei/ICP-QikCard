"use client"

import { useState } from "react"
import { Users, Calendar, Zap, Award, TrendingUp, MapPin, Clock, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const dashboardStats = [
  {
    title: "Active Events",
    value: "12",
    change: "+3 this month",
    icon: Calendar,
    color: "text-blue-400",
  },
  {
    title: "Total Participants",
    value: "8,547",
    change: "+1,234 this week",
    icon: Users,
    color: "text-green-400",
  },
  {
    title: "QikPoint Scanners",
    value: "45",
    change: "5 offline",
    icon: Zap,
    color: "text-purple-400",
  },
  {
    title: "NFTs Distributed",
    value: "23,891",
    change: "+2,156 today",
    icon: Award,
    color: "text-orange-400",
  },
]

const recentEvents = [
  {
    name: "Web3 Developer Conference",
    status: "Live",
    participants: 2456,
    location: "San Francisco, CA",
    progress: 85,
    endTime: "2 hours left",
  },
  {
    name: "Crypto Innovation Summit",
    status: "Upcoming",
    participants: 1834,
    location: "New York, NY",
    progress: 95,
    endTime: "Starts in 3 days",
  },
  {
    name: "Blockchain Builders Meetup",
    status: "Completed",
    participants: 567,
    location: "Austin, TX",
    progress: 100,
    endTime: "Ended 2 days ago",
  },
]

const scannerStatus = [
  { id: "QP-001", name: "Main Entrance", status: "Online", battery: 87, interactions: 1234 },
  { id: "QP-002", name: "Booth Area A", status: "Online", battery: 92, interactions: 856 },
  { id: "QP-003", name: "Session Hall 1", status: "Offline", battery: 23, interactions: 445 },
  { id: "QP-004", name: "VIP Lounge", status: "Online", battery: 78, interactions: 234 },
  { id: "QP-005", name: "Food Court", status: "Online", battery: 65, interactions: 678 },
]

const recentActivity = [
  { time: "2 min ago", event: "New participant registered", details: "John Doe joined Web3 Conference" },
  { time: "5 min ago", event: "NFT reward distributed", details: "Session attendance badge minted" },
  { time: "12 min ago", event: "Scanner offline", details: "QP-003 lost connection" },
  { time: "18 min ago", event: "Milestone reached", details: "2000+ participants achieved" },
  { time: "25 min ago", event: "New interaction", details: "Booth check-in at Sponsor Area" },
]

export default function DashboardPage() {
  const [selectedEvent, setSelectedEvent] = useState("all")

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">QikHub Dashboard</h1>
              <p className="text-white/60">Manage your events and monitor real-time activity</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">Create Event</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-green-400 text-sm">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Events</CardTitle>
                <CardDescription className="text-white/70">Monitor your active and upcoming events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-medium">{event.name}</h3>
                          <Badge
                            className={
                              event.status === "Live"
                                ? "bg-green-500/20 text-green-300 border-green-400/30"
                                : event.status === "Upcoming"
                                  ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
                                  : "bg-gray-500/20 text-gray-300 border-gray-400/30"
                            }
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-white/60 text-sm mb-2">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.participants.toLocaleString()} participants
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.endTime}
                          </span>
                        </div>
                        <Progress value={event.progress} className="h-2" />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-4 border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scanner Status */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm mt-8">
              <CardHeader>
                <CardTitle className="text-white">QikPoint Scanner Status</CardTitle>
                <CardDescription className="text-white/70">Monitor your scanner network in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scannerStatus.map((scanner, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            scanner.status === "Online" ? "bg-green-400" : "bg-red-400"
                          }`}
                        />
                        <div>
                          <p className="text-white font-medium">{scanner.name}</p>
                          <p className="text-white/60 text-sm">{scanner.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-center">
                          <p className="text-white/60">Battery</p>
                          <p className="text-white">{scanner.battery}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-white/60">Interactions</p>
                          <p className="text-white">{scanner.interactions}</p>
                        </div>
                        <Badge
                          className={
                            scanner.status === "Online"
                              ? "bg-green-500/20 text-green-300 border-green-400/30"
                              : "bg-red-500/20 text-red-300 border-red-400/30"
                          }
                        >
                          {scanner.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-white/70">Live updates from your events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm">{activity.event}</p>
                        <p className="text-white/60 text-xs">{activity.details}</p>
                        <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create New Event
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent justify-start"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Add Scanner
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent justify-start"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Create NFT Collection
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent justify-start"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
