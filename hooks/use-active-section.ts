"use client"

import { useEffect, useState } from "react"

const SECTIONS = ["projects", "process", "faq", "contact"] as const

export type SectionId = (typeof SECTIONS)[number]

const OBSERVER_OPTS: IntersectionObserverInit = {
  rootMargin: "-40% 0px -40% 0px",
  threshold: 0,
}

export function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    if (elements.length === 0) return

    const visible = new Map<string, boolean>()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        visible.set(entry.target.id, entry.isIntersecting)
      })

      for (const section of SECTIONS) {
        if (visible.get(section)) {
          setActive(section)
          return
        }
      }
    }, OBSERVER_OPTS)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
