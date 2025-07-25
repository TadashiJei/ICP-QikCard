"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Bookmark, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPostClient() {
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
          <Link href="/" className="text-white font-semibold text-xl" aria-label="QikCard Home">
            QikCard
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Blog
            </Link>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <section className="pt-24 pb-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-400/30">Industry Insights</Badge>

          <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            The Future of Event Engagement: Web3 Meets Physical Experiences
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-white/60">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Alex Chen
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                January 15, 2025
              </span>
              <span>8 min read</span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                aria-label="Bookmark article"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {["Web3", "Events", "Blockchain"].map((tag, idx) => (
              <Badge key={idx} variant="outline" className="border-white/20 text-white/60">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-4 lg:px-8 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video rounded-xl overflow-hidden">
            <img
              src="/placeholder.svg?height=600&width=1200&text=Web3+Events+Future"
              alt="Web3 Events Future - Blockchain technology transforming event engagement"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-4 lg:px-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-white/90 space-y-6 text-lg leading-relaxed">
              <p className="text-xl text-white/80 font-light mb-8">
                The events industry is experiencing a revolutionary transformation as Web3 technologies merge with
                traditional physical experiences, creating unprecedented opportunities for engagement, ownership, and
                community building.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The Evolution of Event Experiences</h2>

              <p>
                Traditional events have long relied on physical interactions, paper tickets, and manual check-ins. While
                these methods have served the industry well, they often lack the depth of engagement and data insights
                that modern event organizers need to create truly memorable experiences.
              </p>

              <p>
                Enter Web3 technology – a paradigm shift that introduces concepts like digital ownership, decentralized
                identity, and programmable rewards directly into the event experience. This isn't just about digitizing
                existing processes; it's about reimagining what events can be.
              </p>

              <div className="bg-white/10 border border-white/20 rounded-lg p-6 my-8">
                <h3 className="text-xl font-semibold text-white mb-4">Key Web3 Event Technologies</h3>
                <ul className="space-y-2 text-white/80">
                  <li>
                    • <strong>NFT Tickets:</strong> Unique, verifiable digital passes that can't be counterfeited
                  </li>
                  <li>
                    • <strong>Digital Identity:</strong> Persistent profiles that travel across events and platforms
                  </li>
                  <li>
                    • <strong>Smart Contracts:</strong> Automated reward distribution and engagement tracking
                  </li>
                  <li>
                    • <strong>Decentralized Storage:</strong> Permanent, censorship-resistant event memories
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Real-World Applications</h2>

              <p>
                At QikCard, we've witnessed firsthand how Web3 technologies can transform event engagement. Our platform
                combines physical NFC interactions with blockchain technology, creating a seamless bridge between the
                digital and physical worlds.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Traditional Events</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• Paper tickets and badges</li>
                      <li>• Manual check-ins</li>
                      <li>• Limited engagement tracking</li>
                      <li>• No persistent identity</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Web3-Enabled Events</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>• NFT tickets and digital badges</li>
                      <li>• Automated blockchain verification</li>
                      <li>• Rich engagement analytics</li>
                      <li>• Persistent digital identity</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">The QikCard Approach</h2>

              <p>
                Our solution addresses the gap between Web3 potential and practical implementation. By combining NFC
                technology with blockchain infrastructure, we've created a system that feels familiar to event attendees
                while delivering the benefits of Web3 technology.
              </p>

              <p>
                The magic happens when attendees tap their QikCard at various event stations. Each interaction is
                recorded on the blockchain, creating an immutable record of their event journey. This data becomes the
                foundation for personalized rewards, networking opportunities, and future event recommendations.
              </p>

              <div className="aspect-video rounded-lg overflow-hidden my-8">
                <img
                  src="/placeholder.svg?height=400&width=800&text=QikCard+NFC+Interaction"
                  alt="QikCard NFC Interaction - Demonstrating tap-to-earn functionality"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Looking Ahead</h2>

              <p>
                The future of events lies in this seamless integration of physical and digital experiences. As Web3
                technologies mature and become more accessible, we expect to see:
              </p>

              <ul className="space-y-2 text-white/80 ml-6">
                <li>• More sophisticated reward mechanisms tied to event participation</li>
                <li>• Cross-event identity and reputation systems</li>
                <li>• Decentralized event governance and community-driven experiences</li>
                <li>• Integration with metaverse and virtual event platforms</li>
              </ul>

              <p className="text-xl text-white/80 font-light mt-12">
                The transformation is already underway. Event organizers who embrace these technologies today will be
                the ones shaping the future of how we connect, engage, and build communities through shared experiences.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="px-4 lg:px-8 py-12 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  AC
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">Alex Chen</h3>
                  <p className="text-white/70 mb-4">
                    Product Manager at QikCard with 8+ years of experience in Web3 technologies and event management.
                    Passionate about bridging the gap between blockchain innovation and real-world applications.
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      aria-label="Follow Alex Chen on Twitter"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      aria-label="Connect with Alex Chen on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Articles */}
      <section className="px-4 lg:px-8 py-16">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-light text-white mb-8 text-center">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/blog/building-first-qikcard-integration">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src="/placeholder.svg?height=200&width=400&text=Developer+Tutorial"
                    alt="Building Your First QikCard Integration - Developer Tutorial"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                    Developer Tutorial
                  </Badge>
                  <h3 className="text-white text-lg mb-2">Building Your First QikCard Integration</h3>
                  <p className="text-white/70 text-sm">
                    Learn how to integrate QikCard into your event platform with our comprehensive developer tutorial.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg?height=200&width=400&text=Case+Study"
                  alt="DevCon 2024 Case Study - Event Engagement Success"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-500/20 text-green-300 border-green-400/30 text-xs">Case Study</Badge>
                <h3 className="text-white text-lg mb-2">How DevCon 2024 Achieved 300% Engagement</h3>
                <p className="text-white/70 text-sm">
                  Deep dive into how Web3 Developer Conference used QikCard to transform their event experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
