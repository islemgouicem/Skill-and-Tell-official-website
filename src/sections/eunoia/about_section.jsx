
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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
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
                        bottom-0 left-0
                        translate-x-[-40%] translate-y-[40%]
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none transform-gpu
                    "
            />



        </section>
    )
}

export default About