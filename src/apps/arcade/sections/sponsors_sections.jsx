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
           
            <img src="/images/arcade/our_sponsor.png" className="w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%] mb-[2rem]" />

            <div className="w-full flex flex-col items-center justify-center sm:justify-between  sm:flex-row sm:gap-20">
                
                <img 
                    src="/images/arcade/mobilis_logo.png" 
                    alt="Mobilis" 
                    className="w-[200px] h-auto object-contain md:w-[300px]" 
                />
                
               
                <img 
                    src="/images/arcade/ooredoo_logo.png" 
                    alt="Ooredoo" 
                    className="w-[200px] h-auto object-contain md:w-[300px]" 
                />
            </div>
        </section>
    );
}