"use client"

import Link from "next/link"
import { ArrowLeft, Code, Key, Zap, Database, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const apiEndpoints = [
  {
    method: "POST",
    endpoint: "/api/v1/events",
    description: "Create a new event",
    category: "Events",
  },
  {
    method: "GET",
    endpoint: "/api/v1/events/{id}",
    description: "Get event details",
    category: "Events",
  },
  {
    method: "POST",
    endpoint: "/api/v1/scanners",
    description: "Register a new QikPoint scanner",
    category: "Hardware",
  },
  {
    method: "POST",
    endpoint: "/api/v1/interactions",
    description: "Record a card interaction",
    category: "Interactions",
  },
  {
    method: "GET",
    endpoint: "/api/v1/analytics/{eventId}",
    description: "Get event analytics data",
    category: "Analytics",
  },
  {
    method: "POST",
    endpoint: "/api/v1/nfts/mint",
    description: "Mint NFT rewards",
    category: "NFTs",
  },
]

const codeExamples = {
  javascript: `// Initialize QikCard SDK
import { QikCard } from '@qikcard/sdk';

const qikcard = new QikCard({
  apiKey: 'qk_live_...',
  environment: 'production'
});

// Create an event
const event = await qikcard.events.create({
  name: 'Web3 Developer Conference',
  startDate: '2025-03-15T09:00:00Z',
  endDate: '2025-03-17T18:00:00Z',
  location: {
    name: 'San Francisco Convention Center',
    address: '747 Howard St, San Francisco, CA 94103'
  },
  settings: {
    requireRegistration: true,
    enableNFTRewards: true,
    maxParticipants: 2500
  }
});

console.log('Event created:', event.id);`,

  python: `# QikCard Python SDK
from qikcard import QikCard

# Initialize client
client = QikCard(api_key='qk_live_...', environment='production')

# Create event
event = client.events.create({
    'name': 'Web3 Developer Conference',
    'start_date': '2025-03-15T09:00:00Z',
    'end_date': '2025-03-17T18:00:00Z',
    'location': {
        'name': 'San Francisco Convention Center',
        'address': '747 Howard St, San Francisco, CA 94103'
    },
    'settings': {
        'require_registration': True,
        'enable_nft_rewards': True,
        'max_participants': 2500
    }
})

print(f"Event created: {event.id}")`,

  curl: `# Create an event using cURL
curl -X POST https://api.qikcard.com/v1/events \\
  -H "Authorization: Bearer qk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Web3 Developer Conference",
    "startDate": "2025-03-15T09:00:00Z",
    "endDate": "2025-03-17T18:00:00Z",
    "location": {
      "name": "San Francisco Convention Center",
      "address": "747 Howard St, San Francisco, CA 94103"
    },
    "settings": {
      "requireRegistration": true,
      "enableNFTRewards": true,
      "maxParticipants": 2500
    }
  }'`,
}

export default function APIReferencePage() {
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
            <Link href="/docs" className="text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back to Docs
            </Link>
            <Button className="bg-blue-500 hover:bg-blue-600">Get API Key</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-400/30">API Reference</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">QikCard API Reference</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Complete API documentation for integrating QikCard into your applications. RESTful endpoints, WebSocket
            events, and comprehensive examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View Postman Collection
            </Button>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Globe className="h-10 w-10 text-blue-400 mb-4" />
                <CardTitle className="text-white text-xl">Base URL</CardTitle>
                <CardDescription className="text-white/70">https://api.qikcard.com/v1</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Key className="h-10 w-10 text-purple-400 mb-4" />
                <CardTitle className="text-white text-xl">Authentication</CardTitle>
                <CardDescription className="text-white/70">Bearer token in Authorization header</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-10 w-10 text-green-400 mb-4" />
                <CardTitle className="text-white text-xl">Rate Limits</CardTitle>
                <CardDescription className="text-white/70">1000 requests per minute</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* API Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-light text-white mb-8 text-center">API Endpoints</h2>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge
                          className={`${
                            endpoint.method === "GET"
                              ? "bg-green-500/20 text-green-300 border-green-400/30"
                              : endpoint.method === "POST"
                                ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
                                : "bg-orange-500/20 text-orange-300 border-orange-400/30"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-white font-mono text-sm">{endpoint.endpoint}</code>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="border-white/20 text-white/60">
                          {endpoint.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-white/70 mt-2">{endpoint.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Code Examples</h2>

          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
              <TabsTrigger value="javascript" className="data-[state=active]:bg-blue-500">
                JavaScript
              </TabsTrigger>
              <TabsTrigger value="python" className="data-[state=active]:bg-blue-500">
                Python
              </TabsTrigger>
              <TabsTrigger value="curl" className="data-[state=active]:bg-blue-500">
                cURL
              </TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([language, code]) => (
              <TabsContent key={language} value={language}>
                <Card className="bg-slate-900/80 border-white/20 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <pre className="text-sm text-white/80 overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Authentication</h2>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                API Keys
              </CardTitle>
              <CardDescription className="text-white/70">
                QikCard uses API keys to authenticate requests. Include your API key in the Authorization header.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Test Environment</h4>
                  <code className="text-green-400 text-sm bg-slate-900/50 p-2 rounded block">
                    Authorization: Bearer qk_test_...
                  </code>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Production Environment</h4>
                  <code className="text-blue-400 text-sm bg-slate-900/50 p-2 rounded block">
                    Authorization: Bearer qk_live_...
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl">Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-white/80">
                <p>The API uses conventional HTTP response codes to indicate success or failure:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Success Codes</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <code>200</code> - OK
                      </li>
                      <li>
                        <code>201</code> - Created
                      </li>
                      <li>
                        <code>204</code> - No Content
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-medium mb-2">Error Codes</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <code>400</code> - Bad Request
                      </li>
                      <li>
                        <code>401</code> - Unauthorized
                      </li>
                      <li>
                        <code>404</code> - Not Found
                      </li>
                      <li>
                        <code>429</code> - Rate Limited
                      </li>
                      <li>
                        <code>500</code> - Server Error
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-8 text-center">Official SDKs</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Code className="h-10 w-10 text-yellow-400 mb-4" />
                <CardTitle className="text-white text-xl">JavaScript/TypeScript</CardTitle>
                <CardDescription className="text-white/70">
                  Full-featured SDK for Node.js and browser environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <code className="text-green-400 text-sm bg-slate-900/50 p-2 rounded block">
                    npm install @qikcard/sdk
                  </code>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">View Documentation</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <Database className="h-10 w-10 text-blue-400 mb-4" />
                <CardTitle className="text-white text-xl">Python</CardTitle>
                <CardDescription className="text-white/70">
                  Pythonic SDK for backend integrations and data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <code className="text-green-400 text-sm bg-slate-900/50 p-2 rounded block">pip install qikcard</code>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">View Documentation</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Need Help with the API?</h3>
              <p className="text-white/80 mb-6">
                Our developer support team is here to help you integrate QikCard successfully.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Contact Support</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Join Discord
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
