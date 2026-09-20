import React from "react";
import Reveal from "../components/Reveal";
import { ABOUT } from "../lib/content";
import sun from "../../../assets/images/odyssea/sun.webp";

function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
    >
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2 className="ody-display ody-text-glow text-[clamp(2.4rem,7vw,4.4rem)] leading-[0.95] text-ody-gold">
              ABOUT ODYSSEA
            </h2>
          </Reveal>

          <Reveal delay={90} className="mt-7 max-w-2xl">
            <p className="text-[1.02rem] leading-8 text-white/88 sm:text-[1.12rem] sm:leading-9">
              {ABOUT.lead}
            </p>
            <p className="mt-5 text-[0.98rem] leading-8 text-white/62 sm:text-[1.05rem]">
              {ABOUT.body}
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-9 grid max-w-lg grid-cols-3 items-stretch gap-x-5 sm:gap-x-8">
            {ABOUT.stats.map(([value, label], index) => (
              <div
                key={label}
                className={`flex flex-col ${index > 0 ? "border-l border-ody-gold/25 pl-5 sm:pl-8" : ""}`}
              >
                <span className="ody-display text-4xl leading-none text-ody-gold sm:text-5xl">
                  {value}
                </span>
                <span className="mt-2 text-[0.72rem] uppercase tracking-[0.2em] text-white/55">
                  {label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={120} className="order-1 flex justify-center lg:order-2">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-[-18%] rounded-full bg-[radial-gradient(circle,rgba(188,147,54,0.22),transparent_65%)] blur-xl"
            />
            <img
              src={sun}
              alt="A golden rayed sun"
              loading="lazy"
              className="ody-sun-spin-slow relative w-52 select-none sm:w-72 lg:w-[24rem] xl:w-[26rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default React.memo(AboutSection);
