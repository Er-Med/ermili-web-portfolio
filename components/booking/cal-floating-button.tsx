"use client"

import { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

import { site } from "@/content/site"

export function CalFloatingButton() {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace: "30min" })
      cal("floatingButton", {
        calLink: site.calLink,
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true",
        },
      })
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light",
        styles: { branding: { brandColor: "#222222" } },
      })
    })()
  }, [])

  return null
}
