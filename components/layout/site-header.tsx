"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import {
  useLogoTransition,
  LOGO_MORPH_TRANSITION,
} from "@/components/motion/logo-transition";
import { site } from "@/content/site";
import { useActiveSection, type SectionId } from "@/hooks/use-active-section";
import { useFooterVisibility } from "@/hooks/use-footer-visibility";
import { useHeaderScroll } from "@/hooks/use-header-scroll";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const showTransition = {
  opacity: { duration: 0.5, ease },
  y: { type: "spring" as const, stiffness: 240, damping: 26, mass: 0.8 },
  scale: { type: "spring" as const, stiffness: 280, damping: 24, mass: 0.7 },
  filter: { duration: 0.55, ease },
};

const hideTransition = {
  opacity: { duration: 0.3, ease },
  y: { duration: 0.35, ease },
  scale: { duration: 0.3, ease },
  filter: { duration: 0.25, ease },
};

const footerHideTransition = {
  opacity: { duration: 0.4, ease },
  y: { duration: 0.45, ease },
  scale: { duration: 0.4, ease },
  filter: { duration: 0.35, ease },
  pointerEvents: { duration: 0 },
};

type NavItem = {
  labelKey: "about" | "projects" | "process" | "faq" | "contact";
  href: string;
  sectionId?: SectionId;
  isPage?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { labelKey: "about", href: "/#about", sectionId: "about" },
  { labelKey: "projects", href: "/projects", sectionId: "projects", isPage: true },
  { labelKey: "process", href: "/#process", sectionId: "process" },
  { labelKey: "faq", href: "/#faq", sectionId: "faq" },
  { labelKey: "contact", href: "/#contact", sectionId: "contact" },
];

const mobileStaggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
  exit: {
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const mobileStaggerItem = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease },
  },
  exit: {
    opacity: 0,
    y: -4,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease },
  },
};

const mobileStaggerItemReduced = {
  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0 },
};

function LanguageSwitcher({ compact }: { compact?: boolean; }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("nav");

  const switchLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      router.replace(pathname, { locale: newLocale });
    },
    [locale, pathname, router],
  );

  return (
    <div
      className={cn(
        "relative flex items-center gap-0 rounded-full border border-white/[0.08] bg-white/[0.04] p-[3px]",
        compact && "w-full justify-center",
      )}
      role="radiogroup"
      aria-label={t("language")}
    >
      <motion.div
        className="absolute inset-y-[3px] rounded-full bg-white/[0.12]"
        initial={false}
        animate={{
          left: locale === "en" ? 3 : "calc(50% + 1px)",
          right: locale === "en" ? "calc(50% + 1px)" : 3,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 400, damping: 30 }
        }
      />
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={locale === l}
          onClick={() => switchLocale(l)}
          className={cn(
            "relative z-[1] cursor-pointer border-none bg-transparent px-[10px] py-[5px] font-sans text-[0.7rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300",
            locale === l
              ? "text-white"
              : "text-white/40 hover:text-white/65",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function NavLink({
  item,
  isActive,
  isProjects,
  onNavigate,
}: {
  item: NavItem;
  isActive: boolean;
  isProjects: boolean;
  onNavigate: () => void;
}) {
  const t = useTranslations("nav");
  const shouldReduceMotion = useReducedMotion();
  const href =
    item.isPage
      ? item.href
      : isProjects
        ? item.href
        : item.href.replace("/#", "#");

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center rounded-lg px-3.5 py-2 text-[0.8rem] font-normal tracking-[-0.006em] whitespace-nowrap transition-colors duration-300",
        isActive
          ? "text-white"
          : "text-white/60 hover:text-white/90",
      )}
      aria-current={
        item.isPage && isProjects ? "page" : isActive ? "true" : undefined
      }
      onClick={onNavigate}
    >
      {t(item.labelKey)}

      {isActive && (
        <motion.span
          className="absolute inset-x-3 -bottom-[3px] h-[1.5px] rounded-full bg-white/70"
          layoutId="nav-indicator"
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                type: "spring",
                stiffness: 380,
                damping: 30,
                mass: 0.8,
              }
          }
        />
      )}

      <span className="pointer-events-none absolute inset-0 rounded-lg bg-white/0 transition-[background-color] duration-300 group-hover:bg-white/[0.06]" />
    </Link>
  );
}

