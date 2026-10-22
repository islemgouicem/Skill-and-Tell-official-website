"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";

const DEPARTMENTS = ["IT", "Design", "Events", "Relex", "Marketing", "Production"];

/** Department personality test — a brand-styled card on a transparent background. */
export default function DepartmentTest() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-orbit]", { rotate: 360, duration: 60, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-chip]", { rotate: -360, duration: 60, ease: "none", repeat: -1 });
      gsap.to("[data-core]", { scale: 1.08, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="department-test" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div data-reveal="up" className="snt-card grid items-center gap-10 overflow-hidden p-7 md:p-12 lg:grid-cols-2">
          <div>
            <span className="snt-eyebrow">By Skill&amp;Tell</span>
            <h2 className="snt-h2 mt-5 text-white">
              Where do <span className="snt-brand-text">you</span> belong?
            </h2>
            <p className="snt-lead mt-5 max-w-md text-white/70">Discover your ideal department through our personality-based assessment.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a href="https://departments-test.vercel.app/" target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--primary">
                  Take the test <ArrowUpRight className="h-5 w-5" />
                </a>
              </Magnetic>
              <div className="flex flex-wrap gap-2">
                <span className="snt-chip">6 departments</span>
                <span className="snt-chip">~3 min</span>
                <span className="snt-chip">Instant match</span>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[380px]">
            <div className="absolute inset-[10%] rounded-full border border-dashed border-Main-300/30" />
            <div className="absolute inset-[30%] rounded-full border border-Main-300/15" />
            <div data-core className="absolute inset-[36%] rounded-full bg-gradient-to-br from-accent-500 via-accent-400 to-Main-400 shadow-[0_0_60px_rgba(255,109,0,0.55)]">
              <svg viewBox="0 0 24 24" className="absolute inset-[26%] text-white">
                <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill="currentColor" />
              </svg>
            </div>
            <div data-orbit className="absolute inset-[10%]">
              {DEPARTMENTS.map((d, i) => {
                const a = (i / DEPARTMENTS.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <div key={d} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(50 + Math.cos(a) * 50).toFixed(3)}%`, top: `${(50 + Math.sin(a) * 50).toFixed(3)}%` }}>
                    <span data-orbit-chip className="block whitespace-nowrap rounded-full border border-Main-300/40 bg-[#1a0132]/90 px-3 py-1.5 font-futura_md_bt text-xs text-white shadow-[0_0_20px_rgba(157,78,221,0.35)] md:text-sm">
                      {d}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
