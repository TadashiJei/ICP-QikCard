export const metadata = {
  title: "Building Your First QikCard Integration: A Step-by-Step Guide | QikCard Developer Tutorial",
  description:
    "Learn how to integrate QikCard into your event platform with our comprehensive developer tutorial. Complete with code examples, API documentation, and best practices for Web3 event development.",
  keywords: [
    "QikCard API",
    "Web3 integration",
    "event platform development",
    "blockchain API tutorial",
    "NFC integration",
    "developer guide",
    "API documentation",
    "Web3 development",
    "event management API",
    "QikCard SDK",
    "blockchain development",
    "smart contract integration",
  ],
  authors: [{ name: "Sarah Rodriguez", url: "https://qikcard.com/team/sarah-rodriguez" }],
  openGraph: {
    title: "Building Your First QikCard Integration: Developer Tutorial",
    description:
      "Complete step-by-step guide to integrating QikCard into your event platform with code examples and best practices.",
    images: [
      {
        url: "/MetaSEO-Image.png",
        width: 1200,
        height: 630,
        alt: "QikCard API Integration Tutorial",
      },
    ],
    url: "https://qikcard.com/blog/building-first-qikcard-integration",
    type: "article",
    publishedTime: "2025-01-12T00:00:00.000Z",
    authors: ["Sarah Rodriguez"],
    tags: ["API", "Integration", "Tutorial"],
  },
  twitter: {
    title: "Building Your First QikCard Integration: Developer Tutorial",
    description: "Step-by-step guide to integrating QikCard API with code examples and best practices.",
    images: ["/MetaSEO-Image.png"],
    creator: "@QikCard",
  },
  alternates: {
    canonical: "https://qikcard.com/blog/building-first-qikcard-integration",
  },
}

import BlogPostClient from "./client"

export default function BlogPost() {
  return (
    <>
      {/* JSON-LD Structured Data for Tutorial Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["BlogPosting", "TechArticle"],
            headline: "Building Your First QikCard Integration: A Step-by-Step Guide",
            description:
              "Learn how to integrate QikCard into your event platform with our comprehensive developer tutorial and code examples.",
            image: "https://qikcard.com/MetaSEO-Image.png",
            author: {
              "@type": "Person",
              name: "Sarah Rodriguez",
              jobTitle: "Senior Developer Advocate",
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
                url: "https://qikcard.com/MetaSEO-Image.png",
              },
            },
            datePublished: "2025-01-12T00:00:00.000Z",
            dateModified: "2025-01-12T00:00:00.000Z",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://qikcard.com/blog/building-first-qikcard-integration",
            },
            keywords: "QikCard API, Web3 integration, Developer tutorial, Blockchain development",
            articleSection: "Developer Tutorial",
            wordCount: 2500,
            timeRequired: "PT12M",
            inLanguage: "en-US",
            programmingLanguage: "JavaScript",
            codeRepository: "https://github.com/qikcard/integration-examples",
          }),
        }}
      />
      <BlogPostClient />
    </>
  )
}
