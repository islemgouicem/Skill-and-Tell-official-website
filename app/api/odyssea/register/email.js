import nodemailer from "nodemailer";
import { buildHtml, buildText } from "./email_template";

/**
 * Delivery for the Odyssea confirmation.
 *
 * Two transports, picked automatically:
 *   1. SMTP  — the club's own Google account (skill.and.tell@ensia.edu.dz).
 *              Used whenever ODYSSEA_SMTP_USER and ODYSSEA_SMTP_PASSWORD exist.
 *   2. Resend — HTTP API fallback, so nothing breaks if SMTP is unset.
 *
 * Nothing here ever logs a password or an API key.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Google shows app passwords as "abcd efgh ijkl mnop" — the spaces are display only. */
const cleanPassword = (value) => String(value ?? "").replace(/\s+/g, "");

export function smtpConfig() {
  const user = (process.env.ODYSSEA_SMTP_USER ?? "").trim();
  const pass = cleanPassword(process.env.ODYSSEA_SMTP_PASSWORD);
  if (!user || !pass) return null;

  const port = Number(process.env.ODYSSEA_SMTP_PORT ?? 465);

  return {
    host: (process.env.ODYSSEA_SMTP_HOST ?? "smtp.gmail.com").trim(),
    port,
    secure: port === 465, // 465 = implicit TLS, 587 = STARTTLS
    auth: { user, pass },
    pool: false,
    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  };
}

let cachedTransport = null;

function transport() {
  if (!cachedTransport) {
    const config = smtpConfig();
    if (!config) return null;
    cachedTransport = nodemailer.createTransport(config);
  }
  return cachedTransport;
}

/** Logs in to the SMTP server without sending anything — used by the health check. */
export async function verifySmtp() {
  const mailer = transport();
  if (!mailer) return { configured: false };

  try {
    await mailer.verify();
    return { configured: true, ok: true, host: smtpConfig().host, user: smtpConfig().auth.user };
  } catch (error) {
    const message = error?.message ?? String(error);
    return {
      configured: true,
      ok: false,
      error: message,
      hint: /invalid login|username and password not accepted|535/i.test(message)
        ? "Google refused the login. The password must be a 16-character App Password (Google Account → Security → 2-Step Verification → App passwords), not the account password, and 2-Step Verification must be on."
        : /timeout|ETIMEDOUT|ECONNREFUSED/i.test(message)
          ? "Could not reach the SMTP server. Check the host and port (smtp.gmail.com, 465 for SSL or 587 for STARTTLS) and that the network allows outbound SMTP."
          : "See the message above.",
    };
  }
}

async function sendWithSmtp(from, to, replyTo, subject, html, text) {
  const mailer = transport();
  const info = await mailer.sendMail({
    from,
    to,
    replyTo,
    subject,
    html,
    text,
    headers: {
      "X-Entity-Ref-ID": `odyssea-${Date.now()}`,
      "Auto-Submitted": "auto-generated",
    },
  });

  return { ok: true, id: info?.messageId ?? null, via: "smtp" };
}

async function sendWithResend(from, to, replyTo, subject, html, text) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[odyssea] no SMTP and no RESEND_API_KEY — confirmation not sent");
    return { ok: false, skipped: true };
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      html,
      text,
      tags: [{ name: "event", value: "odyssea" }],
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("[odyssea] resend rejected the email", response.status, detail.slice(0, 300));
    return { ok: false };
  }

  const data = await response.json().catch(() => ({}));
  return { ok: true, id: data?.id ?? null, via: "resend" };
}

/**
 * Works out the link that goes in the email.
 *
 * ODYSSEA_SITE_URL gets pasted as whichever URL is in front of whoever set it:
 * the bare origin, the event page itself, with or without a trailing slash.
 * The template used to append "/register/odyssea" unconditionally, so an env
 * var already ending in it produced .../register/odyssea/register/odyssea.
 * Parsing the value and rebuilding the path means every spelling lands on the
 * same, correct URL.
 */
export function resolveSiteUrls(raw) {
  const FALLBACK = "https://www.skillntell.com";
  let value = String(raw ?? "").trim() || FALLBACK;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    parsed = new URL(FALLBACK);
  }

  // drop a trailing /register/odyssea (however many times it was pasted) and any
  // trailing slash, so what is left is the site root the event hangs off
  let base = parsed.pathname.replace(/\/+$/, "");
  let previous;
  do {
    previous = base;
    base = base.replace(/\/register\/odyssea$/i, "");
  } while (base !== previous);

  const siteUrl = `${parsed.origin}${base}`;
  return { siteUrl, eventUrl: `${siteUrl}/register/odyssea` };
}

export async function sendConfirmationEmail(details) {
  const contactEmail = process.env.ODYSSEA_CONTACT_EMAIL ?? "skill.and.tell@ensia.edu.dz";
  const smtp = smtpConfig();

  // Gmail rewrites a From it does not own, so default to the mailbox we log in as
  const from =
    (process.env.ODYSSEA_FROM_EMAIL ?? "").trim() ||
    (smtp ? `Odyssea by Skill&Tell <${smtp.auth.user}>` : "");

  if (!from) {
    console.warn("[odyssea] no sender configured — confirmation not sent");
    return { ok: false, skipped: true };
  }

  const payload = {
    ...details,
    ...resolveSiteUrls(process.env.ODYSSEA_SITE_URL),
    contactEmail,
  };

  const subject = `Odyssea — we received your registration (${details.reference})`;
  const html = buildHtml(payload);
  const text = buildText(payload);

  try {
    if (smtp) {
      return await sendWithSmtp(from, details.to, contactEmail, subject, html, text);
    }
    return await sendWithResend(from, details.to, contactEmail, subject, html, text);
  } catch (error) {
    console.error("[odyssea] sending the confirmation failed:", error?.message ?? error);
    return { ok: false, error: error?.message ?? String(error) };
  }
}
