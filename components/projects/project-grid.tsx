"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrandCta } from "@/components/ui/brand-cta";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const gridContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const gridItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const gridItemReduced: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  show: { opacity: 1, y: 0, scale: 1 },
};

type ProjectGridProps = {
  projects: Project[];
  isPortfolioPage?: boolean;
  showCta?: boolean;
  sectionClassName?: string;
  id?: string;
};

const defaultSectionClass =
  "border-b border-brand-line py-24 max-sm:py-16 last:border-b-0";

export function ProjectGrid({
  projects,
  isPortfolioPage = false,
  showCta = false,
  sectionClassName,
  id = "work",
}: ProjectGridProps) {
  const t = useTranslations("projects");
  const prefersReduced = useReducedMotion();

  const eyebrow = isPortfolioPage ? t("portfolioEyebrow") : t("eyebrow");
  const title = isPortfolioPage ? t("portfolioTitle") : t("title");
  const TitleTag = isPortfolioPage ? "h1" : "h2";

  return (
    <section className={cn(defaultSectionClass, sectionClassName)} id={id}>
      <Container>
        <header className="mb-14">
          <Reveal delay={0}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHeading title={title} as={TitleTag} />
          </Reveal>
        </header>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-x-8 gap-y-10 max-[960px]:grid-cols-1 max-[960px]:gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={prefersReduced ? gridItemReduced : gridItem}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {showCta && (
          <Reveal className="mt-12 text-center">
            <BrandCta href="/projects" variant="secondary" arrow>
              {t("seeAll")}
            </BrandCta>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
