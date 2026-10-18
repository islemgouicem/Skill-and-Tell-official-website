"use client";
import Marquee from "@/components/motion/Marquee";
import { VALUES } from "@/data/skillntell/site";

function Star({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill="currentColor" />
    </svg>
  );
}

/** Two counter-rotating bands — the hand-off between the hero and the light sections. */
export default function ValuesMarquee() {
  return (
    <div className="relative z-10 -mt-px overflow-hidden bg-space-dark py-10 md:py-14" aria-label="Skill&Tell values">
      <div className="-rotate-2 scale-105 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300 py-3 md:py-4 shadow-[0_20px_60px_-20px_rgba(255,109,0,0.6)]">
        <Marquee speed={60} itemClassName="gap-8 pr-8">
          {VALUES.map((v) => (
            <span key={v} className="flex items-center gap-8 font-futura_bold text-3xl uppercase text-[#1a0132] md:text-5xl">
              {v}
              <Star className="h-6 w-6 text-white md:h-8 md:w-8" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="-mt-3 rotate-[1.5deg] scale-105 border-y border-Main-300/20 bg-Main-700 py-3 md:py-4">
        <Marquee speed={45} reverse itemClassName="gap-8 pr-8">
          {VALUES.map((v) => (
            <span key={v} className="flex items-center gap-8 font-futura_bold text-3xl uppercase md:text-5xl">
              <span className="text-outline">{v}</span>
              <Star className="h-5 w-5 text-accent-500 md:h-7 md:w-7" />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
