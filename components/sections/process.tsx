"use client"

import { useRef } from "react"
import { useTranslations } from "next-intl"
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

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPRING = { stiffness: 60, damping: 22, mass: 0.8 }

const STEP_KEYS = ["discovery", "strategy", "design", "development", "launch"] as const
const STEP_NUMBERS = ["01", "02", "03", "04", "05"] as const

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

const reducedVariant: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
}

type ProcessItemProps = {
  stepKey: string
  number: string
  title: string
  description: string
  index: number
  activeProgress: ReturnType<typeof useSpring>
  totalSteps: number
  reduced: boolean
}

function ProcessItem({
  number,
  title,
  description,
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
          {number}
        </motion.span>

        <motion.div
          className="flex flex-col justify-center"
          variants={reduced ? reducedVariant : textFadeUp}
        >
          <h3 className="font-sans text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em]">
            {title}
          </h3>
          <p className="mt-2 max-w-[44ch] text-[0.95rem] leading-[1.7] text-brand-muted">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function Process() {
  const t = useTranslations("process")
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
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </motion.header>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEP_KEYS.map((key, index) => (
            <ProcessItem
              key={key}
              stepKey={key}
              number={STEP_NUMBERS[index]}
              title={t(`steps.${key}.title`)}
              description={t(`steps.${key}.description`)}
              index={index}
              activeProgress={smoothProgress}
              totalSteps={STEP_KEYS.length}
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
