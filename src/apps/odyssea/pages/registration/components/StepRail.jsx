import React from "react";

/** Compact progress rail: leader -> members -> motivation. */
function StepRail({ labels, current }) {
  return (
    <div className="mb-7 flex items-center gap-2.5">
      {labels.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <div key={label} className="flex flex-1 flex-col gap-1.5" title={label}>
            <span
              className={`h-[3px] w-full rounded-full transition-all duration-500 ${
                active
                  ? "bg-ody-night"
                  : done
                    ? "bg-ody-gold-deep"
                    : "bg-ody-ink/18"
              }`}
            />
            <span
              className={`hidden text-[0.62rem] uppercase tracking-[0.14em] transition-colors sm:block ${
                active ? "text-ody-ink" : "text-ody-ink/40"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(StepRail);
