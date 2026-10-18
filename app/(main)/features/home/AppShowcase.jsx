"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";
import PopUp from "@/components/ui/popup";
import phone2 from "@/assets/images/skillntell/phone2.webp";
import phone1 from "@/assets/images/skillntell/phone1.webp";
import card1 from "@/assets/images/skillntell/card1.webp";
import card2 from "@/assets/images/skillntell/card2.webp";
import qr from "@/assets/images/skillntell/qr.png";
import memberCard from "@/assets/images/skillntell/member_card.webp";
import eventCard from "@/assets/images/skillntell/event_card.webp";

// [image, alt, position classes, rotation, entry offset {x,y}, scroll depth]
const PIECES = [
  [phone2, "Phone showing the member card screen", "left-[3%] top-[3%] w-[28%] md:left-[7%] md:top-[14%] md:w-[15%]", 0, { x: -200, y: 0 }, 0.6],
  [card1, "Skill&Tell card", "left-[35%] top-[7%] w-[30%] md:left-[27%] md:top-[9%] md:w-[15%]", -10, { x: 0, y: -200 }, 0.35],
  [memberCard, "Member card", "right-[2%] top-[4%] w-[32%] md:right-[3%] md:top-[9%] md:w-[18%]", 14, { x: 200, y: -200 }, 0.8],
  [qr, "QR card", "hidden md:block md:right-[24%] md:top-[30%] md:w-[11%]", -16, { x: 200, y: 0 }, 0.25],
  [card2, "Event name card", "left-[3%] bottom-[7%] w-[33%] md:left-[5%] md:bottom-[10%] md:w-[14%]", -10, { x: -200, y: 200 }, 0.7],
  [eventCard, "Event QR card", "left-[37%] bottom-[2%] w-[28%] md:left-[27%] md:bottom-[5%] md:w-[13%]", 15, { x: 0, y: 200 }, 0.45],
  [phone1, "Phone showing the login screen", "right-[4%] bottom-[4%] w-[25%] md:right-[7%] md:bottom-[6%] md:w-[13%]", 0, { x: 200, y: 200 }, 0.9],
];

export default function AppShowcase() {
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  useReveals(root);

  useGSAP(
    () => {
      const pieces = gsap.utils.toArray("[data-piece]");
      if (prefersReducedMotion()) return;
      pieces.forEach((p, i) => {
        const [, , , rot, from, depth] = PIECES[i];
        gsap.fromTo(p, { x: from.x, y: from.y, rotate: rot + (i % 2 ? 25 : -25), opacity: 0 }, {
          x: 0, y: 0, rotate: rot, opacity: 1, duration: 1.4, ease: "expo.out", delay: i * 0.07,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        gsap.to(p.firstElementChild, {
          yPercent: -40 * depth,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="app" className="relative flex min-h-[115svh] items-center justify-center overflow-hidden bg-white md:min-h-screen">
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/app_mob_bg.svg" />
        <img src="/images/App_section_bg.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      </picture>

      {PIECES.map(([src, alt, pos, rot], i) => (
        <div key={i} data-piece className={`absolute z-[2] ${pos}`} style={{ transform: `rotate(${rot}deg)` }}>
          <div className="transition-transform duration-500 hover:scale-105">
            <Image src={src} alt={alt} sizes="(min-width:768px) 18vw, 33vw" className="h-auto w-full drop-shadow-[0_18px_30px_rgba(26,1,50,0.25)]" />
          </div>
        </div>
      ))}

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center px-6 text-center">
        <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">06 — In your pocket</span>
        <h2 data-split="chars" className="snt-h2 mt-5 text-neutral-600">S&amp;T App</h2>
        <p data-reveal="up" className="mt-6 text-sm leading-7 text-neutral-400 md:text-base">
          Skill&amp;Tell App lets you stay connected. Explore all events, discover opportunities, and interact with members and leaders.
          Built to keep you updated, involved, and inspired. Join us, grow with us.
        </p>
        <div data-reveal="up" className="mt-8">
          <Magnetic>
            <button type="button" onClick={() => setOpen(true)} className="botao rounded-4xl bg-accent-400">
              <span className="flex items-center gap-2">Download <Image src="/icons/download.svg" height={26} width={22} alt="" aria-hidden="true" /></span>
            </button>
          </Magnetic>
        </div>
      </div>

      <PopUp isOpen={open} onClose={() => setOpen(false)} title="The App" subtitle="Launching Soon. Stay Ready." msg="Something big is on the way. Get ready for a whole new experience!" />
    </section>
  );
}
