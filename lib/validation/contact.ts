export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export type ContactFormData = {
  name: string
  email: string
  message: string
}

export function validateContactForm(data: ContactFormData): string | null {
  if (!data.name || !data.email || !data.message) {
    return "Please fill in all fields."
  }

  if (!isValidEmail(data.email)) {
    return "Please enter a valid email address."
  }

  return null
}
