import { CalendarIcon, MapPinIcon } from "lucide-react"
import RedButton from "../components/TheRedButton.jsx"
import background from "/images/arcade/hero.png";


export default function HeroSection() {


    return (
        <section
            id="home"
            className="relative w-full px-4 sm:px-8 md:px-[5%] lg:px-[10%] pt-[84px] pb-12 md:pb-0 md:min-h-screen overflow-hidden flex flex-col items-center md:justify-center sm:bg-cover" >

            <div
                className="absolute inset-0 bg-cover bg-[58%_center] sm:bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${background})`, height: "calc(100% )", top: 0 }}
            />

            {/* Inner container that fills remaining height below navbar */}
            <div
                className="flex flex-col items-center w-full max-w-[360px] sm:max-w-[560px] md:max-w-none relative z-20 pt-2 sm:pt-4 my-16 sm:my-8 md:my-0">
                <img src="/images/arcade/arcade_logo.png" className="mb-3 w-[185px] sm:w-[230px] md:w-[350px]" />
                <p className="w-[80%] md:w-[85%] lg:w-[60%] text-[#BFCBC5] text-center mb-6 text-[1.05rem] leading-[1.2] sm:text-[1.35rem] md:text-2xl" >
                    The zombies are hungry... are you in
                    <br className="sm:hidden" /> the menu ?
                    <span className="sm:hidden"> </span>
                    Face the undead, beat
                    <br className="sm:hidden" /> the clock, and dominate the survival rankings.
                </p>

                <RedButton
                    textContent={"Join The Fight"}
                    pageName={"/arcade/register"}
                    className="scale-[0.84] sm:scale-100"
                    textClassName="text-[2.05rem] sm:text-4xl"
                />
                <div className="pt-4 flex flex-row gap-18 sm:gap-8 p-1 justify-center items-center text-[#77867F] text-xl md:text-2xl leading-[100%] tracking-[0.08em] align-bottom whitespace-nowrap">
                    <div className="flex items-center gap-1 sm:gap-2" >
                        <CalendarIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        <p className="font-compacta">24 April 2026</p>

                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <MapPinIcon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                        <p className="font-compacta">ENSIA SCHOOL</p>
                    </div>
                </div>
            </div>

            <div className=" absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-[rgba(255,7,7,0.05)] via-[#990404] to-[rgba(255,7,7,0.05)] rounded-full blur-[0.5px]"></div>
            <img
                src="/images/arcade/hero_zombie.png"
                className="pointer-events-none absolute bottom-3 left-3 z-20 w-[5rem] sm:hidden"
                alt=""
            />

        </section>
    )
}