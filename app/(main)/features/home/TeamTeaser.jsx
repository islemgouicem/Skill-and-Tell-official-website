"use client";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useReveals } from "@/components/motion/useReveals";
import Marquee from "@/components/motion/Marquee";
import MemberCard from "@/components/site/MemberCard";
import TLink from "@/components/site/TLink";
import Magnetic from "@/components/motion/Magnetic";
import { structureTeam, prettyName, prettyRole } from "@/lib/utils/team";

function Face({ m }) {
  return (
    <div className="mx-3 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-2 pl-2 pr-5 backdrop-blur">
      <Image src={m.image || "/images/pfp.png"} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
      <span className="whitespace-nowrap">
        <span className="block font-futura_bold text-sm text-white">{prettyName(m.name)}</span>
        <span className="block text-xs text-white/55">{prettyRole(m.role)}</span>
      </span>
    </div>
  );
}

export default function TeamTeaser({ teamMembers = [] }) {
  const root = useRef(null);
  useReveals(root);
  const { board: b } = structureTeam(teamMembers);
  // President in the middle, vice president and secretary general on each side.
  const board = b.length === 3 ? [b[1], b[0], b[2]] : b;
  const half = Math.ceil(teamMembers.length / 2);

  return (
    <section ref={root} id="team" className="relative overflow-hidden py-24 md:py-36">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/Team_Section.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark/70 via-transparent to-space-dark/80" />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span data-reveal="fade" className="snt-eyebrow">05 — People</span>
            <h2 data-split="chars" className="snt-h2 mt-5 text-white">Our Heads</h2>
          </div>
          <p data-reveal="up" className="max-w-md text-white/65 lg:text-right">
            The students who lead Skill&amp;Tell — managers, leads and the executive board who make every event, mission and project happen.
          </p>
        </div>

        <div data-reveal-stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {board.map((m, i) => (
            <MemberCard key={m.id + m.name} member={m} size="lg" className={board.length === 3 ? (i !== 1 ? "md:mt-14" : "order-first md:order-none") : ""} />
          ))}
        </div>
      </div>

      {teamMembers.length > 3 && (
        <div className="relative mt-16 space-y-4">
          <Marquee speed={35} pauseOnHover>
            {teamMembers.slice(0, half).map((m) => <Face key={m.id + m.name} m={m} />)}
          </Marquee>
          <Marquee speed={30} reverse pauseOnHover>
            {teamMembers.slice(half).map((m) => <Face key={m.id + m.name} m={m} />)}
          </Marquee>
        </div>
      )}

      <div data-reveal="up" className="relative mt-14 flex justify-center">
        <Magnetic>
          <TLink href="/team" className="snt-btn snt-btn--primary">
            Meet the whole team <ArrowRight className="snt-btn__arrow h-5 w-5" />
          </TLink>
        </Magnetic>
      </div>
    </section>
  );
}
