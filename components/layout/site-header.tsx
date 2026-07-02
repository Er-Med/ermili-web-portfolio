"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { site } from "@/content/site"
import { useHeaderScroll } from "@/hooks/use-header-scroll"
import { cn } from "@/lib/utils"

const ease = [0.4, 0, 0.2, 1] as const

const navLinkClass =
  "flex items-center rounded-[7px] border border-nav-dock-link-border px-4 py-2.5 text-sm font-normal whitespace-nowrap text-nav-dock-text transition-[background,color,padding,font-size] duration-[400ms] ease-brand hover:bg-white/[0.07] hover:text-white hover:opacity-100 max-sm:w-full max-sm:text-left"

const ctaClass =
  "rounded-[10px] border border-white/[0.14] bg-nav-dock-cta-bg px-6 py-3.5 text-[0.95rem] font-medium whitespace-nowrap text-nav-dock-cta-text opacity-100 transition-[padding,font-size] duration-[550ms] ease-brand hover:bg-[#f2f2f0] hover:text-nav-dock-cta-text hover:opacity-100 max-sm:flex max-sm:w-full max-sm:justify-center max-sm:text-center"

const mobileStaggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
}

const mobileStaggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease },
  },
}

const mobileStaggerItemReduced = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

type NavLinksProps = {
  isProjects: boolean
  onNavigate: () => void
  itemVariants?: typeof mobileStaggerItem | typeof mobileStaggerItemReduced
  mobile?: boolean
}

function NavLinks({ isProjects, onNavigate, itemVariants, mobile }: NavLinksProps) {
  const groupClass = cn(
    "flex items-stretch gap-1.5 rounded-[10px] border-none bg-nav-dock-group p-1.5",
    mobile && "w-full flex-col gap-[3px]"
  )

  const links = (
    <>
      <Link
        href="/projects"
        className={navLinkClass}
        aria-current={isProjects ? "page" : undefined}
        onClick={onNavigate}
      >
        Projects
      </Link>
      <Link href="/#contact" className={navLinkClass} onClick={onNavigate}>
        Contact
      </Link>
      <Link
        href={isProjects ? "/#faq" : "#faq"}
        className={navLinkClass}
        onClick={onNavigate}
      >
        FAQ
      </Link>
    </>
  )

  const cta = (
    <Link href="/#book" className={ctaClass} onClick={onNavigate}>
      Book a call
    </Link>
  )

  if (mobile && itemVariants) {
    return (
      <>
        <motion.div variants={itemVariants} className={groupClass}>
          {links}
        </motion.div>
        <motion.div variants={itemVariants}>{cta}</motion.div>
      </>
    )
  }

  return (
    <>
      <div className={groupClass}>{links}</div>
      {cta}
    </>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const { isDocked, mobileOpen, toggleMobile, closeMobile } = useHeaderScroll()
  const shouldReduceMotion = useReducedMotion()

  const isProjects = pathname === "/projects"
  const itemVariants = shouldReduceMotion ? mobileStaggerItemReduced : mobileStaggerItem
  const panelOffset = isDocked ? 8 : -8

  return (
    <header
      id="header"
      className={cn(
        "fixed left-1/2 z-[200] h-auto w-auto max-w-[calc(100vw-2rem)] min-h-[60px] -translate-x-1/2 rounded-[14px] border border-nav-dock-border bg-nav-dock-bg p-1.5",
        "transition-[top,bottom,transform,border-color,min-height,padding] duration-[550ms] ease-brand",
        isDocked ? "top-auto bottom-5" : "top-5 bottom-auto",
        "max-sm:min-h-[52px] max-sm:p-[5px_6px]"
      )}
    >
      <nav className="flex h-auto w-auto items-center justify-start gap-[5px]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-[0.65rem] font-sans font-semibold tracking-[-0.01em]"
          aria-label={`${site.name} home`}
          onClick={closeMobile}
        >
          <span className="flex items-center justify-center rounded-[7px] bg-[#222] px-2.5 py-1.5 transition-[padding] duration-[550ms] ease-brand">
            <Image
              className="h-10 w-10 rounded-full border-none object-contain transition-[width,height] duration-[550ms] ease-brand"
              src="/logo.png"
              alt=""
              width={36}
              height={36}
            />
          </span>
          <span className="hidden text-[1.15rem]">
            ermili<span className="text-brand-accent">.</span>dev
          </span>
        </Link>

        <motion.button
          type="button"
          className="ml-auto hidden cursor-pointer flex-col gap-[7px] border-none bg-transparent p-1 max-sm:flex"
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.15, ease }}
        >
          <motion.span
            className="block h-[1.5px] w-[26px] origin-center bg-nav-dock-text"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 4 : 0,
                  }
            }
            transition={{ duration: 0.3, ease }}
          />
          <motion.span
            className="block h-[1.5px] w-[26px] origin-center bg-nav-dock-text"
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -4 : 0,
                  }
            }
            transition={{ duration: 0.3, ease }}
          />
        </motion.button>

        <div
          className="hidden items-center gap-[5px] sm:flex"
          id="navLinks"
        >
          <NavLinks isProjects={isProjects} onNavigate={closeMobile} />
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-nav"
              id="navLinksMobile"
              className={cn(
                "fixed left-1/2 flex w-[min(280px,calc(100vw-2rem))] -translate-x-1/2 flex-col items-stretch gap-3 rounded-[14px] border border-nav-dock-border bg-nav-dock-bg p-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:hidden",
                isDocked
                  ? "top-auto bottom-[calc(1.25rem+62px+0.75rem)]"
                  : "top-24 bottom-auto"
              )}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: panelOffset }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: panelOffset }
              }
              transition={{ duration: 0.4, ease }}
            >
              <motion.div
                className="flex flex-col items-stretch gap-3"
                variants={mobileStaggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
              >
                <NavLinks
                  isProjects={isProjects}
                  onNavigate={closeMobile}
                  itemVariants={itemVariants}
                  mobile
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
