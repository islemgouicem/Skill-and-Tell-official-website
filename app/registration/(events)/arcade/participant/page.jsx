"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/arcade.css";
import StepIndicator from "../features/components/StepIndicator";
import { submitArcadeRegistration } from "../features/lib/api";
import StepMembersInfo from "../features/components/StepMembersInfo";
import StepTeamInfo from "../features/components/StepTeamInfo";
import SuccessState from "../features/components/SuccessState";
import { STEPS, createInitialFormData, memberErrorKey, memberLabels } from "../features/lib/config";
import { validateArcadeStep } from "../features/lib/validation";
const RegistrationPage = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(createInitialFormData);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const router=useRouter()
    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => {
            if (!prev[field])
                return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
        setSubmitError("");
    };
    const updateMember = (index, field, value) => {
        setFormData((prev) => {
            const members = [...prev.members];
            members[index] = { ...members[index], [field]: value };
            return { ...prev, members };
        });
        const key = memberErrorKey(index, field);
        setErrors((prev) => {
            if (!prev[key])
                return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
        setSubmitError("");
    };
    const handleNext = () => {
        const nextErrors = validateArcadeStep(step, formData);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }
        setErrors({});
        setSubmitError("");
        setStep(1);
    };
    const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
    const handleHome = () => {
        router.push()("/arcade");
        window.scrollTo(0, 0);
    };
    const handleRegister = async () => {
        const nextErrors = validateArcadeStep(1, formData);
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }
        setIsSubmitting(true);
        setSubmitError("");
        try {
            await submitArcadeRegistration(formData);
            setSubmitSuccess(true);
            setFormData(createInitialFormData());
            setErrors({});
            setStep(0);
        }
        catch (error) {
            setSubmitError(error?.message || "Something went wrong. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    useEffect(() => {
        if (submitSuccess || Object.keys(errors).length === 0)
            return;
        const scrollToFirstInvalidField = () => {
            const firstInvalidField = document.querySelector('.arcade-registration-page [aria-invalid="true"]');
            if (!firstInvalidField)
                return;
            firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
            if (typeof firstInvalidField.focus === "function") {
                firstInvalidField.focus({ preventScroll: true });
            }
        };
        const rafId = window.requestAnimationFrame(scrollToFirstInvalidField);
        return () => window.cancelAnimationFrame(rafId);
    }, [errors, submitSuccess]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);
    useEffect(() => {
        document.documentElement.classList.add("arcade-active");
        document.body.classList.add("arcade-active");
    }, []);
    return (<>
      <div className="overflow-hidden arcade-registration-page" style={{ background: "#080000" }}>
      <div className={`arcade-registration-content relative z-10 ${submitSuccess ? "min-h-screen flex flex-col justify-center py-0" : "py-8 sm:py-12 pt-20"}`}>
        {/* Title */}
        {!submitSuccess && (<div className="text-center mb-4 sm:mb-6">
            <div className="arcade-mobile-top-line sm:hidden"/>
            <div className="flex flex-row flex-nowrap items-end justify-center gap-2 sm:gap-[17px]">
              <span className="arcade-title-main whitespace-nowrap font-compacta text-white" style={{
                fontSize: "clamp(36px, 4.2vw, 56px)",
                fontWeight: 400,
                letterSpacing: "0.1em",
                lineHeight: 1,
            }}>
                Welcome to
              </span>
              <span className="arcade-title-arcade whitespace-nowrap font-futura" style={{
                color: "#FF0707",
                fontSize: "clamp(52px, 5.8vw, 76px)",
                fontWeight: 400,
                lineHeight: 1.1,
                textShadow: "0px 0px 12px #FF0707",
            }}>
                Arcade
              </span>
            </div>
            <h1 className="arcade-title-main font-compacta text-white leading-tight" style={{
                fontSize: "clamp(36px, 4.2vw, 56px)",
                fontWeight: 400,
                letterSpacing: "0.1em",
                lineHeight: 1,
            }}>
              Registrations
            </h1>
            <div className="arcade-title-line mx-auto mt-3 sm:mt-4" style={{
                width: "100%",
                maxWidth: "1120px",
                height: "0px",
                border: "1px solid #FFFFFF",
            }}/>
          </div>)}

        {submitSuccess ? (<SuccessState onBackHome={() => {
                router.push("/arcade");
                window.scrollTo(0, 0);
            }}/>) : (<>
            <div className="mx-auto mt-2 w-[92%] max-w-[760px] text-center sm:mt-4">
              <div className="rounded-[16px] border px-4 py-3 sm:px-6 sm:py-4" style={{
                borderColor: "rgba(255, 255, 255, 0.28)",
                background: "rgba(255, 255, 255, 0.03)",
                boxShadow: "inset 0 0 0 1px rgba(255, 7, 7, 0.2), 0 0 18px rgba(255, 7, 7, 0.14)",
            }}>
                <p className="font-compacta uppercase tracking-[0.12em] text-[#FF8C8C]" style={{ fontSize: "clamp(20px, 2vw, 15px)", lineHeight: 1 }}>
                  Fair Play Notice
                </p>
                <p className="mt-2 font-futura text-white/90" style={{
                fontSize: "clamp(12px, 1.3vw, 15px)",
                lineHeight: 1.45,
            }}>
                  If we detect false participation history for any team member, the entire team will be excluded
                </p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="arcade-steps-wrap">
              <StepIndicator currentStep={step} steps={STEPS}/>
            </div>

            {/* Step Content */}
            <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20 mt-6 sm:mt-8">
              {step === 0 && <StepTeamInfo formData={formData} updateField={updateField} onNext={handleNext} onHome={handleHome} errors={errors}/>}
              {step === 1 && (<StepMembersInfo members={formData.members} updateMember={updateMember} memberLabels={memberLabels} onPrev={handlePrev} onRegister={handleRegister} errors={errors} submitError={submitError} isSubmitting={isSubmitting}/>)}
            </div>
          </>)}
      </div>
      </div>
    </>);
};
export default RegistrationPage;
