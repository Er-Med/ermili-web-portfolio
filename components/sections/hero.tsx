"use client"

import Image from "next/image"

import { Reveal } from "@/components/motion/reveal"
import { StatusPulse } from "@/components/motion/status-pulse"
import { Container } from "@/components/ui/container"

type HeroProps = {
  actions?: React.ReactNode
}

export function Hero({ actions }: HeroProps) {
  return (
    <section
      className="flex min-h-screen w-full bg-brand-bg pt-[var(--header-h)]"
      id="about"
    >
      <Container className="flex min-h-[calc(100vh-var(--header-h))] w-full flex-1 flex-col items-center justify-center py-[clamp(3rem,8vh,5.5rem)]">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="mb-[clamp(1.5rem,4vh,2rem)] flex w-full flex-wrap items-center justify-center gap-5">
            <figure className="m-0 shrink-0">
              <Image
                src="/me-logo-origin.png"
                alt="ermili.dev"
                width={56}
                height={56}
                priority
                className="mx-auto block h-14 w-14 rounded-full border border-brand-line object-cover object-[center_15%]"
              />
            </figure>
            <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.08em] text-brand-muted uppercase">
              <StatusPulse />
              Available
            </span>
          </div>

          <h1 className="mb-5 font-sans text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.03em] max-sm:text-[clamp(2.5rem,11vw,3.75rem)]">
            <span className="block">Your Business Deserves</span>
            <span className="block text-brand-muted">
              a Better Website
              <span className="text-brand-accent">.</span>
            </span>
          </h1>

          <p className="mx-auto mb-6 max-w-[52ch] text-[1.05rem] leading-[1.65] text-brand-muted">
            I redesign and build modern, high-performance websites that help
            ambitious businesses look credible, attract more customers, and grow
            with confidence.
          </p>

          {actions && (
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
              {actions}
            </div>
          )}
        </div>

        <Reveal
          className="mt-[clamp(2rem,6vh,3.5rem)] flex w-full max-w-[44rem] items-center gap-4"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
          <span className="font-mono text-[0.65rem] text-brand-faint max-sm:hidden">
            Scroll
          </span>
        </Reveal>
      </Container>
    </section>
  )
}
