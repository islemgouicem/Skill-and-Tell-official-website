const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RESPONSIBILITIES = ["design", "mobile", "ai"]

function isValidEmail(value) {
    return typeof value === "string" && EMAIL_REGEX.test(value.trim())
}

/**
 * Validate a single member. Returns object of field -> error message.
 * @param {object} member
 * @param {number} index - 0 = leader
 */
export function validateMember(member, index) {
    const err = {}
    if (!member.full_name?.trim()) err.full_name = "Full name is required"
    if (!member.school_or_uni?.trim()) err.school_or_uni = "School or university is required"
    if (!member.field_of_study?.trim()) err.field_of_study = "Field of study is required"
    const year = member.year_of_study
    if (year === "" || year === undefined || year === null) err.year_of_study = "Year of study is required"
    else if (!Number.isInteger(Number(year)) || Number(year) < 1) err.year_of_study = "Year must be 1 or more"
    if (!member.phone_telegram?.trim()) err.phone_telegram = "Telegram phone number is required"
    if (!member.email?.trim()) err.email = "Email is required"
    else if (!isValidEmail(member.email)) err.email = "Please enter a valid email address"
    if (!member.github?.trim()) err.github = "GitHub or portfolio link is required"
    if (!member.responsibility) err.responsibility = "Please select a responsibility"
    if (index === 0 && !member.intent) err.intent = "Please select an intent"
    return err
}

/**
 * Validate team name (3–100 chars).
 */
export function validateTeamName(teamName) {
    const t = teamName?.trim() ?? ""
    if (!t) return "Team name is required"
    if (t.length < 3) return "Team name must be at least 3 characters"
    if (t.length > 100) return "Team name must be at most 100 characters"
    return null
}

/**
 * Check responsibility coverage: all 3 must appear at least once across 6 members.
 */
export function getResponsibilityCoverage(members) {
    const assigned = members.map(m => m.responsibility).filter(Boolean)
    return {
        design: assigned.filter(r => r === "design").length,
        mobile: assigned.filter(r => r === "mobile").length,
        ai: assigned.filter(r => r === "ai").length
    }
}

export function isResponsibilityCoverageValid(members) {
    if (!members || members.length !== 6) return false
    const cov = getResponsibilityCoverage(members)
    return cov.design >= 1 && cov.mobile >= 1 && cov.ai >= 1
}

/**
 * Full form validation. Returns { valid: boolean, errors: { team_name?, members?: [{...}], worked_together_before?, team_quality_opinion?, prize_not_wanted? } }
 */
export function validateMobaiForm(form) {
    const errors = {}
    const teamNameErr = validateTeamName(form.team_name)
    if (teamNameErr) errors.team_name = teamNameErr

    if (!form.members || form.members.length !== 6) {
        errors.members = Array(6).fill(null).map(() => ({}))
        if (!errors.team_name) errors.team_name = "Exactly 6 members required"
    } else {
        const memberErrors = form.members.map((m, i) => validateMember(m, i))
        const hasMemberErrors = memberErrors.some(e => Object.keys(e).length > 0)
        if (hasMemberErrors) errors.members = memberErrors
    }

    if (!form.worked_together_before) errors.worked_together_before = "Please select whether you worked together before"
    const quality = (form.team_quality_opinion ?? "").trim()
    if (quality.length < 30) errors.team_quality_opinion = "Team quality answer must be at least 30 characters"
    const prize = (form.prize_not_wanted ?? "").trim()
    if (prize.length < 10) errors.prize_not_wanted = "Prize not wanted must be at least 10 characters"

    if (!isResponsibilityCoverageValid(form.members)) {
        if (!errors.members) errors.members = Array(6).fill(null).map(() => ({}))
        errors._responsibility = "All three responsibilities (design, mobile, ai) must be assigned at least once"
    }

    return {
        valid: Object.keys(errors).filter(k => k !== "_responsibility").length === 0,
        errors
    }
}
