"use client"

import "../../../../styles/arcade.css"
import Navbar from "./features/layout/navbar"
import HeroSection from "./features/sections/hero_section"
import About from "./features/sections/about_section"
import Agenda from "./features/sections/agenda_section"
import Sponsors from "./features/sections/sponsors_sections"
import Footer from "./features/layout/footer"
import Organizers from "./features/sections/organizers_section"
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
