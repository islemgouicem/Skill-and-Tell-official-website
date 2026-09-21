import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../components/Brand";
import CompassDivider from "../components/CompassDivider";
import stars from "../../../assets/images/odyssea/stars.png";

function MobileNav({ isOpen, onClose, links, onNavigate }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-ody-night-deep/80 backdrop-blur-sm"
      />

      <nav
        className={`absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col overflow-hidden border-l border-ody-gold/40 bg-ody-night transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <img
          src={stars}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="relative flex items-center justify-between px-6 pt-7">
          <Brand size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="grid h-10 w-10 place-items-center rounded-full border border-ody-gold/50 text-ody-gold transition hover:bg-ody-gold hover:text-ody-night"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-9 grid gap-1 px-4">
          {links.map(({ name, href }, index) => (
            <a
              key={href}
              href={href}
              onClick={(event) => onNavigate(event, href)}
              style={{ transitionDelay: `${isOpen ? 90 + index * 55 : 0}ms` }}
              className={`ody-display border-b border-ody-gold/15 px-3 py-4 text-3xl text-white/90 transition-all duration-500 hover:text-ody-gold ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
            >
              {name}
            </a>
          ))}
        </div>

        <div className="relative mt-auto px-6 pb-9">
          <Link
            to="/odyssea/register"
            onClick={onClose}
            className="ody-display ody-cta relative z-10 flex min-h-13 items-center justify-center rounded-full border border-ody-gold text-xl text-ody-gold"
          >
            REGISTER NOW!
          </Link>
          <CompassDivider className="mt-7" star="w-7" />
        </div>
      </nav>
    </div>
  );
}

export default React.memo(MobileNav);
