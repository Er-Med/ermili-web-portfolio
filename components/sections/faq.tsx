"use client"

import { useEffect, useRef } from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeading } from "@/components/ui/section-heading"
import { faqItems } from "@/content/faq"

export function Faq() {
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const accordion = accordionRef.current
    if (!accordion) return

    const items = accordion.querySelectorAll("details")

    const onToggle = (event: Event) => {
      const item = event.target as HTMLDetailsElement
      if (!item.open) return

      items.forEach((other) => {
        if (other !== item) {
          ;(other as HTMLDetailsElement).open = false
        }
      })
    }

    items.forEach((item) => item.addEventListener("toggle", onToggle))
    return () => items.forEach((item) => item.removeEventListener("toggle", onToggle))
  }, [])

  return (
    <section
      className="border-b border-brand-line bg-[#f8f8f8] py-24 max-sm:py-16"
      id="faq"
    >
      <Container className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-[960px]:grid-cols-1">
        <Reveal>
          <header>
            <Eyebrow>FAQ</Eyebrow>
            <SectionHeading
              title="Answers to your questions"
              subtitle="Clear and helpful answers to all your inquiries."
            />
          </header>
        </Reveal>

        <Reveal>
          <div
            className="border-t border-brand-line"
            id="faqAccordion"
            ref={accordionRef}
          >
            {faqItems.map((item, index) => (
              <details
                key={item.question}
                className="group border-b border-brand-line"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between py-[1.35rem] text-base font-medium transition-colors duration-300 hover:text-brand-muted [&::-webkit-details-marker]:hidden after:font-mono after:text-[1.1rem] after:text-brand-muted after:content-['+'] after:transition-transform after:duration-300 group-open:after:content-['−']">
                  {item.question}
                </summary>
                <p className="max-w-[52ch] pb-[1.35rem] text-[0.95rem] leading-[1.7] text-brand-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
