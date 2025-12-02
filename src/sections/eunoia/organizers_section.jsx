import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom";


const Organizers = () => {
    const navigate = useNavigate();
    return (
        <section className="relative w-full overflow-hidden py-10" id="organizers">
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
                    onClick={() => navigate("/eunoia/organizers")}
                    className="w-auto btn-grad my-6 sm:mb-6 px-6 py-4 sm:px-8 sm:py-6 rounded-[10px] text-xl sm:text-2xl text-purple-1"
                >
                    Organize now
                </Button>
            </div>
            {/* Footer Decorative Line */}
            <img
                className="absolute left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px]"
                alt="Line"
                src="/images/down_arrow.svg"
            />

            {/* Corner Decorative Groups */}
            <img
                className="absolute top-2 left-3 w-20 h-auto
            sm:top-3 sm:left-4 sm:w-24
            md:top-4 md:left-6 md:w-32
            lg:top-5 lg:left-8 lg:w-40"
                alt="Group"
                src="/images/top_left.svg"
            />
            <img
                className="absolute bottom-2 right-3 w-20 h-auto
            sm:bottom-3 sm:right-4 sm:w-24
            md:bottom-4 md:right-6 md:w-32
            lg:bottom-5 lg:right-8 lg:w-40"
                alt="Group"
                src="/images/bottom_right.svg"
            />
        </section>
    )
}

export default Organizers