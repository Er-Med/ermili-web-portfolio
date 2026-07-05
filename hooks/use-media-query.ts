"use client"

import { useSyncExternalStore } from "react"

export function useMediaQuery(query: string): boolean {
  const subscribe = (onStoreChange: () => void) => {
    const mediaQueryList = window.matchMedia(query)
    mediaQueryList.addEventListener("change", onStoreChange)
    return () => mediaQueryList.removeEventListener("change", onStoreChange)
  }

  const getSnapshot = () => window.matchMedia(query).matches

  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Tailwind `sm` — mobile layouts below this width. */
export const SM_MIN_WIDTH_QUERY = "(min-width: 640px)"
