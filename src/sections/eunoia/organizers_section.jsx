import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom";


const Organizers = () => {
    const navigate = useNavigate();
    return (
        <section className="relative w-full overflow-hidden pb-10 pt-20" id="organizers">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl eunoia-title py-2 text-center">
                Be an Organizer
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-16 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>


            <div className="relative max-w-[70%] mx-auto mb-12 flex flex-col justify-center items-center">
                <p className="text-base md:text-md text-center max-w-lg mx-auto text-[#999999]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                </p>
                <Button
                    onClick={() => {
                        navigate("/eunoia/organizers");
                        window.scrollTo(0, 0);
                    }}
                    className="w-auto btn-grad my-6 sm:mb-6 px-6 py-4 sm:px-8 sm:py-6 rounded-[10px] text-xl sm:text-2xl text-purple-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                >
                    Organize now
                </Button>
            </div>
            {/* Footer Decorative Line */}
            <img
                onClick={() => {
                    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute cursor-pointer left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px]"
                alt="Line"
                src="/images/down_arrow.svg"
            />

            {/* Corner Decorative Groups */}
            <img
                className="absolute top-2 right-2 w-20 h-auto -rotate-90
            sm:top-3 sm:right-4 sm:w-24
            md:top-4 md:right-6 md:w-32
            lg:top-5 lg:right-5 lg:w-40"
                alt="Group"
                src="/images/corners.svg"
            />
            <img
                className="absolute bottom-2 left-2 w-20 h-auto rotate-90
            sm:bottom-3 sm:left-4 sm:w-24
            md:bottom-4 md:left-6 md:w-32
            lg:bottom-5 lg:left-5 lg:w-40"
                alt="Group"
                src="/images/corners.svg"
            />

            <img
                src="/images/shadow.svg"
                alt="Shadow"
                className="
                        absolute
                        top-0 left-0
                        translate-x-[-40%] translate-y-[-40%]
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none transform-gpu
                    "
            />

            <img
                src="/images/shadow.svg"
                alt="Shadow"
                className="
                        absolute
                        bottom-0 right-0
                        translate-x-[40%] translate-y-[40%]
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none transform-gpu
                    "
            />
        </section>
    )
}

export default Organizers