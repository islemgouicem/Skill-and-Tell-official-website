"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ChevronsUp, ClipboardList, Crown, Hammer, Sparkles, Swords, Trophy, UserRound, Zap } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion, consumeStageDelay } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import SystemPanel from "@/components/site/SystemPanel";
import Faq from "../features/home/Faq";
import { MISSIONS_URL, MISSIONS_STORY, MISSION_JOURNEY, MISSIONS_FINAL_CALL, MISSIONS_FAQ } from "@/data/skillntell/missions";

const STEP_ICONS = { awakening: Zap, profile: UserRound, board: ClipboardList, grind: Hammer, complete: Swords, xp: Sparkles, level: ChevronsUp, leaderboard: Trophy, rank: Crown };

function JoinButton({ children = "Create your account" }) {
  return (
    <Magnetic>
      <a href={MISSIONS_URL} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--primary">
        {children} <ArrowUpRight className="h-5 w-5" />
      </a>
    </Magnetic>
  );
}

function Hero() {
  const root = useRef(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const delay = consumeStageDelay();
      if (prefersReducedMotion()) {
        gsap.set(q("[data-g-title], [data-g-fade]"), { opacity: 1 });
        return;
      }
      const split = SplitText.create(q("[data-g-title]"), { type: "lines", mask: "lines" });
      gsap.set(q("[data-g-title]"), { opacity: 1 });
      gsap.timeline({ delay: delay + 0.1 })
        .from(split.lines, { yPercent: 110, stagger: 0.12, duration: 1.1, ease: "power4.out" }, 0.2)
        .fromTo(q("[data-g-fade]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.9 }, 0.4);
      gsap.to(q("[data-g-bg]"), { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-[#07000f] pb-16 pt-28 md:pb-24 md:pt-36">
      <div data-g-bg className="absolute inset-0">
        <Image src="/images/missions/world.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#07000f]/70 via-[#07000f]/40 to-[#07000f]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
        <Image data-g-fade src="/images/missions/logo-1.PNG" alt="Skill&Tell Missions" width={960} height={418} priority sizes="340px" className="h-auto w-[240px] md:w-[340px]" />
        <h1 data-g-title className="snt-display mt-6 text-white opacity-0 [text-shadow:0_10px_60px_rgba(10,0,26,0.8)]">
          From zero to <span className="gradient-text-warm">hero.</span>
        </h1>
        <p data-g-fade className="snt-lead mt-6 max-w-xl text-white/75">
          Hands-on missions, XP, levels and a leaderboard. A new way to learn at Skill&amp;Tell, inspired by Solo Leveling.
        </p>
        <div data-g-fade className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <JoinButton />
          <a href="#concept" className="snt-btn snt-btn--ghost">
            How it works <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Concept() {
  return (
    <section id="concept" className="relative scroll-mt-24 bg-[#07000f] py-16 md:py-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <span data-reveal="fade" className="snt-eyebrow">01 — The concept</span>
          <h2 data-split="lines" className="snt-h2 mt-5 text-white">Inspired by Solo Leveling</h2>
          <p data-reveal="up" className="mt-6 leading-relaxed text-white/70 md:text-lg">{MISSIONS_STORY.anime}</p>
          <p data-reveal="up" className="mt-5 font-futura_bold text-xl text-accent-300 md:text-2xl">{MISSIONS_STORY.you}</p>
        </div>
        <div data-reveal="up" className="lg:col-span-7">
          <SystemPanel title="System">
            <ul className="divide-y divide-white/10">
              {MISSIONS_STORY.map.map((row) => (
                <li key={row.anime} className="grid gap-1 py-3.5 sm:grid-cols-[minmax(0,190px)_1fr] sm:items-center sm:gap-5">
                  <span className="font-futura_md_bt text-xs uppercase tracking-[0.2em] text-Main-200">{row.anime}</span>
                  <span className="text-[15px] text-white/90">{row.club}</span>
                </li>
              ))}
            </ul>
          </SystemPanel>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const root = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The XP bar fills as you read through the journey.
      gsap.fromTo("[data-journey-xp]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: "[data-journey-grid]", start: "top 75%", end: "bottom 70%", scrub: 0.6 },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-space-dark py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">02 — Your journey</span>
            <h2 data-split="lines" className="snt-h2 mt-5 text-white">How it works</h2>
          </div>
          <div data-reveal="fade" className="w-full max-w-xs">
            <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-white/45">
              <span>Hunter</span>
              <span className="text-accent-300">XP</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <span data-journey-xp className="block h-full origin-left rounded-full bg-gradient-to-r from-Main-400 to-accent-400" />
            </div>
          </div>
        </div>

        <ol data-journey-grid data-reveal-stagger className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3 lg:gap-4">
          {MISSION_JOURNEY.map((s, i) => {
            const Icon = STEP_ICONS[s.key] ?? Sparkles;
            return (
              <li key={s.key} className="group relative rounded-[20px] border border-white/10 bg-white/[0.03] p-5 transition-colors duration-500 hover:border-Main-300/50 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="snt-icon h-10 w-10 rounded-xl">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-futura_bold text-lg leading-tight text-white">{s.title}</h3>
                  <span className="ml-auto font-compacta text-3xl leading-none text-white/15">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function FinalCall() {
  return (
    <section className="relative overflow-hidden bg-[#14002e]">
      <Image src="/images/missions/world.webp" alt="" fill sizes="100vw" className="object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#14002e] via-[#14002e]/75 to-[#14002e]/10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#14002e] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#14002e] to-transparent" />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-6 px-5 pt-16 md:px-10 lg:grid-cols-2 lg:pt-0">
        <div className="py-4 text-center lg:py-28 lg:text-left">
          <span data-reveal="fade" className="snt-eyebrow">{MISSIONS_FINAL_CALL.title}</span>
          <h2 data-split="lines" className="snt-h2 mt-5 text-white">
            Will you answer the call, <span className="gradient-text-warm">Hunter?</span>
          </h2>
          <p data-reveal="up" className="snt-lead mx-auto mt-5 max-w-md text-white/75 lg:mx-0">
            The system is ready. The missions are waiting. Your journey starts with one decision.
          </p>
          <div data-reveal="up" className="mt-9 flex justify-center lg:justify-start">
            <JoinButton>Enter the system</JoinButton>
          </div>
        </div>
        <div data-reveal="up" className="relative mx-auto h-[300px] w-full max-w-[520px] self-end sm:h-[380px] lg:h-[480px]">
          <div className="absolute bottom-[8%] left-1/2 h-[70%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(157,78,221,0.5)_0%,transparent_70%)]" aria-hidden="true" />
          <Image src="/images/missions/hunter.webp" alt="A hunter facing a gate" fill sizes="(min-width:1024px) 520px, 90vw" className="object-contain object-bottom" />
        </div>
      </div>
    </section>
  );
}

export default function MissionsView() {
  const root = useRef(null);
  useReveals(root);
  return (
    <div ref={root}>
      <Hero />
      <Concept />
      <Journey />
      <Faq items={MISSIONS_FAQ} title="Missions F&Q" subtitle="The questions we get the most about Missions." id="missions-faq" index="03" />
      <FinalCall />
    </div>
  );
}
