"use client"

import { useEffect, useRef } from "react"

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot || !window.matchMedia("(pointer: fine)").matches) return

    dot.classList.add("opacity-100")

    const onMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      dot.classList.remove("opacity-100")
    }
  }, [])

  return (
    <div
      ref={dotRef}
      id="cursorDot"
      aria-hidden="true"
      className="pointer-events-none fixed z-[9999] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent opacity-0 mix-blend-multiply [transition:transform_0.15s_var(--ease-brand),opacity_0.3s]"
    />
  )
}
