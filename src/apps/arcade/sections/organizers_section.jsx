import TheRedButton from "../components/TheRedButton"
const Organizers = () => {
    return (
        <section className="relative gap-[0.5rem] w-full   px-[2rem] md:px-[5%] lg:px-[10%] flex flex-col justify-center items-start overflow-hidden py-20 " id="organizers">
            <div className=" w-full flex  justify-between items-center  sm:hidden">
                <div>
                    <img src=" images\arcade\join_our_team.png" className=" w-[80%]   "/> 
                    <h3 className="mt-[0.5rem] w-[80%]  md:w-[60%]  lg:w-[40%] text-[#CB7822] font-compacta text-[25px] font-normal leading-[100%] tracking-[0.06em] align-bottom mb-[2rem]"> Register as an organizer</h3>

                </div>

                <img src="images\arcade\organizers_soldiers.png" alt=""  className=" w-[5rem] sm:w-[10rem] "/>
            </div>
            
            <div className="w-full flex justify-between items-center ">
                <div className="">         
                    <img src=" images\arcade\join_our_team.png" className="w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%] hidden sm:block"/>           
                    <h3 className="mt-[0.5rem] w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%] text-[#CB7822] font-compacta text-[25px] font-normal leading-[100%] tracking-[0.06em] align-bottom mb-[2rem] hidden sm:block"> Register as an organizer</h3>
                    <p className=" md:w-[60%] text-[#77867F] font-futura text-[16px] font-normal leading-[1.5rem] tracking-[0.1em] align-bottom mb-[2rem]"> Join the ARCADE organizing team                         and help us create an epic experience for all participants. 
                        Your skills and passion will make a difference!
                    </p>
                    <TheRedButton textContent={"APPLY NOW"} pageName={"orgainzers"}/>
                </div>
                <img src="images\arcade\organizers_soldiers.png" alt=""  className="hidden sm:block w-[5rem] sm:w-[10rem]  md:w-[12rem] lg:w-[16rem] 2xl:w-[20rem]"/>
                
            </div>
                            
            
        </section>
    )
}

export default Organizers