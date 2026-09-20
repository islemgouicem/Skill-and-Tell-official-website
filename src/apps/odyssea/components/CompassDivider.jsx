import React from "react";
import compass from "../../../assets/images/odyssea/compass.webp";

/**
 * Thin rule — compass star — thin rule. Used above every section title
 * and at the bottom of the footer, exactly as in the Figma frames.
 */
function CompassDivider({ className = "", tone = "gold", star = "w-9 sm:w-11" }) {
  const line =
    tone === "gold"
      ? "bg-gradient-to-r from-transparent via-ody-gold-deep to-ody-gold-deep"
      : "bg-gradient-to-r from-transparent via-ody-ink/45 to-ody-ink/45";

  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 ${className}`}>
      <span className={`h-px w-14 sm:w-40 ${line}`} />
      <img
        src={compass}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`${star} shrink-0 select-none`}
      />
      <span className={`h-px w-14 sm:w-40 ${line} rotate-180`} />
    </div>
  );
}

export default React.memo(CompassDivider);
