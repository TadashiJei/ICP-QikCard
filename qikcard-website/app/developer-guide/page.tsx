"use client"

import Link from "next/link"
import { ArrowLeft, Code, Rocket, Zap, Shield, Database, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const quickStartSteps = [
  {
    step: "1",
    title: "Get API Keys",
    description: "Sign up for a QikCard developer account and generate your API keys",
    code: "// Available in your dashboard\nconst apiKey = 'qk_test_...';",
  },
  {
    step: "2",
    title: "Install SDK",
    description: "Install the QikCard SDK for your preferred programming language",
    code: "npm install @qikcard/sdk\n# or\npip install qikcard",
  },
  {
    step: "3",
    title: "Initialize Client",
    description: "Create a QikCard client instance with your API key",
    code: "import { QikCard } from '@qikcard/sdk';\n\nconst qikcard = new QikCard({\n  apiKey: 'qk_test_...',\n  environment: 'test'\n});",
  },
  {
    step: "4",
    title: "Create Your First Event",
    description: "Set up an event and start accepting QikCard interactions",
    code: "const event = await qikcard.events.create({\n  name: 'My First Event',\n  startDate: '2025-03-15T09:00:00Z',\n  endDate: '2025-03-15T17:00:00Z'\n});",
  },
]

const integrationGuides = [
  {
    icon: Rocket,
    title: "Event Management Integration",
    description: "Integrate QikCard with existing event platforms",
    topics: ["Eventbrite integration", "Custom event platforms", "Registration sync", "Attendee management"],
  },
  {
    icon: Database,
    title: "Analytics Integration",
    description: "Connect QikCard data to your analytics pipeline",
    topics: ["Real-time data streaming", "Custom dashboards", "Data warehouse integration", "Reporting APIs"],
  },
  {
    icon: Shield,
    title: "Security Best Practices",
    description: "Implement secure QikCard integrations",
    topics: ["API key management", "Webhook security", "Data encryption", "Compliance requirements"],
  },
  {
    icon: Settings,
    title: "Hardware Setup",
    description: "Deploy and configure QikPoint scanners",
    topics: ["Scanner installation", "Network configuration", "Firmware updates", "Troubleshooting"],
  },
]

const codeExamples = {
  "event-creation": `// Create a comprehensive event
const event = await qikcard.events.create({
  name: 'Web3 Developer Conference 2025',
  description: 'The premier Web3 development conference',
  startDate: '2025-03-15T09:00:00Z',
  endDate: '2025-03-17T18:00:00Z',
  location: {
    name: 'San Francisco Convention Center',
    address: '747 Howard St, San Francisco, CA 94103',
    coordinates: {
      lat: 37.7849,
      lng: -122.4094
    }
  },
  settings: {
    requireRegistration: true,
    enableNFTRewards: true,
    maxParticipants: 2500,
    checkInRequired: true
  },
  branding: {
    primaryColor: '#3B82F6',
    logo: 'https://example.com/logo.png'
  }
});

console.log('Event created:', event.id);`,

  "scanner-setup": `// Register and configure QikPoint scanners
const scanner = await qikcard.scanners.create({
  eventId: event.id,
  name: 'Main Entrance Scanner',
  type: 'BoothTag',
  location: {
    name: 'Main Entrance',
    coordinates: { lat: 37.7849, lng: -122.4094 }
  },
  settings: {
    autoApprove: true,
    soundEnabled: true,
    ledEnabled: true,
    offlineMode: false
  }
});

// Configure scanner behavior
await qikcard.scanners.configure(scanner.id, {
  interactions: {
    'booth_checkin': {
      reward: { type: 'nft', collection: 'event_badges' },
      cooldown: 300 // 5 minutes
    },
    'session_entry': {
      reward: { type: 'points', amount: 10 },
      cooldown: 0
    }
  }
});`,

  webhooks: `// Set up webhooks for real-time events
const webhook = await qikcard.webhooks.create({
  url: 'https://your-app.com/webhooks/qikcard',
  events: [
    'interaction.created',
    'nft.minted',
    'user.registered'
  ],
  secret: 'your-webhook-secret'
});

// Handle webhook events in your application
app.post('/webhooks/qikcard', (req, res) => {
  const signature = req.headers['qikcard-signature'];
  const payload = req.body;
  
  // Verify webhook signature
  if (!qikcard.webhooks.verify(payload, signature, webhook.secret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the event
  switch (payload.type) {
    case 'interaction.created':
      console.log('New interaction:', payload.data);
      // Update your database, send notifications, etc.
      break;
    case 'nft.minted':
      console.log('NFT minted:', payload.data);
      // Notify user, update inventory, etc.
      break;
    case 'user.registered':
      console.log('User registered:', payload.data);
      // Send welcome email, update CRM, etc.
      break;
  }
  
  res.status(200).send('OK');
});`,

  analytics: `// Fetch comprehensive event analytics
const analytics = await qikcard.analytics.getEventData(event.id, {
  startDate: '2025-03-15T00:00:00Z',
  endDate: '2025-03-17T23:59:59Z',
  metrics: [
    'total_interactions',
    'unique_participants',
    'nfts_minted',
    'engagement_rate',
    'popular_locations'
  ]
});

console.log('Event Analytics:', analytics);

// Real-time analytics stream
const stream = qikcard.analytics.stream(event.id);
stream.on('interaction', (data) => {
  console.log('Real-time interaction:', data);
  // Update live dashboard
});

stream.on('milestone', (data) => {
  console.log('Milestone reached:', data);
  // Trigger special rewards or notifications
});`,
}

export default function DeveloperGuidePage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-400/30">Developer Guide</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">Build with QikCard</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Comprehensive guide to integrating QikCard into your applications. From quick start to advanced
            implementations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Start Building
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Quick Start Guide</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {quickStartSteps.map((step, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">{step.title}</CardTitle>
                      <CardDescription className="text-white/70">{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm text-green-400 bg-slate-900/50 p-4 rounded overflow-x-auto">
                    <code>{step.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Guides */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Integration Guides</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {integrationGuides.map((guide, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <guide.icon className="h-10 w-10 text-blue-400 mb-4" />
                  <CardTitle className="text-white text-xl">{guide.title}</CardTitle>
                  <CardDescription className="text-white/70">{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {guide.topics.map((topic, idx) => (
                      <li key={idx} className="text-white/80 text-sm flex items-center">
                        <span className="text-blue-400 mr-2">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">View Guide</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Code Examples</h2>

          <Tabs defaultValue="event-creation" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border border-white/20">
              <TabsTrigger value="event-creation" className="data-[state=active]:bg-blue-500">
                Events
              </TabsTrigger>
              <TabsTrigger value="scanner-setup" className="data-[state=active]:bg-blue-500">
                Scanners
              </TabsTrigger>
              <TabsTrigger value="webhooks" className="data-[state=active]:bg-blue-500">
                Webhooks
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-500">
                Analytics
              </TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([key, code]) => (
              <TabsContent key={key} value={key}>
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

      {/* Best Practices */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-light text-white mb-12 text-center">Best Practices</h2>

          <div className="space-y-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Shield className="w-6 h-6 mr-3" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Store API keys securely using environment variables
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Always verify webhook signatures to prevent tampering
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Use HTTPS for all API communications
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Implement proper error handling and logging
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Zap className="w-6 h-6 mr-3" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Implement caching for frequently accessed data
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Use batch operations when processing multiple items
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Monitor API rate limits and implement backoff strategies
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Optimize database queries and use pagination
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Code className="w-6 h-6 mr-3" />
                  Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Use test environment for development and testing
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Implement comprehensive error handling
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Write unit tests for your integration code
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    Keep your SDK and dependencies up to date
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Need Developer Support?</h3>
              <p className="text-white/80 mb-6">
                Join our developer community and get help from our team and other developers building with QikCard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Join Discord</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
