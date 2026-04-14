export default function Sponsors() {

    return (
        <section
            id="sponsors"
            className="relative w-full px-[2rem] md:px-[5%] lg:px-[10%]   my-20 flex flex-col items-center justify-center"
        >

            <img src="/images/arcade/our_sponsor.png" className="w-45 md:w-50 lg:w-70 mb-8 sm:mb-4" />

            <div className="w-full flex items-center justify-center sm:gap-20">

                <img
                    src="/images/arcade/logo-netbeopen-red.png"
                    alt="netbeopen"
                    className="w-[280px] h-auto object-contain md:w-[400px] mt-2"
                />
            </div>
        </section>
    );
}