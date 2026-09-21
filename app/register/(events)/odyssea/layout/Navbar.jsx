import React, { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Brand from "../components/Brand";
import MobileNav from "./MobileNav";
import { NAV_LINKS } from "../lib/content";

const SECTION_IDS = NAV_LINKS.map(({ href }) => href.slice(1));

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -50% 0px" },
    );

    SECTION_IDS.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback((event, href) => {
    event.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ody-gold/20 bg-ody-night-deep/85 backdrop-blur-md shadow-[0_10px_40px_rgba(0,19,30,0.5)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#home"
            aria-label="Odyssea home"
            onClick={(event) => handleNavClick(event, "#home")}
            className="shrink-0"
          >
            <Brand size="nav" glow="sm" />
          </a>

          <nav className="hidden items-center gap-9 lg:flex xl:gap-14" aria-label="Main navigation">
            {NAV_LINKS.map(({ name, href }) => (
              <a
                key={href}
                href={href}
                data-active={active === href.slice(1)}
                onClick={(event) => handleNavClick(event, href)}
                className="ody-navlink py-1 text-[1.15rem] font-medium tracking-wide xl:text-[1.25rem]"
              >
                {name}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation"
            aria-expanded={isOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-ody-gold/45 text-ody-gold transition hover:bg-ody-gold hover:text-ody-night lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <MobileNav
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={NAV_LINKS}
        onNavigate={handleNavClick}
      />
    </>
  );
}

export default React.memo(Navbar);
