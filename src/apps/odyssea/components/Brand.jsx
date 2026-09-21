import React from "react";
import Display from "./Display";

/**
 * The Odyssea wordmark: "Odyssea" in title yellow with "By Skill&Tell"
 * tucked underneath in the brand orange. One `size` drives both lines.
 * `glow` adds the same luminosity text-shadow used on the hero/about
 * titles, for the standalone-wordmark spots (navbar, footer) where the
 * mark sits directly on the dark background.
 */
const SIZES = {
  sm: "text-[1.2rem] sm:text-[1.4rem]",
  nav: "text-[1.55rem] sm:text-[1.9rem] lg:text-[2.15rem]",
  md: "text-[1.6rem] sm:text-[1.95rem]",
  lg: "text-[2.7rem] sm:text-[3.6rem] lg:text-[4.2rem]",
};

const GLOW = {
  sm: "ody-text-glow-sm",
  true: "ody-text-glow",
};

function Brand({ size = "md", glow = false, className = "" }) {
  return (
    <span
      className={`ody-display ody-weighted block leading-[0.82] text-ody-title ${GLOW[glow] ?? ""} ${SIZES[size] ?? SIZES.md} ${className}`}
    >
      <Display>ODYSSEA</Display>
      <span className="mt-[0.3em] block text-[0.56em] tracking-[0.12em] text-ody-orange">
        <Display>BY SKILL&TELL</Display>
      </span>
    </span>
  );
}

export default React.memo(Brand);
