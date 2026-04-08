import { supabase } from "../../../lib/services/supabase";

function messageFromDbError(error) {
  if (!error) return "Something went wrong. Please try again.";

  const code = error.code;
  const message = error.message || "";

  if (code === "23505") {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("team_name") || lowerMessage.includes("team name")) {
      return "A registration with this team name already exists.";
    }

    if (lowerMessage.includes("leader_email") || lowerMessage.includes("email")) {
      return "A registration with this leader email already exists.";
    }

    return "This registration already exists. Please review the form values.";
  }

  if (code === "23502") return "A required field is missing.";
  if (code === "23514") return "Some values do not match the required format.";

  return message || "Something went wrong. Please try again.";
}

function normalizeMember(member) {
  return {
    name: (member?.name ?? "").trim(),
    email: (member?.email ?? "").trim(),
    number: (member?.number ?? "").trim(),
    year: (member?.year ?? "").trim(),
  };
}

export async function submitArcadeRegistration(formData) {
  const payload = {
    team_name: (formData.teamName ?? "").trim(),
    leader_name: (formData.leaderName ?? "").trim(),
    leader_email: (formData.leaderEmail ?? "").trim(),
    leader_number: (formData.leaderNumber ?? "").trim(),
    leader_year: (formData.leaderYear ?? "").trim(),
    members: (formData.members ?? []).map(normalizeMember),
    past_participation: Boolean(formData.pastParticipation),
    motivation: (formData.motivation ?? "").trim(),
  };

  const { data, error } = await supabase
    .from("arcade_registrations")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(messageFromDbError(error));
  }

  return data;
}

export async function submitArcadeOrganizerRegistration(formData) {
  const payload = {
    name: (formData.name ?? "").trim(),
    school: (formData.school ?? "").trim(),
    email: (formData.email ?? "").trim(),
    phone: (formData.phone ?? "").trim(),
    is_member: Boolean(formData.isMember),
    available_days: formData.availableDays ?? [],
    available_pre_meet: Boolean(formData.availablePreMeet),
    has_experience: Boolean(formData.hasExperience),
    experience_description: (formData.experienceDescription ?? "").trim(),
    role: (formData.role ?? "").trim(),
    preferred_shifts: formData.preferredShifts ?? [],
  };

  const { data, error } = await supabase
    .from("arcade_organizer_registrations")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(messageFromDbError(error));
  }

  return data;
}