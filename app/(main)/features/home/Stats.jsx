"use client";
import { useRef } from "react";
import { useReveals } from "@/components/motion/useReveals";
import Counter from "@/components/motion/Counter";
import { STATS } from "@/data/skillntell/site";

export default function Stats({ tone = "light" }) {
  const root = useRef(null);
  useReveals(root);
  const light = tone === "light";

  return (
    <section ref={root} id="statistics" className={`relative py-20 md:py-28 ${light ? "snt-light" : "bg-space-dark text-white"}`}>
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span data-reveal="fade" className={`snt-eyebrow ${light ? "snt-eyebrow--dark" : ""}`}>02 — Impact</span>
            <h2 data-split="chars" className={`snt-h2 mt-5 ${light ? "text-neutral-600" : "text-white"}`}>Some Statistics</h2>
          </div>
          <p data-reveal="up" className={`max-w-md snt-lead ${light ? "text-neutral-400" : "text-white/60"}`}>
            Discover the impact we&apos;ve made through numbers. These stats reflect our community&apos;s growth, dedication, and shared passion for learning and innovation.
          </p>
        </div>

        <div data-reveal-stagger className="mt-14 grid gap-px overflow-hidden rounded-[26px] bg-Main-300/40 grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`group relative overflow-hidden p-5 sm:p-7 md:p-9 ${light ? "bg-white" : "bg-Main-700"}`}
            >
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-Main-400 transition-transform duration-700 group-hover:scale-x-100" />
              <span className={`font-futura_md_bt text-xs ${light ? "text-Main-500" : "text-Main-300"}`}>0{i + 1}</span>
              <div className="mt-6 snt-brand-text text-[clamp(2.6rem,5.2vw,5rem)] leading-none">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <p className={`mt-4 font-futura_bold text-base sm:text-lg ${light ? "text-neutral-600" : "text-white"}`}>{s.label}</p>
              <p className={`mt-2 hidden text-sm leading-relaxed sm:block ${light ? "text-neutral-400" : "text-white/60"}`}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
