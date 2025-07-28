"use client"

import { useState, useEffect, useCallback } from "react"
import { Tag } from "lucide-react"
// import { Button } from "./ui/button.jsx" // Original commented import
import { Card, CardDescription, CardTitle } from "../components/ui/card.jsx" // Original import path
import events from "../data/events.json" // Original import path
import gurl from "../lib/image-util.js"

export default function EventsSection() {
  const [activeIndex, setActiveIndex] = useState(0) // First card open by default
  const [currentStartIndex, setCurrentStartIndex] = useState(0) // Index of the first visible card
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    handleResize() // Set initial width
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Helper to get responsive settings
  const getCarouselSettings = useCallback((width) => {
    if (width >= 1024) return { cardsToShow: 7, activeCardWidth: 450, inactiveCardWidth: 80 } // Desktop
    if (width >= 768) return { cardsToShow: 4, activeCardWidth: 380, inactiveCardWidth: 80 } // Tablet
    return { cardsToShow: 2, activeCardWidth: 280, inactiveCardWidth: 80 } // Mobile
  }, [])

  const { cardsToShow, activeCardWidth, inactiveCardWidth } = getCarouselSettings(windowWidth)
  const cardGap = 16 // gap-4 is 16px

  // Get the indices of currently visible cards (no circular behavior)
  const getVisibleCardIndices = useCallback(() => {
    const indices = []
    for (let i = 0; i < cardsToShow && (currentStartIndex + i) < events.length; i++) {
      indices.push(currentStartIndex + i)
    }
    return indices
  }, [currentStartIndex, cardsToShow])

  const visibleCardIndices = getVisibleCardIndices()

  // Check if we can navigate
  const canGoNext = currentStartIndex + cardsToShow < events.length
  const canGoPrev = currentStartIndex > 0

  // Navigation functions
  const nextEvent = () => {
    if (!canGoNext) return
    setActiveIndex(-1) // Close any open card
    setCurrentStartIndex(prevIndex => prevIndex + 1)
  }

  const prevEvent = () => {
    if (!canGoPrev) return
    setActiveIndex(-1) // Close any open card
    setCurrentStartIndex(prevIndex => prevIndex - 1)
  }

  const handleCardClick = (index) => {
    // Only allow clicking on visible cards
    if (!visibleCardIndices.includes(index)) return

    if (index === activeIndex) {
      setActiveIndex(-1) // Close if already active
    } else {
      setActiveIndex(index) // Open the clicked card
    }
  }

  // Calculate the width for each card based on its state
  const getCardWidth = (index) => {
    if (!visibleCardIndices.includes(index)) return 0
    return index === activeIndex ? activeCardWidth : inactiveCardWidth
  }

  // Calculate total width of visible cards
  const getTotalVisibleWidth = () => {
    const widths = visibleCardIndices.map(index => getCardWidth(index))
    const totalCardsWidth = widths.reduce((sum, width) => sum + width, 0)
    const totalGapWidth = (widths.length - 1) * cardGap
    return totalCardsWidth + totalGapWidth
  }


  return (
    <section
      id="events"
      className="relative py-8 md:py-10 bg-space-dark text-space-text overflow-hidden"
      style={{ background: `url(${gurl('Events_Section.svg')})` }} // Original background image path
    >
      {/* Blurred orange spheres */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="titles text-center mb-12 text-space-text animate-fade-in-up">
          Our Events
        </h2>

        <div className="relative flex items-center justify-center h-[450px] md:h-[500px] lg:h-[550px]">
          {/* Navigation Arrows */}
          <button
            onClick={prevEvent}
            disabled={!canGoPrev}
            className={`absolute left-0 md:left-10 z-20 p-1 transition-all duration-300 ${!canGoPrev ? 'opacity-30 cursor-not-allowed' : 'hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]'
              }`}
          >
            <img
              src={`${gurl("left.png")}`}
              alt="Previous"
              className="h-16 w-auto transition-all duration-300"
            />
          </button>

          {/* Carousel Viewport - Fixed container that shows only visible cards */}
          <div className="relative overflow-hidden mx-auto" style={{
            width: `${getTotalVisibleWidth()}px`,
            maxWidth: `${windowWidth - 200}px`,
            minWidth:'100%',
            height: '100%'
          }}>
            <div
              className="flex items-center gap-4 h-full transition-all duration-500 ease-in-out"
              style={{
                justifyContent: 'center',
                width: 'fit-content',
                margin: '0 auto'
              }}
            >
              {events.map((event, index) => {
                const isVisible = visibleCardIndices.includes(index)
                const isActive = index === activeIndex
                const cardWidth = getCardWidth(index)

                return (
                  <Card
                    key={event.id}
                    onClick={() => handleCardClick(index)}
                    className={`relative frosted-glass rounded-xl shadow-xl border border-space-subtle cursor-pointer 
                      transition-all duration-500 ease-in-out flex-shrink-0 h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden
                      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    style={{
                      width: `${cardWidth}px`,
                      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                    }}
                  >
                    {/* Collapsed State */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"
                        }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <div className="text-space-text text-xl font-bold transform -rotate-90 whitespace-nowrap">
                          {event.title.split(" ")[0]}
                        </div>
                      </div>
                    </div>

                    {/* Expanded State */}
                    <div
                      className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-space-glow text-3xl font-bold">{event.id}</div>
                        <div className="text-space-text/70 text-sm">{event.date}</div>
                      </div>

                      <div className="flex-grow">
                        <CardTitle className="text-2xl font-bold text-space-text mb-2">
                          {event.title}
                        </CardTitle>
                        <CardDescription className="text-space-text/90 text-sm mb-4 max-h-[120px] overflow-y-auto">
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

                      <div className="relative w-full h-[40%] mt-4 rounded-lg overflow-hidden">
                        <img
                          src={`${gurl(event.image)}` || `${gurl("/placeholder.svg")}`}
                          alt={event.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <button
            onClick={nextEvent}
            disabled={!canGoNext}
            className={`absolute right-0 md:right-10 z-20 p-1 transition-all duration-300 ${!canGoNext ? 'opacity-30 cursor-not-allowed' : 'hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]'
              }`}
          >
            <img
              src={`${gurl("right.png")}`}
              alt="Next"
              className="h-16 w-auto transition-all duration-300"
            />
          </button>
        </div>
      </div>
    </section>
  )
}