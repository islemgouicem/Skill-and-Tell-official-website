"use client";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import EventCard from "@/components/site/EventCard";
import TLink from "@/components/site/TLink";
import { getEvents } from "@/lib/utils/events";

export default function EventsHighlight() {
  const root = useRef(null);
  const track = useRef(null);
  const events = getEvents().filter((e) => !e.placeholder).slice(0, 6);
  useReveals(root);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        const distance = () => el.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-pin]", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        // Cards lean into the motion.
        gsap.utils.toArray("[data-hcard]").forEach((card) => {
          gsap.fromTo(card, { rotate: 3, y: 40 }, {
            rotate: 0, y: 0, ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "left 55%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="events" className="relative bg-space-dark">
      <div className="absolute inset-0 opacity-70" style={{ backgroundImage: "url('/images/bg/events.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-transparent to-space-dark" />

      <div data-pin className="relative flex min-h-screen flex-col justify-center overflow-hidden py-24 lg:py-0">
        <div className="mx-auto mb-12 flex w-full max-w-[1400px] flex-col justify-between gap-6 px-5 md:px-10 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">04 , Experiences</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Our Events</h2>
          </div>
          <div className="flex flex-col items-start gap-5 lg:items-end">
            <p data-reveal="up" className="max-w-md text-white/65 lg:text-right">
              Datathons, hackathons, ideathons and full days of challenges , scroll through the moments that shaped our community.
            </p>
            <TLink data-reveal="up" href="/events" className="snt-btn snt-btn--ghost">
              All events <ArrowRight className="snt-btn__arrow h-5 w-5" />
            </TLink>
          </div>
        </div>

        <div className="overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none" data-lenis-prevent-touch>
          <div ref={track} className="flex w-max gap-5 px-5 md:gap-7 md:px-10 will-change-transform">
            {events.map((e) => (
              <div key={e.id} data-hcard className="w-[82vw] shrink-0 snap-center sm:w-[60vw] md:w-[44vw] lg:w-[30vw] xl:w-[27vw]">
                <EventCard event={e} />
              </div>
            ))}
            <TLink
              href="/events"
              data-hcard
              className="group relative flex w-[82vw] shrink-0 snap-center flex-col items-center justify-center gap-6 overflow-hidden rounded-[24px] border border-dashed border-Main-300/40 p-10 text-center sm:w-[60vw] md:w-[44vw] lg:w-[24vw]"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-Main-500/40 to-accent-500/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white text-Main-700 transition-transform duration-700 group-hover:rotate-[-45deg] group-hover:scale-110">
                <ArrowRight className="h-8 w-8" />
              </span>
              <span className="relative font-futura_bold text-3xl text-white">See every event</span>
              <span className="relative text-white/60">Past editions, photos &amp; projects</span>
            </TLink>
          </div>
        </div>

        <div className="mx-auto mt-12 hidden w-full max-w-[1400px] px-10 lg:block">
          <div className="h-px w-full bg-white/10">
            <div data-progress className="h-px w-full origin-left scale-x-0 bg-gradient-to-r from-accent-500 to-Main-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
