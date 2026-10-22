// Single source of truth for SEO: site identity, per-page metadata and JSON-LD.
import { CONTACT_EMAIL, CONTACT_PHONE, FOUNDED, SOCIALS } from "@/data/skillntell/site";

// Canonical origin. Set NEXT_PUBLIC_SITE_URL on Vercel if the primary domain changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.skillntell.com").replace(/\/$/, "");

export const SITE = {
  name: "Skill & Tell",
  shortName: "Skill&Tell",
  legalName: "Skill&Tell Scientific Club",
  tagline: "Scientific Club at ENSIA",
  description:
    "Skill&Tell is the scientific club of ENSIA, Algeria's National School of AI. Hackathons, datathons, Missions and workshops for 534+ students since 2022.",
  keywords: [
    "Skill&Tell",
    "Skill and Tell",
    "Skill & Tell club",
    "skillntell",
    "ENSIA",
    "ENSIA club",
    "scientific club Algeria",
    "student club Algiers",
    "École Nationale Supérieure d'Intelligence Artificielle",
    "Sidi Abdellah",
    "hackathon Algeria",
    "datathon",
    "Odyssea datathon",
    "MobAI hackathon",
    "ARCADE",
    "EUNOIA ideathon",
    "Skill&Tell Missions",
    "AI students Algeria",
    "workshops",
    "soft skills",
  ],
  locale: "en_US",
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE.href.replace("tel:", ""),
  founded: "2022-03-01",
  foundedYear: FOUNDED.year,
  sameAs: SOCIALS.map((s) => s.href).filter(Boolean),
  logo: `${SITE_URL}/icons/app/icon-512.png`,
};

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Full metadata for a page: title, description, canonical, Open Graph and Twitter.
 * (Next replaces nested objects like openGraph instead of merging them, so every
 * page gets the complete set.) Images come from the opengraph-image / twitter-image
 * files next to each page.
 */
export function pageMetadata({ title, description, path = "/", keywords = [], noindex = false }) {
  const url = absoluteUrl(path);
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  return {
    title: title ?? { absolute: fullTitle },
    description,
    keywords: [...keywords, ...SITE.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- JSON-LD (structured data for Google rich results) ---------- */

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE.legalName,
  alternateName: [SITE.name, SITE.shortName, "Skill and Tell", "S&T"],
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: SITE.logo, width: 512, height: 512 },
  image: `${SITE_URL}/opengraph-image.jpg`,
  description: SITE.description,
  foundingDate: SITE.founded,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: SITE.sameAs,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ENSIA, Pôle universitaire de Sidi Abdellah",
    addressLocality: "Sidi Abdellah, Algiers",
    addressCountry: "DZ",
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "École Nationale Supérieure d'Intelligence Artificielle (ENSIA)",
    url: "https://www.ensia.edu.dz",
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "general inquiries", email: SITE.email, telephone: SITE.phone, availableLanguage: ["English", "French", "Arabic"] },
  ],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE.name,
  alternateName: SITE.legalName,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
