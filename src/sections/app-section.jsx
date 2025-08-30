"use client"

import { useEffect, useRef, useState } from "react"


//images
import phone2 from "../assets/images/phone2.webp"
import phone1 from "../assets/images/phone1.webp"
import card1 from "../assets/images/card1.webp"
import card2 from "../assets/images/card2.webp"
import qr from "../assets/images/qr.png"
import member_card from "../assets/images/member_card.webp"
import event_card from "../assets/images/event_card.webp"


export default function AppSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      {
        threshold: 0.2,
      }
    )

    const currentRef = sectionRef.current // ✅ Cache ref

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])


  // Animation styles for images
  const getImageAnimation = (delay, initialX, initialY, initialRotate = 0) => ({
    opacity: isVisible ? 1 : 0,
    // The transform combines the -50%, -50% for centering with the animation offset
    transform: isVisible
      ? "translate(-50%, -50%) rotate(var(--rotate, 0deg))" // Final state, using CSS variable for rotation
      : `translate(calc(-50% + ${initialX}), calc(-50% + ${initialY})) rotate(${initialRotate}deg)`, // Initial state
    transition: `opacity 1s ease-out ${delay}ms, transform 1s ease-out ${delay}ms`,
  })

  // Responsive positioning for images
  const getImageStyle = (
    baseTop,
    baseLeft,
    baseWidth,
    baseRotate,
    desktopAdjustments = {},
    tabletAdjustments = {},
    mobileAdjustments = {},
  ) => {
    let top = baseTop
    let left = baseLeft
    let width = baseWidth
    let rotate = baseRotate

    if (windowWidth >= 1024) {
      // Desktop adjustments
      top = desktopAdjustments.top !== undefined ? desktopAdjustments.top : top
      left = desktopAdjustments.left !== undefined ? desktopAdjustments.left : left
      width = desktopAdjustments.width !== undefined ? desktopAdjustments.width : width
      rotate = desktopAdjustments.rotate !== undefined ? desktopAdjustments.rotate : rotate
    } else if (windowWidth >= 768) {
      // Tablet adjustments
      top = tabletAdjustments.top !== undefined ? tabletAdjustments.top : top
      left = tabletAdjustments.left !== undefined ? tabletAdjustments.left : left
      width = tabletAdjustments.width !== undefined ? tabletAdjustments.width : width
      rotate = tabletAdjustments.rotate !== undefined ? tabletAdjustments.rotate : rotate
    } else {
      // Mobile adjustments
      top = mobileAdjustments.top !== undefined ? mobileAdjustments.top : top
      left = mobileAdjustments.left !== undefined ? mobileAdjustments.left : left
      width = mobileAdjustments.width !== undefined ? mobileAdjustments.width : width
      rotate = mobileAdjustments.rotate !== undefined ? mobileAdjustments.rotate : rotate
    }

    return {
      position: "absolute",
      top: `${top}%`,
      left: `${left}%`,
      width: `${width}%`,
      "--rotate": `${rotate}deg`, // Use CSS variable for rotation
      objectFit: "contain",
      zIndex: 2, // Ensure images are above background
      filter: "drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.15))", // Stronger shadow for depth
    }
  }

  return (
    <section
      id="app"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh", // Ensure enough height for scroll animation
        backgroundColor: "#FFFFFF", // Explicitly white background
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Wavy orange line as a separate image overlay */}

      <picture>
        {/* Mobile background */}
        <source
          media="(max-width: 768px)"
          srcSet="/images/app_mob_bg.svg"
        />
        {/* Default (desktop) */}
        <img
          src="/images/App_section_bg.svg"
          alt="Wavy orange line background element"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
        />
      </picture>


      {/* Individual App Images - Meticulously positioned and sized */}
      {/* Image 1: Large phone on left (Member Card screen) */}
      <img
        src={phone2}
        loading="lazy"
        alt="Large phone showing member card screen"
        style={{
          ...getImageStyle(
            48, // baseTop
            25, // baseLeft
            10, // baseWidth
            0,
            { top: 25, left: 12, width: 15 }, // Desktop
            { top: 10, left: 20, width: 20 }, // Tablet
            { top: 10, left: 20, width: 30 }, // Mobile
          ),
          ...getImageAnimation(0, "-150px", "0", -10), // Animate from left
        }}
      />

      {/* Image 2: Top middle purple card (Skill&Tell) */}
      <img
        src={card1}
        loading="lazy"
        alt="Skill&Tell card with purple background"
        style={{
          ...getImageStyle(
            18, // baseTop
            48, // baseLeft
            16, // baseWidth
            -10, // baseRotate
            { top: 18, left: 32, width: 16, rotate: -10 }, // Desktop
            { top: 15, left: 65, width: 22, rotate: -10 }, // Tablet
            { top: 5, left: 45, width: 35, rotate: -5 }, // Mobile
          ),
          ...getImageAnimation(200, "0", "-150px", 20), // Animate from top
        }}
      />
      <img
        src={qr}
        loading="lazy"
        alt="Purple QR card"
        style={{
          ...getImageStyle(
            45, // baseTop
            70, // baseLeft
            20, // baseWidth
            5, // baseRotate
            { top: 30, left: 80, width: 15, rotate: -20 }, // Desktop
            { top: 50, left: 65, width: 28, rotate: 5 }, // Tablet
            { top: 25, left: 70, width: 40, rotate: 5 }, // Mobile
          ),
          ...getImageAnimation(600, "150px", "0", 10), // Animate from right
        }}
      />

      {/* Image 3: Top right white member card */}
      <img
        src={member_card}
        loading="lazy"
        alt="White member card"
        style={{
          ...getImageStyle(
            20, // baseTop
            78, // baseLeft
            20, // baseWidth
            15, // baseRotate
            { top: 20, left: 90, width: 20 }, // Desktop
            { top: 25, left: 85, width: 28 }, // Tablet
            { top: 15, left: 85, width: 50 }, // Mobile
          ),
          ...getImageAnimation(400, "150px", "-150px", -20), // Animate from top-right
        }}
      />

      {/* Image 4: Middle right purple QR card */}


      {/* Image 5: Bottom left small purple card (Event name) */}
      <img
        src={card2}
        loading="lazy"
        alt="Small purple event card"
        style={{
          ...getImageStyle(
            75, // baseTop
            28, // baseLeft
            18, // baseWidth
            -10, // baseRotate
            { top: 75, left: 10, width: 14, rotate: -10 }, // Desktop
            { top: 75, left: 10, width: 14, rotate: -10 }, // tab
            { top: 75, left: 25, width: 35, rotate: -10 }, // mobile
          ),
          ...getImageAnimation(800, "-150px", "150px", -15), // Animate from bottom-left
        }}
      />

      {/* Image 6: Bottom middle-left small QR card (Placeholder for the one on the orange line) */}
      <img
        src={event_card}
        loading="lazy"
        alt="Small QR card on orange line"
        style={{
          ...getImageStyle(
            85, // baseTop
            45, // baseLeft
            15, // baseWidth
            15, // baseRotate
            { top: 85, left: 30, width: 15, rotate: 15 }, // Desktop
            { top: 80, left: 55, width: 20, rotate: 15 }, // Tablet
            { top: 84, left: 34, width: 35, rotate: 15 }, // Mobile
          ),
          ...getImageAnimation(1000, "0", "150px", 20), // Animate from bottom
        }}
      />

      {/* Image 7: Bottom right phone (Login screen) */}
      <img
        src={phone1}
        loading="lazy"
        alt="Phone showing login screen"
        style={{
          ...getImageStyle(
            75, // baseTop
            80, // baseLeft
            18, // baseWidth
            0, // baseRotate
            { top: 85, left: 85, width: 18 }, // Desktop
            { top: 70, left: 75, width: 30 }, // Tablet
            { top: 90, left: 80, width: 25 }, // Mobile
          ),
          ...getImageAnimation(1200, "150px", "150px", -10), // Animate from bottom-right
        }}
      />

      {/* Centered Download App Button */}
      <div
        className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center h-full"
      >
        <h2
          className="titles mb-6 text-neutral-600 font-extrabold"
        >
          S&T App
        </h2>

        <p
          className="leading-7 text-center max-w-xl mx-auto text-neutral-400 mb-6 text-sm"
        >
          Lorem ipsum dolor sit amet consectetur. Tellus mi id purus pulvinar molestie
          neque semper arcu. Sodales nunc sed amet nunc dui quam ridiculus ornare.
        </p>

        <button className="botao pointer bg-accent-400 rounded-4xl">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mysvg"
          >
            <g id="Interface / Download">
              <path
                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                stroke="#f1f1f1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          <span className="texto flex justify-between">
            <p className="mr-2">Download</p> <img src="/icons/download.svg" className="mr-2" alt="" aria-hidden="true"/>
          </span>
        </button>
      </div>




    </section>
  )
}
