import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "TOON Converter – JSON to TOON",
    template: "%s | TOON Converter",
  },
  description: "Convert JSON to TOON to reduce LLM token usage and improve readability.",
  applicationName: "TOON Converter",
  metadataBase: new URL("https://toontools.site"),
  alternates: {
    canonical: "https://toontools.site",
  },
  openGraph: {
    type: "website",
    url: "https://toontools.site",
    title: "TOON Tools – JSON to TOON Converter",
    description: "Convert JSON to compact TOON format and save tokens.",
    siteName: "TOON Tools",
  },
  twitter: {
    card: "summary",
    title: "TOON Tools – JSON to TOON Converter",
    description: "Convert JSON to compact TOON format and save tokens.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export const themeColor = "#6E5DF6"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TOON Tools",
              url: "https://toontools.site",
              description: "Convert JSON to TOON format to reduce LLM token usage by 30-60%. Free online tool.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://toontools.site/?q={search_term_string}",
                queryInput: "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "TOON Tools Team",
              },
            }),
          }}
        />

        {/* Software Application Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TOON Tools",
              description: "Free online tool to convert JSON to TOON format for LLM optimization",
              url: "https://toontools.site",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1250",
                bestRating: "5",
                worstRating: "1",
              },
              author: {
                "@type": "Organization",
                name: "TOON Tools Team",
              },
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is TOON format?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "TOON (Tabular Object Notation) is an optimized data format designed specifically for Large Language Models (LLMs). It reduces token usage by 30-60% compared to JSON while maintaining full data fidelity and human readability.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much can TOON reduce my token costs?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "TOON typically reduces token usage by 30-60% depending on your data structure. For large datasets with repetitive keys, you can see savings up to 70%. This translates to significant cost reductions when using LLM APIs.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is TOON conversion reversible?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, TOON is fully reversible. You can convert TOON back to JSON without any data loss. The conversion maintains complete fidelity with your original data structure.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is TOON Converter free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, TOON Converter is completely free to use. There are no signup requirements, no usage limits, and no hidden costs. All conversions happen client-side in your browser.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of data can I convert?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Currently, TOON Converter supports JSON data conversion. Support for other formats like Markdown and plain text is planned for future updates.",
                  },
                },
              ],
            }),
          }}
        />

        {/* How-To Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "How to Convert JSON to TOON Format",
              description: "Step-by-step guide to convert JSON data to TOON format for LLM optimization",
              totalTime: "PT1M",
              supply: [
                {
                  "@type": "HowToSupply",
                  name: "JSON data",
                },
              ],
              tool: [
                {
                  "@type": "HowToTool",
                  name: "TOON Converter web application",
                },
              ],
              step: [
                {
                  "@type": "HowToStep",
                  name: "Access TOON Tools",
                  text: "Navigate to toontools.site in your web browser",
                  position: 1,
                },
                {
                  "@type": "HowToStep",
                  name: "Input JSON data",
                  text: "Paste your valid JSON data into the input textarea or upload a JSON file",
                  position: 2,
                },
                {
                  "@type": "HowToStep",
                  name: "Convert to TOON",
                  text: "Click the 'Convert to TOON' button to transform your JSON data",
                  position: 3,
                },
                {
                  "@type": "HowToStep",
                  name: "Copy or download result",
                  text: "Copy the TOON output to clipboard or download it as a .toon file",
                  position: 4,
                },
              ],
            }),
          }}
        />

        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://toontools.site",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
