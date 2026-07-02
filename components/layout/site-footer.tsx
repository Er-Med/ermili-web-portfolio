import Link from "next/link"

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container-wide footer-inner">
        <p className="footer-copy label-mono">
          BUILT WITH INTENT · &copy; {year} ermili.dev
        </p>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/#about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms &amp; conditions</Link>
        </nav>
        <Link href="/#about" className="back-top label-mono" aria-label="Back to top">
          Back to top ↑
        </Link>
      </div>
    </footer>
  )
}
