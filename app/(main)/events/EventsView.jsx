"use client";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Expand } from "lucide-react";
import { gsap, Flip, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import PageHero from "@/components/site/PageHero";
import EventCard, { EventArt, StatusBadge } from "@/components/site/EventCard";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import Lightbox from "@/components/site/Lightbox";
import PartnerCTA from "@/components/site/PartnerCTA";
import Marquee from "@/components/motion/Marquee";
import { getEvents, EVENT_CATEGORIES } from "@/lib/utils/events";
import { FOUNDED } from "@/data/skillntell/site";
// Web-sized (.webp) copies of the event photos in assets/images/skillntell/events.
import photoArcade1 from "@/assets/images/skillntell/events/arcade-2024.webp";
import photoArcade2 from "@/assets/images/skillntell/events/arcade-2025.webp";
import photoArcade3 from "@/assets/images/skillntell/events/arcade-3.webp";
import photoArcade4 from "@/assets/images/skillntell/events/arcade-4.webp";
import photoFormatech1 from "@/assets/images/skillntell/events/formatech-1.webp";
import photoFormatech2 from "@/assets/images/skillntell/events/formatech-2.webp";
import photoFormatech3 from "@/assets/images/skillntell/events/formatech-3.webp";
import photoFormatech4 from "@/assets/images/skillntell/events/formatech-4.webp";
import photoMobai1 from "@/assets/images/skillntell/events/mobai-1.webp";
import photoMobai2 from "@/assets/images/skillntell/events/mobai-2.webp";
import photoMobai3 from "@/assets/images/skillntell/events/mobai-3.webp";
import photoMobai4 from "@/assets/images/skillntell/events/mobai-4.webp";
import photoEunoia1 from "@/assets/images/skillntell/events/eunoia-1.webp";
import photoEunoia2 from "@/assets/images/skillntell/events/eunoia-2.webp";
import photoEunoia3 from "@/assets/images/skillntell/events/eunoia-3.webp";
import photoEunoia4 from "@/assets/images/skillntell/events/eunoia-4.webp";
import photoOpenDay from "@/assets/images/skillntell/events/openday-2026.webp";
import photoOdyssea from "@/assets/images/skillntell/events/odyssea-world-ai-week.webp";

// Photos of our people at our events, mixed so every column tells a different story.
const GALLERY = [
  { src: photoArcade1, title: "ARCADE 2024", alt: "Participants and organizers of ARCADE 2024" },
  { src: photoMobai1, title: "MobAI", alt: "A MobAI participant in a Spider-Man mask with his participant badge" },
  { src: photoFormatech1, title: "FormaTech Expo", alt: "The Skill&Tell team at the FormaTech Expo stand" },
  { src: photoEunoia1, title: "EUNOIA", alt: "EUNOIA participants walking across the ENSIA campus" },
  { src: photoOdyssea, title: "Odyssea · World AI Week", alt: "Skill&Tell members at World AI Week in Amsterdam for Odyssea" },
  { src: photoArcade2, title: "ARCADE 2025", alt: "The full room of ARCADE 2025 participants" },
  { src: photoMobai2, title: "MobAI", alt: "MobAI participants group photo" },
  { src: photoEunoia4, title: "EUNOIA", alt: "Three EUNOIA participants posing in a photo frame" },
  { src: photoFormatech3, title: "FormaTech Expo", alt: "A FormaTech Expo participant holding his certificate" },
  { src: photoArcade3, title: "ARCADE", alt: "A 'Zombies Ahead' sign from the ARCADE zombie theme" },
  { src: photoOpenDay, title: "Open Day 2026", alt: "A full amphitheatre at the Skill&Tell Open Day 2026" },
  { src: photoMobai3, title: "MobAI", alt: "A MobAI team working on their laptop" },
  { src: photoEunoia2, title: "EUNOIA", alt: "An EUNOIA organizer holding a picnic sign" },
  { src: photoFormatech4, title: "FormaTech Expo", alt: "Two members posing with FormaTech Expo signs" },
  { src: photoArcade4, title: "ARCADE", alt: "An ARCADE participant with zombie make-up" },
  { src: photoMobai4, title: "MobAI", alt: "The MobAI winners on stage with their prizes" },
  { src: photoEunoia3, title: "EUNOIA", alt: "EUNOIA decorations: hope, well-being, peace and love" },
  { src: photoFormatech2, title: "FormaTech Expo", alt: "Skill&Tell members in front of the FormaTech Expo stand" },
];

// ARCADE editions, in the order of event.editions (2024, 2025).
const ARCADE_PHOTOS = [photoArcade1, photoArcade2];

function Featured({ event }) {
  return (
    <section className="relative bg-space-dark py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <span data-reveal="fade" className="snt-eyebrow">01 — {event.status === "upcoming" ? "Next up" : "Latest"}</span>
        <div className="mt-8 grid overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] lg:grid-cols-2">
          <div data-reveal="clip" className="group relative min-h-[340px] overflow-hidden lg:min-h-[560px]">
            <div data-parallax="-0.2" className="absolute -inset-y-[12%] inset-x-0">
              <EventArt event={event} sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
          </div>
          <div className="flex flex-col justify-center gap-6 p-7 md:p-12">
            <div data-reveal="up" className="flex flex-wrap items-center gap-3">
              <span className="snt-chip">{event.category}</span>
              <StatusBadge status={event.status} />
              <span className="flex items-center gap-2 text-sm text-Main-300"><CalendarDays className="h-4 w-4" />{event.dateLabel}</span>
            </div>
            <h2 data-split="chars" className="snt-display !text-[clamp(3rem,7vw,6.5rem)] text-white">{event.title}</h2>
            <p data-reveal="up" className="snt-lead text-white/70">{event.description}</p>
            <div data-reveal="up" className="flex flex-wrap gap-2">
              {event.tags.map((t) => <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/75">{t}</span>)}
            </div>
            {event.href && (
              <div data-reveal="up">
                <Magnetic>
                  <TLink href={event.href} className="snt-btn snt-btn--primary">Discover {event.title} <ArrowRight className="snt-btn__arrow h-5 w-5" /></TLink>
                </Magnetic>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Arcade({ event }) {
  const root = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray("[data-edition]");
      gsap.fromTo(cards, { rotate: (i) => (i ? 14 : -14), x: (i) => (i ? 120 : -120), y: 80 }, {
        rotate: (i) => (i ? 5 : -5), x: 0, y: 0, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 85%", end: "center 55%", scrub: 0.8 },
      });
      gsap.fromTo("[data-arcade-word]", { xPercent: 10 }, {
        xPercent: -30, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );
  return (
    <section ref={root} id="arcade" className="relative overflow-hidden bg-[#0c0002] py-24 md:py-36">
      <div className="absolute inset-0" style={{ background: "radial-gradient(50% 60% at 70% 40%, rgba(154,3,30,0.45), transparent 70%), radial-gradient(40% 50% at 10% 90%, rgba(255,109,0,0.18), transparent 70%)" }} />
      <div data-arcade-word aria-hidden="true" className="pointer-events-none absolute top-6 whitespace-nowrap font-futura_bold text-[22vw] leading-none text-white/[0.04]">ARCADE ARCADE</div>
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <span data-reveal="fade" className="snt-eyebrow !text-[#ff7b7b]">03 — Signature event</span>
          <h2 data-split="chars" className="snt-display mt-6 text-white">ARCADE</h2>
          <p data-reveal="up" className="snt-lead mt-6 max-w-xl text-white/70">{event.description}</p>
          <div data-reveal="up" className="mt-6 flex flex-wrap gap-2">
            {event.tags.map((t) => <span key={t} className="rounded-full border border-[#ff0707]/30 bg-[#ff0707]/10 px-3 py-1 text-sm text-white/85">{t}</span>)}
          </div>
          <div data-reveal="up" className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <TLink href={event.href} className="snt-btn !overflow-visible bg-gradient-to-r from-[#8b0000] to-[#ff0707] text-white shadow-[0_10px_40px_-10px_rgba(255,7,7,0.8)] transition-shadow hover:shadow-[0_14px_50px_-8px_rgba(255,7,7,0.95)]">
                Enter the ARCADE <ArrowRight className="snt-btn__arrow h-5 w-5" />
              </TLink>
            </Magnetic>
          </div>
        </div>
        <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-4 py-10">
          {event.editions.map((ed, i) => (
            <figure key={ed.label} data-edition className="incoming-event-moving-border overflow-hidden rounded-[18px] bg-black p-[3px] shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[15px]">
                <Image src={ARCADE_PHOTOS[i]} alt={`${ed.label} participants`} fill placeholder="blur" sizes="(min-width:1024px) 24vw, 45vw" className="object-cover" />
              </div>
              <figcaption className="px-3 py-3 font-futura_bold text-white">{ed.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Archive({ events }) {
  const root = useRef(null);
  const [cat, setCat] = useState("All");
  const flip = useRef(null);
  const cats = useMemo(() => EVENT_CATEGORIES(events), [events]);
  const filtered = cat === "All" ? events : events.filter((e) => e.category === cat);
  const groups = useMemo(() => {
    const m = new Map();
    filtered.forEach((e) => {
      const k = e.year ?? "Soon";
      if (!m.has(k)) m.set(k, []);
      m.get(k).push(e);
    });
    return [...m.entries()];
  }, [filtered]);

  const choose = (c) => {
    if (c === cat) return;
    flip.current = Flip.getState(root.current.querySelectorAll("[data-ev], [data-year]"));
    setCat(c);
  };
  useLayoutEffect(() => {
    if (!flip.current) return;
    Flip.from(flip.current, {
      duration: prefersReducedMotion() ? 0 : 0.7, ease: "power3.inOut", absolute: true, stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.3 }),
    });
    flip.current = null;
    ScrollTriggerRefresh();
  }, [cat]);

  return (
    <section ref={root} id="all-events" className="relative bg-space-dark py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">02 — Archive</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Every edition</h2>
          </div>
          <div role="tablist" aria-label="Filter events" className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => choose(c)}
                className={`rounded-full border px-4 py-2 font-futura_md_bt text-sm transition-colors duration-300 ${cat === c ? "border-transparent bg-gradient-to-r from-accent-500 to-accent-300 text-[#1a0132]" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 space-y-16">
          {groups.map(([year, list]) => (
            <div key={year} data-year data-flip-id={`y-${year}`} className="grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <span className="font-compacta text-[clamp(4.5rem,9vw,8rem)] leading-none text-outline">{year}</span>
                  <p className="mt-2 text-sm text-white/50">{list.length} event{list.length > 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:col-span-9">
                {list.map((e) => (
                  <div key={e.id} data-ev data-flip-id={`e-${e.id}`}>
                    <EventCard event={e} />
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

function ScrollTriggerRefresh() {
  setTimeout(() => ScrollTrigger.refresh(), 750);
}

function Gallery() {
  const root = useRef(null);
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);
  const cols = [GALLERY.filter((_, i) => i % 3 === 0), GALLERY.filter((_, i) => i % 3 === 1), GALLERY.filter((_, i) => i % 3 === 2)];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray("[data-gcol]").forEach((col, i) => {
          // pixel offsets (not %) so long columns never drift over the heading
          gsap.fromTo(col, { y: [40, -30, 60][i] }, {
            y: [-40, 30, -60][i], ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="gallery" className="relative overflow-hidden bg-[#0d0022] py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="text-center">
          <span data-reveal="fade" className="snt-eyebrow justify-center">04 — Gallery</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">Moments &amp; memories</h2>
          <p data-reveal="up" className="mx-auto mt-5 max-w-xl text-white/60">Our people, at our events. Tap any picture to open it.</p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {cols.map((col, ci) => (
            <div key={ci} data-gcol className={ci === 2 ? "col-span-2 grid grid-cols-2 gap-4 md:col-span-1 md:flex md:flex-col md:gap-6" : "flex flex-col gap-4 md:gap-6"}>
              {col.map((g) => {
                const i = GALLERY.indexOf(g);
                return (
                  <button key={g.src.src} type="button" onClick={() => setIndex(i)} data-reveal="up" className="group relative block overflow-hidden rounded-[20px] text-left">
                    <Image src={g.src} alt={g.alt} placeholder="blur" sizes="(min-width:768px) 30vw, 50vw" className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#0a001a]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute bottom-4 left-4 flex items-center gap-2 font-futura_bold text-white opacity-0 translate-y-3 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Expand className="h-4 w-4" /> {g.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Lightbox items={GALLERY} index={index} onClose={close} onIndex={setIndex} />
    </section>
  );
}

export default function EventsView() {
  const root = useRef(null);
  const events = useMemo(() => getEvents(), []);
  const featured = events.find((e) => e.status === "upcoming") ?? events.find((e) => e.date);
  const arcade = events.find((e) => e.editions);
  useReveals(root);

  const years = events.filter((e) => e.year).map((e) => e.year);
  return (
    <div ref={root}>
      <PageHero
        compact
        eyebrow="Our Events"
        title={<>Moments that <span className="gradient-text">move</span> us</>}
        lead="Datathons, hackathons, ideathons, competitions and workshops — every event is a chance to learn, build and meet people who push you further."
        aside={
          <div className="flex gap-6 md:gap-8 whitespace-nowrap">
            <div><p className="font-compacta text-6xl leading-none text-white">{events.length}</p><p className="mt-1 text-sm text-white/60">Experiences</p></div>
            <div><p className="font-compacta text-6xl leading-none text-white">400+</p><p className="mt-1 text-sm text-white/60">Participants</p></div>
            <div><p className="font-compacta text-6xl leading-none gradient-text">{FOUNDED.year}–{String(Math.max(...years)).slice(2)}</p><p className="mt-1 text-sm text-white/60">Seasons</p></div>
          </div>
        }
      />
      <div className="border-y border-white/10 bg-Main-700/60 py-4">
        <Marquee speed={40}>
          {events.map((e) => (
            <span key={e.id} className="flex items-center gap-6 pr-6 font-futura_bold text-2xl uppercase text-white/80 md:text-4xl">
              {e.title} <span className="text-accent-500">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
      {featured && <Featured event={featured} />}
      <Archive events={events} />
      {arcade && <Arcade event={arcade} />}
      <Gallery />
      <PartnerCTA eyebrow="Sponsor an event" title="Put your name on our next big moment." text="Partner with Skill&Tell to reach motivated students through hackathons, datathons, competitions and workshops." cta="Partner with us" />
    </div>
  );
}
