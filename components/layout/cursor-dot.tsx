"use client"

import { useEffect, useRef } from "react"

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot || !window.matchMedia("(pointer: fine)").matches) return

    document.body.classList.add("cursor-ready")

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      document.body.classList.remove("cursor-ready")
    }
  }, [])

  return <div className="cursor-dot" ref={dotRef} id="cursorDot" aria-hidden="true" />
}
