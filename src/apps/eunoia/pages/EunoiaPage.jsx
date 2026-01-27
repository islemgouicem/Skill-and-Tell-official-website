// import { AboutEunioaSection } from "../sections/eunoia/hero_section"
// import { EventAgendaSection } from "../sections/eunoia/EventAgendaSection"
import HeroSection from "../sections/hero_section"
import EventAgenda from "../sections/agenda_section"
import Rules from "../sections/rules_section"
import About from "../sections/about_section"
import Organizers from "../sections/organizers_section"
import Speakers from "../sections/speakers_section"
import Judges from "../sections/judges_section"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
// import { OurMentorsSection } from "../sections/eunoia/OurMentorsSection"
// import { OurSpeakersSection } from "../sections/eunoia/OurSpeakersSection"
// import { RulesAndGuidelinesSection } from "../sections/eunoia/RulesAndGuidelinesSection"
import "../../../styles/eunoia.css"

export default function Eunoia() {
    return (
        <main
            className="
                relative w-full min-h-screen bg-[hsl(274,87%,24%)] overflow-hidden
                bg-[url('/images/stars.svg')]
                bg-repeat-[repeat-y]
                bg-[length:auto]
                bg-[position:top_left]
            "
        >

            <Navbar />

            {/* content */}
            <HeroSection />
            <About />
            <Speakers />
            <Judges />
            <EventAgenda />
            <Rules />
            {/* <Organizers /> */}

            <Footer />
        </main>
    )
}
