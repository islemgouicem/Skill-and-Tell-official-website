"use client";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import Tilt from "@/components/motion/Tilt";
import { prettyName, prettyRole, normalizeUrl } from "@/lib/utils/team";

/** Portrait card for a manager. size: "lg" | "md" (department grid) | "sm" (previous offices) */
export default function MemberCard({ member, size = "md", badge, className = "", ...rest }) {
  const linkedin = normalizeUrl(member.linkedin);
  const lg = size === "lg";
  const sm = size === "sm";
  return (
    <Tilt max={lg ? 6 : 8} className={`group relative overflow-hidden rounded-[22px] border border-white/10 bg-Main-700 ${className}`} {...rest}>
      <div className={`relative ${lg ? "aspect-[4/5]" : "aspect-[3/4]"} overflow-hidden`}>
        <Image
          src={member.image || "/images/pfp.png"}
          alt={prettyName(member.name)}
          fill
          sizes={lg ? "(min-width:1024px) 30vw, 90vw" : "(min-width:1280px) 20vw, (min-width:768px) 30vw, 50vw"}
          className="object-cover grayscale-[35%] transition-all duration-[1.1s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a001a] via-[#0a001a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tr from-Main-500/40 to-accent-500/30 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100" />
        {badge && <span className="absolute left-4 top-4 snt-chip backdrop-blur-md">{badge}</span>}
        <div className={`absolute inset-x-0 bottom-0 ${sm ? "p-3.5" : "p-5 md:p-6"}`}>
          <p className={`font-futura_md_bt text-accent-300 ${lg ? "text-base" : sm ? "text-xs" : "text-sm"}`}>{prettyRole(member.role)}</p>
          <h3 className={`font-futura_bold leading-tight text-white ${lg ? "text-2xl md:text-3xl" : sm ? "text-sm md:text-base" : "text-lg md:text-xl"}`}>{prettyName(member.name)}</h3>
          {member.description && !sm && (
            <p className={`grid transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]`}>
              <span className="overflow-hidden">
                <span className={`mt-3 block text-white/75 ${lg ? "text-sm md:text-[15px]" : "text-[13px]"} line-clamp-5`}>{member.description}</span>
              </span>
            </p>
          )}
          <div className={`mt-4 flex gap-2 ${sm ? "hidden" : ""}`}>
            {member.email && (
              <a href={`mailto:${member.email}`} aria-label={`Email ${prettyName(member.name)}`} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-accent-500 hover:border-accent-500">
                <Mail className="h-4 w-4" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${prettyName(member.name)} on LinkedIn`} className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-colors hover:bg-[#0077b5] hover:border-[#0077b5]">
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
}
