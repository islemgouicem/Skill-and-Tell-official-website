import React, { useState, useEffect, useRef, Suspense } from "react"
import Logo from "./Logo.jsx"

// Lazy load mobile navbar
import MobileNavbar from "./MobileNavbar.jsx"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const hideTimeoutRef = useRef(null)

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Statistics", href: "#statistics" },
    { name: "Events", href: "#events" },
    { name: "App", href: "#app" },
    { name: "F&Q", href: "#more-about" },
    { name: "Contacts", href: "#contacts" }
  ]

  const handleNavLinkClick = (e, href) => {
    e.preventDefault()
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const startHideTimer = (delay = 5000) => {
    clearTimeout(hideTimeoutRef.current)
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), delay)
  }

  const showNavbar = () => {
    setIsVisible(true)
    startHideTimer()
  }

  useEffect(() => {
    const handleScroll = showNavbar
    const handleMouseMove = (e) => e.clientY <= 100 && showNavbar()
    const handleMouseLeave = () => startHideTimer(1000)

    showNavbar()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-none"
        onMouseEnter={showNavbar}
      />

      <header
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out backdrop-blur-sm shadow-lg ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } bg-gradient-to-br navbar-bg`}
        onMouseEnter={showNavbar}
        onMouseLeave={() => !isOpen && startHideTimer(2000)}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <a href="#hero" className="flex items-center gap-2" onClick={(e) => handleNavLinkClick(e, "#hero")}>
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-space-text text-lg font-medium hover:text-[#d7aeff] transition-colors relative group px-2 py-1 rounded-md"
                onClick={(e) => handleNavLinkClick(e, href)}
              >
                {name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#d7aeff] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Lazy Mobile Navbar */}
          <Suspense fallback={<div />}>
            <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
          </Suspense>
        </div>
      </header>
    </>
  )
}

export default React.memo(Navbar)
