import Star from "../components/ui/star"
import { useRegistration } from "../lib/registerationData";
import CosmicSelect from "../components/ui/select"

export default function DepartmentInfo() {
    const { formData, handleSelectChange, errors } = useRegistration();

    const departments = [
        "Design Department",
        "Events Department",
        "IT Department",
        "Marketing Department",
        "Relex Department",
        "Human Resources Department",
    ]
    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="text-center mb-8">
                <img
                    src="/icons/department.svg"
                    alt="User Icon"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                />
                <h2 className="section-title">Department Preferences</h2>
                {errors.similar && <p className="text-error-200 text-sm my-1">* {errors.similar}</p>}

            </div>

            <div className="space-y-6 px-2 md:px-10">
                <h3 className="text-white text-lg md:text-[20px] font-bold mb-1">
                    Pick Your Top 3 Departments (by Priority):
                </h3>

                <p className="text-neutral-300 text-base md:text-[16px] mb-6">
                    Choose wisely! Your first choice will be considered your preferred department.
                </p>

                <div>
                    <label className="input-label">Priority 1 (First Choice) <Star /></label>
                    <CosmicSelect
                        placeholder="Select your First Choice"
                        options={departments}
                        value={formData.dep1}
                        onValueChange={value => handleSelectChange("dep1", value)}
                        required
                    />
                    {errors.dep1 && <p className="text-error-200 text-sm my-1">* {errors.dep1}</p>}

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="input-label">Priority 2 (Second Choice) <Star /></label>
                        <CosmicSelect
                            placeholder="Select your First Choice"
                            options={departments}
                            value={formData.dep2}
                            onValueChange={value => handleSelectChange("dep2", value)}
                            required
                        />
                        {errors.dep2 && <p className="text-error-200 text-sm my-1">* {errors.dep2}</p>}

                    </div>
                    <div>
                        <label className="input-label">Priority 3 (Third Choice) <Star /></label>
                        <CosmicSelect
                            placeholder="Select your First Choice"
                            options={departments}
                            value={formData.dep3}
                            onValueChange={value => handleSelectChange("dep3", value)}
                            required
                        />
                        {errors.dep3 && <p className="text-error-200 text-sm my-1">* {errors.dep3}</p>}

                    </div>

                </div>
            </div>
        </div>
    )

}


