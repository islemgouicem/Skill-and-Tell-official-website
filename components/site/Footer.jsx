"use client";
import { useRef } from "react";
import Image from "next/image";
import { Heart, ArrowUpRight, ArrowUp } from "lucide-react";
import logoDark from "@/assets/images/shared/logo_dark.png";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import TLink from "./TLink";
import Magnetic from "@/components/motion/Magnetic";
import { NAV_LINKS, SOCIALS, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PLACE } from "@/data/skillntell/site";

const MORE = [
  { name: "Register", href: "/register" },
  { name: "Who are we?", href: "/#about" },
  { name: "S&T App", href: "/#app" },
  { name: "F&Q", href: "/#FQ" },
  { name: "Department test", href: "https://departments-test.vercel.app/", external: true },
];

export default function Footer() {
  const root = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-wordmark-fill]",
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: "[data-wordmark]", start: "top bottom", end: "bottom 85%", scrub: 0.6 },
        }
      );
      gsap.from("[data-foot-col]", {
        y: 40, opacity: 0, stagger: 0.08, duration: 0.9,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  const toTop = () => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer id="contacts" ref={root} className="relative overflow-hidden bg-footer-background text-footer-text">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-Main-300/30 blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10 pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div data-foot-col className="md:col-span-5 space-y-6">
            <Image src={logoDark} alt="Skill & Tell Scientific Club" width={180} height={108} className="h-auto w-40" />
            <p className="max-w-sm text-footer-text/75 leading-relaxed">
              A community of learners and innovators. Together we share skills, ideas, and growth.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="group inline-flex items-center gap-2 font-futura_bold text-xl md:text-2xl text-footer-text">
              <span className="relative">
                {CONTACT_EMAIL}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-accent-500 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>

          <div data-foot-col className="md:col-span-2">
            <h3 className="mb-5 font-futura_md_bt text-xs uppercase tracking-[0.25em] text-footer-link">Explore</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <TLink href={l.href} className="snt-link text-footer-text/85 hover:text-footer-text">{l.name}</TLink>
                </li>
              ))}
            </ul>
          </div>

          <div data-foot-col className="md:col-span-2">
            <h3 className="mb-5 font-futura_md_bt text-xs uppercase tracking-[0.25em] text-footer-link">More</h3>
            <ul className="space-y-3">
              {MORE.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="snt-link text-footer-text/85 hover:text-footer-text">{l.name}</a>
                  ) : (
                    <TLink href={l.href} className="snt-link text-footer-text/85 hover:text-footer-text">{l.name}</TLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div data-foot-col className="md:col-span-3 space-y-3">
            <h3 className="mb-5 font-futura_md_bt text-xs uppercase tracking-[0.25em] text-footer-link">Connect</h3>
            {SOCIALS.map((s) =>
              s.href ? (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="socialm w-full justify-between group">
                  <span className="flex items-center gap-3">
                    <img src={s.icon} className="h-5 w-5" alt="" />
                    <span className="font-medium text-neutral-500">{s.name}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ) : (
                <span key={s.name} className="socialm w-full justify-between opacity-60 cursor-not-allowed">
                  <span className="flex items-center gap-3">
                    <img src={s.icon} className="h-5 w-5" alt="" />
                    <span className="font-medium text-neutral-500">{s.name}</span>
                  </span>
                  <span className="text-xs text-neutral-400">{s.note}</span>
                </span>
              )
            )}
            <p className="pt-2 text-sm text-footer-text/70">
              <a href={CONTACT_PHONE.href} className="hover:underline">{CONTACT_PHONE.label}</a> · {CONTACT_PLACE}
            </p>
          </div>
        </div>

        <div data-wordmark className="relative mt-20 select-none" aria-hidden="true">
          <div className="font-futura_bold leading-[0.8] tracking-[-0.03em] text-[18.4vw] xl:text-[16.4rem] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgba(51,0,102,0.18)]">
            Skill&amp;Tell
          </div>
          <div data-wordmark-fill className="absolute inset-0 font-futura_bold leading-[0.8] tracking-[-0.03em] text-[18.4vw] xl:text-[16.4rem] whitespace-nowrap gradient-text">
            Skill&amp;Tell
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-footer-text/15 py-6 text-sm text-footer-text/60 md:flex-row">
          <span className="flex items-center gap-2">
            © Skill &amp; Tell {new Date().getFullYear()}. All rights reserved. Crafted with
            <Heart className="h-4 w-4 animate-pulse fill-red-500 text-red-500" />
          </span>
          <Magnetic strength={0.3}>
            <button type="button" onClick={toTop} className="group flex items-center gap-2 rounded-full border border-footer-text/20 px-4 py-2 text-footer-text/80 transition-colors hover:bg-footer-text hover:text-white">
              Back to top <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
