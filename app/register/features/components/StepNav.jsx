"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useRegistration } from "@/lib/hooks/useRegistration";
import { supabase } from "@/lib/services/supabase";

/**
 * Back / Next / Submit for the 4 member steps. The submit logic (validation,
 * Supabase insert, completion screen) is unchanged from the previous form.
 */
export default function StepNav() {
  const {
    formData,
    currentStep,
    nextStep,
    prevStep,
    totalSteps,
    setPhase1,
    validateStep,
    setIsRegistered,
    setCompletionTitle,
    setCompletionMsg,
  } = useRegistration();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async () => {
    const isValid = await validateStep();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("registration")
        .insert([
          {
            fullname: formData.fullname.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            discord_id: formData.discordID?.trim() || null,
            university: formData.university.trim(),
            university_location: formData.university_location || null,
            field: formData.field.trim(),
            year_of_study: formData.yearOfStudy,
            dep1: formData.dep1 || null,
            dep2: formData.dep2 || null,
            dep3: formData.dep3 || null,
            club_experience: formData.club_experience.trim() || null,
          },
        ]);

      if (error) {
        throw error;
      }

      setIsRegistered(true);
      setCompletionTitle("You're all set!");
      setCompletionMsg(
        "Thanks for joining! We'll review your department choice and email you soon 🚀"
      );
      setPhase1(3);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const last = currentStep >= totalSteps;

  return (
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-Main-500/40 pt-6">
      <button
        type="button"
        onClick={currentStep === 1 ? () => { setPhase1(1); window.scrollTo(0, 0); } : prevStep}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-Main-500 px-4 text-sm text-white/85 transition-colors hover:border-Main-300 hover:bg-white/5 sm:px-5"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      {last ? (
        <button type="button" onClick={submitForm} disabled={isSubmitting} className="reg-next inline-flex h-11 items-center gap-2 rounded-lg border border-Main-300/50 px-5 text-sm text-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,109,0,0.8)] disabled:pointer-events-none disabled:opacity-60 sm:px-6">
          {isSubmitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>) : (<><Check className="h-4 w-4" /> Submit my application</>)}
        </button>
      ) : (
        <button type="submit" className="reg-next inline-flex h-11 items-center gap-2 rounded-lg border border-Main-300/50 px-5 text-sm text-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,109,0,0.8)] disabled:pointer-events-none disabled:opacity-60 sm:px-6">
          Continue <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
