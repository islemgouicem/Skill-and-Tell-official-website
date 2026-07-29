"use client"
import React from "react"
import { Menu } from "lucide-react"
import { Button } from "../../../../../../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../../../../../components/ui/sheet"
import Image from "next/image"


function MobileNavbar({ isOpen, setIsOpen, navLinks, handleNavLinkClick, activeSection }) {

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-[#CB7822]"
                >
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="border-l border-[#CB7822]/35 w-[250px] text-[#BFCBC5] bg-[linear-gradient(180deg,rgba(8,0,0,0.96)_0%,rgba(51,0,1,0.96)_65%,rgba(8,0,0,0.98)_100%)]"
            >
                <a href="#home" aria-label="logo" className="flex items-center gap-2 mb-2" onClick={(e) => handleNavLinkClick(e, "#home")}>
                    <Image
                        src={"/images/arcade/snt_logo.png"}
                        width={100}
                        height={100}
                        alt="Arcade Logo"
                        className="transition-transform duration-300"
                        fetchPriority="low"
                    />
                </a>
                <nav className="grid gap-4 py-6">
                    {navLinks.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            className={`flex w-full items-center py-2 text-3xl font-compacta tracking-normal transition-colors ${activeSection === href.slice(1)
                                    ? "text-red-700"
                                    : "text-white/75 hover:text-[#CB7822]"
                                }`}
                            onClick={(e) => handleNavLinkClick(e, href)}
                        >
                            {name}
                        </a>
                    ))}
                </nav>
                {/* <Button
                    onClick={() => {
                        navigate("/eunoia/register");
                        window.scrollTo(0, 0);
                    }}
                    className="flex btn-grad px-8 py-4 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center items-center gap-2.5 text-purple-1"
                >
                    Register now
                </Button> */}
            </SheetContent>
        </Sheet>
    )
}
export default React.memo(MobileNavbar)
