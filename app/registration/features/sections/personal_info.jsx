import Star from "../../../../components/ui/star";
import { useRegistration } from "../../../../lib/hooks/useRegistration";
export default function PersonalInofo() {
    const { formData, handleInputChange, errors } = useRegistration();
    return (<div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <img src="/icons/Profile.svg" alt="User Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"/>
                <h2 className="section-title">Personal Information</h2>
            </div>

            <div className="input-cont">
                <div>
                    <label className="input-label">Full Name <Star /></label>
                    <input type="text" value={formData.fullname} onChange={(e) => handleInputChange("fullname", e.target.value)} className="input-style" placeholder="Enter your Full name" required/>
                    {errors.fullname && <p className="text-error-200 text-sm my-1">* {errors.fullname}</p>}
                </div>
                <div>
                    <label className="input-label">Phone Number <Star /></label>
                    <input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className="input-style" placeholder="Eg: 0712435687" required/>
                    {errors.phone && <p className="text-error-200 text-sm my-1">* {errors.phone}</p>}

                </div>
                <div>
                    <label className="input-label">Discord ID <span className="text-gray-500">(optional)</span></label>
                    <input type="text" value={formData.discordID} onChange={(e) => handleInputChange("discordID", e.target.value)} className="input-style" placeholder="Enter your Discord ID" required/>
                    {errors.discordID && <p className="text-error-200 text-sm my-1">* {errors.discordID}</p>}

                </div>
            </div>
        </div>);
}
