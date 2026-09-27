"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/services/supabase";
import { Button } from "@/components/ui/button";
import NotRegistered from "../sections/new_register";
import { useRegistration } from "@/lib/hooks/useRegistration";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Star from "@/components/ui/star";

function RegistrationForm() {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const {
    phase1, setPhase1, formData, errors, setErrors,
    handleInputChange, totalSteps, setTotalSteps,
    setIsRegistered,
    completionTitle, completionMsg,
  } = useRegistration();
  const router = useRouter();

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
        // Already registered — just show the message, no further steps.
        setIsRegistered(true);
        setPhase1(4);
      } else {
        setIsRegistered(false);
        setTotalSteps(4);
        setPhase1(2);
      }
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
          <h1 className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold p-2 grad-title">
            Join Skill&amp;Tell
          </h1>
        </div>

        {/* Progress Bar */}
        {(phase1 === 1 || phase1 === 2) && (
          <div className="w-full bg-Main-600 rounded-full h-2 mb-8">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${(phase1 / totalSteps) * 100}%`,
                background: "linear-gradient(90deg,#FF6D00,#7B2CBF)",
              }}
            ></div>
          </div>
        )}
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
              We&apos;ll check if you&apos;re already registered
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
                  router.push("/");
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

      {/* New-user, full 4-step flow */}
      {phase1 === 2 && (
        <div className="max-w-5xl mx-auto mb-6">
          <div className="glass rounded-2xl p-6 md:p-8">
            <NotRegistered />
          </div>
        </div>
      )}

{/* Completion screen (new user finished all steps) */}
{phase1 === 3 && (
  <div className="flex justify-center items-center min-h-[70vh] mb-6 mx-2">
    <div className="glass rounded-2xl p-8 w-full max-w-5xl">
      <div className="mb-2 text-center animate-fade-in-up">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h1 className="inline-block text-5xl md:text-14xl p-2 gradient-text text-center font-bold">
          {completionTitle}
        </h1>
        <p className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto text-center my-10">
          {completionMsg}
        </p>
        <Button
          onClick={() => router.push("/")}
          className="text-white rounded-md mt-4 px-8 py-3 bg-gradient-to-r from-[#8A38F5]/0 to-[#FF6D00] hover:from-space-orange-light hover:to-space-purple"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  </div>
)}

{/* Already-registered message (no further steps, no update) */}
{phase1 === 4 && (
  <div className="flex justify-center items-center min-h-[70vh] mb-6 mx-2">
    <div className="glass rounded-2xl p-8 w-full max-w-5xl">
      <div className="mb-2 text-center animate-fade-in-up">
        <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
        <h1 className="inline-block text-4xl md:text-5xl p-2 gradient-text text-center font-bold">
          You're already registered!
        </h1>
        <p className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto text-center my-10">
         You’ve already registered with Skill & Tell.Your information is already saved.
         </p>
        <Button
          onClick={() => router.push("/")}
          className="text-white rounded-md mt-4 px-8 py-3 bg-gradient-to-r from-[#8A38F5]/0 to-[#FF6D00] hover:from-space-orange-light hover:to-space-purple"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default React.memo(RegistrationForm);