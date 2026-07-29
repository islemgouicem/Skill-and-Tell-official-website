"use client"
import React from "react"
import { Menu } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../../../../components/ui/sheet"
import Logo from "../../../../components/common/Logo" // memoized logo component

function MobileNavbar({ isOpen, setIsOpen, navLinks, handleNavLinkClick }) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-space-text">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="border-Main-400 w-[250px] text-space-text mob-navbar-bg"
            >
                <a href="#hero" aria-label="logo" className="flex items-center gap-2 mb-2" onClick={(e) => handleNavLinkClick(e, "#hero")}>
                    <Logo size={100} />
                </a>
                <nav className="grid gap-4 py-6">
                    {navLinks.map(({ name, href }) => (
                        <a
                            key={name}
                            href={href}
                            className="flex w-full items-center py-2 text-lg font-semibold hover:text-[#d7aeff] transition-colors"
                            onClick={(e) => handleNavLinkClick(e, href)}
                        >
                            {name}
                        </a>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
export default React.memo(MobileNavbar)
