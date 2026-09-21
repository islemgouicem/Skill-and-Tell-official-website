import React from "react";
import compass from "../../../assets/images/odyssea/compass.webp";

/** Renders one set of marks from `sparkle_marks.js`. */

function Sparkles({ marks, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`ody-sparks pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {marks.map(([left, top, size, opacity]) => (
        <img
          key={`${left}-${top}-${size}`}
          src={compass}
          alt=""
          loading="lazy"
          className="absolute -translate-x-1/2 -translate-y-1/2 select-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `calc(${size}px * var(--ody-spark-scale, 1))`,
            opacity,
            filter: `drop-shadow(0 0 ${Math.round(size * 0.5)}px rgba(253, 204, 70, 0.55))`,
          }}
        />
      ))}
    </div>
  );
}

export default React.memo(Sparkles);
