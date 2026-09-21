import React from "react";
import { Globe, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Brand from "../components/Brand";
import Sparkles from "../components/Sparkles";
import { FOOTER_SPARKS } from "../components/sparkle_marks";
import { CONTACT, FOOTER_BLURB, NAV_LINKS } from "../lib/content";
import stars from "../../../assets/images/odyssea/stars.png";
import compass from "../../../assets/images/odyssea/compass.webp";
import Display from "../components/Display";

const SOCIALS = [
  { href: CONTACT.instagram, label: "Instagram", Icon: Instagram },
  { href: CONTACT.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: CONTACT.website, label: "Skill&Tell website", Icon: Globe },
];

function Heading({ children }) {
  return (
    <h3 className="ody-display flex items-center gap-3.5 text-[1.9rem] leading-none text-ody-title lg:text-[2.2rem] xl:text-[2.6rem]">
      <img src={compass} alt="" aria-hidden="true" className="w-9 shrink-0 xl:w-11" />
      <Display>{children}</Display>
    </h3>
  );
}

function Footer() {
  return (
    <footer
      id="contacts"
      className="relative -mt-[70px] sm:-mt-[110px] lg:-mt-[150px]"
    >
      {/* the arc that lifts the night back over the parchment */}
      <div className="pointer-events-none relative z-10 -mb-px w-full">
        <svg
          viewBox="0 0 1440 150"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-[70px] w-full sm:h-[110px] lg:h-[150px]"
        >
          <defs>
            <linearGradient id="odyFooterLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#bc9336" stopOpacity="0.35" />
              <stop offset="28%" stopColor="#fdcc46" />
              <stop offset="72%" stopColor="#fdcc46" />
              <stop offset="100%" stopColor="#bc9336" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path d="M0,150 L0,140 Q720,-6 1440,140 L1440,150 Z" fill="#011b2a" />
          <path
            d="M0,140 Q720,-6 1440,140"
            fill="none"
            stroke="url(#odyFooterLine)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden bg-ody-night px-6 pb-12 pt-12 sm:px-10 sm:pt-16 lg:px-16 lg:pt-20">
        <img
          src={stars}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
        <Sparkles marks={FOOTER_SPARKS} />

        <div className="relative mx-auto grid w-full max-w-[1440px] gap-14 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Brand size="lg" glow />
            <p className="mt-8 max-w-[24rem] text-[1.1rem] leading-[1.75] text-ody-white/90 sm:text-[1.2rem]">
              {FOOTER_BLURB}
            </p>

            <div className="mt-10 flex items-center gap-6">
              {SOCIALS.map((social, index) => (
                <React.Fragment key={social.label}>
                  {index > 0 && (
                    <span aria-hidden="true" className="h-8 w-px bg-ody-title/45" />
                  )}
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                    aria-label={social.label}
                    className="text-ody-title transition duration-300 hover:-translate-y-0.5 hover:text-ody-white"
                  >
                    <social.Icon className="h-10 w-10" strokeWidth={1.6} />
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="lg:pt-3">
            <Heading>QUICK LINKS</Heading>
            <nav className="mt-8 grid gap-6 text-[1.2rem] leading-[1.4] text-ody-white/85 xl:text-[1.35rem]">
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
                  className="w-fit transition-colors hover:text-ody-title"
                >
                  {name}
                </a>
              ))}
            </nav>
          </div>

          <div className="lg:pt-3">
            <Heading>CONTACT US</Heading>
            <div className="mt-8 grid gap-7 text-[1.1rem] leading-[1.5] text-ody-white/85 xl:text-[1.25rem]">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 transition-colors hover:text-ody-title"
              >
                <Mail className="h-8 w-8 shrink-0 text-ody-title xl:h-9 xl:w-9" strokeWidth={1.6} />
                <span className="break-all underline decoration-ody-title/50 underline-offset-[6px]">
                  {CONTACT.email}
                </span>
              </a>
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-4 transition-colors hover:text-ody-title"
              >
                <Phone className="h-8 w-8 shrink-0 text-ody-title xl:h-9 xl:w-9" strokeWidth={1.6} />
                <span className="tracking-[0.06em] underline decoration-ody-title/50 underline-offset-[6px]">
                  {CONTACT.phone}
                </span>
              </a>
              <p className="flex items-center gap-4">
                <MapPin className="h-8 w-8 shrink-0 text-ody-title xl:h-9 xl:w-9" strokeWidth={1.6} />
                {CONTACT.place}
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-20 w-full max-w-[1440px]">
          <div className="flex items-center gap-6">
            <span className="h-px flex-1 bg-ody-title/70" />
            <img src={compass} alt="" aria-hidden="true" className="w-10 shrink-0 sm:w-12" />
            <span className="h-px flex-1 bg-ody-title/70" />
          </div>
          <p className="mt-8 text-center text-[0.9rem] tracking-wide text-ody-white/50">
            © {new Date().getFullYear()} Skill&amp;Tell Scientific Club — ENSIA, Sidi Abdellah.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
