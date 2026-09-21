import React from "react";
import Image from "next/image";
import compass from "@/assets/images/odyssea/compass.webp";
/**
 * Solid rule — compass star — solid rule. `width` lets a section stretch the
 * rules out to the exact edges of the heading underneath it.
 */
function CompassDivider({
  className = "",
  tone = "gold",
  star = "w-9 sm:w-11",
  width = "w-14 sm:w-40",
}) {
  const line = tone === "gold" ? "bg-ody-title" : "bg-ody-ink/55";

  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 ${className}`}>
      <span className={`h-px ${width} ${line}`} />
      <Image
        src={compass}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`${star} shrink-0 select-none`}
      />
      <span className={`h-px ${width} ${line}`} />
    </div>
  );
}

export default React.memo(CompassDivider);
