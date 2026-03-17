import localFont from "next/font/local";

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { SmoothScroll } from "@/components/smooth-scroll";

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
});

const monumentMono = localFont({
  src: [
    {
      path: "../public/font/MonumentGrotesk-Mono.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased dark", monument.variable, monumentMono.variable, "font-sans")}
    >
      <body>
        <SmoothScroll>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <Header />
            <main className="min-h-screen pt-20">
              {children}
            </main>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}
