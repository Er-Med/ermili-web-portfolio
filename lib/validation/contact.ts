import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { z } from "zod/v4"

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .max(30, "Phone number is too long."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be at most 5000 characters."),
  turnstileToken: z.string().min(1, "Please complete the verification."),
})

export type ContactFormData = z.infer<typeof contactSchema>

export function useContactSchema() {
  const t = useTranslations("validation")

  return useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, t("nameMin"))
          .max(100, t("nameMax")),
        email: z.email(t("emailInvalid")),
        phone: z
          .string()
          .max(30, t("phoneTooLong")),
        message: z
          .string()
          .min(10, t("messageMin"))
          .max(5000, t("messageMax")),
        turnstileToken: z.string().min(1, t("turnstile")),
      }),
    [t],
  )
}
