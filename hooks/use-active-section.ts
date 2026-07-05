"use client"

import { useReducedMotion } from "framer-motion"
import { useLenis } from "lenis/react"
import { useCallback, useEffect, useRef, useState } from "react"

const SECTIONS = ["about", "projects", "process", "faq", "contact"] as const

export type SectionId = (typeof SECTIONS)[number]

type SectionMetrics = {
  id: SectionId
  top: number
  bottom: number
  center: number
}

function getHysteresis(): number {
  return Math.min(48, window.innerHeight * 0.06)
}

function measureSections(): SectionMetrics[] {
  return SECTIONS.flatMap((id) => {
    const el = document.getElementById(id)
    if (!el) return []

    const rect = el.getBoundingClientRect()
    return [
      {
        id,
        top: rect.top,
        bottom: rect.bottom,
        center: rect.top + rect.height / 2,
      },
    ]
  })
}

function resolveActiveSection(
  sections: SectionMetrics[],
  viewportCenter: number,
  current: SectionId | null,
): SectionId | null {
  if (sections.length === 0) return null

  const first = sections[0]
  const last = sections[sections.length - 1]

  if (viewportCenter < first.top) return null
  if (viewportCenter > last.bottom) return last.id

  let closest = sections[0]
  let closestDistance = Math.abs(closest.center - viewportCenter)

  for (const section of sections) {
    const distance = Math.abs(section.center - viewportCenter)
    if (distance < closestDistance) {
      closestDistance = distance
      closest = section
    }
  }

  if (current && current !== closest.id) {
    const currentSection = sections.find((section) => section.id === current)
    if (currentSection) {
      const currentDistance = Math.abs(currentSection.center - viewportCenter)
      if (closestDistance >= currentDistance - getHysteresis()) {
        return current
      }
    }
  }

  return closest.id
}

export function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null)
  const activeRef = useRef<SectionId | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const update = useCallback(() => {
    const viewportCenter = window.innerHeight / 2
    const next = resolveActiveSection(
      measureSections(),
      viewportCenter,
      activeRef.current,
    )

    if (next === activeRef.current) return

    activeRef.current = next
    setActive(next)
  }, [])

  useLenis(
    shouldReduceMotion ? undefined : () => update(),
    [update, shouldReduceMotion],
  )

  useEffect(() => {
    update()

    const onResize = () => update()
    window.addEventListener("resize", onResize, { passive: true })

    if (shouldReduceMotion) {
      window.addEventListener("scroll", update, { passive: true })
    }

    return () => {
      window.removeEventListener("resize", onResize)
      if (shouldReduceMotion) {
        window.removeEventListener("scroll", update)
      }
    }
  }, [update, shouldReduceMotion])

  return active
}