function MobileNavLink({
  item,
  isActive,
  isProjects,
  onNavigate,
  variants,
}: {
  item: NavItem;
  isActive: boolean;
  isProjects: boolean;
  onNavigate: () => void;
  variants: typeof mobileStaggerItem | typeof mobileStaggerItemReduced;
}) {
  const t = useTranslations("nav");
  const href =
    item.isPage
      ? item.href
      : isProjects
        ? item.href
        : item.href.replace("/#", "#");

  return (
    <motion.div variants={variants}>
      <Link
        href={href}
        className={cn(
          "flex w-full items-center rounded-xl px-4 py-3 text-[0.85rem] font-normal tracking-[-0.006em] transition-colors duration-300",
          isActive
            ? "bg-white/[0.08] text-white"
            : "text-white/60 hover:bg-white/[0.05] hover:text-white/90",
        )}
        onClick={onNavigate}
      >
        {t(item.labelKey)}
        {isActive && (
          <span className="ml-auto h-1 w-1 rounded-full bg-white/70" />
        )}
      </Link>
    </motion.div>
  );
}

function CtaButton({
  onClick,
  mobile,
}: {
  onClick: () => void;
  mobile?: boolean;
}) {
  const t = useTranslations("nav");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.02, y: -1 }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        href="/#contact"
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-white/[0.06] bg-[#efeeec] px-5 py-2.5 text-[0.8rem] font-medium tracking-[-0.01em] whitespace-nowrap text-[#141414] transition-all duration-300",
          "hover:bg-white hover:shadow-[0_2px_20px_rgba(255,255,255,0.08)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          mobile && "w-full justify-center py-3 text-[0.85rem]",
        )}
        onClick={onClick}
      >
        {t("bookCall")}
      </Link>
    </motion.div>
  );
}

function NavLogo({
  isHeroLogoActive,
  onClick,
}: {
  isHeroLogoActive: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("nav");
  const shouldReduceMotion = useReducedMotion();
  const logoScale = useMotionValue(1);

  const handleHoverStart = useCallback(() => {
    if (!shouldReduceMotion) logoScale.set(1.04);
  }, [shouldReduceMotion, logoScale]);

  const handleHoverEnd = useCallback(() => {
    logoScale.set(1);
  }, [logoScale]);

  return (
    <Link
      href="/"
      className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:rounded-lg"
      aria-label={t("home", { siteName: site.name })}
      onClick={onClick}
    >
      <motion.span
        className="flex items-center justify-center rounded-xl bg-[#1e1e1e] p-2 transition-colors duration-300 hover:bg-[#272727]"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        style={{ scale: logoScale }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 20 }
        }
      >
        {!isHeroLogoActive ? (
          <motion.div
            layoutId="brand-logo"
            className="h-8 w-8"
            transition={LOGO_MORPH_TRANSITION}
          >
            <Image
              className="h-full w-full rounded-full border-none object-contain"
              src="/logo.png"
              alt=""
              width={32}
              height={32}
            />
          </motion.div>
        ) : (
          <Image
            className="h-8 w-8 rounded-full border-none object-contain"
            src="/logo.png"
            alt=""
            width={32}
            height={32}
          />
        )}
      </motion.span>
    </Link>
  );
}

