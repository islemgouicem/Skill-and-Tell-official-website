/**
 * The registration form never speaks to Supabase.
 *
 * It posts to /api/odyssea/register, which runs on the server, holds the
 * service-role key, re-validates everything and calls the single database
 * function allowed to write. No Supabase URL, key or table name ever reaches
 * the browser bundle.
 */
const ENDPOINT = "/api/odyssea/register";

const FRIENDLY = {
  duplicate_team_name: "A team with this name is already registered.",
  duplicate_email: "This email address is already registered for Odyssea.",
  rate_limited: "Too many attempts from this connection. Please try again in a few minutes.",
  registrations_closed: "Registrations for Odyssea are closed.",
  invalid_payload: "Some of the details are not valid. Please review the form.",
  server_error: "We could not register you right now. Please try again in a moment.",
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
    privacy_consent: formData.privacyConsent === true,
    // honeypot — a real person never fills the hidden field
    website: trim(formData.website),
  };
}

export async function submitOdysseaRegistration(formData) {
  let response;

  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(formData)),
    });
  } catch {
    throw new Error("The connection dropped. Check your network and try again.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.ok) {
    throw new Error(data?.message ?? FRIENDLY[data?.code] ?? FRIENDLY.server_error);
  }

  return data;
}
