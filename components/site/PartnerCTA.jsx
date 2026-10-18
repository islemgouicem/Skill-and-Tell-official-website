"use client";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "./TLink";

/** Big orange call-to-action band that expands as it scrolls into view. */
export default function PartnerCTA({
  eyebrow = "Collaborate",
  title = "Let’s build something together.",
  text = "Clubs, sponsors, companies and organizations: partner with Skill&Tell on events, workshops, Missions and more.",
  href = "/partner",
  cta = "Become a partner",
}) {
  const root = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo("[data-cta-box]", { clipPath: "inset(12% 8% 12% 8% round 40px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top 25%", scrub: true },
      });
      gsap.fromTo("[data-cta-star]", { rotate: 0 }, {
        rotate: 180, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );
  return (
    <section ref={root} className="relative bg-footer-background">
      <div data-cta-box className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-400 to-[#ff9e00] py-24 md:py-32">
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(60% 80% at 100% 0%, #9d4edd, transparent 60%)" }} />
        <svg data-cta-star aria-hidden="true" viewBox="0 0 24 24" className="absolute -right-24 -top-24 h-[28rem] w-[28rem] text-white/15 md:-right-10">
          <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill="currentColor" />
        </svg>
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-start gap-10 px-5 md:px-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="snt-eyebrow !text-[#1a0132]">{eyebrow}</span>
            <h2 className="snt-h2 mt-5 text-[#1a0132]">{title}</h2>
            <p className="snt-lead mt-5 max-w-xl text-[#1a0132]/80">{text}</p>
          </div>
          <Magnetic>
            <TLink href={href} className="snt-btn snt-btn--dark text-lg">
              {cta} <ArrowRight className="snt-btn__arrow h-5 w-5" />
            </TLink>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
