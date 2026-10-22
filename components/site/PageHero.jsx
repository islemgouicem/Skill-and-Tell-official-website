"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, prefersReducedMotion, consumeStageDelay } from "@/lib/motion/gsap";
import EmberField from "@/components/motion/EmberField";

/** Shared hero for inner pages: masked headline, lead, optional visual slot. */
export default function PageHero({ eyebrow, title, lead, bg = "/images/background_c.webp", children, aside, className = "", minH = "min-h-[88svh]", stacked = false, compact = false }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const delay = consumeStageDelay();
      if (prefersReducedMotion()) {
        gsap.set(q("[data-ph-title], [data-ph-fade]"), { opacity: 1 });
        return;
      }
      // Lines (not letters) so gradient / outlined words keep their styling.
      const split = SplitText.create(q("[data-ph-title]"), { type: "lines", mask: "lines" });
      gsap.set(q("[data-ph-title]"), { opacity: 1 });
      gsap.timeline({ delay: delay + 0.1 })
        .from(q("[data-ph-bg]"), { scale: 1.2, opacity: 0, duration: 1.8, ease: "expo.out" }, 0)
        .from(split.lines, { yPercent: 110, rotate: 3, stagger: 0.12, duration: 1.2, ease: "power4.out" }, 0.1)
        .fromTo(q("[data-ph-fade]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1 }, 0.5);

      gsap.to(q("[data-ph-inner]"), {
        yPercent: -18, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-ph-bg]"), {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className={`relative flex ${compact ? "pb-14 pt-28 md:pb-20 md:pt-32" : `${minH} items-end pb-16 pt-36 md:pb-24`} overflow-hidden bg-space-dark ${className}`}>
      <div data-ph-bg className="absolute inset-0">
        <Image src={bg} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space-dark" />
      <EmberField density={0.6} />
      {children}
      <div data-ph-inner className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:items-end">
        <div className={stacked ? "lg:col-span-7" : "lg:col-span-8"}>
          {eyebrow && <span data-ph-fade className="snt-eyebrow">{eyebrow}</span>}
          <h1 data-ph-title className="snt-display mt-6 text-white opacity-0">{title}</h1>
        </div>
        <div className={stacked ? "max-w-xl lg:col-span-7 lg:row-start-2" : "lg:col-span-4"}>
          {lead && <p data-ph-fade className="snt-lead text-white/70">{lead}</p>}
          {aside && <div data-ph-fade className="mt-8">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
