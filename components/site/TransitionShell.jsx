"use client";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/shared/logo.png";
import { gsap, ScrollTrigger, prefersReducedMotion, stage } from "@/lib/motion/gsap";
import { useLenis } from "./SmoothScroll";

const TransitionContext = createContext({ navigate: () => {} });
export const usePageTransition = () => useContext(TransitionContext);

const PANELS = 5;

const LABELS = {
  "/": "Home",
  "/team": "Our Team",
  "/events": "Events",
  "/missions": "Missions",
  "/partner": "Partner with us",
};

export default function TransitionShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const overlayRef = useRef(null);
  const labelRef = useRef(null);
  const busy = useRef(false);
  const safety = useRef(null);

  const scrollToHash = useCallback(
    (hash) => {
      const el = hash && document.querySelector(hash);
      if (!el) return false;
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
      return true;
    },
    [lenis]
  );

  const reveal = useCallback(() => {
    clearTimeout(safety.current);
    const overlay = overlayRef.current;
    if (!overlay) return;
    const panels = overlay.querySelectorAll("[data-panel]");
    stage.delay = 0.35;
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden" });
          gsap.set(panels, { yPercent: 101 });
          busy.current = false;
        },
      })
      .to(overlay.querySelectorAll("[data-curtain-content] > *"), {
        y: -24,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      })
      .to(panels, {
        yPercent: -101,
        duration: 0.7,
        ease: "power4.inOut",
        stagger: { each: 0.05, from: "edges" },
      }, "-=0.05");
  }, []);

  const navigate = useCallback(
    (href) => {
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) {
        window.location.href = href;
        return;
      }
      if (url.pathname === window.location.pathname) {
        if (!scrollToHash(url.hash)) {
          if (lenis) lenis.scrollTo(0);
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }
      if (busy.current) return;
      const target = url.pathname + url.search + url.hash;

      // Registration flows have their own layouts: plain navigation.
      if (prefersReducedMotion() || !url.pathname.match(/^\/(team|events|missions|partner)?\/?$/)) {
        router.push(target);
        return;
      }

      busy.current = true;
      const overlay = overlayRef.current;
      const panels = overlay.querySelectorAll("[data-panel]");
      if (labelRef.current) labelRef.current.textContent = LABELS[url.pathname.replace(/\/$/, "") || "/"] ?? "";
      lenis?.stop();
      router.prefetch?.(target);

      gsap.set(overlay, { visibility: "visible" });
      gsap
        .timeline({
          onComplete: () => {
            router.push(target);
            // Never leave the curtain down if navigation stalls.
            safety.current = setTimeout(() => reveal(), 4000);
          },
        })
        .fromTo(
          panels,
          { yPercent: 101 },
          { yPercent: 0, duration: 0.6, ease: "power4.inOut", stagger: { each: 0.05, from: "center" } }
        )
        .fromTo(
          overlay.querySelectorAll("[data-curtain-content] > *"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power3.out" },
          "-=0.25"
        );
    },
    [lenis, router, scrollToHash, reveal]
  );


  useEffect(() => {
    gsap.set(overlayRef.current.querySelectorAll("[data-panel]"), { yPercent: 101 });
  }, []);

  // Route committed → jump to top, recompute triggers, lift the curtain.
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 600);
    } else {
      lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }
    lenis?.start();
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (busy.current) reveal();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        <div className="absolute inset-0 flex">
          {Array.from({ length: PANELS }).map((_, i) => (
            <div
              key={i}
              data-panel
              className="h-full flex-1 -mx-px"
              style={{
                background:
                  i % 2
                    ? "linear-gradient(180deg,#1a0132 0%,#3c096c 100%)"
                    : "linear-gradient(180deg,#0a001a 0%,#2b004d 100%)",
              }}
            />
          ))}
        </div>
        <div data-curtain-content className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <Image src={logo} alt="" width={150} height={90} className="w-[120px] md:w-[150px] h-auto opacity-0" />
          <span ref={labelRef} className="font-futura_bold text-3xl md:text-5xl text-white opacity-0" />
          <span className="block h-[3px] w-28 rounded-full bg-gradient-to-r from-accent-500 to-Main-400 opacity-0" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
}
