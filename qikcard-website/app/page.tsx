"use client"

import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import FeaturesSection from "@/components/features-section"
import StatsSection from "@/components/stats-section"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* JSON-LD Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "QikCard",
            description: "Web3 Event Platform with Digital Identity and ICP Hardwallet",
            url: "https://qikcard.com",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://qikcard.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "QikCard Platform",
              applicationCategory: "Web3 Event Management",
              operatingSystem: "Web, iOS, Android",
              offers: {
                "@type": "Offer",
                price: "99",
                priceCurrency: "USD",
                priceValidUntil: "2025-12-31",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
                bestRating: "5",
                worstRating: "1",
              },
            },
          }),
        }}
      />

      <div className="min-h-screen relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 -z-10">
          {/* Main radial gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, #2d4663 0%, #1a2b42 50%, #0a1628 100%)",
            }}
          />

          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3Cfilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>

        {/* Enhanced Space Animation Video Background */}
        <div className="fixed inset-0 -z-5">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-70"
            style={{
              filter: "brightness(0.8) contrast(1.2) saturate(1.1)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Space-BjlPAfapX976c44BSkWOSKcQOf4YJZ.mp4" type="video/mp4" />
          </video>

          {/* Dynamic overlay that pulses with the animation */}
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(45, 70, 99, 0.2) 0%, rgba(26, 43, 66, 0.4) 50%, rgba(10, 22, 40, 0.6) 100%)",
              animationDuration: "4s",
            }}
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-white font-semibold text-xl" aria-label="QikCard Home">
              QikCard
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/product" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Product
              </Link>
              <Link href="/features" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Features
              </Link>
              <Link href="/events" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Events
              </Link>
              <Link href="/qikprofile" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                QikProfile
              </Link>
              <Link href="/docs" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Docs
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="text-white/90 hover:text-white text-sm font-medium transition-colors">
                Login
              </Link>
              <Button
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
                size="sm"
                asChild
              >
                <Link href="/pricing">
                  Get Your QikCard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
              <div className="flex flex-col space-y-4">
                <Link href="/product" className="text-white/90 hover:text-white text-sm font-medium">
                  Product
                </Link>
                <Link href="/features" className="text-white/90 hover:text-white text-sm font-medium">
                  Features
                </Link>
                <Link href="/events" className="text-white/90 hover:text-white text-sm font-medium">
                  Events
                </Link>
                <Link href="/qikprofile" className="text-white/90 hover:text-white text-sm font-medium">
                  QikProfile
                </Link>
                <Link href="/docs" className="text-white/90 hover:text-white text-sm font-medium">
                  Docs
                </Link>
                <hr className="border-white/20" />
                <Link href="/dashboard" className="text-white/90 hover:text-white text-sm font-medium">
                  Login
                </Link>
                <Button
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm w-full justify-center"
                  size="sm"
                  asChild
                >
                  <Link href="/pricing">
                    Get Your QikCard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <main className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              {/* Hero Content - Left Aligned */}
              <div className="max-w-2xl lg:max-w-3xl">
                {/* Main Headline with enhanced styling */}
                <h1
                  className="text-white font-light leading-tight tracking-tight mb-6 relative"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                    background: "linear-gradient(90deg, #ffffff 0%, #e2e8f0 50%, #ffffff 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                >
                  Your All-in-One Web3 Event Pass, Digital Identity & ICP Hardwallet
                </h1>

                {/* Supporting Text */}
                <p
                  className="text-white/80 mb-8 max-w-xl"
                  style={{
                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                    lineHeight: "1.5",
                  }}
                >
                  QikCard brings the traditional 'stamp rally' to the Web3 era. Tap your QikCard on QikPoint devices to
                  earn digital collectibles, track achievements, and use your secure ICP-powered hardwallet—all while
                  building your digital identity in the QikCommunity.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-500/90 hover:bg-blue-500 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 px-8 py-3 text-base font-medium"
                    asChild
                  >
                    <Link href="/pricing">
                      Get Your QikCard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 px-8 py-3 text-base font-medium"
                    asChild
                  >
                    <Link href="/events">Watch Demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <FeaturesSection />

        {/* Stats Section */}
        <StatsSection />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Subtle glow effects */}
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

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
