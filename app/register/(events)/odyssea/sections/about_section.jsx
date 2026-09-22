import React from "react";
import Reveal from "../components/Reveal";
import { ABOUT } from "../lib/content";
import Display from "../components/Display";
import Image from "next/image";
import sun from "@/assets/images/odyssea/sun.webp";

function AboutSection() {
  return (
    <section
      id="about"
      /* globals.css puts `overflow: hidden` on every section; the sun's glow
         spreads past this one's top edge on phones, so that is lifted here and
         restored from lg up, where the sun sits in the layout instead */
      className="relative overflow-visible pb-20 lg:overflow-hidden lg:py-28"
    >
      {/* phones only: the starfield is eased in from the hero's own night so the
          surface the sun sits on reads as one continuous sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-ody-night via-ody-night/65 to-transparent lg:hidden"
      />

      {/* phones only: the whole sun, its centre parked on the fold — half of it
          shows at the foot of the first screen and a small scroll reveals the
          rest. .ody-about-sun does the maths and keeps it in the flow, so the
          heading below always clears it. */}
      <div className="ody-about-sun relative z-20 lg:hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(253,204,70,0.16),transparent_65%)] blur-xl"
        />
        <Image
          src={sun}
          alt=""
          aria-hidden="true"
          priority
          sizes="56vw"
          className="ody-sun-spin-slow relative block w-full select-none"
        />
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-[1560px] items-center gap-12 px-[5vw] sm:mt-16 lg:mt-0 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)] lg:gap-[4%]">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="ody-display ody-weighted ody-text-glow text-[clamp(2.6rem,7.6vw,7rem)] leading-[0.95] text-ody-title">
              <Display>ABOUT ODYSSEA</Display>
            </h2>
          </Reveal>

          <Reveal delay={90} className="mt-8">
            <p className="text-[clamp(1.05rem,1.75vw,2.05rem)] leading-[1.28] text-ody-white">
              {ABOUT.lead}
            </p>
          </Reveal>
        </div>

        {/* desktop keeps the sun here, beside the copy, exactly as before */}
        <Reveal delay={120} className="order-1 hidden lg:order-2 lg:flex lg:justify-end">
          <div className="relative w-full">
            <div
              aria-hidden="true"
              className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(253,204,70,0.16),transparent_65%)] blur-xl"
            />
            <Image
              src={sun}
              alt="A golden rayed sun"
              loading="lazy"
              className="ody-sun-spin-slow relative w-full select-none"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default React.memo(AboutSection);
