"use client";
import { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Crown } from "lucide-react";
import { useReveals } from "@/components/motion/useReveals";
import Marquee from "@/components/motion/Marquee";
import TLink from "@/components/site/TLink";
import Magnetic from "@/components/motion/Magnetic";
import { structureTeam, prettyName, prettyRole } from "@/lib/utils/team";

function HeadCard({ m, board }) {
  return (
    <figure className="group relative mx-2.5 w-[200px] shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-Main-700 md:mx-3 md:w-[230px]">
      <div className="relative aspect-[3/4]">
        <Image
          src={m.image || "/images/pfp.png"}
          alt={prettyName(m.name)}
          fill
          sizes="230px"
          className="object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a001a] via-[#0a001a]/20 to-transparent" />
        {board && (
          <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-accent-500 text-white shadow-[0_0_18px_rgba(255,109,0,0.6)]" title="Executive board">
            <Crown className="h-4 w-4" />
          </span>
        )}
        <figcaption className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-futura_md_bt text-xs text-accent-300">{prettyRole(m.role)}</p>
          <p className="font-futura_bold text-base leading-tight text-white">{prettyName(m.name)}</p>
        </figcaption>
      </div>
    </figure>
  );
}

/** Every head gets the same card: the board first, then each department. */
export default function TeamTeaser({ teamMembers = [] }) {
  const root = useRef(null);
  useReveals(root);
  const { ordered, boardSet } = useMemo(() => {
    const { board, departments } = structureTeam(teamMembers);
    return { ordered: [...board, ...departments.flatMap((d) => d.members)], boardSet: new Set(board) };
  }, [teamMembers]);
  const half = Math.ceil(ordered.length / 2);
  const rows = ordered.length > 8 ? [ordered.slice(0, half), ordered.slice(half)] : [ordered];

  return (
    <section ref={root} id="team" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/Team_Section.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-dark/30 to-space-dark" />

      <div className="relative mx-auto flex max-w-[1400px] flex-col justify-between gap-6 px-5 md:px-10 lg:flex-row lg:items-end">
        <div>
          <span data-reveal="fade" className="snt-eyebrow">05 — People</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">Our Heads</h2>
        </div>
        <div data-reveal="up" className="flex flex-col items-start gap-5 lg:items-end">
          <p className="max-w-md text-white/65 lg:text-right">
            {ordered.length} students lead Skill&amp;Tell this mandate — the executive board and the leads and managers of every department.
          </p>
          <Magnetic>
            <TLink href="/team" className="snt-btn snt-btn--ghost">
              Meet the team <ArrowRight className="snt-btn__arrow h-5 w-5" />
            </TLink>
          </Magnetic>
        </div>
      </div>

      <div data-reveal="fade" className="relative mt-14 space-y-5">
        {rows.map((row, i) => (
          <Marquee key={i} speed={i ? 26 : 32} reverse={i === 1} pauseOnHover>
            {row.map((m) => (
              <HeadCard key={`${m.id}-${m.name}`} m={m} board={boardSet.has(m)} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
