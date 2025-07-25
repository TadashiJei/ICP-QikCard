"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const integrations = [
  {
    name: "Lu.ma",
    category: "Event Management",
    description: "Seamlessly sync your Lu.ma events with QikCard for enhanced engagement tracking",
    logo: "/placeholder.svg?height=60&width=60&text=Lu.ma",
    status: "Available",
    features: ["Event sync", "Attendee import", "Real-time updates", "Analytics integration"],
    setupTime: "5 minutes",
  },
  {
    name: "Eventbrite",
    category: "Event Management",
    description: "Import Eventbrite attendees and track engagement with QikCard technology",
    logo: "/placeholder.svg?height=60&width=60&text=Eventbrite",
    status: "Available",
    features: ["Attendee sync", "Ticket validation", "Check-in tracking", "Revenue analytics"],
    setupTime: "10 minutes",
  },
  {
    name: "Discord",
    category: "Community",
    description: "Connect your Discord server with QikCard for community engagement rewards",
    logo: "/placeholder.svg?height=60&width=60&text=Discord",
    status: "Available",
    features: ["Role-based rewards", "Activity tracking", "NFT distribution", "Community badges"],
    setupTime: "3 minutes",
  },
  {
    name: "Slack",
    category: "Communication",
    description: "Integrate QikCard with your Slack workspace for team event coordination",
    logo: "/placeholder.svg?height=60&width=60&text=Slack",
    status: "Available",
    features: ["Event notifications", "Team coordination", "Analytics reports", "Bot commands"],
    setupTime: "5 minutes",
  },
  {
    name: "Zoom",
    category: "Virtual Events",
    description: "Track virtual event attendance and engagement through Zoom integration",
    logo: "/placeholder.svg?height=60&width=60&text=Zoom",
    status: "Available",
    features: ["Attendance tracking", "Engagement metrics", "Breakout room analytics", "Recording integration"],
    setupTime: "8 minutes",
  },
  {
    name: "Shopify",
    category: "E-commerce",
    description: "Integrate QikCard with your Shopify store for event merchandise and NFT sales",
    logo: "/placeholder.svg?height=60&width=60&text=Shopify",
    status: "Coming Soon",
    features: ["NFT marketplace", "Event merchandise", "Loyalty rewards", "Customer analytics"],
    setupTime: "15 minutes",
  },
  {
    name: "Mailchimp",
    category: "Marketing",
    description: "Sync event attendee data with Mailchimp for targeted email campaigns",
    logo: "/placeholder.svg?height=60&width=60&text=Mailchimp",
    status: "Available",
    features: ["Audience sync", "Automated campaigns", "Engagement tracking", "Segmentation"],
    setupTime: "7 minutes",
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Connect QikCard with HubSpot to track leads and customer engagement",
    logo: "/placeholder.svg?height=60&width=60&text=HubSpot",
    status: "Available",
    features: ["Lead tracking", "Contact sync", "Deal pipeline", "ROI analytics"],
    setupTime: "12 minutes",
  },
  {
    name: "Zapier",
    category: "Automation",
    description: "Connect QikCard with 5000+ apps through Zapier automation workflows",
    logo: "/placeholder.svg?height=60&width=60&text=Zapier",
    status: "Available",
    features: ["Custom workflows", "Multi-app integration", "Trigger automation", "Data sync"],
    setupTime: "Variable",
  },
]

const categories = [
  { name: "All", count: integrations.length },
  { name: "Event Management", count: integrations.filter((i) => i.category === "Event Management").length },
  { name: "Community", count: integrations.filter((i) => i.category === "Community").length },
  { name: "Communication", count: integrations.filter((i) => i.category === "Communication").length },
  { name: "Marketing", count: integrations.filter((i) => i.category === "Marketing").length },
  { name: "E-commerce", count: integrations.filter((i) => i.category === "E-commerce").length },
]

const apiFeatures = [
  {
    title: "RESTful API",
    description: "Complete REST API with comprehensive documentation",
    features: ["Event management", "Participant tracking", "NFT distribution", "Analytics data"],
  },
  {
    title: "Webhooks",
    description: "Real-time event notifications for your applications",
    features: ["Event triggers", "Participant actions", "Scanner updates", "Custom endpoints"],
  },
  {
    title: "SDKs",
    description: "Official SDKs for popular programming languages",
    features: ["JavaScript/Node.js", "Python", "Go", "PHP"],
  },
  {
    title: "GraphQL",
    description: "Flexible GraphQL API for complex data queries",
    features: ["Custom queries", "Real-time subscriptions", "Type safety", "Efficient data fetching"],
  },
]

