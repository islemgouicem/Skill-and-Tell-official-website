"use client"
import React, { useState, useRef } from "react"
import { Button } from "../components/ui/button"
import ProgressStepper from "../components/ui/progress_eunoia"
import CosmicSelect from "../components/ui/select"
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Loader2,
    X,
    Plus,
    Trash2
} from "lucide-react"

function Star() {
    // This component renders the red asterisk for required fields
    return <span className="text-error-200">*</span>;
}

// Define the structure for a single team member (for the members array)
const initialMember = {
    fullName: "",
    email: "",
    phone: "",
    university: "",
    linkedin: "",
    github: "",
};


function IdeathonRegistration() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate();

    // Configuration for team size
    const totalSteps = 3
    const MIN_MEMBERS_COUNT = 3; // Minimum required *additional* members (Leader + 3 = 4 total)
    const MAX_MEMBERS_COUNT = 4; // Maximum allowed *additional* members (Leader + 4 = 5 total)

    const [formData, setFormData] = useState({
        // Team Information (teams table)
        teamName: "",
        leaderUniversity: "",
        teamMotivation: "",

        // Leader Information (teams table + member fields)
        leaderName: "",
        leaderEmail: "",
        leaderPhone: "",
        leaderLinkedin: "",
        leaderGithub: "",

        // Additional Members - Start with the 3 required members
        members: [
            { ...initialMember }, // Member 1 (index 0)
            { ...initialMember }, // Member 2 (index 1)
            { ...initialMember }, // Member 3 (index 2)
        ],
    })

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

    const handleMemberChange = (index, field, value) => {
        const newMembers = [...formData.members];
        newMembers[index] = {
            ...newMembers[index],
            [field]: value,
        };
        setFormData((prev) => ({
            ...prev,
            members: newMembers,
        }));

        // Clear member errors
        if (errors.members && errors.members[index] && errors.members[index][field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (newErrors.members && newErrors.members[index]) {
                    delete newErrors.members[index][field];
                    if (Object.keys(newErrors.members[index] || {}).length === 0) {
                        delete newErrors.members[index];
                    }
                }
                if (newErrors.members && Object.keys(newErrors.members).length === 0) {
                    delete newErrors.members;
                }
                return newErrors;
            });
        }
    };

    const addMember = () => {
        if (formData.members.length < MAX_MEMBERS_COUNT) {
            setFormData(prev => ({
                ...prev,
                members: [...prev.members, { ...initialMember }]
            }));
        }
    };

    const removeMember = (indexToRemove) => {
        // Only allow removal of members beyond the minimum (index 3 or higher)
        if (indexToRemove >= MIN_MEMBERS_COUNT) {
            setFormData(prev => ({
                ...prev,
                members: prev.members.filter((_, index) => index !== indexToRemove)
            }));

            // Also clear any errors for the removed member
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                if (newErrors.members) {
                    delete newErrors.members[indexToRemove];
                    if (Object.keys(newErrors.members || {}).length === 0) {
                        delete newErrors.members;
                    }
                }
                return newErrors;
            });
        }
    };


    const [errors, setErrors] = useState({});

    const validateStep = async () => {
        let stepErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (currentStep === 1) {
            // Team Validation (Registration 1.png)
            if (!formData.teamName.trim()) stepErrors.teamName = "Please enter the Team Name";

            // Leader Validation (Registration 1.png)
            if (!formData.leaderName.trim()) stepErrors.leaderName = "Leader's Full Name is required";
            if (!formData.leaderEmail.trim() || !emailRegex.test(formData.leaderEmail)) stepErrors.leaderEmail = "Please enter a valid Leader Email address";
            if (!formData.leaderPhone.trim() || !phoneRegex.test(formData.leaderPhone)) stepErrors.leaderPhone = "Please enter a valid Leader Phone number (10-15 digits, no spaces)";
            if (!formData.leaderUniversity.trim()) stepErrors.leaderUniversity = "Please enter the Team's Primary University";
            if (!formData.leaderLinkedin.trim()) stepErrors.leaderLinkedin = "LinkedIn is required";
            if (!formData.leaderGithub.trim()) stepErrors.leaderGithub = "GitHub is required";
        }

        if (currentStep === 2) {
            const membersToValidate = formData.members;
            const requiredMembers = membersToValidate.slice(0, MIN_MEMBERS_COUNT); // First 3

            // 1. Minimum Team Size Check (Leader + 3 Members MIN)
            const filledRequiredMembersCount = requiredMembers.filter(m => m.fullName.trim()).length;
            if (filledRequiredMembersCount < MIN_MEMBERS_COUNT) {
                stepErrors.minMembers = `You must fill out the information for all ${MIN_MEMBERS_COUNT} required team members.`;
            }

            let memberErrors = {};

            // 2. Validate required members (index 0, 1, 2)
            requiredMembers.forEach((member, index) => {
                let memberErr = {};
                // ALL fields are required for the first 3 members
                if (!member.fullName.trim()) memberErr.fullName = "Full name is required";
                if (!member.email.trim() || !emailRegex.test(member.email)) memberErr.email = "Valid email is required";
                if (!member.university.trim()) memberErr.university = "University is required";
                if (!member.phone.trim() || !phoneRegex.test(member.phone)) memberErr.phone = "Valid phone number is required";
                if (!member.linkedin.trim()) memberErr.linkedin = "LinkedIn is required";
                if (!member.github.trim()) memberErr.github = "GitHub is required";

                if (Object.keys(memberErr).length > 0) {
                    memberErrors[index] = memberErr;
                }
            });

            // 3. Validate OPTIONAL 4th member (index 3)
            const optionalMember = membersToValidate[MIN_MEMBERS_COUNT]; // index 3
            if (optionalMember) {
                const isMemberFilled = Object.values(optionalMember).some(val => val && val.trim());

                if (isMemberFilled) {
                    let memberErr = {};
                    // If any field is filled, all fields must be valid/filled.
                    if (!optionalMember.fullName.trim()) memberErr.fullName = "Full name is required";
                    if (!optionalMember.email.trim() || !emailRegex.test(optionalMember.email)) memberErr.email = "Valid email is required";
                    if (!optionalMember.university.trim()) memberErr.university = "University is required";
                    if (!optionalMember.phone.trim() || !phoneRegex.test(optionalMember.phone)) memberErr.phone = "Valid phone number is required";
                    if (!optionalMember.linkedin.trim()) memberErr.linkedin = "LinkedIn is required";
                    if (!optionalMember.github.trim()) memberErr.github = "GitHub is required";

                    if (Object.keys(memberErr).length > 0) {
                        memberErrors[MIN_MEMBERS_COUNT] = memberErr; // Index 3
                    }
                }
            }

            if (Object.keys(memberErrors).length > 0) {
                stepErrors.members = memberErrors;
            }

            // 4. Cross-member email uniqueness validation (Leader + all members)
            const allEmails = [
                formData.leaderEmail.trim().toLowerCase(),
                ...membersToValidate
                    .filter(m => m.email.trim()) // Only check non-empty emails
                    .map(m => m.email.trim().toLowerCase())
            ];

            const uniqueEmails = new Set(allEmails);

            if (allEmails.length !== uniqueEmails.size) {
                stepErrors.duplicateEmails = "A team member's email cannot be the same as the leader's or another member's.";
            }
        }

        if (currentStep === 3) {
            // Motivation Validation
            if (!formData.teamMotivation.trim() || formData.teamMotivation.trim().length < 50) stepErrors.teamMotivation = "Motivation must be at least 50 characters.";
        }

        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };

    const nextStep = async () => {
        const isValid = await validateStep();
        if (true) {
            setCurrentStep((prev) => prev + 1);
            window.scrollTo(0, 0); // Scroll to top for new step
        }
    };


    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
            window.scrollTo(0, 0); // Scroll to top for new step
        }
    }

    const submitForm = async () => {
        const isValid = await validateStep(); // Validate Step 3 again
        if (isValid) {
            setIsSubmitting(true)

            try {
                // 1. Insert Team Record
                const { data: teamData, error: teamError } = await supabase
                    .from("teams")
                    .insert([
                        {
                            name: formData.teamName.trim(),
                            leader_name: formData.leaderName.trim(),
                            leader_email: formData.leaderEmail.trim(),
                            leader_phone: formData.leaderPhone.trim(),
                            university: formData.leaderUniversity.trim(),
                            motivation: formData.teamMotivation.trim(),
                        },
                    ])
                    .select("id") // Retrieve the new team's ID
                    .single();

                if (teamError) throw teamError;
                const teamId = teamData.id;

                // 2. Prepare and Insert Member Records (Leader + up to 4 members)
                const leaderRecord = {
                    team_id: teamId,
                    full_name: formData.leaderName.trim(),
                    email: formData.leaderEmail.trim(),
                    phone: formData.leaderPhone.trim() || null,
                    university: formData.leaderUniversity.trim(),
                    linkedin: formData.leaderLinkedin.trim() || null,
                    github: formData.leaderGithub.trim() || null,
                };

                // Filter out the optional member (index 3) if they are completely empty
                const additionalMemberRecords = formData.members
                    .filter((member, index) => {
                        if (index < MIN_MEMBERS_COUNT) {
                            return true; // Keep required members (validated to be filled)
                        }
                        // For optional members (index 3), only keep them if they have any content (which validation ensures means they are fully filled)
                        return Object.values(member).some(val => val && val.trim());
                    })
                    .map(member => ({
                        team_id: teamId,
                        full_name: member.fullName.trim(),
                        email: member.email.trim(),
                        phone: member.phone.trim() || null,
                        university: member.university.trim(),
                        linkedin: member.linkedin.trim() || null,
                        github: member.github.trim() || null,
                    }));

                const allMemberRecords = [leaderRecord, ...additionalMemberRecords];

                if (allMemberRecords.length > 0) {
                    const { error: memberError } = await supabase
                        .from("members")
                        .insert(allMemberRecords);

                    if (memberError) throw memberError;
                }

                localStorage.setItem("teamRegistered", "true");

                navigate("/registered", {
                    state: {
                        title: "Registration Complete!",
                        msg: "Your team has been successfully registered. Check your email for next steps.",
                    },
                });
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error submitting form:", error)
                alert(`There was an error submitting your registration. Please check if the leader email or any member email is already in use. Error: ${error.message}`)
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    // Dynamic member rendering for step 2
    const renderMemberForm = (member, index) => {
        const memberLabels = [
            "First Member Information",
            "Second Member Information",
            "Third Member Information",
            "Fourth (Optional) Member Information"
        ];
        const memberInfoLabel = memberLabels[index];

        const isRequiredMember = index < MIN_MEMBERS_COUNT; // True for 0, 1, 2

        return (
            <div key={index} className="space-y-6">
                <div className="border p-4 rounded-lg border-Main-500/50 bg-space-light/5 backdrop-blur-sm">

                    {/* Remove button for optional member */}
                    {(!isRequiredMember) && (
                        <div className='flex justify-end -mt-2 -mr-2'>
                            <Button
                                onClick={() => removeMember(index)}
                                variant="ghost"
                                className="text-error-200 hover:text-error-300 hover:bg-space-light/20 p-2 h-auto"
                            >
                                <Trash2 className="w-5 h-5 mr-1" />
                                Remove Optional Member
                            </Button>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 mb-4 mt-2">
                        <img
                            src="/icons/Profile.svg"
                            alt="Member Icon"
                            className="w-8 h-8"
                        />
                        <h3 className="text-white text-xl font-bold">{memberInfoLabel}</h3>
                    </div>

                    <div className="input-cont grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Full Name */}
                        <div>
                            <label className="input-label">Full Name <Star /></label>
                            <input
                                type="text"
                                value={member.fullName}
                                onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                                className="input-style"
                                placeholder="Enter your full name"
                                required={isRequiredMember}
                            />
                            {errors.members && errors.members[index]?.fullName && <p className="text-error-200 text-sm my-1">* {errors.members[index].fullName}</p>}

                        </div>

                        {/* Email */}
                        <div>
                            <label className="input-label">Email <Star /></label>
                            <input
                                type="email"
                                value={member.email}
                                onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                                className="input-style border-gold"
                                placeholder="Enter your email"
                                required={isRequiredMember}
                            />
                            {errors.members && errors.members[index]?.email && <p className="text-error-200 text-sm my-1">* {errors.members[index].email}</p>}

                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="input-label">Phone Number <Star /></label>
                            <input
                                type="tel"
                                value={member.phone}
                                onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                                className="input-style"
                                placeholder="Enter your phone number"
                                required={isRequiredMember}
                            />
                            {errors.members && errors.members[index]?.phone && <p className="text-error-200 text-sm my-1">* {errors.members[index].phone}</p>}

                        </div>

                        {/* University */}
                        <div>
                            <label className="input-label">University <Star /></label>
                            <input
                                type="text"
                                value={member.university}
                                onChange={(e) => handleMemberChange(index, "university", e.target.value)}
                                className="input-style"
                                placeholder="Select your university"
                                required={isRequiredMember}
                            />
                            {errors.members && errors.members[index]?.university && <p className="text-error-200 text-sm my-1">* {errors.members[index].university}</p>}

                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label className="input-label">LinkedIn <Star /></label>
                            <input
                                type="url"
                                value={member.linkedin}
                                onChange={(e) => handleMemberChange(index, "linkedin", e.target.value)}
                                className="input-style"
                                placeholder="Enter your linkedin"
                                required={isRequiredMember}
                            />
                            {errors.members && errors.members[index]?.linkedin && <p className="text-error-200 text-sm my-1">* {errors.members[index].linkedin}</p>}

                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="input-label">Github <Star /></label>
                            <input
                                type="url"
                                value={member.github}
                                onChange={(e) => handleMemberChange(index, "github", e.target.value)}
                                className="input-style"
                                placeholder="Enter your github"
                                required={isRequiredMember}
                            />
                            {errors.members && errors.members[index]?.github && <p className="text-error-200 text-sm my-1">* {errors.members[index].github}</p>}

                        </div>
                    </div>

                </div>
            </div>
        )
    };

    // Helper component to render a single step circle
    const StepCircle = ({ stepNumber, label, isActive, isCompleted }) => {
        const circleClasses = `
            flex flex-col items-center space-y-2
            transition-all duration-300 ease-in-out
            w-1/3 text-center relative
        `;
        const numberClasses = `
            w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
            font-bold text-sm md:text-base
            transition-colors duration-300 ease-in-out
            ${isActive
                ? 'bg-white text-Main-500 ring-4 ring-Main-500/50'
                : isCompleted
                    ? 'bg-Main-500 text-white'
                    : 'bg-neutral-600 text-neutral-300'
            }
        `;
        const labelClasses = `
            text-xs md:text-sm mt-1 font-semibold whitespace-nowrap
            ${isActive ? 'text-white' : 'text-neutral-400'}
        `;

        return (
            <div className={circleClasses}>
                <div className={numberClasses}>
                    {stepNumber}
                </div>
                <span className={labelClasses}>{label}</span>
            </div>
        );
    };

    const stepLabels = [
        { label: "Team Info" },
        { label: "Members Info" },
        { label: "Team Motivation" },];

    return (
        <div
            className="min-h-screen p-2 bg-cover bg-center bg-repeat"
            style={{ backgroundImage: "url('/images/eunoia_registeration.png')" }}
        >

            {/* Header */}
            <div className="max-w-6xl mx-auto py-4">
                <ProgressStepper currentStep={currentStep} steps={stepLabels} />
            </div>

            {/* Form Container (Ensures responsiveness) */}
            <div className="max-w-5xl mx-auto mb-6">
                <div className="glass rounded-2xl p-6 md:p-8">
                    {/* Step 1: Team and Leader Information */}
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="flex items-center mb-8">
                                {/* Icon */}
                                <div className="bg-gold/30 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mr-4">
                                    <img
                                        src="/images/team.svg"
                                        alt="Team Icon"
                                        className="w-8 h-8 sm:w-16 sm:h-16 md:w-12 md:h-12"
                                    />
                                </div>

                                {/* Text + Gradient line */}
                                <div className="flex flex-col">
                                    <h2 className="section-title mb-1">Team Information</h2>
                                    <div className="w-full h-[3px] max-w-[120px] bg-gradient-to-r from-gold to-gold/0"></div>
                                </div>
                            </div>


                            {/* Team Details (Removed member count field) */}
                            <fieldset className="space-y-6 border p-4 rounded-lg border-Main-500/50 bg-space-light/5 backdrop-blur-sm">
                                <legend className="px-2 text-xl font-bold text-white">Team Information</legend>

                                {/* Only Team Name field remains, making it full width (col-span-1) */}
                                <div className="input-cont grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="input-label">Team Name <Star /></label>
                                        <input
                                            type="text"
                                            value={formData.teamName}
                                            onChange={(e) => handleInputChange("teamName", e.target.value)}
                                            className="input-style"
                                            placeholder="Enter your team name"
                                            required
                                        />
                                        {errors.teamName && <p className="text-error-200 text-sm my-1">* {errors.teamName}</p>}

                                    </div>
                                </div>
                            </fieldset>

                            {/* Leader Details (Unchanged) */}
                            <fieldset className="space-y-6 border p-4 rounded-lg border-Main-500/50 bg-space-light/5 backdrop-blur-sm">
                                <legend className="px-2 text-xl font-bold text-white">Team Leader Information</legend>

                                <div className="input-cont grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Leader Full Name */}
                                    <div>
                                        <label className="input-label">Full Name <Star /></label>
                                        <input
                                            type="text"
                                            value={formData.leaderName}
                                            onChange={(e) => handleInputChange("leaderName", e.target.value)}
                                            className="input-style"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        {errors.leaderName && <p className="text-error-200 text-sm my-1">* {errors.leaderName}</p>}

                                    </div>
                                    {/* Leader Email */}
                                    <div>
                                        <label className="input-label">Email <Star /></label>
                                        <input
                                            type="email"
                                            value={formData.leaderEmail}
                                            onChange={(e) => handleInputChange("leaderEmail", e.target.value)}
                                            className="input-style"
                                            placeholder="Enter your email"
                                            required
                                        />
                                        {errors.leaderEmail && <p className="text-error-200 text-sm my-1">* {errors.leaderEmail}</p>}

                                    </div>
                                    {/* Leader Phone Number */}
                                    <div>
                                        <label className="input-label">Phone Number <Star /></label>
                                        <input
                                            type="tel"
                                            value={formData.leaderPhone}
                                            onChange={(e) => handleInputChange("leaderPhone", e.target.value)}
                                            className="input-style"
                                            placeholder="Enter your phone number"
                                            required
                                        />
                                        {errors.leaderPhone && <p className="text-error-200 text-sm my-1">* {errors.leaderPhone}</p>}

                                    </div>
                                    {/* Leader University */}
                                    <div>
                                        <label className="input-label">University <Star /></label>
                                        <input
                                            type="text"
                                            value={formData.leaderUniversity}
                                            onChange={(e) => handleInputChange("leaderUniversity", e.target.value)}
                                            className="input-style"
                                            placeholder="Select your university"
                                            required
                                        />
                                        {errors.leaderUniversity && <p className="text-error-200 text-sm my-1">* {errors.leaderUniversity}</p>}

                                    </div>
                                    {/* Leader LinkedIn */}
                                    <div>
                                        <label className="input-label">LinkedIn <Star /></label>
                                        <input
                                            type="url"
                                            value={formData.leaderLinkedin}
                                            onChange={(e) => handleInputChange("leaderLinkedin", e.target.value)}
                                            className="input-style"
                                            placeholder="Enter your linkedin"
                                            required
                                        />
                                        {errors.leaderLinkedin && <p className="text-error-200 text-sm my-1">* {errors.leaderLinkedin}</p>}

                                    </div>
                                    {/* Leader GitHub */}
                                    <div>
                                        <label className="input-label">Github <Star /></label>
                                        <input
                                            type="url"
                                            value={formData.leaderGithub}
                                            onChange={(e) => handleInputChange("leaderGithub", e.target.value)}
                                            className="input-style"
                                            placeholder="Enter your github"
                                            required
                                        />
                                        {errors.leaderGithub && <p className="text-error-200 text-sm my-1">* {errors.leaderGithub}</p>}

                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    )}

                    {/* Step 2: Team Members (Required 3 + Optional 1) */}
                    {currentStep === 2 && (
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="flex items-center mb-8">
                                {/* Icon */}
                                <div className="bg-gold/30 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mr-4">
                                    <img
                                        src="/images/team.svg"
                                        alt="Team Icon"
                                        className="w-8 h-8 sm:w-16 sm:h-16 md:w-12 md:h-12"
                                    />
                                </div>

                                {/* Text + Gradient line */}
                                <div className="flex flex-col">
                                    <h2 className="section-title mb-1">Team Information</h2>
                                    <div className="w-full h-[3px] max-w-[120px] bg-gradient-to-r from-gold to-gold/0"></div>
                                </div>
                            </div>

                            {/* Team Member Roster */}
                            <fieldset className="space-y-6">
                                {/* Render all members currently in the form (3 required + optional 4th) */}
                                {formData.members.map(renderMemberForm)}
                            </fieldset>

                            {/* ADD OPTIONAL MEMBER BUTTON */}
                            {formData.members.length < MAX_MEMBERS_COUNT && (
                                <div className="flex justify-center mt-6">
                                    <Button
                                        onClick={addMember}
                                        className="text-space-accent hover:text-white border border-space-accent hover:bg-space-light/20 transition-colors duration-200"
                                        variant="ghost"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Add 4th Member
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Team Motivation (Unchanged) */}
                    {currentStep === 3 && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* title */}
                            <div className="flex items-center mb-8">
                                {/* Icon */}
                                <div className="bg-gold/30 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mr-4">
                                    <img
                                        src="/images/team.svg"
                                        alt="Team Icon"
                                        className="w-8 h-8 sm:w-16 sm:h-16 md:w-12 md:h-12"
                                    />
                                </div>

                                {/* Text + Gradient line */}
                                <div className="flex flex-col">
                                    <h2 className="section-title mb-1">Team Motivation</h2>
                                    <div className="w-full h-[3px] max-w-[120px] bg-gradient-to-r from-gold to-gold/0"></div>
                                </div>
                            </div>

                            <div className='md:col-span-2'>
                                <label className="input-label">Team Motivation (Why participate?) <Star /></label>
                                <textarea
                                    value={formData.teamMotivation}
                                    onChange={(e) => {
                                        handleInputChange("teamMotivation", e.target.value)
                                        e.target.style.height = "auto";
                                        e.target.style.height = e.target.scrollHeight + "px";
                                    }}
                                    className="input-style resize-none textarea-responsive overflow-hidden"
                                    placeholder="Describe your team's goal and motivation for joining the ideathon."
                                    required
                                />
                                {errors.teamMotivation && <p className="text-error-200 text-sm my-1">* {errors.teamMotivation}</p>}
                            </div>
                        </div>
                    )}


                    {/* Navigation Buttons (Unchanged) */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-space-subtle">
                        <Button
                            onClick={currentStep === 1 ? () => { navigate("/eunoia"); window.scrollTo(0, 0); } : prevStep}
                            variant="ghost"
                            className="text-gold border border-gold rounded-sm hover:bg-gold/20 disabled:opacity-50"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {currentStep === 1 ? 'Back to home' : ' Back'}
                        </Button>

                        {currentStep < totalSteps ? (
                            <Button
                                onClick={nextStep}
                                className="btn-grad rounded-sm text-purple-1 hover:from-space-orange-light hover:to-space-purple"
                            >
                                Next
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        ) : (<Button
                            onClick={submitForm}
                            disabled={isSubmitting}
                            className="rounded-[10px] text-purple-1 btn-grad px-4 lg:px-8"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    Submit Registration
                                </>
                            )}
                        </Button>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default React.memo(IdeathonRegistration)