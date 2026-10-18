"use client";
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion, paintGradients } from "@/lib/motion/gsap";

/**
 * Declarative scroll reveals inside a scope.
 *  data-reveal="up|fade|scale|left|right|clip"  (+ data-delay="0.2")
 *  data-reveal-stagger  → reveals its direct children in sequence
 *  data-split="lines|words|chars"               → masked text reveal
 *  data-parallax="-0.2"                         → scrubbed y-parallax (fraction of height)
 */
export function useReveals(scope, deps = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const reduced = prefersReducedMotion();
      // Nested scopes (e.g. a section component inside a page) handle their own reveals.
      root.setAttribute("data-reveal-scope", "");
      const own = (sel) => [...root.querySelectorAll(sel)].filter((el) => el.closest("[data-reveal-scope]") === root);

      const from = {
        up: { y: 60, opacity: 0 },
        fade: { opacity: 0 },
        scale: { scale: 0.88, opacity: 0 },
        left: { x: -80, opacity: 0 },
        right: { x: 80, opacity: 0 },
        clip: { clipPath: "inset(100% 0% 0% 0%)" },
      };

      own("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        if (reduced) return gsap.set(el, { clearProps: "all", opacity: 1 });
        const to = { y: 0, x: 0, scale: 1, opacity: 1, clipPath: "inset(0% 0% 0% 0%)" };
        gsap.fromTo(el, from[type] ?? from.up, {
          ...to,
          duration: type === "clip" ? 1.3 : 1.1,
          ease: type === "clip" ? "expo.inOut" : "power3.out",
          delay: parseFloat(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      own("[data-reveal-stagger]").forEach((group) => {
        const items = group.children;
        if (reduced) return gsap.set(items, { opacity: 1 });
        gsap.fromTo(items, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      own("[data-split]").forEach((el) => {
        if (reduced) return gsap.set(el, { opacity: 1 });
        const type = el.dataset.split || "lines";
        const split = SplitText.create(el, {
          type: type === "chars" ? "words,chars" : type === "words" ? "words" : "lines",
          mask: type === "chars" ? "words" : type,
          linesClass: "split-line",
          autoSplit: type === "lines",
          onSplit(self) {
            const targets = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
            gsap.set(el, { opacity: 1 });
            paintGradients(el);
            return gsap.from(targets, {
              yPercent: 115,
              rotate: type === "lines" ? 0 : 6,
              duration: 1.1,
              stagger: type === "chars" ? 0.025 : 0.08,
              ease: "power4.out",
              delay: parseFloat(el.dataset.delay || 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          },
        });
        return () => split.revert();
      });

      if (!reduced) {
        own("[data-parallax]").forEach((el) => {
          const amt = parseFloat(el.dataset.parallax || -0.2);
          gsap.fromTo(el, { yPercent: -amt * 50 }, {
            yPercent: amt * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }

      ScrollTrigger.refresh();
    },
    { scope, dependencies: deps }
  );
}
