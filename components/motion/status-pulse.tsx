"use client"

import { motion, useReducedMotion } from "framer-motion"

export function StatusPulse() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      className="size-1.5 rounded-full bg-brand-accent motion-reduce:animate-none"
      aria-hidden="true"
      animate={
        shouldReduceMotion
          ? undefined
          : {
              boxShadow: [
                "0 0 0 0 rgba(34,34,34,0.45)",
                "0 0 0 6px rgba(34,34,34,0)",
                "0 0 0 0 rgba(34,34,34,0.45)",
              ],
            }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      }
    />
  )
}
