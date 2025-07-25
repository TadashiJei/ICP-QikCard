"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    title: "The Future of Event Engagement: Web3 Meets Physical Experiences",
    slug: "future-of-event-engagement-web3",
    excerpt:
      "Explore how blockchain technology is revolutionizing the events industry and creating new opportunities for meaningful participant engagement.",
    author: "Alex Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "Industry Insights",
    tags: ["Web3", "Events", "Blockchain"],
    image: "/placeholder.svg?height=200&width=400&text=Web3+Events",
  },
  {
    title: "Building Your First QikCard Integration: A Step-by-Step Guide",
    slug: "building-first-qikcard-integration",
    excerpt:
      "Learn how to integrate QikCard into your event platform with our comprehensive developer tutorial and code examples.",
    author: "Sarah Rodriguez",
    date: "January 12, 2025",
    readTime: "12 min read",
    category: "Developer Tutorial",
    tags: ["API", "Integration", "Tutorial"],
    image: "/placeholder.svg?height=200&width=400&text=Developer+Tutorial",
  },
  {
    title: "Case Study: How DevCon 2024 Achieved 300% Engagement Increase",
    slug: "devcon-2024-engagement-case-study",
    excerpt:
      "Deep dive into how Web3 Developer Conference used QikCard to transform their event experience and achieve record engagement.",
    author: "Michael Park",
    date: "January 10, 2025",
    readTime: "6 min read",
    category: "Case Study",
    tags: ["Case Study", "Success Story", "Analytics"],
    image: "/placeholder.svg?height=200&width=400&text=Case+Study",
  },
  {
    title: "Understanding NFT Rewards: Best Practices for Event Organizers",
    slug: "nft-rewards-best-practices",
    excerpt:
      "Learn how to design and implement effective NFT reward systems that drive engagement and create lasting value for participants.",
    author: "Jennifer Kim",
    date: "January 8, 2025",
    readTime: "10 min read",
    category: "Best Practices",
    tags: ["NFTs", "Rewards", "Strategy"],
    image: "/placeholder.svg?height=200&width=400&text=NFT+Rewards",
  },
  {
    title: "QikCard Hardware Deep Dive: ESP32 and NFC Technology",
    slug: "qikcard-hardware-deep-dive",
    excerpt:
      "Technical exploration of QikPoint scanner architecture, NFC communication protocols, and hardware optimization strategies.",
    author: "David Liu",
    date: "January 5, 2025",
    readTime: "15 min read",
    category: "Technical",
    tags: ["Hardware", "ESP32", "NFC"],
    image: "/placeholder.svg?height=200&width=400&text=Hardware+Tech",
  },
  {
    title: "Privacy and Security in Web3 Events: A Comprehensive Guide",
    slug: "privacy-security-web3-events",
    excerpt:
      "Understand the privacy implications of blockchain-based event systems and learn how to protect participant data.",
    author: "Lisa Wang",
    date: "January 3, 2025",
    readTime: "9 min read",
    category: "Security",
    tags: ["Privacy", "Security", "Compliance"],
    image: "/placeholder.svg?height=200&width=400&text=Security+Guide",
  },
]

const categories = [
  "All Posts",
  "Industry Insights",
  "Developer Tutorial",
  "Case Study",
  "Best Practices",
  "Technical",
  "Security",
]

export default function BlogClientPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All Posts" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <>
      {/* JSON-LD Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "QikCard Blog",
            description: "Web3 Events, Blockchain Technology & Developer Insights",
            url: "https://theqikcard.com/blog",
            publisher: {
              "@type": "Organization",
              name: "QikCard",
              logo: "https://theqikcard.com/MetaSEO-Image.png",
            },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              description: post.excerpt,
              url: `https://theqikcard.com/blog/${post.slug}`,
              datePublished: new Date(post.date).toISOString(),
              author: {
                "@type": "Person",
                name: post.author,
              },
              publisher: {
                "@type": "Organization",
                name: "QikCard",
              },
              image: `https://theqikcard.com${post.image}`,
              keywords: post.tags.join(", "),
            })),
          }),
        }}
      />

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
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 inline mr-2" />
                Back to Home
              </Link>
              <Button className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 lg:px-8">
          <div className="container mx-auto text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-400/30">Blog</Badge>
            <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">QikCard Insights</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Stay updated with the latest trends in Web3 events, technical tutorials, and success stories from the
              QikCard community.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-4 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "border-white/20 text-white hover:bg-white/10 bg-transparent"
                  }
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-8 px-4 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8">
                  <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-400/30">Featured</Badge>
                  <h2 className="text-3xl font-light text-white mb-4">{blogPosts[0].title}</h2>
                  <p className="text-white/70 mb-6">{blogPosts[0].excerpt}</p>

                  <div className="flex items-center space-x-4 mb-6 text-white/60 text-sm">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {blogPosts[0].author}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blogPosts[0].date}
                    </span>
                    <span>{blogPosts[0].readTime}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPosts[0].tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="border-white/20 text-white/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link href={`/blog/${blogPosts[0].slug}`}>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="lg:p-8 p-4">
                  <img
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-4 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-light text-white mb-12 text-center">Latest Articles</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <Link key={index} href={`/blog/${post.slug}`}>
                  <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-white/60 text-xs">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-white text-lg leading-tight">{post.title}</CardTitle>
                      <CardDescription className="text-white/70 text-sm">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 text-white/60 text-sm">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {post.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-white/20 text-white/60 text-xs">
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
          <div className="container mx-auto max-w-4xl text-center">
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-white font-semibold text-xl mb-4">Stay Updated</h3>
                <p className="text-white/80 mb-6">
                  Get the latest QikCard insights, tutorials, and industry news delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Email address for newsletter"
                  />
                  <Button className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  )
}
