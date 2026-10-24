"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import logo from "@/assets/images/shared/logo_hd.png";

export const STEPS = ["Email", "Personal", "Academic", "Departments", "Experience"];

/**
 * Frame of the membership form, in the spirit of the original page:
 * team background, the outlined "Join Skill&Tell" title, a progress track and a glass card.
 */
export default function RegisterShell({ step, done = false, wide = false, children }) {
  const current = done ? STEPS.length : step;
  return (
    <div className="snt relative min-h-[100svh] overflow-hidden bg-space-dark text-white">
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/Team_Section.webp" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,transparent,rgba(10,0,26,0.55))]" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 md:px-10">
        <Link href="/" aria-label="Skill & Tell , home">
          <Image src={logo} alt="Skill & Tell Scientific Club" priority sizes="140px" className="h-10 w-auto md:h-12" />
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-Main-500 px-4 py-2 text-sm text-white/80 transition-colors hover:border-accent-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-[920px] px-4 pb-16 pt-2 md:px-6">
        <div className="text-center">
          <h1 className="grad-title inline-block p-2 text-4xl font-bold md:text-6xl">Join Skill&amp;Tell</h1>
        </div>

        {/* Progress: a track with the five steps */}
        <ol className="mx-auto mt-6 flex max-w-2xl items-center" aria-label="Registration progress">
          {STEPS.map((label, i) => {
            const state = i < current ? "done" : i === current ? "current" : "next";
            return (
              <li key={label} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`} aria-current={state === "current" ? "step" : undefined}>
                <span className="relative flex flex-col items-center">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full border text-sm font-futura_bold transition-all duration-500 ${
                      state === "done"
                        ? "border-accent-500 bg-accent-500 text-white"
                        : state === "current"
                          ? "border-accent-400 bg-Main-700 text-white shadow-[0_0_0_5px_rgba(255,109,0,0.18)]"
                          : "border-Main-500 bg-Main-700/80 text-white/45"
                    }`}
                  >
                    {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className={`absolute top-11 hidden whitespace-nowrap text-xs sm:block ${state === "next" ? "text-white/40" : "text-white/85"}`}>{label}</span>
                </span>
                {i < STEPS.length - 1 && (
                  <span className="mx-1.5 h-[3px] flex-1 overflow-hidden rounded-full bg-Main-600 sm:mx-2">
                    <span className="block h-full origin-left bg-accent-500 transition-transform duration-700" style={{ transform: `scaleX(${i < current ? 1 : 0})` }} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-white/55 sm:hidden">
          {done ? "Done" : `Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
        </p>

        <div className={`glass relative mx-auto mt-12 w-full p-6 sm:p-8 md:p-10 ${wide ? "max-w-4xl" : "max-w-xl"}`}>{children}</div>
      </main>
    </div>
  );
}
