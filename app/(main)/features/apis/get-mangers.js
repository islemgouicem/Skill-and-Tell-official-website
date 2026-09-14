// src/lib/skillntell/get-managers.js
import teamMembersFallback from "@/data/skillntell/managers-info.json";

const BACKEND_ORIGIN = "https://skillandtell-website-cms-omuq.vercel.app";
const API_URL = `${BACKEND_ORIGIN}/api/managers?depth=1`;

const THREE_MONTHS = 60 * 60 * 24 * 30 * 3;



function resolveImageUrl(picture) {
  if (typeof picture === "object" && typeof picture?.url === "string" && picture.url.length > 0) {
    // Absolute URL (e.g. a direct Blob URL) — use as-is
    if (picture.url.startsWith("http://") || picture.url.startsWith("https://")) {
      return picture.url;
    }
    // Relative URL (Payload's own file-serving route) — prefix with backend origin
    if (picture.url.startsWith("/")) {
      return `${BACKEND_ORIGIN}${picture.url}`;
    }
  }
  return "/images/pfp.png";
}

export async function getManagers() {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: THREE_MONTHS },
    });

    if (!res.ok) {
      return teamMembersFallback;
    }

    const data = await res.json();
    const docs = data?.docs;

    if (!Array.isArray(docs) || docs.length === 0) {
      return teamMembersFallback;
    }

    return docs.map((doc) => ({
      id: doc.id,
      name: `${doc.firstName ?? ""} ${doc.lastName ?? ""}`.trim(),
      role: doc.role ?? "",
      description: doc.description ?? "",
      email: doc.email ?? "",
      instagram: doc.instagram ?? "",
      linkedin: doc.linkedin ?? "",
      image: resolveImageUrl(doc.picture),
    }));
  } catch (err) {
    return teamMembersFallback;
  }
}