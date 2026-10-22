// Helpers to structure the managers list (CMS or JSON fallback) for the team pages.

export function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const isVicePresident = (m) => /\bvice president\b/.test(normalize(m.role));
export const isPresident = (m) => /\bpresident\b/.test(normalize(m.role)) && !isVicePresident(m);
export const isSecretaryGeneral = (m) =>
  /\b(secretary general|general secretary)\b/.test(normalize(m.role)) || normalize(m.role) === "sg";

export function roleRank(m) {
  const role = normalize(m.role);
  if (/\blead$/.test(role)) return 0;
  if (/\bco ?manager$/.test(role)) return 2;
  if (/\bmanag?er$|\bmanger$/.test(role)) return 1;
  return 3;
}

// Department labels shown on the site, matched from role titles / CMS department.
const DEPARTMENTS = [
  { key: "it", label: "IT", match: /\b(it|dev|developer|development|ai|web|mobile)\b/, blurb: "Builds the club's digital products and runs the Dev & AI tracks — web, mobile and artificial intelligence." },
  { key: "design", label: "Design", match: /\b(design|graphic|ui|ux)\b/, blurb: "Shapes how Skill&Tell looks: visual identity, event branding, posters and interfaces." },
  { key: "events", label: "Events", match: /\b(events?|planing|planning|logistics?)\b/, blurb: "Turns ideas into experiences — planning, logistics and the smooth running of every event." },
  { key: "relex", label: "External Relations", match: /\b(relex|sponsor|sponsoring|opportunit(y|ies)|partnership)\b/, blurb: "Connects the club with partners, sponsors and opportunities beyond campus." },
  // Production is a sub-department of Marketing, so its members are listed there.
  { key: "communication", label: "Marketing", match: /\b(communication|marketing|media|production|multimedia|photo|video)\b/, blurb: "Tells the Skill&Tell story — campaigns, social networks and, with its Production sub-department, the photos and videos of every event." },
  { key: "hr", label: "Human Resources", match: /\b(hr|human resources?)\b/, blurb: "Takes care of members — onboarding, follow-up, cohesion and team spirit." },
];

function departmentText(m) {
  let d = m.department;
  if (Array.isArray(d)) d = d[0];
  if (d && typeof d === "object") d = d.name ?? d.title ?? d.label ?? d.slug ?? d.value ?? "";
  return normalize(d);
}

export function departmentOf(m) {
  // The CMS department wins; the role title is only used when it's missing.
  const dep = departmentText(m);
  const byDep = dep && DEPARTMENTS.find((d) => d.match.test(dep));
  if (byDep) return byDep;
  const role = normalize(m.role);
  return DEPARTMENTS.find((d) => d.match.test(role)) ?? { key: "other", label: dep ? prettyRole(dep) : "Managers", blurb: "" };
}

/** { board: [vp, president, sg], departments: [{key,label,blurb,members}] } */
export function structureTeam(list = []) {
  const president = list.find(isPresident);
  const vp = list.find(isVicePresident);
  const sg = list.find(isSecretaryGeneral);
  const board = [sg, president, vp].filter(Boolean);
  const map = new Map();
  for (const m of list) {
    if (board.includes(m)) continue;
    const dep = departmentOf(m);
    if (!map.has(dep.key)) map.set(dep.key, { ...dep, match: undefined, members: [] });
    map.get(dep.key).members.push(m);
  }
  const order = DEPARTMENTS.map((d) => d.key).concat("other");
  const departments = [...map.values()]
    .sort((a, b) => order.indexOf(a.key) - order.indexOf(b.key))
    .map((d) => ({ ...d, members: [...d.members].sort((a, b) => roleRank(a) - roleRank(b)) }));
  return { board, departments };
}

export function prettyRole(role) {
  const r = String(role ?? "").trim();
  if (normalize(r) === "sg") return "Secretary General";
  return r
    .replace(/\bmanger\b/gi, "Manager")
    .replace(/\bplaning\b/gi, "Planning")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function prettyName(name) {
  return String(name ?? "")
    .trim()
    .split(/\s+/)
    .map((w) => (w === w.toUpperCase() && w.length > 2 ? w[0] + w.slice(1).toLowerCase() : w[0]?.toUpperCase() + w.slice(1)))
    .join(" ");
}

export function normalizeUrl(url) {
  if (!url || /^javascript:/i.test(url)) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
