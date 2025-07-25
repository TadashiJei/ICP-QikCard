import type { Metadata } from "next"
import BlogPostClient from "./client"

export const metadata: Metadata = {
  title: "The Future of Event Engagement: Web3 Meets Physical Experiences | QikCard Blog",
  description:
    "Explore how blockchain technology is revolutionizing the events industry and creating new opportunities for meaningful participant engagement. Learn about Web3 event technologies, NFT tickets, and digital identity systems.",
  keywords: [
    "Web3 events",
    "blockchain events",
    "event engagement",
    "NFT tickets",
    "digital identity",
    "smart contracts",
    "decentralized events",
    "event technology",
    "Web3 transformation",
    "blockchain innovation",
    "event industry future",
    "QikCard technology",
  ],
  authors: [{ name: "Alex Chen", url: "https://theqikcard.com/team/alex-chen" }],
  openGraph: {
    title: "The Future of Event Engagement: Web3 Meets Physical Experiences",
    description:
      "Discover how blockchain technology is transforming the events industry with Web3 innovations, NFT rewards, and digital identity systems.",
    images: [
      {
        url: "/MetaSEO-Image.png",
        width: 1200,
        height: 630,
        alt: "Web3 Events Future - QikCard Blog",
      },
    ],
    url: "https://theqikcard.com/blog/future-of-event-engagement-web3",
    type: "article",
    publishedTime: "2025-01-15T00:00:00.000Z",
    authors: ["Alex Chen"],
    tags: ["Web3", "Events", "Blockchain"],
  },
  twitter: {
    title: "The Future of Event Engagement: Web3 Meets Physical Experiences",
    description: "How blockchain technology is revolutionizing the events industry with Web3 innovations.",
    images: ["/MetaSEO-Image.png"],
    creator: "@QikCard",
  },
  alternates: {
    canonical: "https://theqikcard.com/blog/future-of-event-engagement-web3",
  },
}

export default function BlogPost() {
  return (
    <>
      {/* JSON-LD Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "The Future of Event Engagement: Web3 Meets Physical Experiences",
            description:
              "Explore how blockchain technology is revolutionizing the events industry and creating new opportunities for meaningful participant engagement.",
            image: "https://theqikcard.com/MetaSEO-Image.png",
            author: {
              "@type": "Person",
              name: "Alex Chen",
              jobTitle: "Product Manager",
              worksFor: {
                "@type": "Organization",
                name: "QikCard",
              },
            },
            publisher: {
              "@type": "Organization",
              name: "QikCard",
              logo: {
                "@type": "ImageObject",
                url: "https://theqikcard.com/MetaSEO-Image.png",
              },
            },
            datePublished: "2025-01-15T00:00:00.000Z",
            dateModified: "2025-01-15T00:00:00.000Z",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://theqikcard.com/blog/future-of-event-engagement-web3",
            },
            keywords: "Web3, Events, Blockchain, NFT tickets, Digital identity, Event technology",
            articleSection: "Industry Insights",
            wordCount: 1200,
            timeRequired: "PT8M",
            inLanguage: "en-US",
          }),
        }}
      />
      <BlogPostClient />
    </>
  )
}
