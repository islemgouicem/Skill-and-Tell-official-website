import { useState } from "react"
import CyberButton from "../components/CyberButton"
import CyberCard from "../components/cyberCard"
import CyberInput from "../components/CyberInput"
import CyberSelect from "../components/CyberSelect"
import CyberTextarea from "../components/CyberTextArea"
import FormSectionTitle from "../components/FormSectionTitle"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../../lib/services/supabase"
import "../../../styles/mobai.css"
import regBg from "../../../assets/images/mobai/reg_bg.svg"
import { User, School, Users, Calendar, Briefcase, Clock, Phone, GraduationCap } from "lucide-react"

const SHIFT_OPTIONS = [
    { value: "10-17", label: "10:00 AM - 5:00 PM" },
    { value: "17-00", label: "5:00 PM - 12:00 AM" },
    { value: "00-10", label: "12:00 AM - 10:00 AM" }
]

const YEAR_OPTIONS = [
    { value: 1, label: "1st Year" },
    { value: 2, label: "2nd Year" },
    { value: 3, label: "3rd Year" },
    { value: 4, label: "4th Year" },
    { value: 5, label: "5th Year" }
]

const INITIAL_FORM_DATA = {
    full_name: "",
    phone_number: "",
    school_or_uni: "",
    year_of_study: "",
    is_member: null,
    available_premeet: null,
    available_day1: false,
    available_day2: false,
    available_day3: false,
    shift_day1: "",
    shift_day2: "",
    shift_day3: "",
    has_previous_experience: null,
    previous_experience_description: ""
}

const CyberRadio = ({ label, name, value, checked, onChange }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div
                className={`
                    relative w-5 h-5 rounded-full border-2 transition-all duration-300
                    ${checked
                        ? "border-red-main-500 bg-red-main-500/20"
                        : "border-red-main-500/50 bg-transparent"
                    }
                    group-hover:border-red-main-500
                `}
            >
                {checked && (
                    <div className="absolute inset-1 rounded-full bg-red-main-500" />
                )}
            </div>
            <span className="text-white text-sm">{label}</span>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
        </label>
    )
}

const CyberCheckbox = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center gap-3 cursor-pointer group">
            <div
                className={`
                    relative w-5 h-5 rounded-sm border-2 transition-all duration-300
                    ${checked
                        ? "border-red-main-500 bg-red-main-500/20"
                        : "border-red-main-500/50 bg-transparent"
                    }
                    group-hover:border-red-main-500
                `}
            >
                {checked && (
                    <svg
                        className="absolute inset-0 w-full h-full text-red-main-500 p-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </div>
            <span className="text-white text-sm">{label}</span>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only"
            />
        </label>
    )
}

