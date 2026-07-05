"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"

export function SectionTitleSync() {
  const t = useTranslations("metadata")

  useEffect(() => {
    const syncTitle = () => {
      const hash = window.location.hash

      if (hash === "#about") {
        document.title = `${t("aboutTitle")} — Ermili Web`
        return
      }

      if (hash === "#contact") {
        document.title = `${t("contactTitle")} — Ermili Web`
        return
      }

      document.title = t("homeTitle")
    }

    syncTitle()
    window.addEventListener("hashchange", syncTitle)

    return () => window.removeEventListener("hashchange", syncTitle)
  }, [t])

  return null
}
