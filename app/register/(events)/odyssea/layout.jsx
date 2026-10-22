import "@/styles/odyssea.css";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Odyssea Datathon: Register",
  description: "Odyssea is a free 48-hour online datathon by Skill&Tell on 8–9 October 2026, part of the World AI Week program. Register your team and set sail.",
  path: "/register/odyssea",
  keywords: ["Odyssea", "Odyssea datathon", "World AI Week", "online datathon"],
});

export default function OdysseaLayout({ children }) {
  return <div className="odyssea-route">{children}</div>;
}