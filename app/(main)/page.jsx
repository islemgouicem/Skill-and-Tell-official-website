import { getManagers } from "./features/apis/get-mangers";
import Hero from "./features/home/Hero";
import ValuesMarquee from "./features/home/ValuesMarquee";
import About from "./features/home/About";
import Stats from "./features/home/Stats";
import Missions from "./features/home/Missions";
import EventsHighlight from "./features/home/EventsHighlight";
import TeamTeaser from "./features/home/TeamTeaser";
import AppShowcase from "./features/home/AppShowcase";
import DepartmentTest from "./features/home/DepartmentTest";
import Faq from "./features/home/Faq";
import PartnerCTA from "@/components/site/PartnerCTA";

export default async function Page() {
  const teamMembers = await getManagers();

  return (
    <>
      <Hero />
      <ValuesMarquee />
      <About />
      <Stats />
      <Missions />
      <EventsHighlight />
      <TeamTeaser teamMembers={teamMembers} />
      <AppShowcase />
      <DepartmentTest />
      <Faq />
      <PartnerCTA />
    </>
  );
}
