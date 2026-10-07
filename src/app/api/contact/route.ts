import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 4000;

// Best-effort, per-instance throttle. On serverless hosts each instance keeps
// its own counts, so treat this as a speed bump rather than real protection.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ");
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const fail = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }
  if (!body || typeof body !== "object") return fail("Invalid request.", 400);

  // Honeypot field: real visitors never see it, so a value means a bot. Pretend it worked.
  if (text(body.company)) return NextResponse.json({ ok: true });

  const name = singleLine(text(body.name));
  const email = text(body.email);
  const topic = singleLine(text(body.topic));
  const message = text(body.message);

  if (!name || name.length > 80) return fail("Please add your name.", 400);
  if (!EMAIL_RE.test(email) || email.length > 200)
    return fail("Please add a valid email address.", 400);
  if (topic.length > 60) return fail("Invalid topic.", 400);
  if (!message) return fail("Please add a message.", 400);
  if (message.length > MAX_MESSAGE)
    return fail(`Please keep the message under ${MAX_MESSAGE} characters.`, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return fail("The contact form isn't set up yet.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("Too many messages — please try again in a few minutes.", 429);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio: ${name} — ${topic || "new message"}`,
    text: `From: ${name} <${email}>\nAbout: ${topic || "—"}\n\n${message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#12130f">
        <p style="margin:0 0 4px"><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p>
        <p style="margin:0 0 20px;color:#5e6056">Wants to talk about: ${escapeHtml(topic || "—")}</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>`,
  });

  if (error) {
    console.error("Contact form: Resend rejected the email.", error);
    return fail("The message couldn't be sent right now.", 502);
  }

  return NextResponse.json({ ok: true });
}
