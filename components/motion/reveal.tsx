"use client"

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion"

const ease = [0.4, 0, 0.2, 1] as const

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number
}

export function Reveal({ children, delay = 0, className, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -30px 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
