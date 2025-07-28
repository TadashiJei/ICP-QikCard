import type { Metadata } from "next"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = {
  title: "QikCard Blog - Web3 Events, Blockchain Technology & Developer Insights",
  description:
    "Stay updated with the latest trends in Web3 events, technical tutorials, case studies, and success stories from the QikCard community. Learn about blockchain technology, NFT rewards, and digital identity.",
  keywords: [
    "Web3 blog",
    "blockchain events blog",
    "NFT tutorials",
    "digital identity insights",
    "ICP development",
    "Web3 case studies",
    "event technology blog",
    "crypto wallet guides",
    "developer tutorials",
    "blockchain security",
    "Web3 best practices",
    "event analytics",
    "QikCard insights",
  ],
  openGraph: {
    title: "QikCard Blog - Web3 Events & Blockchain Technology Insights",
    description:
      "Discover the latest in Web3 event technology, developer tutorials, and industry insights from QikCard experts.",
    images: ["/MetaSEO-Image.png"],
    url: "https://qikcard.com/blog",
  },
  twitter: {
    title: "QikCard Blog - Web3 Events & Developer Insights",
    description: "Latest Web3 event technology insights, tutorials, and case studies from QikCard.",
    images: ["/MetaSEO-Image.png"],
  },
}

export default function BlogPage() {
  return <BlogClientPage />
}
