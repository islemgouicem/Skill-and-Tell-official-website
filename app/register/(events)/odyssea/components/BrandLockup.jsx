import React from "react";
import Image from "next/image";
import Brand from "./Brand";
import compass from "@/assets/images/odyssea/compass.webp";
import aiWeek from "@/assets/images/odyssea/WSAI_logo.png";

/**
 * The co-branded lockup, used in the footer only: the Odyssea mark stacked
 * flush left, a compass star as the divider, and the World AI Week mark it
 * sails under. The navbar carries the Odyssea mark on its own.
 *
 * The divider and the World AI Week mark are centred against the FULL height
 * of the Odyssea stack — medallion and lettering together — so the three read
 * as one row rather than as a tall mark with two small things hung off it.
 */
function BrandLockup({ size = "lg", className = "" }) {
  return (
    <span className={`flex flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-6 lg:gap-7 ${className}`}>
      <Brand size={size} variant="stack" />

      <Image
        src={compass}
        alt=""
        aria-hidden="true"
        className="w-5 shrink-0 select-none opacity-95 sm:w-6 lg:w-7"
      />

      <Image
        src={aiWeek}
        alt="World AI Week 2026"
        className="h-12 w-auto shrink-0 select-none sm:h-14 lg:h-[4.5rem]"
      />
    </span>
  );
}

export default React.memo(BrandLockup);
