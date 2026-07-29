// import { AboutEunioaSection } from "./features/sections/eunoia/hero_section"
// import { EventAgendaSection } from "./features/sections/eunoia/EventAgendaSection"
import HeroSection from "./features/sections/hero_section"
import EventAgenda from "./features/sections/agenda_section"
import Rules from "./features/sections/rules_section"
import About from "./features/sections/about_section"
import Speakers from "./features/sections/speakers_section"
import Judges from "./features/sections/judges_section"

// import { OurMentorsSection } from "./features/sections/eunoia/OurMentorsSection"
// import { OurSpeakersSection } from "./features/sections/eunoia/OurSpeakersSection"
// import { RulesAndGuidelinesSection } from "./features/sections/eunoia/RulesAndGuidelinesSection"
import "@/styles/eunoia.css"

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


            {/* content */}
            <HeroSection />
            <About />
            <Speakers />
            <Judges />
            <EventAgenda />
            <Rules />
            {/* <Organizers /> */}

        </main>
    )
}
