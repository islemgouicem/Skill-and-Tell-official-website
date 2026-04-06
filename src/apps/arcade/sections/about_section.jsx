
const About = () => {
    return (
        <section className="relative w-full px-[2rem] md:px-[5%] lg:px-[10%]  flex flex-col justify-center sm:justify-between items-start overflow-hidden py-20   " 
        id="about">
            <div className="w-full   flex flex-row justify-between  mb-[2rem] items-center">
                <div className=" flex flex-col gap-[0.5rem]">
                    <img src="images\arcade\about_arcade.png" className="w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%]"/>
                    
                    <h3 class="font-compacta text-[2rem] font-normal leading-[100%] tracking-[0.06em] text-[#CB7822]">
                        What is ARCADE ?
                    </h3>
                    <p className="font-futura text-[15px] font-[100] leading-[1.5rem]  tracking-[0.1em]  text-[#77867F] hidden sm:block  md:w-[60%]"
                >ARCADE is a unique event organized by Skill&Tell, 
                    bringing together teams and individuals to take on a variety of  game-based
                    challenges that combine both individual and group activities. Participants are immersed in realistic,
                    scenario-based situations that require them to apply and develop a range of skills to
                    successfully complete each task.
                </p>
                </div>

                <img src="images\arcade\about_soldier.png" alt="" className="w-[5rem] sm:w-[10rem]  md:w-[12rem] lg:w-[16rem] 2xl:w-[20rem]"  />
            </div>

            
                <p className="font-futura text-[15px] font-[100] leading-[1.5rem] tracking-[0.06em]  text-[#77867F] sm:hidden"
                >ARCADE is a unique event organized by Skill&Tell, 
                    bringing together teams and individuals to take on a variety of  game-based
                    challenges that combine both individual and group activities. Participants are immersed in realistic,
                    scenario-based situations that require them to apply and develop a range of skills to
                    successfully complete each task.
                </p>
        </section>
    )
}

export default About