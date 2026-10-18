"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";

/**
 * Infinite marquee whose speed (and direction) reacts to scroll velocity.
 * Children are rendered twice to loop seamlessly.
 */
export default function Marquee({ children, speed = 40, reverse = false, className = "", itemClassName = "", pauseOnHover = false }) {
  const root = useRef(null);
  const track = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = track.current;
      const half = el.scrollWidth / 2;
      const dir = reverse ? 1 : -1;
      let x = reverse ? -half : 0;
      let boost = 0;
      const wrap = gsap.utils.wrap(-half, 0);

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = gsap.utils.clamp(-14, 14, self.getVelocity() / 150);
        },
      });
      let paused = false;
      const tick = (_, dt) => {
        if (paused) return;
        const delta = (dt / 1000) * speed * dir * (1 + Math.abs(boost)) * (boost < -1 ? -1 : 1);
        x = wrap(x + delta);
        boost *= 0.92;
        gsap.set(el, { x });
      };
      gsap.ticker.add(tick);
      const enter = () => (paused = pauseOnHover);
      const leave = () => (paused = false);
      root.current.addEventListener("pointerenter", enter);
      root.current.addEventListener("pointerleave", leave);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root }
  );

  return (
    <div ref={root} className={`relative overflow-hidden ${className}`}>
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((k) => (
          <div key={k} className={`flex shrink-0 items-center ${itemClassName}`} aria-hidden={k === 1 ? "true" : undefined}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
