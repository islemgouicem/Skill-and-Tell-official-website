"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "./ui/button.jsx"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.jsx"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
    <header
      className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-sm shadow-lg`}
      style={{
        background:"linear-gradient(190deg, rgba(26, 1, 50, 0.4) 0%, rgba(215, 174, 255, 0.4) 100%)"
      }}
    >

      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a href="#hero" className="flex items-center gap-2" onClick={(e) => handleNavLinkClick(e, "#hero")}>
          {/* User: Place your logo here at public/logo.png */}
          <img
            src="/logo.png?height=40&width=40"
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
          {/* <Button className="ml-4 bg-gradient-to-r from-space-accent to-space-glow text-space-dark hover:from-space-glow hover:to-space-accent transition-all duration-300 shadow-lg hover:shadow-space-glow/50 animate-glow-sm">
            Register Now
          </Button> */}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-space-text">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-space-dark border-space-subtle text-space-text">
            <a href="#hero" className="flex items-center gap-2 mb-6" onClick={(e) => handleNavLinkClick(e, "#hero")}>
              <img src="/placeholder.svg?height=40&width=40" width={40} height={40} alt="Skill & Tell Logo" />
              <span className="text-2xl font-bold tracking-wider">Skill & Tell</span>
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
              <Button className="mt-4 bg-gradient-to-r from-space-accent to-space-glow text-space-dark hover:from-space-glow hover:to-space-accent transition-all duration-300 shadow-lg">
                Register Now
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
