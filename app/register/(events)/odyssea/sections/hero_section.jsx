import heroRelief from "@/assets/images/odyssea/hero-relief.webp";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Display from "../components/Display";

/**
 * Hero.
 * The sun/cloud relief is the original artwork, turned a quarter turn so it
 * stands vertically against the left edge. It is completely static — no
 * rotation, no float, no sheen.
 *
 * Desktop keeps the Figma composition (title across the middle, the call to
 * action low and to the right). Phones get their own composition instead of a
 * squeezed copy of it: the relief holds the top of the screen, and the title,
 * the event line and the button sit together as one block in the lower half,
 * with a scroll cue closing the frame.
 */
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[82svh] w-full overflow-hidden lg:min-h-screen"
    >
      {/* the relief, flush to the left edge and cropped by it */}
      <Image
        src={heroRelief}
        alt="A golden classical sun rising through a bank of carved clouds"
        fetchPriority="high"
        className="pointer-events-none absolute -left-[20%] top-[9%] h-[33%] w-auto max-w-none select-none sm:-left-[16%] sm:top-[5%] sm:h-[46%] lg:-left-[6.5%] lg:top-[12%] lg:h-[80%]"
      />

      <Image
        src={heroRelief}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[25%] -bottom-[8%] h-[32%] w-auto max-w-none scale-x-[-1] select-none opacity-65 sm:-right-[20%] sm:-bottom-[10%] sm:h-[40%] lg:hidden"
      />

      {/* title + call to action */}
      <div className="relative z-10 flex min-h-[82svh] w-full flex-col px-5 pb-7 sm:px-8 lg:block lg:min-h-screen lg:px-0 lg:pb-0">
        {/* the relief owns the top of the phone screen */}
        <div aria-hidden="true" className="h-[26svh] shrink-0 sm:h-[34svh] lg:hidden" />

        <div className="flex flex-1 flex-col justify-center lg:contents">
          <h1 className="ody-display ody-weighted ody-text-glow pl-[0.18em] text-center text-[clamp(3.1rem,19.5vw,17.5rem)] leading-[0.86] tracking-[0.18em] text-ody-title lg:absolute lg:inset-x-0 lg:top-[48%] lg:-translate-y-1/2">
            <Display>ODYSSEA</Display>
          </h1>
         

          <div className="mt-8 flex justify-center sm:mt-10 lg:absolute lg:inset-x-0 lg:top-[79%] lg:mt-0 lg:justify-end lg:pr-[11%]">
            <Link
              href="/register/odyssea/register"
              onClick={() => window.scrollTo(0, 0)}
              className="ody-cta ody-display relative z-10 inline-flex min-h-[3.6rem] items-center justify-center px-9 text-[1.55rem] tracking-wide text-ody-title sm:min-h-[4.3rem] sm:px-12 sm:text-[2.05rem]"
            >
              <Display>REGISTER NOW!</Display>
            </Link>
          </div>

        </div>

        
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
