"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Tag } from "lucide-react"
import { Button } from "./ui/button.jsx"
import { Card, CardDescription, CardTitle } from "./ui/card.jsx"

export default function EventsSection() {
  const events = [
    {
      id: "01",
      title: "MobAI Hackathon",
      description: "Innovate and create AI-powered mobile solutions in our annual hackathon.",
      date: "01/01/25",
      time: "9:00 AM - 5:00 PM",
      tags: ["Tech", "Hackathon", "Competition"],
      image: "/placeholder.svg?height=300&width=400", // User: Replace with event images
    },
    {
      id: "02",
      title: "Cosmic Exploration",
      description: "A journey through the cosmos, exploring black holes and distant galaxies.",
      date: "02/15/25",
      time: "7:00 PM - 9:00 PM",
      tags: ["Astronomy", "Lecture", "Discovery"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "03",
      title: "Robotics Workshop",
      description: "Hands-on session to build and program your own mini-robot.",
      date: "03/02/25",
      time: "10:00 AM - 4:00 PM",
      tags: ["Robotics", "Workshop", "Engineering"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "04",
      title: "Quantum Physics Demystified",
      description: "An introductory seminar to the fascinating world of quantum mechanics.",
      date: "04/10/25",
      time: "6:00 PM - 8:00 PM",
      tags: ["Physics", "Seminar", "Theory"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "05",
      title: "Bio-Engineering Summit",
      description: "Exploring the latest advancements in genetic engineering and biotechnology.",
      date: "05/20/25",
      time: "9:00 AM - 6:00 PM",
      tags: ["Biology", "Engineering", "Summit"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextEvent = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % events.length)
  }

  const prevEvent = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length)
  }

  return (
    <section id="events" className="relative py-16 md:py-24 bg-space-dark text-space-text overflow-hidden"
    style={{background:"url(/Events_Section.svg)"}}
    >
      {/* Blurred orange spheres */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-space-text animate-fade-in-up">
          Our Events
        </h2>
        <div className="relative flex items-center justify-center h-[450px] md:h-[500px] lg:h-[550px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevEvent}
            className="absolute left-0 md:left-10 z-20 bg-space-light/50 hover:bg-space-light text-space-text rounded-full p-2 shadow-lg animate-glow-sm"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="flex items-center justify-center gap-4 h-full">
            {events.map((event, index) => {
              const isActive = index === activeIndex
              return (
                <Card
                  key={event.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative frosted-glass rounded-xl shadow-xl border border-space-subtle cursor-pointer transition-all duration-500 ease-in-out flex-shrink-0
                    ${isActive ? "w-[300px] md:w-[400px] lg:w-[500px]" : "w-[100px]"}
                    h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}
                  >
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="text-space-text text-2xl font-bold">{event.title.split(" ")[0]}</div>
                    </div>
                  </div>
                  <div
                    className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-space-glow text-4xl font-bold">{event.id}</div>
                      <div className="text-space-text/70 text-sm">{event.date}</div>
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-3xl font-bold text-space-text mb-2">{event.title}</CardTitle>
                      <CardDescription className="text-space-text/90 text-base mb-4">
                        {event.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-space-subtle text-space-text text-xs px-3 py-1 rounded-full flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" /> {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative w-full h-24 mt-4 rounded-lg overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextEvent}
            className="absolute right-0 md:right-10 z-20 bg-space-light/50 hover:bg-space-light text-space-text rounded-full p-2 shadow-lg animate-glow-sm"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </section>
  )
}
