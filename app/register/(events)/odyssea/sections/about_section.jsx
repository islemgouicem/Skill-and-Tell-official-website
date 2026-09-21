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
      className="relative overflow-hidden py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-[1560px] items-center gap-12 px-[5vw] lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)] lg:gap-[4%]">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="ody-display ody-weighted ody-text-glow text-[clamp(2.6rem,7.6vw,7rem)] leading-[0.95] text-ody-title">
              <Display>ABOUT ODYSSEA</Display>
            </h2>
          </Reveal>

          <Reveal delay={90} className="mt-8">
            <p className="text-[clamp(1.05rem,2.05vw,2.05rem)] leading-[1.28] text-ody-white">
              {ABOUT.lead}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative w-[62%] max-w-[22rem] sm:w-[48%] lg:w-full lg:max-w-none">
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
