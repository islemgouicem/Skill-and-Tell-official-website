import React from "react";
import compass from "../../../assets/images/odyssea/compass.webp";
import Display from "./Display";

/**
 * Compass rule over a display heading. The wrapper is width-fit, so the two
 * solid rules always stretch to exactly where the heading starts and ends —
 * whatever the heading says.
 */
function SectionTitle({ children, className = "" }) {
  return (
    <div className={`mx-auto grid w-fit max-w-full justify-items-stretch ${className}`}>
      <div className="flex items-center gap-4 sm:gap-7">
        <span className="h-[2px] flex-1 bg-ody-title" />
        <img
          src={compass}
          alt=""
          aria-hidden="true"
          className="w-10 shrink-0 select-none sm:w-14 lg:w-16"
        />
        <span className="h-[2px] flex-1 bg-ody-title" />
      </div>

      <h2 className="ody-display ody-weighted mt-3 text-center text-[clamp(2rem,9vw,8.15rem)] leading-[0.92] text-ody-ink sm:mt-4">
        <Display>{children}</Display>
      </h2>
    </div>
  );
}

export default React.memo(SectionTitle);
