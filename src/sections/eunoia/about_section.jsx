
const About = () => {
    return (
        <section className="relative w-full flex flex-col justify-center items-center overflow-hidden py-20" id="about">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl eunoia-title py-2 text-center">
                About EUNOIA
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-4 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>


            <div className="relative max-w-[80%] mx-auto mb-12">
                <p className="text-base md:text-md text-center max-w-xl mx-auto text-[#999999]">
                    EUNOIA is the first edition of a full-day innovation event focused on student well-being. Combining creativity, collaboration, and fun, it features an ideathon, inspiring talks by well-being experts, interactive activities, a cultural village, and opportunities for movement and social connection. The event aims to help students address real mental and physical health challenges, turn meaningful ideas into solutions, and build a supportive, energetic campus community.
                </p>
            </div>

            {/* Footer Decorative Line */}
            <img
                onClick={() => {
                    document.getElementById("speakers")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="pointer absolute left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px]"
                alt="Line"
                src="/images/down_arrow.svg"
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
            -bottom-40 -left-40
            sm:-bottom-48 sm:-left-48
            lg:-bottom-60 lg:-left-60
            w-[400px] sm:w-[450px] lg:w-[620px]
            pointer-events-none
        "
            />



        </section>
    )
}

export default About