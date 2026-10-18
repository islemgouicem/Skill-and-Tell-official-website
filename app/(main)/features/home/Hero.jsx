"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { gsap, SplitText, useGSAP, prefersReducedMotion, consumeStageDelay, paintGradients } from "@/lib/motion/gsap";
import EmberField from "@/components/motion/EmberField";
import Magnetic from "@/components/motion/Magnetic";
import TLink from "@/components/site/TLink";
import Shield from "@/components/ui/shield_badge";

const AVATARS = ["/images/managers/Khefif_Abderahim.JPG", "/images/managers/salamo.jpg", "/images/managers/badri.jpg"];

// Arc of the logo's shooting star, traced over the headline.
const STAR_PATH = "M -40 520 C 260 520, 420 330, 640 300 S 1040 170, 1260 40";

function StarHead() {
  return (
    <g data-star-head>
      <circle r="22" fill="url(#hero-star-glow)" />
      <path d="M0 -14 L3.2 -3.2 L14 0 L3.2 3.2 L0 14 L-3.2 3.2 L-14 0 L-3.2 -3.2 Z" fill="#ffc78a" />
      <circle r="3" fill="#fff" />
    </g>
  );
}

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const delay = consumeStageDelay();
      const q = gsap.utils.selector(root);

      if (reduced) {
        gsap.set(q("[data-hero-fade], [data-hero-title]"), { opacity: 1 });
        gsap.set(q("[data-star-trail]"), { strokeDashoffset: 0 });
        return;
      }

      const split = SplitText.create(q("[data-hero-title]"), { type: "lines,chars", mask: "lines" });
      gsap.set(q("[data-hero-title]"), { opacity: 1 });
      paintGradients(q("[data-hero-title]")[0]);

      const trail = q("[data-star-trail]")[0];
      const len = trail.getTotalLength();
      gsap.set(trail, { strokeDasharray: len, strokeDashoffset: len });

      const tl = gsap.timeline({ delay: delay + 0.15 });
      tl.from(q("[data-planet]"), { yPercent: 60, opacity: 0, duration: 1.8, ease: "expo.out" }, 0)
        .from(split.chars, { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.022, ease: "power4.out" }, 0.1)
        .to(trail, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.35)
        .fromTo(q("[data-star-head]"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.35)
        .to(q("[data-star-head]"), {
          duration: 1.6,
          ease: "power2.inOut",
          motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5] },
        }, 0.35)
        .to(q("[data-star-head]"), { scale: 1.8, opacity: 0, duration: 0.5, transformOrigin: "50% 50%" }, 1.9)
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
        .to(q("[data-planet-scroll]"), { yPercent: -18, scale: 1.25, ease: "none" }, 0)
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
        <Image src="/images/background_c.webp" alt="" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="snt-grid-bg absolute inset-0 opacity-70" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 40%, rgba(123,44,191,0.35), transparent 70%)" }} />
      <EmberField density={0.9} />

      {/* Orbit rings */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2">
        <div className="snt-spin-slow h-[88vmin] w-[88vmin] rounded-full border border-dashed border-Main-300/15" />
        <div className="snt-spin-slower absolute inset-[12%] rounded-full border border-Main-300/10">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-accent-500 shadow-[0_0_18px_6px_rgba(255,109,0,0.6)]" />
        </div>
      </div>

      {/* Shooting star */}
      <svg aria-hidden="true" viewBox="0 0 1220 600" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="hero-trail" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0" stopColor="#7b2cbf" stopOpacity="0" />
            <stop offset="0.5" stopColor="#9d4edd" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ff9e00" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="hero-star-glow">
            <stop offset="0" stopColor="#ff9e00" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ff6d00" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path data-star-trail d={STAR_PATH} fill="none" stroke="url(#hero-trail)" strokeWidth="3" strokeLinecap="round" />
        <StarHead />
      </svg>

      <div data-hero-content className="relative z-20 mx-auto flex max-w-6xl flex-col items-center px-5 pt-24 text-center">
        <span data-hero-fade className="snt-eyebrow mb-6">Scientific Club · ENSIA</span>
        <h1 data-hero-title className="snt-display text-white opacity-0">
          Start your journey
          <br />
          with <span className="gradient-text pr-1">Skill&amp;Tell</span>
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
      <div data-badge className="absolute left-3 top-[13%] z-10 md:left-[6%] md:top-[30%] xl:left-[8.5%]">
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

      {/* Planet horizon */}
      <div data-planet-scroll className="pointer-events-none absolute inset-x-0 -bottom-2 z-[5] flex justify-center">
        <div data-planet className="flex w-full justify-center">
        <Image src="/purpleplanet.png" alt="" width={1210} height={347} priority className="h-auto w-[170%] max-w-none sm:w-[120%] lg:w-full" />
        </div>
      </div>

      <div data-hero-fade className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
          <span className="snt-scroll-dot block h-2 w-1 rounded-full bg-accent-300" />
        </span>
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </div>
    </section>
  );
}
