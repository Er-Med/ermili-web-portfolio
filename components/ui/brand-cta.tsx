"use client"

import { useRef } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion"

import { cn } from "@/lib/utils"

/* ——— Types ——— */

type Variant = "primary" | "secondary" | "ghost"

type SharedProps = {
  variant?: Variant
  full?: boolean
  arrow?: boolean
  magnetic?: boolean
  children: React.ReactNode
  className?: string
}

type AsLink = SharedProps & {
  href: string
  as?: never
  type?: never
  disabled?: never
  onClick?: () => void
}

type AsButton = SharedProps & {
  href?: never
  as: "button"
  type?: "submit" | "button"
  disabled?: boolean
  onClick?: () => void
}

export type BrandCtaProps = AsLink | AsButton

/* ——— Spring configs ——— */

const MAGNETIC_SPRING = { stiffness: 150, damping: 15, mass: 0.1 }

const HOVER_TRANSITION = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.5,
}

/* ——— Arrow SVG ——— */

function CtaArrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="relative transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-1"
    >
      <path
        d="M2.5 7.5h10m-4-4.5 4.5 4.5-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ——— Style definitions ——— */

const base = [
  "group/cta relative inline-flex items-center justify-center",
  "rounded-full select-none outline-none",
  "font-sans text-[0.875rem] font-medium tracking-[0.015em]",
  "transition-[background-color,border-color,box-shadow] duration-300",
  "ease-[cubic-bezier(0.16,1,0.3,1)]",
  "focus-visible:ring-2 focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ")

const variants: Record<Variant, string> = {
  primary: [
    "gap-2.5 bg-[#1a1a1a] px-9 py-[0.95rem] text-[#f2f2f0]",
    "hover:bg-[#111] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)]",
    "focus-visible:ring-[#1a1a1a]/40 focus-visible:ring-offset-brand-bg",
  ].join(" "),

  secondary: [
    "gap-2 border border-black/[0.08] px-8 py-[0.9rem] text-brand-text",
    "hover:border-black/[0.16] hover:bg-black/[0.02]",
    "focus-visible:ring-black/20 focus-visible:ring-offset-brand-bg",
  ].join(" "),

  ghost: [
    "gap-2 border border-white/[0.1] px-8 py-[0.9rem] text-[#f2f2f0]",
    "hover:border-white/[0.2] hover:bg-white/[0.04]",
    "focus-visible:ring-white/30 focus-visible:ring-offset-brand-dark",
  ].join(" "),
}

/* ——— Component ——— */

export function BrandCta(props: BrandCtaProps) {
  const {
    variant = "primary",
    full = false,
    arrow = false,
    magnetic = false,
    children,
    className,
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smoothMx = useSpring(mx, MAGNETIC_SPRING)
  const smoothMy = useSpring(my, MAGNETIC_SPRING)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || prefersReduced) return
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.15)
    my.set((e.clientY - rect.top - rect.height / 2) * 0.15)
  }

  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const classes = cn(
    base,
    variants[variant],
    full && "w-full",
    className,
  )

  const hoverAnim = prefersReduced
    ? undefined
    : {
        scale: variant === "primary" ? 1.025 : 1.015,
        y: variant === "primary" ? -2 : -1,
      }

  const tapAnim = prefersReduced ? undefined : { scale: 0.975 }

  const content = (
    <>
      <span>{children}</span>
      {arrow && <CtaArrow />}
    </>
  )

  const isLink = !("as" in props && props.as === "button")

  const inner = isLink ? (
    <Link
      href={(props as AsLink).href}
      className={classes}
      onClick={(props as AsLink).onClick}
    >
      {content}
    </Link>
  ) : (
    <button
      type={props.type ?? "button"}
      className={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {content}
    </button>
  )

  return (
    <motion.div
      ref={wrapperRef}
      className={cn("inline-flex", full && "w-full")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magnetic ? { x: smoothMx, y: smoothMy } : undefined}
      whileHover={hoverAnim}
      whileTap={tapAnim}
      transition={HOVER_TRANSITION}
    >
      {inner}
    </motion.div>
  )
}
