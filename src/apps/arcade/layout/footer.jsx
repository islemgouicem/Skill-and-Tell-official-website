import { Mail, Phone, MapPin, Linkedin, Instagram, Globe } from "lucide-react"
import { useNavigate } from "react-router-dom";
export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer id="contacts" className=" text-[#77867FBF]  pb-4 relative overflow-hidden font-compacta ">
            <div className="w-full h-[2px] bg-gradient-to-r from-[rgba(255,7,7,0.05)] via-[#990404] to-[rgba(255,7,7,0.05)] rounded-full blur-[0.5px]"></div>

            <div className="container max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 pt-12 md:pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Contact Us */}
                    <div className="order-1 md:order-3">
                        <h3 className="text-2xl mb-6 text-white bebas">Contact Us</h3>
                        <div className="space-y-5">
                            <a
                                href="mailto:skill.and.tell@ensia.edu.dz"
                                className="flex items-start gap-3  transition-colors group"
                            >
                                <Mail className="h-6 w-6 flex-shrink-0 mt-0.5 text-[#F68F1E]" />
                                <span className="text-base">skill.and.tell@ensia.edu.dz</span>
                            </a>
                            <a
                                href="tel:+213799838954"
                                className="flex items-start gap-3  transition-colors group"
                            >
                                <Phone className="h-6 w-6 flex-shrink-0 mt-0.5 text-[#F68F1E]" />
                                <span className="text-base">+213 561 71 84 75</span>
                            </a>

                            <div className="flex items-start gap-3  ">
                                <MapPin className="h-6 w-6 flex-shrink-0 mt-0.5 text-[#F68F1E]" />
                                <span className="text-base">Ensia school, sidi abdellah</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-8 lg:pl-16 order-2 md:order-2">
                        <h3 className="text-2xl mb-6 text-white bebas">Quick links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#home" className=" hover:text-[#E52928] transition-colors text-lg">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className=" hover:text-[#E52928] transition-colors text-lg">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#agenda" className=" hover:text-[#E52928] transition-colors text-lg">
                                    Agenda
                                </a>
                            </li>
                            <li>
                                <a href="#sponsors" className=" hover:text-[#E52928] transition-colors text-lg">
                                    Sponsors
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Logo and Description */}
                    <div className="space-y-6 order-3 md:order-1">
                        <a href="#hero" className="inline-block" aria-label="logo">
                            <img src="images\arcade\arcade_logo.png" width={180} height={60} alt="Eunoia by Skill & Tell Logo" className="w-[180px]" />
                        </a>
                        <p className="text-base leading-relaxed max-w-sm">
                           ARCADE by Skill & Tell presents an innovative ideathon focused on well-being. Join us in creating beautiful solutions for a better tomorrow.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-2 text-[#F68F1E]">
                            <a
                                href="https://www.linkedin.com/company/skill-tell-club/"
                                className="w-12 h-12 bg-[#F68F1E4D] rounded-full flex justify-center items-center transition-transform duration-200 hover:-translate-y-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5 " alt="linkedin" />
                            </a>
                            <a
                                href="https://www.instagram.com/skillntell.club?igsh=MTFzZ3dpMTY2cGV5bg=="
                                className="w-12 h-12 bg-[#F68F1E4D] rounded-full  flex justify-center items-center transition-transform duration-200 hover:-translate-y-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5 " alt="instagram" />
                            </a>
                            <div
                                onClick={() => {
                                    navigate("/");
                                    window.scroll(0, 0)
                                }} // navigate to your route
                                className="w-12 h-12 bg-[#F68F1E4D] rounded-full  flex justify-center items-center transition-transform duration-200 hover:-translate-y-1"
                            >
                                <Globe className="h-5 w-5 " alt="globe icon" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
 <div className="mt-[1rem] w-full h-[2px] bg-gradient-to-r from-[#F68F1E0D via-[#F68F1E] to-[#F68F1E0D] rounded-full blur-[0.5px]"></div>

            {/* Bottom Bar */}
            <div className="relative tracking-widest z-10 mt-8 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center gap-4 text-sm text-white/70">
                
       
                <p className="text-[#77867FBF] ">© 2026 Arcade by Skill & Tell</p>
            </div>

        </footer>
    )
}