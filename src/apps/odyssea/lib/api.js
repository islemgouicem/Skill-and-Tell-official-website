import { isSupabaseConfigured, supabase } from "../../../lib/services/supabase";

/**
 * Registrations never touch the table from the browser.
 * The anon key can only invoke the `odyssea-register` edge function, which
 * re-validates everything server side, writes with the service role and
 * sends the confirmation email to the team leader.
 */
const FUNCTION_NAME = "odyssea-register";

const FRIENDLY = {
  duplicate_team_name: "A team with this name is already registered.",
  duplicate_email: "This email address is already registered for Odyssea.",
  rate_limited: "Too many attempts from this connection. Please try again in a few minutes.",
  registrations_closed: "Registrations for Odyssea are closed.",
  invalid_payload: "Some of the details are not valid. Please review the form.",
};

function buildPayload(formData) {
  const trim = (value) => (value ?? "").toString().trim();
  const person = (source) => ({
    full_name: trim(source.fullName),
    email: trim(source.email).toLowerCase(),
    university: trim(source.university),
    linkedin: trim(source.linkedin),
    phone: trim(source.phone),
    portfolio: trim(source.portfolio),
    year_of_study: trim(source.year),
    field_of_study: trim(source.study),
  });

  const individual = formData.kind === "individual";
  const teamSize = individual ? 1 : Number(formData.teamSize);
  const memberCount = Math.max(0, teamSize - 1);

  return {
    registration_kind: individual ? "individual" : "team",
    team_name: individual ? trim(formData.leader.fullName) : trim(formData.teamName),
    team_size: teamSize,
    participation_mode: formData.mode === "online" ? "online" : "onsite",
    leader: person(formData.leader),
    members: formData.members.slice(0, memberCount).map(person),
    discovery: trim(formData.discovery).slice(0, 500),
    motivation: trim(formData.motivation).slice(0, 1500),
    // honeypot — a real person never fills the hidden field
    website: trim(formData.website),
  };
}

export async function submitOdysseaRegistration(formData) {
  if (!isSupabaseConfigured) {
    throw new Error(
      "Registration is not connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then rebuild.",
    );
  }

  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: buildPayload(formData),
  });

  if (error) {
    let code = null;
    try {
      const body = await error.context?.json?.();
      code = body?.code ?? null;
    } catch {
      code = null;
    }
    throw new Error(
      FRIENDLY[code] ?? "We could not register your team right now. Please try again.",
    );
  }

  if (data && data.ok === false) {
    throw new Error(FRIENDLY[data.code] ?? data.message ?? "Registration failed.");
  }

  return data;
}
