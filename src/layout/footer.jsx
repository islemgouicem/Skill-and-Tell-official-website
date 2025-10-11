import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contacts" className="bg-footer-background text-footer-text pt-12 md:pt-16 relative overflow-hidden">
      <div className="container max-w-[1600px] mx-auto px-8 md:px-14 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">

        {/* Logo and Description */}
        <div className="space-y-4">
          <a href="#hero" className="flex items-center gap-2" aria-label="logo">
            {/* User: Place your logo here at public/logo.png */}
            <img src="/images/logo_dark.png?height=60&width=60" width={150} height={150} alt="Skill & Tell Logo" />
          </a>
          <p className="text-sm text-footer-text/80 max-w-xs">
            A community of learners and innovators.
            Together we share skills, ideas, and growth.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-footer-text"></h3>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#team" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  Heads
                </a>
              </li>
              <li>
                <a href="#statistics" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  Statistics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-footer-text"></h3>
            <ul className="space-y-2">
              <li>
                <a href="#events" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#app" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  App
                </a>
              </li>
              <li>
                <a href="#FQ" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  F&Q
                </a>
              </li>
              <li>
                <a href="https://miniarcadepuzzle.netlify.app/" target="_blank" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  Riddle-1
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social/Contact Buttons */}
        <div className="lg:col-span-1 space-y-4">
          <a
            href="https://www.instagram.com/skillntell.club?igsh=MTFzZ3dpMTY2cGV5bg=="
            className="socialm"
            target="_blank"
            rel="noopener noreferrer"
          // Instagram color
          >
            <img src="/icons/Instagram.svg" className="h-5 w-5" alt="instagram" />
            <span className="font-medium text-neutral-300">Follow us for updates!</span>
          </a>

          <a
            href="#"
            className="socialm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/Discord.svg" className="h-5 w-5" alt="discord" />
            <span className="font-medium text-neutral-300">Join our community</span>
          </a>
          <a
            href="https://www.linkedin.com/company/skill-tell-club/"
            className="socialm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/Linkedin.svg" className="h-5 w-5" alt="linkedin" />
            <span className="font-medium text-neutral-300" >Let's connect and collaborate</span>
          </a>
          <a
            href="mailto:skill.and.tell@ensia.edu.dz"
            className="socialm"
          >
            <img src="/icons/Gmail.svg" className="h-5 w-5" alt="Gmail" />
            <span className="font-medium text-neutral-300">Reach out for collaborations!</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto text-center text-md text-footer-text/60 border-footer-text/20 pt-8 relative z-10">
        <div className="w-[80%] mx-auto border-t border-footer-text/20"></div>
        <div className="flex items-center justify-center gap-2 my-4">
          &copy; Skill & Tell 2025. All rights reserved. Crafted with
          <Heart className="h-4 w-4 text-red-500 animate-pulse" />
        </div>
      </div>

    </footer>
  )
}
