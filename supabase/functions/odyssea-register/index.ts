/**
 * POST /functions/v1/odyssea-register
 *
 * The only write path into the Odyssea registration tables.
 *
 *  browser (anon key)  ->  this function  ->  service role  ->  RPC
 *
 * The anon key can invoke this function and nothing else: the tables
 * live in a private `odyssea` schema with RLS forced and no policies,
 * and EXECUTE on the RPC wrappers is granted to service_role only.
 *
 * This layer: CORS allow-list, method + size + content-type checks,
 * honeypot, full field validation, IP hashing (HMAC, never the raw IP),
 * then the atomic RPC, then the Resend confirmation email.
 *
 * Secrets (supabase secrets set ...):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (provided by the platform)
 *   RESEND_API_KEY        re_...
 *   ODYSSEA_FROM_EMAIL    "Odyssea by Skill&Tell <odyssea@skillandtell.dz>"
 *   ODYSSEA_REPLY_TO      skill.and.tell@ensia.edu.dz
 *   ODYSSEA_SITE_URL      https://skillandtell.dz
 *   ODYSSEA_ALLOWED_ORIGINS  comma separated list
 *   ODYSSEA_IP_PEPPER     any long random string
 */

import { createClient } from "npm:@supabase/supabase-js@2";
import { htmlBody, subjectFor, textBody, type ConfirmationInput } from "./email.ts";

const MAX_BODY_BYTES = 24 * 1024;

const ALLOWED_ORIGINS = (Deno.env.get("ODYSSEA_ALLOWED_ORIGINS") ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const SITE_URL = (Deno.env.get("ODYSSEA_SITE_URL") ?? "https://skillandtell.dz").replace(/\/$/, "");

function corsHeaders(origin: string | null) {
  const allowed =
    ALLOWED_ORIGINS.length === 0
      ? "*"
      : origin && ALLOWED_ORIGINS.includes(origin)
        ? origin
        : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-api-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
}

/* ------------------------------------------------------------------ */
/* validation                                                          */
/* ------------------------------------------------------------------ */

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE = /^\+?[0-9\s().-]{8,20}$/;
const URLISH = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

type Person = {
  full_name: string;
  email: string;
  university: string;
  linkedin: string;
  phone: string;
  portfolio: string;
  year_of_study: string;
  field_of_study: string;
};

function readPerson(raw: unknown): Person | null {
  if (!raw || typeof raw !== "object") return null;
  const source = raw as Record<string, unknown>;

  const person: Person = {
    full_name: clean(source.full_name, 120),
    email: clean(source.email, 160).toLowerCase(),
    university: clean(source.university, 160),
    linkedin: clean(source.linkedin, 240),
    phone: clean(source.phone, 24),
    portfolio: clean(source.portfolio, 240),
    year_of_study: clean(source.year_of_study, 40),
    field_of_study: clean(source.field_of_study, 120),
  };

  if (person.full_name.length < 3) return null;
  if (!EMAIL.test(person.email)) return null;
  if (person.university.length < 2) return null;
  if (!PHONE.test(person.phone)) return null;
  if (!URLISH.test(person.linkedin) || !/linkedin\./i.test(person.linkedin)) return null;
  if (!URLISH.test(person.portfolio)) return null;
  if (person.field_of_study.length < 2) return null;

  return person;
}

async function hashIp(ip: string) {
  const pepper = Deno.env.get("ODYSSEA_IP_PEPPER") ?? "";
  if (!ip || !pepper) return null;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(pepper),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/* ------------------------------------------------------------------ */
/* email                                                               */
/* ------------------------------------------------------------------ */

async function sendConfirmation(input: ConfirmationInput, to: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("ODYSSEA_FROM_EMAIL");
  if (!apiKey || !from) {
    console.warn("odyssea-register: RESEND_API_KEY or ODYSSEA_FROM_EMAIL missing, email skipped");
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: Deno.env.get("ODYSSEA_REPLY_TO") ?? "skill.and.tell@ensia.edu.dz",
      subject: subjectFor(input),
      html: htmlBody(input),
      text: textBody(input),
      tags: [{ name: "campaign", value: "odyssea-2026" }],
    }),
  });

  if (!response.ok) {
    console.error("odyssea-register: resend failed", response.status, await response.text());
    return false;
  }
  return true;
}

