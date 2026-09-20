import React from "react";
import { Globe2, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Brand from "../components/Brand";
import CompassDivider from "../components/CompassDivider";
import { CONTACT, FOOTER_BLURB, NAV_LINKS } from "../lib/content";
import stars from "../../../assets/images/odyssea/stars.webp";
import compass from "../../../assets/images/odyssea/compass.webp";

const SOCIALS = [
  { href: CONTACT.instagram, label: "Instagram", Icon: Instagram },
  { href: CONTACT.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: CONTACT.website, label: "Skill&Tell website", Icon: Globe2 },
];

function Heading({ children }) {
  return (
    <h3 className="ody-display flex items-center gap-2.5 text-2xl text-ody-gold sm:text-[1.65rem]">
      <img src={compass} alt="" aria-hidden="true" className="w-5 shrink-0" />
      {children}
    </h3>
  );
}

function Footer() {
  return (
    <footer
      id="contacts"
      className="ody-footer-arc relative -mt-8 overflow-hidden bg-ody-night px-6 pb-8 pt-28 sm:px-10 sm:pt-32 lg:pt-36"
    >
      <img
        src={stars}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.15fr_0.7fr_1.15fr] md:gap-10">
        <div>
          <Brand size="lg" />
          <p className="mt-6 max-w-xs text-sm leading-6 text-white/70">{FOOTER_BLURB}</p>
          <div className="mt-7 flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-ody-gold/35 text-ody-gold transition duration-300 hover:-translate-y-0.5 hover:border-ody-gold hover:bg-ody-gold hover:text-ody-night"
              >
                <social.Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <Heading>QUICK LINKS</Heading>
          <nav className="mt-6 grid gap-3.5 text-[0.95rem] text-white/72">
            {NAV_LINKS.slice(0, 4).map(({ name, href }) => (
              <a
                key={href}
                href={href}
                onClick={(event) => {
                  event.preventDefault();
                  document
                    .getElementById(href.slice(1))
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="w-fit transition-colors hover:text-ody-gold"
              >
                {name}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <Heading>CONTACT US</Heading>
          <div className="mt-6 grid gap-4 text-[0.92rem] text-white/72">
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-start gap-3 transition-colors hover:text-ody-gold"
            >
              <Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ody-gold" />
              <span className="underline decoration-ody-gold/40 underline-offset-4">
                {CONTACT.email}
              </span>
            </a>
            <a
              href={CONTACT.phoneHref}
              className="flex items-start gap-3 transition-colors hover:text-ody-gold"
            >
              <Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ody-gold" />
              <span className="underline decoration-ody-gold/40 underline-offset-4">
                {CONTACT.phone}
              </span>
            </a>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-[18px] w-[18px] shrink-0 text-ody-gold" />
              {CONTACT.place}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl">
        <CompassDivider star="w-8" />
        <p className="mt-6 text-center text-xs tracking-wide text-white/45">
          © {new Date().getFullYear()} Skill&amp;Tell Scientific Club — ENSIA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
