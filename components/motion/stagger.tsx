"use client"

import { motion, useReducedMotion } from "framer-motion"

const ease = [0.4, 0, 0.2, 1] as const

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
}

const reducedItem = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "ul"
}

export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const Tag = motion[as]

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -30px 0px" }}
      className={className}
    >
      {children}
    </Tag>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "li"
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()
  const Tag = motion[as]

  return (
    <Tag
      variants={shouldReduceMotion ? reducedItem : item}
      className={className}
    >
      {children}
    </Tag>
  )
}
