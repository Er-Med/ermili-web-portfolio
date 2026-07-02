import Link from "next/link"

export function HeroActions() {
  return (
    <>
      <Link href="/#book" className="btn btn-accent">
        Book a call
      </Link>
      <Link href="/projects" className="btn btn-outline">
        View work
      </Link>
    </>
  )
}
