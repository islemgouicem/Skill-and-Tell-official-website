import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../lib/hooks/useRegistration";
import { useState } from "react";
import { supabase } from "../../lib/services/supabase";


const FormNavigation = () => {
    const navigate = useNavigate();
    const { formData, currentStep, nextStep, prevStep, totalSteps, setPhase1, validateStep, isRegistered, setIsRegistered } = useRegistration();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = async () => {
        const isValid = await validateStep();
        if (!isValid) return;

        setIsSubmitting(true);

        try {
            if (isRegistered) {
                // --- CASE 1: Already registered user → update existing row ---
                console.log("Updating for email:", formData.email.trim());

                const { error } = await supabase
                    .from("registration")
                    .update({
                        // Add only the new fields to update
                        dep1: formData.dep1 || null,
                        dep2: formData.dep2 || null,
                        dep3: formData.dep3 || null,
                        dep1_motiv: formData.dep1_motiv?.trim() || null,
                        dep2_3_motiv: formData.dep2_3_motiv?.trim() || null,
                    })
                    .eq("email", formData.email.trim()); // identify user by email

                if (error) throw error;

                navigate("/registered", {
                    state: {
                        title: "You're all set!",
                        msg: "Thanks for joining! We'll review your department choice and email you soon 🚀",
                    },

                });
            } else {
                // --- CASE 2: New user → insert new record ---
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
                        dep1: formData.dep1 || null,
                        dep2: formData.dep2 || null,
                        dep3: formData.dep3 || null,
                        dep1_motiv: formData.dep1_motiv?.trim() || null,
                        dep2_3_motiv: formData.dep2_3_motiv?.trim() || null,
                    },
                ]);

                if (error) throw error;

                setIsRegistered(true);

                navigate("/registered");
            }

            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting your registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-space-subtle">
            {/* Back Button */}
            <Button
                onClick={
                    currentStep === 1
                        ? () => {
                            setPhase1(1);
                            window.scrollTo(0, 0);
                        }
                        : prevStep
                }
                variant="ghost"
                className="text-white/80 border border-Main-500 rounded-sm hover:bg-space-light disabled:opacity-50"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </Button>

            {/* Next or Submit Button */}
            {currentStep < totalSteps ? (
                <Button
                    onClick={nextStep}
                    className="gradient-buttons rounded-sm text-white hover:from-space-orange-light hover:to-space-purple"
                >

                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            ) : (
                <Button
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
                </Button>
            )}
        </div>
    );
};

export default FormNavigation;
