"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Mail } from "lucide-react"
import { Button } from "./ui/button.jsx"
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card.jsx"

export default function TeamSection() {
  const teamMembers = [
    {
      id:1,
      name: "Full name",
      role: "Position",
      description:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing gravida neque sit maecenas viverra felis id. Sit nibh maecenas viverra arcu at. Amet sit sagittis mollis dui.",
      image: "/pfp.webp?height=200&width=200", // User: Replace with team member images
      social: {
        instagram: "#",
        mail: "#",
        linkedin: "#",
      },
    },
    {
      id:2,
      name: "Full name",
      role: "Position",
      description:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing gravida neque sit maecenas viverra felis id. Sit nibh maecenas viverra arcu at. Amet sit sagittis mollis dui.",
      image: "/pfp.webp?height=200&width=200", // User: Replace with team member images
      social: {
        instagram: "#",
        mail: "#",
        linkedin: "#",
      },
    },
    {
      id:3,
      name: "Full name",
      role: "Position",
      description:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing gravida neque sit maecenas viverra felis id. Sit nibh maecenas viverra arcu at. Amet sit sagittis mollis dui.",
      image: "/pfp.webp?height=200&width=200", // User: Replace with team member images
      social: {
        instagram: "#",
        mail: "#",
        linkedin: "#",
      },
    },
    {
      id:4,
      name: "Full name",
      role: "Position",
      description:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing gravida neque sit maecenas viverra felis id. Sit nibh maecenas viverra arcu at. Amet sit sagittis mollis dui.",
      image: "/pfp.webp?height=200&width=200", // User: Replace with team member images
      social: {
        instagram: "#",
        mail: "#",
        linkedin: "#",
      },
    },
    {
      id:5,
      name: "Full name",
      role: "Position",
      description:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing gravida neque sit maecenas viverra felis id. Sit nibh maecenas viverra arcu at. Amet sit sagittis mollis dui.",
      image: "/pfp.webp?height=200&width=200", // User: Replace with team member images
      social: {
        instagram: "#",
        mail: "#",
        linkedin: "#",
      },
    },
    {
      id:6,
      name: "Full name",
      role: "Position",
      description:
        "Lorem ipsum dolor sit amet consectetur. Adipiscing gravida neque sit maecenas viverra felis id. Sit nibh maecenas viverra arcu at. Amet sit sagittis mollis dui.",
      image: "/pfp.webp?height=200&width=200", // User: Replace with team member images
      social: {
        instagram: "#",
        mail: "#",
        linkedin: "#",
      },
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const getCardTransform = (index, total, current) => {
    const offset = index - current
    const absOffset = Math.abs(offset)

    if (absOffset > 2) {
      return {
        transform: "translateX(0) scale(0) rotateY(0deg)",
        opacity: 0,
        zIndex: 0,
        display: "none",
      }
    }

    const scale = 1 - absOffset * 0.1
    const rotateY = offset * -5 // Slight rotation for 3D effect
    const zIndex = 5 - absOffset // Closer cards have higher z-index

    // Adjust for stacking effect
    let finalTranslateX = 0
    if (offset === 0) {
      finalTranslateX = 0
    } else if (offset === 1) {
      finalTranslateX = 150 // Right card
    } else if (offset === 2) {
      finalTranslateX = 250 // Further right card
    } else if (offset === -1) {
      finalTranslateX = -150 // Left card
    } else if (offset === -2) {
      finalTranslateX = -250 // Further left card
    }

    return {
      transform: `translateX(${finalTranslateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity: 1,
      zIndex: zIndex,
      display: "block",
    }
  }

  const nextMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + teamMembers.length) % teamMembers.length)
  }

  return (
    <section id="team" className="relative py-16 md:py-24 bg-space-dark text-space-text overflow-hidden"
    style={{background:"url(/Team_Section.svg)"}}
    >
      
      {/* Blurred orange spheres */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-space-text animate-fade-in-up">
          Our Heads
        </h2>
        <div className="relative flex items-center justify-center h-[400px] md:h-[450px] lg:h-[500px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevMember}
            className="absolute left-0 md:left-10 z-20 bg-space-light/50 hover:bg-space-light text-space-text rounded-full p-2 shadow-lg animate-glow-sm"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative w-full h-full flex justify-center items-center">
            {teamMembers.map((member, index) => {
              const { transform, opacity, zIndex, display } = getCardTransform(index, teamMembers.length, currentIndex)
              return (
                <Card
                  key={member.id}
                  className="absolute bg-space-light border border-space-subtle shadow-xl transition-all duration-500 ease-in-out origin-center"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    display,
                    width: "320px", // Fixed width for cards
                    height: "auto", // Adjust height based on content
                    padding: "24px",
                    left: "50%",
                    marginLeft: "-160px", // Half of width for centering
                  }}
                >
                  <CardContent className="flex flex-col items-center text-center p-0">
                    <img
                      src={member.image || "/placeholder.svg"}
                      width={120}
                      height={120}
                      alt={member.name}
                      className="rounded-full object-cover mb-4 border-4 border-space-accent shadow-md"
                    />
                    <CardTitle className="text-2xl font-bold text-space-text mb-2">{member.name}</CardTitle>
                    <CardDescription className="text-space-accent text-lg mb-4">{member.role}</CardDescription>
                    <p className="text-space-text/90 mb-6 text-sm">{member.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-space-accent transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                      <a
                        href={member.social.mail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-space-accent transition-colors"
                      >
                        <Mail className="h-6 w-6" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-space-text hover:text-space-accent transition-colors"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextMember}
            className="absolute right-0 md:right-10 z-20 bg-space-light/50 hover:bg-space-light text-space-text rounded-full p-2 shadow-lg animate-glow-sm"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  )
}
