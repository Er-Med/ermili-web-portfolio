export type ProjectFrameClass =
  | "project-card-frame--1"
  | "project-card-frame--2"
  | "project-card-frame--3"
  | "project-card-frame--4"
  | "project-card-frame--5"

export type Project = {
  slug: string
  name: string
  year: number
  frameClass: ProjectFrameClass
  href?: string
}

export const projects: Project[] = [
  {
    slug: "shopflow",
    name: "ShopFlow",
    year: 2026,
    frameClass: "project-card-frame--1",
  },
  {
    slug: "pem-technologies",
    name: "PEM Technologies",
    year: 2025,
    frameClass: "project-card-frame--2",
  },
  {
    slug: "thrivedoc",
    name: "ThriveDoc",
    year: 2026,
    frameClass: "project-card-frame--3",
  },
  {
    slug: "nova-finance",
    name: "Nova Finance",
    year: 2025,
    frameClass: "project-card-frame--4",
  },
  {
    slug: "atlas-studio",
    name: "Atlas Studio",
    year: 2024,
    frameClass: "project-card-frame--5",
  },
]

export const featuredProjects = projects.slice(0, 4)
