"use client"
import React, { useState, useRef } from "react"
import { supabase } from "../../../lib/services/supabase";
import { Button } from "../../../components/ui/button"
import Registered from "../sections/registration/department_selection"
import NotRegistered from "../sections/registration/new_register"
import { useRegistration } from "../../../lib/hooks/useRegistration";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Star from "../../../components/ui/star"


function RegistrationPage() {
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const { phase1, setPhase1, formData, errors, setErrors, handleInputChange, totalSteps, setTotalSteps, isRegistered, setIsRegistered } = useRegistration();

    const navigate = useNavigate();



    const redirect = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter your email address",
            }));
            return;
        }

        setIsCheckingEmail(true);

        try {
            const { data, error } = await supabase
                .from("registration")
                .select("id")
                .eq("email", formData.email.trim());

            if (error) throw error;

            if (data && data.length > 0) {
                setIsRegistered(true);
                setTotalSteps(2);
            } else {
                setIsRegistered(false);
                setTotalSteps(4);
            }

            setPhase1((prev) => prev + 1);
        } catch (error) {
            console.error("Error checking registration:", error);
            alert("An error occurred while checking your registration. Please try again.");
        } finally {
            setIsCheckingEmail(false);
        }
    };



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
                            width: `${(phase1 / totalSteps) * 100}%`,
                            background: "linear-gradient(90deg,#FF6D00,#7B2CBF)",
                        }}
                    ></div>
                </div>
            </div>

            {/* Form Container */}

            {phase1 === 1 && (
                <div className="flex justify-center items-center min-h-[70vh] mb-6">
                    <div className="glass rounded-2xl p-8 md:p-10 w-full max-w-xl text-center animate-fade-in-up">
                        <img
                            src="/icons/Profile.svg"
                            alt="User Icon"
                            className="w-16 h-16 md:w-[70px] md:h-[70px] mx-auto mb-4"
                        />
                        <h2 className="section-title">Enter Your Email</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            We'll check if you're already registered
                        </p>

                        <div className="text-left mb-8">
                            <label className="input-label">
                                Email Address <Star />
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="input-style w-full"
                                placeholder="your.email@example.com"
                                required
                            />
                            {errors.email && (
                                <p className="text-error-200 text-sm mt-1">* {errors.email}</p>
                            )}
                        </div>


                        {/* form navigation */}
                        <div className="flex justify-between items-center pt-6 border-t border-space-subtle">
                            {/* Back Button */}
                            <Button
                                onClick={() => {
                                    navigate("/");
                                    window.scrollTo(0, 0);
                                }}
                                variant="ghost"
                                className="text-white/80 border border-Main-500 rounded-sm hover:bg-space-light disabled:opacity-50"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to home
                            </Button>

                            {/* Next or Submit Button */}
                            <Button
                                onClick={redirect}
                                disabled={isCheckingEmail}
                                className="gradient-buttons rounded-sm text-white hover:from-space-orange-light hover:to-space-purple"
                            >
                                {isCheckingEmail ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Next...
                                    </>
                                ) : (
                                    <>
                                        Next
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </Button>

                        </div>
                    </div>
                </div>

            )}


            {phase1 === 2 && (
                <div className="max-w-5xl mx-auto mb-6">
                    <div className="glass rounded-2xl p-6 md:p-8">
                        {isRegistered ? (
                            <Registered />
                        ) : (
                            <NotRegistered />
                        )}
                    </div>
                </div>
            )}




        </div>
    )
}
export default React.memo(RegistrationPage)