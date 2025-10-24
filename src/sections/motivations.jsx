import { useRegistration } from "../lib/registerationData";
import Star from "../components/ui/star"

export default function Motivations() {
    const { formData, handleInputChange, errors } = useRegistration();
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <img
                    src="/icons/motivation.svg"
                    alt="User Icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                />
                <h2 className="section-title">Motivation</h2>
            </div>

            <div className="space-y-6 px-2 md:px-10">
                <div>
                    <label className="input-label">Motivation for First-Choice Department <Star /></label>
                    <textarea
                        value={formData.dep1_motiv}
                        onChange={(e) => {
                            handleInputChange("dep1_motiv", e.target.value);

                            // Auto-resize logic
                            e.target.style.height = "auto"; // reset height
                            e.target.style.height = e.target.scrollHeight + "px"; // set new height
                        }}
                        className="input-style resize-none pr-4 textarea-responsive overflow-hidden text-sm"
                        placeholder="Tell us why you're interested in this department. What excites you about it? Do you have any relevant skills or experience?"
                    />

                    {errors.dep1_motiv && <p className="text-error-200 text-sm my-1">* {errors.dep1_motiv}</p>}

                </div>
                <div>
                    <label className="input-label">Additional Thoughts on Second/Third Choices<Star /></label>
                    <textarea
                        value={formData.dep2_3_motiv}
                        onChange={(e) => {
                            handleInputChange("dep2_3_motiv", e.target.value);

                            // Auto-resize logic
                            e.target.style.height = "auto"; // reset height
                            e.target.style.height = e.target.scrollHeight + "px"; // set new height
                        }}
                        className="input-style resize-none textarea-responsive pr-4 overflow-hidden"
                        placeholder="Tell us why you're interested in this department. What excites you about it? Do you have any relevant skills or experience?"
                    />

                    {errors.dep2_3_motiv && <p className="text-error-200 text-sm my-1">* {errors.dep2_3_motiv}</p>}

                </div>
                
            </div>
        </div>
    )
}