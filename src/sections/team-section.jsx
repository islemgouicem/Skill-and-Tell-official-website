"use client"

import { useState, useEffect } from "react"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardTitle } from "../components/ui/card.jsx" // Original import path
import teamMembers from "../data/team.json" // Original import path

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    handleResize() // Set initial width
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
      className="relative py-16 md:py-24 bg-space-dark text-space-text overflow-hidden h-screen" // Changed to h-screen, removed flex centering
      style={{ background: "url(/Team_Section.svg)" }} 
    >

      <div className="container mx-auto px-4 md:px-6 relative z-10 w-full pt-4 flex flex-col justify-center h-full">
        {" "}
        <h2 className="titles text-center my-6 text-space-text animate-fade-in-up">
          {" "}
          Our Heads
        </h2>
        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[450px] lg:min-h-[500px] w-full">
          {" "}
          <button onClick={prevMember} className="absolute left-0 md:left-10 z-20 p-1 transition-all duration-300">
            <img
              src="/left.png"
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
                  className="absolute w-[80%] sm:w-[300px] md:w-[320px] max-w-[98vw] inset-x-0 mx-auto p-6 border border-space-subtle 
  bg-space-light/30 backdrop-blur-md shadow-xl transition-all duration-500 ease-in-out origin-center" // Further adjusted card width
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    display,
                    height: "auto",
                  }}
                >
                  <CardContent className="flex flex-col items-center text-center p-0">
                    <img
                      src={member.image || "/pfp.png"}
                      width={120}
                      height={120}
                      alt={member.name}
                      className="rounded-full object-cover mb-5 border-4 border-space-accent shadow-md" // Changed width/height to 120
                    />
                    <CardTitle className="text-3xl font-bold text-space-text mb-2">{member.name}</CardTitle>
                    <CardDescription className="text-space-accent text-xl mb-4">{member.role}</CardDescription>
                    <p className="text-space-text/90 mb-6 text-base">{member.description}</p>
                    <div className="flex gap-5">
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-space-accent transition-colors"
                      >
                        <Instagram className="h-7 w-7" />
                      </a>
                      <a
                        href={member.social.mail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-red-600 transition-colors"
                      >
                        <Mail className="h-7 w-7" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
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
          <button onClick={nextMember} className="absolute right-0 md:right-10 z-20 p-1 transition-all duration-300">
            <img
              src="/right.png"
              alt="Next"
              className="h-16 w-auto transition-all duration-300 hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]"
            />
          </button>
        </div>
      </div>
    </section>
  )
}
