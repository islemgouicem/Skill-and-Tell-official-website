"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Code2, PenTool, CalendarDays, Handshake, Megaphone, HeartHandshake } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import sntMark from "@/assets/images/shared/snt_mark.png";

const DEPARTMENTS = [
  { name: "HR", icon: HeartHandshake },
  { name: "IT", icon: Code2 },
  { name: "Design", icon: PenTool },
  { name: "Marketing", icon: Megaphone },
  { name: "Events", icon: CalendarDays },
  { name: "Relex", icon: Handshake },
];

const pos = (i, r = 50) => {
  const a = (i / DEPARTMENTS.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r };
};

/**
 * Department test: the six departments orbit the Skill&Tell mark while a
 * "match" scans through them , a playful preview of what the test does.
 */
export default function DepartmentTest() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray("[data-node]");
      const label = root.current.querySelector("[data-match]");
      if (prefersReducedMotion()) return;
      gsap.to("[data-orbit]", { rotate: 360, duration: 80, ease: "none", repeat: -1 });
      gsap.to("[data-node-inner]", { rotate: -360, duration: 80, ease: "none", repeat: -1 });
      gsap.to("[data-spokes] line", { strokeDashoffset: -24, duration: 1.2, ease: "none", repeat: -1 });

      // The scan: each department lights up in turn, the centre names it.
      const tl = gsap.timeline({ repeat: -1, paused: true });
      nodes.forEach((n, i) => {
        tl.to(n.querySelector("[data-bubble]"), { scale: 1.18, color: "#ffb066", borderColor: "rgba(255,158,0,0.7)", boxShadow: "0 0 0 5px rgba(255,158,0,0.10), 0 0 30px rgba(255,109,0,0.45)", duration: 0.35, ease: "back.out(2)" }, i * 1.4)
          .call(() => (label.textContent = DEPARTMENTS[i].name), null, i * 1.4)
          .fromTo(label, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35 }, i * 1.4)
          .to(n.querySelector("[data-bubble]"), { scale: 1, color: "#e9d5ff", borderColor: "rgba(215,174,255,0.18)", boxShadow: "0 0 0 0 rgba(255,158,0,0), 0 10px 24px -14px rgba(0,0,0,0.7)", duration: 0.4 }, i * 1.4 + 1.1);
      });
      const st = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) },
      });
      return () => {
        tl.kill();
        st.kill();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="department-test" className="relative py-16 md:py-24">
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div data-reveal="up" className="snt-card grid items-center gap-10 overflow-hidden p-6 sm:p-8 md:p-12 lg:grid-cols-2">
          <div>
            <span className="snt-eyebrow">Department test</span>
            <h2 className="snt-h2 mt-5 text-white">Wondering which department to join?</h2>
            <p className="snt-lead mt-5 max-w-md text-white/70">
              Take our personality-based test and find out where <span className="font-futura_bold text-accent-300">you</span> belong in Skill&amp;Tell.
            </p>
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

          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px]">
            <div className="absolute inset-[13%] rounded-full border border-dashed border-Main-300/25" />
            <div data-orbit className="absolute inset-[13%]">
              <svg data-spokes viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
                {DEPARTMENTS.map((d, i) => {
                  const p = pos(i);
                  return <line key={d.name} x1="50" y1="50" x2={p.x.toFixed(2)} y2={p.y.toFixed(2)} stroke="rgba(215,174,255,0.35)" strokeWidth="0.4" strokeDasharray="1.5 2.5" />;
                })}
              </svg>
              {DEPARTMENTS.map((d, i) => {
                const p = pos(i);
                const Icon = d.icon;
                return (
                  <div key={d.name} data-node className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x.toFixed(2)}%`, top: `${p.y.toFixed(2)}%` }}>
                    <div data-node-inner className="flex flex-col items-center gap-1.5">
                      <span data-bubble className="snt-icon h-12 w-12 rounded-2xl sm:h-14 sm:w-14" style={{ background: "rgba(26,7,50,0.92)", color: "#e9d5ff" }}>
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                      <span className="font-futura_md_bt text-[11px] text-white/80 sm:text-xs">{d.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-[34%] flex flex-col items-center justify-center">
              <Image src={sntMark} alt="" sizes="110px" className="h-[62%] w-auto drop-shadow-[0_0_18px_rgba(157,78,221,0.55)]" />
              <span className="mt-1 h-5 overflow-hidden text-center">
                <span data-match className="block font-futura_bold text-xs text-accent-300 sm:text-sm">You?</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
