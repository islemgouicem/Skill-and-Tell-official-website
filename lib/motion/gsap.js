"use client";
// Single place where GSAP plugins are registered for the main site.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, Flip, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * "Stage gate": how long page-entrance animations should wait so they play
 * after the intro loader or the page-transition curtain has lifted.
 */
export const stage = { delay: 0 };
export const consumeStageDelay = () => {
  const d = stage.delay;
  stage.delay = 0;
  return d;
};

/**
 * SplitText wraps letters/words in their own boxes, which breaks
 * background-clip:text gradients. Re-paint each piece with the parent's
 * gradient, offset so the gradient stays continuous across the word.
 */
export function paintGradients(scopeEl) {
  if (!scopeEl) return;
  scopeEl.querySelectorAll(".gradient-text, .gradient-text-warm").forEach((g) => {
    const pieces = g.querySelectorAll("div");
    if (!pieces.length) return;
    const cs = getComputedStyle(g);
    const pr = g.getBoundingClientRect();
    pieces.forEach((piece) => {
      if (piece.querySelector("div")) return; // only leaves
      const r = piece.getBoundingClientRect();
      Object.assign(piece.style, {
        backgroundImage: cs.backgroundImage,
        backgroundSize: `${pr.width}px ${pr.height}px`,
        backgroundPosition: `${pr.left - r.left}px ${pr.top - r.top}px`,
        backgroundRepeat: "no-repeat",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
      });
    });
  });
}

export { gsap, ScrollTrigger, SplitText, MotionPathPlugin, Flip, useGSAP };