/* ------------------------------------------------------------------ */
/* handler                                                             */
/* ------------------------------------------------------------------ */

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (request.method !== "POST") {
    return json({ ok: false, code: "method_not_allowed" }, 405, origin);
  }

  if (ALLOWED_ORIGINS.length > 0 && origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ ok: false, code: "forbidden_origin" }, 403, origin);
  }

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ ok: false, code: "invalid_payload" }, 415, origin);
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return json({ ok: false, code: "invalid_payload" }, 413, origin);
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }

  // honeypot: real people never fill a hidden field
  if (clean(body.website, 80) !== "") {
    return json({ ok: true, reference: "ODY-000000" }, 200, origin);
  }

  const kind = body.registration_kind === "individual" ? "individual" : "team";
  const mode = body.participation_mode === "online" ? "online" : "onsite";
  const teamSize = Number(body.team_size);
  const teamName = clean(body.team_name, 60);
  const motivation = clean(body.motivation, 1500);
  const discovery = clean(body.discovery, 500);

  if (!Number.isInteger(teamSize) || teamSize < 1 || teamSize > 6) {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }
  if (kind === "individual" && teamSize !== 1) {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }
  if (kind === "team" && teamSize < 2) {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }
  if (teamName.length < 2) {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }
  if (motivation.length < 40) {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }

  const leader = readPerson(body.leader);
  if (!leader) return json({ ok: false, code: "invalid_payload" }, 400, origin);

  const rawMembers = Array.isArray(body.members) ? body.members.slice(0, 5) : [];
  const members: Person[] = [];
  for (const raw of rawMembers) {
    const person = readPerson(raw);
    if (!person) return json({ ok: false, code: "invalid_payload" }, 400, origin);
    members.push(person);
  }

  const people = [leader, ...members];
  if (people.length !== teamSize) {
    return json({ ok: false, code: "invalid_payload" }, 400, origin);
  }

  const seen = new Set<string>();
  for (const person of people) {
    if (seen.has(person.email)) {
      return json({ ok: false, code: "duplicate_email" }, 409, origin);
    }
    seen.add(person.email);
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0].trim();
  const ipHash = await hashIp(ip);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { data, error } = await supabase.rpc("odyssea_submit_registration", {
    payload: {
      registration_kind: kind,
      participation_mode: mode,
      team_name: teamName,
      team_size: teamSize,
      motivation,
      discovery: discovery || null,
      people,
      ip_hash: ipHash,
      user_agent: (request.headers.get("user-agent") ?? "").slice(0, 400),
    },
  });

  if (error) {
    console.error("odyssea-register: rpc failed", error.message);
    return json({ ok: false, code: "server_error" }, 500, origin);
  }

  const result = data as { ok: boolean; code?: string; reference?: string; registration_id?: string };

  if (!result?.ok) {
    const status = result?.code === "rate_limited" ? 429 : result?.code === "registrations_closed" ? 403 : 409;
    return json({ ok: false, code: result?.code ?? "invalid_payload" }, status, origin);
  }

  // the seat is booked; a failing mailbox must not undo it
  try {
    const sent = await sendConfirmation(
      {
        leaderName: leader.full_name,
        teamName,
        reference: result.reference!,
        kind,
        teamSize,
        mode,
        members: people.map((person) => ({ full_name: person.full_name, email: person.email })),
        siteUrl: SITE_URL,
      },
      leader.email,
    );
    if (sent) {
      await supabase.rpc("odyssea_mark_confirmation_sent", { p_registration: result.registration_id });
    }
  } catch (mailError) {
    console.error("odyssea-register: confirmation email failed", mailError);
  }

  return json({ ok: true, reference: result.reference }, 200, origin);
});
