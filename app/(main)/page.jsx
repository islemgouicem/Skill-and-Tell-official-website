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
import JsonLd from "@/components/site/JsonLd";
import faqItems from "@/data/skillntell/faq.json";
import { SITE, faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ description: SITE.description, path: "/" });

export default async function Page() {
  const teamMembers = await getManagers();

  return (
    <>
      <JsonLd data={faqLd(faqItems)} />
      <Hero />
      <ValuesMarquee />
      <About />
      <Stats />
      <Missions />
      <EventsHighlight />
      <TeamTeaser teamMembers={teamMembers} />
      <Extension />
      {/* One shared background so the test and the F&Q read as one continuous space */}
      <div className="relative" style={{ backgroundImage: "url('/images/bg/more-about.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <DepartmentTest />
        <Faq transparent index="07" />
      </div>
      <PartnerCTA />
    </>
  );
}
