"use client";

import { useEffect } from "react";
import "@/styles/odyssea.css";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroSection from "../sections/hero_section";
import AboutSection from "../sections/about_section";
import AgendaSection from "../sections/agenda_section";
import SeparatorSection from "../sections/separator_section";
import FaqSection from "../sections/faq_section";
import Sparkles from "../components/Sparkles";
import { HERO_SPARKS } from "../components/sparkle_marks";
import Image from "next/image";
import stars from "@/assets/images/odyssea/stars.png";
import parchment from "@/assets/images/odyssea/parchment.webp";


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

      {/* ---- the night half: hero + about, under one starfield ----

           z-10 puts this half ABOVE the parchment below it in paint order. the
           parchment section's background is attachment:fixed, so the engine
           composites it in its own layer and can round it a device row higher
           than the section's own box — that stray row of paper is what showed
           as a pale hairline just above the chevron. painting the night over it
           removes the row outright, whatever the engine rounds to, and the
           3px lap below finishes the join from the other side. */}
      <div className="relative z-10 bg-ody-night">
        <Image
          src={stars}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
        <Sparkles marks={HERO_SPARKS} />
        <div className="relative">
          <HeroSection />
          <AboutSection />
        </div>

        {/* the night lapped 3px over the parchment's top edge — the same 3px the
            chevron already paints there, so nothing looks different */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[3px] bg-ody-night"
        />
      </div>

      {/* ---- the parchment half ---- */}
      <AgendaSection parchmentImg={parchment.src} />
      <SeparatorSection />
      <FaqSection parchmentImg={parchment.src} />

      <Footer />
    </main>
  );
}
