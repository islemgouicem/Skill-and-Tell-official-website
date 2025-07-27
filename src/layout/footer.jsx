import { Instagram, DiscIcon as Discord, Linkedin, Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contacts" className="bg-footer-background text-footer-text py-12 md:py-16 relative overflow-hidden">
      <div className="container max-w-[1600px] mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
        {/* Logo and Description */}
        <div className="space-y-4">
          <a href="#hero" className="flex items-center gap-2">
            {/* User: Place your logo here at public/logo.png */}
            <img src="/logo_dark.png?height=60&width=60" width={150} height={150} alt="Skill & Tell Logo" />
          </a>
          <p className="text-sm text-footer-text/80 max-w-xs">
            Lorem ipsum dolor sit amet consectetur. Magnis fermentum tempus
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-2">
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
                <a href="#" className="text-footer-text/80 hover:text-footer-link transition-colors">
                  F&Q
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social/Contact Buttons */}
        <div className="lg:col-span-1 space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ color: "white", backgroundColor: "rgb(225, 48, 108)" }} // Instagram color
          >
            <Instagram className="h-5 w-5" />
            <span className="font-medium">Follow us for updates!</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ color: "white", backgroundColor: "rgb(114, 137, 218)" }} // Discord color
          >
            <Discord className="h-5 w-5" />
            <span className="font-medium">Join our community</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ color: "white", backgroundColor: "rgb(0, 119, 181)" }} // LinkedIn color
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-medium">Let's connect and collaborate</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-full px-6 py-3 shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{ color: "white", backgroundColor: "rgb(234, 67, 53)" }} // Gmail color
          >
            <Mail className="h-5 w-5" />
            <span className="font-medium">Reach out for collaborations!</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 text-center text-md text-footer-text/60 mt-12 border-t border-footer-text/20 pt-8 relative z-10">
        <div className="flex items-center justify-center gap-2">
          &copy; Skill & Tell 2025. All rights reserved. Crafted with
          <Heart className="h-4 w-4 text-red-500 animate-pulse" />
        </div>
      </div>

    </footer>
  )
}
