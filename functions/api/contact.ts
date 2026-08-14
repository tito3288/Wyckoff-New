/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * Receives the contact form as JSON and forwards it to Resend via native
 * fetch — no Resend SDK and no Astro Cloudflare adapter required.
 *
 * Configure in the Cloudflare Pages dashboard (Settings → Environment variables):
 *   RESEND_API_KEY     — Resend API key
 *   RESEND_FROM_EMAIL  — verified sender, e.g. "Wyckoff Consulting <hello@wyckoffconsulting.com>"
 *   CONTACT_TO_EMAIL   — comma-separated inboxes where inquiries are delivered (max 50)
 */

interface ContactEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
}

interface PagesContext {
  request: Request;
  env: ContactEnv;
}

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  revenue?: string;
  message?: string;
  website?: string; // honeypot — real users never fill this
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseRecipientEmails(value: string): string[] {
  return value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  // Honeypot: pretend success so bots learn nothing.
  if (payload.website) {
    return json({ ok: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const company = payload.company?.trim() ?? "";
  const revenue = payload.revenue?.trim() ?? "";

  if (!name || !email || !message) {
    return json({ error: "Name, email, and message are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return json({ error: "Please enter a valid email address." }, 400);
  }
  if (name.length > 200 || company.length > 200 || message.length > 5000) {
    return json({ error: "One of the fields is too long." }, 400);
  }

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_TO_EMAIL } = env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    return json({ error: "The contact form is not configured yet." }, 500);
  }

  const recipients = parseRecipientEmails(CONTACT_TO_EMAIL);
  if (recipients.length === 0 || recipients.length > 50) {
    return json({ error: "The contact form is not configured yet." }, 500);
  }

  const html = `
    <h2>New inquiry from wyckoffconsulting.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company) || "—"}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Annual revenue:</strong> ${escapeHtml(revenue) || "—"}</p>
    <p><strong>What's changed:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: recipients,
      reply_to: email,
      subject: `New inquiry — ${name}${company ? ` (${company})` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    return json({ error: "We couldn't send your message. Please try again." }, 502);
  }

  return json({ ok: true });
}
