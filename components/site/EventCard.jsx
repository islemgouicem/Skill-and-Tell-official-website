"use client";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, Sparkles } from "lucide-react";
import TLink from "./TLink";
import Tilt from "@/components/motion/Tilt";

export function EventArt({ event, sizes = "(min-width:1024px) 33vw, 90vw", className = "" }) {
  if (event.image) {
    return (
      <Image
        src={event.image}
        alt={`${event.title} — Skill&Tell event`}
        fill
        sizes={sizes}
        className={`object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06] ${className}`}
      />
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[radial-gradient(70%_60%_at_30%_20%,#7b2cbf_0%,#1a0132_60%,#0a001a_100%)]">
      <div className="snt-grid-bg absolute inset-0" />
      <span className="snt-spin-slow absolute h-[140%] aspect-square rounded-full border border-dashed border-Main-300/20" />
      <span className="relative font-futura_bold text-[clamp(3rem,7vw,5.5rem)] leading-none text-outline">{event.title}</span>
      <Sparkles className="absolute right-6 top-6 h-6 w-6 text-accent-300" />
    </div>
  );
}

export function StatusBadge({ status }) {
  if (status === "upcoming")
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-3 py-1 text-xs font-futura_bold uppercase tracking-wider text-white">
        <span className="relative flex h-2 w-2">
          <span className="snt-pulse-ring absolute inset-0 rounded-full bg-white" />
          <span className="relative h-2 w-2 rounded-full bg-white" />
        </span>
        Upcoming
      </span>
    );
  if (status === "soon")
    return <span className="rounded-full bg-Main-400 px-3 py-1 text-xs font-futura_bold uppercase tracking-wider text-white">Coming soon</span>;
  return null;
}

export default function EventCard({ event, className = "", compact = false }) {
  const body = (
    <>
      <div className={`relative overflow-hidden rounded-[18px] ${compact ? "aspect-[4/3]" : "aspect-[4/3]"} bg-Main-700`}>
        <EventArt event={event} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a001a]/80 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="snt-chip backdrop-blur-md">{event.category}</span>
          <StatusBadge status={event.status} />
        </div>
        {event.href && (
          <span className="absolute bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white text-Main-700 opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        )}
      </div>
      <div className="px-1 pt-5">
        <div className="flex items-center gap-2 text-sm text-Main-300">
          <CalendarDays className="h-4 w-4" /> {event.dateLabel}
        </div>
        <h3 className="mt-2 font-futura_bold text-2xl text-white md:text-3xl">{event.title}</h3>
        {!compact && (
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-white/65">
            {event.description || "More about this experience is coming soon — stay tuned."}
          </p>
        )}
        {event.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {event.tags.slice(0, compact ? 2 : 4).map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs capitalize text-white/70">{t}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <Tilt max={4} className={`group relative block rounded-[24px] border border-white/10 bg-white/[0.03] p-3 transition-colors duration-500 hover:border-white/20 ${className}`}>
      {event.href ? (
        <TLink href={event.href} className="block focus-visible:outline-2 focus-visible:outline-accent-300 rounded-[18px]" aria-label={`${event.title} — open event page`}>
          {body}
        </TLink>
      ) : (
        <div>{body}</div>
      )}
    </Tilt>
  );
}
