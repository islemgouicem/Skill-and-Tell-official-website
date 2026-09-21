import React from "react";
import { Link } from "react-router-dom";
import heroRelief from "../../../assets/images/odyssea/hero-relief.webp";
import Display from "../components/Display";

/**
 * Hero.
 * The sun/cloud relief is the original artwork, turned a quarter turn so it
 * stands vertically against the left edge. It is completely static — no
 * rotation, no float, no sheen.
 */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[88svh] w-full overflow-hidden lg:min-h-screen"
    >
      {/* the relief, flush to the left edge and cropped by it */}
      <img
        src={heroRelief}
        alt="A golden classical sun rising through a bank of carved clouds"
        fetchPriority="high"
        className="pointer-events-none absolute -left-[22%] top-[10%] h-[50%] w-auto max-w-none select-none sm:-left-[14%] sm:h-[58%] lg:-left-[6.5%] lg:top-[12%] lg:h-[80%]"
      />

      {/* title + call to action */}
      <div className="relative z-10 flex min-h-[88svh] w-full flex-col justify-end px-4 pb-14 pt-[52vh] sm:px-8 lg:block lg:min-h-screen lg:px-0 lg:pb-0 lg:pt-0">
        <h1 className="ody-display ody-weighted ody-text-glow pl-[0.18em] text-center text-[clamp(2.9rem,19.5vw,17.5rem)] leading-[0.86] tracking-[0.18em] text-ody-title lg:absolute lg:inset-x-0 lg:top-[48%] lg:-translate-y-1/2">
          <Display>ODYSSEA</Display>
        </h1>

        <div className="mt-10 flex justify-center lg:absolute lg:inset-x-0 lg:top-[79%] lg:mt-0 lg:justify-end lg:pr-[11%]">
          <Link
            to="/odyssea/register"
            onClick={() => window.scrollTo(0, 0)}
            className="ody-cta ody-display relative z-10 inline-flex min-h-16 items-center justify-center px-12 text-[1.7rem] tracking-wide text-ody-title sm:min-h-[4.6rem] sm:px-16 sm:text-[2.15rem]"
          >
            <Display>REGISTER NOW!</Display>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
