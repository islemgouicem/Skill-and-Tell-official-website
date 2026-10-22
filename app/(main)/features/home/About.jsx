"use client";
import { useRef } from "react";
import Image from "next/image";
import { Lightbulb, Rocket, Users, Award } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Tilt from "@/components/motion/Tilt";
import { PILLARS } from "@/data/skillntell/site";
import whitebg from "@/assets/images/skillntell/white_bg.webp";
import aboutus1 from "@/assets/images/skillntell/about_us1.webp";
import aboutus2 from "@/assets/images/skillntell/about_us2.webp";
import phone from "@/assets/images/skillntell/phone.webp";

const ICONS = { about: Lightbulb, vision: Rocket, specialty: Users, achievements: Award };

function Pillar({ pillar, variant }) {
  const Icon = ICONS[pillar.key];
  return (
    <Tilt
      max={5}
      className={`${variant === "deep" ? "about-cont" : "bg-Main-600"} relative h-full rounded-[20px] p-6 text-white shadow-[0_24px_50px_-25px_rgba(60,9,108,0.65)]`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-futura_bold text-lg">{pillar.title}</h3>
      </div>
      <div className="flex gap-3">
        <span className="w-0.5 shrink-0 rounded bg-gradient-to-b from-accent-300 to-white/10" />
        <p className="text-[15px] leading-relaxed text-white/85">{pillar.short}</p>
      </div>
    </Tilt>
  );
}

export default function About() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: "[data-visual]", start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-phone]", { y: 70 }, { y: -50, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-photo='1']", { y: -20, rotate: -12 }, { y: 50, rotate: -6, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-photo='2']", { y: 40, rotate: 12 }, { y: -40, rotate: 7, ease: "none", scrollTrigger: st });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="snt-light relative pb-12 pt-32 md:pb-16 md:pt-44">
      <Image src={whitebg} alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-auto w-[90%] select-none" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Visual: the app phone with two club photos */}
        <div data-visual data-reveal="up" className="relative mx-auto h-[400px] w-full max-w-[420px] sm:h-[480px] lg:col-span-5 lg:h-[560px] lg:max-w-none">
          <div data-photo="1" className="absolute left-0 top-[6%] w-[44%] overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_40px_-15px_rgba(60,9,108,0.45)]">
            <Image src={aboutus1} alt="Skill&Tell members during an event" className="h-auto w-full" sizes="220px" />
          </div>
          <div data-photo="2" className="absolute bottom-[4%] right-0 w-[38%] overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_40px_-15px_rgba(60,9,108,0.45)]">
            <Image src={aboutus2} alt="A Skill&Tell member at a club activity" className="h-auto w-full" sizes="200px" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              data-phone
              src={phone}
              alt="The Skill & Tell app"
              sizes="280px"
              className="relative h-[92%] w-auto drop-shadow-[0_40px_50px_rgba(60,9,108,0.45)]"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">01 — Identity</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-neutral-600">Who Are We?</h2>
          <p data-reveal="up" className="snt-lead mt-5 max-w-xl text-neutral-500">
            The scientific club of ENSIA where skills are sharpened, ideas come to life and collaboration thrives.
          </p>
          <div data-reveal-stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Pillar key={p.key} pillar={p} variant={i === 0 || i === 3 ? "deep" : "solid"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
