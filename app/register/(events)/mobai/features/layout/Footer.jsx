"use client";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import logo_1 from "@/assets/images/mobai/mobai_logo1.png";
import line from "@/assets/images/mobai/line.svg";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
export default function Footer() {
    return (<footer id="contacts" className=" text-white md:pt-16 pb-4 relative overflow-hidden">
            <Image height={400} width={300} src={line} alt="Footer top border" className="absolute left-0 top-0 w-full pointer-events-none select-none"/>
            <div className="container max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 pt-12 md:pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Contact Us */}
                    <div className="order-1 md:order-3">
                        <h3 className="text-2xl mb-6 text-white bebas">Contact Us</h3>
                        <div className="space-y-5">
                            <a href="mailto:skill.and.tell@ensia.edu.dz" className="flex items-start gap-3 text-white/80  transition-colors group">
                                <Mail className="h-6 w-6 flex-shrink-0 mt-0.5 text-primary-white"/>
                                <span className="text-base">skill.and.tell@ensia.edu.dz</span>
                            </a>
                            <a href="tel:+213799838954" className="flex items-start gap-3 text-white/80  transition-colors group">
                                <Phone className="h-6 w-6 flex-shrink-0 mt-0.5 text-primary-white"/>
                                <span className="text-base">+213 561 71 84 75</span>
                            </a>

                            <div className="flex items-start gap-3 text-white/80 ">
                                <MapPin className="h-6 w-6 flex-shrink-0 mt-0.5 text-primary-white"/>
                                <span className="text-base">Ensia school, sidi abdellah</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-8 lg:pl-16 order-2 md:order-2">
                        <h3 className="text-2xl mb-6 text-white bebas">Quick links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#home" className="text-white/80 hover:text-[#E52928] transition-colors text-lg">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-white/80 hover:text-[#E52928] transition-colors text-lg">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#agenda" className="text-white/80 hover:text-[#E52928] transition-colors text-lg">
                                    Agenda
                                </a>
                            </li>
                            <li>
                                <a href="#sponsors" className="text-white/80 hover:text-[#E52928] transition-colors text-lg">
                                    Sponsors
                                </a>
                            </li>
                            <li>
                                <a href="#mentors" className="text-white/80 hover:text-[#E52928] transition-colors text-lg">
                                    Mentors
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Logo and Description */}
                    <div className="space-y-6 order-3 md:order-1">
                        <a href="#hero" className="inline-block" aria-label="logo">
                            <Image height={400} width={300} src={logo_1} width={180} height={60} alt="Eunoia by Skill & Tell Logo" className="w-[180px]"/>
                        </a>
                        <p className="text-white/80 text-base leading-relaxed max-w-sm">
                            Mobai is a hackathon organized by skill&tell, where ennovators and tech enthousiasts come together to build ai
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.linkedin.com/company/skill-tell-club/" className="w-12 h-12 bg-gradient-to-b from-red-600/60 to-red-600 rounded-full shadow-[0px_10px_45px_0px_rgba(255,0,6,0.50)] outline-1 outline-offset-[-1px] outline-white/60 flex justify-center items-center transition-transform duration-200 hover:-translate-y-1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="h-5 w-5 text-white" alt="linkedin"/>
                            </a>
                            <a href="https://www.instagram.com/skillntell.club?igsh=MTFzZ3dpMTY2cGV5bg==" className="w-12 h-12 bg-gradient-to-b from-red-600/60 to-red-600 rounded-full shadow-[0px_10px_45px_0px_rgba(255,0,6,0.50)] outline-1 outline-offset-[-1px] outline-white/60 flex justify-center items-center transition-transform duration-200 hover:-translate-y-1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="h-5 w-5 text-white" alt="instagram"/>
                            </a>
                            <div onClick={() => {
            redirect("/");
            window.scroll(0, 0);
        }} // navigate to your route
     className="w-12 h-12 bg-gradient-to-b from-red-600/60 to-red-600 rounded-full shadow-[0px_10px_45px_0px_rgba(255,0,6,0.50)] outline-1 outline-offset-[-1px] outline-white/60 flex justify-center items-center cursor-pointer duration-200 hover:-translate-y-1">
                                <Globe className="h-5 w-5 text-white" alt="globe icon"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative tracking-widest z-10 mt-8 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-4 text-sm text-white/70">
                <p>© 2026 Mobai by Skill & Tell</p>
            </div>

        </footer>);
}
