
import "../../../styles/mobai.css"
import Navbar from "../layout/Navbar"
import HeroSection from "../sections/hero_section"
import About from "../sections/about_section"
import Agenda from "../sections/agenda_section"
import Mentors from "../sections/mentors_sections"
import Sponsors from "../sections/sponsors_sections"
import Footer from "../layout/Footer"
import Organizers from "../sections/organizers_section"
import FQ from "../sections/fq_section"
import sectionsBg from "../../../assets/images/mobai/sections.webp"




export default function MobAI() {
    return (
        <main
            className="mobai-app relative w-full min-h-screen overflow-hidden bg-no-repeat bg-cover bg-top"
            style={{ backgroundImage: `url(${sectionsBg})` }}
        >
            <Navbar />

            {/* content */}
            <HeroSection />
            <About />
            <Agenda />
            <Sponsors />
            <Mentors />
            <FQ />
            {/* <Organizers /> */}


            <Footer />
        </main>
    )
}
