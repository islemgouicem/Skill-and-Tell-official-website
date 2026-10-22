"use client";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { gsap, Flip, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import PageHero from "@/components/site/PageHero";
import MemberCard from "@/components/site/MemberCard";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import Marquee from "@/components/motion/Marquee";
import { structureTeam, prettyName } from "@/lib/utils/team";
import { PREVIOUS_OFFICES } from "@/data/skillntell/offices";
import { CONTACT_EMAIL } from "@/data/skillntell/site";

function OrbitRing({ members, radius, size, dir }) {
  return (
    <div data-orbit-ring={dir} className="absolute inset-0">
      {members.map((m, i) => {
        const a = (i / members.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <div
            key={m.id + m.name}
            className="absolute"
            style={{ left: `${(50 + Math.cos(a) * radius).toFixed(3)}%`, top: `${(50 + Math.sin(a) * radius).toFixed(3)}%`, transform: "translate(-50%,-50%)" }}
          >
            <div data-orbit-face={dir} className={`relative ${size} overflow-hidden rounded-full border-2 border-white/80 bg-Main-700 shadow-[0_0_22px_rgba(157,78,221,0.55)]`}>
              <Image src={m.thumb || m.image || "/images/pfp.png"} alt="" fill sizes="64px" priority className="object-cover" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Two counter-rotating rings of managers around the Skill&Tell mark. */
function Orbit({ members }) {
  const ref = useRef(null);
  const split = Math.min(14, Math.ceil(members.length * 0.56));
  const outer = members.slice(0, split);
  const inner = members.slice(split, split + 10);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to("[data-orbit-ring='cw']", { rotate: 360, duration: 110, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-face='cw']", { rotate: -360, duration: 110, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-ring='ccw']", { rotate: -360, duration: 80, ease: "none", repeat: -1 });
      gsap.to("[data-orbit-face='ccw']", { rotate: 360, duration: 80, ease: "none", repeat: -1 });
      gsap.from("[data-orbit-face]", { scale: 0, opacity: 0, stagger: 0.04, duration: 0.8, ease: "back.out(1.8)", delay: 0.6 });
    },
    { scope: ref }
  );
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute right-[5%] top-[calc(50%+2.5rem)] hidden aspect-square w-[min(32vw,58svh,500px)] -translate-y-1/2 lg:block xl:right-[7%]"
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-Main-300/30" />
      <div className="absolute inset-[21%] rounded-full border border-Main-300/20" />
      <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-Main-500/45 to-accent-500/25 blur-2xl" />
      <div className="absolute inset-[37%] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/snt.svg" alt="" className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(157,78,221,0.6)]" />
      </div>
      <OrbitRing members={outer} radius={50} size="h-14 w-14 xl:h-16 xl:w-16" dir="cw" />
      <OrbitRing members={inner} radius={29} size="h-11 w-11 xl:h-12 xl:w-12" dir="ccw" />
    </div>
  );
}

function Departments({ departments }) {
  const root = useRef(null);
  const [active, setActive] = useState("all");
  const flipState = useRef(null);

  const select = (key) => {
    if (key === active) return;
    flipState.current = Flip.getState(root.current.querySelectorAll("[data-flip-card], [data-flip-head]"));
    setActive(key);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: prefersReducedMotion() ? 0 : 0.7,
      ease: "power3.inOut",
      stagger: 0.02,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.35 }),
    });
    flipState.current = null;
  }, [active]);

  const shown = active === "all" ? departments : departments.filter((d) => d.key === active);

  return (
    <section ref={root} id="departments" className="relative bg-space-dark py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">02 — Departments</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Leads &amp; managers</h2>
          </div>
          <p data-reveal="up" className="max-w-md text-white/60 lg:text-right">Every department has its lead and managers. Filter to explore who drives what.</p>
        </div>

        <div className="sticky top-[92px] z-20 -mx-5 mt-10 overflow-x-auto px-5 py-3 no-scrollbar md:top-[104px]">
          <div role="tablist" aria-label="Filter by department" className="flex w-max gap-2 rounded-full border border-white/10 bg-[#12002a]/80 p-1.5 backdrop-blur-xl">
            {[{ key: "all", label: "All" }, ...departments].map((d) => (
              <button
                key={d.key}
                role="tab"
                aria-selected={active === d.key}
                onClick={() => select(d.key)}
                className={`rounded-full px-4 py-2 font-futura_md_bt text-sm transition-colors duration-300 md:px-5 ${
                  active === d.key ? "bg-gradient-to-r from-accent-500 to-accent-300 text-[#1a0132]" : "text-white/70 hover:text-white"
                }`}
              >
                {d.label}
                {d.members && <span className="ml-2 opacity-60">{d.members.length}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-20">
          {shown.map((d) => (
            <div key={d.key} id={`dep-${d.key}`}>
              <div data-flip-id={`head-${d.key}`} data-flip-head className="mb-8 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-12">
                <h3 className="snt-h3 text-white md:col-span-4">
                  <span className="gradient-text-warm">{d.label}</span>
                </h3>
                <p className="text-white/60 md:col-span-6">{d.blurb}</p>
                <span className="font-compacta text-5xl leading-none text-white/15 md:col-span-2 md:text-right">{String(d.members.length).padStart(2, "0")}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                {d.members.map((m) => (
                  <MemberCard key={m.id + m.name} member={m} data-flip-id={`m-${m.id}-${m.name}`} data-flip-card />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MANDATE_SUBJECT = "Previous office — Skill&Tell website";
const MANDATE_BODY = "Hi Skill&Tell,\n\nI was part of a previous office. Here are the details:\n\nMandate (years): \nPresident: \nBoard & managers (name — role): \nOur best memory: \n\nTeam photo attached.\n";

/** Opens a pre-filled email (Gmail in a new tab, works without a mail app) + copy the address. */
function ShareMandate() {
  const [copied, setCopied] = useState(false);
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(MANDATE_SUBJECT)}&body=${encodeURIComponent(MANDATE_BODY)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MANDATE_SUBJECT)}&body=${encodeURIComponent(MANDATE_BODY)}`;
    }
  };
  return (
    <div className="mt-5 flex shrink-0 flex-wrap items-center gap-3 md:mt-0">
      <a href={gmail} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--primary !px-5 !py-3 text-sm">
        <Mail className="h-4 w-4" /> Share your mandate <ArrowUpRight className="h-4 w-4" />
      </a>
      <button type="button" onClick={copy} className="snt-btn snt-btn--ghost !px-4 !py-3 text-sm" aria-live="polite">
        {copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> {CONTACT_EMAIL}</>}
      </button>
    </div>
  );
}

function PreviousOffices() {
  const [active, setActive] = useState(0);
  const office = PREVIOUS_OFFICES[active];
  const { board, departments } = useMemo(() => structureTeam(office?.members ?? []), [office]);
  const members = [...board, ...departments.flatMap((d) => d.members)];
  const president = board.find((m) => /president/i.test(m.role) && !/vice/i.test(m.role));

  return (
    <section id="previous-offices" className="relative overflow-hidden bg-[#0d0022] py-24 md:py-32">
      <div className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(255,199,138,0.10), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">03 — Legacy</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Previous offices</h2>
            <p data-reveal="up" className="mt-5 max-w-xl text-white/60">
              Every office built a piece of Skill&amp;Tell. Thank you to the presidents, boards and managers who carried the club before us.
            </p>
          </div>
          {PREVIOUS_OFFICES.length > 1 && (
            <div role="tablist" aria-label="Choose a mandate" className="flex flex-wrap gap-2">
              {PREVIOUS_OFFICES.map((o, i) => (
                <button key={o.mandate} role="tab" aria-selected={i === active} onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2 font-futura_md_bt text-sm transition-colors ${i === active ? "border-transparent bg-gradient-to-r from-accent-500 to-accent-300 text-[#1a0132]" : "border-white/15 text-white/70 hover:text-white"}`}>
                  {o.mandate}
                </button>
              ))}
            </div>
          )}
        </div>

        {office && (
          <div className="mt-14">
            <div data-reveal="up" className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-8">
              <p className="font-compacta text-[clamp(3.5rem,8vw,6.5rem)] leading-none text-outline">{office.mandate}</p>
              <p className="text-white/60">
                {president && <>Led by <span className="font-futura_bold text-white">{prettyName(president.name)}</span> · </>}
                {members.length} heads
              </p>
            </div>
            <div data-reveal="up" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-6">
              {members.map((m) => (
                <MemberCard key={`${m.id}-${m.name}`} member={m} size="sm" />
              ))}
            </div>
          </div>
        )}

        <div data-reveal="up" className="mt-14 rounded-[22px] border border-dashed border-Main-300/40 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="font-futura_bold text-xl text-white">Were you part of an earlier office?</p>
            <p className="mt-2 text-white/60">Send us your mandate, your team photo and your best memory — we&apos;ll add it here.</p>
          </div>
          <ShareMandate />
        </div>
      </div>
    </section>
  );
}

export default function TeamView({ teamMembers = [] }) {
  const root = useRef(null);
  const { board, departments } = useMemo(() => structureTeam(teamMembers), [teamMembers]);
  useReveals(root);

  return (
    <div ref={root}>
      <PageHero
        eyebrow="Our Team"
        title={<>The crew behind <span className="snt-brand-text">Skill&amp;Tell</span></>}
        lead="Students who give their time, ideas and energy so that every event, mission and project happens. Meet the people who lead the club."
        bg="/images/Team_Section.webp"
        stacked
        aside={
          <div className="flex gap-8">
            <div>
              <p className="font-compacta text-6xl leading-none text-white">{teamMembers.length}</p>
              <p className="mt-1 text-sm text-white/60">Managers &amp; leads</p>
            </div>
            <div>
              <p className="font-compacta text-6xl leading-none text-white">{departments.length}</p>
              <p className="mt-1 text-sm text-white/60">Departments</p>
            </div>
            <div>
              <p className="font-compacta text-6xl leading-none gradient-text">534+</p>
              <p className="mt-1 text-sm text-white/60">Members</p>
            </div>
          </div>
        }
      >
        <Orbit members={teamMembers} />
      </PageHero>

      <section className="relative bg-space-dark py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <span data-reveal="fade" className="snt-eyebrow">01 — Executive board</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">Leading the club</h2>
          <div data-reveal-stagger className="mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {board.map((m) => (
              <MemberCard key={m.id + m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <Departments departments={departments} />

      <div className="border-y border-white/10 bg-Main-700 py-5">
        <Marquee speed={50}>
          {["Creativity", "Collaboration", "Leadership", "HR", "IT", "Design", "Marketing", "Events", "Relex"].map((w) => (
            <span key={w} className="flex items-center gap-6 pr-6 font-futura_bold text-4xl uppercase text-white/90 md:text-6xl">
              {w} <span className="text-accent-500">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <PreviousOffices />

      <section className="relative overflow-hidden bg-space-dark py-24 md:py-32">
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 60% at 50% 100%, rgba(123,44,191,0.45), transparent 70%)" }} />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 data-split="chars" className="snt-h2 text-white">Want your face <span className="gradient-text">here?</span></h2>
          <p data-reveal="up" className="snt-lead mx-auto mt-6 max-w-xl text-white/65">
            Skill&amp;Tell grows with every new member. Join a department, lead a project, and maybe one day lead the club.
          </p>
          <div data-reveal="up" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <TLink href="/register" className="snt-btn snt-btn--primary">Join Skill&amp;Tell <ArrowRight className="snt-btn__arrow h-5 w-5" /></TLink>
            </Magnetic>
            <Magnetic>
              <a href="https://departments-test.vercel.app/" target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--ghost">Find your department <ArrowUpRight className="h-5 w-5" /></a>
            </Magnetic>
          </div>
        </div>
      </section>
    </div>
  );
}
