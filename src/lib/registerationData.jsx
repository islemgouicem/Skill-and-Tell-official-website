import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export function RegistrationProvider({ children }) {
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

        // department info:
        dep1: "",
        dep2: "",
        dep3: "",

        // Club-specific Information
        dep1_motiv: "",
        dep2_3_motiv: "",

    })

    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(1);
    const [isRegistered, setIsRegistered] = useState(false);
    const [phase1, setPhase1] = useState(1);

    const [errors, setErrors] = useState({});

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

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
    const validateStep = async () => {
        let stepErrors = {};

        // --- CASE 1: Already registered user
        if (isRegistered) {
            if (currentStep === 1) {
                if (!formData.dep1) stepErrors.dep1 = "First choice is required";
                if (!formData.dep2) stepErrors.dep2 = "Second choice is required";
                if (!formData.dep3) stepErrors.dep3 = "Third choice is required";
                if (formData.dep1 == formData.dep2 || formData.dep1 == formData.dep3 || formData.dep2 == formData.dep3) {
                    stepErrors.similar = "Department choices must be different";
                }
            }

            if (currentStep === 2) {
                if (!formData.dep1_motiv.trim()) {
                    stepErrors.dep1_motiv = "Write at least 30 characters about your first choice";
                }

                if (!formData.dep2_3_motiv.trim()) {
                    stepErrors.dep2_3_motiv = "Write at least 30 characters about your second/third choices";
                }

                if (formData.dep1_motiv.trim().length > 1000) {
                    stepErrors.dep1_motiv = "Keep it less than 1000 characters";
                }
                if (formData.dep2_3_motiv.trim().length > 1000) {
                    stepErrors.dep2_3_motiv = "Keep it less than 1000 characters";
                }
            }

            setErrors(stepErrors);
            return Object.keys(stepErrors).length === 0;
        }

        // --- CASE 2: New registration (4-step flow) ---
        if (currentStep === 1) {
            if (!formData.fullname.trim()) stepErrors.fullname = "Please enter your Full name";
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                stepErrors.phone = "Please respect the given format (10 digits, no spaces)";
            }

        }

        if (currentStep === 2) {
            if (!formData.university.trim()) stepErrors.university = "Please enter the name of your University";
            if (!formData.yearOfStudy) stepErrors.yearOfStudy = "Please specify your current year of study";
            if (!formData.field.trim()) stepErrors.field = "Please enter your Field of study";
        }

        if (currentStep === 3) {
            if (!formData.dep1) stepErrors.dep1 = "First choice is required";
            if (!formData.dep2) stepErrors.dep2 = "Second choice is required";
            if (!formData.dep3) stepErrors.dep3 = "Third choice is required";
            if (
                formData.dep1 === formData.dep2 ||
                formData.dep1 === formData.dep3 ||
                formData.dep2 === formData.dep3
            ) {
                stepErrors.similar = "Department choices must be different";
            }
        }

        if (currentStep === 4) {
            if (!formData.dep1_motiv.trim()) {
                stepErrors.dep1_motiv = "Write at least 30 characters about your first choice";
            }
            if (!formData.dep2_3_motiv.trim()) {
                stepErrors.dep2_3_motiv = "Write at least 30 characters about your second/third choices";
            }
            if (formData.dep1_motiv.trim().length > 1000)
                stepErrors.dep1_motiv = "Keep it less than 1000 characters";
            if (formData.dep2_3_motiv.trim().length > 1000)
                stepErrors.dep2_3_motiv = "Keep it less than 1000 characters";
        }

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
    return (
        <RegistrationContext.Provider
            value={{
                formData,
                updateFormData,
                currentStep,
                setCurrentStep,
                errors,
                setErrors,
                handleInputChange,
                handleSelectChange,
                nextStep,
                prevStep,
                totalSteps,
                setTotalSteps,
                isRegistered, 
                setIsRegistered,
                phase1, 
                setPhase1,
                validateStep
            }}
        >
            {children}
        </RegistrationContext.Provider>
    );
}

export const useRegistration = () => useContext(RegistrationContext);
