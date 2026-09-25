import { createClient } from "@supabase/supabase-js";
import { createHmac, randomUUID } from "node:crypto";
import { sendConfirmationEmail, smtpConfig, verifySmtp } from "./email";

/**
 * Odyssea registration endpoint.
 *
 * The browser never sees Supabase: it posts here, this runs on the server with
 * the service-role key, and the key can only reach ONE database function (see
 * supabase/migrations/20260921120000_odyssea_registrations.sql). Every field is
 * validated twice — here, and again inside that function.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE = /^\+?[0-9\s().-]{8,20}$/;
const URLISH = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

const MESSAGES = {
  duplicate_team_name: "A team with this name is already registered.",
  duplicate_email: "This email address is already registered for Odyssea.",
  rate_limited: "Too many attempts from this connection. Please try again in a few minutes.",
  registrations_closed: "Registrations for Odyssea are closed.",
  invalid_payload: "Some of the details are not valid. Please review the form.",
  server_error: "We could not register you right now. Please try again in a moment.",
};

/**
 * People copy the REST endpoint, or paste with quotes or a trailing slash.
 * Any of those is the same project, so normalise instead of failing.
 *   https://ref.supabase.co/rest/v1/  ->  https://ref.supabase.co
 */
function normalizeSupabaseUrl(value) {
  const cleaned = String(value ?? "").trim().replace(/^["']|["']$/g, "");
  const match = cleaned.match(/^https:\/\/([a-z0-9-]+)\.supabase\.(co|in|red)/i);
  return match ? `https://${match[1]}.supabase.${match[2]}` : "";
}

const text = (value, max) => String(value ?? "").trim().slice(0, max);

function fail(code, status = 400) {
  return Response.json({ ok: false, code, message: MESSAGES[code] ?? MESSAGES.server_error }, { status });
}

/** Never store a raw IP: only a keyed hash, so the log cannot be reversed. */
function hashIp(request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0].trim() || request.headers.get("x-real-ip") || "";
  if (!ip) return null;
  const salt = process.env.ODYSSEA_IP_SALT;
  if (!salt) return null;
  return createHmac("sha256", salt).update(ip).digest("hex").slice(0, 48);
}

function cleanPerson(source) {
  if (!source || typeof source !== "object") return null;

  const person = {
    full_name: text(source.full_name, 120),
    email: text(source.email, 160).toLowerCase(),
    university: text(source.university, 160),
    linkedin: text(source.linkedin, 240),
    phone: text(source.phone, 24),
    portfolio: text(source.portfolio, 240),
    year_of_study: text(source.year_of_study, 40),
    field_of_study: text(source.field_of_study, 120),
  };

  if (person.full_name.length < 3) return null;
  if (!EMAIL.test(person.email)) return null;
  if (person.university.length < 2) return null;
  if (!PHONE.test(person.phone)) return null;
  if (person.field_of_study.length < 2) return null;
  if (person.linkedin && (!URLISH.test(person.linkedin) || !/linkedin\./i.test(person.linkedin))) return null;
  if (person.portfolio && !URLISH.test(person.portfolio)) return null;

  return person;
}

export async function POST(request) {
  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim().replace(/^["']|["']$/g, "");

  if (!supabaseUrl || !serviceKey) {
    console.error("[odyssea] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set");
    return fail("server_error", 503);
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return fail("invalid_payload", 415);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return fail("invalid_payload", 413);
    body = JSON.parse(raw);
  } catch {
    return fail("invalid_payload");
  }

  // honeypot — answer like a success, tell the database nothing
  if (text(body.website, 50) !== "") {
    return Response.json({ ok: true, reference: "ODY-000000" });
  }

  const kind = body.registration_kind === "individual" ? "individual" : "team";
  const mode = body.participation_mode === "online" ? "online" : "onsite";
  const teamSize = kind === "individual" ? 1 : Number(body.team_size);
  const motivation = text(body.motivation, 1500);
  const discovery = text(body.discovery, 500);

  if (!Number.isInteger(teamSize) || teamSize < 1 || teamSize > 6) return fail("invalid_payload");
  if (motivation.length < 40) return fail("invalid_payload");
  if (body.privacy_consent !== true) return fail("invalid_payload");

  const leader = cleanPerson(body.leader);
  if (!leader) return fail("invalid_payload");

  const rawMembers = Array.isArray(body.members) ? body.members.slice(0, teamSize - 1) : [];
  if (rawMembers.length !== teamSize - 1) return fail("invalid_payload");

  const members = [];
  for (const raw of rawMembers) {
    const member = cleanPerson(raw);
    if (!member) return fail("invalid_payload");
    members.push(member);
  }

  const teamName = kind === "individual" ? leader.full_name : text(body.team_name, 80);
  if (teamName.length < 2) return fail("invalid_payload");

  const emails = [leader, ...members].map((person) => person.email);
  if (new Set(emails).size !== emails.length) return fail("duplicate_email");

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-odyssea-request": randomUUID() } },
  });

  const { data, error } = await supabase.rpc("odyssea_submit_registration", {
    payload: {
      registration_kind: kind,
      team_name: teamName,
      team_size: teamSize,
      participation_mode: mode,
      leader,
      members,
      discovery,
      motivation,
      privacy_consent: true,
      ip_hash: hashIp(request),
      user_agent: text(request.headers.get("user-agent"), 400),
    },
  });

  if (error) {
    console.error("[odyssea] rpc failed:", error.message, error.details ?? "", error.hint ?? "");
    if (process.env.NODE_ENV !== "production") {
      return Response.json(
        { ok: false, code: "server_error", message: `Supabase refused the call: ${error.message}` },
        { status: 502 },
      );
    }
    return fail("server_error", 502);
  }

  if (!data?.ok) {
    return fail(data?.code ?? "server_error", data?.code === "registrations_closed" ? 403 : 409);
  }

  // registration is safe in the database — the email must never fail the request
  let emailSent = false;
  try {
    const sent = await sendConfirmationEmail({
      to: leader.email,
      leaderName: leader.full_name,
      teamName,
      reference: data.reference,
      isTeam: kind === "team",
      mode,
      crew: [leader, ...members],
    });

    emailSent = sent.ok;

    if (sent.ok && data.registration_id) {
      await supabase.rpc("odyssea_mark_confirmation_sent", {
        p_registration_id: data.registration_id,
        p_confirmation_id: sent.id ?? null,
      });
    }
  } catch (mailError) {
    console.error("[odyssea] confirmation email failed", mailError?.message ?? mailError);
  }

  return Response.json({ ok: true, reference: data.reference, emailSent });
}

/**
 * Development-only health check: GET the endpoint and it audits its own
 * configuration — which variables are missing, which ones are the wrong shape,
 * and whether the database actually answers. It never prints a secret, and in
 * production it is just a 405 like any other wrong method.
 */
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false, code: "method_not_allowed" }, { status: 405 });
  }

  const rawUrl = process.env.SUPABASE_URL ?? "";
  const url = normalizeSupabaseUrl(rawUrl);
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim().replace(/^["']|["']$/g, "");
  const from = process.env.ODYSSEA_FROM_EMAIL ?? "";
  const checks = [];

  const check = (name, ok, hint) => checks.push({ name, ok, ...(ok ? {} : { hint }) });

  check("SUPABASE_URL", Boolean(url),
    `Could not read a project URL out of ${JSON.stringify(rawUrl)}. Expected https://<project-ref>.supabase.co (a /rest/v1 suffix is fine, it gets trimmed).`);

  const looksLikeKey = key.startsWith("eyJ") || key.startsWith("sb_secret_");
  const projectRef = url.replace(/^https:\/\//, "").split(".")[0];
  check("SUPABASE_SERVICE_ROLE_KEY", looksLikeKey && key.length > 40,
    key === projectRef
      ? `You pasted the project ref ("${projectRef}") instead of the key. The key is a long secret: Supabase dashboard → Project Settings (gear, bottom left) → API Keys → either "Secret keys" (starts sb_secret_) or the "Legacy API keys" tab → service_role (starts eyJ, ~200+ characters).`
      : `This is ${key.length} characters and starts with "${key.slice(0, 4)}" — a service-role key is 200+ characters starting with "eyJ", or one starting with "sb_secret_". Project Settings → API Keys.`);

  check("ODYSSEA_IP_SALT", (process.env.ODYSSEA_IP_SALT ?? "").length >= 16,
    "Any long random string: openssl rand -hex 32");

  const smtp = smtpConfig();
  const fromMailbox = (from.match(/<([^>]+)>/)?.[1] ?? from).trim().toLowerCase();

  if (smtp) {
    check("ODYSSEA_SMTP_USER / PASSWORD", true, "");
    check("ODYSSEA_FROM_EMAIL", fromMailbox === smtp.auth.user.toLowerCase(),
      `Gmail only lets you send as the mailbox you log in with (or an alias verified in Gmail → Settings → Accounts → "Send mail as"). The From is ${fromMailbox || "empty"} but SMTP logs in as ${smtp.auth.user} — Gmail will silently rewrite it.`);
  } else {
    check("mail transport", (process.env.RESEND_API_KEY ?? "").startsWith("re_"),
      "Set ODYSSEA_SMTP_USER and ODYSSEA_SMTP_PASSWORD to send from the club's Google account, or keep a Resend key as the fallback.");
    check("ODYSSEA_FROM_EMAIL", from.includes("@") && !/your-verified-domain|example\.com/i.test(from),
      "Must be an address on a domain verified in Resend → Domains.");
  }

  let database = { reachable: false };

  if (url && key) {
    try {
      const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      // an empty payload is rejected by the function itself — nothing is written
      const { data, error } = await supabase.rpc("odyssea_submit_registration", { payload: {} });

      if (error) {
        database = {
          reachable: false,
          error: error.message,
          hint: /invalid.*api key|jwt|unauthor/i.test(error.message)
            ? "The service-role key is wrong. Copy it again from Supabase → Project Settings → API Keys."
            : /schema cache|does not exist|not find the function/i.test(error.message)
              ? "The function is missing, or PostgREST has not picked it up yet. Re-run the migration, then run: notify pgrst, 'reload schema';"
              : "See the message above.",
        };
      } else {
        database = {
          reachable: true,
          project: url,
          migrationApplied: Boolean(data),
          functionAnswered: data ?? null,
        };
      }
    } catch (probeError) {
      database = { reachable: false, error: probeError?.message ?? String(probeError) };
    }
  }

  const mail = await verifySmtp();
  const mailReady = mail.configured ? mail.ok === true : true;
  const ready = checks.every((entry) => entry.ok) && database.reachable && mailReady;

  return Response.json(
    {
      ready,
      checks,
      database,
      mail: mail.configured
        ? { transport: "smtp (google)", ...mail }
        : { transport: process.env.RESEND_API_KEY ? "resend" : "none", configured: false },
    },
    { status: ready ? 200 : 503 },
  );
}
