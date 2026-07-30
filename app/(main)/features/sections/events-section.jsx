"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardDescription } from "../../../../components/ui/card";
import events from "../../../../data/skillntell/events.json";
import { useRouter } from "next/navigation";
import Image from "next/image";
//assets
import left from "../../../../assets/images/skillntell/left.png";
import right from "../../../../assets/images/skillntell/right.png";
// motion-wrapped Card so framer-motion can animate opacity/scale/width directly
const MotionCard = motion(Card);
function EventsSection() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const getCarouselSettings = useCallback((width) => {
        if (width >= 1024)
            return { cardsToShow: 7, activeCardWidth: 450, inactiveCardWidth: 80 };
        if (width >= 768)
            return { cardsToShow: 4, activeCardWidth: 380, inactiveCardWidth: 80 };
        return { cardsToShow: 1, activeCardWidth: 320, inactiveCardWidth: 80 };
    }, []);
    const { cardsToShow, activeCardWidth, inactiveCardWidth } = getCarouselSettings(windowWidth);
    const getVisibleCardIndices = useCallback(() => {
        const indices = [];
        for (let i = 0; i < cardsToShow && (currentStartIndex + i) < events.length; i++) {
            indices.push(currentStartIndex + i);
        }
        return indices;
    }, [currentStartIndex, cardsToShow]);
    const visibleCardIndices = getVisibleCardIndices();
    const canGoNext = currentStartIndex + cardsToShow < events.length;
    const canGoPrev = currentStartIndex > 0;
    const nextEvent = () => {
        if (!canGoNext)
            return;
        setActiveIndex(-1);
        setCurrentStartIndex(prevIndex => prevIndex + 1);
    };
    const prevEvent = () => {
        if (!canGoPrev)
            return;
        setActiveIndex(-1);
        setCurrentStartIndex(prevIndex => prevIndex - 1);
    };
    const handleCardClick = (index) => {
        if (!visibleCardIndices.includes(index))
            return;
        if (index === activeIndex) {
            setActiveIndex(-1);
        }
        else {
            setActiveIndex(index);
        }
    };
    const getCardWidth = (index) => {
        if (!visibleCardIndices.includes(index))
            return 0;
        if (window.innerWidth <= 768) {
            return activeCardWidth;
        }
        return index === activeIndex ? activeCardWidth : inactiveCardWidth;
    };
    return (<section id="events" className="relative py-8 md:py-10 bg-space-dark text-space-text overflow-hidden" style={{
            background: "url('images/Events_Section.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>

      <div className="container mx-auto relative z-10">
        <h2 className="titles mb-12 text-white">
          Our Events
        </h2>

        <div className="relative flex items-center justify-center h-[600px] md:h-[500px] lg:h-[550px]">
          {/* Navigation Arrows */}
          <button onClick={prevEvent} disabled={!canGoPrev} className={`absolute pointer left-0 lg:left-10 z-20 p-1 transition-all duration-300 ${!canGoPrev ? 'opacity-30 cursor-not-allowed' : 'hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]'}`}>
            <Image src={left} alt="Previous" height={400} width={300} className="h-16 w-auto transition-all duration-300"/>
          </button>

          {/* Carousel Viewport - Fixed container that shows only visible cards */}
          <div className="relative overflow-hidden mx-auto" style={{
            height: '100%'
        }}>
            <div className="flex items-center justify-center gap-4 h-full transition-all duration-500 ease-in-out" style={{
            width: 'fit-content',
            margin: '0 auto'
        }}>
              {events.map((event, index) => {
            const isVisible = visibleCardIndices.includes(index);
            const isMobile = window.innerWidth <= 768;
            const isActive = isMobile || index === activeIndex;
            const cardWidth = getCardWidth(index);
            const hasPath = Boolean(event.path);
            return (<MotionCard key={event.id} onClick={() => handleCardClick(index)} className={`pointer relative frosted-glass rounded-md shadow-xl border-1 border-Main-300/60 cursor-pointer no-scrollbar
                      flex-shrink-0 h-full
                      ${!isVisible ? 'pointer-events-none absolute' : ''}
                      ${event.path == "/arcade" ? 'incoming-event-moving-border' : ''}
                      `} initial={false} animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                    width: cardWidth,
                }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                    {/* --- Upcoming Badge --- */}
                    {(event.path == "/arcade" && isActive) && (<div className="absolute top-0 right-0 z-20 overflow-hidden w-28 h-28 pointer-events-none">
                        <div className="absolute top-5 -right-12 w-40 transform rotate-45 bg-[#ff0000]
                                      text-center text-white text-xs font-bold py-1 shadow-lg animate-fade-in-down">
                          Upcoming
                        </div>
                      </div>)}

                    {/* Collapsed State */}
                    <motion.div className="absolute pointer inset-0" initial={false} animate={{ opacity: isActive ? 0 : 1 }} transition={{ duration: 0.5 }}>
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <div className="text-space-text text-xl font-bold transform -rotate-90 whitespace-nowrap">
                          {event.title.split(" ")[0]}
                        </div>
                      </div>
                    </motion.div>

                    {/* Expanded State */}
                    <motion.div className="absolute inset-0 p-6 flex flex-col justify-between" initial={false} animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.5 }}>
                      <div className="relative w-full h-[45%] rounded-lg overflow-hidden group">
                        <button onClick={() => {
                    if (hasPath && isActive && event.path) {
                        router.push(event.path);
                    }
                }} className={`w-full h-full flex items-center justify-center p-0 border-none bg-transparent ${hasPath ? 'cursor-pointer' : 'cursor-default'}`}>
                          <Image src={`${event.image}` || "/images/placeholder.webp"} alt={event.title} height={400} width={300} loading="lazy" className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"/>

                          {/* Click to Discover Overlay - Shows for all events with paths */}
                          {(isActive && hasPath) && (<div className="absolute inset-0 bg-opacity-30 flex items-center justify-center text-white/60 hover:text-white 
                                                            text-lg font-bold opacity-90 transition-opacity duration-300">
                              CLICK TO DISCOVER
                            </div>)}
                        </button>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-space-glow text-3xl font-bold">{event.title}</div>
                          <div className="text-space-text/70 text-sm">{event.date}</div>
                        </div>

                        <div className="flex-grow ">
                          <CardDescription className="text-space-text/90 text-sm mb-4 max-h-[120px] overflow-y-auto">
                            {event.description}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2">
                            {event.tags.map((tag, tagIndex) => (<span key={tagIndex} className="bg-space-subtle text-space-text text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                <Tag className="h-3 w-3"/> {tag}
                              </span>))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </MotionCard>);
        })}
            </div>
          </div>

          <button onClick={nextEvent} disabled={!canGoNext} className={`absolute pointer right-0 lg:right-10 z-20 p-1 transition-all duration-300 ${!canGoNext ? 'opacity-30 cursor-not-allowed' : 'hover:filter hover:drop-shadow-[0_0_24px_rgba(138,43,226,1)]'}`}>
            <Image src={right} alt="Next" height={400} width={300} className="h-16 w-auto transition-all duration-300"/>
          </button>
        </div>
      </div>
    </section>);
}
export default React.memo(EventsSection);
