"use client"

import { useState, useEffect, useRef } from "react"
import { Menu } from "lucide-react"
import { Button } from "../components/ui/button.jsx"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet.jsx"
import gurl from "../lib/image-util.js"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const hideTimeoutRef = useRef(null)
  const lastScrollY = useRef(0)

  // Function to show navbar and reset hide timer
  const showNavbar = () => {
    setIsVisible(true)
    clearTimeout(hideTimeoutRef.current)

    // Set timer to hide navbar after 3 seconds of inactivity
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show navbar on scroll and reset timer
      showNavbar()

      lastScrollY.current = currentScrollY
    }

    const handleMouseMove = (e) => {
      // Show navbar when mouse is near the top (within 100px)
      if (e.clientY <= 100) {
        showNavbar()
      }
    }

    const handleMouseLeave = () => {
      // Start hide timer when mouse leaves the window
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false)
      }, 1000)
    }

    // Show navbar initially and set hide timer
    showNavbar()

    // Add event listeners
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      clearTimeout(hideTimeoutRef.current)
    }
  }, [])

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Statistics", href: "#statistics" },
    { name: "Events", href: "#events" },
    { name: "App", href: "#app" },
    { name: "Contacts", href: "#contacts" },
  ]

  const handleNavLinkClick = (e, href) => {
    e.preventDefault()
    const targetId = href.substring(1) // Remove '#'
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false) // Close mobile menu after clicking
    }
  }

  return (
    <>
      {/* Invisible hover area at the top of the screen */}
      <div className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-none" onMouseEnter={showNavbar} />

      <header
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out backdrop-blur-sm shadow-lg ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{
          background: "linear-gradient(190deg, rgba(26, 1, 50, 0.4) 0%, rgba(215, 174, 255, 0.4) 100%)",
        }}
        onMouseEnter={showNavbar}
        onMouseLeave={() => {
          // Only start hide timer if not hovering over mobile menu
          if (!isOpen) {
            hideTimeoutRef.current = setTimeout(() => {
              setIsVisible(false)
            }, 2000)
          }
        }}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <a href="#hero" className="flex items-center gap-2" onClick={(e) => handleNavLinkClick(e, "#hero")}>
            {/* User: Place your logo here at public/logo.png */}
            <img
              src={`${gurl("logo.png")}?height=40&width=40`}
              width={100}
              height={100}
              alt="Skill & Tell Logo"
              className=" hover:scale-110 transition-transform duration-300"
            />
            {/* <span className="text-2xl font-bold text-space-text tracking-wider hover:text-space-glow transition-colors duration-300">
              Skill & Tell
            </span> */}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-space-text text-lg font-medium hover:text-[#d7aeff] transition-colors relative group px-2 py-1 rounded-md"
                onClick={(e) => handleNavLinkClick(e, link.href)}
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#d7aeff] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-space-text">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-space-subtle w-[250px] text-space-text" 
            style={{background: "url(/background.svg)"}}>
              <a href="#hero" className="flex items-center gap-2 mb-6" onClick={(e) => handleNavLinkClick(e, "#hero")}>
                <img src={`${gurl("logo.png")}?height=60&width=60`} width={100} height={100} alt="Skill & Tell Logo" />
              </a>
              <nav className="grid gap-4 py-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="flex w-full items-center py-2 text-lg font-semibold hover:text-[#d7aeff] transition-colors"
                    onClick={(e) => handleNavLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
