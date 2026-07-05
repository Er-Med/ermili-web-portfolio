"use client"

import { useEffect, useState } from "react"

function getNavClearance(): number {
  const header = document.getElementById("header")
  if (!header) return 88

  // offsetHeight is transform-independent; bottom-6 = 24px + small buffer
  return header.offsetHeight + 32
}

export function useFooterVisibility() {
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    let observer: IntersectionObserver | undefined

    const observe = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsFooterVisible(entry.isIntersecting)
        },
        {
          rootMargin: `0px 0px -${getNavClearance()}px 0px`,
          threshold: 0,
        },
      )
      observer.observe(footer)
    }

    observe()

    const onResize = () => observe()
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return isFooterVisible
}
