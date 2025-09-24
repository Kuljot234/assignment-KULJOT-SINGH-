import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "WorkerHub - Find Skilled Workers for Your Projects",
    template: "%s | WorkerHub",
  },
  description:
    "Connect with skilled professionals across various trades. From home repairs to specialized services, find the right worker for your project.",
  keywords: ["workers", "skilled professionals", "home repair", "contractors", "services"],
  authors: [{ name: "WorkerHub Team" }],
  creator: "WorkerHub",
  publisher: "WorkerHub",
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
    url: "https://workerhub.com",
    title: "WorkerHub - Find Skilled Workers for Your Projects",
    description:
      "Connect with skilled professionals across various trades. From home repairs to specialized services, find the right worker for your project.",
    siteName: "WorkerHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkerHub - Find Skilled Workers for Your Projects",
    description: "Connect with skilled professionals across various trades.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
