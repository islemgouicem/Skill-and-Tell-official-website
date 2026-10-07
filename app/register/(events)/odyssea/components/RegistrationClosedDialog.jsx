"use client";

import { AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export default function RegistrationClosedDialog({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-ody-night-deep/85 px-5 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-closed-title"
        className="relative w-full max-w-md overflow-hidden border border-ody-gold/60 bg-ody-night px-7 py-9 text-center shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:px-10"
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-ody-gold" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close registration notice"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-ody-gold/40 text-ody-gold transition hover:bg-ody-gold hover:text-ody-night"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border border-ody-gold/70 bg-ody-gold/10 text-ody-title shadow-[0_0_28px_rgba(188,147,54,0.2)]">
          <AlertCircle className="h-8 w-8" />
        </div>
        <p className="ody-display text-xl tracking-[0.18em] text-ody-gold">Odyssea</p>
        <h2 id="registration-closed-title" className="ody-display mt-1 text-4xl text-ody-title sm:text-5xl">
          Registration closed
        </h2>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-ody-parchment/80 sm:text-base">
          Registration for this journey has ended. Thank you for your interest in Odyssea.
        </p>
        <div aria-hidden="true" className="mx-auto mt-7 flex w-24 items-center justify-center gap-2 text-ody-gold">
          <span className="h-px flex-1 bg-ody-gold/50" />
          <span className="h-1.5 w-1.5 rotate-45 bg-ody-title" />
          <span className="h-px flex-1 bg-ody-gold/50" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ody-display mt-7 border border-ody-gold px-8 py-2.5 text-xl text-ody-title transition hover:bg-ody-gold hover:text-ody-night"
        >
          Understood
        </button>
      </section>
    </div>
  );
}