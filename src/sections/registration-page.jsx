"use client"
import React, { useState, useRef } from "react"
import { Button } from "../components/ui/button"
import CosmicSelect from "../components/ui/select"
import { useNavigate } from "react-router-dom";
import wilayas from "../data/wilayas.json"
import { supabase } from "../lib/supabaseClient";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Loader2,
} from "lucide-react"

function Star() {
    return <span className="text-error-200">*</span>;
}


function RegistrationPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // Personal Information
        fullname: "",
        email: "",
        phone: "",
        discordID: "",

        // Academic Information
        university: "",
        university_location: "",
        field: "",
        yearOfStudy: "",

        // // department info:
        // dep1: "",
        // dep2: "",
        // dep3: "",

        // // Club-specific Information
        // dep1_motiv: "",
        // dep2_3_motiv: "",
        // goals: "",

        // // Profile Photo
        // profilePhoto: null,
        // profilePhotoPreview: null,
    })

    const totalSteps = 2
    const yearOptions = [
        "1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate"
    ];
    // const departments = [
    //     "Design Department",
    //     "IT Department",
    //     "Marketing Department",
    //     "Relex Department",
    //     "Human Resources Department",
    //     "Logistics Department",
    // ]


    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // clear error for this field
        if (errors[field]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };

    const handleSelectChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        if (errors[field]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    }

    // const handlePhotoUpload = (event) => {
    //     const file = event.target.files[0]
    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onload = (e) => {
    //             setFormData((prev) => ({
    //                 ...prev,
    //                 profilePhoto: file,
    //                 profilePhotoPreview: e.target.result,
    //             }))
    //         }
    //         reader.readAsDataURL(file)
    //     }
    // }

    const [errors, setErrors] = useState({});

    const validateStep = async () => { // more validation logic to be added 
        let stepErrors = {};

        if (currentStep === 1) {
            if (!formData.fullname.trim()) stepErrors.fullname = "Please enter your Full name";
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                stepErrors.phone = "Please respect the given format (no spaces)";
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                stepErrors.email = "Please enter a valid Email address";
            }
            // if (Object.keys(stepErrors).length === 0) {
            //     const { data, error } = await supabase
            //         .from("registration")
            //         .select("fullname")
            //         .eq("email", formData.email.trim());

            //     if (data.length > 0) {

            //         localStorage.setItem("alreadyRegistered", "true");
            //         navigate("/registered", {
            //             state: {
            //                 title: "You're already registered",
            //                 msg: "Thank you for registering. Please wait for our response, we'll get back to you soon.",
            //             },
            //         });
            //         window.scrollTo(0, 0);

            //         return false;
            //     }
            // }
        }

        if (currentStep === 2) {
            if (!formData.university.trim()) stepErrors.university = "Please enter the name of your University";
            if (!formData.yearOfStudy) stepErrors.yearOfStudy = "Please specify your current year of study";
            if (!formData.field.trim()) stepErrors.field = "Please enter your Field of study";
            // if (!formData.university_location) stepErrors.university_location = "Please select the city where your university is located";
        }

        // if (currentStep === 3) {
        //     if (!formData.dep1) stepErrors.dep1 = "First choice is required";
        //     if (!formData.dep2) stepErrors.dep2 = "Second choice is required";
        //     if (!formData.dep3) stepErrors.dep3 = "Third choice is required";
        //     if (formData.dep1 == formData.dep2 || formData.dep1 == formData.dep3 || formData.dep2 == formData.dep3) {
        //         stepErrors.similar = "Department choices must be different";
        //     }
        // }

        // if (currentStep === 4) {
        //     if (!formData.dep1_motiv.trim() || formData.dep1_motiv.trim().length < 30) {
        //         stepErrors.dep1_motiv = "Write at least 30 characters about your first choice";
        //     }

        //     if (!formData.dep2_3_motiv.trim() || formData.dep2_3_motiv.trim().length < 30) {
        //         stepErrors.dep2_3_motiv = "Write at least 30 characters about your second/third choices";
        //     }

        //     if (!formData.goals.trim() || formData.goals.trim().length < 30) {
        //         stepErrors.goals = "Write at least 30 characters about your goals";
        //     }

        //     if (formData.dep1_motiv.trim().length > 1000) {
        //         stepErrors.dep1_motiv = "Keep it less than 1000 chcharacters";
        //     }
        //     if (formData.dep2_3_motiv.trim().length > 1000) {
        //         stepErrors.dep2_3_motiv = "Keep it less than 1000 chcharacters";
        //     }
        //     if (formData.goals.trim().length > 1000) {
        //         stepErrors.dep1_motiv = "Keep it less than 1000 chcharacters";
        //     }
        // }

        // if (currentStep === 5) {
        //     if (!formData.image) stepErrors.dep1_motiv = "Please upload your profile photo";
        // }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const nextStep = async () => {
        const isValid = await validateStep();
        if (isValid) { /*uncomment*/
            setCurrentStep((prev) => prev + 1);
        }
    };


    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const submitForm = async () => {
        const isValid = await validateStep();
        if (isValid) {
            setIsSubmitting(true)

            try {
                // <<<<<<<<<<<<<<<<<<<<<<<<< database logic goes here >>>>>>>>>>>>>>>>
                const { error } = await supabase.from("registration").insert([
                    {
                        fullname: formData.fullname.trim(),
                        email: formData.email.trim(),
                        phone: formData.phone.trim(),
                        discord_id: formData.discordID.trim() || null,
                        university: formData.university.trim(),
                        university_location: formData.university_location || null,
                        field: formData.field.trim(),
                        year_of_study: formData.yearOfStudy,
                        // dep1: formData.dep1  || null,
                        // dep2: formData.dep2,
                        // dep3: formData.dep3,
                        // dep1_motiv: formData.dep1_motiv,
                        // dep2_3_motiv: formData.dep2_3_motiv,
                        // goals: formData.goals,
                    },
                ]);

                if (error) throw error;
                localStorage.setItem("alreadyRegistered", "true");

                navigate("/registered");
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error submitting form:", error)
                alert("There was an error submitting your registration. Please try again.")
            } finally {
                setIsSubmitting(false)
            }
        }


    }



    return (
        <div
            className="min-h-screen p-2 bg-cover bg-center bg-repeat"
            style={{ backgroundImage: "url('/images/Team_Section.webp')" }}
        >

            {/* Header */}
            <div className="max-w-6xl mx-auto py-4">
                <div className="mb-4 text-center">
                    <h1 className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold p-2 grad-title">Join Skill&Tell</h1>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-Main-600 rounded-full h-2 mb-8">
                    <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                            width: `${(currentStep / totalSteps) * 100}%`,
                            background: "linear-gradient(90deg,#FF6D00,#7B2CBF)",
                        }}
                    ></div>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-5xl mx-auto mb-6">
                <div className="glass rounded-2xl p-6 md:p-8">
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="text-center mb-8">
                                <img
                                    src="/icons/Profile.svg"
                                    alt="User Icon"
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                                />
                                <h2 className="section-title">Personal Information</h2>
                            </div>

                            <div className="input-cont">
                                <div>
                                    <label className="input-label">Full Name <Star /></label>
                                    <input
                                        type="text"
                                        value={formData.fullname}
                                        onChange={(e) => handleInputChange("fullname", e.target.value)}
                                        className="input-style"
                                        placeholder="Enter your Full name"
                                        required
                                    />
                                    {errors.fullname && <p className="text-error-200 text-sm my-1">* {errors.fullname}</p>}
                                </div>
                                <div>
                                    <label className="input-label">Phone Number <Star /></label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className="input-style"
                                        placeholder="Eg: 0712435687"
                                        required
                                    />
                                    {errors.phone && <p className="text-error-200 text-sm my-1">* {errors.phone}</p>}

                                </div>
                                <div>
                                    <label className="input-label">Email Address <Star /></label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="input-style"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-error-200 text-sm my-1">* {errors.email}</p>}
                                </div>
                                <div>
                                    <label className="input-label">Discord ID</label>
                                    <input
                                        type="text"
                                        value={formData.discordID}
                                        onChange={(e) => handleInputChange("discordID", e.target.value)}
                                        className="input-style"
                                        placeholder="Enter your Discord ID"
                                        required
                                    />
                                    {errors.discordID && <p className="text-error-200 text-sm my-1">* {errors.discordID}</p>}

                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Academic Information */}
                    {currentStep === 2 && (
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
                    )}

                    {/* Step 3: Department Information */}
                    {/* {currentStep === 3 && (
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
                    )} */}

                    {/* Step 4: motivation */}
                    {/* {currentStep === 4 && (
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
                                <div>
                                    <label className="input-label">Your Goals in Skill & Tell <Star /></label>
                                    <textarea
                                        value={formData.goals}
                                        onChange={(e) => {
                                            handleInputChange("goals", e.target.value);

                                            // Auto-resize logic
                                            e.target.style.height = "auto"; // reset height
                                            e.target.style.height = e.target.scrollHeight + "px"; // set new height
                                        }}
                                        className="input-style resize-none textarea-responsive pr-4 overflow-hidden"
                                        placeholder="Tell us why you're interested in this department. What excites you about it? Do you have any relevant skills or experience?"
                                    />

                                    {errors.goals && <p className="text-error-200 text-sm my-1">* {errors.goals}</p>}

                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* Step 5: Profile Photo */}
                    {/* {currentStep === 5 && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="text-center mb-8">
                                <img
                                    src="/icons/Camera.svg"
                                    alt="User Icon"
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                                />
                                <h2 className="section-title">Profile Photo</h2>
                                <p className="text-space-text/70">Upload your photo for our facial recognition system</p>

                            </div>

                            <div className="flex flex-col items-center space-y-6">
                                <div className="relative">
                                    {formData.profilePhotoPreview ? (
                                        <div className="relative">
                                            <img
                                                src={formData.profilePhotoPreview || "/placeholder.svg"}
                                                alt="Profile preview"
                                                className="w-48 h-48 rounded-full object-cover border-4 border-space-accent shadow-lg"
                                            />
                                            <button
                                                onClick={() => handleInputChange("profilePhotoPreview", null)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                                            >
                                                <X size={16} color="white" />

                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-48 h-48 rounded-full bg-space-light/10 border-2 border-dashed border-Main-500 flex items-center justify-center">
                                            <div className="text-center">
                                                <Upload className="w-12 h-12 text-space-text/50 mx-auto mb-2" />
                                                <p className="text-space-text/70 text-sm">No photo uploaded</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handlePhotoUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <Button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="gradient-buttons text-white hover:from-space-orange-light hover:to-space-purple px-8 py-3"
                                    >
                                        {formData.profilePhotoPreview ? "Change Photo" : "Upload Photo"}
                                        <Upload className="w-5 h-5 ml-2" />

                                    </Button>
                                    {errors.profilePhoto && <p className="text-error-200 text-sm my-1">* {errors.profilePhoto}</p>}

                                    <p className="text-space-text/60 text-sm mt-2">
                                        Recommended: Clear, front-facing photo for best recognition results
                                    </p>
                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-space-subtle">
                        {/* <Button onClick={onBack} className="text-white bg-space-light hover:bg-transparent border border-space-subtle rounded-lg">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Button> */}
                        <Button
                            onClick={currentStep === 1 ? () => { navigate("/"); window.scrollTo(0, 0); } : prevStep}
                            variant="ghost"
                            className="text-white/80 border border-Main-500 rounded-sm hover:bg-space-light disabled:opacity-50"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {currentStep === 1 ? 'Back to home' : ' Back'}
                        </Button>



                        {currentStep < totalSteps ? (
                            <Button
                                onClick={nextStep}
                                className="gradient-buttons rounded-sm text-white hover:from-space-orange-light hover:to-space-purple"
                            >
                                Next
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (<Button
                            onClick={submitForm}
                            disabled={isSubmitting}
                            className="bg-gradient-to-r rounded-sm from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 px-4 lg:px-8"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Submit
                                </>
                            )}
                        </Button>)}
                    </div>
                    <div className="w-fit mx-auto flex space-x-2 mt-4 md:mt-6">
                        {Array.from({ length: totalSteps }, (_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i + 1 === currentStep
                                    ? "bg-space-accent scale-125" //bg-[radial-gradient(circle,var(--color-accent-500)_0%,color-mix(in_srgb,var(--color-accent-500)_38%,transparent)_100%)]
                                    : i + 1 < currentStep
                                        ? "bg-space-accent/70"
                                        : "bg-space-subtle"
                                    }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default React.memo(RegistrationPage)