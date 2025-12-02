import JudgesCarousel from "../../components/ui/eunoia_carousel"


const Judges = () => {
    return (
        <section className="relative w-full overflow-hidden py-10" id="judges">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl eunoia-title py-2 text-center">
                Our Judges
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-4 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>


            <JudgesCarousel />

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

export default Judges