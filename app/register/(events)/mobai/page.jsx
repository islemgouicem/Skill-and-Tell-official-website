import "@/styles/mobai.css";
import HeroSection from "./features/sections/hero_section";
import About from "./features/sections/about_section";
import Agenda from "./features/sections/agenda_section";
import Mentors from "./features/sections/juries_sections";
import Sponsors from "./features/sections/sponsors_sections";
import Organizers from "./features/sections/organizers_section";
import FQ from "./features/sections/fq_section";
import sectionsBg from "@/assets/images/mobai/sections.webp";
export default function MobAI() {
    console.log(sectionsBg);
    return (<main className="mobai-app relative w-full min-h-screen overflow-hidden bg-no-repeat bg-cover bg-top" style={{ backgroundImage: `url(${sectionsBg.src})` }}>

            {/* content */}
            <HeroSection />
            <About />
            <Agenda />
            <Sponsors />
            <Mentors />
            <FQ />
            <Organizers />

        </main>);
}
