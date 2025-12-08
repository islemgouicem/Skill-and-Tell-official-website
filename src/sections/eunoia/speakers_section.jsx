import JudgeCard from "../../components/ui/eunoia_card"

const Speakers = () => {
    return (
        <section className="relative w-full flex flex-col min-h-[calc(100vh-90px)] overflow-hidden justify-center items-center py-20" id="speakers">
            {/* Title */}
            <h2 className="text-5xl md:text-6xl eunoia-title py-2 text-center">
                Our Speakers
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-4 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>




            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-stretch">
                <JudgeCard name={"Dr. Adam Selamnia"}
                    subtitle={"Co-Founder & Business Development Director, NIUM (Luxembourg)"}
                    image={"/images/adam_selmania.jpg"}
                    description={"Explains why a founder’s physical and mental well-being is essential for decision-making, resilience, innovation, and building strong, sustainable companies."}
                />

                <JudgeCard name={"Dr. Mohamed BENAHMED"}
                    image={"/images/behahmed.jpg"}
                    subtitle={"Médecin, Expert en santé publique et promotion du bien-être"}
                    description={"Promotes daily physical activity as a powerful way to prevent disease and improve quality of life, highlighting the dangers of a sedentary lifestyle."}
                />
            </div>




            {/* Footer Decorative Line */}
            <img
                onClick={() => {
                    document.getElementById("judges")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute left-[calc(50%_-_46px)] cursor-pointer bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5
                w-[94px] h-[30px]"
                alt="Line"
                src="/images/down_arrow.svg"
            />

            {/* Corner Decorative Groups */}
            <img
                className="absolute top-2 right-3 w-20 h-auto -rotate-90
            sm:top-3 sm:right-4 sm:w-24
            md:top-4 md:right-6 md:w-32
            lg:top-5 lg:right-8 lg:w-40"
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
                        -top-40 -left-40
                        sm:-top-48 sm:-left-48
                        lg:-top-60 lg:-left-60
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
                        -bottom-40 -right-40
                        sm:-bottom-48 sm:-right-48
                        lg:-bottom-60 lg:-right-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "
            />
        </section>
    )
}

export default Speakers