export default function IntegrationsPage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">View API Docs</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-400/30">Integrations</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Connect Everything</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Integrate QikCard with your favorite tools and platforms. From event management to marketing automation,
            connect your entire tech stack seamlessly.
          </p>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 bg-white/10 border border-white/20 mb-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.name.toLowerCase()}
                  value={category.name.toLowerCase().replace(" ", "-")}
                  className="data-[state=active]:bg-blue-500 text-xs lg:text-sm"
                >
                  {category.name} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations.map((integration, index) => (
                  <Card
                    key={index}
                    className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src={integration.logo || "/placeholder.svg"}
                          alt={integration.name}
                          className="w-12 h-12 rounded-lg"
                        />
                        <Badge
                          className={
                            integration.status === "Available"
                              ? "bg-green-500/20 text-green-300 border-green-400/30"
                              : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                          }
                        >
                          {integration.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                      <CardDescription className="text-white/70">{integration.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-white/60 text-sm mb-2">Key Features:</p>
                          <ul className="space-y-1">
                            {integration.features.map((feature, idx) => (
                              <li key={idx} className="text-white/80 text-sm flex items-start">
                                <Check className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-white/60 text-sm">Setup: {integration.setupTime}</span>
                          <Button
                            size="sm"
                            className={
                              integration.status === "Available"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-500 hover:bg-gray-600"
                            }
                            disabled={integration.status !== "Available"}
                          >
                            {integration.status === "Available" ? "Connect" : "Coming Soon"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Category-specific tabs would filter the integrations */}
            {categories.slice(1).map((category) => (
              <TabsContent
                key={category.name.toLowerCase().replace(" ", "-")}
                value={category.name.toLowerCase().replace(" ", "-")}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations
                    .filter((integration) => integration.category === category.name)
                    .map((integration, index) => (
                      <Card
                        key={index}
                        className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between mb-4">
                            <img
                              src={integration.logo || "/placeholder.svg"}
                              alt={integration.name}
                              className="w-12 h-12 rounded-lg"
                            />
                            <Badge
                              className={
                                integration.status === "Available"
                                  ? "bg-green-500/20 text-green-300 border-green-400/30"
                                  : "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                              }
                            >
                              {integration.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                          <CardDescription className="text-white/70">{integration.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <p className="text-white/60 text-sm mb-2">Key Features:</p>
                              <ul className="space-y-1">
                                {integration.features.map((feature, idx) => (
                                  <li key={idx} className="text-white/80 text-sm flex items-start">
                                    <Check className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <span className="text-white/60 text-sm">Setup: {integration.setupTime}</span>
                              <Button
                                size="sm"
                                className={
                                  integration.status === "Available"
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : "bg-gray-500 hover:bg-gray-600"
                                }
                                disabled={integration.status !== "Available"}
                              >
                                {integration.status === "Available" ? "Connect" : "Coming Soon"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* API & Developer Tools */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Developer Tools & APIs</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {apiFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="text-white/80 text-sm flex items-start">
                        <Check className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Workflows */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Popular Integration Workflows</h2>

          <div className="space-y-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Event Management Workflow</h3>
                <div className="flex items-center space-x-4 text-white/70">
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">Lu.ma</span>
                  <span>→</span>
                  <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">QikCard</span>
                  <span>→</span>
                  <span className="bg-green-500/20 px-3 py-1 rounded-full text-sm">Mailchimp</span>
                  <span>→</span>
                  <span className="bg-orange-500/20 px-3 py-1 rounded-full text-sm">Analytics</span>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Automatically sync events from Lu.ma, track engagement with QikCard, send follow-up emails via
                  Mailchimp, and analyze results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Community Engagement Workflow</h3>
                <div className="flex items-center space-x-4 text-white/70">
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">Discord</span>
                  <span>→</span>
                  <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">QikCard</span>
                  <span>→</span>
                  <span className="bg-green-500/20 px-3 py-1 rounded-full text-sm">NFT Rewards</span>
                  <span>→</span>
                  <span className="bg-orange-500/20 px-3 py-1 rounded-full text-sm">Leaderboard</span>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Track Discord activity, reward active members with NFTs through QikCard, and maintain community
                  leaderboards.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold text-lg mb-4">Sales & Marketing Workflow</h3>
                <div className="flex items-center space-x-4 text-white/70">
                  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">Eventbrite</span>
                  <span>→</span>
                  <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">QikCard</span>
                  <span>→</span>
                  <span className="bg-green-500/20 px-3 py-1 rounded-full text-sm">HubSpot</span>
                  <span>→</span>
                  <span className="bg-orange-500/20 px-3 py-1 rounded-full text-sm">Follow-up</span>
                </div>
                <p className="text-white/60 text-sm mt-4">
                  Import Eventbrite attendees, track engagement with QikCard, sync leads to HubSpot, and automate
                  follow-up campaigns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-orange-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Ready to Connect Your Tools?</h3>
              <p className="text-white/80 mb-6">
                Start integrating QikCard with your existing workflow. Our comprehensive API and pre-built integrations
                make it easy to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View API Documentation
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Browse Integrations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
