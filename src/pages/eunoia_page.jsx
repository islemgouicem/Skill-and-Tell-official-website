// import { AboutEunioaSection } from "../sections/eunoia/hero_section"
// import { EventAgendaSection } from "../sections/eunoia/EventAgendaSection"
import HeroSection from "../sections/eunoia/hero_section"
import EventAgenda from "../sections/eunoia/agenda_section"
import Rules from "../sections/eunoia/rules_section"
import About from "../sections/eunoia/about_section"
import Organizers from "../sections/eunoia/organizers_section"
import Speakers from "../sections/eunoia/speakers_section"
import Judges from "../sections/eunoia/judges_section"
import Navbar from "../layout/navbar_eunoia"
import Footer from "../layout/footer_eunoia"
// import { OurMentorsSection } from "../sections/eunoia/OurMentorsSection"
// import { OurSpeakersSection } from "../sections/eunoia/OurSpeakersSection"
// import { RulesAndGuidelinesSection } from "../sections/eunoia/RulesAndGuidelinesSection"
import "../eunoia.css"

export default function Eunoia() {
    return (
        <main
            className="
    relative w-full min-h-screen bg-[hsl(274,87%,24%)] overflow-hidden
    bg-[url('/images/stars.svg'),url('/images/shadow.svg')]
    bg-repeat-[repeat-y,repeat-y]
    bg-[length:auto,auto_500px]
    bg-[position:top_left,top_center]
    "
        >


            {/* content */}
            <Navbar />
            <HeroSection />
            <About />
            <Organizers />
            <Speakers />
            <Judges />
            <EventAgenda />
            <Rules />

            {/* <AboutEunioaSection />
            <OurSpeakersSection />
            <OurMentorsSection />
            <RulesAndGuidelinesSection /> */}
            <Footer />
        </main>
    )
}
