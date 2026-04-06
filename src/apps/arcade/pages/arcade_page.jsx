
import "../../../styles/arcade.css"
import Navbar from "../layout/navbar"
import HeroSection from "../sections/hero_section"
import About from "../sections/about_section"
import Agenda from "../sections/agenda_section"
import Sponsors from "../sections/sponsors_sections"
import Footer from "../layout/footer"
import Organizers from "../sections/organizers_section"




export default function Arcade() {
    return (
        <main
            className="mobai-app relative w-full min-h-screen overflow-hidden bg-no-repeat bg-cover bg-top flex flex-col items-center"
        > 
            <Navbar />

            {/* content */}
            <HeroSection />
            <div className="bg-gradient-to-b from-[#1a0202] via-[#0a0000] to-[#0B0101] w-full">
                <About />
                <Agenda />
                <Sponsors />
                <Organizers />
            </div>


            <Footer />
        </main>
    )
}
