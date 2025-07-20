import { Button } from "./ui/button.jsx"
import { Download } from "lucide-react"

export default function AppSection() {
  return (
    <section id="app" className="relative py-16 md:py-24 bg-space-medium text-space-text overflow-hidden"
    >
      
      <div className="grid-pattern"></div>
      {/* Blurred orange spheres */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-space-text animate-fade-in-up">S&T App</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left animate-fade-in-up">
            <p className="text-lg md:text-xl text-space-text/90 mb-6 max-w-xl">
              Experience Skill & Tell on the go! Our mobile app brings the universe of scientific exploration right to
              your fingertips. Access events, resources, and connect with fellow enthusiasts.
            </p>
            <Button className="bg-space-accent text-space-dark hover:bg-space-accent/90 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-space-glow/50 transition-all duration-300 animate-glow">
              <Download className="h-6 w-6 mr-2" /> Download Now
            </Button>
            <div className="mt-8">
              {/* User: Place your QR code image here at public/app-qr-code.png */}
              <img
                src="/placeholder.svg?height=150&width=150"
                width={150}
                height={150}
                alt="QR Code for App Download"
                className="rounded-lg shadow-lg border border-space-subtle animate-float animation-delay-1000"
              />
              <p className="text-sm text-space-text/70 mt-2">Scan to download</p>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
            {/* Abstract shapes */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-space-glow rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float animation-delay-500"></div>
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float animation-delay-1500"></div>

            {/* User: Place your app mockup image here at public/app-mockup.png */}
            <img
              src="/placeholder.svg?height=600&width=800"
              width={800}
              height={600}
              alt="Skill & Tell App Interface"
              className="object-contain rounded-xl shadow-2xl border-4 border-space-subtle animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
