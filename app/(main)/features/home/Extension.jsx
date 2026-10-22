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
const QUERIES = ["how to train a neural network", "skill&tell next event", "git rebase vs merge"];

/** Illustrative new-tab preview, drawn in HTML so it stays sharp and animated. */
function BrowserMock() {
  return (
    <div data-browser className="relative overflow-hidden rounded-[18px] border border-Main-300/40 bg-[#12002a] shadow-[0_50px_100px_-30px_rgba(60,9,108,0.7)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-[#1a0132] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 rounded-t-lg bg-[#12002a] px-3 py-1 text-[11px] text-white/80">
          <Image src="/favicon-32.png" alt="" width={14} height={14} /> New Tab
        </div>
      </div>
      <div className="relative px-5 pb-6 pt-7 md:px-8 md:pb-8 md:pt-10" style={{ background: "radial-gradient(70% 60% at 50% 0%, rgba(123,44,191,0.55), transparent 70%), linear-gradient(180deg,#1a0132,#0a001a)" }}>
        <div className="flex flex-col items-center">
          <Image src={logo} alt="" className="h-10 w-auto md:h-12" sizes="120px" />
          <p className="mt-3 font-futura_md_bt text-sm text-white/70">Good evening, explorer ✦</p>
          <div className="mt-4 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white/85 backdrop-blur">
            <Search className="h-4 w-4 shrink-0 text-accent-300" />
            <span data-typed className="truncate">{QUERIES[0]}</span>
            <span className="ml-0.5 h-4 w-px animate-pulse bg-white/80" />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {LINKS.map(({ icon: Icon, label }) => (
            <div key={label} data-qlink className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.06] py-3 text-[10px] text-white/75">
              <Icon className="h-4 w-4 text-Main-300" />
              {label}
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <div data-qlink className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-500/20 text-accent-300"><CalendarDays className="h-4 w-4" /></span>
            <span className="text-[11px] leading-tight text-white/80"><b className="block font-futura_bold text-white">Upcoming event</b>Stay in the loop with the club</span>
          </div>
          <div data-qlink className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-Main-400/25 text-Main-300"><Lightbulb className="h-4 w-4" /></span>
            <span className="text-[11px] leading-tight text-white/80"><b className="block font-futura_bold text-white">Daily prompt</b>One small thing to learn today</span>
          </div>
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
      gsap.fromTo("[data-browser]", { rotateX: 18, rotateY: -14, y: 80, transformPerspective: 1200 }, {
        rotateX: 0, rotateY: 0, y: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "center 55%", scrub: 0.8 },
      });
      gsap.from("[data-qlink]", {
        scale: 0.6, opacity: 0, stagger: 0.06, duration: 0.6, ease: "back.out(1.8)",
        scrollTrigger: { trigger: "[data-browser]", start: "top 70%", once: true },
      });
      // Search bar types a few queries in a loop.
      const el = root.current.querySelector("[data-typed]");
      const tl = gsap.timeline({ repeat: -1, paused: true });
      QUERIES.forEach((q) => {
        const o = { n: 0 };
        tl.to(o, { n: q.length, duration: q.length * 0.06, ease: "none", onUpdate: () => (el.textContent = q.slice(0, Math.round(o.n))) })
          .to({}, { duration: 1.4 })
          .to(o, { n: 0, duration: 0.4, ease: "none", onUpdate: () => (el.textContent = q.slice(0, Math.round(o.n))) });
      });
      const st = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom top", onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) } });
      return () => {
        tl.kill();
        st.kill();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="extension" className="snt-light relative overflow-hidden py-24 md:py-32">
      <div className="snt-grid-bg snt-grid-bg--light absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">06 — Chrome extension</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-neutral-600">
            Skill&amp;Tell in every new tab
          </h2>
          <p data-reveal="up" className="snt-lead mt-5 text-neutral-500">{EXTENSION.tagline}</p>
          <ul data-reveal-stagger className="mt-8 grid gap-4 sm:grid-cols-2">
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
          <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href={EXTENSION.url} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--dark">
                Add to Chrome <ArrowUpRight className="h-5 w-5" />
              </a>
            </Magnetic>
            <span className="text-sm text-neutral-400">Free · Chrome Web Store · by the IT department</span>
          </div>
        </div>
        <div data-reveal="up" className="lg:col-span-7">
          <BrowserMock />
        </div>
      </div>
    </section>
  );
}
