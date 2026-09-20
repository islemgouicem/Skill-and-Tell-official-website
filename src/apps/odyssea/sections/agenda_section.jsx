import React, { useState } from "react";
import { ChevronsDown } from "lucide-react";
import CloudCard from "../components/CloudCard";
import CompassDivider from "../components/CompassDivider";
import Reveal from "../components/Reveal";
import { useInView } from "../components/use_in_view";
import agenda from "../../../data/odyssea/agenda.json";
import laurel from "../../../assets/images/odyssea/laurel.webp";

/* Cloud placements, transcribed from the Figma frame (percentages of the
   route container). `flip` mirrors the cloud so its tail faces the path. */
const STOPS = [
  { left: 47.5, top: 0, width: 45, flip: false },
  { left: 57, top: 33, width: 43, flip: false },
  { left: 0, top: 56, width: 35, flip: true },
  { left: 62, top: 61, width: 33, flip: false },
  { left: 1, top: 85, width: 35, flip: true },
];

/* cloud aspect 730x266 inside a 100 x 92 container -> height factor */
const H = (w) => w * (266 / 730) * (100 / 92);
const anchor = (s) => ({
  x: s.flip ? s.left + s.width * 0.965 : s.left + s.width * 0.035,
  y: s.top + H(s.width) * 0.57,
});

function RoutePath() {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const points = STOPS.map(anchor);
  const d = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cx = (prev.x + p.x) / 2 + (i % 2 ? 3 : -3);
      const cy = (prev.y + p.y) / 2;
      return `Q ${cx} ${cy} ${p.x} ${p.y}`;
    })
    .join(" ");

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`ody-route-line pointer-events-none absolute inset-0 h-full w-full ${
        inView ? "is-visible" : ""
      }`}
    >
      <path d={d} vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      {points.map((p) => (
        <circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r="0.55"
          fill="#bc9336"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/**
 * The continued voyage: every slot of a day, still drawn on clouds.
 * Desktop keeps the zigzag; mobile runs them straight down the middle.
 */
function CloudTrail({ slots }) {
  return (
    <div className="relative mt-8">
      <span
        aria-hidden="true"
        className="absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,rgba(188,147,54,0.8)_0_7px,transparent_7px_16px)] lg:block"
      />

      <div className="relative grid justify-items-center gap-5 lg:justify-items-stretch lg:gap-y-1">
        {slots.map(([time, title, copy], index) => (
          <Reveal
            key={time}
            delay={index * 60}
            className={`flex w-full justify-center ${
              index % 2 ? "lg:justify-end" : "lg:justify-start"
            }`}
          >
            <CloudCard
              time={time}
              title={title}
              copy={copy}
              flip={index % 2 === 1}
              className={`w-[92%] max-w-[420px] lg:max-w-none lg:w-[54%] ${
                index % 2 ? "lg:ml-auto lg:-mt-6" : "lg:mr-auto lg:-mt-6"
              }`}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FullAgenda({ open }) {
  return (
    <div
      className="ody-faq-answer mt-2"
      data-open={open}
      aria-hidden={!open}
      id="odyssea-full-agenda"
    >
      <div>
        <div className="grid gap-14 pt-10">
          {agenda.days.map((day) => (
            <section key={day.label} className="overflow-visible">
              <CompassDivider tone="ink" star="w-7 sm:w-9" />
              <h3 className="ody-display mt-3 text-center text-3xl text-ody-ink sm:text-4xl">
                {day.label}
              </h3>
              <p className="mt-1 text-center text-[0.7rem] uppercase tracking-[0.24em] text-ody-ink/55">
                {day.subtitle}
              </p>
              <CloudTrail slots={day.slots} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function AgendaSection({ parchmentImg }) {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="agenda"
      className="ody-parchment relative text-ody-ink"
      style={{ "--ody-parchment-img": `url(${parchmentImg})` }}
    >
      <div className="ody-notch" />

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:pb-20 lg:pt-36">
        <Reveal>
          <CompassDivider tone="ink" star="w-8 sm:w-10" />
          <h2 className="ody-display mt-5 text-center text-[clamp(2.5rem,8vw,5.2rem)] leading-none text-ody-ink">
            EVENT AGENDA
          </h2>
        </Reveal>

        {/* ---------- desktop: the plotted route ---------- */}
        <Reveal delay={120} className="relative mt-14 hidden lg:block">
          <div className="relative w-full" style={{ aspectRatio: "100 / 92" }}>
            <img
              src={laurel}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute left-[-3%] top-[1%] w-[43%] select-none"
            />

            <RoutePath />

            {STOPS.map((stop, index) => (
              <CloudCard
                key={agenda.route[index].id}
                time={agenda.route[index].time}
                title={agenda.route[index].title}
                copy={agenda.route[index].copy}
                flip={stop.flip}
                style={{
                  position: "absolute",
                  left: `${stop.left}%`,
                  top: `${stop.top}%`,
                  width: `${stop.width}%`,
                }}
              />
            ))}
          </div>
        </Reveal>

        {/* ---------- mobile / tablet: straight down the voyage ---------- */}
        <div className="relative mt-12 lg:hidden">
          <img
            src={laurel}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute left-1/2 top-1/2 w-[125%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.18]"
          />

          <div className="relative grid justify-items-center gap-5 sm:gap-6">
            {agenda.route.map((stop, index) => (
              <Reveal key={stop.id} delay={index * 70} className="flex w-full justify-center">
                <CloudCard
                  time={stop.time}
                  title={stop.title}
                  copy={stop.copy}
                  flip={index % 2 === 1}
                  className="w-[92%] max-w-[430px] sm:w-[78%]"
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------- full agenda toggle ---------- */}
        <div className="mt-10 flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="odyssea-full-agenda"
            className="group inline-flex items-center gap-3 rounded-full border border-ody-ink/25 bg-ody-parchment/40 px-6 py-3 text-[0.78rem] uppercase tracking-[0.2em] text-ody-ink/75 transition duration-300 hover:border-ody-ink/60 hover:bg-ody-ink hover:text-ody-parchment"
          >
            {open ? "Hide the full agenda" : "See the full agenda"}
            <ChevronsDown
              className={`h-5 w-5 transition-transform duration-400 ${
                open ? "rotate-180" : "translate-y-0 group-hover:translate-y-0.5"
              }`}
            />
          </button>
        </div>

        <FullAgenda open={open} />
      </div>
    </section>
  );
}

export default React.memo(AgendaSection);
