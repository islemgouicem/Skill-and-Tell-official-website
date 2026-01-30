import { supabase } from "../../../lib/services/supabase"

function messageFromDbError(err) {
    if (!err) return "Something went wrong. Please try again."
    const code = err.code
    const msg = err.message || ""
    if (code === "23505") {
        if (msg.toLowerCase().includes("team_name") || msg.toLowerCase().includes("team name"))
            return "A team with this name is already registered. Please choose another team name."
        if (msg.toLowerCase().includes("email")) return "This email is already registered."
        if (msg.toLowerCase().includes("phone") || msg.toLowerCase().includes("telegram"))
            return "This phone/Telegram number is already registered."
        return "This value is already registered (duplicate). Please use different information."
    }
    if (code === "23503") return "Invalid reference (e.g. missing team). Please try again."
    if (code === "23502") return "A required field is missing. Please check the form."
    if (code === "23514") return "A value does not meet the requirements. Please check the form."
    return msg || "Something went wrong. Please try again."
}

/**
 * Submit MOBai team registration using Supabase.
 * Inserts into mobai_teams then mobai_team_members (6 rows).
 * @param {object} formData - { team_name, members[6], worked_together_before, team_quality_opinion, prize_not_wanted }
 * @throws {Error} with message on failure
 */
export async function submitMobaiRegistration(formData) {
    const { data: teamRow, error: teamError } = await supabase
        .from("mobai_teams")
        .insert({
            team_name: (formData.team_name ?? "").trim(),
            worked_together_before: formData.worked_together_before,
            team_quality_opinion: (formData.team_quality_opinion ?? "").trim(),
            prize_not_wanted: (formData.prize_not_wanted ?? "").trim(),
            status: "pending"
        })
        .select("team_id")
        .single()

    if (teamError) {
        throw new Error(messageFromDbError(teamError))
    }

    const teamId = teamRow.team_id
    const leaderIntent = formData.members?.[0]?.intent
    const rows = (formData.members ?? []).slice(0, 6).map((m, i) => ({
        team_id: teamId,
        full_name: (m.full_name ?? "").trim(),
        school_or_uni: (m.school_or_uni ?? "").trim(),
        field_of_study: (m.field_of_study ?? "").trim(),
        year_of_study: Number(m.year_of_study),
        phone_telegram: (m.phone_telegram ?? "").trim().slice(0, 20),
        email: (m.email ?? "").trim().slice(0, 120),
        linkedin_url: (m.linkedin_url ?? "").trim() || null,
        github: (m.github ?? "").trim().slice(0, 255) || null,
        responsibility: m.responsibility,
        intent: i === 0 ? m.intent : leaderIntent,
        is_leader: i === 0
    }))

    const { error: membersError } = await supabase.from("mobai_team_members").insert(rows)

    if (membersError) {
        await supabase.from("mobai_teams").delete().eq("team_id", teamId)
        throw new Error(messageFromDbError(membersError))
    }
}
