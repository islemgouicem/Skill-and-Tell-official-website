import React from "react";
import Display from "../../../components/Display";

/** Compact progress rail: leader -> members -> motivation. */
function StepRail({ labels, current }) {
  return (
    <div className="mb-7 flex items-center gap-2.5 lg:mb-9 lg:gap-4">
      {labels.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <div key={label} className="flex flex-1 flex-col gap-1.5" title={label}>
            <span
              className={`h-[3px] w-full rounded-full transition-all duration-500 lg:h-[4px] ${
                active
                  ? "bg-[linear-gradient(135deg,#123e51_0%,#195469_100%)]"
                  : done
                    ? "bg-ody-gold"
                    : "bg-ody-ink/15"
              }`}
            />
            <span
              className={`ody-display hidden text-[0.85rem] tracking-[0.1em] transition-colors sm:block lg:text-[1rem] ${
                active ? "text-ody-ink" : done ? "text-ody-gold-deep" : "text-ody-ink/40"
              }`}
            >
              <Display>{label}</Display>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(StepRail);
