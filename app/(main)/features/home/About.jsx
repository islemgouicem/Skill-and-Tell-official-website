"use client";
import { useRef } from "react";
import Image from "next/image";
import { Lightbulb, Rocket, Users, Award } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Tilt from "@/components/motion/Tilt";
import { PILLARS } from "@/data/skillntell/site";
import whitebg from "@/assets/images/skillntell/white_bg.webp";
import photoArcade from "@/assets/images/skillntell/events/arcade-2024.webp";
import photoFormatech from "@/assets/images/skillntell/events/formatech-1.webp";
import phone from "@/assets/images/skillntell/phone.webp";

const ICONS = { about: Lightbulb, vision: Rocket, specialty: Users, achievements: Award };

function Pillar({ pillar, variant }) {
  const Icon = ICONS[pillar.key];
  return (
    <Tilt
      max={5}
      className={`${variant === "deep" ? "about-cont" : "bg-Main-600"} relative h-full rounded-[20px] p-6 text-white`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-futura_bold text-lg">{pillar.title}</h3>
      </div>
      <div className="flex gap-3">
        <span className="w-0.5 shrink-0 rounded bg-white/50" />
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
      // Gentle drift that stays inside the column (nothing gets cut by the next section).
      gsap.fromTo("[data-phone]", { y: 24 }, { y: -24, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-photo='1']", { y: -12, rotate: -10 }, { y: 18, rotate: -6, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-photo='2']", { y: 16, rotate: 10 }, { y: -16, rotate: 6, ease: "none", scrollTrigger: st });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="snt-light relative z-[1] pb-16 pt-32 md:pb-20 md:pt-44">
      <Image src={whitebg} alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-auto w-[90%] select-none" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Visual: the app phone with two club photos */}
        <div data-visual data-reveal="up" className="relative order-2 mx-auto h-[400px] w-full max-w-[420px] sm:h-[480px] lg:order-1 lg:col-span-5 lg:h-[560px] lg:max-w-none">
          <div data-photo="1" className="absolute left-[1%] top-[4%] w-[48%] overflow-hidden rounded-2xl border-4 border-white">
            <Image src={photoArcade} alt="Skill&Tell members at ARCADE" className="h-auto w-full" sizes="(min-width:1024px) 280px, 48vw" />
          </div>
          <div data-photo="2" className="absolute bottom-[4%] right-0 w-[54%] overflow-hidden rounded-2xl border-4 border-white">
            <Image src={photoFormatech} alt="The Skill&Tell team at Formatech Expo" className="h-auto w-full" sizes="(min-width:1024px) 320px, 54vw" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              data-phone
              src={phone}
              alt="The Skill & Tell app"
              sizes="280px"
              className="relative h-[74%] w-auto"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
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
