
import "../../../styles/arcade.css"
import Navbar from "../layout/navbar"
import HeroSection from "../sections/hero_section"
import About from "../sections/about_section"
import Agenda from "../sections/agenda_section"
import Sponsors from "../sections/sponsors_sections"
import Footer from "../layout/footer"
import Organizers from "../sections/organizers_section"
import { useEffect } from "react";




export default function Arcade() {
    useEffect(() => {
        document.documentElement.classList.add("arcade-active");
        document.body.classList.add("arcade-active");

    }, []);
    return (
        <main
            className="mobai-app relative w-full min-h-screen overflow-hidden bg-no-repeat bg-cover bg-top flex flex-col items-center"
        >
            <Navbar />

            {/* content */}
            <HeroSection />
            <div className="bg-black w-full">
                <About />
                <Agenda />
                <Sponsors />
                <Organizers />
            </div>


            <Footer />
        </main>
    )
}
