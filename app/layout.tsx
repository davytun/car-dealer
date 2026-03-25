import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Metadata, Viewport } from "next"
import { Footer } from "@/components/footer"

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://car-dealer-ten-rosy.vercel.app/"),
  title: {
    default: "Ignite Luxury | Curated Premium Automobiles",
    template: "%s | Ignite Luxury",
  },
  description:
    "Experience the pinnacle of automotive excellence. Browse our curated archive of luxury and performance vehicles from the world's most prestigious manufacturers.",
  keywords: [
    "luxury cars",
    "performance vehicles",
    "supercars",
    "premium inventory",
    "ignite luxury",
    "exotic cars",
    "automotive archive",
  ],
  authors: [{ name: "Ignite Luxury Team" }],
  creator: "Ignite Luxury",
  publisher: "Ignite Luxury",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://car-dealer-ten-rosy.vercel.app/",
    title: "Ignite Luxury | Curated Premium Automobiles",
    description:
      "Experience the pinnacle of automotive excellence. Browse our curated archive of luxury and performance vehicles.",
    siteName: "Ignite Luxury",
    images: [
      {
        url: "/images/luxury/merc_amg_one.png",
        width: 1200,
        height: 630,
        alt: "Ignite Luxury Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignite Luxury | Curated Premium Automobiles",
    description: "Experience the pinnacle of automotive excellence.",
    images: ["/images/luxury/merc_amg_one.png"],
    creator: "@igniteluxury",
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://car-dealer-ten-rosy.vercel.app/",
  },
}

const monument = localFont({
  src: [
    {
      path: "../public/font/MonumentGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/MonumentGrotesk-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/MonumentGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/MonumentGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
})

const monumentMono = localFont({
  src: [
    {
      path: "../public/font/MonumentGrotesk-Mono.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark antialiased",
        monument.variable,
        monumentMono.variable,
        "font-sans"
      )}
    >
      <body>
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <Header />
            <main className="min-h-screen pt-20">{children}</main>
            <Footer />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}
