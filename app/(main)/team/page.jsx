import { getManagers } from "../features/apis/get-mangers";
import TeamView from "./TeamView";
import JsonLd from "@/components/site/JsonLd";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Team: Board, Leads & Managers",
  description: "Meet the executive board, department leads and managers behind the Skill&Tell Scientific Club at ENSIA, plus the previous offices who built the club.",
  path: "/team",
  keywords: ["Skill&Tell team", "Skill&Tell board", "ENSIA club members"],
});

export default async function TeamPage() {
  const teamMembers = await getManagers();
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Team", path: "/team" }])} />
      <TeamView teamMembers={teamMembers} />
    </>
  );
}
