"use client";

import { useTranslations } from "next-intl";

import { BrandCta } from "@/components/ui/brand-cta";

export function HeroActions() {
  const t = useTranslations("hero");

  return (
    <>
      <BrandCta href="/#contact" variant="primary" magnetic>
        {t("bookCall")}
      </BrandCta>
      <BrandCta href="/#projects" variant="secondary" arrow>
        {t("viewWork")}
      </BrandCta>
    </>
  );
}
