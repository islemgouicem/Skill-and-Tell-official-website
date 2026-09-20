import React from "react";

/**
 * The Odyssea wordmark: "ODYSSEA" with "BY SKILL&TELL" tucked underneath.
 * One `size` drives both lines so the lock-up always stays proportional.
 */
const SIZES = {
  sm: "text-[1.2rem] sm:text-[1.4rem]",
  nav: "text-[1.55rem] sm:text-[1.9rem] lg:text-[2.15rem]",
  md: "text-[1.6rem] sm:text-[1.95rem]",
  lg: "text-[1.9rem] sm:text-[2.5rem]",
};

function Brand({ size = "md", className = "" }) {
  return (
    <span
      className={`ody-display block leading-[0.82] text-ody-gold ${SIZES[size] ?? SIZES.md} ${className}`}
    >
      ODYSSEA
      <span className="mt-[0.34em] block text-[0.48em] tracking-[0.17em] text-ody-gold/95">
        BY SKILL&amp;TELL
      </span>
    </span>
  );
}

export default React.memo(Brand);
