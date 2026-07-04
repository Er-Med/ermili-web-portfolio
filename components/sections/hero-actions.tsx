"use client"

import { BrandCta } from "@/components/ui/brand-cta"

export function HeroActions() {
  return (
    <>
      <BrandCta href="/#book" variant="primary" magnetic>
        Book a Strategy Call
      </BrandCta>
      <BrandCta href="/projects" variant="secondary" arrow>
        View Work
      </BrandCta>
    </>
  )
}
