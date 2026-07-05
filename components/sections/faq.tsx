"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion"

import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeading } from "@/components/ui/section-heading"

const ease = [0.4, 0, 0.2, 1] as const

const FAQ_KEYS = ["whatKind", "howLong", "seo", "update", "afterLaunch"] as const

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const dividerLine: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.6, ease } },
}

const answerReveal: Variants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
}

const reducedVariant: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

const reducedDivider: Variants = {
  hidden: { scaleX: 1 },
  show: { scaleX: 1 },
}

type FaqAccordionItemProps = {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
  reducedMotion: boolean
}

function FaqAccordionItem({
  question,
  answer,
  open,
  onToggle,
  reducedMotion,
}: FaqAccordionItemProps) {
  return (
    <motion.div variants={reducedMotion ? reducedVariant : fadeUp}>
      <motion.div
        className="origin-left border-b border-brand-line"
        variants={reducedMotion ? reducedDivider : dividerLine}
        style={{ transformOrigin: "left" }}
      />
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between py-[1.35rem] text-left text-base font-medium transition-colors duration-300 hover:text-brand-muted"
      >
        {question}
        <motion.span
          aria-hidden
          className="ml-4 shrink-0 font-mono text-[1.1rem] leading-none text-brand-muted"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            variants={answerReveal}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: reducedMotion ? 0 : 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="max-w-[52ch] pb-[1.35rem] text-[0.95rem] leading-[1.7] text-brand-muted">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Faq() {
  const t = useTranslations("faq")
  const [openIndex, setOpenIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()
  const reduced = !!shouldReduceMotion

  return (
    <section
      className="border-b border-brand-line bg-[#f8f8f8] py-24 max-sm:py-16"
      id="faq"
    >
      <Container className="grid grid-cols-[1fr_1.3fr] items-start gap-16 max-[960px]:grid-cols-1">
        <motion.header
          className="top-28 max-[960px]:static min-[961px]:sticky"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
        >
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        </motion.header>

        <motion.div
          id="faqAccordion"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            className="border-t border-brand-line"
            variants={reduced ? reducedDivider : dividerLine}
            style={{ transformOrigin: "left" }}
          />
          {FAQ_KEYS.map((key, index) => (
            <FaqAccordionItem
              key={key}
              question={t(`items.${key}.question`)}
              answer={t(`items.${key}.answer`)}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
              reducedMotion={reduced}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
