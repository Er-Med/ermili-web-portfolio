import { cn } from "@/lib/utils"

type EyebrowProps = {
  children: React.ReactNode
  className?: string
  centered?: boolean
  light?: boolean
}

export function Eyebrow({ children, className, centered, light }: EyebrowProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase",
        light
          ? "text-brand-faint before:bg-brand-faint"
          : "text-brand-accent before:bg-brand-accent",
        "before:h-px before:w-[18px] before:shrink-0 before:content-['']",
        centered && "justify-center",
        className
      )}
    >
      {children}
    </span>
  )
}
