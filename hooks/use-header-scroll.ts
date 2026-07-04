"use client"

import { useCallback, useEffect, useState } from "react"

const DOCK_THRESHOLD = 130
const DARK_SECTION_SELECTOR = ".section--dark, .featured-card, .meet-card"

function getHeaderHeight(varName: string): number {
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName)
  return parseInt(value, 10) || 88
}

export function useHeaderScroll() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDocked, setIsDocked] = useState(false)
  const [isOnDark, setIsOnDark] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = useCallback(() => {
    setMobileOpen(false)
  }, [])

  const toggleMobile = useCallback(() => {
    setMobileOpen((open) => !open)
  }, [])

  useEffect(() => {
    let wasDocked = false

    const updateHeader = () => {
      const scrollY = window.scrollY
      const docked = scrollY > DOCK_THRESHOLD

      if (docked !== wasDocked) {
        setMobileOpen(false)
        wasDocked = docked
      }

      setIsScrolled(scrollY > 20)
      setIsDocked(docked)

      const probeY = docked
        ? window.innerHeight - getHeaderHeight("--header-h-docked")
        : getHeaderHeight("--header-h")

      const darkSections = document.querySelectorAll(DARK_SECTION_SELECTOR)
      let onDark = false

      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < probeY && rect.bottom > probeY) {
          onDark = true
        }
      })

      const featured = document.querySelector(".featured")
      if (featured) {
        const rect = featured.getBoundingClientRect()
        if (rect.top < probeY && rect.bottom > probeY) {
          onDark = true
        }
      }

      setIsOnDark(onDark)
    }

    window.addEventListener("scroll", updateHeader, { passive: true })
    updateHeader()

    return () => window.removeEventListener("scroll", updateHeader)
  }, [])

  return {
    isScrolled,
    isDocked,
    isOnDark,
    mobileOpen,
    toggleMobile,
    closeMobile,
  }
}
