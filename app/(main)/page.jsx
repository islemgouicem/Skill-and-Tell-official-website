import { getManagers } from "./features/apis/get-mangers";
import Hero from "./features/home/Hero";
import ValuesMarquee from "./features/home/ValuesMarquee";
import About from "./features/home/About";
import Stats from "./features/home/Stats";
import Missions from "./features/home/Missions";
import EventsHighlight from "./features/home/EventsHighlight";
import TeamTeaser from "./features/home/TeamTeaser";
import Extension from "./features/home/Extension";
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
      <Extension />
      {/* One shared background so the test and the F&Q read as one continuous space */}
      <div className="relative" style={{ backgroundImage: "url('/images/more_About.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <DepartmentTest />
        <Faq transparent index="07" />
      </div>
      <PartnerCTA />
    </>
  );
}
