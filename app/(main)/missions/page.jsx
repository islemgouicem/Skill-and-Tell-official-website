import MissionsView from "./MissionsView";
import JsonLd from "@/components/site/JsonLd";
import { MISSIONS_FAQ } from "@/data/skillntell/missions";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Missions: Learn by Doing, Level Up",
  description: "Skill&Tell Missions, inspired by Solo Leveling: hands-on onsite workshops at ENSIA. Earn XP on missions.skillntell.com, level up and climb the leaderboard.",
  path: "/missions",
  keywords: ["Skill&Tell Missions", "Solo Leveling", "hands-on workshops", "XP leaderboard"],
});

export default function MissionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Missions", path: "/missions" }]), faqLd(MISSIONS_FAQ)]} />
      <MissionsView />
    </>
  );
}
