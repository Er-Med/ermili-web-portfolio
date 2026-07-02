"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

import { site } from "@/content/site"

export function CalEmbed() {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi()
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#222222" } },
      })
    })()
  }, [])

  return (
    <div className="cal-embed-wrap reveal">
      <Cal
        calLink={site.calLink}
        style={{ width: "100%", height: "100%", minHeight: "630px" }}
        config={{ layout: "month_view" }}
      />
    </div>
  )
}
