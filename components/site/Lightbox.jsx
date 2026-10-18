"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/motion/gsap";

export default function Lightbox({ items, index, onClose, onIndex }) {
  const root = useRef(null);
  const open = index !== null && index !== undefined;

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const prevFocus = document.activeElement;
    root.current?.querySelector("button")?.focus();
    if (!prefersReducedMotion()) {
      gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    }
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      prevFocus?.focus?.();
    };
  }, [open, index, items.length, onClose, onIndex]);

  useEffect(() => {
    if (!open || prefersReducedMotion()) return;
    gsap.fromTo(root.current.querySelector("[data-lb-img]"), { scale: 0.92, opacity: 0, rotate: -1.5 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "expo.out" });
  }, [open, index]);

  if (!open) return null;
  const item = items[index];

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={item.alt} className="fixed inset-0 z-[150] flex items-center justify-center bg-[#0a001a]/90 p-4 backdrop-blur-xl" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:right-8 md:top-8">
        <X className="h-5 w-5" />
      </button>
      <button type="button" onClick={() => onIndex((index - 1 + items.length) % items.length)} aria-label="Previous photo" className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:left-8">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button type="button" onClick={() => onIndex((index + 1) % items.length)} aria-label="Next photo" className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:right-8">
        <ChevronRight className="h-6 w-6" />
      </button>
      <figure data-lb-img className="relative flex max-h-[86vh] w-full max-w-5xl flex-col items-center">
        <div className="relative h-[72vh] w-full">
          <Image src={item.src} alt={item.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <figcaption className="mt-4 text-center text-white/80">
          <span className="font-futura_bold text-white">{item.title}</span>
          <span className="mx-2 text-white/30">·</span>
          {index + 1} / {items.length}
        </figcaption>
      </figure>
    </div>
  );
}
