import { cn } from "@/lib/utils"

type EyebrowProps = {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function Eyebrow({ children, className, centered }: EyebrowProps) {
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 font-mono text-xs tracking-widest uppercase text-brand-accent",
        "before:h-px before:w-[18px] before:shrink-0 before:bg-brand-accent before:content-['']",
        centered && "justify-center",
        className
      )}
    >
      {children}
    </span>
  )
}