function Hamburger({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="ml-auto hidden cursor-pointer flex-col gap-[6px] border-none bg-transparent p-2 max-sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:rounded-md"
      aria-label="Toggle menu"
      aria-expanded={open}
      onClick={onToggle}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
      transition={{ duration: 0.15, ease }}
    >
      <motion.span
        className="block h-[1.5px] w-[22px] origin-center rounded-full bg-white/80"
        animate={
          shouldReduceMotion
            ? undefined
            : {
              rotate: open ? 45 : 0,
              y: open ? 3.75 : 0,
            }
        }
        transition={{ duration: 0.3, ease }}
      />
      <motion.span
        className="block h-[1.5px] w-[22px] origin-center rounded-full bg-white/80"
        animate={
          shouldReduceMotion
            ? undefined
            : {
              rotate: open ? -45 : 0,
              y: open ? -3.75 : 0,
            }
        }
        transition={{ duration: 0.3, ease }}
      />
    </motion.button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { isDocked, mobileOpen, toggleMobile, closeMobile } = useHeaderScroll();
  const isFooterVisible = useFooterVisibility();
  const shouldReduceMotion = useReducedMotion();
  const activeSection = useActiveSection();

  const { isHeroLogoActive } = useLogoTransition();
  const isProjects = pathname === "/projects";
  const itemVariants = shouldReduceMotion
    ? mobileStaggerItemReduced
    : mobileStaggerItem;

  const isNavVisible = isDocked && !isFooterVisible;

  useEffect(() => {
    if (isFooterVisible) closeMobile();
  }, [isFooterVisible, closeMobile]);

  const isLinkActive = (item: NavItem) => {
    if (item.isPage && isProjects) return true;
    if (!isProjects && item.sectionId && activeSection === item.sectionId)
      return true;
    return false;
  };

  const visible = {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "auto" as const,
  };
  const hidden = {
    opacity: 0,
    y: 36,
    scale: 0.96,
    filter: "blur(6px)",
    pointerEvents: "none" as const,
  };
  const reducedVisible = {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "auto" as const,
  };
  const reducedHidden = {
    opacity: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "none" as const,
  };

  const navTransition = !isNavVisible
    ? isFooterVisible && isDocked
      ? footerHideTransition
      : hideTransition
    : showTransition;

  return (
    <motion.header
      id="header"
      className="pointer-events-none fixed bottom-6 left-1/2 z-[200] h-auto w-auto max-w-[calc(100vw-2rem)] -translate-x-1/2"
      style={{ willChange: "transform, opacity, filter" }}
      initial={shouldReduceMotion ? reducedHidden : hidden}
      animate={
        isNavVisible
          ? shouldReduceMotion
            ? reducedVisible
            : visible
          : shouldReduceMotion
            ? reducedHidden
            : hidden
      }
      transition={navTransition}
    >
      <nav
        className={cn(
          "flex h-auto w-auto items-center gap-1 rounded-2xl border border-white/[0.1] p-[5px]",
          "bg-[rgb(28_28_28_/_0.82)] shadow-[0_4px_24px_rgba(0,0,0,0.25),_0_0_0_0.5px_rgba(255,255,255,0.06)_inset] backdrop-blur-xl",
          "max-sm:min-h-[48px] max-sm:gap-0.5 max-sm:p-[4px]",
        )}
        role="navigation"
        aria-label="Main"
      >
        <NavLogo isHeroLogoActive={isHeroLogoActive} onClick={closeMobile} />

        <div className="hidden items-center sm:flex">
          <div className="mx-1 flex items-center gap-0.5 rounded-xl bg-white/[0.04] px-1 py-0.5">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.labelKey}
                item={item}
                isActive={isLinkActive(item)}
                isProjects={isProjects}
                onNavigate={closeMobile}
              />
            ))}
          </div>
        </div>

        <div
          className="mx-0.5 hidden h-5 w-px bg-white/[0.08] sm:block"
          aria-hidden="true"
        />

        <div className="hidden sm:flex">
          <LanguageSwitcher />
        </div>

        <div
          className="mx-0.5 hidden h-5 w-px bg-white/[0.08] sm:block"
          aria-hidden="true"
        />

        <div className="hidden sm:flex">
          <CtaButton onClick={closeMobile} />
        </div>

        <Hamburger open={mobileOpen} onToggle={toggleMobile} />
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-nav"
            className={cn(
              "pointer-events-auto absolute bottom-[calc(100%+10px)] left-1/2 w-[min(260px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.1] p-3 sm:hidden",
              "bg-[rgb(28_28_28_/_0.9)] shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl",
            )}
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 12, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 8, scale: 0.97 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.15 }
                : { duration: 0.35, ease }
            }
          >
            <motion.div
              className="flex flex-col gap-1"
              variants={mobileStaggerContainer}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {NAV_ITEMS.map((item) => (
                <MobileNavLink
                  key={item.labelKey}
                  item={item}
                  isActive={isLinkActive(item)}
                  isProjects={isProjects}
                  onNavigate={closeMobile}
                  variants={itemVariants}
                />
              ))}

              <motion.div
                variants={itemVariants}
                className="mx-2 my-1 h-px bg-white/[0.08]"
              />

              <motion.div variants={itemVariants}>
                <LanguageSwitcher compact />
              </motion.div>

              <motion.div variants={itemVariants} className="mt-1">
                <CtaButton onClick={closeMobile} mobile />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
