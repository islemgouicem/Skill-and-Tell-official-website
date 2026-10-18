"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import Magnetic from "@/components/motion/Magnetic";

export default function DepartmentTest() {
  const root = useRef(null);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray("[data-float]").forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 16 : -16, rotate: i % 2 ? 4 : -4, duration: 3 + i * 0.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.fromTo(el, { yPercent: 40 * (i + 1) }, {
          yPercent: -40 * (i + 1), ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
      // The underline under "You" draws itself.
      gsap.fromTo("[data-underline]", { strokeDashoffset: 120 }, {
        strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut",
        scrollTrigger: { trigger: "[data-underline]", start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative flex min-h-[90svh] items-center overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#12101f] to-[#0f0a15]" />
      <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#F472B6]/10 blur-[100px]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div data-float className="absolute left-[5%] top-[12%] font-mono text-[10px] md:text-xs">
          <div className="rounded-lg border border-[#2DD4A8]/30 bg-[#1a1a2e]/80 p-3 shadow-[0_0_20px_rgba(45,212,168,0.15)] backdrop-blur-sm">
            <div className="mb-2 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
              <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
              <span className="h-2 w-2 rounded-full bg-[#28CA41]" />
            </div>
            <code className="text-[#2DD4A8]">const</code>
            <code className="text-white"> you </code>
            <code className="text-[#F472B6]">=</code>
            <code className="text-[#FBBF24]"> &quot;developer&quot;</code>
            <code className="text-gray-500">;</code>
          </div>
        </div>
        <div data-float className="absolute bottom-[10%] left-[6%]">
          <div className="flex rotate-[-8deg] items-end gap-1">
            <div className="h-16 w-8 rounded-t-full bg-[#F472B6] md:h-20 md:w-10" />
            <div className="h-14 w-8 rounded-t-full bg-[#A78BFA] md:h-[72px] md:w-10" />
            <div className="h-12 w-8 rounded-t-full bg-[#60A5FA] md:h-16 md:w-10" />
            <div className="h-10 w-8 rounded-t-full bg-[#2DD4A8] md:h-14 md:w-10" />
          </div>
        </div>
        <div data-float className="absolute right-[8%] top-[58%]">
          <svg className="h-12 w-12 md:h-16 md:w-16" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#FB923C" strokeWidth="2" opacity="0.3" />
            <circle cx="32" cy="32" r="20" fill="none" stroke="#FB923C" strokeWidth="2" opacity="0.5" />
            <circle cx="32" cy="32" r="12" fill="none" stroke="#FB923C" strokeWidth="2" opacity="0.7" />
            <circle cx="32" cy="32" r="4" fill="#FB923C" />
            <line x1="48" y1="16" x2="36" y2="28" stroke="#FB923C" strokeWidth="2" />
            <polygon points="50,12 52,20 44,18" fill="#FB923C" />
          </svg>
        </div>
        <div data-float className="absolute right-[12%] top-[14%] hidden md:block">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur">
            📣 &nbsp;Marketing? &nbsp;🎬 &nbsp;Production? &nbsp;🤝 &nbsp;Relex?
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <span data-reveal="fade" className="snt-eyebrow justify-center">By Skill&amp;Tell</span>
        <h2 data-reveal="up" className="snt-h2 mt-6 text-white">
          Where do{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#FBBF24] bg-clip-text text-transparent">you</span>
            <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
              <path data-underline d="M0 8 Q25 0 50 8 Q75 12 100 6" stroke="url(#dept-underline)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="120" />
              <defs>
                <linearGradient id="dept-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A78BFA" />
                  <stop offset="50%" stopColor="#F472B6" />
                  <stop offset="100%" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          belong?
        </h2>
        <p data-reveal="up" className="snt-lead mx-auto mt-8 max-w-lg text-gray-400">
          Discover your ideal department through our personality-based assessment.
        </p>
        <div data-reveal="up" className="mt-10">
          <Magnetic>
            <a href="https://departments-test.vercel.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-xl border-2 border-[#8B5CF6] bg-[#8B5CF6]/10 px-8 py-4 font-futura_md_bt text-lg text-white transition-all duration-300 hover:bg-[#8B5CF6] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]">
              Take the Test
              <ArrowUpRight className="h-5 w-5 text-[#A78BFA] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </Magnetic>
        </div>
        <div data-reveal="fade" className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#2DD4A8]" />6 Departments</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#F472B6]" />~3 min</span>
          <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#FBBF24]" />Instant match</span>
        </div>
      </div>
    </section>
  );
}
