"use client"

import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

export function Meet() {
  return (
    <section
      className="border-b border-brand-line bg-[#f8f8f8] py-24 max-sm:py-16"
      id="meet"
    >
      <Container>
        <Reveal>
          <h2 className="mb-12 font-sans text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            <span className="block">
              Meet the{" "}
              <em className="font-medium italic text-brand-muted">person</em>
            </span>
            <span className="mt-[0.15em] block text-right max-sm:text-left">
              behind the{" "}
              <em className="font-medium italic text-brand-muted">design</em>
            </span>
          </h2>
        </Reveal>

        <Reveal>
          <article className="meet-card grid grid-cols-[minmax(220px,320px)_1fr] items-center gap-[clamp(1.5rem,4vw,3rem)] overflow-hidden rounded-tl-[1.25rem] rounded-tr-[999px] rounded-br-[999px] rounded-bl-[1.25rem] border border-white/12 bg-gradient-to-br from-[#3a2f2f] from-0% via-brand-dark via-45% to-[#2a2826] p-[clamp(1.5rem,3vw,2.5rem)] text-brand-on-dark max-[960px]:grid-cols-1 max-[960px]:rounded-lg">
            <figure className="m-0 aspect-[4/5] max-h-[380px] overflow-hidden rounded-2xl">
              <Image
                src="/me-logo-origin.png"
                alt="ermili.dev"
                width={280}
                height={340}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="pr-[clamp(1rem,4vw,3rem)] max-[960px]:pr-0">
              <p className="mb-4 text-[clamp(1.5rem,3vw,2rem)]">
                <strong>Hey,</strong>
              </p>
              <p className="mb-4 max-w-[52ch] text-[1.05rem] leading-[1.65]">
                my name is ermili, website specialist and developer. I create high-end
                websites for businesses that want to look credible and grow online.
              </p>
              <p className="mb-[0.85rem] max-w-[52ch] text-[0.95rem] leading-[1.65] text-brand-faint">
                With experience across design and development, I combine technical
                expertise with a strong design sensibility to build digital experiences
                that truly stand out.
              </p>
              <p className="mb-[0.85rem] max-w-[52ch] text-[0.95rem] leading-[1.65] text-brand-faint">
                Let&apos;s make your website something extraordinary!
              </p>
              <Link
                href="/#contact"
                className="mt-2 inline-block text-[0.95rem] font-medium text-brand-on-dark underline underline-offset-4 transition-colors hover:text-brand-accent"
              >
                Learn more
              </Link>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  )
}
