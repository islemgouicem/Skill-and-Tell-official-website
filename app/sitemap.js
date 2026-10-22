import { SITE_URL } from "@/lib/seo";

// /sitemap.xml — every public page, with how often it changes and how important it is.
const PAGES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/events", changeFrequency: "weekly", priority: 0.9 },
  { path: "/missions", changeFrequency: "weekly", priority: 0.9 },
  { path: "/register", changeFrequency: "monthly", priority: 0.9 },
  { path: "/team", changeFrequency: "monthly", priority: 0.8 },
  { path: "/partner", changeFrequency: "monthly", priority: 0.8 },
  { path: "/register/odyssea", changeFrequency: "monthly", priority: 0.6 },
  { path: "/register/mobai", changeFrequency: "monthly", priority: 0.6 },
  { path: "/register/eunoia", changeFrequency: "yearly", priority: 0.5 },
  { path: "/register/arcade", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap() {
  const lastModified = new Date();
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    images: p.path === "/" ? [`${SITE_URL}/opengraph-image.jpg`] : undefined,
  }));
}
