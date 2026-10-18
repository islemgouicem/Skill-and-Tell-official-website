"use client";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import EmberField from "@/components/motion/EmberField";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import SystemPanel from "@/components/site/SystemPanel";
import { MISSIONS_INTRO, MISSION_PHASES, MISSION_RANKS, MISSION_TRACKS } from "@/data/skillntell/missions";

export default function Missions() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const nodes = gsap.utils.toArray("[data-phase]");
      if (reduced) {
        gsap.set("[data-phase-line]", { scaleY: 1 });
        gsap.set("[data-xp-fill]", { scaleX: 1 });
        return;
      }
      // Timeline spine draws itself; each phase lights up as the line reaches it.
      gsap.fromTo("[data-phase-line]", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: "[data-phases]", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      nodes.forEach((n) => {
        gsap.timeline({ scrollTrigger: { trigger: n, start: "top 68%", toggleActions: "play none none reverse" } })
          .to(n.querySelector("[data-dot]"), { backgroundColor: "#ff6d00", boxShadow: "0 0 0 6px rgba(255,109,0,0.18), 0 0 24px #ff6d00", duration: 0.3 })
          .fromTo(n.querySelector("[data-phase-body]"), { x: 30, opacity: 0.25 }, { x: 0, opacity: 1, duration: 0.6 }, 0);
      });

      // XP bar climbs through the ranks.
      const ranks = gsap.utils.toArray("[data-rank]");
      gsap.timeline({ scrollTrigger: { trigger: "[data-xp]", start: "top 80%", end: "top 35%", scrub: 0.8 } })
        .fromTo("[data-xp-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 })
        .to(ranks, { color: "#ffffff", textShadow: "0 0 18px rgba(255,158,0,0.9)", stagger: 0.24, duration: 0.05 }, 0);

      // "New mission" notification types itself in.
      const txt = root.current.querySelector("[data-typed]");
      const full = txt.dataset.typed;
      const o = { n: 0 };
      gsap.to(o, {
        n: full.length, duration: 1.6, ease: "none",
        scrollTrigger: { trigger: txt, start: "top 85%", once: true },
        onUpdate: () => (txt.textContent = full.slice(0, Math.round(o.n))),
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="missions" className="relative overflow-hidden bg-space-dark py-24 md:py-36">
      <div className="absolute inset-0" style={{ background: "radial-gradient(50% 40% at 15% 20%, rgba(123,44,191,0.35), transparent 70%), radial-gradient(40% 35% at 90% 80%, rgba(255,109,0,0.15), transparent 70%)" }} />
      <div className="snt-grid-bg absolute inset-0" />
      <EmberField density={0.35} interactive={false} />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span data-reveal="fade" className="snt-eyebrow">03 — New format</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">
              Skill&amp;Tell <span className="gradient-text-warm">Missions</span>
            </h2>
            <p data-reveal="up" className="snt-lead mt-6 max-w-xl text-white/70">{MISSIONS_INTRO}</p>

            <div data-reveal="up" data-delay="0.1" className="mt-10 max-w-md">
              <SystemPanel title="Notification">
                <p className="text-center font-futura_md_bt text-white/90">
                  <span className="text-accent-300">[</span>
                  <span data-typed="A new mission is available." className="inline-block min-w-[1ch]">A new mission is available.</span>
                  <span className="text-accent-300">]</span>
                </p>
                <p className="mt-3 text-center text-sm text-white/55">Learn it. Practise it. Then prove it against the clock.</p>
              </SystemPanel>
            </div>

            <div data-reveal="up" data-delay="0.15" className="mt-8 flex flex-wrap gap-2">
              {MISSION_TRACKS.map((t) => (
                <span key={t.name} className="snt-chip">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-400" /> {t.name}
                </span>
              ))}
            </div>

            <div data-reveal="up" data-delay="0.2" className="mt-10">
              <Magnetic>
                <TLink href="/missions" className="snt-btn snt-btn--primary">
                  Discover Missions <ArrowRight className="snt-btn__arrow h-5 w-5" />
                </TLink>
              </Magnetic>
            </div>
          </div>

          <ol data-phases className="relative pl-10 md:pl-14">
            <span className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10 md:left-[15px]" aria-hidden="true" />
            <span data-phase-line className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent-500 via-accent-300 to-Main-400 md:left-[15px]" aria-hidden="true" />
            {MISSION_PHASES.map((p, i) => (
              <li key={p.key} data-phase className="relative pb-12 last:pb-0 md:pb-16">
                <span data-dot className="absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-Main-300/40 bg-Main-700 md:-left-14 md:h-8 md:w-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <div data-phase-body className="snt-card p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-compacta text-5xl leading-none text-white/15 md:text-6xl">0{i + 1}</span>
                    <span className="snt-chip">{p.duration}</span>
                  </div>
                  <h3 className="snt-h3 mt-3 text-white">{p.name}</h3>
                  <p className="mt-2 text-white/65">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div data-xp className="mt-24 md:mt-32">
          <div className="flex items-end justify-between gap-6">
            <h3 data-reveal="up" className="snt-h3 text-white">Earn XP. Climb the ranks.</h3>
            <span data-reveal="fade" className="hidden font-futura_md_bt text-sm text-white/50 md:block">Every mission levels you up</span>
          </div>
          <div className="relative mt-8 h-3 overflow-hidden rounded-full bg-white/10">
            <span data-xp-fill className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-Main-500 via-accent-500 to-accent-300 shadow-[0_0_24px_rgba(255,109,0,0.7)]" />
          </div>
          <div className="mt-5 grid grid-cols-5 text-center">
            {MISSION_RANKS.map((r, i) => (
              <div key={r.name} className={i === 0 ? "text-left" : i === MISSION_RANKS.length - 1 ? "text-right" : ""}>
                <span data-rank className="font-futura_bold text-sm text-white/35 transition-colors sm:text-base md:text-xl">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
