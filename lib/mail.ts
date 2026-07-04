import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

type ContactMailPayload = {
  name: string
  email: string
  phone?: string
  message: string
  ip?: string
}

export async function sendContactEmail(payload: ContactMailPayload) {
  const { name, email, phone, message, ip } = payload
  const date = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "UTC",
  })

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Message:\n${message}`,
    `\n---`,
    `Submitted: ${date} (UTC)`,
    ip ? `IP: ${ip}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <h2 style="color:#1a1a1a;margin-bottom:24px">New Contact Form Submission</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top;width:100px">Name</td>
          <td style="padding:8px 12px;color:#1a1a1a">${escapeHtml(name)}</td>
        </tr>
        <tr style="background:#f9f9f9">
          <td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top">Email</td>
          <td style="padding:8px 12px;color:#1a1a1a">
            <a href="mailto:${escapeHtml(email)}" style="color:#2563eb">${escapeHtml(email)}</a>
          </td>
        </tr>
        ${
          phone
            ? `<tr>
          <td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top">Phone</td>
          <td style="padding:8px 12px;color:#1a1a1a">${escapeHtml(phone)}</td>
        </tr>`
            : ""
        }
        <tr style="background:#f9f9f9">
          <td style="padding:8px 12px;font-weight:600;color:#555;vertical-align:top">Message</td>
          <td style="padding:8px 12px;color:#1a1a1a;white-space:pre-wrap">${escapeHtml(message)}</td>
        </tr>
      </table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee" />
      <p style="font-size:12px;color:#999">
        Submitted on ${date} (UTC)${ip ? ` &middot; IP: ${escapeHtml(ip)}` : ""}
      </p>
    </div>
  `

  await transporter.sendMail({
    from: `"Ermili Contact Form" <${process.env.EMAIL_USER}>`,
    replyTo: `"${name}" <${email}>`,
    to: process.env.EMAIL_TO,
    subject: `New message from ${name} — ermili.dev`,
    text,
    html,
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
