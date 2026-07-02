"use client"

import Link from "next/link"

import { Reveal } from "@/components/motion/reveal"
import { Stagger, StaggerItem } from "@/components/motion/stagger"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SectionHeading } from "@/components/ui/section-heading"
import { SiteButton } from "@/components/ui/site-button"
import type { Project } from "@/content/projects"
import { frameGradients } from "@/lib/frame-gradients"
import { cn } from "@/lib/utils"

type ProjectGridProps = {
  projects: Project[]
  title?: string
  titleTag?: "h1" | "h2"
  eyebrow?: string
  showCta?: boolean
  sectionClassName?: string
  id?: string
}

const defaultSectionClass =
  "border-b border-brand-line py-24 max-sm:py-16 last:border-b-0"

export function ProjectGrid({
  projects,
  title = "Projects",
  titleTag: TitleTag = "h2",
  eyebrow = "Selected Projects",
  showCta = false,
  sectionClassName,
  id = "work",
}: ProjectGridProps) {
  return (
    <section className={cn(defaultSectionClass, sectionClassName)} id={id}>
      <Container>
        <Reveal>
          <header className="mb-14">
            <Eyebrow>{eyebrow}</Eyebrow>
            <SectionHeading title={title} as={TitleTag} />
          </header>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-8 gap-y-10 max-[960px]:grid-cols-1 max-[960px]:gap-6">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link href={project.href ?? "#"} className="group block">
                <div
                  className={cn(
                    "flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] p-[clamp(1.5rem,4vw,2.5rem)]",
                    frameGradients[project.frameClass]
                  )}
                >
                  <div
                    className="aspect-[16/10] w-[78%] rounded-xl bg-white shadow-[0_24px_48px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_32px_56px_rgba(0,0,0,0.16)]"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 px-0.5">
                  <span className="text-base font-medium text-brand-text">
                    {project.name}
                  </span>
                  <time
                    className="shrink-0 text-base text-brand-muted"
                    dateTime={String(project.year)}
                  >
                    {project.year}
                  </time>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {showCta && (
          <Reveal className="mt-12 text-center">
            <SiteButton href="/projects" variant="outline">
              See all projects
            </SiteButton>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
