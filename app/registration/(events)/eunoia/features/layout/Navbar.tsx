"use client"
import React, { useState, useEffect, useRef } from "react"
import MobileNavbar from "./MobileNav"
import Image from "next/image"


function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const hideTimeoutRef = useRef(null)

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Speaker", href: "#speakers" },
        { name: "Judges", href: "#judges" },
        { name: "Agenda", href: "#agenda" },
        { name: "Q&A", href: "#rules" },
        { name: "Contacts", href: "#contacts" },
        // { name: "Organize", href: "#organizers" },
    ]

    const handleNavLinkClick = (e, href) => {
        e.preventDefault()
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
    }

    const startHideTimer = (delay = 5000) => {
        clearTimeout(hideTimeoutRef.current)
        // hideTimeoutRef.current = setTimeout(() => setIsVisible(false), delay)
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
                className="fixed top-0 left-0 w-full h-20 pointer-events-none navbarB"
                onMouseEnter={showNavbar}
            />

            <header
                className={`fixed w-full z-50 transition-all duration-500 ease-in-out backdrop-blur-sm shadow-lg ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    } bg-purple-2`}
                onMouseEnter={showNavbar}
                onMouseLeave={() => !isOpen && startHideTimer(2000)}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                    <a href="#hero" aria-label="logo" className="flex items-center gap-2" onClick={(e) => handleNavLinkClick(e, "#hero")}>
                        <Image
                            src={"/images/eunoia.svg"}
                            width={100}
                            height={100}
                            alt="eunoia Logo"
                            className="transition-transform duration-300"
                            fetchPriority="low"
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map(({ name, href }) => (
                            <a
                                key={name}
                                href={href}
                                className="text-white/75 text-lg font-medium hover:text-gold transition-colors relative group px-2 py-1 rounded-md"
                                onClick={(e) => handleNavLinkClick(e, href)}
                            >
                                {name}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>
                    {/* <Button
                        onClick={() => {
                            redirect("/eunoia/register");
                            window.scrollTo(0, 0);
                        }}
                        className="hidden lg:flex btn-grad px-5 py-3.5 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2.5 text-purple-1"
                    >
                        Register now
                    </Button> */}
                    <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
            </header>
        </>
    )
}

export default React.memo(Navbar)
