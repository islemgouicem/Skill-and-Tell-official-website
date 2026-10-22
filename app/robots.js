import { SITE_URL } from "@/lib/seo";

// /robots.txt — everything is crawlable except the API routes.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
