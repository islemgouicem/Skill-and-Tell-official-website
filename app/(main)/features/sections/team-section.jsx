"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mail ,} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { useInView } from "../../../../components/ui/use_in_view.js";
import { Card, CardContent, CardDescription, CardTitle } from "../../../../components/ui/card";
import Image from "next/image.js";
import left from "@/assets/images/skillntell/left.png";
import right from "@/assets/images/skillntell/right.png";

function normalizeUrl(url) {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

// Shortest circular distance between a card and the active card.
// Same result whether you move left or right, so both directions animate identically.
function getOffset(index, total, current) {
    let offset = index - current;
    const half = total / 2;
    if (offset > half) offset -= total;
    else if (offset < -half) offset += total;
    return offset;
}

function TeamSection({ teamMembers }) {
    const [sectionRef, sectionInView] = useInView({ threshold: 0.1 });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [hasRun, setHasRun] = useState(false);
    const prevOffsets = useRef({});
    useEffect(() => {
        if (sectionInView && !hasRun) {
            const half = Math.floor(teamMembers.length / 2 + 1);
            for (let i = 0; i < half; i++) {
                nextMember(); // run your procedure
            }
            setHasRun(true); // prevent running again
        }
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial width
        return () => window.removeEventListener("resize", handleResize);
    }, [sectionInView, hasRun]);
    useEffect(() => {
        // Remember where every card was, to detect a card wrapping around the loop
        teamMembers.forEach((_, i) => {
            prevOffsets.current[i] = getOffset(i, teamMembers.length, currentIndex);
        });
    }, [currentIndex, teamMembers.length]);
    const getCardTransform = (index, total, current, width) => {
        const offset = getOffset(index, total, current);
        const absOffset = Math.abs(offset);
        const direction = offset < 0 ? -1 : 1;
        let range; // how many cards are visible on each side of the active one
        let translations; // translateX per distance from the active card
        let scaleStep;
        let rotateStep;
        if (width < 640) {
            // Mobile: Show 3 cards (current, prev, next) with 3D effect
            range = 1;
            translations = [0, 70]; // Adjusted for smaller cards
            scaleStep = 0.15; // More pronounced scaling for mobile
            rotateStep = 10; // More pronounced rotation for mobile
        }
        else if (width >= 640 && width < 768) {
            // Tablet (sm breakpoint): Show 5 cards
            range = 2;
            translations = [0, 150, 260]; // Adjusted for smaller cards
            scaleStep = 0.1;
            rotateStep = 5;
        }
        else {
            // Desktop (md and up): Show 5 cards
            range = 2;
            translations = [0, 180, 320]; // Adjusted for smaller cards
            scaleStep = 0.1;
            rotateStep = 5;
        }
        const isHidden = absOffset > range;
        // Hidden cards wait at the outer slot (same spot as the last visible card), always underneath.
        // They fade in/out there while the visible cards slide over them, exactly like the left-click animation.
        const step = Math.min(absOffset, range);
        const translateX = translations[step];
        const scale = 1 - step * scaleStep;
        const rotateY = direction * step * -rotateStep;
        return {
            transform: `translateX(${direction * translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
            opacity: isHidden ? 0 : 1,
            zIndex: isHidden ? 0 : 5 - absOffset,
            display: "block",
            visibility: isHidden ? "hidden" : "visible",
            pointerEvents: isHidden ? "none" : "auto",
        };
    };
    const nextMember = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
    };
    const prevMember = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length);
    };
    return (<section id="team" ref={sectionRef} className="relative bg-space-dark text-space-text overflow-hidden py-10 h-[700px] md:h-auto flex flex-col items-center" style={{
            background: "url('/images/Team_Section.webp')",
            backgroundSize: "cover", // makes it scale and fill the section
            backgroundPosition: "center", // keeps it centered
            backgroundRepeat: "no-repeat", // avoids tiling
        }}>
      <h2 className="titles text-neutral-100 pb-10 md:pb-0">
        Our Heads
      </h2>
      <div className="container mx-auto px-1 md:px-4 relative z-10 w-full pt-4  flex flex-col justify-center py-6 sm:py-8 md:py-10">

        <div className="relative flex items-center justify-center min-h-[470px] md:min-h-[510px] lg:min-h-[570px] w-full">
          {" "}
          <button onClick={prevMember} className="absolute pointer left-0 md:left-10 z-20 p-1 transition-all duration-300">
            <Image src={left} alt="Previous" className="h-16 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]"/>
          </button>
          <div className="relative w-full h-full flex justify-center items-center">
            {teamMembers.map((member, index) => {
            const { transform, opacity, zIndex, display, visibility, pointerEvents } = getCardTransform(index, teamMembers.length, currentIndex, windowWidth);
            // A card jumping from one end of the loop to the other should not sweep across the screen:
            // its position changes instantly and only its opacity animates
            const previousOffset = prevOffsets.current[index];
            const wrapped = teamMembers.length > 2 && previousOffset !== undefined &&
                Math.abs(getOffset(index, teamMembers.length, currentIndex) - previousOffset) === teamMembers.length - 1;
            return (<Card key={String(member.id) + member.name} className="absolute w-[85%] sm:w-[300px] md:w-[320px] max-w-[98vw] inset-x-0 mx-auto p-6 border border-space-subtle 
  heads-card shadow-xl transition-all duration-400 ease-in-out origin-center h-[570px] md:h-[620px]" style={{
                    transform,
                    opacity,
                    zIndex,
                    display,
                    visibility,
                    pointerEvents,
                    willChange: "transform, opacity",
                    transition: wrapped ? "opacity 300ms lineaar, visibility 200ms linear" : undefined,
                }}>
                  <CardContent className="flex flex-col justify-between items-center text-center p-0 h-full">
                    <Image src={member.image || "/images/pfp.png"} width={120} height={120} alt={member.name} className="w-[120px] h-[120px] rounded-full object-cover mb-5 border-4 border-space-accent shadow-md"/>
                    <div>
                      <CardTitle className="text-2xl font-bold text-neutral-100 mb-2">{member.name}</CardTitle>
                      <CardDescription className="text-accent-500 text-xl mb-4 font-bold">{member.role}</CardDescription>
                      <p className="text-white mb-6 text-sm sm:text-base">{member.description}</p>
                    </div>

                    <div className="flex gap-5">

                        <a href={`mailto:${member.email}`} aria-label="gmail" rel="noopener noreferrer" className="text-space-text hover:text-red-600 transition-colors">
                            <Mail className="h-7 w-7"/>
                        </a>
                        {typeof member.linkedin === "string" && member.linkedin.trim() !== "" && (
                        <a href={normalizeUrl(member.linkedin)} target="_blank" aria-label="linkedin" rel="noopener noreferrer" className="text-space-text hover:text-[#0077b5] transition-colors">
                            <FaLinkedinIn className="h-7 w-7 "/>
                        </a>
                        )}
                    </div>
                  </CardContent>
                </Card>);
        })}
          </div>
          <button onClick={nextMember} className="pointer absolute right-0 md:right-10 z-20 p-1 transition-all duration-300">
            <Image src={right} alt="Next" className="h-16 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]"/>
          </button>
        </div>
      </div>
    </section>);
}
export default React.memo(TeamSection);
