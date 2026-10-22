import rawEvents from "@/data/skillntell/events.json";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(iso) {
  if (!iso) return "Date to be announced";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Events with normalized links, year and status, newest first (placeholders last). */
export function getEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return rawEvents
    .map((e) => ({
      ...e,
      slug: slugify(e.title),
      href: e.path ? `/${e.path.replace(/^\//, "")}` : null,
      year: e.date ? Number(e.date.slice(0, 4)) : null,
      dateLabel: e.dateLabel ?? formatDate(e.date),
      status: !e.date ? "soon" : e.date > today ? "upcoming" : "past",
    }))
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });
}

export const EVENT_CATEGORIES = (events) => ["All", ...Array.from(new Set(events.map((e) => e.category).filter(Boolean)))];
