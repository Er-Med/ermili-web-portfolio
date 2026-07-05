import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { ProjectGrid } from "@/components/projects/project-grid"
import { Faq } from "@/components/sections/faq"
import { projects } from "@/content/projects"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const baseUrl = "https://ermili.dev"
  const title = t("projectsTitle")
  const description = t("projectsDescription")

  return {
    title,
    description,
    alternates: {
      canonical:
        locale === "en"
          ? `${baseUrl}/projects`
          : `${baseUrl}/${locale}/projects`,
      languages: {
        en: `${baseUrl}/projects`,
        fr: `${baseUrl}/fr/projects`,
      },
    },
    openGraph: {
      title: `${title} — Ermili Web`,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Ermili Web`,
      description,
    },
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <ProjectGrid
        projects={projects}
        isPortfolioPage
        sectionClassName="border-b-0 pt-[calc(var(--spacing-header)+3rem)]"
        id="projects"
      />
      <Faq />
    </>
  )
}
