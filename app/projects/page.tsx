import type { Metadata } from "next"

import { BookingSection } from "@/components/booking/booking-section"
import { ProjectGrid } from "@/components/projects/project-grid"
import { Faq } from "@/components/sections/faq"
import { projects } from "@/content/projects"
import { site } from "@/content/site"

export const metadata: Metadata = {
  title: `Projects — ${site.name}`,
  description:
    "Selected website projects by ermili.dev — corporate sites, e-commerce, and healthcare platforms built for ambitious businesses.",
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectGrid
        projects={projects}
        title="Projects"
        titleTag="h1"
        eyebrow="Portfolio"
        sectionClassName="border-b-0 pt-[calc(var(--spacing-header)+3rem)]"
        id="projects"
      />
      <BookingSection />
      <Faq />
    </>
  )
}
