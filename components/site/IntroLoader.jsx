"use client";
import { useRef } from "react";
import Image from "next/image";
import logo from "@/assets/images/shared/logo.png";
import { gsap, useGSAP, prefersReducedMotion, stage } from "@/lib/motion/gsap";

const KEY = "loaderShown";
// Decided once per page load (survives React StrictMode's double effect run).
let skipIntro = null;
const WORDS = ["Skills", "Ideas", "Collaboration", "Skill&Tell"];

/** Short branded intro, played once per session (the old loader's rule). */
export default function IntroLoader() {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (skipIntro === null) {
        let seen = false;
        try {
          seen = sessionStorage.getItem(KEY) === "true";
          sessionStorage.setItem(KEY, "true");
        } catch {}
        skipIntro = seen || prefersReducedMotion();
      }
      if (skipIntro) {
        el.style.display = "none";
        return;
      }

      stage.delay = 2.55;
      window.__lenis?.stop();
      const counter = el.querySelector("[data-count]");
      const n = { v: 0 };
      const words = el.querySelectorAll("[data-word]");
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          skipIntro = true;
          window.__lenis?.start();
        },
      });
      tl.fromTo("[data-logo]", { scale: 0.6, opacity: 0, rotate: -12 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" })
        .to(n, {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => (counter.textContent = String(Math.round(n.v)).padStart(3, "0")),
        }, 0.1)
        .fromTo("[data-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.1);
      words.forEach((w, i) => {
        tl.fromTo(w, { yPercent: 100 }, { yPercent: 0, duration: 0.32, ease: "power3.out" }, 0.15 + i * 0.4);
        if (i < words.length - 1) tl.to(w, { yPercent: -100, duration: 0.32, ease: "power3.in" }, 0.15 + i * 0.4 + 0.36);
      });
      tl.to("[data-inner]", { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" }, 1.9)
        .to("[data-half='top']", { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, 2.05)
        .to("[data-half='bottom']", { yPercent: 100, duration: 0.85, ease: "expo.inOut" }, 2.05);
    },
    { scope: root }
  );

  return (
    <div ref={root} className="snt-intro fixed inset-0 z-[300]" aria-hidden="true">
      <div data-half="top" className="absolute inset-x-0 top-0 h-1/2 bg-[#0a001a]" />
      <div data-half="bottom" className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a001a]" />
      <div data-inner className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="absolute inset-0" style={{ background: "radial-gradient(40% 35% at 50% 50%, rgba(123,44,191,0.35), transparent 70%)" }} />
        <Image data-logo src={logo} alt="" width={200} height={120} priority className="relative w-40 md:w-52 h-auto opacity-0" />
        <div className="relative mt-8 h-8 overflow-hidden text-center">
          {WORDS.map((w, i) => (
            <span
              key={w}
              data-word
              className={`absolute inset-x-0 block font-futura_bold text-xl md:text-2xl tracking-wide ${i === WORDS.length - 1 ? "gradient-text" : "text-white/90"}`}
              style={{ transform: "translateY(100%)" }}
            >
              {w}
            </span>
          ))}
        </div>
        <div className="absolute bottom-10 inset-x-6 md:inset-x-16 flex items-end justify-between gap-6">
          <span className="font-futura_md_bt text-xs uppercase tracking-[0.3em] text-Main-300">Scientific Club · ENSIA</span>
          <span data-count className="font-compacta text-6xl md:text-8xl leading-none text-white/90">000</span>
        </div>
        <span data-bar className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-accent-500 via-accent-300 to-Main-400" />
      </div>
    </div>
  );
}
