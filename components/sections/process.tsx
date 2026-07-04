"use client"

import { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeading } from "@/components/ui/section-heading"

/* ——— Constants ——— */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING = { stiffness: 60, damping: 22, mass: 0.8 }

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description:
      "I dig into your business, audience, and goals. We align on what success looks like before a single pixel is placed.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Content structure, user flows, and positioning — mapped out so every design decision serves a clear purpose.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "High-fidelity visuals that capture your brand's personality. Refined until every detail feels intentional.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Clean, performant code. Built responsive from the start with smooth interactions and fast load times.",
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Final QA, deployment, and handoff. Your site goes live polished and production-ready.",
  },
] as const

/* ——— Animation variants ——— */

const headingFadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const itemReveal: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const dividerGrow: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE },
  },
}

const numberScale: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
}

const textFadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/* ——— Reduced motion fallbacks ——— */

const reducedVariant: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
}

/* ——— Process step item ——— */

type ProcessItemProps = {
  step: (typeof STEPS)[number]
  index: number
  activeProgress: ReturnType<typeof useSpring>
  totalSteps: number
  reduced: boolean
}

function ProcessItem({
  step,
  index,
  activeProgress,
  totalSteps,
  reduced,
}: ProcessItemProps) {
  const stepStart = index / totalSteps
  const stepEnd = (index + 1) / totalSteps

  const rawOpacity = useTransform(activeProgress, (p) => {
    if (p >= stepStart && p < stepEnd) return 1
    if (p >= stepEnd) return 0.35
    return 0.55
  })

  const rawColor = useTransform(activeProgress, (p) => {
    if (p >= stepStart && p < stepEnd) return "#0f0f0e"
    return "#8a8a8e"
  })

  const opacity = reduced ? undefined : rawOpacity
  const color = reduced ? undefined : rawColor

  return (
    <motion.div variants={reduced ? reducedVariant : itemReveal}>
      <motion.div
        className="origin-left border-t border-brand-line"
        variants={reduced ? reducedVariant : dividerGrow}
        style={{ transformOrigin: "left" }}
      />
      <motion.div
        className="grid grid-cols-[auto_1fr] gap-x-[clamp(1.5rem,4vw,3.5rem)] py-[clamp(2rem,4vh,3.5rem)] max-sm:grid-cols-1 max-sm:gap-y-4"
        style={opacity ? { opacity } : undefined}
      >
        <motion.span
          className="block font-mono text-[clamp(3rem,6vw,5rem)] font-light leading-none tracking-[-0.04em] text-brand-faint"
          variants={reduced ? reducedVariant : numberScale}
          style={color ? { color } : undefined}
        >
          {step.number}
        </motion.span>

        <motion.div
          className="flex flex-col justify-center"
          variants={reduced ? reducedVariant : textFadeUp}
        >
          <h3 className="font-sans text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em]">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-[1.7] text-brand-muted">
            {step.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ——— Process section ——— */

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const reduced = !!prefersReduced

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.4"],
  })

  const smoothProgress = useSpring(scrollYProgress, SPRING)

  return (
    <section
      ref={sectionRef}
      className="border-b border-brand-line bg-[#f8f8f8] py-24 max-sm:py-16"
      id="process"
    >
      <Container>
        <motion.header
          className="mb-16 max-sm:mb-10"
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={headingFadeUp}
        >
          <Eyebrow>Process</Eyebrow>
          <SectionHeading
            title="How I bring your project to life"
            subtitle="A clear, collaborative workflow — from first conversation to final launch."
          />
        </motion.header>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEPS.map((step, index) => (
            <ProcessItem
              key={step.number}
              step={step}
              index={index}
              activeProgress={smoothProgress}
              totalSteps={STEPS.length}
              reduced={reduced}
            />
          ))}
          <motion.div
            className="origin-left border-t border-brand-line"
            variants={reduced ? reducedVariant : dividerGrow}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </Container>
    </section>
  )
}
