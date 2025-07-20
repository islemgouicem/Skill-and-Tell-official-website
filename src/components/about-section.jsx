import { Lightbulb, Rocket, Users, Award } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-[#F7F0FF] text-space-text overflow-hidden">
      <div className="grid-pattern"></div> {/* Subtle grid pattern */}
      {/* Blurred orange spheres */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float animation-delay-2000"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-8xl md:text-8xl font-bold text-center mb-12 text-[#222631] animate-fade-in-up">
          Who Are We?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-space-light p-6 rounded-xl shadow-lg border border-space-subtle hover:shadow-space-glow/30 transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Lightbulb className="h-8 w-8 text-space-accent" />
                <h3 className="text-2xl font-semibold text-space-text">About Us</h3>
              </div>
              <p className="text-space-text/90">
                Skill & Tell is a vibrant community where science meets passion. We provide a platform for students to
                explore, learn, and share their scientific interests through engaging activities and projects.
              </p>
            </div>
            <div className="bg-space-light p-6 rounded-xl shadow-lg border border-space-subtle hover:shadow-space-glow/30 transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Rocket className="h-8 w-8 text-space-accent" />
                <h3 className="text-2xl font-semibold text-space-text">Our Vision</h3>
              </div>
              <p className="text-space-text/90">
                To inspire the next generation of scientists and innovators, fostering a culture of curiosity, critical
                thinking, and collaborative problem-solving.
              </p>
            </div>
          </div>

          {/* Central Phone Mockup */}
          <div className="flex justify-center items-center animate-float">
            {/* User: Place your app screenshot/mockup here at public/about-app-mockup.png */}
            <img
              src="/phone.png?height=500&width=300"
              width={300}
              height={500}
              alt="Skill & Tell App Mockup"
              className="object-contain rounded-3xl shadow-2xl  border-space-subtle"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-8 animate-fade-in-up animation-delay-200">
            <div className="bg-space-light p-6 rounded-xl shadow-lg border border-space-subtle hover:shadow-space-glow/30 transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Users className="h-8 w-8 text-space-accent" />
                <h3 className="text-2xl font-semibold text-space-text">Our Specialty</h3>
              </div>
              <p className="text-space-text/90">
                We specialize in hands-on workshops, interactive seminars, and exciting competitions across various
                scientific disciplines, from robotics to astrophysics.
              </p>
            </div>
            <div className="bg-space-light p-6 rounded-xl shadow-lg border border-space-subtle hover:shadow-space-glow/30 transition-shadow duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Award className="h-8 w-8 text-space-accent" />
                <h3 className="text-2xl font-semibold text-space-text">Our Achievements</h3>
              </div>
              <p className="text-space-text/90">
                Proudly hosted 50+ successful events, engaged over 1000 participants, and fostered numerous
                award-winning projects in national competitions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
