"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollRevealProvider() {
  const pathname = usePathname()

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal:not(.visible)")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    )

    revealEls.forEach((el, i) => {
      ;(el as HTMLElement).style.transitionDelay = `${(i % 4) * 0.08}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  return null
}
