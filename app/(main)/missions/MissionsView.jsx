"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight, Brain, Code2, Megaphone, Palette, Smartphone, Handshake, Trophy, Users, Building, Globe2 } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion, consumeStageDelay, paintGradients } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import EmberField from "@/components/motion/EmberField";
import Magnetic from "@/components/motion/Magnetic";
import Tilt from "@/components/motion/Tilt";
import TLink from "@/components/site/TLink";
import SystemPanel from "@/components/site/SystemPanel";
import PartnerCTA from "@/components/site/PartnerCTA";
import { MISSIONS_INTRO, MISSION_PHASES, MISSION_RANKS, MISSION_TRACKS, MISSION_FACTS, MISSIONS_URL } from "@/data/skillntell/missions";

const TRACK_ICONS = { Web: Code2, Mobile: Smartphone, AI: Brain, Marketing: Megaphone, Relex: Handshake, "UI/UX": Palette };

function Gate() {
  const root = useRef(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const delay = consumeStageDelay();
      const reduced = prefersReducedMotion();
      if (reduced) {
        gsap.set(q("[data-g-title], [data-g-fade]"), { opacity: 1 });
        return;
      }
      const split = SplitText.create(q("[data-g-title]"), { type: "lines,chars", mask: "lines" });
      gsap.set(q("[data-g-title]"), { opacity: 1 });
      paintGradients(q("[data-g-title]")[0]);

      gsap.timeline({ delay: delay + 0.1 })
        .from(q("[data-ring]"), { scale: 0, opacity: 0, duration: 1.6, stagger: 0.12, ease: "expo.out" }, 0)
        .from(q("[data-core]"), { scale: 0, duration: 1.4, ease: "expo.out" }, 0.2)
        .from(split.chars, { yPercent: 120, rotate: 8, stagger: 0.025, duration: 1, ease: "power4.out" }, 0.4)
        .fromTo(q("[data-g-fade]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9 }, 0.8);

      q("[data-ring]").forEach((r, i) => gsap.to(r, { rotate: i % 2 ? -360 : 360, duration: 30 + i * 12, ease: "none", repeat: -1 }));
      gsap.to(q("[data-core]"), { scale: 1.08, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // Scroll = walking into the gate.
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
        .to(q("[data-gate]"), { scale: 3.2, ease: "none" }, 0)
        .to(q("[data-g-content]"), { opacity: 0, y: -80, ease: "none" }, 0)
        .to(q("[data-flash]"), { opacity: 1, ease: "power2.in" }, 0.4);
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#07000f]">
      <Image src="/images/missions/world.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07000f]/70 via-[#07000f]/30 to-[#07000f]" />
      <EmberField density={0.7} />
      <div data-gate aria-hidden="true" className="absolute left-1/2 top-1/2 h-[min(110vw,820px)] w-[min(110vw,820px)] -translate-x-1/2 -translate-y-1/2">
        <div data-core className="absolute inset-[30%] rounded-full" style={{ background: "radial-gradient(circle, #ffc78a 0%, #ff6d00 22%, #9d4edd 52%, rgba(60,9,108,0.4) 70%, transparent 72%)", filter: "blur(18px)" }} />
        <div data-ring className="absolute inset-[22%] rounded-full border-2 border-accent-300/60 shadow-[0_0_60px_rgba(255,109,0,0.5),inset_0_0_60px_rgba(255,109,0,0.4)]" />
        <div data-ring className="absolute inset-[14%] rounded-full border border-dashed border-Main-300/50" />
        <div data-ring className="absolute inset-[6%] rounded-full border border-Main-300/25">
          {["left-1/2 top-0", "left-full top-1/2", "left-1/2 top-full", "left-0 top-1/2"].map((pos) => (
            <span key={pos} className={`absolute ${pos} h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-accent-400 shadow-[0_0_14px_#ff8500]`} />
          ))}
        </div>
        <div data-ring className="absolute inset-0 rounded-full border border-dotted border-white/10" />
      </div>
      <div data-flash className="pointer-events-none absolute inset-0 bg-[#1a0132] opacity-0" />

      <div data-g-content className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 pt-20 text-center">
        <Image data-g-fade src="/images/missions/logo.webp" alt="Skill&Tell Missions" width={960} height={418} priority sizes="360px" className="h-auto w-[260px] drop-shadow-[0_0_30px_rgba(157,78,221,0.6)] md:w-[360px]" />
        <h1 data-g-title className="snt-display mt-6 text-white opacity-0 [text-shadow:0_10px_60px_rgba(10,0,26,0.8)]">
          Learn. Practise.
          <br />
          <span className="gradient-text-warm">Compete.</span>
        </h1>
        <p data-g-fade className="snt-lead mt-7 max-w-2xl text-white/75">{MISSIONS_INTRO}</p>
        <div data-g-fade className="mt-10 w-full max-w-md">
          <SystemPanel title="System">
            <p className="text-white/90">You have been invited to join a mission.</p>
            <div className="mt-5 flex justify-center gap-3">
              <a href={MISSIONS_URL} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--primary !px-5 !py-3 text-sm">Accept <ArrowUpRight className="h-4 w-4" /></a>
              <a href="#format" className="snt-btn snt-btn--ghost !px-5 !py-3 text-sm">How it works <ArrowDown className="h-4 w-4" /></a>
            </div>
          </SystemPanel>
        </div>
      </div>
    </section>
  );
}

function Phases() {
  const root = useRef(null);
  const track = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        const dist = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -dist(), ease: "none",
          scrollTrigger: { trigger: "[data-ph-pin]", start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
        });
        gsap.to("[data-ph-bar]", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-ph-pin]", start: "top top", end: () => `+=${dist()}`, scrub: true } });
        gsap.utils.toArray("[data-phase-card]").forEach((card) => {
          gsap.fromTo(card.querySelector("[data-big]"), { xPercent: 40, opacity: 0.1 }, {
            xPercent: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 30%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="format" className="relative bg-space-dark">
      <div data-ph-pin className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 lg:py-0">
        <div className="mx-auto mb-12 w-full max-w-[1400px] px-5 md:px-10">
          <span data-reveal="fade" className="snt-eyebrow">01 — The format</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">Five phases. One mission.</h2>
        </div>
        <div ref={track} className="flex flex-col gap-5 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-8">
          {MISSION_PHASES.map((p, i) => (
            <article key={p.key} data-phase-card className="snt-card relative overflow-hidden p-7 md:p-10 lg:h-[56vh] lg:w-[min(560px,42vw)]">
              <span data-big aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-2 font-compacta text-[13rem] leading-none text-white/[0.06] md:text-[18rem]">0{i + 1}</span>
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="flex items-center justify-between">
                  <span className="font-futura_md_bt text-sm uppercase tracking-[0.3em] text-Main-300">Phase 0{i + 1}</span>
                  <span className="snt-chip">{p.duration}</span>
                </div>
                <div>
                  <h3 className="font-futura_bold text-4xl text-white md:text-6xl">{p.name}</h3>
                  <p className="mt-4 max-w-sm text-lg text-white/70">{p.body}</p>
                </div>
              </div>
            </article>
          ))}
          <div className="hidden w-[10vw] shrink-0 lg:block" />
        </div>
        <div className="mx-auto mt-12 hidden w-full max-w-[1400px] px-10 lg:block">
          <div className="h-[2px] w-full bg-white/10"><div data-ph-bar className="h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-Main-300" /></div>
        </div>
      </div>
    </section>
  );
}

function Ranks() {
  const root = useRef(null);
  useGSAP(
    () => {
      const xp = root.current.querySelector("[data-xp-num]");
      if (prefersReducedMotion()) {
        xp.textContent = "100";
        gsap.set("[data-rank-badge]", { opacity: 1 });
        return;
      }
      const o = { v: 0 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 80%", scrub: 0.6 } });
      tl.to(o, { v: 100, ease: "none", duration: 1, onUpdate: () => (xp.textContent = Math.round(o.v)) }, 0)
        .fromTo("[data-xp-fill2]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
      gsap.utils.toArray("[data-rank-badge]").forEach((b, i) => {
        tl.fromTo(b, { opacity: 0.25, scale: 0.85, filter: "grayscale(1)" }, { opacity: 1, scale: 1, filter: "grayscale(0)", duration: 0.12 }, i * 0.22);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-[#0d0022] py-24 md:py-36">
      <div className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(123,44,191,0.3), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <span data-reveal="fade" className="snt-eyebrow">02 — Progression</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Level up with every mission</h2>
            <p data-reveal="up" className="snt-lead mt-6 text-white/65">
              Each mission earns XP. Stack it up session after session and climb from Rookie to Master — on your track&apos;s leaderboard, your department&apos;s, and the overall one.
            </p>
          </div>
          <div className="lg:col-span-7">
            <SystemPanel title="Status">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">Experience</p>
                  <p className="font-compacta text-7xl leading-none text-white md:text-8xl"><span data-xp-num>0</span><span className="text-3xl text-accent-300"> XP</span></p>
                </div>
                <Trophy className="h-12 w-12 text-accent-300 drop-shadow-[0_0_14px_rgba(255,158,0,0.8)]" />
              </div>
              <div className="relative mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                <span data-xp-fill2 className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-Main-500 via-accent-500 to-accent-300 shadow-[0_0_24px_rgba(255,109,0,0.7)]" />
              </div>
              <ol className="mt-8 grid grid-cols-5 gap-2 md:gap-4">
                {MISSION_RANKS.map((r, i) => (
                  <li key={r.name} data-rank-badge className="flex flex-col items-center text-center">
                    <span className="relative grid h-14 w-14 place-items-center md:h-20 md:w-20">
                      <span className="absolute inset-1 rotate-45 rounded-xl border-2 border-accent-300/70 bg-gradient-to-br from-Main-500/60 to-accent-500/40 shadow-[0_0_24px_rgba(255,109,0,0.45)]" />
                      <span className="relative font-futura_bold text-lg text-white md:text-2xl">{"ⅠⅡⅢⅣⅤ"[i]}</span>
                    </span>
                    <span className="mt-3 font-futura_bold text-[11px] text-white sm:text-sm md:text-base">{r.name}</span>
                  </li>
                ))}
              </ol>
            </SystemPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tracks() {
  return (
    <section className="relative bg-space-dark py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">03 — Tracks</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Pick your arena</h2>
          </div>
          <p data-reveal="up" className="max-w-md text-white/60 lg:text-right">Missions run across the club&apos;s departments — from code to communication.</p>
        </div>
        <div data-reveal-stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {MISSION_TRACKS.map((t) => {
            const Icon = TRACK_ICONS[t.name] ?? Code2;
            return (
              <Tilt key={t.name} className="snt-card group overflow-hidden p-6 md:p-8">
                <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-500/0 blur-2xl transition-colors duration-700 group-hover:bg-accent-500/40" />
                <Icon className="h-8 w-8 text-accent-300 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 md:h-10 md:w-10" />
                <h3 className="mt-8 font-futura_bold text-2xl text-white md:text-3xl">{t.name}</h3>
                <p className="mt-1 text-sm text-white/50">{t.dept === t.name ? "Department" : `${t.dept} department`}</p>
              </Tilt>
            );
          })}
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {[
            { icon: Trophy, title: "Per track", body: "Web, Mobile, AI and every other track keeps its own ranking." },
            { icon: Building, title: "Per department", body: "Departments compete with each other, mission after mission." },
            { icon: Globe2, title: "Overall", body: "One global board for the whole Skill&Tell community." },
          ].map((b) => (
            <div key={b.title} data-reveal="up" className="rounded-[22px] border border-white/10 p-7">
              <b.icon className="h-7 w-7 text-Main-300" />
              <h3 className="mt-5 font-futura_bold text-xl text-white">Leaderboard · {b.title}</h3>
              <p className="mt-2 text-white/60">{b.body}</p>
              <div className="mt-6 space-y-2" aria-hidden="true">
                {[92, 74, 58].map((w, i) => (
                  <div key={w} className="flex items-center gap-3">
                    <span className="w-4 font-futura_bold text-sm text-white/40">{i + 1}</span>
                    <span className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-Main-400" style={{ width: `${w}%`, opacity: 1 - i * 0.25 }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section className="snt-light relative py-24 md:py-32">
      <div className="snt-grid-bg snt-grid-bg--light absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">04 — In practice</span>
        <h2 data-split="chars" className="snt-h2 mt-5 text-neutral-600">Small rooms. Big energy.</h2>
        <div data-reveal-stagger className="mt-14 grid gap-px overflow-hidden rounded-[26px] bg-Main-300/40 sm:grid-cols-2 lg:grid-cols-4">
          {MISSION_FACTS.map((f) => (
            <div key={f.label} className="bg-white p-7 md:p-9">
              <p className="font-compacta text-[clamp(4rem,7vw,6.5rem)] leading-[0.85] gradient-text">{f.value}</p>
              <p className="mt-4 text-neutral-500">{f.label}</p>
            </div>
          ))}
        </div>
        <div data-reveal="up" className="mt-14 flex flex-col items-start justify-between gap-6 rounded-[26px] bg-Main-700 p-8 text-white md:flex-row md:items-center md:p-12">
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-500"><Users className="h-6 w-6" /></span>
            <div>
              <p className="font-futura_bold text-2xl">Open to everyone</p>
              <p className="text-white/65">Members of any department — and students who aren&apos;t members yet.</p>
            </div>
          </div>
          <Magnetic>
            <TLink href="/register" className="snt-btn snt-btn--primary">Join Skill&amp;Tell <ArrowRight className="snt-btn__arrow h-5 w-5" /></TLink>
          </Magnetic>
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
      <Gate />
      <Phases />
      <Ranks />
      <Tracks />
      <Facts />
      <PartnerCTA eyebrow="Bring a challenge" title="Got a real problem? Make it a mission." text="Companies, clubs and experts can host a Mission or provide a real-world challenge for our teams to solve." cta="Propose a mission" />
    </div>
  );
}
