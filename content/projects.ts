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
  image?: string
}

export const projects: Project[] = [
  {
    slug: "swiftform",
    name: "SwiftForm",
    year: 2026,
    frameClass: "project-card-frame--1",
    image: "/project1.jpg",
  },
  {
    slug: "lanizo",
    name: "Lanizo",
    year: 2025,
    frameClass: "project-card-frame--2",
    image: "/project2.jpg",
  },
  {
    slug: "devmode",
    name: "DevMode",
    year: 2026,
    frameClass: "project-card-frame--3",
    image: "/project3.jpg",
  },
  {
    slug: "qural",
    name: "Qural",
    year: 2025,
    frameClass: "project-card-frame--4",
    image: "/project4.jpg",
  },
  {
    slug: "atlas-studio",
    name: "Atlas Studio",
    year: 2024,
    frameClass: "project-card-frame--5",
  },
]

export const featuredProjects = projects.slice(0, 4)
