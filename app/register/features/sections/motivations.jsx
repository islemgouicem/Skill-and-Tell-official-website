import { useRegistration } from "@/lib/hooks/useRegistration";
export default function Motivations() {
    const { formData, handleInputChange, errors } = useRegistration();
    return (<div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <img src="/icons/motivation.svg" alt="User Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"/>
                <h2 className="section-title">Club Experience</h2>
            </div>

            <div className="space-y-6 px-2 md:px-10">
                <div>
                        <label className="input-label">Any club experience</label>
                        <textarea value={formData.club_experience} onChange={(e) => {
                    handleInputChange("club_experience", e.target.value);
            // Auto-resize logic
            e.target.style.height = "auto"; // reset height
            e.target.style.height = e.target.scrollHeight + "px"; // set new height
        }} className="input-style resize-none pr-4 textarea-responsive overflow-hidden text-sm" placeholder="Tell us about any clubs, organizations, or communities you have been part of."/>

                    {errors.club_experience && <p className="text-error-200 text-sm my-1">* {errors.club_experience}</p>}

                </div>

            </div>
        </div>);
}
