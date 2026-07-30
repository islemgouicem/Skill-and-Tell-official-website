"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/services/supabase";
import { useRouter } from "next/navigation";

import CosmicSelect from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Loader2 // Added Loader2 for loading state
 } from "lucide-react";

export const dynamic = 'force-dynamic';
function Star() {
    return <span className="text-error-200">*</span>;
}
function OrganizerRegistration() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        // RENAMED FIELD to match DB:
        school: "",
        task_category: "",
        // NEW FIELDS:
        has_exp: null, // Use null initially to track selection status
        exp_details: "",
    });
    const tasks = [
        "Media",
        "HR",
        "Logistics",
    ];
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };
    // Handles the 'has_exp' boolean radio input change
    const handleExperienceChange = (value) => {
        const isYes = value === "yes";
        setFormData(prev => ({
            ...prev,
            has_exp: isYes,
            // Clear details if the user changes from Yes to No
            exp_details: isYes ? prev.exp_details : "",
        }));
        if (errors.has_exp) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated.has_exp;
                return updated;
            });
        }
    };
    const handleSelectChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };
    const validateForm = () => {
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!formData.full_name.trim())
            formErrors.full_name = "Full name is required";
        if (!formData.email.trim() || !emailRegex.test(formData.email))
            formErrors.email = "Valid email is required";
        if (!formData.phone_number.trim() || !phoneRegex.test(formData.phone_number))
            formErrors.phone_number = "Valid phone number is required";
        if (!formData.task_category.trim())
            formErrors.task_category = "Task category is required";
        if (formData.has_exp === null)
            formErrors.has_exp = "Please select an option for previous experience";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const submitForm = async () => {
        if (!validateForm())
            return;
        // Use the exact database column names for submission
        const dataToSubmit = {
            full_name: formData.full_name,
            email: formData.email,
            phone_number: formData.phone_number,
            // Use the correct DB column name (school)
            school: formData.school,
            task_category: formData.task_category,
            // Use the correct DB column names (has_exp, exp_details)
            has_exp: formData.has_exp,
            exp_details: formData.exp_details,
        };
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from("organizers")
                .insert([dataToSubmit]);
            if (error)
                throw error;
            router.push("/registered", {
                state: {
                    title: "Registration Complete!",
                    msg: "You have successfully registered as an organizer.",
                },
            });
        }
        catch (error) {
            console.error(error);
            alert(`Failed to submit: ${error.message}`);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (<div className="min-h-screen p-2 bg-cover bg-center bg-repeat flex flex-col" style={{ backgroundImage: "url('/images/eunoia_registeration.png')" }}>
            {/* Overlay for better depth */}

            <div className="relative flex flex-col flex-1">

                {/* Enhanced Title */}
                <div className="pt-6 pb-8 px- text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold eunoia-title py-4 drop-shadow-lg tracking-wide">
                        Organizer Registration
                    </h1>
                    <p className="text-white/80 mt-3 text-lg">
                        Join the organizing team — we’re glad to have you!
                    </p>

                </div>

                {/* Form Container */}
                <div className="max-w-5xl mx-auto w-full mb-8">
                    <div className="glass rounded-2xl p-6 md:p-8 space-y-6">

                        <div className="input-cont grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div>
                                <label className="input-label">Full Name <Star /></label>
                                <input type="text" value={formData.full_name} onChange={(e) => handleInputChange("full_name", e.target.value)} className="input-style" placeholder="Enter your full name"/>
                                {errors.full_name && <p className="text-error-200 text-sm my-1">* {errors.full_name}</p>}
                            </div>

                            <div>
                                <label className="input-label">Email <Star /></label>
                                <input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="input-style" placeholder="Enter your email"/>
                                {errors.email && <p className="text-error-200 text-sm my-1">* {errors.email}</p>}
                            </div>

                            <div>
                                <label className="input-label">Phone Number <Star /></label>
                                <input type="tel" value={formData.phone_number} onChange={(e) => handleInputChange("phone_number", e.target.value)} className="input-style" placeholder="Enter your phone number"/>
                                {errors.phone_number && <p className="text-error-200 text-sm my-1">* {errors.phone_number}</p>}
                            </div>

                            <div>
                                <label className="input-label">School</label>
                                <input type="text" value={formData.school} onChange={(e) => handleInputChange("school", e.target.value)} className="input-style" placeholder="Enter your school (optional)"/>
                            </div>

                            <div>
                                <label className="input-label">Task category <Star /></label>
                                <CosmicSelect placeholder="Select your First Choice" options={tasks} value={formData.task_category} onValueChange={value => handleSelectChange("task_category", value)} required/>
                                {errors.task_category && <p className="text-error-200 text-sm my-1">* {errors.task_category}</p>}
                            </div>

                            {/* NEW FIELD: Has previous experience (Radio Group) */}
                            <div>
                                <label className="input-label">Do you have previous organizing experience? <Star /></label>
                                {/* Reusing input-style for general container styling */}
                                <div className="input-style border-none flex space-x-6 items-center">
                                    <label className="flex items-center space-x-2 text-white/80 cursor-pointer">
                                        <input type="radio" name="has_exp" value="yes" checked={formData.has_exp === true} onChange={() => handleExperienceChange("yes")} className="form-radio text-gold checked:bg-gold/80 border-gold/50 h-4 w-4"/>
                                        <span className="text-white/90">Yes</span>
                                    </label>
                                    <label className="flex items-center space-x-2 text-white/80 cursor-pointer">
                                        <input type="radio" name="has_exp" value="no" checked={formData.has_exp === false} onChange={() => handleExperienceChange("no")} className="form-radio text-gold checked:bg-gold/80 border-gold/50 h-4 w-4"/>
                                        <span className="text-white/90">No</span>
                                    </label>
                                </div>
                                {errors.has_exp && <p className="text-error-200 text-sm my-1">* {errors.has_exp}</p>}
                            </div>

                            {/* ORIGINAL/RESTORED TEXTAREA: Experience Details (Conditional visibility) */}
                            {/* This is the field that was missing/misplaced */}
                            {(formData.has_exp === true || formData.exp_details.length > 0) && (<div className='md:col-span-2'>
                                    <label className="input-label">If Yes, write us about it</label>
                                    <textarea value={formData.exp_details} onChange={(e) => {
                handleInputChange("exp_details", e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
            }} className="input-style resize-none textarea-responsive overflow-hidden" placeholder="Write about your experience"/>
                                </div>)}

                        </div>

                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gold/50">
                            <Button onClick={() => { router.push("/eunoia"); window.scrollTo(0, 0); }} variant="ghost" className="text-gold border border-gold rounded-sm hover:bg-gold/20 disabled:opacity-50">
                                <ArrowLeft className="w-5 h-5 mr-2"/>
                                Back
                            </Button>
                            <Button onClick={submitForm} disabled={isSubmitting} className="rounded-[10px] text-purple-1 btn-grad px-6 py-2">
                                {isSubmitting ? (<>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                                        Submitting...
                                    </>) : (<>
                                        <CheckCircle className="w-5 h-5 mr-2"/>
                                        Submit Registration
                                    </>)}
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Footer — Fixes empty bottom */}
                <div className="text-center text-white/60 py-6 text-sm">
                    © 2025 Eunoia — All rights reserved
                </div>
            </div>
        </div>);
}
export default React.memo(OrganizerRegistration);
