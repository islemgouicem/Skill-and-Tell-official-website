"use client"
import CyberButton from "../components/CyberButton"
import PopUp from "@/components/ui/popup"
import { useState } from "react";

const Organizers = () => {
   
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };
    return (
        <section
            id="organizers"
            className="relative pt-16 pb-10 w-full overflow-hidden"
        >

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    {/* Title: JOIN OUR TEAM - large bold uppercase red with glow */}
                    <h2
                        className="title mb-6"
                    >
                        JOIN OUR TEAM
                    </h2>

                    {/* Subtitle: Register As Organizer */}
                    <h3 className="font-futura_md_bt text-2xl sm:text-3xl lg:text-4xl font-normal text-mwhite mb-6 tracking-wide">
                        Register As Organizer
                    </h3>

                    {/* Descriptive paragraph - narrower width, 3-line wrap */}
                    <p className="text-white text-base font-light font-futura_md_bt sm:text-md leading-relaxed mb-8 max-w-lg">
                        Join the mobAI organizing team and help us create an epic experience for all participants. Your skills and passion will make a difference!
                    </p>

                    {/* APPLY NOW! button */}
                    <CyberButton
                        variant="primary"
                        onClick={handleOpenPopup} //() => navigate("/mobai/organizers")
                        className="uppercase font-bold px-10 py-2 text-xl tracking-widest"
                    >
                        APPLY NOW!
                    </CyberButton>

                    {/* Limited positions available */}
                    <p className="text-white/75 text-sm mt-4 font-futura_md_bt">
                        Limited positions available
                    </p>
                </div>
            </div>
            <PopUp isOpen={isPopupOpen}
                onClose={handleClosePopup}
                color={"bg-red-main-500"}
                title={"Registration"}
                subtitle={"Closed for This Season"}
                msg={"Registration for this season has closed, but great things are ahead! Keep an eye out — we’ll be opening again with fresh opportunities next season."} />
        </section>
    )
}

export default Organizers
