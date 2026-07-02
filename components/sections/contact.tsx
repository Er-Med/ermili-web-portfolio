"use client"

import { type FormEvent, useState } from "react"

import { site } from "@/content/site"
import { validateContactForm } from "@/lib/validation/contact"

export function Contact() {
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus({ type: "", message: "" })

    const form = event.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    }

    const error = validateContactForm(data)
    if (error) {
      setStatus({ type: "error", message: error })
      return
    }

    const subject = encodeURIComponent(`Website inquiry from ${data.name}`)
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`

    setStatus({ type: "success", message: "Opening your email client…" })
    form.reset()
  }

  return (
    <section className="section section--dark contact" id="contact">
      <div className="container-wide contact-grid">
        <div className="contact-intro reveal">
          <span className="eyebrow eyebrow--light">Contact</span>
          <h2 className="section-title section-title--light">Ready to move forward?</h2>
          <p className="section-sub section-sub--light">
            If you&apos;re exploring a new website or want expert guidance, I&apos;m here to
            help you make the right decision.
          </p>
          <div className="contact-actions">
            <a href={`mailto:${site.email}`} className="btn btn-accent">
              Contact me
            </a>
            <a href="/#book" className="btn btn-light-outline">
              Book a call
            </a>
          </div>
          <div className="contact-socials">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email">
              Email
            </a>
          </div>
        </div>
        <form
          className="contact-form reveal"
          id="contactForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="name" className="label-mono label-mono--light">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-mono label-mono--light">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="label-mono label-mono--light">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <button type="submit" className="btn btn-accent btn-full">
            Send message
          </button>
          <p
            className={`form-status${status.type ? ` ${status.type}` : ""}`}
            id="formStatus"
            role="status"
            aria-live="polite"
          >
            {status.message}
          </p>
        </form>
      </div>
    </section>
  )
}
