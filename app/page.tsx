import { BookingSection } from "@/components/booking/booking-section"
import { ProjectGrid } from "@/components/projects/project-grid"
import { Contact } from "@/components/sections/contact"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { HeroActions } from "@/components/sections/hero-actions"
import { Meet } from "@/components/sections/meet"
import { Process } from "@/components/sections/process"
import { featuredProjects } from "@/content/projects"

export default function HomePage() {
  return (
    <>
      <Hero actions={<HeroActions />} />
      <Meet />
      <BookingSection />
      <ProjectGrid
        projects={featuredProjects}
        eyebrow="Selected Projects"
        title="Websites crafted for brands that want to stand out."
        showCta
      />
      <Process />
      <Faq />
      <Contact />
    </>
  )
}
