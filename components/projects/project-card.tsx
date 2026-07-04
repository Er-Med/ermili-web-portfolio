"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion"

import type { Project } from "@/content/projects"
import { frameGradients } from "@/lib/frame-gradients"
import { cn } from "@/lib/utils"

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const imageReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE, delay: 0.1 },
  },
}

const imageRevealReduced: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)" },
}

const imageScale: Variants = {
  hidden: { scale: 1.05 },
  show: {
    scale: 1,
    transition: { duration: 1.4, ease: EASE },
  },
}

const imageScaleReduced: Variants = {
  hidden: { scale: 1 },
  show: { scale: 1 },
}

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [30, -30]
  )

  return (
    <div ref={cardRef}>
      <Link href={project.href ?? "#"} className="group block">
        {project.image ? (
          <motion.div
            className="relative overflow-hidden rounded-[20px]"
            variants={prefersReduced ? imageRevealReduced : imageReveal}
          >
            <motion.div
              style={{ y: imageY }}
              variants={prefersReduced ? imageScaleReduced : imageScale}
              className="will-change-transform"
            >
              <Image
                src={project.image}
                alt={project.name}
                width={960}
                height={600}
                className={cn(
                  "aspect-[16/10] w-full object-cover",
                  "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "group-hover:scale-[1.04]"
                )}
              />
            </motion.div>

            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex items-center justify-center rounded-[20px]",
                "bg-black/0 transition-[background-color] duration-[400ms]",
                "group-hover:bg-black/15"
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "text-sm font-medium tracking-wide text-white",
                  "translate-y-3 opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "group-hover:translate-y-0 group-hover:opacity-100"
                )}
              >
                View Project &rarr;
              </span>
            </div>
          </motion.div>
        ) : (
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
        )}

        <div className="mt-4 flex items-baseline justify-between gap-4 px-0.5">
          <span
            className={cn(
              "inline-block text-base font-medium text-brand-text",
              "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:translate-x-1.5"
            )}
          >
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
    </div>
  )
}
