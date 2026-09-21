export const TEAM_SIZES = [2, 3, 4, 5, 6];
export const MIN_TEAM_SIZE = 2;
export const MAX_TEAM_SIZE = 6;

export const MODES = [
  { value: "onsite", label: "Onsite" },
  { value: "online", label: "Online" },
];

export const YEARS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "5th year",
  "Master",
  "PhD",
  "Graduated",
];

export const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

/** The eight person fields, in the Figma's reading order. */
export const PERSON_FIELDS = [
  { name: "fullName", label: "Full Name", placeholder: "Your full name", type: "text", required: true, icon: "user", max: 120 },
  { name: "email", label: "Email Address", placeholder: "you@domain.com", type: "email", required: true, icon: "mail", max: 160 },
  { name: "university", label: "University / Institution", placeholder: "e.g. ENSIA", type: "text", required: true, icon: "building", max: 160 },
  { name: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/your-profile", type: "url", required: true, icon: "linkedin", max: 240 },
  { name: "phone", label: "Phone Number", placeholder: "+213 5 61 71 84 75", type: "tel", required: true, icon: "phone", max: 24 },
  { name: "portfolio", label: "Github / Portfolio", placeholder: "github.com/your-handle", type: "url", required: true, icon: "github", max: 240 },
  { name: "year", label: "Year of Study", placeholder: "Select your year", type: "select", required: false, icon: "calendar", options: YEARS },
  { name: "study", label: "Field of Study", placeholder: "e.g. Computer Science", type: "text", required: true, icon: "book", max: 120 },
];

export const emptyPerson = () => ({
  fullName: "",
  email: "",
  university: "",
  linkedin: "",
  phone: "",
  portfolio: "",
  year: "",
  study: "",
});

export const KINDS = [
  { value: "team", label: "Team" },
  { value: "individual", label: "Individual" },
];

export const createInitialFormData = () => ({
  kind: "team",
  teamName: "",
  teamSize: 6,
  mode: "onsite",
  leader: emptyPerson(),
  members: Array.from({ length: MAX_TEAM_SIZE - 1 }, emptyPerson),
  discovery: "",
  motivation: "",
  website: "",
});

export const personErrorKey = (scope, field) => `${scope}.${field}`;
