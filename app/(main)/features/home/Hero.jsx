"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion, consumeStageDelay } from "@/lib/motion/gsap";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import Shield from "@/components/ui/shield_badge";
import globe from "@/assets/images/skillntell/globe2.webp";

const AVATARS = ["/images/managers/web/Khefif_Abderahim.webp", "/images/managers/web/salamo.webp", "/images/managers/web/badri.webp"];

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const delay = consumeStageDelay();
      const q = gsap.utils.selector(root);

      if (reduced) {
        gsap.set(q("[data-hero-fade], [data-hero-title]"), { opacity: 1 });
        return;
      }

      // Letters rise for the plain words; the brand word keeps its original
      // outlined-gradient styling, so it is revealed as one piece.
      const split = SplitText.create(q("[data-hero-chars]"), { type: "words,chars", mask: "words" });
      gsap.set(q("[data-hero-title]"), { opacity: 1 });

      const tl = gsap.timeline({ delay: delay + 0.15 });
      tl.from(q("[data-planet]"), { yPercent: 60, opacity: 0, duration: 1.8, ease: "expo.out" }, 0)
        .from(split.chars, { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.022, ease: "power4.out" }, 0.1)
        .from(q("[data-hero-brand]"), { yPercent: 40, opacity: 0, scale: 0.92, duration: 1.3, ease: "power3.out", clearProps: "transform,opacity" }, 0.55)
        .fromTo(q("[data-hero-fade]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.7)
        .fromTo(q("[data-depth]"), { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, stagger: 0.12, ease: "back.out(1.7)" }, 1.0);

      // Idle float for badges.
      q("[data-badge-inner]").forEach((b, i) => {
        gsap.to(b, { y: i % 2 ? 12 : -12, duration: 3 + i * 0.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.3 });
      });

      // Pointer depth parallax.
      const mm = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      let onMove;
      if (mm) {
        const movers = q("[data-depth]").map((el) => ({
          d: parseFloat(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.d * 60);
            m.y(ny * m.d * 60);
          });
        };
        window.addEventListener("pointermove", onMove);
      }

      // Scroll-out: content lifts away, planet rises and swells.
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      })
        .to(q("[data-hero-content]"), { yPercent: -35, opacity: 0, ease: "none" }, 0)
        .to(q("[data-planet-scroll]"), { yPercent: -10, scale: 1.08, ease: "none" }, 0)
        .to(q("[data-hero-bg]"), { scale: 1.15, ease: "none" }, 0)
        .to(q("[data-badge]"), { y: (i) => -120 - i * 70, opacity: 0, ease: "none" }, 0);

      return () => {
        split.revert();
        if (onMove) window.removeEventListener("pointermove", onMove);
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} id="hero" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-space-dark">
      <div data-hero-bg className="absolute inset-0">
        <Image src="/images/background_c.webp" alt="" fill sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 40%, rgba(123,44,191,0.3), transparent 70%)" }} />

      <div data-hero-content className="relative z-20 mx-auto flex max-w-6xl -translate-y-[6vh] flex-col items-center px-5 pt-20 text-center">
        <h1 data-hero-title className="snt-display text-white opacity-0">
          <span data-hero-chars>Start your journey</span>
          <br />
          <span data-hero-chars>with</span>{" "}
          <span data-hero-brand className="inline-block">
            <span
              className="text-space-accent"
              style={{
                color: "#422352",
                background: "linear-gradient(90deg,#FF6D00,#8A38F5)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextStroke: "0.06em transparent",
                letterSpacing: "0.05em",
                fontWeight: 800,
              }}
            >
              Skill&amp;Tell
            </span>
          </span>
        </h1>
        <p data-hero-fade className="snt-lead mt-7 max-w-2xl text-white/70">
          Start your journey with our creative, inspiring and welcoming club, where skills are sharpened, ideas come to life,
          collaboration thrives, and passion, fun, and excitement pave the way for success!
        </p>
        <div data-hero-fade className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic>
            <TLink href="/register" className="snt-btn snt-btn--primary text-lg">
              Register Now <ArrowRight className="snt-btn__arrow h-5 w-5" />
            </TLink>
          </Magnetic>
          <Magnetic>
            <TLink href="/events" className="snt-btn snt-btn--ghost text-lg">
              Explore our events
            </TLink>
          </Magnetic>
        </div>
      </div>

      {/* Floating badges */}
      <div data-badge className="absolute left-3 top-[13%] z-10 md:left-[6%] md:top-[14%] xl:left-[8.5%]">
        <div data-depth="0.6">
          <div data-badge-inner className="badges flex -rotate-6 items-center gap-2 rounded-full border border-white/40 px-2 py-1 md:px-4 md:py-2">
            <div className="flex -space-x-2">
              {AVATARS.map((src) => (
                <Image key={src} src={src} alt="" width={36} height={36} className="h-6 w-6 rounded-full border border-white object-cover md:h-9 md:w-9" />
              ))}
            </div>
            <span className="text-left text-xs font-semibold md:text-sm">
              <span className="block font-futura_bold text-sm text-[#ff6d00] md:text-lg">534+</span> Members
            </span>
          </div>
        </div>
      </div>
      <div data-badge className="absolute right-3 top-[14%] z-10 md:right-[7%] md:top-[19%]">
        <div data-depth="-0.8">
          <div data-badge-inner className="badges flex rotate-[8deg] flex-col items-center rounded-full border border-white/40 px-3 py-1 md:px-5 md:py-2">
            <span className="font-futura_bold text-sm text-[#ff6d00] md:text-lg">400+</span>
            <span className="text-[10px] font-semibold md:text-sm">Participants in events</span>
          </div>
        </div>
      </div>
      <div data-badge className="absolute bottom-[22%] left-[5%] z-10 hidden sm:block md:bottom-[17%] md:left-[8%]">
        <div data-depth="1">
          <div data-badge-inner className="badges flex -rotate-12 flex-col rounded-full border border-white/40 px-6 py-2 md:px-8">
            <span className="font-futura_bold text-[#ff6d00] md:text-xl">4+</span>
            <span className="text-xs font-semibold md:text-sm">Projects</span>
          </div>
        </div>
      </div>
      <div data-badge className="absolute bottom-[20%] right-[4%] z-10 hidden sm:block md:bottom-[14%] md:right-[9%]">
        <div data-depth="-0.5">
          <div data-badge-inner className="rotate-12 scale-90 md:scale-100">
            <Shield />
          </div>
        </div>
      </div>

      {/* Globe rising from the bottom: only its upper cap shows, turning slowly. */}
      <div data-planet-scroll className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex justify-center">
        <div className="w-[108vw] max-w-none translate-y-[56%] sm:w-[80vw] sm:translate-y-[64%] md:w-[66vw] lg:w-[min(50vw,86vh)]">
          <div data-planet className="relative">
            <div className="absolute inset-[6%] rounded-full bg-Main-400/40 blur-[70px]" aria-hidden="true" />
            <Image src={globe} alt="" priority fetchPriority="high" sizes="(min-width:1024px) 50vw, 108vw" className="snt-globe relative h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
