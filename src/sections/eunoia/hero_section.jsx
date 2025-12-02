import { CalendarIcon, MapPinIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card_eunoia"
import { useNavigate } from "react-router-dom";


export default function HeroSection() {
    const navigate = useNavigate();

    const infoCards = [
        {
            icon: CalendarIcon,
            text: "13 December"
        },
        {
            icon: MapPinIcon,
            text: "ENSIA School"
        }
    ]

    return (
        // The container height is set to allow main content to breathe on different screens
        <section className="relative w-full h-auto overflow-hidden flex justify-center items-center" id="home">


            {/* Decorative Images (Original Absolute Positioning and Fixed Dimensions - NOT MODIFIED) */}
            <img
                className="absolute top-[83px] left-[198px] w-[422px] h-[422px] z-10 hidden lg:block" // Hide on small screens to declutter
                alt="Ellipse"
                src="/images/circle.svg"
            />
            <img
                className="absolute top-[398px] left-[524px] w-1 h-[161px] hidden lg:block" // Hide on small screens
                alt="Line"
                src="/images/vertical_line.svg"
            />
            <img
                className="absolute rotate-45 top-[321px] left-[990px] w-[116px] h-[116px] hidden lg:block" // Hide on small screens
                alt="Line"
                src="/images/vertical_line.svg"
            />


            <div className="relative z-20 flex flex-col items-center gap-10 sm:gap-12 md:gap-16 max-w-6xl mx-auto pt-20 px-4 sm:px-6 md:pt-32">

                <div className="flex flex-col items-center gap-8 sm:gap-10 relative w-full max-w-3xl">

                    {/* Logo */}
                    <img
                        className="w-[250px] sm:w-[30px] md:w-[320px] mt-12 sm:mt-4"
                        alt="Logo PNG"
                        src="/images/eunoia.svg"
                    />

                    {/* Title */}
                    <h1
                        className="eunoia-title relative font-medium text-3xl sm:text-4xl text-center"
                    >
                        Join us for the Eunoia Ideathon!
                    </h1>
                </div>

                {/* Register Button */}
                <Button
                    onClick={() => {navigate("/eunoia/register"); window.scrollTo(0, 0);}}
                    className="btn-grad px-6 py-4 sm:px-8 sm:py-6 rounded-[10px] text-xl sm:text-2xl text-purple-1"
                >
                    Register now
                </Button>

                {/* Info Cards Container */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-14 relative w-full mt-2 mb-25 max-w-4xl mx-auto"
                >
                    {infoCards.map((card, index) => {
                        const IconComponent = card.icon
                        return (
                            <Card
                                key={index}
                                // MODIFIED: Responsive padding/text sizing for card
                                className="flex flex-col items-center justify-center px-6 py-3 sm:px-10 
                                sm:py-4 relative rounded-[10px] backdrop-blur-md transparency shadow-xl border 
                                border-gold transition-transform hover:scale-[1.02] sm:w-auto"
                            >
                                <CardContent className="inline-flex items-center gap-4 sm:gap-7 relative p-0">
                                    <IconComponent className="relative w-5 h-5 sm:w-7 sm:h-7 text-gold" />
                                    <p
                                        // MODIFIED: Responsive font size
                                        className="relative w-fit font-light text-white text-base sm:text-lg md:text-xl tracking-widest leading-7 whitespace-nowrap"
                                    >
                                        {card.text}
                                    </p>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Line at the bottom (Original Absolute Positioning - NOT MODIFIED) */}
            <img
                className="absolute left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px] z-10"
                alt="Line"
                src="https://c.animaapp.com/minf59ew6AgY7M/img/line-3-2.svg"
            />

            {/* Corner Decorative Groups (Made them scale down slightly for mobile) */}
            <img
                className="absolute top-25 left-3 w-16 h-auto 
                sm:left-4 sm:w-24 
                md:left-6 md:w-32 
                lg:left-8 lg:w-40 z-10" // Added z-10 for safety
                alt="Group"
                src="/images/top_left.svg"
            />
            <img
                className="absolute bottom-2 right-3 w-16 h-auto
                sm:bottom-3 sm:right-4 sm:w-24
                md:bottom-4 md:right-6 md:w-32
                lg:bottom-5 lg:right-8 lg:w-40 z-10" // Added z-10 for safety
                alt="Group"
                src="/images/bottom_right.svg"
            />
        </section>
    )
}