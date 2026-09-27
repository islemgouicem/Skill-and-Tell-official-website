import { createContext, useContext, useState } from "react";
const RegisterationContext = createContext();
export function RegisterationProvider({ children }) {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        discordID: "",
        university: "",
        university_location: "",
        field: "",
        yearOfStudy: "",
        dep1: "",
        dep2: "",
        dep3: "",
        dep1_motiv: "",
        dep2_3_motiv: "",
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [totalSteps, setTotalSteps] = useState(1);
    const [isRegistered, setIsRegistered] = useState(false);
    const [phase1, setPhase1] = useState(1);
    const [errors, setErrors] = useState({});

    // NEW: completion screen text (phase1 === 3)
    const [completionTitle, setCompletionTitle] = useState("Registration Complete!");
    const [completionMsg, setCompletionMsg] = useState(
        "Thanks for registering to be part of Skill & Tell. We're excited to have you on board, and welcome to our creative community!"
    );

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field]) {
            setErrors((prev) => {
                const updated = { ...prev };
                delete updated[field];
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
    const validateStep = async () => {
        let stepErrors = {};
        if (isRegistered) {
            if (currentStep === 1) {
                if (!formData.dep1)
                    stepErrors.dep1 = "First choice is required";
                if (!formData.dep2)
                    stepErrors.dep2 = "Second choice is required";
                if (!formData.dep3)
                    stepErrors.dep3 = "Third choice is required";
                if (formData.dep1 == formData.dep2 || formData.dep1 == formData.dep3 || formData.dep2 == formData.dep3) {
                    stepErrors.similar = "Department choices must be different";
                }
            }
            if (currentStep === 2) {
                if (!formData.dep1_motiv.trim()) {
                    stepErrors.dep1_motiv = "Please write about your first choice";
                }
                if (!formData.dep2_3_motiv.trim()) {
                    stepErrors.dep2_3_motiv = "Please write about your second/third choices";
                }
            }
            setErrors(stepErrors);
            return Object.keys(stepErrors).length === 0;
        }
        if (currentStep === 1) {
            if (!formData.fullname.trim())
                stepErrors.fullname = "Please enter your Full name";
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(formData.phone)) {
                stepErrors.phone = "Please respect the given format (10 digits, no spaces)";
            }
        }
        if (currentStep === 2) {
            if (!formData.university.trim())
                stepErrors.university = "Please enter the name of your University";
            if (!formData.yearOfStudy)
                stepErrors.yearOfStudy = "Please specify your current year of study";
            if (!formData.field.trim())
                stepErrors.field = "Please enter your Field of study";
        }
        if (currentStep === 3) {
            if (!formData.dep1)
                stepErrors.dep1 = "First choice is required";
            if (!formData.dep2)
                stepErrors.dep2 = "Second choice is required";
            if (!formData.dep3)
                stepErrors.dep3 = "Third choice is required";
            if (formData.dep1 === formData.dep2 ||
                formData.dep1 === formData.dep3 ||
                formData.dep2 === formData.dep3) {
                stepErrors.similar = "Department choices must be different";
            }
        }
        if (currentStep === 4) {
            if (!formData.dep1_motiv.trim()) {
                stepErrors.dep1_motiv = "Please write about your first choice";
            }
            if (!formData.dep2_3_motiv.trim()) {
                stepErrors.dep2_3_motiv = "Please write about your second/third choices";
            }
        }
        setErrors(stepErrors);
        return Object.keys(stepErrors).length === 0;
    };
    const nextStep = async () => {
        const isValid = await validateStep();
        if (isValid) {
            setCurrentStep((prev) => prev + 1);
        }
    };
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    return (<RegisterationContext.Provider value={{
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
            validateStep,
            completionTitle,
            setCompletionTitle,
            completionMsg,
            setCompletionMsg,
        }}>
            {children}
        </RegisterationContext.Provider>);
}
export const useRegistration = () => useContext(RegisterationContext);