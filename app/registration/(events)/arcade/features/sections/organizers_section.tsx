"use client"
import TheRedButton from "../components/TheRedButton"
import PopUp from "../components/popup"
import { useState } from "react"
import Image from "next/image"

const Organizers = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
    return (
        <section className="relative  w-full overflow-visible mb-10 flex flex-col justify-center items-center" id="organizers">

            <div className="w-[95%] sm:w-[85%] md:w-[82%] lg:w-[90%] flex gap-[0.5rem] flex-col justify-center items-start px-4 md:px-8 lg:px-16">
                <div className="relative w-full flex justify-between items-start sm:items-center">
                    <div className="flex flex-col justify-between items-start w-full sm:w-auto">
                        <Image  width={300} height={400}  src="/images/arcade/join_our_team.png" className="w-[60%]  lg:w-[40%]" />
                        <h3 className="mt-[0.5rem] w-[80%] sm:w-[70%] md:w-[60%]  lg:w-[40%] text-[#CB7822] font-compacta text-3xl sm:text-4xl font-normal leading-[100%] tracking-[0.06em] align-bottom mb-[1.6rem] sm:mb-[2rem]">
                            Register as an organizer
                        </h3>
                        <p className="z-20 w-[70%] md:w-[60%] text-main-text font-futura text-[16px] font-normal leading-[1.5rem] tracking-[0.1em] align-bottom mb-4">
                            Join the ARCADE organizing team and help us create an epic experience for all participants.
                            Your skills and passion will make a difference!
                        </p>
                        <TheRedButton
                            textContent={"APPLY NOW"}
                            pageName={handleOpenPopup}//
                            className="scale-[0.82] sm:scale-100 origin-left"
                            textClassName="text-[1.8rem] sm:text-4xl"
                        />
                    </div>

                    <Image  width={300} height={400} 
                        src="/images/arcade/organizers_soldiers.png"
                        alt=""
                        className="z-10 sm:hidden pointer-events-none absolute -right-6 top-[3rem] w-[12rem]"
                    />
                    <Image  width={300} height={400}  src="/images/arcade/organizers_soldiers.png" alt="" className="z-10 hidden sm:block w-[5rem] sm:w-[10rem]  md:w-[12rem] lg:w-[16rem] 2xl:w-[20rem]" />
                </div>
            </div>

            <div className="pointer-events-none hidden sm:block absolute -left-20 top-[-14rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.28)_0%,rgba(255,7,7,0.12)_15%,rgba(255,7,7,0)_72%)] blur-3xl" />
            <div className="pointer-events-none hidden sm:block absolute -right-42 top-[-18rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.28)_0%,rgba(255,7,7,0.12)_35%,rgba(255,7,7,0)_72%)] blur-3xl" />

            <div className="pointer-events-none sm:hidden absolute right-0 bottom-20 h-[100rem] w-[100rem] translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.12)_0%,rgba(255,7,7,0.04)_35%,rgba(255,7,7,0)_72%)] blur-5xl" />
            <PopUp isOpen={isPopupOpen}
                onClose={handleClosePopup}
                color={"bg-red-main-500"}
                title={"Registration Closed"}
                subtitle={"Season Status: Lockdown"}
                msg={"The gates are sealed for this season and survivor intake is now closed. You fought hard to get here; we will see you next year when the sirens sound again."} />

        </section>
    )
}

export default Organizers
