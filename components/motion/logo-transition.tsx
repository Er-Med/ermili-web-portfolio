"use client"

import { usePathname } from "next/navigation"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { LayoutGroup, useReducedMotion } from "framer-motion"

type LogoTransitionContextValue = {
  isHeroLogoActive: boolean
}

const LogoTransitionContext = createContext<LogoTransitionContextValue>({
  isHeroLogoActive: false,
})

export const useLogoTransition = () => useContext(LogoTransitionContext)

const LOGO_TRANSITION_THRESHOLD = 130

export const LOGO_MORPH_TRANSITION = {
  layout: {
    type: "spring" as const,
    stiffness: 90,
    damping: 18,
    mass: 0.8,
  },
}

export function LogoTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const prefersReduced = useReducedMotion()
  const [isHeroLogoActive, setIsHeroLogoActive] = useState(false)

  useEffect(() => {
    if (!isHome || prefersReduced) {
      setIsHeroLogoActive(false)
      return
    }

    const update = () =>
      setIsHeroLogoActive(window.scrollY < LOGO_TRANSITION_THRESHOLD)

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [isHome, prefersReduced])

  return (
    <LogoTransitionContext.Provider value={{ isHeroLogoActive }}>
      <LayoutGroup>{children}</LayoutGroup>
    </LogoTransitionContext.Provider>
  )
}
