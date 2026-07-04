const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

type TurnstileResult = {
  success: boolean
  error?: string
}

export async function verifyTurnstileToken(
  token: string,
  ip?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured")
    return { success: false, error: "Server misconfigured." }
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    ...(ip ? { remoteip: ip } : {}),
  })

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })

  if (!res.ok) {
    return { success: false, error: "Verification service unavailable." }
  }

  const data = await res.json()
  if (!data.success) {
    return {
      success: false,
      error: "Verification failed. Please try again.",
    }
  }

  return { success: true }
}
