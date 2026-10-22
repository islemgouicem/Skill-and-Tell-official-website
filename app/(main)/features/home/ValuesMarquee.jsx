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

/**
 * Two crossing ribbons laid over the seam between the hero and "Who are we?".
 * Zero-height and transparent, so neither section gets a band of its own.
 */
export default function ValuesMarquee() {
  return (
    <div className="relative z-30 h-0" style={{ overflowX: "clip" }} aria-label="Skill&Tell values">
      <div className="absolute inset-x-0 top-0 -translate-y-1/2">
        <div className="-rotate-2 scale-[1.06] bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300 py-2.5 shadow-[0_18px_50px_-18px_rgba(255,109,0,0.7)] md:py-3.5">
          <Marquee speed={60} itemClassName="gap-8 pr-8">
            {VALUES.map((v) => (
              <span key={v} className="flex items-center gap-8 font-futura_bold text-2xl uppercase text-[#1a0132] md:text-4xl">
                {v}
                <Star className="h-5 w-5 text-white md:h-7 md:w-7" />
              </span>
            ))}
          </Marquee>
        </div>
        <div className="-mt-2 rotate-[1.5deg] scale-[1.06] border-y border-Main-300/30 bg-Main-700/85 py-2.5 backdrop-blur-md md:py-3.5">
          <Marquee speed={45} reverse itemClassName="gap-8 pr-8">
            {VALUES.map((v) => (
              <span key={v} className="flex items-center gap-8 font-futura_bold text-2xl uppercase md:text-4xl">
                <span className="text-outline">{v}</span>
                <Star className="h-4 w-4 text-accent-500 md:h-6 md:w-6" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
