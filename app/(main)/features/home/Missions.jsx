"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import { MISSIONS_URL, MISSIONS_SOLO_LEVELING, MISSION_GATES } from "@/data/skillntell/missions";

/** Short Solo Leveling–flavoured teaser that sends people to the Missions platform. */
export default function Missions() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-portal]", { rotate: 360, duration: 40, ease: "none", repeat: -1 });
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-world]", { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.02, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-hunter]", { y: 60 }, { y: -40, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-gate]", { y: 80, rotate: (i) => (i - 1) * 10, opacity: 0 }, {
        y: 0, rotate: (i) => (i - 1) * 6, opacity: 1, stagger: 0.12, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: "[data-gates]", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="missions" className="relative overflow-hidden bg-space-dark py-24 md:py-32">
      <div data-world className="absolute inset-0">
        <Image src="/images/missions/world.webp" alt="" fill sizes="100vw" className="object-cover opacity-60" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-dark/40 to-space-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-space-dark/90 via-space-dark/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-space-dark to-transparent" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span data-reveal="fade" className="snt-eyebrow">03 — Skill&amp;Tell Missions</span>
          <Image
            data-reveal="up"
            src="/images/missions/logo.webp"
            alt="Skill&Tell Missions"
            width={960}
            height={418}
            sizes="(min-width:1024px) 520px, 90vw"
            className="mt-6 h-auto w-full max-w-[520px]"
          />
          <p data-reveal="up" className="snt-lead mt-6 max-w-xl text-white/75">{MISSIONS_SOLO_LEVELING}</p>
          <div data-reveal="up" className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <a href={MISSIONS_URL} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--primary">
                Enter the Missions platform <ArrowUpRight className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic>
              <TLink href="/missions" className="snt-btn snt-btn--ghost">
                How it works <ArrowRight className="snt-btn__arrow h-5 w-5" />
              </TLink>
            </Magnetic>
          </div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[460px] lg:col-span-6 lg:h-[540px] lg:max-w-none">
          <div className="absolute left-1/2 top-[44%] w-[78%] -translate-x-1/2 -translate-y-1/2">
            <Image data-portal src="/images/missions/portal.webp" alt="" width={540} height={548} sizes="420px" className="h-auto w-full opacity-90" />
          </div>
          <div data-hunter className="absolute inset-x-0 bottom-0 flex justify-center">
            <Image src="/images/missions/hunter.webp" alt="" width={1400} height={1061} sizes="(min-width:1024px) 600px, 90vw" className="h-auto w-[105%] max-w-none drop-shadow-[0_20px_60px_rgba(10,0,26,0.9)]" />
          </div>
        </div>
      </div>

      <div data-gates className="relative mx-auto mt-12 flex max-w-[1400px] justify-center gap-4 px-5 md:mt-16 md:gap-8 md:px-10">
        {MISSION_GATES.map((g) => (
          <figure key={g.name} data-gate className="w-[30%] max-w-[190px]">
            <Image src={g.image} alt={`${g.name} gate`} width={540} height={1200} sizes="190px" className="h-auto w-full transition-transform duration-500 hover:-translate-y-3 hover:scale-105 drop-shadow-[0_20px_40px_rgba(157,78,221,0.45)]" />
          </figure>
        ))}
      </div>
    </section>
  );
}
