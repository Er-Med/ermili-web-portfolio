import type { Metadata } from "next"
import Script from "next/script"
import { Inter_Tight, JetBrains_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Toaster } from "sonner"

import { CursorDot } from "@/components/layout/cursor-dot"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { LogoTransitionProvider } from "@/components/motion/logo-transition"
import { LenisProvider } from "@/components/providers/lenis-provider"
import { routing } from "@/i18n/routing"
import type { Locale } from "@/i18n/routing"

import "lenis/dist/lenis.css"
import "../globals.css"
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

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const baseUrl = "https://ermili.dev"
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`
  const title = t("defaultTitle")
  const description = t("description")

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s — Ermili Web",
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: baseUrl,
        fr: `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Ermili Web",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = (await import(`../../messages/${locale}.json`)).default

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>
            <LogoTransitionProvider>
              <CursorDot />
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
            </LogoTransitionProvider>
          </LenisProvider>
          <Toaster position="bottom-right" richColors closeButton />
        </NextIntlClientProvider>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
          async
        />
      </body>
    </html>
  )
}
