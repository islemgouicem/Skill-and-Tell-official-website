
const About = () => {
    return (
        <section className="relative w-full flex flex-col justify-center sm:justify-between items-center overflow-hidden"
            id="about">

            <div className="w-full flex flex-1 flex-col justify-center items-start px-6 md:px-8 lg:px-16 py-8">
                <div className="w-full flex flex-row justify-between  mb-[2rem] items-center">
                    <div className=" flex flex-col gap-[0.5rem]">
                        <img src="/images/arcade/about_arcade.png" className="w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%]" />

                        <h3 class="font-compacta text-4xl leading-[100%] tracking-[0.06em] text-[#CB7822]">
                            What is ARCADE ?
                        </h3>
                        <p className="font-futura_md_bt text-xl text-main-text hidden sm:block md:w-[60%] tracking-wide leading-8"
                        >ARCADE is a unique event organized by Skill&Tell,
                            bringing together teams and individuals to take on a variety of  game-based
                            challenges that combine both individual and group activities. Participants are immersed in realistic,
                            scenario-based situations that require them to apply and develop a range of skills to
                            successfully complete each task.
                        </p>
                    </div>

                    <img src="/images/arcade/about_soldier.png" alt="" className="w-[5rem] sm:w-[10rem] md:w-[12rem] lg:w-[20rem] z-10" />
                </div>


                <p className="font-futura_lt_bt text-[15px] font-[100] leading-[1.5rem] tracking-[0.06em]  text-[#77867F] sm:hidden"
                >ARCADE is a unique event organized by Skill&Tell,
                    bringing together teams and individuals to take on a variety of  game-based
                    challenges that combine both individual and group activities. Participants are immersed in realistic,
                    scenario-based situations that require them to apply and develop a range of skills to
                    successfully complete each task.
                </p>
            </div>
            
            <div className="pointer-events-none hidden sm:block absolute -left-36 top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.28)_0%,rgba(255,7,7,0.12)_35%,rgba(255,7,7,0)_72%)] blur-3xl" />
            <div className="pointer-events-none hidden sm:block absolute -right-32 top-[-14rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.28)_0%,rgba(255,7,7,0.12)_35%,rgba(255,7,7,0)_72%)] blur-3xl" />

        </section>
    )
}

export default About