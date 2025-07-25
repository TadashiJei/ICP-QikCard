"use client"

import Link from "next/link"
import { ArrowRight, ArrowLeft, User, Shield, Share2, Trophy, Wallet, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileFeatures = [
  {
    icon: User,
    title: "Digital Identity",
    description: "Your comprehensive Web3 professional profile",
    details: [
      "Customizable profile with personal branding",
      "Professional credentials and certifications",
      "Skills and expertise showcase",
      "Contact information and social links",
    ],
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Showcase your accomplishments and milestones",
    details: [
      "Event participation badges",
      "NFT collection display",
      "Skill-based achievements",
      "Community recognition awards",
    ],
  },
  {
    icon: Network,
    title: "Professional Networking",
    description: "Connect with like-minded professionals",
    details: [
      "Smart connection recommendations",
      "Industry-based networking",
      "Event-specific connections",
      "Mutual interest matching",
    ],
  },
  {
    icon: Wallet,
    title: "Crypto Portfolio",
    description: "Display your Web3 assets and investments",
    details: [
      "Multi-chain asset overview",
      "NFT collection showcase",
      "DeFi protocol participation",
      "Investment performance metrics",
    ],
  },
  {
    icon: Shield,
    title: "Privacy Controls",
    description: "Granular control over your information",
    details: [
      "Selective information sharing",
      "Audience-specific visibility",
      "Zero-knowledge verification",
      "GDPR compliance features",
    ],
  },
  {
    icon: Share2,
    title: "Social Integration",
    description: "Seamless sharing across platforms",
    details: ["LinkedIn integration", "Twitter profile sync", "GitHub contribution display", "Custom social links"],
  },
]

const sampleProfile = {
  name: "Alex Chen",
  title: "Senior Blockchain Developer",
  company: "Web3 Innovations Inc.",
  location: "San Francisco, CA",
  bio: "Passionate blockchain developer with 5+ years experience building DeFi protocols and NFT marketplaces. Active contributor to open-source Web3 projects.",
  achievements: [
    { name: "WCHL 2025 Winner", type: "Competition", date: "Jan 2025" },
    { name: "DeFi Protocol Builder", type: "Skill", date: "Dec 2024" },
    { name: "Community Leader", type: "Recognition", date: "Nov 2024" },
    { name: "NFT Creator", type: "Achievement", date: "Oct 2024" },
  ],
  stats: {
    events: 24,
    connections: 156,
    nfts: 89,
    reputation: 4.9,
  },
}

export default function QikProfilePage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Create Profile</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-400/30">QikProfile</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Your Web3 Professional Identity</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            QikProfile is where LinkedIn meets Web3. Showcase your achievements, connect with professionals, and build
            your reputation in the decentralized world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Create Your QikProfile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View Sample Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Profile Preview */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">Sample QikProfile</h2>
            <p className="text-white/70 text-lg">See how your professional Web3 identity could look.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="bg-blue-500 text-white text-2xl">AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-1">{sampleProfile.name}</h3>
                    <p className="text-blue-300 mb-2">{sampleProfile.title}</p>
                    <p className="text-white/70 mb-2">
                      {sampleProfile.company} • {sampleProfile.location}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">{sampleProfile.bio}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                      Connect
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Message
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{sampleProfile.stats.events}</div>
                    <div className="text-white/60 text-sm">Events</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{sampleProfile.stats.connections}</div>
                    <div className="text-white/60 text-sm">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{sampleProfile.stats.nfts}</div>
                    <div className="text-white/60 text-sm">NFTs</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{sampleProfile.stats.reputation}</div>
                    <div className="text-white/60 text-sm">Reputation</div>
                  </div>
                </div>

                {/* Recent Achievements */}
                <div>
                  <h4 className="text-white font-semibold mb-4">Recent Achievements</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {sampleProfile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <Trophy className="w-8 h-8 text-yellow-400" />
                        <div>
                          <p className="text-white font-medium text-sm">{achievement.name}</p>
                          <p className="text-white/60 text-xs">
                            {achievement.type} • {achievement.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">QikProfile Features</h2>
            <p className="text-white/70 text-lg">Everything you need to build your professional Web3 presence.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-white/70">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="text-white/60 text-sm flex items-start">
                        <span className="text-blue-400 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Why QikProfile Matters</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Professional Credibility</h3>
                  <p className="text-white/70">
                    Blockchain-verified achievements and credentials that can't be faked or manipulated.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Network Growth</h3>
                  <p className="text-white/70">
                    Connect with professionals who share your interests and expertise in the Web3 space.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Career Opportunities</h3>
                  <p className="text-white/70">
                    Showcase your Web3 skills and experience to potential employers and collaborators.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Community Recognition</h3>
                  <p className="text-white/70">
                    Build reputation through meaningful contributions to the Web3 ecosystem and community.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-white font-semibold text-xl mb-6">QikProfile vs Traditional Profiles</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Verification</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Blockchain</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Achievements</span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">NFT-based</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Privacy</span>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">User-controlled</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Portability</span>
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">Cross-platform</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70">Ownership</span>
                      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">Self-sovereign</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">Ready to Build Your Web3 Identity?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already building their reputation in the Web3 ecosystem with
            QikProfile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Create Your QikProfile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
