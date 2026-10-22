"use client";
import { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Crown } from "lucide-react";
import { useReveals } from "@/components/motion/useReveals";
import TLink from "@/components/site/TLink";
import Magnetic from "@/components/motion/Magnetic";
import { structureTeam, prettyName, prettyRole } from "@/lib/utils/team";

function HeadCard({ m, board }) {
  return (
    <figure className={`group relative overflow-hidden rounded-[18px] border bg-Main-700 ${board ? "border-accent-400/60 shadow-[0_0_30px_-8px_rgba(255,109,0,0.55)]" : "border-white/10"}`}>
      <div className="relative aspect-[3/4]">
        <Image
          src={m.image || "/images/pfp.png"}
          alt={prettyName(m.name)}
          fill
          sizes="(min-width:1280px) 200px, (min-width:768px) 25vw, 45vw"
          className="object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a001a] via-[#0a001a]/20 to-transparent" />
        {board && (
          <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-accent-500 text-white shadow-[0_0_18px_rgba(255,109,0,0.6)]" title="Executive board">
            <Crown className="h-4 w-4" />
          </span>
        )}
        <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4">
          <p className="font-futura_md_bt text-[11px] leading-tight text-accent-300 md:text-xs">{prettyRole(m.role)}</p>
          <p className="font-futura_bold text-sm leading-tight text-white md:text-base">{prettyName(m.name)}</p>
        </figcaption>
      </div>
    </figure>
  );
}

/** Every head on the home page, same card size: the board first, then each department. */
export default function TeamTeaser({ teamMembers = [] }) {
  const root = useRef(null);
  useReveals(root);
  const { ordered, boardSet } = useMemo(() => {
    const { board, departments } = structureTeam(teamMembers);
    return { ordered: [...board, ...departments.flatMap((d) => d.members)], boardSet: new Set(board) };
  }, [teamMembers]);

  return (
    <section ref={root} id="team" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/bg/team.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
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

      {/* Everyone on one screen: the executive board always comes first. */}
      <div data-reveal-stagger className="relative mx-auto mt-12 grid max-w-[1400px] grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:grid-cols-4 md:gap-4 md:px-10 lg:grid-cols-6">
        {ordered.map((m) => (
          <HeadCard key={`${m.id}-${m.name}`} m={m} board={boardSet.has(m)} />
        ))}
      </div>
    </section>
  );
}