const OrganizersRegPage = () => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const [errors, setErrors] = useState({})
    const [rotation, setRotation] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.full_name.trim()) {
            newErrors.full_name = "Name is required"
        } else if (formData.full_name.trim().length < 3) {
            newErrors.full_name = "Name must be at least 3 characters"
        }

        if (!formData.phone_number.trim()) {
            newErrors.phone_number = "Phone number is required"
        } else if (formData.phone_number.trim().length < 10) {
            newErrors.phone_number = "Please enter a valid phone number"
        }

        if (!formData.school_or_uni.trim()) {
            newErrors.school_or_uni = "School is required"
        }

        if (!formData.year_of_study) {
            newErrors.year_of_study = "Please select your year of study"
        }

        if (formData.is_member === null) {
            newErrors.is_member = "Please select an option"
        }

        if (formData.available_premeet === null) {
            newErrors.available_premeet = "Please select an option"
        }

        if (!formData.available_day1 && !formData.available_day2 && !formData.available_day3) {
            newErrors.available_days = "Please select at least one day"
        }

        // Validate shift selection for each selected day
        if (formData.available_day1 && !formData.shift_day1) {
            newErrors.shift_day1 = "Please select a shift for February 12"
        }
        if (formData.available_day2 && !formData.shift_day2) {
            newErrors.shift_day2 = "Please select a shift for February 13"
        }
        if (formData.available_day3 && !formData.shift_day3) {
            newErrors.shift_day3 = "Please select a shift for February 14"
        }

        if (formData.has_previous_experience === null) {
            newErrors.has_previous_experience = "Please select an option"
        }

        if (formData.has_previous_experience === true && !formData.previous_experience_description.trim()) {
            newErrors.previous_experience_description = "Please describe your experience"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleStart = () => {
        setRotation(prev => prev + 180)
        setTimeout(() => setShowForm(true), 250)
    }

    const handleBack = () => {
        setSubmitError(null)
        if (showForm) {
            setRotation(prev => prev - 180)
            setTimeout(() => setShowForm(false), 250)
        } else {
            navigate("/mobai")
            window.scrollTo(0, 0)
        }
    }

    const handleSubmit = async () => {
        setSubmitError(null)

        if (!validateForm()) {
            setSubmitError("Please fix the errors above.")
            return
        }

        setIsSubmitting(true)

        try {
            const { error } = await supabase.from("mobai_organizers").insert({
                full_name: formData.full_name.trim(),
                phone_number: formData.phone_number.trim(),
                school_or_uni: formData.school_or_uni.trim(),
                year_of_study: parseInt(formData.year_of_study),
                is_member: formData.is_member ? "yes" : "no",
                available_premeet: formData.available_premeet ? "yes" : "no",
                available_day1: formData.available_day1 ? "yes" : "no",
                available_day2: formData.available_day2 ? "yes" : "no",
                available_day3: formData.available_day3 ? "yes" : "no",
                shift_day1: formData.available_day1 ? formData.shift_day1 : null,
                shift_day2: formData.available_day2 ? formData.shift_day2 : null,
                shift_day3: formData.available_day3 ? formData.shift_day3 : null,
                has_previous_experience: formData.has_previous_experience ? "yes" : "no",
                previous_experience_description: formData.has_previous_experience ? formData.previous_experience_description.trim() : null
            })

            if (error) {
                throw new Error(error.message || "Submission failed. Please try again.")
            }

            setSubmitSuccess(true)
        } catch (err) {
            const msg = err.message || "Submission failed. Please try again."
            setSubmitError(msg)
        } finally {
            setIsSubmitting(false)
        }
    }

    const renderWelcome = () => (
        <div className="space-y-6 text-white">
            <div className="text-center space-y-2 pb-4 border-b-2 border-[#6B33A1]/30">
                <h1 className="text-3xl font-bold text-[#6B33A1] uppercase tracking-wider">
                    Organizer Registration
                </h1>
                <p className="text-sm text-gray-300">
                    Join the MOBAi team as an organizer
                </p>
            </div>

            <section className="space-y-2">
                <h2 className="text-xl font-bold text-red-main-500 uppercase tracking-wide border-l-4 border-red-main-500 pl-3">
                    What We're Looking For
                </h2>
                <div className="pl-3 text-gray-300 text-sm leading-relaxed space-y-2">
                    <p>
                        We need dedicated individuals to help make MOBAi a success.
                        As an organizer, you'll be part of the team that brings this
                        event to life.
                    </p>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-xl font-bold text-red-main-500 uppercase tracking-wide border-l-4 border-red-main-500 pl-3">
                    Event Details
                </h2>

                <div className="space-y-3 pl-3 text-sm">
                    <div className="border-l-2 border-[#663380] pl-3 py-1">
                        <h3 className="font-bold text-[#6B33A1] mb-1 uppercase text-xs tracking-wide">
                            Event Dates
                        </h3>
                        <p className="text-gray-300">
                            February 12, 13, 14, 2026
                        </p>
                    </div>

                    <div className="border-l-2 border-[#663380] pl-3 py-1">
                        <h3 className="font-bold text-[#6B33A1] mb-2 uppercase text-xs tracking-wide">
                            Shifts Available
                        </h3>
                        <div className="space-y-1 ml-3">
                            <div className="flex items-start gap-2">
                                <span className="text-red-main-500 font-bold">›</span>
                                <span className="text-gray-300">Morning: 10:00 AM - 5:00 PM</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-red-main-500 font-bold">›</span>
                                <span className="text-gray-300">Evening: 5:00 PM - 12:00 AM</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-red-main-500 font-bold">›</span>
                                <span className="text-gray-300">Night: 12:00 AM - 10:00 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-4 text-center">
                <p className="text-xs text-gray-400 italic">
                    Click "START" to begin your registration
                </p>
            </div>
        </div>
    )

    const renderForm = () => (
        <div className="space-y-8">
            {/* Personal Information */}
            <div>
                <FormSectionTitle title="Personal Information" icon={User} />
                <div className="space-y-4">
                    <CyberInput
                        id="organizer-full_name"
                        label="Full Name"
                        required
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={(e) => updateField("full_name", e.target.value)}
                        error={errors.full_name}
                    />

                    <CyberInput
                        id="organizer-phone"
                        label="Phone Number"
                        required
                        placeholder="Enter your phone number"
                        value={formData.phone_number}
                        onChange={(e) => updateField("phone_number", e.target.value)}
                        error={errors.phone_number}
                    />

                    <CyberInput
                        id="organizer-school"
                        label="School / University"
                        required
                        placeholder="Where do you study?"
                        value={formData.school_or_uni}
                        onChange={(e) => updateField("school_or_uni", e.target.value)}
                        error={errors.school_or_uni}
                    />

                    <CyberSelect
                        id="organizer-year"
                        label="Year of Study"
                        required
                        options={YEAR_OPTIONS}
                        placeholder="Select your year..."
                        value={formData.year_of_study}
                        onChange={(e) => updateField("year_of_study", e.target.value)}
                        error={errors.year_of_study}
                    />
                </div>
            </div>

            {/* Membership */}
            <div>
                <FormSectionTitle title="Membership" icon={Users} />
                <div className="space-y-3">
                    <label className="text-white text-sm font-medium">
                        Are you a member of the club? <span className="text-red-main-500">*</span>
                    </label>
                    <div className="flex gap-6">
                        <CyberRadio
                            label="Yes"
                            name="is_member"
                            value="yes"
                            checked={formData.is_member === true}
                            onChange={() => updateField("is_member", true)}
                        />
                        <CyberRadio
                            label="No"
                            name="is_member"
                            value="no"
                            checked={formData.is_member === false}
                            onChange={() => updateField("is_member", false)}
                        />
                    </div>
                    {errors.is_member && (
                        <span className="text-[#FF6E6E] text-xs">* {errors.is_member}</span>
                    )}
                </div>
            </div>

            {/* Availability */}
            <div>
                <FormSectionTitle title="Availability" icon={Calendar} />
                <div className="space-y-6">
                    {/* Pre-meet availability */}
                    <div className="space-y-3">
                        <label className="text-white text-sm font-medium">
                            Are you available for the pre-organization meeting? <span className="text-red-main-500">*</span>
                        </label>
                        <div className="flex gap-6">
                            <CyberRadio
                                label="Yes"
                                name="available_premeet"
                                value="yes"
                                checked={formData.available_premeet === true}
                                onChange={() => updateField("available_premeet", true)}
                            />
                            <CyberRadio
                                label="No"
                                name="available_premeet"
                                value="no"
                                checked={formData.available_premeet === false}
                                onChange={() => updateField("available_premeet", false)}
                            />
                        </div>
                        {errors.available_premeet && (
                            <span className="text-[#FF6E6E] text-xs">* {errors.available_premeet}</span>
                        )}
                    </div>

                    {/* Event days availability with shift selection */}
                    <div className="space-y-4">
                        <label className="text-white text-sm font-medium">
                            Which days are you available and which shift? <span className="text-red-main-500">*</span>
                        </label>
                        
                        {/* February 12 */}
                        <div className="border-l-2 border-[#663380] pl-4 py-2 space-y-3">
                            <CyberCheckbox
                                label="February 12"
                                checked={formData.available_day1}
                                onChange={(checked) => {
                                    updateField("available_day1", checked)
                                    if (!checked) updateField("shift_day1", "")
                                }}
                            />
                            {formData.available_day1 && (
                                <div className="ml-8">
                                    <CyberSelect
                                        id="organizer-shift-1"
                                        label="Preferred shift for Feb 12"
                                        required
                                        options={SHIFT_OPTIONS}
                                        placeholder="Select shift..."
                                        value={formData.shift_day1}
                                        onChange={(e) => updateField("shift_day1", e.target.value)}
                                        error={errors.shift_day1}
                                    />
                                </div>
                            )}
                        </div>

                        {/* February 13 */}
                        <div className="border-l-2 border-[#663380] pl-4 py-2 space-y-3">
                            <CyberCheckbox
                                label="February 13"
                                checked={formData.available_day2}
                                onChange={(checked) => {
                                    updateField("available_day2", checked)
                                    if (!checked) updateField("shift_day2", "")
                                }}
                            />
                            {formData.available_day2 && (
                                <div className="ml-8">
                                    <CyberSelect
                                        id="organizer-shift-2"
                                        label="Preferred shift for Feb 13"
                                        required
                                        options={SHIFT_OPTIONS}
                                        placeholder="Select shift..."
                                        value={formData.shift_day2}
                                        onChange={(e) => updateField("shift_day2", e.target.value)}
                                        error={errors.shift_day2}
                                    />
                                </div>
                            )}
                        </div>

                        {/* February 14 */}
                        <div className="border-l-2 border-[#663380] pl-4 py-2 space-y-3">
                            <CyberCheckbox
                                label="February 14"
                                checked={formData.available_day3}
                                onChange={(checked) => {
                                    updateField("available_day3", checked)
                                    if (!checked) updateField("shift_day3", "")
                                }}
                            />
                            {formData.available_day3 && (
                                <div className="ml-8">
                                    <CyberSelect
                                        id="organizer-shift-3"
                                        label="Preferred shift for Feb 14"
                                        required
                                        options={SHIFT_OPTIONS}
                                        placeholder="Select shift..."
                                        value={formData.shift_day3}
                                        onChange={(e) => updateField("shift_day3", e.target.value)}
                                        error={errors.shift_day3}
                                    />
                                </div>
                            )}
                        </div>

                        {errors.available_days && (
                            <span className="text-[#FF6E6E] text-xs">* {errors.available_days}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Experience */}
            <div>
                <FormSectionTitle title="Experience" icon={Briefcase} />
                <div className="space-y-4">
                    <div className="space-y-3">
                        <label className="text-white text-sm font-medium">
                            Do you have previous organizing experience? <span className="text-red-main-500">*</span>
                        </label>
                        <div className="flex gap-6">
                            <CyberRadio
                                label="Yes"
                                name="has_previous_experience"
                                value="yes"
                                checked={formData.has_previous_experience === true}
                                onChange={() => updateField("has_previous_experience", true)}
                            />
                            <CyberRadio
                                label="No"
                                name="has_previous_experience"
                                value="no"
                                checked={formData.has_previous_experience === false}
                                onChange={() => updateField("has_previous_experience", false)}
                            />
                        </div>
                        {errors.has_previous_experience && (
                            <span className="text-[#FF6E6E] text-xs">* {errors.has_previous_experience}</span>
                        )}
                    </div>

                    {formData.has_previous_experience === true && (
                        <CyberTextarea
                            id="organizer-experience"
                            label="Describe your experience"
                            required
                            placeholder="Tell us about your previous organizing experience..."
                            value={formData.previous_experience_description}
                            onChange={(e) => updateField("previous_experience_description", e.target.value)}
                            error={errors.previous_experience_description}
                        />
                    )}
                </div>
            </div>
        </div>
    )

    const renderSuccess = () => (
        <div className="text-center space-y-6 py-4">
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                Thank You!
            </h2>
            <p className="text-white/90 text-lg">
                Your organizer registration has been submitted successfully.
            </p>
            <p className="text-white/80">
                We'll be in touch soon with more details.
            </p>
            <div className="flex justify-center mt-8">
                <CyberButton
                    variant="primary"
                    icon="right"
                    onClick={() => {
                        navigate("/mobai")
                        window.scrollTo(0, 0)
                    }}
                >
                    Return to MOBAi
                </CyberButton>
            </div>
        </div>
    )

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center py-18 px-4"
            style={{
                backgroundImage: `url(${regBg})`,
                imageRendering: "crisp-edges"
            }}
        >
            <div className="w-full max-w-4xl" style={{ perspective: "2000px" }}>
                <div
                    style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 0.5s ease-in-out",
                        transform: `rotateY(${rotation}deg)`
                    }}
                >
                    <div
                        style={{
                            transform: (rotation / 180) % 2 !== 0 ? "scaleX(-1)" : "scaleX(1)",
                            transition: "transform 0.5s ease-in-out"
                        }}
                    >
                        {submitSuccess ? (
                            <CyberCard>
                                {renderSuccess()}
                            </CyberCard>
                        ) : (
                            <CyberCard>
                                {!showForm ? renderWelcome() : renderForm()}

                                {submitError && (
                                    <p className="text-[#FF6E6E] text-sm mt-4">* {submitError}</p>
                                )}

                                <div className="flex justify-between items-center mt-8">
                                    <CyberButton
                                        variant="outline"
                                        icon="left"
                                        onClick={handleBack}
                                        disabled={isSubmitting}
                                    >
                                        BACK
                                    </CyberButton>

                                    {!showForm ? (
                                        <CyberButton
                                            variant="primary"
                                            icon="right"
                                            onClick={handleStart}
                                        >
                                            START
                                        </CyberButton>
                                    ) : (
                                        <CyberButton
                                            variant="primary"
                                            icon={isSubmitting ? "loader" : "right"}
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting…" : "SUBMIT"}
                                        </CyberButton>
                                    )}
                                </div>
                            </CyberCard>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganizersRegPage
