import teamMembersFallback from "@/data/skillntell/managers-info.json";

const BACKEND_ORIGIN = "https://skillandtell-website-cms-omuq.vercel.app";
const API_URL = `${BACKEND_ORIGIN}/api/managers?depth=1&limit=100`;
const MAX_PAGES = 50; // safety net so the loop can never run forever

const THREE_MONTHS = 60 * 60 * 24 * 30 * 3;



function absoluteUrl(url) {
  if (typeof url !== "string" || url.length === 0) return null;
  // Absolute URL (e.g. a direct Blob URL) — use as-is
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Relative URL (Payload's own file-serving route) — prefix with backend origin
  if (url.startsWith("/")) return `${BACKEND_ORIGIN}${url}`;
  return null;
}

// Payload generates smaller copies of every upload (sizes.card 768×1024, sizes.thumbnail 300×300):
// use them instead of the full original so pictures load fast.
function resolveImageUrl(picture, size) {
  if (typeof picture !== "object" || !picture) return "/images/pfp.png";
  return absoluteUrl(size && picture.sizes?.[size]?.url) ?? absoluteUrl(picture.url) ?? "/images/pfp.png";
}

// Lowercase, treat "-" / "_" as spaces, collapse spaces (so "Vice-President" === "vice president")
function normalize(text) {
  return String(text ?? "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isVicePresident(member) {
  return /\bvice president\b/.test(normalize(member.role));
}

function isPresident(member) {
  return /\bpresident\b/.test(normalize(member.role)) && !isVicePresident(member);
}

function isSecretaryGeneral(member) {
  return /\b(secretary general|general secretary)\b/.test(normalize(member.role));
}

function departmentKey(member) {
  let department = member.department;
  // A many-relationship comes back as an array: use its first entry
  if (Array.isArray(department)) department = department[0];
  // A populated relationship comes back as an object
  if (department && typeof department === "object") {
    department =
      department.id ??
      department.name ??
      department.title ??
      department.label ??
      department.value ??
      department.slug ??
      "";
  }
  const key = normalize(department);
  if (key) return key;
  // No usable department field: fall back to the role title without its trailing "lead" / "manager"
  // (so "Marketing Lead" and "Marketing Manager" still end up in the same group)
  return normalize(member.role).replace(/\s*\b(lead|manager)$/, "");
}

// 0 = lead, 1 = manager, 2 = anything else. The role title ends with "lead" or "manager".
function roleRank(member) {
  const role = normalize(member.role);
  if (/\blead$/.test(role)) return 0;
  if (/\bmanager$/.test(role)) return 1;
  return 2;
}

// Order: vice president, PRESIDENT, secretary general, then for each department
// its lead(s) first and its managers after.
function orderManagers(list) {
  if (!Array.isArray(list) || list.length === 0) return list;

  const president = list.find(isPresident);
  const vicePresident = list.find(isVicePresident);
  const secretaryGeneral = list.find(isSecretaryGeneral);
  const top = [vicePresident, president, secretaryGeneral].filter(Boolean);

  // Group everybody else by department (departments keep their order of first appearance)
  const groups = new Map();
  list
    .filter((member) => !top.includes(member))
    .forEach((member) => {
      const key = departmentKey(member);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(member);
    });

  const ordered = [...top];
  groups.forEach((members) => {
    ordered.push(...[...members].sort((a, b) => roleRank(a) - roleRank(b)));
  });

  return ordered;
}

// Payload paginates its REST API (10 docs per page by default), so walk every page
// until `hasNextPage` is false. Returns null if any page fails.
async function fetchAllManagers() {
  const docs = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage && page <= MAX_PAGES) {
    const res = await fetch(`${API_URL}&page=${page}`, {
      next: { revalidate: THREE_MONTHS },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (!Array.isArray(data?.docs)) {
      return null;
    }

    docs.push(...data.docs);
    hasNextPage = Boolean(data.hasNextPage);
    page += 1;
  }

  return docs;
}

export async function getManagers() {
  try {
    const docs = await fetchAllManagers();

    if (!Array.isArray(docs) || docs.length === 0) {
      return orderManagers(teamMembersFallback);
    }

    return orderManagers(docs.map((doc) => ({
      id: doc.id,
      name: `${doc.firstName ?? ""} ${doc.lastName ?? ""}`.trim(),
      role: doc.role ?? "",
      description: doc.description ?? "",
      email: doc.email ?? "",
      linkedin: doc.linkedin ?? "",
      image: resolveImageUrl(doc.picture, "card"),
      thumb: resolveImageUrl(doc.picture, "thumbnail"),
      department:doc.department?? ""
    })));
  } catch {
    return orderManagers(teamMembersFallback);
  }
}
