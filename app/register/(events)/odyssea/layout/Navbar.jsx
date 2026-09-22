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

  /* Scroll-spy.

     This used to be an IntersectionObserver keyed on intersectionRatio, which
     silently failed on the long sections: with a rootMargin of -20%/-50% the
     root box is only 30% of the viewport, so a section taller than that can
     never reach a ratio of 0.25 — Agenda (1070px) and FAQ (1220px) never fired
     at all and the underline stayed stuck on About. Ratios are the wrong tool
     when a section can be taller than the screen.

     Instead: a reading line sits just under the header, and the active section
     is simply the last one whose top has crossed it. Height stops mattering,
     and clicking a link lands its section's top at 0, which is above the line,
     so the underline moves the moment the scroll settles. */
  useEffect(() => {
    const nodes = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;

    let frame = 0;

    const measure = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);

      const line = 100; /* clears the 80px header */
      let current = nodes[0].id;
      nodes.forEach((node) => {
        if (node.getBoundingClientRect().top <= line) current = node.id;
      });

      /* the last section is short enough to sit below the line at the very
         foot of the page, so bottoming out always selects it */
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = nodes[nodes.length - 1].id;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
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
            <Brand size="nav" variant="row" />
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
