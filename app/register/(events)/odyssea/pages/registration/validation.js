import { PERSON_FIELDS, personErrorKey } from "./config";

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE = /^\+?[0-9\s().-]{8,20}$/;
const URLISH = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export function validatePerson(person, scope) {
  const errors = {};
  const set = (field, message) => {
    errors[personErrorKey(scope, field)] = message;
  };

  PERSON_FIELDS.forEach(({ name, label, required }) => {
    const value = (person?.[name] ?? "").trim();
    if (required && !value) {
      set(name, `${label} is required`);
    }
  });

  const email = (person?.email ?? "").trim();
  if (email && !EMAIL.test(email)) set("email", "Enter a valid email address");

  const phone = (person?.phone ?? "").trim();
  if (phone && !PHONE.test(phone)) set("phone", "Enter a valid phone number");

  const name = (person?.fullName ?? "").trim();
  if (name && name.length < 3) set("fullName", "Enter the full name");

  const linkedin = (person?.linkedin ?? "").trim();
  if (linkedin && !URLISH.test(linkedin)) {
    set("linkedin", "Enter a valid link");
  } else if (linkedin && !/linkedin\./i.test(linkedin)) {
    set("linkedin", "This does not look like a LinkedIn profile");
  }

  const portfolio = (person?.portfolio ?? "").trim();
  if (portfolio && !URLISH.test(portfolio)) set("portfolio", "Enter a valid link");

  return errors;
}

/** Step 0 also carries the team meta. */
export function validateLeaderStep(formData) {
  const errors = validatePerson(formData.leader, "leader");

  if (formData.kind === "team") {
    const teamName = (formData.teamName ?? "").trim();
    if (!teamName) errors.teamName = "Give your crew a name";
    else if (teamName.length < 2) errors.teamName = "Team name is too short";
  }

  if (!formData.mode) errors.mode = "Pick a participation mode";

  return errors;
}

export function validateMotivationStep(formData) {
  const errors = {};
  const motivation = (formData.motivation ?? "").trim();

  if (!motivation) errors.motivation = "Tell us why you want to join";
  else if (motivation.length < 40) {
    errors.motivation = "A little more detail, please (40 characters minimum)";
  }

  return errors;
}

/** Collects every duplicate email inside one registration. */
export function duplicateEmails(formData) {
  if (formData.kind === "individual") return {};
  const memberCount = formData.teamSize - 1;
  const people = [formData.leader, ...formData.members.slice(0, memberCount)];
  const seen = new Map();
  const duplicates = {};

  people.forEach((person, index) => {
    const email = (person?.email ?? "").trim().toLowerCase();
    if (!email) return;
    const scope = index === 0 ? "leader" : `member${index - 1}`;
    if (seen.has(email)) {
      duplicates[`${scope}.email`] = "This email is already used by another member";
    } else {
      seen.set(email, scope);
    }
  });

  return duplicates;
}
