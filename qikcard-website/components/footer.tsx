"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Twitter, Github, Linkedin, Mail, MapPin, Phone, ArrowRight, Zap, Shield, Users } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-slate-900/95 backdrop-blur-sm border-t border-white/10">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-50" />

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-white font-bold text-2xl mb-4 block">
                QikCard
              </Link>
              <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                Transforming events with Web3 technology. Your all-in-one event pass, digital identity, and ICP
                hardwallet that brings the traditional stamp rally to the blockchain era.
              </p>

              {/* Key features badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Web3 Events
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                  <Shield className="w-3 h-3 mr-1" />
                  ICP Hardwallet
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                  <Users className="w-3 h-3 mr-1" />
                  Digital Identity
                </Badge>
              </div>

              {/* Newsletter signup */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Stay Updated</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/product" className="text-white/70 hover:text-white transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="text-white/70 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/qikprofile" className="text-white/70 hover:text-white transition-colors">
                    QikProfile
                  </Link>
                </li>
                <li>
                  <Link href="/qikpoint-scanners" className="text-white/70 hover:text-white transition-colors">
                    QikPoint Scanners
                  </Link>
                </li>
                <li>
                  <Link href="/hardware-specs" className="text-white/70 hover:text-white transition-colors">
                    Hardware Specs
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-white/70 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/events" className="text-white/70 hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
                    QikHub Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="text-white/70 hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/nft-marketplace" className="text-white/70 hover:text-white transition-colors">
                    NFT Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-white/70 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-white/70 hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources & Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-white/70 hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api-reference" className="text-white/70 hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/developer-guide" className="text-white/70 hover:text-white transition-colors">
                    Developer Guide
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="text-white/70 hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/70 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white/70 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact info section */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white/50 text-sm">Email</p>
                  <p className="text-white">hello@theqikcard.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white/50 text-sm">Support</p>
                  <p className="text-white">+63 991 009 7448 </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white">{"NCR, Philippines"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-4">
                <p className="text-white/50 text-sm">© 2025 QikCard. All rights reserved.</p>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">WCHL 2025 Nominee </Badge>
              </div>

              {/* Social links */}
              <div className="flex items-center space-x-4">
                <Link href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-white/50 hover:text-white transition-colors" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>

              {/* Legal links */}
              <div className="flex items-center space-x-6 text-sm">
                <Link href="/privacy" className="text-white/50 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/50 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-white/50 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
