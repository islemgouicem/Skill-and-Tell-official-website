"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";

export default function Counter({ value, suffix = "", duration = 2, className = "" }) {
  const ref = useRef(null);
  useGSAP(() => {
    const el = ref.current;
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const obj = { n: 0 };
    gsap.to(obj, {
      n: value,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => (el.textContent = `${Math.round(obj.n)}${suffix}`),
    });
  });
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      0{suffix}
    </span>
  );
}
