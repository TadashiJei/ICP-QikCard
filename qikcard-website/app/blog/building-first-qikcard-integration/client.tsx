"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, Bookmark, Twitter, Linkedin, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export default function BlogPostClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

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
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-400/30">Developer Tutorial</Badge>

          <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Building Your First QikCard Integration: A Step-by-Step Guide
          </h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-white/60">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Sarah Rodriguez
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                January 12, 2025
              </span>
              <span>12 min read</span>
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
            {["API", "Integration", "Tutorial"].map((tag, idx) => (
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
              src="/placeholder.svg?height=600&width=1200&text=QikCard+API+Integration"
              alt="QikCard API Integration Tutorial - Step-by-step developer guide"
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
                Ready to integrate QikCard into your event platform? This comprehensive guide will walk you through the
                entire process, from initial setup to advanced features implementation.
              </p>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Prerequisites</h2>

              <p>Before we dive into the integration process, make sure you have the following:</p>

              <ul className="space-y-2 text-white/80 ml-6">
                <li>
                  • A QikCard developer account (sign up at{" "}
                  <Link href="/developer-guide" className="text-blue-400 hover:text-blue-300">
                    developer.theqikcard.com
                  </Link>
                  )
                </li>
                <li>• Basic knowledge of REST APIs and webhooks</li>
                <li>• Node.js 16+ or Python 3.8+ development environment</li>
                <li>• Your event platform's API access</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Step 1: Setting Up Your API Keys</h2>

              <p>
                First, you'll need to obtain your API credentials from the QikCard developer dashboard. Navigate to your
                dashboard and create a new application:
              </p>

              <div className="bg-slate-800/50 border border-white/20 rounded-lg p-4 my-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">JavaScript</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        `const QIKCARD_API_KEY = 'your_api_key_here';
const QIKCARD_SECRET = 'your_secret_here';
const BASE_URL = 'https://api.theqikcard.com/v1';`,
                        "setup",
                      )
                    }
                    className="text-white/60 hover:text-white"
                    aria-label="Copy code to clipboard"
                  >
                    {copiedCode === "setup" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="text-white/90 text-sm overflow-x-auto">
                  {`const QIKCARD_API_KEY = 'your_api_key_here';
const QIKCARD_SECRET = 'your_secret_here';
const BASE_URL = 'https://api.theqikcard.com/v1';`}
                </pre>
              </div>

              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 my-6">
                <p className="text-blue-300 text-sm">
                  <strong>Security Note:</strong> Never expose your API secret in client-side code. Always keep it on
                  your server.
                </p>
              </div>

              <h2 className="text-2xl font-semibold text-white mt-12 mb-6">Step 2: Creating Your First Event</h2>

              <p>
                Let's create an event using the QikCard API. This will serve as the foundation for all participant
                interactions:
              </p>

              <div className="bg-slate-800/50 border border-white/20 rounded-lg p-4 my-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">JavaScript</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        `async function createEvent() {
  const response = await fetch(\`\${BASE_URL}/events\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${QIKCARD_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Web3 Developer Conference 2025',
      description: 'Annual gathering of Web3 developers',
      start_date: '2025-03-15T09:00:00Z',
      end_date: '2025-03-17T18:00:00Z',
      location: 'San Francisco, CA',
      settings: {
        nfc_enabled: true,
        rewards_enabled: true,
        analytics_enabled: true
      }
    })
  });
  
  const event = await response.json();
  console.log('Event created:', event);
  return event;
}`,
                        "create-event",
                      )
                    }
                    className="text-white/60 hover:text-white"
                    aria-label="Copy event creation code"
                  >
                    {copiedCode === "create-event" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <pre className="text-white/90 text-sm overflow-x-auto">
                  {`async function createEvent() {
  const response = await fetch(\`\${BASE_URL}/events\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${QIKCARD_API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Web3 Developer Conference 2025',
      description: 'Annual gathering of Web3 developers',
      start_date: '2025-03-15T09:00:00Z',
      end_date: '2025-03-17T18:00:00Z',
      location: 'San Francisco, CA',
      settings: {
        nfc_enabled: true,
        rewards_enabled: true,
        analytics_enabled: true
      }
    })
  });
  
  const event = await response.json();
  console.log('Event created:', event);
  return event;
}`}
                </pre>
              </div>

              <p className="text-xl text-white/80 font-light mt-12">
                You're now ready to create amazing Web3-powered event experiences with QikCard. Happy building!
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                  SR
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2">Sarah Rodriguez</h3>
                  <p className="text-white/70 mb-4">
                    Senior Developer Advocate at QikCard with expertise in API design and developer experience.
                    Passionate about making complex technologies accessible to developers worldwide.
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      aria-label="Follow Sarah Rodriguez on Twitter"
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      aria-label="Connect with Sarah Rodriguez on LinkedIn"
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
            <Link href="/blog/future-of-event-engagement-web3">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src="/placeholder.svg?height=200&width=400&text=Web3+Events"
                    alt="The Future of Event Engagement: Web3 Meets Physical Experiences"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                    Industry Insights
                  </Badge>
                  <h3 className="text-white text-lg mb-2">
                    The Future of Event Engagement: Web3 Meets Physical Experiences
                  </h3>
                  <p className="text-white/70 text-sm">
                    Explore how blockchain technology is revolutionizing the events industry.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src="/placeholder.svg?height=200&width=400&text=API+Security"
                  alt="API Security Best Practices for Event Platforms"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <Badge className="mb-3 bg-red-500/20 text-red-300 border-red-400/30 text-xs">Security</Badge>
                <h3 className="text-white text-lg mb-2">API Security Best Practices for Event Platforms</h3>
                <p className="text-white/70 text-sm">
                  Learn how to secure your QikCard integration and protect user data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
