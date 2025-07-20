import { Button } from "./ui/button.jsx"
import { Users, CalendarDays, FlaskConical, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center text-space-text bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url('/background.svg')" }}
    >
      {/* <div className="starfield"></div> 
      <div className="grid-pattern"></div>  */}

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[300px] overflow-hidden z-10 pointer-events-none">
        <spline-viewer
          url="https://prod.spline.design/SPeUB6kJeccOWbLo/scene.splinecode"
          class="w-full h-[600px] -translate-y-[190px]"
        ></spline-viewer>
      </div>





      {/* Abstract glowing elements */}
      {/* <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-space-glow rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float animation-delay-4000"></div>
      <div className="absolute top-[10%] right-[10%] w-24 h-24 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-[5%] left-[5%] w-40 h-40 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float animation-delay-3000"></div> */}

      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-24 lg:py-32 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-space-text drop-shadow-lg">
          Start your journey with <br /><span className="text-space-accent">Skill&Tell</span>
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-space-text/90 mb-10">
          Skill & Tell is a scientific club dedicated to fostering curiosity, innovation, and collaboration among
          aspiring minds.
        </p>
        <Button
          className="bg-gradient-to-r from-[rgba(255,109,0,0)] to-[#FF6D00] text-white 
  shadow-[0_10px_20px_rgba(0,0,0,0.2)] 
  hover:from-[#FF6D00] hover:to-[#FFA726] 
  text-2xl px-8 py-8 rounded-xl 
  transition-all duration-300">
          Register Now
        </Button>



      </div>
      {/* Badges / Statistics - positioned in corners */}
      <div className="absolute top-20 left-10 z-10 animate-fade-in-up">
        <div className="bg-space-light/70 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg border border-space-subtle flex items-center gap-2">
          <Users className="h-6 w-6 text-space-glow" />
          <div>
            <span className="text-space-glow text-xl md:text-2xl font-bold">534+</span>
            <p className="text-xs md:text-sm text-space-text/80">Members</p>
          </div>
        </div>
      </div>
      <div className="absolute top-20 right-10 z-10 animate-fade-in-up animation-delay-200">
        <div className="bg-space-light/70 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg border border-space-subtle flex items-center gap-2">
          <CalendarDays className="h-6 w-6 text-space-glow" />
          <div>
            <span className="text-space-glow text-xl md:text-2xl font-bold">400+</span>
            <p className="text-xs md:text-sm text-space-text/80">Events</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 z-10 animate-fade-in-up animation-delay-400">
        <div className="bg-space-light/70 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg border border-space-subtle flex items-center gap-2">
          <FlaskConical className="h-6 w-6 text-space-glow" />
          <div>
            <span className="text-space-glow text-xl md:text-2xl font-bold">50+</span>
            <p className="text-xs md:text-sm text-space-text/80">Projects</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 z-10 animate-fade-in-up animation-delay-600">
        <div className="bg-space-light/70 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg border border-space-subtle flex items-center gap-2">
          <Star className="h-6 w-6 text-space-glow" />
          <div>
            <span className="text-space-glow text-xl md:text-2xl font-bold">5+</span>
            <p className="text-xs md:text-sm text-space-text/80">Years</p>
          </div>
        </div>
      </div>
    </section>
  )
}
