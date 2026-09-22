import React from "react";
import Link from "next/link";
import Image from "next/image";
import Display from "../components/Display";

import heroBg from "@/assets/images/odyssea/hero-bg.webp";
import heroBgMobile from "@/assets/images/odyssea/hero-bg-mobile.webp";
import sunRelief from "@/assets/images/odyssea/sun-relief.webp";
import wordmark from "@/assets/images/odyssea/wordmark.webp";
import sntLogo from "@/assets/images/odyssea/sntxwsai.png";

/**
 * Hero.
 * Deep-blue marble plate behind everything (a landscape cut on desktop, the
 * portrait cut on phones, anchored to the top so its chevron stays below the
 * fold), the gilded sun relief bleeding off the left edge, and the ODYSSEA
 * wordmark as artwork rather than type, so the gold leaf and its glow survive
 * exactly as drawn.
 *
 * Phones get their own composition: the relief holds the top corner and the
 * wordmark and button ride together in the upper middle. The turning sun that
 * straddles this section's foot belongs to About, so that it can hang below
 * the join as well as above it.
 */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[82svh] w-full overflow-hidden bg-ody-night lg:min-h-screen"
    >
      {/* ---- the marble ---- */}
      <Image
        src={heroBgMobile}
        alt=""
        aria-hidden="true"
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 top-0 h-[128%] w-full select-none object-cover object-top lg:hidden"
      />
      <Image
        src={heroBg}
        alt=""
        aria-hidden="true"
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 hidden h-full w-full select-none object-cover lg:block"
      />
      {/* a breath of darkness at the edges so the gold reads cleanly, and a
          fade at the foot so the marble melts into the starfield below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_45%,transparent_35%,rgba(1,18,28,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_bottom,rgba(1,27,42,0)_0%,rgba(1,27,42,0.35)_45%,rgba(1,27,42,0.8)_78%,var(--color-ody-night)_100%)] lg:h-[32%]"
      />

      {/* ---- the gilded relief, flush to the left edge ---- */}
      <Image
        src={sunRelief}
        alt="A gilded sun rising through carved clouds"
        priority
        className="pointer-events-none absolute left-[-20%] top-[15%] h-[33%] w-auto max-w-none select-none drop-shadow-[0_18px_40px_rgba(0,12,20,0.55)] sm:left-[-16%] sm:h-[44%] lg:left-[-7%] lg:top-[11%] lg:h-[82%]"
      />

      {/* ---- wordmark + call to action ---- */}
      <div className="relative z-10 flex min-h-[82svh] w-full flex-col px-5 pb-8 sm:px-8 lg:block lg:min-h-screen lg:px-0 lg:pb-0">
        <div
          aria-hidden="true"
          className="h-[24svh] shrink-0 sm:h-[32svh] lg:hidden"
        />

        <div className="flex flex-1 flex-col justify-center lg:contents">
          <div className="lg:absolute lg:inset-x-0 lg:top-[46%] lg:-translate-y-1/2">
            <h1 className="m-0">
              <span className="sr-only">Odyssea</span>
              <Image
                src={wordmark}
                alt=""
                aria-hidden="true"
                priority
                sizes="(min-width: 1024px) 76vw, 88vw"
                className="mx-auto block -mb-6 h-auto w-[88%] max-w-[560px] select-none sm:w-[78%] sm:max-w-[680px] lg:w-[76%] lg:max-w-[1180px]"
              />
            </h1>

            <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
              <Image
                src={sntLogo}
                alt="SkillnTell"
                priority
                className="h-auto w-[42%] max-w-[220px] select-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)] sm:w-[35%] sm:max-w-[260px] lg:w-[22%] lg:max-w-[320px]"
              />
            </div>
          </div>

          <div className="mt-7 flex justify-center sm:mt-9 lg:absolute lg:inset-x-0 lg:top-[80%] lg:mt-0 lg:justify-end lg:pr-[11%]">
            <Link
              href="/register/odyssea/register"
              onClick={() => window.scrollTo(0, 0)}
              className="ody-cta ody-display relative z-10 inline-flex min-h-[3.6rem] items-center justify-center px-9 text-[1.55rem] tracking-wide text-ody-title sm:min-h-[4.3rem] sm:px-12 sm:text-[2.05rem]"
            >
              <Display>REGISTER NOW!</Display>
            </Link>
          </div>
        </div>

        <div className="mt-auto flex justify-center pb-2 pt-8 lg:hidden">
          <Image
            src={sntLogo}
            alt="SkillnTell"
            priority
            className="h-auto w-[52%] max-w-[260px] select-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.35)] sm:w-[44%] sm:max-w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
