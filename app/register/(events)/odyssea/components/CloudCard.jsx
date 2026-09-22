import React from "react";
import Display from "./Display";
import Image from "next/image";
import cloud from "@/assets/images/odyssea/cloud.webp";

/**
 * One stop of the voyage, drawn inside the hand-inked cloud: the hour and
 * what happens, nothing more. Type is sized in container units so the card
 * stays pixel-perfect at every breakpoint, and `flip` mirrors the cloud so
 * its tail points right.
 *
 * The caption sits on the cloud's dense body — measured from the artwork at
 * 19%–86% across and centred a little above the middle — rather than on the
 * image box, which the tail throws off.
 */
function CloudCard({ time, title, flip = false, className = "", style }) {
  /* a range ("09:00 - 10:30") is about two and a half times the width of a bare
     hour, and the caption well is only 66% of the cloud, so the hour is sized
     from its own length rather than fixed — short times keep the size they had */
  const timeSize = time.length > 7 ? "7.4cqw" : "8.4cqw";

  return (
    <figure
      className={`ody-cloud-card @container relative select-none ${className}`}
      style={style}
    >
      <Image
        src={cloud}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`ody-cloud-img block w-full ${flip ? "-scale-x-100" : ""}`}
      />

      <figcaption
        className="absolute flex flex-col items-center justify-center text-center"
        style={{
          top: "8%",
          bottom: "18%",
          left: flip ? "14.5%" : "19.5%",
          width: "66%",
        }}
      >
        <span
          className="ody-display ody-keep-case ody-cloud-ink whitespace-nowrap leading-none text-ody-title"
          style={{ fontSize: timeSize }}
        >
          {time}
        </span>
        <span className="ody-display ody-cloud-ink mt-[2.4cqw] max-w-full text-[5.6cqw] leading-[1.05] tracking-[0.06em] text-ody-parchment">
          <Display>{title}</Display>
        </span>
      </figcaption>
    </figure>
  );
}

export default React.memo(CloudCard);
