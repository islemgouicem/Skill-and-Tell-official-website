import React from "react";
import cloud from "../../../assets/images/odyssea/cloud.webp";

/**
 * One stop of the voyage, drawn inside the hand-inked cloud.
 * Type is sized in container units so the card stays pixel-perfect at
 * every breakpoint. `flip` mirrors the cloud so its tail points right.
 */
function CloudCard({ time, title, copy, flip = false, className = "", style }) {
  return (
    <figure
      className={`ody-cloud-card @container relative select-none ${className}`}
      style={style}
    >
      <img
        src={cloud}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`ody-cloud-img block w-full ${flip ? "-scale-x-100" : ""}`}
      />

      <figcaption
        className="absolute flex flex-col items-center justify-center text-center"
        style={{
          top: "4%",
          bottom: "14%",
          left: flip ? "7%" : "17%",
          width: "76%",
        }}
      >
        <span className="ody-display text-[6.9cqw] leading-none text-ody-gold drop-shadow-[0_2px_3px_rgba(1,27,42,0.95)]">
          {time}
        </span>
        <span className="mt-[1.4cqw] text-[4.05cqw] font-semibold uppercase leading-tight tracking-[0.06em] text-ody-white [text-shadow:0_1px_3px_rgba(1,27,42,0.95)]">
          {title}
        </span>
        <span className="mt-[0.7cqw] max-w-[97%] text-[3.05cqw] font-light leading-[1.35] text-ody-white/85 [text-shadow:0_1px_3px_rgba(1,27,42,0.95)]">
          {copy}
        </span>
      </figcaption>
    </figure>
  );
}

export default React.memo(CloudCard);
