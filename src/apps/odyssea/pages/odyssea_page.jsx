import { useEffect } from "react";
import "../../../styles/odyssea.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroSection from "../sections/hero_section";
import AboutSection from "../sections/about_section";
import AgendaSection from "../sections/agenda_section";
import SeparatorSection from "../sections/separator_section";
import FaqSection from "../sections/faq_section";

import stars from "../../../assets/images/odyssea/stars.webp";
import parchment from "../../../assets/images/odyssea/parchment.webp";

export default function OdysseaPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Odyssea by Skill&Tell | Ideas · Talent · Impact";
    document.documentElement.classList.add("odyssea-active");
    document.body.classList.add("odyssea-active");

    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("odyssea-active");
      document.body.classList.remove("odyssea-active");
    };
  }, []);

  return (
    <main className="odyssea-app relative w-full overflow-x-hidden">
      <Navbar />

      {/* ---- the night half: hero + about, under one starfield ---- */}
      <div className="relative bg-ody-night">
        <img
          src={stars}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-60"
        />
        <div className="relative">
          <HeroSection />
          <AboutSection />
        </div>
      </div>

      {/* ---- the parchment half ---- */}
      <AgendaSection parchmentImg={parchment} />
      <SeparatorSection />
      <FaqSection parchmentImg={parchment} />

      <Footer />
    </main>
  );
}
