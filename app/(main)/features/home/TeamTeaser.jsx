"use client";
import { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useReveals } from "@/components/motion/useReveals";
import TLink from "@/components/site/TLink";
import MemberCard from "@/components/site/MemberCard";
import { structureTeam } from "@/lib/utils/team";

/** The executive board on the home page, plus a door to the full team page. */
export default function TeamTeaser({ teamMembers = [] }) {
  const root = useRef(null);
  useReveals(root);
  const { board, others } = useMemo(() => {
    const { board, departments } = structureTeam(teamMembers);
    return { board, others: departments.flatMap((d) => d.members) };
  }, [teamMembers]);
  const faces = others.slice(0, 7);

  return (
    <section ref={root} id="team" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0" style={{ backgroundImage: "url('/images/bg/team.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-space-dark/30 to-space-dark" />

      <div className="relative mx-auto max-w-[1280px] px-5 md:px-10">
        <div className="max-w-2xl">
          <span data-reveal="fade" className="snt-eyebrow">05 , People</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">Our Heads</h2>
          <p data-reveal="up" className="snt-lead mt-4 text-white/65">
            The executive board leading Skill&amp;Tell this mandate.
          </p>
        </div>

        <div data-reveal-stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 lg:grid-cols-4 lg:gap-5">
          {board.map((m) => (
            <MemberCard key={`${m.id}-${m.name}`} member={m} />
          ))}

          <TLink
            href="/team"
            className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] border border-Main-300/30 bg-gradient-to-br from-Main-600 to-Main-700 p-5 transition-colors duration-500 hover:border-accent-400/70 md:p-6"
          >
            <span className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-500/25 blur-3xl transition-transform duration-700 group-hover:scale-150" aria-hidden="true" />
            <div className="relative flex -space-x-3 transition-all duration-500 group-hover:-space-x-1">
              {faces.map((m) => (
                <Image key={`${m.id}-${m.name}`} src={m.thumb || m.image || "/images/pfp.png"} alt="" width={48} height={48} className="h-9 w-9 rounded-full border-2 border-Main-700 object-cover md:h-11 md:w-11" />
              ))}
            </div>
            <div className="relative mt-8">
              <p className="font-compacta text-4xl leading-none text-white sm:text-5xl md:text-6xl">+{others.length}</p>
              <p className="mt-3 font-futura_bold text-sm leading-snug text-white sm:text-base md:text-lg">
                Discover who&apos;s behind the success of Skill&amp;Tell
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 py-1.5 font-futura_md_bt text-xs text-Main-700 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm transition-colors duration-300 group-hover:bg-accent-500 group-hover:text-white">
                Meet the team <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </TLink>
        </div>
      </div>
    </section>
  );
}
