import { CalendarIcon, MapPinIcon } from "lucide-react"
import { Button } from "../../components/ui/button"
import PopUp from "../../components/ui/popup.jsx"
import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card_eunoia"
import { useNavigate } from "react-router-dom";


export default function HeroSection() {
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
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
        <section
            id="home"
            className="relative w-full pt-[80px] min-h-screen overflow-hidden flex"
        >
            {/* Inner container that fills remaining height below navbar */}
            <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-80px)] relative z-20">

                {/* Top decorative images (unchanged) */}
                <img
                    className="absolute top-10 left-[198px] w-[320px] h-[320px] hidden lg:block z-10"
                    alt="Ellipse"
                    src="/images/circle.svg"
                />
                <img
                    className="absolute top-60 left-[460px] w-1 h-[161px] hidden lg:block"
                    alt="Line"
                    src="/images/vertical_line.svg"
                />
                <img
                    className="absolute rotate-45 top-[300px] left-[990px] w-[116px] h-[116px] hidden lg:block"
                    alt="Line"
                    src="/images/vertical_line.svg"
                />

                {/* MAIN CONTENT */}
                <div className="flex flex-col justify-between items-center h-[90%] sm:h-full gap-12 pt-10 px-4 max-w-6xl w-full">
                    <img
                        className="w-[280px] sm:w-[300px] md:w-[320px] mt-8 mb-4"
                        alt="Logo PNG"
                        src="/images/eunoia.svg"
                    />

                    <div className="flex flex-col items-center gap-8 w-full">
                        {/* Logo + Title */}
                        <h1 className="eunoia-title font-medium text-3xl sm:text-4xl text-center">
                            Join us for the Eunoia Ideathon!
                        </h1>
                        {/* Register Button */}
                        <Button
                            onClick={handleOpenPopup}
                            // {() => {
                            //     navigate("/eunoia/register");
                            //     window.scrollTo(0, 0);
                            // }}
                            className="btn-grad px-8 py-5 sm:px-10 sm:py-6 rounded-[10px] text-xl sm:text-2xl text-purple-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                        >
                            Register now
                        </Button>
                    </div>



                    {/* Info Cards */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-2 max-w-6xl w-full mb-20">
                        {infoCards.map((c, i) => {
                            const Icon = c.icon;
                            return (
                                <Card
                                    key={i}
                                    className="flex flex-col items-center justify-center px-6 py-4 sm:px-10 sm:py-5
                         rounded-[10px] backdrop-blur-md transparency shadow-xl border border-gold mx-10
                         animate-[swim_3s_linear_infinite]"
                                >
                                    <CardContent className="inline-flex items-center gap-6 p-0">
                                        <Icon className="w-7 h-7 text-gold" />
                                        <p className="text-white text-lg sm:text-xl tracking-widest">
                                            {c.text}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
                <PopUp isOpen={isPopupOpen}
                    onClose={handleClosePopup}
                    title={"Registration"}
                    subtitle={"Closed for This Season"}
                    msg={"Registration for this season has closed, but great things are ahead! Keep an eye out — we’ll be opening again with fresh opportunities next season."} />
                {/* Bottom decorations */}
                <img
                    onClick={() => {
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="absolute left-[calc(50%-46px)] cursor-pointer bottom-[26px] w-[94px] h-[30px] z-10"
                    alt="Line"
                    src="/images/down_arrow.svg"
                />

                <img
                    className="absolute top-2 left-3 w-20 h-auto rotate-180
            sm:top-3 sm:left-4 sm:w-24
            md:top-4 md:left-6 md:w-32
            lg:top-5 lg:left-8 lg:w-40"
                    alt="Group"
                    src="/images/corners.svg"
                />
                <img
                    className="absolute bottom-2 right-3 w-20 h-auto
            sm:bottom-3 sm:right-4 sm:w-24
            md:bottom-4 md:right-6 md:w-32
            lg:bottom-5 lg:right-8 lg:w-40"
                    alt="Group"
                    src="/images/corners.svg"
                />


                <img
                    src="/images/shadow.svg"
                    alt="Shadow"
                    className="
                        absolute
                        -top-40 -right-40
                        sm:-top-48 sm:-right-48
                        lg:-top-60 lg:-right-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "
                />

                {/* Bottom shadow */}
                <img
                    src="/images/shadow.svg"
                    alt="Shadow"
                    className="
                        absolute
                        -bottom-40 -left-40
                        sm:-bottom-48 sm:-left-48
                        lg:-bottom-60 lg:-left-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "
                />

            </div>
        </section>

    )
}