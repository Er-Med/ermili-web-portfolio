import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "section" | "header" | "footer" | "nav" | "article"
}

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-[min(1100px,92vw)]", className)}>{children}</Tag>
  )
}
