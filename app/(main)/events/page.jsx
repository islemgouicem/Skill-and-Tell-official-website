import EventsView from "./EventsView";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Events: Hackathons, Datathons & Competitions",
  description: "Odyssea, ARCADE, MobAI, EUNOIA, FormaTech Expo: explore every Skill&Tell event at ENSIA, from datathons and hackathons to ideathons, with editions and photos.",
  path: "/events",
  keywords: ["Skill&Tell events", "hackathon ENSIA", "datathon Algeria", "student competitions Algiers"],
});

export default function EventsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Events", path: "/events" }])} />
      <EventsView />
    </>
  );
}
