import { useNavigate } from "react-router-dom"
import CyberButton from "../components/CyberButton"

const Organizers = () => {
    const navigate = useNavigate()

    return (
        <section
            id="organizers"
            className="relative pt-16 pb-10 w-full overflow-hidden"
        >

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                    {/* Title: JOIN OUR TEAM - large bold uppercase red with glow */}
                    <h2
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-main-500 uppercase tracking-wider mb-12"
                    >
                        JOIN OUR TEAM
                    </h2>

                    {/* Subtitle: Register As Organizer */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white/95 mb-6 tracking-widest">
                        Register As Organizer
                    </h3>

                    {/* Descriptive paragraph - narrower width, 3-line wrap */}
                    <p className="text-white/80 text-base font-light sm:text-lg leading-relaxed mb-8 max-w-lg">
                        Join the mobAI organizing team and help us create an epic experience for all participants. Your skills and passion will make a difference!
                    </p>

                    {/* APPLY NOW! button */}
                    <CyberButton
                        variant="primary"
                        onClick={() => navigate("/mobai/organizers")}
                        className="uppercase font-bold px-10 py-2 text-xl"
                    >
                        APPLY NOW!
                    </CyberButton>

                    {/* Limited positions available */}
                    <p className="text-white/70 text-sm mt-6">
                        Limited positions available
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Organizers
