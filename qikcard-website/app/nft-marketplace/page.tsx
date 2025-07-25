"use client"

import Link from "next/link"
import { ArrowLeft, Search, Filter, Star, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const featuredNFTs = [
  {
    id: 1,
    name: "WCHL 2025 Winner Badge",
    collection: "QikCard Achievements",
    price: "0.5 ICP",
    image: "/placeholder.svg?height=300&width=300&text=WCHL+Winner+Badge",
    rarity: "Legendary",
    views: 1234,
    likes: 89,
    creator: "QikCard Team",
  },
  {
    id: 2,
    name: "Web3 Conference Attendee",
    collection: "Event Badges",
    price: "0.1 ICP",
    image: "/placeholder.svg?height=300&width=300&text=Conference+Badge",
    rarity: "Common",
    views: 567,
    likes: 45,
    creator: "DevCon Global",
  },
  {
    id: 3,
    name: "Crypto Summit VIP Pass",
    collection: "Exclusive Access",
    price: "2.0 ICP",
    image: "/placeholder.svg?height=300&width=300&text=VIP+Pass",
    rarity: "Rare",
    views: 890,
    likes: 67,
    creator: "Blockchain Events",
  },
  {
    id: 4,
    name: "Startup Pitch Winner",
    collection: "Competition Rewards",
    price: "1.5 ICP",
    image: "/placeholder.svg?height=300&width=300&text=Pitch+Winner",
    rarity: "Epic",
    views: 445,
    likes: 78,
    creator: "Innovation Hub",
  },
  {
    id: 5,
    name: "Networking Champion",
    collection: "Social Achievements",
    price: "0.3 ICP",
    image: "/placeholder.svg?height=300&width=300&text=Networking+Champion",
    rarity: "Uncommon",
    views: 678,
    likes: 34,
    creator: "QikCard Community",
  },
  {
    id: 6,
    name: "Early Adopter",
    collection: "Historical",
    price: "5.0 ICP",
    image: "/placeholder.svg?height=300&width=300&text=Early+Adopter",
    rarity: "Legendary",
    views: 2345,
    likes: 156,
    creator: "QikCard Genesis",
  },
]

const collections = [
  { name: "QikCard Achievements", items: 45, floor: "0.1 ICP", volume: "234 ICP" },
  { name: "Event Badges", items: 128, floor: "0.05 ICP", volume: "89 ICP" },
  { name: "Exclusive Access", items: 23, floor: "1.0 ICP", volume: "156 ICP" },
  { name: "Competition Rewards", items: 67, floor: "0.5 ICP", volume: "78 ICP" },
]

const rarityColors = {
  Common: "bg-gray-500/20 text-gray-300 border-gray-400/30",
  Uncommon: "bg-green-500/20 text-green-300 border-green-400/30",
  Rare: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  Epic: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  Legendary: "bg-orange-500/20 text-orange-300 border-orange-400/30",
}

export default function NFTMarketplacePage() {
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
            <Button className="bg-blue-500 hover:bg-blue-600">Connect Wallet</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 lg:px-8">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-400/30">NFT Marketplace</Badge>
          <h1 className="text-4xl lg:text-6xl font-light text-white mb-6">QikCard NFT Marketplace</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Discover, collect, and trade unique NFTs earned from events. Build your digital collection and showcase your
            achievements.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <Input
              placeholder="Search NFTs, collections, or creators..."
              className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-8 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-white mb-8">Featured Collections</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {collections.map((collection, index) => (
              <Card
                key={index}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{collection.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Items:</span>
                      <span className="text-white">{collection.items}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Floor:</span>
                      <span className="text-white">{collection.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Volume:</span>
                      <span className="text-white">{collection.volume}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured NFTs */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-light text-white mb-8">Featured NFTs</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNFTs.map((nft) => (
              <Card
                key={nft.id}
                className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={rarityColors[nft.rarity as keyof typeof rarityColors]}>{nft.rarity}</Badge>
                    <div className="flex items-center space-x-3 text-white/60 text-sm">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {nft.views}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {nft.likes}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-lg mb-1">{nft.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{nft.collection}</p>
                  <p className="text-white/50 text-xs mb-4">by {nft.creator}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-xs">Price</p>
                      <p className="text-white font-bold text-lg">{nft.price}</p>
                    </div>
                    <Button className="bg-blue-500 hover:bg-blue-600">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Stats */}
      <section className="py-16 px-4 lg:px-8 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-light text-white mb-8 text-center">Marketplace Statistics</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-white mb-2">12,456</div>
                <div className="text-white/70 text-sm">Total NFTs</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-white mb-2">3,789</div>
                <div className="text-white/70 text-sm">Active Traders</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-white mb-2">1,234 ICP</div>
                <div className="text-white/70 text-sm">Total Volume</div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-white mb-2">0.15 ICP</div>
                <div className="text-white/70 text-sm">Average Price</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-light text-white mb-12 text-center">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-white font-semibold mb-2">Earn NFTs</h3>
                <p className="text-white/70 text-sm">
                  Participate in events and complete activities to earn unique NFT rewards automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-white font-semibold mb-2">Trade & Collect</h3>
                <p className="text-white/70 text-sm">
                  Buy, sell, and trade NFTs with other community members in our secure marketplace.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-white font-semibold mb-2">Showcase</h3>
                <p className="text-white/70 text-sm">
                  Display your collection on your QikProfile and show off your achievements to the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-white font-semibold text-xl mb-4">Start Your NFT Collection</h3>
              <p className="text-white/80 mb-6">
                Connect your wallet and start trading unique event NFTs in the QikCard marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600">Connect Wallet</Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                  Browse Collections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
