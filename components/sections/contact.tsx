"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { BrandCta } from "@/components/ui/brand-cta"
import { site } from "@/content/site"
import { contactSchema, type ContactFormData } from "@/lib/validation/contact"

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback"?: () => void
          "error-callback"?: () => void
          theme?: "light" | "dark" | "auto"
        },
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""

export function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    clearErrors,
  } = useForm<ContactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(contactSchema as any),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      turnstileToken: "",
    },
  })

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return

    const interval = setInterval(() => {
      if (window.turnstile) {
        setTurnstileReady(true)
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!turnstileReady || !turnstileRef.current || !TURNSTILE_SITE_KEY) return
    if (widgetIdRef.current !== null) return

    widgetIdRef.current = window.turnstile!.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        setValue("turnstileToken", token, { shouldValidate: true })
        clearErrors("turnstileToken")
      },
      "expired-callback": () => {
        setValue("turnstileToken", "", { shouldValidate: false })
      },
      "error-callback": () => {
        setValue("turnstileToken", "", { shouldValidate: false })
      },
      theme: "dark",
    })

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [turnstileReady, setValue, clearErrors])

  const resetTurnstile = useCallback(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
    setValue("turnstileToken", "", { shouldValidate: false })
  }, [setValue])

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        toast.error(json.error ?? "Something went wrong.")
        resetTurnstile()
        return
      }

      toast.success(json.message ?? "Message sent successfully!")
      reset()
      resetTurnstile()
    } catch {
      toast.error("Network error. Please check your connection and try again.")
      resetTurnstile()
    }
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
            <BrandCta href={`mailto:${site.email}`} variant="primary">
              Contact me
            </BrandCta>
            <BrandCta href="/#book" variant="ghost" arrow>
              Book a call
            </BrandCta>
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-group">
            <label htmlFor="name" className="label-mono label-mono--light">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="field-error" role="alert">{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label-mono label-mono--light">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="field-error" role="alert">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="label-mono label-mono--light">
              Phone <span className="label-optional">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+1 (555) 000-0000"
              autoComplete="tel"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="field-error" role="alert">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message" className="label-mono label-mono--light">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell me about your project..."
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className="field-error" role="alert">{errors.message.message}</p>
            )}
          </div>

          <div className="turnstile-wrapper" ref={turnstileRef} />
          {errors.turnstileToken && (
            <p className="field-error" role="alert" style={{ marginBottom: "1rem" }}>
              {errors.turnstileToken.message}
            </p>
          )}

          <BrandCta
            as="button"
            type="submit"
            variant="primary"
            full
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </BrandCta>
        </form>
      </div>
    </section>
  )
}
