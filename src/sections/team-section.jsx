"use client"

import React, { useState, useEffect } from "react"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { useInView } from "../components/ui/use_in_view.js"
import { Card, CardContent, CardDescription, CardTitle } from "../components/ui/card.jsx" // Original import path
import teamMembers from "../data/managers_info.json" // Original import path

import left from "../assets/images/left.png"
import right from "../assets/images/right.png"

function TeamSection() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.1 })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [hasRun, setHasRun] = useState(false);


  useEffect(() => {
    if (sectionInView && !hasRun) {
      const half = Math.floor(teamMembers.length / 2);
      for (let i = 0; i < half; i++) {
        nextMember(); // run your procedure
      }
      setHasRun(true); // prevent running again
    }
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    handleResize() // Set initial width
    return () => window.removeEventListener("resize", handleResize)
  }, [sectionInView, hasRun])

  const getCardTransform = (index, total, current, width) => {
    const offset = index - current
    const absOffset = Math.abs(offset)

    let scale = 1
    let rotateY = 0
    let finalTranslateX = 0
    let display = "block"
    let opacity = 1
    const zIndex = 5 - absOffset

    if (width < 640) {
      // Mobile: Show 3 cards (current, prev, next) with 3D effect
      if (absOffset > 1) {
        display = "none"
        opacity = 0
        return { transform: "translateX(0) scale(0) rotateY(0deg)", opacity: 0, zIndex: 0, display: "none" }
      }

      scale = 1 - absOffset * 0.15 // More pronounced scaling for mobile
      rotateY = offset * -10 // More pronounced rotation for mobile

      // Smaller translations for mobile to prevent overlap while showing 3D
      if (offset === 1) {
        finalTranslateX = 70 // Adjusted for smaller cards
      } else if (offset === -1) {
        finalTranslateX = -70 // Adjusted for smaller cards
      }
    } else if (width >= 640 && width < 768) {
      // Tablet (sm breakpoint): Show 5 cards
      if (absOffset > 2) {
        display = "none"
        opacity = 0
        return { transform: "translateX(0) scale(0) rotateY(0deg)", opacity: 0, zIndex: 0, display: "none" }
      }
      scale = 1 - absOffset * 0.1
      rotateY = offset * -5
      // Adjusted translations for tablet
      if (offset === 1) {
        finalTranslateX = 150 // Adjusted for smaller cards
      } else if (offset === 2) {
        finalTranslateX = 260 // Adjusted for smaller cards
      } else if (offset === -1) {
        finalTranslateX = -150 // Adjusted for smaller cards
      } else if (offset === -2) {
        finalTranslateX = -260 // Adjusted for smaller cards
      }
    } else {
      // Desktop (md and up): Show 5 cards
      if (absOffset > 2) {
        display = "none"
        opacity = 0
        return { transform: "translateX(0) scale(0) rotateY(0deg)", opacity: 0, zIndex: 0, display: "none" }
      }
      scale = 1 - absOffset * 0.1
      rotateY = offset * -5
      // Original desktop translations, slightly adjusted for new card size
      if (offset === 1) {
        finalTranslateX = 180 // Adjusted for smaller cards
      } else if (offset === 2) {
        finalTranslateX = 320 // Adjusted for smaller cards
      } else if (offset === -1) {
        finalTranslateX = -180 // Adjusted for smaller cards
      } else if (offset === -2) {
        finalTranslateX = -320 // Adjusted for smaller cards
      }
    }

    return {
      transform: `translateX(${finalTranslateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      display,
    }
  }

  const nextMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  }

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative bg-space-dark text-space-text overflow-hidden py-4 h-[600px] md:h-auto flex flex-col items-center"
      style={{
        background: "url('/images/Team_Section.webp')",
        backgroundSize: "cover",   // makes it scale and fill the section
        backgroundPosition: "center", // keeps it centered
        backgroundRepeat: "no-repeat", // avoids tiling
      }}
    >
      <h2 className="titles text-neutral-100 pb-10 md:pb-0">
        Our Heads
      </h2>
      <div className="container mx-auto px-1 md:px-4 relative z-10 w-full pt-4 flex flex-col justify-center py-4 sm:py-6 md:py-8">

        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full">
          {" "}
          <button onClick={prevMember} className="absolute pointer left-0 md:left-10 z-20 p-1 transition-all duration-300">
            <img
              src={left}
              alt="Previous"
              className="h-16 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]"
            />
          </button>
          <div className="relative w-full h-full flex justify-center items-center">
            {teamMembers.map((member, index) => {
              const { transform, opacity, zIndex, display } = getCardTransform(
                index,
                teamMembers.length,
                currentIndex,
                windowWidth,
              )
              return (
                <Card
                  key={member.id}
                  className="absolute w-[85%] sm:w-[300px] md:w-[320px] max-w-[98vw] inset-x-0 mx-auto p-6 border border-space-subtle 
  heads-card shadow-xl transition-all duration-500 ease-in-out origin-center h-[500px] md:h-[550px]"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    display,
                  }}
                >
                  <CardContent className="flex flex-col justify-between items-center text-center p-0 h-full">
                    <img
                      src={member.image || "/images/pfp.png"}
                      width={120}
                      height={120}
                      loading="lazy"
                      alt={member.name}
                      className="w-[120px] h-[120px] rounded-full object-cover mb-5 border-4 border-space-accent shadow-md"
                    />
                    <div>
                      <CardTitle className="text-2xl font-bold text-neutral-100 mb-2">{member.name}</CardTitle>
                      <CardDescription className="text-accent-500 text-xl mb-4 font-bold">{member.role}</CardDescription>
                      <p className="text-white mb-6 text-sm sm:text-base">{member.description}</p>
                    </div>

                    <div className="flex gap-5">
                      <a
                        href={member.instagram}
                        aria-label="instagram"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-space-accent transition-colors"
                      >
                        <Instagram className="h-7 w-7" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        aria-label="gmail"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-red-600 transition-colors"
                      >
                        <Mail className="h-7 w-7" />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        aria-label="linkedin"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-[#0077b5] transition-colors"
                      >
                        <Linkedin className="h-7 w-7" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <button onClick={nextMember} className="pointer absolute right-0 md:right-10 z-20 p-1 transition-all duration-300">
            <img
              src={right}
              alt="Next"
              className="h-16 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
export default React.memo(TeamSection)