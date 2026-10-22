"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import { EXTENSION } from "@/data/skillntell/site";
import newTab from "@/assets/images/skillntell/extension.png";

/** The real new-tab screenshot. Its 4px window frame is pushed just outside the screen. */
function Screen({ alt, sizes }) {
  return (
    <Image
      src={newTab}
      alt={alt}
      sizes={sizes}
      placeholder="blur"
      className="absolute max-w-none"
      style={{ left: "-0.28%", top: "-0.36%", width: "100.56%", height: "100.72%" }}
    />
  );
}

function Laptop() {
  return (
    <div data-laptop className="relative w-full" style={{ perspective: "1600px" }}>
      <div data-lid className="relative mx-auto w-[86%] origin-bottom rounded-t-[14px] border-[7px] border-b-[18px] border-[#16161c] bg-[#16161c] shadow-[0_30px_60px_-25px_rgba(26,1,50,0.55)] md:rounded-t-[18px] md:border-[10px] md:border-b-[24px]">
        <span className="absolute -top-[5px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2a2a33] md:-top-[7px]" />
        <div className="relative aspect-[1432/1109] overflow-hidden rounded-[4px] bg-[#12031a]">
          <Screen alt="The Skill & Tell new tab on a laptop" sizes="(min-width:1024px) 50vw, 85vw" />
        </div>
      </div>
      {/* base */}
      <div className="relative mx-auto h-3 w-full rounded-b-[14px] bg-gradient-to-b from-[#d9d9e0] to-[#a9a9b4] md:h-4">
        <span className="absolute left-1/2 top-0 h-1.5 w-[14%] -translate-x-1/2 rounded-b-lg bg-[#9a9aa6]" />
      </div>
      <div className="mx-auto h-2 w-[94%] rounded-b-[50%] bg-[#1a0132]/15 blur-[3px]" />
    </div>
  );
}

function Tablet() {
  return (
    <div data-tablet className="absolute -bottom-[2%] right-[2%] w-[38%]">
      <div className="relative rounded-[14px] border-[6px] border-[#16161c] bg-[#16161c] shadow-[0_30px_50px_-20px_rgba(26,1,50,0.6)] md:rounded-[20px] md:border-[9px]">
        <div className="relative aspect-[1432/1109] overflow-hidden rounded-[8px] bg-[#12031a] md:rounded-[10px]">
          <Screen alt="The Skill & Tell new tab on an iPad" sizes="(min-width:1024px) 22vw, 40vw" />
        </div>
      </div>
    </div>
  );
}

/** Chrome's logo, drawn inline for the "Add to Chrome" button. */
function ChromeLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 24 L4.95 13 A22 22 0 0 1 43.05 13 Z" fill="#EA4335" />
      <path d="M24 24 L43.05 13 A22 22 0 0 1 24 46 Z" fill="#FBBC04" />
      <path d="M24 24 L24 46 A22 22 0 0 1 4.95 13 Z" fill="#34A853" />
      <circle cx="24" cy="24" r="10.5" fill="#fff" />
      <circle cx="24" cy="24" r="8" fill="#4285F4" />
    </svg>
  );
}

function Key({ children, wide }) {
  return (
    <span data-key className={`inline-grid h-11 place-items-center rounded-xl border border-Main-300/50 bg-white font-futura_bold text-sm text-Main-600 shadow-[0_4px_0_0_#d7aeff] md:h-12 md:text-base ${wide ? "px-4" : "w-11 md:w-12"}`}>
      {children}
    </span>
  );
}

export default function Extension() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The laptop lid opens as the section scrolls in, then the iPad slides alongside.
      gsap.timeline({ scrollTrigger: { trigger: "[data-devices]", start: "top 85%", end: "center 60%", scrub: 0.8 } })
        .fromTo("[data-lid]", { rotateX: -78, opacity: 0.6 }, { rotateX: 0, opacity: 1, ease: "none" }, 0)
        .fromTo("[data-tablet]", { xPercent: 45, yPercent: 20, rotate: 10, opacity: 0 }, { xPercent: 0, yPercent: 0, rotate: -4, opacity: 1, ease: "none" }, 0.25);
      // Ctrl + T, pressed every few seconds: a new tab, a new spark.
      const keys = gsap.utils.toArray("[data-key]");
      gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 1 })
        .to(keys, { y: 4, boxShadow: "0 0 0 0 #d7aeff", duration: 0.12, stagger: 0.18, ease: "power2.in" })
        .to(keys, { y: 0, boxShadow: "0 4px 0 0 #d7aeff", duration: 0.2, stagger: 0.05, ease: "power2.out" }, "+=0.15");
    },
    { scope: root }
  );

  return (
    <section ref={root} id="extension" className="snt-light relative py-20 md:py-28">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div data-reveal="up" className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center  md:h-[72px] md:w-[72px]">
              {/* Chrome's extensions (puzzle) icon, painted in the brand gradient */}
              <span
                role="img"
                aria-label="Chrome extension"
                className="h-[80%] w-[80%] bg-gradient-to-br from-accent-100 to-Main-600"
                style={{ WebkitMask: "url(/icons/extension.svg) center / contain no-repeat", mask: "url(/icons/extension.svg) center / contain no-repeat" }}
              />
            </span>
            <span>
              <span className="block font-futura_bold text-lg text-neutral-600 md:text-xl">{EXTENSION.name}</span>
              <span className="mt-1 flex items-center gap-1.5 text-sm text-neutral-400">
                <ChromeLogo className="h-4 w-4" /> Available in the Chrome Web Store
              </span>
            </span>
          </div>

          <h2 data-split="chars" className="snt-h2 mt-8 text-neutral-600">Light up your new tab</h2>
          <p data-reveal="up" className="snt-lead mt-5 max-w-md text-neutral-500">{EXTENSION.tagline}</p>

          <div data-reveal="up" className="mt-7 flex items-center gap-3 text-sm text-neutral-500">
            <Key wide>Ctrl</Key>
            <span className="font-futura_bold text-Main-400">+</span>
            <Key>T</Key>
            <span className="ml-2 max-w-[11rem] leading-snug">Every new tab, a little spark ✦</span>
          </div>

          <div data-reveal="up" className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <a href={EXTENSION.url} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--dark">
                <ChromeLogo className="h-6 w-6" /> Add to Chrome
              </a>
            </Magnetic>
            
          </div>
        </div>

        <div data-devices className="relative pb-[8%] lg:col-span-7">
          <div className="absolute inset-x-[10%] bottom-0 top-[10%] -z-0 rounded-full bg-Main-300/35 blur-3xl" aria-hidden="true" />
          <div className="relative w-[88%]">
            <Laptop />
          </div>
          <Tablet />
        </div>
      </div>
    </section>
  );
}
