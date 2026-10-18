"use client";
import { useRef } from "react";
import Image from "next/image";
import { Lightbulb, Rocket, Users, Award } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion, paintGradients } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Tilt from "@/components/motion/Tilt";
import { PILLARS } from "@/data/skillntell/site";
import whitebg from "@/assets/images/skillntell/white_bg.webp";
import aboutus1 from "@/assets/images/skillntell/about_us1.webp";
import aboutus2 from "@/assets/images/skillntell/about_us2.webp";
import phone from "@/assets/images/skillntell/phone.webp";

const ICONS = { about: Lightbulb, vision: Rocket, specialty: Users, achievements: Award };

function Pillar({ pillar, variant = "deep", className = "", delay = 0 }) {
  const Icon = ICONS[pillar.key];
  const bg = variant === "deep" ? "about-cont" : "bg-Main-600";
  return (
    <Tilt max={5} data-reveal="up" data-delay={delay} className={`${bg} relative rounded-[22px] p-6 md:p-7 text-white shadow-[0_30px_60px_-25px_rgba(60,9,108,0.6)] ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-futura_bold text-xl">{pillar.title}</h3>
      </div>
      <div className="flex gap-3">
        <span className="w-0.5 shrink-0 rounded bg-gradient-to-b from-accent-300 to-white/10" />
        <p className="text-[15px] leading-relaxed text-white/85">{pillar.body}</p>
      </div>
    </Tilt>
  );
}

export default function About() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create("[data-scrub-text]", { type: "words" });
      paintGradients(root.current.querySelector("[data-scrub-text]"));
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-scrub-text]", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.fromTo("[data-phone]", { y: 120, rotate: -6 }, {
        y: -40, rotate: 4, ease: "none",
        scrollTrigger: { trigger: "[data-bento]", start: "top bottom", end: "bottom top", scrub: true },
      });
      return () => split.revert();
    },
    { scope: root }
  );

  const [about, vision, specialty, achievements] = PILLARS;

  return (
    <section ref={root} id="about" className="snt-light relative py-24 md:py-36">
      <Image src={whitebg} alt="" aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-auto w-[90%] select-none" />
      <div className="snt-grid-bg snt-grid-bg--light absolute inset-0" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">01 — Identity</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-neutral-600">Who Are We?</h2>
          </div>
          <p data-scrub-text className="font-futura_md_bt text-[clamp(1.5rem,3.1vw,2.9rem)] leading-[1.18] text-neutral-600 lg:col-span-8">
            A scientific club at ENSIA where <span className="gradient-text">skills are sharpened</span>, ideas come to life,
            collaboration thrives — and passion, fun and excitement pave the way for success.
          </p>
        </div>

        <div data-bento className="mt-16 grid gap-5 md:mt-24 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          <Pillar pillar={about} className="lg:col-span-5" />
          <div data-reveal="clip" className="relative min-h-[260px] overflow-hidden rounded-[22px] lg:col-span-3">
            <div data-parallax="-0.25" className="absolute -inset-y-[15%] inset-x-0">
              <Image src={aboutus1} alt="Skill&Tell members during an event" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="relative hidden lg:col-span-4 lg:row-span-2 lg:flex items-center justify-center">
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-Main-300/60 to-accent-200/50 blur-3xl" />
            <div className="absolute h-[78%] aspect-square rounded-full border border-dashed border-Main-400/40 snt-spin-slow" />
            <Image data-phone src={phone} alt="Skill & Tell App" className="relative w-[58%] max-w-[270px] h-auto drop-shadow-[0_40px_60px_rgba(60,9,108,0.45)]" />
          </div>
          <Pillar pillar={vision} variant="solid" className="lg:col-span-4" delay={0.1} />
          <Pillar pillar={specialty} variant="solid" className="lg:col-span-4" delay={0.15} />
          <div data-reveal="clip" className="relative min-h-[260px] overflow-hidden rounded-[22px] md:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-3">
            <div data-parallax="-0.25" className="absolute -inset-y-[15%] inset-x-0">
              <Image src={aboutus2} alt="Skill&Tell member at a club activity" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover object-top" />
            </div>
          </div>
          <Pillar pillar={achievements} className="md:col-span-2 lg:col-span-8 lg:row-start-3" delay={0.1} />
        </div>
      </div>
    </section>
  );
}
