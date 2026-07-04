"use client"

import { useRef } from "react"
import Image from "next/image"
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
  type MotionValue,
} from "framer-motion"

import { useLogoTransition, LOGO_MORPH_TRANSITION } from "@/components/motion/logo-transition"
import { StatusPulse } from "@/components/motion/status-pulse"
import { Container } from "@/components/ui/container"

/* ——— Shared easing ——— */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const MOUSE_SPRING = { stiffness: 50, damping: 20, mass: 0.8 }

/* ——— Entrance variants ——— */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
}

const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
}

/* ——— Decorative dot config ——— */

type DotConfig = {
  top: string
  left: string
  size: number
  duration: number
  delay: number
  factor: number
}

const HERO_DOTS: DotConfig[] = [
  { top: "18%", left: "8%", size: 5, duration: 6, delay: 0, factor: 0.8 },
  { top: "72%", left: "14%", size: 4, duration: 7.5, delay: 1.5, factor: 0.5 },
  { top: "22%", left: "90%", size: 6, duration: 5.5, delay: 0.8, factor: 1 },
  { top: "65%", left: "85%", size: 3, duration: 8, delay: 2.2, factor: 0.6 },
  { top: "50%", left: "5%", size: 4, duration: 7, delay: 0.5, factor: 0.7 },
]

/* ——— Floating dot component (isolates hooks per instance) ——— */

function FloatingDot({
  config,
  mouseX,
  mouseY,
}: {
  config: DotConfig
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  const x = useTransform(mouseX, (v) => v * config.factor)
  const y = useTransform(mouseY, (v) => v * config.factor)

  return (
    <motion.span
      className="absolute"
      style={{ top: config.top, left: config.left, x, y }}
    >
      <motion.span
        className="block rounded-full bg-brand-text/[0.07]"
        style={{ width: config.size, height: config.size }}
        animate={{ y: [0, -3, 0, 3, 0] }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: config.delay,
        }}
      />
    </motion.span>
  )
}

/* ——— Hero ——— */

type HeroProps = {
  actions?: React.ReactNode
}

export function Hero({ actions }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()

  /* Scroll-driven exit transforms */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const exitY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const exitOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const headingY = useTransform(scrollYProgress, [0, 0.6], [0, -40])
  const descY = useTransform(scrollYProgress, [0, 0.6], [0, -20])
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  /* Hero logo — context + scroll-driven transforms */
  const { isHeroLogoActive } = useLogoTransition()
  const rawHeroLogoY = useTransform(scrollYProgress, [0, 0.15], [0, -50])
  const rawHeroLogoScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.88])
  const rawHeroLogoRotate = useTransform(scrollYProgress, [0, 0.15], [0, -4])
  const heroLogoY = useSpring(rawHeroLogoY, { stiffness: 80, damping: 20, mass: 0.5 })
  const heroLogoScale = useSpring(rawHeroLogoScale, { stiffness: 100, damping: 22, mass: 0.5 })
  const heroLogoRotate = useSpring(rawHeroLogoRotate, { stiffness: 60, damping: 16, mass: 0.5 })

  /* Mouse parallax for decorative dots */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, MOUSE_SPRING)
  const smoothMouseY = useSpring(mouseY, MOUSE_SPRING)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 8)
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex min-h-screen w-full bg-brand-bg pt-[var(--header-h)]"
      id="about"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReduced ? undefined : { y: exitY, opacity: exitOpacity }}
    >
      {/* Decorative floating dots — hidden on small screens to reduce visual noise */}
      {!prefersReduced && (
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
          aria-hidden="true"
        >
          {HERO_DOTS.map((dot, i) => (
            <FloatingDot
              key={i}
              config={dot}
              mouseX={smoothMouseX}
              mouseY={smoothMouseY}
            />
          ))}
        </div>
      )}

      {/* Decorative hero logo — morphs to navbar on scroll */}
      {!prefersReduced && isHeroLogoActive && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="will-change-transform"
            style={{
              y: heroLogoY,
              scale: heroLogoScale,
              rotate: heroLogoRotate,
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                layoutId="brand-logo"
                className="h-[clamp(180px,24vw,300px)] w-[clamp(180px,24vw,300px)]"
                style={{ opacity: 0.07 }}
                transition={LOGO_MORPH_TRANSITION}
              >
                <Image
                  src="/logo.png"
                  alt=""
                  width={300}
                  height={300}
                  className="h-full w-full select-none object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}

      <Container className="relative z-[2] flex min-h-[calc(100vh-var(--header-h))] w-full flex-1 flex-col items-center justify-center py-[clamp(2rem,6vh,5.5rem)]">
        {/* Entrance stagger container */}
        <motion.div
          className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
          initial={prefersReduced ? false : "hidden"}
          animate="show"
        >
          {/* Avatar + Available badge */}
          <motion.div
            className="mb-[clamp(1.25rem,3vh,2rem)] flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5"
            variants={fadeUp}
            custom={0}
          >
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
          </motion.div>

          {/* Heading — per-line reveal with scroll parallax */}
          <motion.div style={prefersReduced ? undefined : { y: headingY }}>
            <motion.h1 className="mb-3 sm:mb-5 font-sans text-[2.5rem] leading-[0.93] font-semibold tracking-[-0.035em] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[5.25rem]">
              <motion.span className="block" variants={fadeUp} custom={0.12}>
                Your Website Should
              </motion.span>
              <motion.span
                className="block text-brand-muted"
                variants={fadeUpSubtle}
                custom={0.24}
              >
                Win You Clients
                <span className="text-brand-accent">.</span>
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Description with scroll parallax */}
          <motion.div style={prefersReduced ? undefined : { y: descY }}>
            <motion.p
              className="mx-auto mb-5 sm:mb-6 max-w-[50ch] text-[0.95rem] leading-[1.65] text-brand-muted sm:text-[1.05rem]"
              variants={fadeUp}
              custom={0.4}
            >
              I partner with growing businesses to replace outdated websites
              with premium digital experiences that build instant credibility
              and turn visitors into customers.
            </motion.p>
          </motion.div>

          {/* CTA buttons */}
          {actions && (
            <motion.div
              className="mb-5 sm:mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              variants={fadeUp}
              custom={0.52}
            >
              {actions}
            </motion.div>
          )}

          {/* Credibility line */}
          <motion.p
            className="font-mono text-[0.6rem] tracking-[0.06em] text-brand-faint uppercase sm:text-[0.65rem]"
            variants={fadeUp}
            custom={0.64}
          >
            Trusted by startups, clinics & growing businesses
          </motion.p>
        </motion.div>

        {/* Scroll indicator — hidden on mobile, fades on scroll */}
        <motion.div
          className="mt-[clamp(1.5rem,5vh,3.5rem)] hidden w-full max-w-[44rem] sm:block"
          aria-hidden="true"
          style={prefersReduced ? undefined : { opacity: indicatorOpacity }}
        >
          <motion.div
            className="flex items-center gap-4"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          >
            <span className="relative h-px flex-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent">
              {!prefersReduced && (
                <motion.span
                  className="absolute top-1/2 size-1 -translate-y-1/2 rounded-full bg-brand-accent"
                  animate={{ left: ["10%", "90%", "10%"] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </span>
            <span className="font-mono text-[0.65rem] text-brand-faint">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </motion.section>
  )
}
