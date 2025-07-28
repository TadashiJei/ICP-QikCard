import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://qikcard.com"),
  title: {
    default: "QikCard - Web3 Event Pass, Digital Identity & ICP Hardwallet | Connect, Share, Grow",
    template: "%s | QikCard - Web3 Event Platform",
  },
  description:
    "Transform events with QikCard's Web3 technology. Tap into real-world events, showcase your Web3 identity, and secure your assets with our ICP-powered hardwallet. Earn digital collectibles, build your crypto portfolio, and network in the QikCommunity.",
  keywords: [
    "Web3 events",
    "blockchain events",
    "NFT rewards",
    "digital identity",
    "ICP hardwallet",
    "Internet Computer",
    "crypto wallet",
    "event management",
    "NFC technology",
    "digital collectibles",
    "Web3 networking",
    "blockchain technology",
    "event engagement",
    "QikCard",
    "decentralized events",
    "smart contracts",
    "event analytics",
    "crypto portfolio",
    "Web3 community",
    "digital credentials",
  ],
  authors: [{ name: "QikCard Team" }],
  creator: "QikCard",
  publisher: "QikCard",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qikcard.com",
    siteName: "QikCard",
    title: "QikCard - Your All-in-One Web3 Event Pass, Digital Identity & ICP Hardwallet",
    description:
      "Tap into real-world events, showcase your Web3 identity, and secure your assets — all with a single ICP-powered card that connects community, credentials, and collectibles.",
    images: [
      {
        url: "/MetaSEO-Image.png",
        width: 1200,
        height: 630,
        alt: "QikCard - Web3 Event Pass, Digital Identity & ICP Hardwallet",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@QikCard",
    creator: "@QikCard",
    title: "QikCard - Web3 Event Pass, Digital Identity & ICP Hardwallet",
    description:
      "Transform events with Web3 technology. Earn digital collectibles, build your crypto portfolio, and network in the QikCommunity.",
    images: ["/MetaSEO-Image.png"],
  },
  facebook: {
    appId: "1234567890", // Replace with actual Facebook App ID
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual verification code
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://qikcard.com",
    languages: {
      "en-US": "https://qikcard.com",
    },
  },
  category: "technology",
  classification: "Web3 Event Platform",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#3B82F6",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "QikCard",
  },
  other: {
    "msapplication-TileColor": "#3B82F6",
    "theme-color": "#3B82F6",
    "application-name": "QikCard",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
    // Discord/Telegram specific
    "discord:card": "summary_large_image",
    "telegram:card": "summary_large_image",
    // Reddit specific
    "reddit:card": "summary_large_image",
    // GitHub specific
    "github:card": "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "QikCard",
              description: "Web3 Event Platform with Digital Identity and ICP Hardwallet",
              url: "https://qikcard.com",
              logo: "https://qikcard.com/MetaSEO-Image.png",
              sameAs: [
                "https://twitter.com/QikCard",
                "https://discord.gg/qikcard",
                "https://t.me/qikcard",
                "https://github.com/qikcard",
                "https://reddit.com/r/qikcard",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+63-991-009-7448",
                contactType: "customer service",
                email: "support@qikcard.com",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "PH",
                addressRegion: "NCR",
              },
              foundingDate: "2024",
              industry: "Web3 Technology",
              numberOfEmployees: "10-50",
              keywords: "Web3, Blockchain, Events, Digital Identity, ICP, Hardwallet, NFT, Crypto",
            }),
          }}
        />

        {/* Additional Meta Tags for Social Platforms */}
        <meta name="application-name" content="QikCard" />
        <meta name="apple-mobile-web-app-title" content="QikCard" />
        <meta name="msapplication-tooltip" content="QikCard - Web3 Event Platform" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-navbutton-color" content="#3B82F6" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//api.qikcard.com" />
        <link rel="dns-prefetch" href="//cdn.qikcard.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}

        {/* Analytics and tracking scripts would go here */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics or other tracking
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </body>
    </html>
  )
}
