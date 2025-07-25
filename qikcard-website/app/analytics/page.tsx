"use client"

import Link from "next/link"
import { ArrowLeft, BarChart3, Users, TrendingUp, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const analyticsData = {
  overview: {
    totalInteractions: 45678,
    uniqueParticipants: 12345,
    averageEngagement: 87,
    nftsDistributed: 23456,
  },
  engagement: [
    { time: "9:00", interactions: 120 },
    { time: "10:00", interactions: 280 },
    { time: "11:00", interactions: 450 },
    { time: "12:00", interactions: 380 },
    { time: "13:00", interactions: 220 },
    { time: "14:00", interactions: 520 },
    { time: "15:00", interactions: 680 },
    { time: "16:00", interactions: 590 },
    { time: "17:00", interactions: 340 },
  ],
  topLocations: [
    { name: "Main Stage", interactions: 8945, percentage: 19.6 },
    { name: "Sponsor Booth A", interactions: 6234, percentage: 13.7 },
    { name: "Networking Area", interactions: 5678, percentage: 12.4 },
    { name: "Food Court", interactions: 4321, percentage: 9.5 },
    { name: "Session Hall 1", interactions: 3987, percentage: 8.7 },
  ],
  demographics: {
    ageGroups: [
      { range: "18-25", percentage: 28 },
      { range: "26-35", percentage: 42 },
      { range: "36-45", percentage: 20 },
      { range: "46+", percentage: 10 },
    ],
    interests: [
      { category: "DeFi", percentage: 35 },
      { category: "NFTs", percentage: 28 },
      { category: "Gaming", percentage: 22 },
      { category: "Infrastructure", percentage: 15 },
    ],
  },
}

export default function AnalyticsPage() {
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
            <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Dashboard
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-600">Export Report</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-400/30">Analytics</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Event Analytics Dashboard</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Comprehensive insights into your event performance, participant engagement, and ROI metrics.
          </p>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Total Interactions</p>
                    <p className="text-3xl font-bold text-white">
                      {analyticsData.overview.totalInteractions.toLocaleString()}
                    </p>
                    <p className="text-green-400 text-sm">+12% from last event</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Unique Participants</p>
                    <p className="text-3xl font-bold text-white">
                      {analyticsData.overview.uniqueParticipants.toLocaleString()}
                    </p>
                    <p className="text-green-400 text-sm">+8% from last event</p>
                  </div>
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">Engagement Rate</p>
                    <p className="text-3xl font-bold text-white">{analyticsData.overview.averageEngagement}%</p>
                    <p className="text-green-400 text-sm">+15% from last event</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm">NFTs Distributed</p>
                    <p className="text-3xl font-bold text-white">
                      {analyticsData.overview.nftsDistributed.toLocaleString()}
                    </p>
                    <p className="text-green-400 text-sm">+25% from last event</p>
                  </div>
                  <Award className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Tabs */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="engagement" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20 mb-8">
              <TabsTrigger value="engagement" className="data-[state=active]:bg-blue-500">
                Engagement
              </TabsTrigger>
              <TabsTrigger value="locations" className="data-[state=active]:bg-blue-500">
                Locations
              </TabsTrigger>
              <TabsTrigger value="demographics" className="data-[state=active]:bg-blue-500">
                Demographics
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-blue-500">
                Performance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="engagement">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Hourly Engagement</CardTitle>
                  <CardDescription className="text-white/70">
                    Participant interactions throughout the event day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-end justify-between space-x-2">
                    {analyticsData.engagement.map((data, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-400"
                          style={{ height: `${(data.interactions / 700) * 100}%` }}
                        />
                        <span className="text-white/60 text-xs mt-2">{data.time}</span>
                        <span className="text-white text-xs">{data.interactions}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Interaction Locations</CardTitle>
                  <CardDescription className="text-white/70">
                    Most popular areas based on QikPoint scanner data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topLocations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-white font-medium">{location.name}</p>
                            <p className="text-white/60 text-sm">
                              {location.interactions.toLocaleString()} interactions
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{location.percentage}%</p>
                          <div className="w-20 h-2 bg-white/20 rounded-full mt-1">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${location.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demographics">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Age Distribution</CardTitle>
                    <CardDescription className="text-white/70">Participant age demographics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.demographics.ageGroups.map((group, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white">{group.range}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 h-3 bg-white/20 rounded-full">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${group.percentage}%` }}
                              />
                            </div>
                            <span className="text-white font-medium w-12 text-right">{group.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Interest Categories</CardTitle>
                    <CardDescription className="text-white/70">Popular topics and interests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.demographics.interests.map((interest, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white">{interest.category}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 h-3 bg-white/20 rounded-full">
                              <div
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${interest.percentage}%` }}
                              />
                            </div>
                            <span className="text-white font-medium w-12 text-right">{interest.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Scanner Performance</CardTitle>
                    <CardDescription className="text-white/70">QikPoint scanner efficiency metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Average Response Time</span>
                        <span className="text-white font-bold">0.3s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Success Rate</span>
                        <span className="text-green-400 font-bold">99.7%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Network Uptime</span>
                        <span className="text-green-400 font-bold">99.9%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Battery Health</span>
                        <span className="text-yellow-400 font-bold">87%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">ROI Metrics</CardTitle>
                    <CardDescription className="text-white/70">Return on investment analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Cost per Interaction</span>
                        <span className="text-white font-bold">$0.12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Engagement Increase</span>
                        <span className="text-green-400 font-bold">+285%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Time Savings</span>
                        <span className="text-green-400 font-bold">75%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Overall ROI</span>
                        <span className="text-green-400 font-bold">+340%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Export Options */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Export Your Analytics</h3>
              <p className="text-white/80 mb-6">
                Download comprehensive reports and share insights with your team and stakeholders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Download PDF Report</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Export to CSV
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Schedule Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
