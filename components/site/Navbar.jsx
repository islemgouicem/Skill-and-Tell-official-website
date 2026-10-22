"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/shared/logo_hd.png";
import { gsap, prefersReducedMotion } from "@/lib/motion/gsap";
import TLink from "./TLink";
import Magnetic from "@/components/motion/Magnetic";
import { NAV_LINKS, SOCIALS, CONTACT_EMAIL } from "@/data/skillntell/site";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const menuRef = useRef(null);
  const menuTl = useRef(null);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const goingDown = y > last && y > 160;
      if (goingDown !== hidden && !open) {
        hidden = goingDown;
        gsap.to(headerRef.current, { yPercent: hidden ? -120 : 0, duration: 0.5, ease: "power3.out" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Sliding pill that follows the active / hovered link.
  const movePill = (el, instant = false) => {
    const pill = pillRef.current;
    if (!pill || !navRef.current) return;
    if (!el) {
      gsap.to(pill, { opacity: 0, duration: 0.25 });
      return;
    }
    const nav = navRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    gsap.to(pill, {
      x: r.left - nav.left,
      width: r.width,
      opacity: 1,
      duration: instant ? 0 : 0.45,
      ease: "power3.out",
    });
  };
  const resetPill = (instant) => movePill(navRef.current?.querySelector('[data-active="true"]'), instant);

  useIsoLayoutEffect(() => {
    resetPill(true);
    const onResize = () => resetPill(true);
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(() => resetPill(true));
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);

  // Full-screen mobile menu.
  useIsoLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const ctx = gsap.context(() => {
      gsap.set(menu, { autoAlpha: 0 });
      menuTl.current = gsap
        .timeline({ paused: true })
        .set(menu, { autoAlpha: 1 })
        .fromTo(menu, { clipPath: "circle(0% at calc(100% - 44px) 40px)" }, {
          clipPath: "circle(150% at calc(100% - 44px) 40px)",
          duration: prefersReducedMotion() ? 0 : 0.8,
          ease: "power4.inOut",
        })
        .fromTo("[data-menu-link]", { yPercent: 110, rotate: 4 }, {
          yPercent: 0, rotate: 0, stagger: 0.06, duration: 0.7, ease: "power4.out",
        }, "-=0.35")
        .fromTo("[data-menu-foot]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 }, "-=0.4");
    }, menu);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuTl.current) return;
    if (open) {
      menuTl.current.timeScale(1).play();
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      menuTl.current.timeScale(1.6).reverse();
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[120] px-3 pt-3 md:px-6 md:pt-4">
        <div
          className={`mx-auto flex h-[72px] md:h-20 max-w-[1400px] items-center justify-between rounded-2xl px-3 md:px-5 transition-[background,border-color,box-shadow] duration-500 border ${
            scrolled || open
              ? "border-white/10 bg-[#12002a]/70 shadow-[0_10px_40px_-10px_rgba(10,0,26,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <TLink href="/" aria-label="Skill & Tell — home" className="relative z-[2] flex items-center">
            <Image src={logo} alt="Skill & Tell Scientific Club" width={460} height={210} priority sizes="160px" className="h-12 md:h-[60px] w-auto" />
          </TLink>

          <nav
            ref={navRef}
            aria-label="Main"
            className="relative hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
            onMouseLeave={() => resetPill()}
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 rounded-full bg-gradient-to-r from-Main-500/80 to-Main-400/60 shadow-[0_0_24px_rgba(157,78,221,0.45)] opacity-0"
              style={{ width: 0 }}
            />
            {NAV_LINKS.map((l) => (
              <TLink
                key={l.href}
                href={l.href}
                data-active={isActive(l.href) ? "true" : "false"}
                aria-current={isActive(l.href) ? "page" : undefined}
                onMouseEnter={(e) => movePill(e.currentTarget)}
                onFocus={(e) => movePill(e.currentTarget)}
                className="relative z-[1] rounded-full px-5 py-2 font-futura_md_bt text-[15px] text-white/80 transition-colors hover:text-white aria-[current=page]:text-white"
              >
                {l.name}
              </TLink>
            ))}
          </nav>

          <div className="relative z-[2] flex items-center gap-2">
            <Magnetic strength={0.35} className="hidden sm:block">
              <TLink href="/register" className="snt-btn snt-btn--primary !py-2.5 !px-5 text-[15px]">
                Join us
              </TLink>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="snt-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-[2px] w-5 rounded bg-white transition-transform duration-500 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-0 h-[2px] w-5 rounded bg-white transition-transform duration-500 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="snt-mobile-menu"
        ref={menuRef}
        className="fixed inset-0 z-[110] lg:hidden overflow-hidden bg-[#0a001a]"
        style={{ visibility: "hidden" }}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 50% at 80% 10%, rgba(123,44,191,0.55), transparent 70%), radial-gradient(50% 40% at 10% 90%, rgba(255,109,0,0.25), transparent 70%)" }} />
        <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {[...NAV_LINKS, { name: "Join us", href: "/register" }].map((l, i) => (
              <div key={l.href} className="overflow-hidden">
                <TLink
                  data-menu-link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-baseline gap-4 py-1 font-futura_bold text-[13vw] sm:text-7xl leading-[1.05] ${
                    isActive(l.href) ? "gradient-text" : "text-white"
                  }`}
                >
                  <span className="font-futura_md_bt text-sm text-Main-300">0{i + 1}</span>
                  {l.name}
                </TLink>
              </div>
            ))}
          </nav>
          <div className="flex flex-col gap-4">
            <a data-menu-foot href={`mailto:${CONTACT_EMAIL}`} tabIndex={open ? 0 : -1} className="text-white/70 underline-offset-4 hover:underline">
              {CONTACT_EMAIL}
            </a>
            <div data-menu-foot className="flex gap-3">
              {SOCIALS.filter((s) => s.href).map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
