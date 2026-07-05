"use client"

import { useReducedMotion } from "framer-motion"
import { useLenis } from "lenis/react"
import { useTranslations } from "next-intl"

import { Container } from "@/components/ui/container"

export function SiteFooter() {
  const t = useTranslations("footer")
  const year = new Date().getFullYear()
  const lenis = useLenis()
  const shouldReduceMotion = useReducedMotion()

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: shouldReduceMotion ? 0 : 1.2 })
      return
    }

    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    })
  }

  return (
    <footer className="relative z-[100] bg-brand-dark py-[clamp(3rem,5vw,3.75rem)] pb-[clamp(3.25rem,5vw,4rem)] text-brand-on-dark before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_42%,rgba(255,255,255,0.14)_50%,rgba(255,255,255,0.1)_58%,transparent_100%)]">
      <Container className="flex flex-col items-start justify-between gap-9 sm:flex-row sm:items-end sm:gap-10">
        <div className="flex min-w-0 flex-col">
          <p className="mb-3.5 font-mono text-[0.625rem] font-medium tracking-[0.14em] text-brand-on-dark/28 uppercase">
            {t("tagline")}
          </p>
          <p className="mb-2.5 text-sm leading-snug font-medium tracking-[-0.01em] text-brand-on-dark/88">
            &copy; {year} {t("copyright")}
          </p>
          <p className="max-w-[34ch] text-[0.8125rem] leading-[1.55] tracking-[-0.005em] text-brand-on-dark/38">
            {t("statement")}
          </p>
        </div>

        <button
          type="button"
          className="group inline-flex shrink-0 items-center gap-[0.45rem] font-mono text-[0.6875rem] font-medium tracking-[0.06em] text-brand-on-dark/38 uppercase transition-colors duration-300 hover:text-nav-dock-cta-bg focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-white/35 focus-visible:outline-offset-4"
          onClick={scrollToTop}
          aria-label={t("backToTop")}
        >
          <span className="transition-colors duration-300 group-hover:text-nav-dock-cta-bg">
            {t("backToTop")}
          </span>
          <span
            className="transition-transform duration-300 group-hover:-translate-y-[3px]"
            aria-hidden="true"
          >
            ↑
          </span>
        </button>
      </Container>
    </footer>
  )
}
