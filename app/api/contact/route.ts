import { type NextRequest, NextResponse } from "next/server"

import { sendContactEmail } from "@/lib/mail"
import { verifyTurnstileToken } from "@/lib/turnstile"
import { contactSchema } from "@/lib/validation/contact"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const firstError = result.error.issues[0]?.message ?? "Invalid input."
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 },
      )
    }

    const { name, email, phone, message, turnstileToken } = result.data

    const ip =
      request.headers.get("cf-connecting-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      undefined

    const turnstile = await verifyTurnstileToken(turnstileToken, ip)
    if (!turnstile.success) {
      return NextResponse.json(
        { success: false, error: turnstile.error },
        { status: 400 },
      )
    }

    await sendContactEmail({ name, email, phone, message, ip })

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 },
    )
  } catch (error) {
    console.error("[contact] Failed to process submission:", error)
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 },
    )
  }
}
