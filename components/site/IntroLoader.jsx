"use client";
import { useRef } from "react";
import Image from "next/image";
import mark from "@/assets/images/shared/snt_mark.png";
import { gsap, useGSAP, prefersReducedMotion, stage } from "@/lib/motion/gsap";

const KEY = "loaderShown";
// Decided once per page load (survives React StrictMode's double effect run).
let skipIntro = null;
const BRAND = "Skill&Tell".split("");

/**
 * Branded intro, played once per session (the old loader's rule):
 * a shooting star , the one in our logo , streaks across the night and lands
 * in the centre, the mark ignites, the name rises, then the night opens like
 * an iris onto the site.
 */
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

      stage.delay = 2.85;
      window.__lenis?.stop();
      const counter = el.querySelector("[data-count]");
      const n = { v: 0 };
      gsap.set(el, { "--r": "0vmax" });
      // point the tail back along the flight path (top-left → centre)
      gsap.set("[data-comet-tail]", { rotate: (Math.atan2(window.innerHeight * 0.38, window.innerWidth * 0.55) * 180) / Math.PI });

      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          skipIntro = true;
          window.__lenis?.start();
        },
      });

      tl.fromTo("[data-stars]", { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0)
        // the shooting star crosses the sky and lands in the centre
        .fromTo("[data-comet]", { x: "-55vw", y: "-38vh", opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.75, ease: "power3.in" }, 0.1)
        .to("[data-comet-tail]", { scaleX: 0.15, duration: 0.25, ease: "power2.out" }, 0.85)
        .to("[data-comet]", { opacity: 0, scale: 0.4, duration: 0.12 }, 0.84)
        // impact: a shockwave and the mark ignites
        .fromTo("[data-wave]", { scale: 0.2, opacity: 0.9 }, { scale: 4, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.12 }, 0.85)
        .fromTo("[data-mark]", { scale: 0.3, opacity: 0, rotate: -25 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.8, ease: "back.out(1.8)" }, 0.85)
        .fromTo("[data-glow]", { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "power2.out" }, 0.85)
        // the name rises letter by letter
        .fromTo("[data-letter]", { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "power4.out" }, 1.05)
        .fromTo("[data-tagline]", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5 }, 1.35)
        // progress
        .to(n, { v: 100, duration: 2, ease: "power2.inOut", onUpdate: () => (counter.textContent = String(Math.round(n.v)).padStart(3, "0")) }, 0.1)
        .fromTo("[data-bar]", { scaleX: 0 }, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0.1)
        // the night opens like an iris, from the mark outwards
        .to("[data-inner]", { scale: 1.06, opacity: 0, duration: 0.45, ease: "power2.in" }, 2.15)
        .to(el, { "--r": "150vmax", duration: 0.9, ease: "expo.inOut" }, 2.25);
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="snt-intro fixed inset-0 z-[300] bg-[#0a001a]"
      style={{
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent calc(var(--r, 0vmax) - 1px), #000 var(--r, 0vmax))",
        maskImage: "radial-gradient(circle at 50% 50%, transparent calc(var(--r, 0vmax) - 1px), #000 var(--r, 0vmax))",
      }}
      aria-hidden="true"
    >
      <div data-stars className="snt-intro-stars absolute inset-0 opacity-0" />
      <div data-inner className="absolute inset-0 flex flex-col items-center justify-center">
        <div data-glow className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0" style={{ background: "radial-gradient(circle, rgba(123,44,191,0.45), rgba(255,109,0,0.08) 45%, transparent 70%)" }} />

        <div className="relative grid h-28 w-28 place-items-center md:h-36 md:w-36">
          {[0, 1].map((i) => (
            <span key={i} data-wave className="absolute inset-0 rounded-full border border-accent-300/70 opacity-0" />
          ))}
          {/* shooting star: head + tail, flying in from the top-left */}
          <span data-comet className="absolute left-1/2 top-1/2 opacity-0">
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-[#ffc78a] shadow-[0_0_12px_4px_rgba(255,158,0,0.9),0_0_40px_10px_rgba(255,109,0,0.5)]" />
            <span data-comet-tail className="absolute right-0 top-0 h-[2px] w-[34vw] max-w-[420px] origin-right -translate-y-1/2 rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(157,78,221,0.5) 50%, #ffb066)" }} />
          </span>
          <Image data-mark src={mark} alt="" sizes="144px" className="relative h-full w-auto opacity-0 drop-shadow-[0_0_24px_rgba(157,78,221,0.7)]" />
        </div>

        <div className="relative mt-6 flex overflow-hidden px-2 pb-1">
          {BRAND.map((c, i) => (
            <span key={i} data-letter className="inline-block font-futura_bold text-3xl tracking-wide text-white opacity-0 md:text-5xl">
              {c}
            </span>
          ))}
        </div>
        <p data-tagline className="mt-3 font-futura_md_bt text-xs uppercase tracking-[0.35em] text-Main-300 opacity-0">Scientific Club · ENSIA</p>

        <div className="absolute inset-x-6 bottom-10 flex items-end justify-end md:inset-x-16">
          <span data-count className="font-compacta text-6xl leading-none text-white/90 md:text-8xl">000</span>
        </div>
        <span data-bar className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-accent-500 via-accent-300 to-Main-400" />
      </div>
    </div>
  );
}
