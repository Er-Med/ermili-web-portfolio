import type { Metadata } from "next"
import Script from "next/script"
import { Inter_Tight, JetBrains_Mono } from "next/font/google"
import { Toaster } from "sonner"

import { CursorDot } from "@/components/layout/cursor-dot"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { LogoTransitionProvider } from "@/components/motion/logo-transition"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { ScrollRevealProvider } from "@/components/providers/scroll-reveal"
import { site } from "@/content/site"

import "lenis/dist/lenis.css"
import "./globals.css"
import "@/styles/ermili.css"

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: {
    icon: "/me-logo-origin.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LenisProvider>
          <LogoTransitionProvider>
            <CursorDot />
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <ScrollRevealProvider />
          </LogoTransitionProvider>
        </LenisProvider>
        <Toaster position="bottom-right" richColors closeButton />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          async
        />
      </body>
    </html>
  )
}
