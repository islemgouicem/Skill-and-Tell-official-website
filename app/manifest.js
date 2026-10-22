import { SITE } from "@/lib/seo";

// /manifest.webmanifest — install name, icons and colours (also used by Android / Chrome).
export default function manifest() {
  return {
    name: SITE.legalName,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a001a",
    theme_color: "#0a001a",
    lang: "en",
    categories: ["education", "events"],
    icons: [
      { src: "/icons/app/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/app/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/app/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
