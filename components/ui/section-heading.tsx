import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  subtitle?: string
  as?: "h1" | "h2"
  light?: boolean
  centered?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  as: Tag = "h2",
  light,
  centered,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      <Tag
        className={cn(
          "mt-3 font-sans text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-tight tracking-tight",
          light ? "text-brand-on-dark" : "text-brand-text"
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-[48ch] text-base leading-relaxed",
            centered && "mx-auto",
            light ? "text-brand-faint" : "text-brand-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
