"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import monster from "@/assets/images/skillntell/monster2.png";
import { MISSIONS_URL, MISSIONS_SOLO_LEVELING } from "@/data/skillntell/missions";

/** Short Solo Leveling–flavoured teaser that sends people to the Missions platform. */
export default function Missions() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo("[data-world]", { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.02, ease: "none", scrollTrigger: st });
      gsap.fromTo("[data-hunter]", { y: 60 }, { y: -40, ease: "none", scrollTrigger: st });

      // Jump scare: the monster lurks small and dim in the dark, breathing...
      gsap.set("[data-monster]", { scale: 0.34, opacity: 0.55, filter: "brightness(0.45)" });
      gsap.set("[data-backlight]", { scale: 0.4, opacity: 0.4 });
      const breathe = gsap.to("[data-monster]", { scale: 0.37, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      // ...then lunges at you once the section is well in view.
      gsap.timeline({ scrollTrigger: { trigger: "[data-monster]", start: "top 55%", once: true }, delay: 0.25 })
        .add(() => breathe.kill())
        .to("[data-monster]", { scale: 1.16, opacity: 1, filter: "brightness(1.3)", duration: 0.16, ease: "power4.in" })
        .to("[data-backlight]", { scale: 1.25, opacity: 1, duration: 0.16, ease: "power4.in" }, "<")
        .fromTo("[data-scare-flash]", { opacity: 0.55 }, { opacity: 0, duration: 0.7, ease: "power2.out" })
        .fromTo("[data-shake]", { x: -9, y: 4 }, { x: 9, y: -4, duration: 0.045, repeat: 7, yoyo: true, ease: "none", clearProps: "x,y" }, "<")
        .to("[data-monster]", { scale: 1, filter: "brightness(1)", duration: 0.9, ease: "elastic.out(1, 0.45)", clearProps: "filter" }, "<")
        .to("[data-backlight]", { scale: 1, duration: 1, ease: "power2.out" }, "<");
    },
    { scope: root }
  );

  return (
    <section ref={root} id="missions" className="relative overflow-hidden bg-space-dark py-24 md:py-32">
      <div data-world className="absolute inset-0">
        <Image src="/images/missions/world.webp" alt="" fill sizes="100vw" className="object-cover opacity-60" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-dark/40 to-space-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-space-dark/90 via-space-dark/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-space-dark to-transparent" />

      <div data-scare-flash className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_60%_at_75%_50%,rgba(157,78,221,0.9),rgba(26,1,50,0.4)_60%,transparent)] opacity-0" aria-hidden="true" />

      <div data-shake className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span data-reveal="fade" className="snt-eyebrow">03 — Skill&amp;Tell Missions</span>
          <Image
            data-reveal="up"
            src="/images/missions/logo-2.PNG"
            alt="Skill&Tell Missions"
            width={960}
            height={418}
            sizes="(min-width:1024px) 520px, 90vw"
            className="mt-6 h-auto w-full max-w-[520px]"
          />
          <p data-reveal="up" className="snt-lead mt-6 max-w-xl text-white/75">{MISSIONS_SOLO_LEVELING}</p>
          <div data-reveal="up" className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <a href={MISSIONS_URL} target="_blank" rel="noopener noreferrer" className="snt-btn snt-btn--primary">
                Enter the Missions platform <ArrowUpRight className="h-5 w-5" />
              </a>
            </Magnetic>
            <Magnetic>
              <TLink href="/missions" className="snt-btn snt-btn--ghost">
                How it works <ArrowRight className="snt-btn__arrow h-5 w-5" />
              </TLink>
            </Magnetic>
          </div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-[520px] sm:h-[460px] lg:col-span-6 lg:h-[540px] lg:max-w-none">
          {/* Backlight so the dark monster reads against the night sky */}
          <div className="absolute left-1/2 top-[46%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <div data-backlight className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(157,78,221,0.55)_0%,rgba(123,44,191,0.25)_40%,transparent_70%)]" />
          </div>
          <div data-hunter className="absolute inset-0 flex items-center justify-center">
            <div data-monster className="w-full max-w-[560px] origin-[50%_45%] will-change-transform">
            <Image
              src={monster}
              alt="A shadow monster guarding a gate"
              sizes="(min-width:1024px) 560px, 90vw"
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]"
            />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
