"use client"
import React, { useState } from "react"
import { Button } from "../components/ui/button"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom";
import CosmicSelect from "../components/ui/select"
import {
    ArrowLeft,
} from "lucide-react"
function Star() {
    return <span className="text-error-200">*</span>;
}

function OrganizerRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        school: "",
        task_category: "",
    });
    const tasks = [
        "Media",
        "Check In",
        "Logistics",
        "Decoration",
        "Assistance",
    ]
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

    const validateForm = () => {
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10,15}$/;

        if (!formData.full_name.trim()) formErrors.full_name = "Full name is required";
        if (!formData.email.trim() || !emailRegex.test(formData.email)) formErrors.email = "Valid email is required";
        if (!formData.phone_number.trim() || !phoneRegex.test(formData.phone_number)) formErrors.phone_number = "Valid phone number is required";
        if (!formData.task_category.trim()) formErrors.task_category = "Task category is required";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const submitForm = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from("organizers")
                .insert([formData]);

            if (error) throw error;

            navigate("/registered", {
                state: {
                    title: "Registration Complete!",
                    msg: "You have successfully registered as an organizer.",
                },
            });

        } catch (error) {
            console.error(error);
            alert(`Failed to submit: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen p-2 bg-cover bg-center bg-repeat flex flex-col"
            style={{ backgroundImage: "url('/images/eunoia_registeration.png')" }}
        >
            {/* Overlay for better depth */}

            <div className="relative flex flex-col flex-1">

                {/* Enhanced Title */}
                <div className="pt-6 pb-8 px- text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold eunoia-title py-4 drop-shadow-lg tracking-wide">
                        Organizer Registration
                    </h1>
                    {/* <div class="wrapper">
                        <div class="bg"> Organizer Registration </div>
                        <div class="fg"> Organizer Registration </div>
                    </div> */}
                    {/* <h1 className="text-4xl md:text-5xl font-extrabold text-gold drop-shadow-lg tracking-wide">
                        Organizer Registration
                    </h1> */}
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
                                <input
                                    type="text"
                                    value={formData.full_name}
                                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                                    className="input-style"
                                    placeholder="Enter your full name"
                                />
                                {errors.full_name && <p className="text-error-200 text-sm my-1">* {errors.full_name}</p>}
                            </div>

                            <div>
                                <label className="input-label">Email <Star /></label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    className="input-style"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-error-200 text-sm my-1">* {errors.email}</p>}
                            </div>

                            <div>
                                <label className="input-label">Phone Number <Star /></label>
                                <input
                                    type="tel"
                                    value={formData.phone_number}
                                    onChange={(e) => handleInputChange("phone_number", e.target.value)}
                                    className="input-style"
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone_number && <p className="text-error-200 text-sm my-1">* {errors.phone_number}</p>}
                            </div>

                            <div>
                                <label className="input-label">School</label>
                                <input
                                    type="text"
                                    value={formData.school}
                                    onChange={(e) => handleInputChange("school", e.target.value)}
                                    className="input-style"
                                    placeholder="Enter your school (optional)"
                                />
                            </div>

                            <div>
                                <label className="input-label">Task category <Star /></label>
                                <CosmicSelect
                                    placeholder="Select your First Choice"
                                    options={tasks}
                                    value={formData.task_category}
                                    onValueChange={value => handleSelectChange("task_category", value)}
                                    required
                                />
                                {errors.dep1 && <p className="text-error-200 text-sm my-1">* {errors.dep1}</p>}

                            </div>

                        </div>

                        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gold/50">
                            <Button
                                onClick={() => { navigate("/eunoia"); window.scrollTo(0, 0); }}
                                variant="ghost"
                                className="text-gold border border-gold rounded-sm hover:bg-gold/20 disabled:opacity-50"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to home
                            </Button>
                            <Button
                                onClick={submitForm}
                                disabled={isSubmitting}
                                className="rounded-[10px] text-white btn-grad px-6 py-2"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Registration"}
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Footer — Fixes empty bottom */}
                <div className="text-center text-white/60 py-6 text-sm">
                    © 2025 Eunoia — All rights reserved
                </div>
            </div>
        </div>
    );
}

export default React.memo(OrganizerRegistration);
