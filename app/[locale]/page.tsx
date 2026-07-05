import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectGrid } from "@/components/projects/project-grid";
import { SectionTitleSync } from "@/components/layout/section-title-sync";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HeroActions } from "@/components/sections/hero-actions";
import { Meet } from "@/components/sections/meet";
import { Process } from "@/components/sections/process";
import { featuredProjects } from "@/content/projects";

type Props = {
  params: Promise<{ locale: string; }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const baseUrl = "https://ermili.dev"
  const canonicalUrl = locale === "en" ? baseUrl : `${baseUrl}/${locale}`
  const title = t("homeTitle")
  const description = t("description")

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: baseUrl,
        fr: `${baseUrl}/fr`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectionTitleSync />
      <Hero actions={<HeroActions />} />
      <Meet />
      <ProjectGrid projects={featuredProjects} showCta id="projects" />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
