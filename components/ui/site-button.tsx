import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"

import { cn } from "@/lib/utils"

const siteButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-7 py-3.5 text-sm font-medium transition-colors active:scale-[0.98]",
  {
    variants: {
      variant: {
        accent: "bg-brand-accent text-brand-on-dark hover:bg-[#1a1a1a]",
        outline:
          "border border-black/12 bg-brand-bg-2 text-brand-text hover:border-black/22 hover:bg-brand-bg",
        "light-outline":
          "border border-white/12 bg-transparent text-brand-on-dark hover:border-brand-accent",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "accent",
      full: false,
    },
  }
)

type SiteButtonProps = VariantProps<typeof siteButtonVariants> & {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function SiteButton({
  href,
  children,
  variant,
  full,
  className,
  onClick,
}: SiteButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(siteButtonVariants({ variant, full }), className)}
    >
      {children}
    </Link>
  )
}

type SiteButtonSubmitProps = VariantProps<typeof siteButtonVariants> & {
  children: React.ReactNode
  className?: string
}

export function SiteButtonSubmit({
  children,
  variant,
  full,
  className,
}: SiteButtonSubmitProps) {
  return (
    <button
      type="submit"
      className={cn(siteButtonVariants({ variant, full }), className)}
    >
      {children}
    </button>
  )
}
