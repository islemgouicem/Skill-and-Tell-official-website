"use client"
import { Button } from "../../../components/ui/button.jsx"
import Shield from "../../../components/ui/shield_badge.jsx"
import PopUp from "../../../components/ui/popup.jsx"
import { Avatar, AvatarImage, AvatarFallback } from "../../../components/ui/avatar.jsx"
import { useNavigate } from "react-router-dom";
// import HeroSpline from "../../../components/ui/spline_3d.jsx";
import { useState } from "react"


export default function HeroSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();


  const handleRegisterClick = () => {
    // const registeredEmail = localStorage.getItem("alreadyRegistered");
    // if (registeredEmail) { //registeredEmail
    //   navigate("/registered", {
    //     state: {
    //       title: "You're already registered",
    //       msg: "Thank you for registering. Please wait for our response, we'll get back to you soon."
    //     }
    //   });
    // } else {
    navigate("/registeration");
    // }
  };


  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  // const openingDate = new Date('2025-10-11T15:00:00');
  // const now = new Date();

  // const isOpen = now >= openingDate;

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center text-space-text bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background_c.webp')",
        backgroundSize: "cover",   // makes it scale and fill the section
        backgroundPosition: "center", // keeps it centered
        backgroundRepeat: "no-repeat", // avoids tiling
      }}
    >
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full z-10 pointer-events-none">
        <img
          src="/purpleplanet.png" // replace with your image path
          alt="Hero"
          className="w-full h-auto max-h-[90vh] md:max-h-[60vh] lg:max-h-[30vh] object-contain"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-4 translate-y-[-70px] sm:translate-y-0 animate-fade-in-up">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight 
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
        <p className="max-w-3xl text-sm md:text-lg text-white/70 mb-6">
          Start your journey with our creative, inspiring and welcoming club, where skills are sharpened,
          ideas come to life, collaboration thrives, and passion, fun, and excitement pave the way for success!
        </p>

        <Button
          onClick={handleRegisterClick}
          /*handleOpenPopup */
          className="bg-gradient-to-r from-[#FF6D00]/0 from-[-12.06%] to-[#FF6D00] to-[99.97%] 
            drop-shadow-[5px_5px_4px_rgba(0,0,0,0.2)] text-white 
            hover:from-[#FF6D00] hover:to-[rgba(255,109,0,0)] 
            text-xl px-5 py-5 sm:px-6 sm:py-6 rounded-md transition-color duration-1800
            border border-Main-300/50 pointer
            animate-grow"
        >
          Register Now
        </Button>



      </div>
      <PopUp isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={"Registration"}
        subtitle={"Closed for This Season"}
        msg={"Registration for this season has closed, but great things are ahead! Keep an eye out — we’ll be opening again with fresh opportunities next season."} />


      {/* Floating  Badges */}
      {/* Members */}
      <div
        className="badges absolute top-[15%] left-3 
        md:top-[32%] md:left-[6%] 
        xl:top-[29%] xl:left-[8.5%] 
        rounded-full py-1 px-2 md:py-2 md:px-4 
        flex items-center space-x-1 md:space-x-2 
        border border-white/50
        transform -rotate-6 md:-rotate-10 
        transition-transform animate-float [animation-delay:0s]
        z-20"
      >
        <div className="flex -space-x-1 md:-space-x-2 overflow-hidden">
          <Avatar className="w-6 h-6 md:w-8 md:h-8 border-1 border-white">
            <AvatarImage src="/images/managers/Khefif_Abderahim.JPG?height=32&width=32" alt="Member 1" />
            <AvatarFallback>M1</AvatarFallback>
          </Avatar>
          <Avatar className="w-6 h-6 md:w-8 md:h-8 border-1 border-white">
            <AvatarImage src="/images/managers/salamo.jpg?height=32&width=32" alt="Member 2" />
            <AvatarFallback>M2</AvatarFallback>
          </Avatar>
          <Avatar className="w-6 h-6 md:w-8 md:h-8 border-1 border-white">
            <AvatarImage src="/images/managers/badri.jpg?height=32&width=32" alt="Member 3" />
            <AvatarFallback>M3</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-xs md:text-sm xl:text-base font-semibold drop-shadow-sm">
          <p className="text-[#ff6d00] font-bold text-sm md:text-lg">534+</p> Members
        </span>
      </div>


      {/* participants */}
      <div
        className="badges absolute top-[12%] left-[67%] 
                    md:top-[18%] md:left-[78%] 
                    rounded-full py-1 px-2 md:py-2 md:px-4 
                    flex flex-col items-center 
                    border border-white/50
                    transform rotate-10  
                    transition-transform animate-float [animation-delay:2s]
                    z-20 overflow-hidden"
      >
        <p className="text-[#ff6d00] text-sm md:text-lg font-bold">400+</p>
        <p className="text-[10px] md:text-base font-semibold drop-shadow-sm">Participants In Events</p>
      </div>

      {/* projects */}
      <div
        className="badges absolute top-[60%] left-[4%] 
                    md:top-[80%] md:left-[7%] 
                    rounded-full py-1 px-5 md:py-2 md:px-8 
                    flex flex-col justify-center 
                    border border-white/50
                    transform -rotate-6 md:-rotate-12 
                     transition-transform
                    z-20 overflow-hidden animate-float [animation-delay:4s]"
      >
        <p className="text-[#ff6d00] text-sm md:text-xl font-bold">4+</p>
        <p className="text-[10px] md:text-base font-semibold drop-shadow-sm">Projects</p>
      </div>

      <div className="z-10 absolute rotate-12 top-[62%] left-[65%] md:top-[70%] md:left-[78%] 
      transform  transition-transform animate-float [animation-delay:6s]">
        <Shield />
      </div>

    </section>
  )
}