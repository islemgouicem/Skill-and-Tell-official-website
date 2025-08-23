"use client"

import { Button } from "../components/ui/button.jsx"
import Shield from "../components/ui/shield_badge.jsx"
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar.jsx"
import HeroSpline from "../components/ui/spline_3d.jsx"
import gurl from "../lib/image-util.js"


export default function HeroSection({ onRegisterClick }) {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center text-space-text bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${gurl('images/background.svg')})` }}
    >
      {/* <HeroSpline /> */}

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
        <p className="max-w-3xl text-md md:text-xl text-white/70 mb-6">
          Start your journey with our creative, inspiring and welcoming club, where skills are sharpened,
          ideas come to life, collaboration thrives, and passion, fun, and excitement pave the way for success!
        </p>
        <Button
          onClick={onRegisterClick}
          className="bg-gradient-to-r from-[#FF6D00]/0 from-[-12.06%] to-[#FF6D00] to-[99.97%] 
          drop-shadow-[5px_5px_4px_rgba(0,0,0,0.2)] text-white hover:from-[#FF6D00] 
          hover:to-[rgba(255,109,0,0)] text-xl px-5 py-5 sm:px-6 sm:py-6 rounded-md transition-colors 
          ease-in-out duration-700 border border-Main-300/50"
        >
          Register Now
        </Button>
      </div>

      {/* Floating Statistic Badges */}

      {/* Members */}
      <div
        className="badges absolute top-[20%] left-4 md:top-[32%] md:left-[6%] xl:top-[29%] xl:left-[8.5%] 
        rounded-full py-2 px-4 flex items-center space-x-2 border-1 border-white/50
        transform -rotate-10 hover:scale-105 transition-transform duration-300 z-20"
      >
        <div className="flex -space-x-2 overflow-hidden">
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src={`${gurl('images/Ellipse_1.png')}?height=32&width=32`} alt="Member 1" />
            <AvatarFallback>M1</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src={`${gurl('images/Ellipse_2.png')}?height=32&width=32`} alt="Member 2" />
            <AvatarFallback>M2</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarImage src={`${gurl('images/Ellipse_3.png')}?height=32&width=32`} alt="Member 3" />
            <AvatarFallback>M3</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-sm md:text-base font-semibold drop-shadow-sm jusitfy-start"><p className="text-[#ff6d00] font-bold">534+</p> Members</span>
      </div>

      {/* participants */}
      <div
        className="badges absolute top-[18%] left-[78%] 
        rounded-full py-2 px-4 flex flex-col items-center space-x-2 border-1 border-white/50
        transform rotate-10 hover:scale-105 transition-transform duration-300 z-20 overflow-hidden"
      >
          
        <p className="text-[#ff6d00] font-bold">400+</p>
        <p className="text-sm md:text-base font-semibold drop-shadow-sm jusitfy-start">Participants In Events</p>
      </div>
      {/* projects */}
      <div
        className="badges absolute top-[80%] left-[7%] 
        rounded-full py-2 px-8 flex flex-col justify-center space-x-2 border-1 border-white/50
        transform -rotate-12 hover:scale-105 transition-transform duration-300 z-20 overflow-hidden"
      >
          
        <p className="text-[#ff6d00] font-bold">4+</p>
        <p className="text-sm md:text-base font-semibold drop-shadow-sm jusitfy-start">Projects</p>
      </div>
      <div className="absolute top-[70%] left-[78%] transform hover:scale-105 transition-transform duration-300">
        <Shield className="w-40 h-40"/>
      </div>

    </section>
  )
}