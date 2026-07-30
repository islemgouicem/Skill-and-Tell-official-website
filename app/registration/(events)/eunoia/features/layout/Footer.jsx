"use client";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { redirect } from "next/navigation";
export default function Footer() {
    return (<footer id="contacts" className="bg-purple-2 text-white pt-12 md:pt-16 pb-4 relative overflow-hidden">
            <div className="container max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Logo and Description */}
                    <div className="space-y-6">
                        <a href="#hero" className="inline-block" aria-label="logo">
                            <img src="/images/eunoia.svg" width={180} height={60} alt="Eunoia by Skill & Tell Logo" className="w-[180px]"/>
                        </a>
                        <p className="text-white/80 text-base leading-relaxed max-w-sm">
                            Eunoia by Skill & Tell presents an innovative ideathon focused on well-being. Join us in creating beautiful solutions for a better tomorrow.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.linkedin.com/company/skill-tell-club/" className="w-12 h-12 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors flex items-center justify-center" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin className="h-5 w-5 text-gold" alt="linkedin"/>
                            </a>
                            <a href="https://www.instagram.com/skillntell.club?igsh=MTFzZ3dpMTY2cGV5bg==" className="w-12 h-12 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors flex items-center justify-center" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram className="h-5 w-5 text-gold" alt="instagram"/>
                            </a>
                            <div onClick={() => {
            redirect("/");
            window.scroll(0, 0);
        }} //  to your route
     className="w-12 h-12 rounded-full bg-gold/30 hover:bg-gold/60 transition-colors flex items-center justify-center cursor-pointer">
                                <Globe className="h-5 w-5 text-gold" alt="globe icon"/>
                            </div>

                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-8 lg:pl-16">
                        <h3 className="text-xl font-semibold mb-6 text-white">Quick links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#home" className="text-white/80 hover:text-white transition-colors text-base">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-white/80 hover:text-white transition-colors text-base">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#speakers" className="text-white/80 hover:text-white transition-colors text-base">
                                    Speakers
                                </a>
                            </li>
                            <li>
                                <a href="#judges" className="text-white/80 hover:text-white transition-colors text-base">
                                    Judges
                                </a>
                            </li>
                            <li>
                                <a href="#agenda" className="text-white/80 hover:text-white transition-colors text-base">
                                    Agenda
                                </a>
                            </li>
                            <li>
                                <a href="#rules" className="text-white/80 hover:text-white transition-colors text-base">
                                    Q&A
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
                        <div className="space-y-5">
                            <a href="mailto:skill.and.tell@ensia.edu.dz" className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group">
                                <Mail className="h-6 w-6 flex-shrink-0 mt-0.5 text-gold"/>
                                <span className="text-base">skill.and.tell@ensia.edu.dz</span>
                            </a>

                            <a href="tel:+213561718475" className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group">
                                <Phone className="h-6 w-6 flex-shrink-0 mt-0.5 text-gold"/>
                                <span className="text-base">+213 799 83 89 54</span>
                            </a>
                            <a href="tel:+213799838954" className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group">
                                <Phone className="h-6 w-6 flex-shrink-0 mt-0.5 text-gold"/>
                                <span className="text-base">+213 561 71 84 75</span>
                            </a>

                            <div className="flex items-start gap-3 text-white/80">
                                <MapPin className="h-6 w-6 flex-shrink-0 mt-0.5 text-gold"/>
                                <span className="text-base">Ensia school, sidi abdellah</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 mt-12 pt-8 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-4 text-sm text-white/70">
                <div className="w-full h-px bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
                <p>© 2025 Eunoia by Skill & Tell | Beautiful Thinking</p>
            </div>

        </footer>);
}
