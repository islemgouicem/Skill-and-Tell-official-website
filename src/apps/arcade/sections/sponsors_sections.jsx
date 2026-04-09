export default function Sponsors() {
    const sponsors = [
        { logo: "/images/mobai/ensia.png", link: "#" },
        { logo: "/images/mobai/bms.png", link: "#" },
    ];

    return (
        <section
            id="sponsors"
            className="relative w-full px-[2rem] md:px-[5%] lg:px-[10%]   my-20 flex flex-col items-center justify-center"
        >

            <img src="/images/arcade/our_sponsor.png" className="w-45 md:w-50 lg:w-70 mb-8 sm:mb-4" />

            <div className="w-full flex items-center justify-between sm:gap-20">

                <img
                    src="/images/arcade/mobilis_logo.png"
                    alt="Mobilis"
                    className="w-[150px] h-auto object-contain md:w-[300px]"
                />


                <img
                    src="/images/arcade/ooredoo_logo.png"
                    alt="Ooredoo"
                    className="w-[150px] h-auto object-contain md:w-[300px]"
                />
            </div>
        </section>
    );
}