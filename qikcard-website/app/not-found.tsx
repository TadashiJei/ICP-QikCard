"use client"

import Link from "next/link"
import { Home, Search, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #2d4663 0%, #1a2b42 50%, #0a1628 100%)",
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
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
              <Home className="w-4 h-4 inline mr-2" />
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
          <CardContent className="p-12">
            {/* 404 Animation */}
            <div className="mb-8">
              <div
                className="text-8xl font-bold text-white/20 mb-4"
                style={{
                  background: "linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #3B82F6 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              >
                404
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <h1 className="text-3xl font-light text-white mb-4">Page Not Found</h1>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Oops! The page you're looking for seems to have wandered off into the Web3 metaverse. Let's get you back
              on track.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild className="bg-blue-500 hover:bg-blue-600">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Link href="/docs">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Docs
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="border-t border-white/10 pt-8">
              <p className="text-white/60 text-sm mb-4">Looking for something specific?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link href="/product">Product</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link href="/features">Features</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link href="/events">Events</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link href="/qikprofile">QikProfile</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link href="/docs">Documentation</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                  <Link href="/support">Support</Link>
                </Button>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <HelpCircle className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-white/70 text-sm">
                Still can't find what you're looking for?{" "}
                <Link href="/support" className="text-blue-400 hover:text-blue-300 underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
