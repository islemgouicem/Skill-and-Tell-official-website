import wilayas from "../../../../data/skillntell/wilayas.json"
import CosmicSelect from "../../../../components/ui/select"
import Star from "../../../../components/ui/star"
import { useRegistration } from "../../../../lib/hooks/useRegistration";


export default function AcademicInfo() {
    const { formData, handleInputChange, handleSelectChange, errors } = useRegistration();

    const yearOptions = [
        "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate"
    ];
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <img
                    src="/icons/acad.svg"
                    alt="User Icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                />
                <h2 className="section-title">Academic Information</h2>
            </div>

            <div className="input-cont">
                <div>
                    <label className="input-label">University name <Star /></label>
                    <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => handleInputChange("university", e.target.value)}
                        className="input-style"
                        placeholder="Your university name"
                        required
                    />
                    {errors.university && <p className="text-error-200 text-sm my-1">* {errors.university}</p>}

                </div>
                <div>
                    <label className="input-label">Year of Study <Star /></label>
                    <CosmicSelect
                        placeholder="Select your current year"
                        options={yearOptions}
                        value={formData.yearOfStudy}
                        onValueChange={value => handleSelectChange("yearOfStudy", value)}
                        required
                    />
                    {errors.yearOfStudy && <p className="text-error-200 text-sm my-1">* {errors.yearOfStudy}</p>}

                </div>
                <div>
                    <label className="input-label">Field of Study <Star /></label>
                    <input
                        type="text"
                        value={formData.field}
                        onChange={(e) => handleInputChange("field", e.target.value)}
                        className="input-style"
                        placeholder="Enter your field of study or major"
                        required
                    />
                    {errors.field && <p className="text-error-200 text-sm my-1">* {errors.field}</p>}

                </div>
                <div>
                    <label className="input-label">University Location(City)</label>
                    <CosmicSelect
                        placeholder="Select the city of your university"
                        options={wilayas}
                        value={formData.university_location}
                        onValueChange={value => handleSelectChange("university_location", value)}
                        required
                    />
                    {errors.university_location && <p className="text-error-200 text-sm my-1">* {errors.university_location}</p>}

                </div>
            </div>
        </div>
    )
}