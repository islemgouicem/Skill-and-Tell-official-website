"use client";
import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/images/mobai/snt_logo.png";
import Image from "next/image";
function MobileNavbar({ isOpen, setIsOpen, navLinks, handleNavLinkClick }) {
    return (<Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-space-text">
                    <Menu className="h-6 w-6"/>
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-red-main-500 w-[250px] text-space-text bg-[#2d0453d2]">
                <a href="#hero" aria-label="logo" className="flex items-center gap-2 mb-2" onClick={(e) => handleNavLinkClick(e, "#hero")}>
                    <Image src={logo} width={100} height={100} alt="EUNOIA Logo" className="transition-transform duration-300" fetchPriority="low"/>
                </a>
                <nav className="grid gap-4 py-6">
                    {navLinks.map(({ name, href }) => (<a key={name} href={href} className="flex w-full items-center py-2 text-lg font-semibold hover:text-gold transition-colors" onClick={(e) => handleNavLinkClick(e, href)}>
                            {name}
                        </a>))}
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
        </Sheet>);
}
export default React.memo(MobileNavbar);
