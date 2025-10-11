"use client"

import React, { useEffect, useRef, useState } from "react"
import whitebg from "../assets/images/white_bg.webp"

// Helper component for animating numbers
const AnimatedNumber = ({ value, isVisible, delay }) => {
  const [currentValue, setCurrentValue] = useState(0)
  const targetValue = Number.parseInt(value.replace("+", ""), 10) // Extract number, remove '+'

  useEffect(() => {
    if (!isVisible) {
      setCurrentValue(0) // Reset when not visible
      return
    }

    let startTimestamp = null
    const duration = 1500 // Animation duration in ms
    const startDelay = delay // Stagger start based on parent delay

    const animate = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = timestamp - startTimestamp
      const percentage = Math.min(progress / duration, 1)
      const animated = Math.floor(percentage * targetValue)
      setCurrentValue(animated)

      if (progress < duration) {
        requestAnimationFrame(animate)
      } else {
        setCurrentValue(targetValue) // Ensure it ends on target
      }
    }

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate)
    }, startDelay)

    return () => clearTimeout(timeoutId)
  }, [isVisible, targetValue, delay])

  return (
    <p
    className="text-accent-300 font-futura_bold"
      style={{
        fontSize: "2.5rem", // Reduced from 3rem (text-5xl) to 2.5rem (approx text-4xl)
        lineHeight: "1",
        marginBottom: "0.5rem", // mb-2
      }}
    >
      {currentValue}+
    </p>
  )
}

function StatisticsSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    const currentSection = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // observer.disconnect(); // Keep observing if we want to re-animate on scroll back up
        } else {
          setIsVisible(false) // Reset visibility when out of view
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      },
    )

    if (currentSection) {
      observer.observe(currentSection)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  const stats = [
    {
      value: "5+",
      label: "Annual Events",
      description:
        "We organize exciting events every year—from hands-on workshops to national competitions—bringing innovation and collaboration to life.",
    },
    {
      value: "200+",
      label: "Members participated",
      description: "Our community keeps growing, with over 200 passionate students actively engaging in Skill&Tell's events and competitions."
    },
    {
      value: "10+",
      label: "Partner Clubs/Organizations",
      description:"We proudly collaborate with clubs and organizations across Algeria to expand learning, share knowledge, and build real-world skills."
    },
  ]

  // Inline styles for the fade-in-up animation
  const getAnimationStyles = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`, // Increased duration for smoother animation
  })

  // Determine grid columns based on window width
  const getGridColumns = () => {
    if (windowWidth >= 1024) {
      return "repeat(3, minmax(0, 1fr))" // lg:grid-cols-3
    } else if (windowWidth >= 640) {
      return "repeat(2, minmax(0, 1fr))" // sm:grid-cols-2
    }
    return "repeat(1, minmax(0, 1fr))" // grid-cols-1
  }


  // Responsive font sizes for paragraph
  const getParagraphFontSize = () => {
    if (windowWidth >= 768) {
      return "1rem" // Reduced from 1.25rem (md:text-xl) to 1.125rem (approx md:text-lg)
    }
    return "0.8rem" // Reduced from 1.125rem (text-lg) to 1rem (approx text-base)
  }

  return (
    <section
      id="statistics"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "4rem 1rem", // Adjusted padding for overall section
        minHeight: "calc(100vh-5rem)", // Ensure enough height for scroll animation to be visible
        backgroundColor: "#F8F5FF", // light-purple
        color: "#6B7280", // medium-grey
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center content horizontally
      }}
    >
      {/* Background image - Re-added as per your original code */}
      <img
        src={whitebg}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "90%", // w-[90%]
          height: "auto", // h-auto
          objectFit: "cover", // object-cover
          pointerEvents: "none", // pointer-events-none
          userSelect: "none", // select-none
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1200px", // container mx-auto
          width: "100%", // Ensure it takes full width up to max-width
          margin: "0 auto",
          paddingLeft: "1rem", // px-4
          paddingRight: "1rem", // px-4
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center content within this wrapper
        }}
      >
        {/* Div for Title and Paragraph */}
        <div
          style={{
            marginBottom: "3rem", // Space between text and cards
            width: "100%", // Ensure it takes full width
            ...getAnimationStyles(0), // Animation for this block
          }}
        >
          <h2 className="titles"
            style={{
              textAlign: "center",
              marginBottom: "1rem",
              color: "#222631",
            }}
          >
            Some Statistics
          </h2>
          <p
            style={{
              fontSize: getParagraphFontSize(),
              lineHeight: "1.75rem",
              textAlign: "center",
              maxWidth: "42rem", // max-w-2xl
              margin: "0 auto", // Center paragraph
              color: "#6B7280", // medium-grey
            }}
          >
            Discover the impact we've made through numbers. From active members to successful events and 
            collaborations, these stats reflect our community’s growth, dedication, and shared passion for 
            learning and innovation.
          </p>
        </div>

        {/* Div for Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(), // Responsive grid columns
            gap: "2rem", // gap-8
            alignItems: "flex-start", // Align items to the top to allow middle card elevation
            width: "100%", // Ensure it takes full width
            paddingTop: windowWidth >= 1024 ? "4rem" : "0", // Add top padding to prevent middle card overlap
          }}
        >
          {stats.map((stat, index) => {
            const isMiddleCard = index === 1 && windowWidth >= 1024
            const cardTransform = isVisible
              ? isMiddleCard
                ? "translateY(-4rem)" // Elevated for middle card on large screens
                : "translateY(0)" // Normal position
              : "translateY(20px)" // Initial hidden state for animation

            const cardShadow = isMiddleCard
              ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" // Stronger shadow for elevated card
              : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" // Default shadow

            return (
              <div
                key={index}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 15px 15px -5px rgba(0, 0, 0, 0.1)" // Even stronger on hover
                  e.currentTarget.style.transform = isMiddleCard ? "translateY(-4.5rem) scale(1.02)" : "scale(1.02)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = cardShadow // Revert to original shadow
                  e.currentTarget.style.transform = cardTransform // Revert to original transform
                }}
                style={{
                  backgroundColor: "#FFFFFF", // bg-white
                  padding: "1.5rem", // Reduced from 2rem (p-8) to 1.5rem (p-6)
                  borderRadius: "0.75rem", // rounded-xl
                  boxShadow: cardShadow, // Dynamic shadow
                  border: "1px solid #E0E0E0", // border-[#E0E0E0]
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  textAlign: "start",
                  transform: cardTransform, // Dynamic transform
                  transition: `transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, opacity 0.8s ease-out ${
                    200 + index * 100
                  }ms`, // Smooth transition for elevation, shadow, and animation
                  opacity: isVisible ? 1 : 0, // Initial hidden state for animation
                  // Conditional centering for the third card on sm breakpoint
                  ...(index === 2 && windowWidth >= 640 && windowWidth < 1024
                    ? { gridColumn: "1 / -1", justifySelf: "center" } // Span full width and center
                    : {}),
                }}
              >
                <AnimatedNumber value={stat.value} isVisible={isVisible} delay={200 + index * 100} />
                <p
                className="font-futura_md_bt text-neutral-500"
                  style={{
                    fontSize: "1.125rem", // Reduced from 1.25rem (text-xl) to 1.125rem (approx text-lg)
                    lineHeight: "1.75rem",
                    marginBottom: "1rem", // mb-4
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: "1rem", // text-base (kept as is)
                    lineHeight: "1.5rem",
                    color: "#6B7280", // medium-grey
                  }}
                >
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default React.memo(StatisticsSection)