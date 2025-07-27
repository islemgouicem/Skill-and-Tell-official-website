"use client"

import { Button } from "../components/ui/button.jsx"
import { Avatar,AvatarImage,AvatarFallback } from "../components/ui/avatar.jsx"

function ShieldBadge({ children, className }) {
  return (
    <div
      className={`relative bg-space-light/70 border border-space-subtle shadow-lg backdrop-blur-sm p-4 rounded-xl flex flex-col items-center justify-center w-[120px] h-[140px] ${className}`}
    >
      <div className="absolute bottom-[-10px] w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-space-light/70"></div>
      <div className="absolute bottom-[-11px] w-0 h-0 border-l-[11px] border-r-[11px] border-t-[11px] border-l-transparent border-r-transparent border-t-space-subtle"></div>
      {children}
    </div>
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center text-space-text bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url('/background.svg')" }}
    >
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[55vh] md:h-[50vh] lg:h-[45vh] overflow-hidden z-10 pointer-events-none">
        <spline-viewer
          url="https://prod.spline.design/SPeUB6kJeccOWbLo/scene.splinecode"
          // Adjusted height and vertical translation for better scaling on different screen sizes
          class="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] -translate-y-[10vh] md:-translate-y-[15vh] lg:-translate-y-[20vh]"
        ></spline-viewer>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-24 lg:py-32 animate-fade-in-up">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight 
        text-space-text drop-shadow-lg"
        >
          Start your journey with <br />
          <span
            className="text-space-accent"
            style={{
              color: "#422352",
              background: "linear-gradient(90deg,#FF6D00,#8A38F5)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextStroke: "0.06em transparent",
              letterSpacing: "0.05em",
            }}
          >
            Skill&amp;Tell
          </span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-space-text/90 mb-6">
          Skill & Tell is a scientific club dedicated to fostering curiosity, innovation, and collaboration among
          aspiring minds.
        </p>
        <Button
          className="bg-gradient-to-r from-[rgba(255,109,0,0)] to-[#FF6D00] text-white 
          shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:from-[#FF6D00] hover:to-[rgba(255,109,0,0)] 
          text-xl px-5 py-5 sm:px-6 sm:py-6 rounded-xl transition-all ease-in-out duration-700"
        >
          Register Now
        </Button>
      </div>

      {/* Floating Statistic Badges */}

      {/* Members */}
      <div
        className="absolute top-[20%] left-4 md:top-[32%] md:left-[6%] xl:top-[32%] xl:left-[6%] 
        rounded-full py-2 px-4 flex items-center space-x-2 
        backdrop-blur-sm transform -rotate-10 hover:scale-105 transition-transform duration-300 z-20"
        style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
        }}
      >
        <div className="flex -space-x-2 overflow-hidden">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src="/Ellipse_1.png?height=32&width=32" alt="Member 1" />
            <AvatarFallback>M1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src="/Ellipse_2.png?height=32&width=32" alt="Member 2" />
            <AvatarFallback>M2</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src="/Ellipse_3.png?height=32&width=32" alt="Member 3" />
            <AvatarFallback>M3</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-sm md:text-base font-semibold drop-shadow-sm jusitfy-start"><p className="text-[#ff6d00] font-bold">534+</p> Members</span>
      </div>

      {/* Events */}
      {/* <div className="absolute top-[10%] right-4 md:top-[15%] md:right-[10%] lg:top-[18%] lg:right-[15%] xl:top-[20%] xl:right-[20%] bg-space-light/70 border border-space-subtle rounded-full py-2 px-4 shadow-lg backdrop-blur-sm transform rotate-6 hover:scale-105 transition-transform duration-300 z-20">
        <span className="text-space-text text-sm md:text-base font-semibold drop-shadow-sm">
          400+ Participants in Events
        </span>
      </div> */}

      {/* Projects */}
      {/* <div className="absolute bottom-[25%] left-4 md:bottom-[20%] md:left-[10%] lg:bottom-[22%] lg:left-[15%] xl:bottom-[25%] xl:left-[20%] bg-space-light/70 border border-space-subtle rounded-lg py-2 px-4 shadow-lg backdrop-blur-sm transform rotate-3 hover:scale-105 transition-transform duration-300 z-20">
        <span className="text-space-text text-sm md:text-base font-semibold drop-shadow-sm">50+ Projects</span>
      </div> */}

      {/* Shield Badge for Years */}
      {/* <ShieldBadge
        className="fixed bottom-0 right-4 md:right-6 lg:right-8 translate-y-[calc(100%-40px)] 
          md:translate-y-[calc(100%-48px)] lg:translate-y-[calc(100%-56px)] z-50 transform -rotate-6 
          hover:scale-105 transition-transform duration-300"
      >

        <div className="flex -space-x-2 mb-2">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Year 1" />
            <AvatarFallback>Y1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Year 2" />
            <AvatarFallback>Y2</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-space-text text-sm md:text-base font-semibold drop-shadow-sm">5+ Years</span>
      </ShieldBadge> */}
    </section>
  )
}
