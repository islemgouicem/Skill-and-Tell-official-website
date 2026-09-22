import React from "react";
import Image from "next/image";
import iconLogo from "@/assets/images/odyssea/Odyssea-logo-icon.png";
import wordmarkLogo from "@/assets/images/odyssea/Odyssea-logo-wordmark.png";

/**
 * The Odyssea mark, used exactly as drawn.
 *
 * Two pieces — the ship medallion and the lettering — set two ways:
 *
 *   row    the medallion beside the lettering, for the navbar, where the
 *          header is short and a stacked mark would not fit
 *   stack  the medallion above the lettering, both flush left, so the mark
 *          shares the footer column's left edge with the copy beneath it
 *
 * The medallion's optical centre sits a little above its box (the waves fill
 * the lower third), so in `row` it is nudged up by a hair to sit level with
 * the lettering rather than measurably centred on it.
 */
const ICON = {
  sm: "h-7",
  nav: "h-8 sm:h-9 lg:h-11",
  md: "h-10",
  lg: "h-16 sm:h-20 lg:h-24",
};

const WORDMARK = {
  sm: "h-4 sm:h-5",
  nav: "h-5 sm:h-6 lg:h-7",
  md: "h-6",
  lg: "h-8 sm:h-10 lg:h-12",
};

const GAP = {
  sm: "gap-2",
  nav: "gap-2.5 sm:gap-3",
  md: "gap-3",
  lg: "gap-3 sm:gap-4",
};

function Brand({ size = "md", variant = "row", className = "" }) {
  const stacked = variant === "stack";

  const icon = (
    <Image
      src={iconLogo}
      alt=""
      aria-hidden="true"
      priority={size === "nav"}
      sizes="120px"
      className={`${ICON[size] ?? ICON.md} w-auto shrink-0 select-none ${stacked ? "" : "-mt-px"}`}
    />
  );

  const wordmark = (
    <Image
      src={wordmarkLogo}
      alt="Odyssea by Skill&Tell"
      priority={size === "nav"}
      sizes="(min-width: 1024px) 260px, 200px"
      className={`${WORDMARK[size] ?? WORDMARK.md} w-auto shrink-0 select-none`}
    />
  );

  return (
    <span
      className={`flex ${
        stacked
          ? `flex-col items-start ${GAP[size] ?? GAP.md}`
          : `items-center ${GAP[size] ?? GAP.md}`
      } ${className}`}
    >
      {icon}
      {wordmark}
    </span>
  );
}

export default React.memo(Brand);
