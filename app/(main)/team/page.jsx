import { getManagers } from "../features/apis/get-mangers";
import TeamView from "./TeamView";

export const metadata = {
  title: "Team",
  description: "Meet the executive board, department leads and managers of the Skill&Tell Scientific Club at ENSIA — and the mandates that came before them.",
};

export default async function TeamPage() {
  const teamMembers = await getManagers();
  return <TeamView teamMembers={teamMembers} />;
}
