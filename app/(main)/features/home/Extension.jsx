"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Search, Globe, NotebookPen, CalendarDays, Lightbulb, Check } from "lucide-react";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import { EXTENSION } from "@/data/skillntell/site";
import logo from "@/assets/images/shared/logo_hd.png";

const LINKS = [
  { icon: FaDiscord, label: "Community" },
  { icon: FaGithub, label: "Repos" },
  { icon: NotebookPen, label: "Workspace" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: Globe, label: "Website" },
];

/**
 * Stand-in for the new-tab page, drawn in HTML. As soon as real screenshots are
 * set in EXTENSION.screens (data/skillntell/site.js) the devices show those instead.
 */
function NewTabMock({ compact = false }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center overflow-hidden px-[6%] pt-[7%]"
      style={{ background: "radial-gradient(70% 55% at 50% 0%, rgba(123,44,191,0.6), transparent 70%), linear-gradient(180deg,#1a0132,#0a001a)" }}
    >
      <Image src={logo} alt="" className={compact ? "h-[9%] w-auto" : "h-[11%] w-auto"} sizes="120px" />
      <p className="mt-[3%] font-futura_md_bt text-[clamp(6px,0.8vw,11px)] text-white/70">Good evening, explorer ✦</p>
      <div className="mt-[3%] flex w-full max-w-[78%] items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-[3%] py-[1.6%] text-[clamp(6px,0.75vw,11px)] text-white/80">
        <Search className="h-[1.1em] w-[1.1em] shrink-0 text-accent-300" />
        <span data-typed className="truncate">skill&amp;tell next event</span>
      </div>
      <div className={`mt-[5%] grid w-full gap-[2%] ${compact ? "grid-cols-3" : "grid-cols-6"}`}>
        {LINKS.map(({ icon: Icon, label }) => (
          <div key={label} data-qlink className="flex flex-col items-center gap-[0.3em] rounded-[0.6em] border border-white/10 bg-white/[0.07] py-[0.7em] text-[clamp(5px,0.6vw,9px)] text-white/75">
            <Icon className="h-[1.4em] w-[1.4em] text-Main-300" />
            {label}
          </div>
        ))}
      </div>
      <div className={`mt-[4%] grid w-full gap-[2%] ${compact ? "grid-cols-1" : "grid-cols-2"}`}>
        {[
          { icon: CalendarDays, t: "Upcoming event", d: "Stay in the loop", c: "bg-accent-500/20 text-accent-300" },
          { icon: Lightbulb, t: "Daily prompt", d: "Learn one thing today", c: "bg-Main-400/25 text-Main-300" },
        ].map(({ icon: Icon, t, d, c }) => (
          <div key={t} data-qlink className="flex items-center gap-[0.6em] rounded-[0.6em] border border-white/10 bg-white/[0.07] p-[0.7em] text-[clamp(5px,0.6vw,9px)] text-white/75">
            <span className={`grid h-[2.4em] w-[2.4em] shrink-0 place-items-center rounded-[0.5em] ${c}`}><Icon className="h-[1.3em] w-[1.3em]" /></span>
            <span className="leading-tight"><b className="block font-futura_bold text-white">{t}</b>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen({ src, alt, compact, sizes }) {
  if (src) return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />;
  return <NewTabMock compact={compact} />;
}

function Laptop() {
  return (
    <div data-laptop className="relative w-full" style={{ perspective: "1600px" }}>
      <div data-lid className="relative mx-auto w-[86%] origin-bottom rounded-t-[14px] border-[7px] border-b-[18px] border-[#16161c] bg-[#16161c] shadow-[0_30px_60px_-25px_rgba(26,1,50,0.55)] md:rounded-t-[18px] md:border-[10px] md:border-b-[24px]">
        <span className="absolute -top-[5px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#2a2a33] md:-top-[7px]" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[#0a001a]">
          <Screen src={EXTENSION.screens?.laptop} alt="The Skill & Tell new tab on a laptop" sizes="(min-width:1024px) 50vw, 85vw" />
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
    <div data-tablet className="absolute -bottom-[6%] right-0 w-[34%] md:-right-[2%]">
      <div className="relative rounded-[18px] border-[6px] border-[#16161c] bg-[#16161c] shadow-[0_30px_50px_-20px_rgba(26,1,50,0.6)] md:rounded-[24px] md:border-[9px]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[11px] bg-[#0a001a] md:rounded-[14px]">
          <Screen src={EXTENSION.screens?.tablet} alt="The Skill & Tell new tab on an iPad" compact sizes="(min-width:1024px) 18vw, 32vw" />
        </div>
      </div>
    </div>
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
      gsap.from("[data-qlink]", {
        scale: 0.7, opacity: 0, stagger: 0.03, duration: 0.5, ease: "back.out(1.8)",
        scrollTrigger: { trigger: "[data-devices]", start: "center 75%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="extension" className="snt-light relative py-20 md:py-28">
      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">06 — Chrome extension</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-neutral-600">Skill&amp;Tell in every new tab</h2>
          <p data-reveal="up" className="snt-lead mt-5 text-neutral-500">{EXTENSION.tagline}</p>
          <ul data-reveal-stagger className="mt-7 grid gap-4 sm:grid-cols-2">
            {EXTENSION.features.map((f) => (
              <li key={f.title} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-Main-400 text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="block font-futura_bold text-neutral-600">{f.title}</span>
                  <span className="text-sm text-neutral-400">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <div data-reveal="up" className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href={EXTENSION.url} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--dark">
                Add to Chrome <ArrowUpRight className="h-5 w-5" />
              </a>
            </Magnetic>
            <span className="text-sm text-neutral-400">Free · Chrome Web Store</span>
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
