import React, { useState, useEffect, useRef } from "react"
import MobileNavbar from "./MobNavbar.jsx"
import logo from "/images/arcade/snt_logo.png"
import RedButton from "../components/TheRedButton.jsx"
import { useNavigate } from "react-router-dom";
import PopUp from "../components/popup.jsx"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const hideTimeoutRef = useRef(null)
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home")

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Agenda", href: "#agenda" },
        { name: "Sponsors", href: "#sponsors" },
        { name: "Organize", href: "#organizers" },
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

    // Track active section
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, options)

        navLinks.forEach(({ href }) => {
            const element = document.getElementById(href.slice(1))
            if (element) {
                observer.observe(element)
            }
        })

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <div
                className="fixed top-0 left-0 w-full h-20 pointer-events-none "
                onMouseEnter={showNavbar}
            />

            <header
                className={`fixed w-full z-50 transition-all duration-500 ease-in-out shadow-lg ${isOpen ? "bg-black" : "backdrop-blur-sm"
                    } ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
                    }`}
                onMouseEnter={showNavbar}
                onMouseLeave={() => !isOpen && startHideTimer(2000)}
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 ">


                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 ">
                        <a href="#home" aria-label="logo" className="flex items-center gap-2 ml-4" onClick={(e) => handleNavLinkClick(e, "#home")}>
                            <img
                                src={logo}
                                width={70}
                                height={70}
                                alt="Arcade Logo"
                                className="transition-transform duration-300"
                                fetchPriority="low"
                            />
                        </a>
                        {navLinks.map(({ name, href }) => (
                            <a
                                key={name}
                                href={href}
                                className={`text-xl font-futura_md_bt transition-colors relative group px-2 py-1 rounded-md ${activeSection === href.slice(1)
                                        ? "text-red-700 font-bold"
                                        : "text-white/75 hover:text-red-900"
                                    }`}
                                onClick={(e) => handleNavLinkClick(e, href)}
                            >
                                {name}
                            </a>
                        ))}
                    </nav>

                    <a
                        href="#home"
                        aria-label="mobile logo"
                        className="lg:hidden flex items-center"
                        onClick={(e) => handleNavLinkClick(e, "#home")}
                    >
                        <img
                            src={logo}
                            width={60}
                            height={60}
                            alt="SNT Logo"
                            className="transition-transform duration-300"
                            fetchPriority="low"
                        />
                    </a>

                    <RedButton
                        textContent={"Join The Fight"}
                        pageName={handleOpenPopup}//() => { navigate("/arcade/register") }
                        className="hidden lg:flex scale-[0.75] origin-center hover:scale-[0.8] "
                        textClassName="text-4xl"
                    />

                    <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} navLinks={navLinks} handleNavLinkClick={handleNavLinkClick} activeSection={activeSection} />
                </div>
            </header>
            <PopUp isOpen={isPopupOpen}
                onClose={handleClosePopup}
                color={"bg-red-main-500"}
                title={"Registration"}
                subtitle={"Quarantine Lockdown"}
                msg={"The gates are sealed and the outbreak protocol is still active. Registration has not opened yet. Stay alert, survivor, the signal to deploy will be announced soon."} />

        </>
    )
}

export default React.memo(Navbar)