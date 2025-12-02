
const About = () => {
    return (
        <section className="relative w-full overflow-hidden py-10" id="about">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl eunoia-title py-2 text-center">
                About EUNOIA
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-4 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>
            <p className="text-base md:text-md text-center max-w-xl mx-auto text-[#999999]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            </p>

            <div className="relative max-w-[70%] mx-auto mb-12">
            </div>

            {/* Footer Decorative Line */}
            <img
                className="absolute left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px]"
                alt="Line"
                src="/images/down_arrow.svg"
            />

        </section>
    )
}

export default About