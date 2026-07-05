"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Reveal } from "@/components/motion/reveal";
import { BrandCta } from "@/components/ui/brand-cta";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { useContactSchema, type ContactFormData } from "@/lib/validation/contact";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const fieldClass =
  "w-full resize-y rounded border border-white/[0.12] bg-white/[0.04] px-4 py-[0.85rem] font-sans text-[0.95rem] text-brand-bg transition-colors duration-300 placeholder:text-[#555] focus:border-brand-accent focus:outline-none";

const labelClass =
  "mb-2 block font-mono text-[0.7rem] font-medium tracking-[0.12em] uppercase text-brand-faint";

const fieldErrorClass = "mt-[0.35rem] text-[0.8rem] text-[#e88]";

const socialLinkClass =
  "font-mono text-[0.7rem] tracking-[0.1em] uppercase text-brand-faint transition-colors duration-300 hover:text-brand-accent";

export function Contact() {
  const t = useTranslations("contact");
  const schema = useContactSchema();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    clearErrors,
  } = useForm<ContactFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      turnstileToken: "",
    },
  });

  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    const interval = setInterval(() => {
      if (window.turnstile) {
        setTurnstileReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!turnstileReady || !turnstileRef.current || !TURNSTILE_SITE_KEY) return;
    if (widgetIdRef.current !== null) return;

    widgetIdRef.current = window.turnstile!.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        setValue("turnstileToken", token, { shouldValidate: true });
        clearErrors("turnstileToken");
      },
      "expired-callback": () => {
        setValue("turnstileToken", "", { shouldValidate: false });
      },
      "error-callback": () => {
        setValue("turnstileToken", "", { shouldValidate: false });
      },
      theme: "dark",
    });

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [turnstileReady, setValue, clearErrors]);

  const resetTurnstile = useCallback(() => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setValue("turnstileToken", "", { shouldValidate: false });
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.error ?? t("genericError"));
        resetTurnstile();
        return;
      }

      toast.success(json.message ?? t("success"));
      reset();
      resetTurnstile();
    } catch {
      toast.error(t("networkError"));
      resetTurnstile();
    }
  };

  return (
    <section
      id="contact"
      className="section--dark bg-brand-dark py-24 text-brand-on-dark max-sm:py-16"
    >
      <Container className="grid grid-cols-2 items-start gap-16 max-[960px]:grid-cols-1">
        <Reveal>
          <div>
            <Eyebrow light>{t("eyebrow")}</Eyebrow>
            <SectionHeading light title={t("title")} subtitle={t("subtitle")} />
            <div className="mt-8 flex flex-wrap gap-4">
              <BrandCta href={`mailto:${site.email}`} variant="primary">
                {t("contactMe")}
              </BrandCta>
              <BrandCta href="/#contactForm" variant="ghost" arrow>
                {t("bookCall")}
              </BrandCta>
            </div>
            <div className="mt-10 flex gap-6 border-t border-white/[0.12] pt-8">
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("linkedin")}
                className={socialLinkClass}
              >
                {t("linkedin")}
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label={t("email")}
                className={socialLinkClass}
              >
                {t("email")}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            id="contactForm"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="rounded border border-white/[0.12] bg-brand-dark p-8"
          >
            <div className="mb-5">
              <label htmlFor="name" className={labelClass}>
                {t("form.name")}
              </label>
              <input
                type="text"
                id="name"
                placeholder={t("form.namePlaceholder")}
                autoComplete="name"
                aria-invalid={!!errors.name}
                className={fieldClass}
                {...register("name")}
              />
              {errors.name && (
                <p className={fieldErrorClass} role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="email" className={labelClass}>
                {t("form.email")}
              </label>
              <input
                type="email"
                id="email"
                placeholder={t("form.emailPlaceholder")}
                autoComplete="email"
                aria-invalid={!!errors.email}
                className={fieldClass}
                {...register("email")}
              />
              {errors.email && (
                <p className={fieldErrorClass} role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="phone" className={labelClass}>
                {t("form.phone")}{" "}
                <span className="font-normal opacity-60">
                  {t("form.phoneOptional")}
                </span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder={t("form.phonePlaceholder")}
                autoComplete="tel"
                className={fieldClass}
                {...register("phone")}
              />
              {errors.phone && (
                <p className={fieldErrorClass} role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="message" className={labelClass}>
                {t("form.message")}
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder={t("form.messagePlaceholder")}
                aria-invalid={!!errors.message}
                className={fieldClass}
                {...register("message")}
              />
              {errors.message && (
                <p className={fieldErrorClass} role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div ref={turnstileRef} className="mb-4" />
            {errors.turnstileToken && (
              <p className={`${fieldErrorClass} mb-4`} role="alert">
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
                  {t("form.sending")}
                </>
              ) : (
                t("form.send")
              )}
            </BrandCta>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
