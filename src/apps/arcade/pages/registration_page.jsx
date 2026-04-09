import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/arcade.css";
import StepIndicator from "../components/StepIndicator";
import { submitArcadeRegistration } from "../lib/api";
import StepMembersInfo from "./registration/components/StepMembersInfo";
import StepMotivation from "./registration/components/StepMotivation";
import StepTeamInfo from "./registration/components/StepTeamInfo";
import SuccessState from "./registration/components/SuccessState";
import { STEPS, createInitialFormData, memberErrorKey, memberLabels } from "./registration/config";
import { validateArcadeStep } from "./registration/validation";

const RegistrationPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(createInitialFormData);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState(null);
  const navigate = useNavigate();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
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
      if (!prev[key]) return prev;
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
    setStep((s) => Math.min(s + 1, 2));
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleHome = () => {
    navigate("/arcade");
    window.scrollTo(0, 0);
  };

  const handleRegister = async () => {
    const nextErrors = validateArcadeStep(2, formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitArcadeRegistration(formData);
      setSubmittedSummary({
        teamName: formData.teamName.trim(),
        leaderName: formData.leaderName.trim(),
        leaderEmail: formData.leaderEmail.trim(),
        leaderYear: formData.leaderYear.trim(),
        membersCount: formData.members.length,
        pastParticipation: formData.pastParticipation === true ? "Yes" : "No",
      });
      setSubmitSuccess(true);
      setFormData(createInitialFormData());
      setErrors({});
      setStep(0);
    } catch (error) {
      setSubmitError(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  useEffect(() => {
    document.documentElement.classList.add("arcade-active");
    document.body.classList.add("arcade-active");

    return () => {
      document.documentElement.classList.remove("arcade-active");
      document.body.classList.remove("arcade-active");
    };
  }, []);

  return (
    <>
      <div
        className="overflow-hidden arcade-registration-page"
        style={{ background: "#080000" }}
      >
      <div className={`arcade-registration-content relative z-10 ${submitSuccess ? "min-h-screen flex flex-col justify-center py-0" : "py-8 sm:py-12 pt-20"}`}>
        {/* Title */}
        {!submitSuccess && (
          <div className="text-center mb-4 sm:mb-6">
            <div className="arcade-mobile-top-line sm:hidden" />
            <div className="flex flex-row flex-nowrap items-end justify-center gap-2 sm:gap-[17px]">
              <span
                className="arcade-title-main whitespace-nowrap font-compacta text-white"
                style={{
                  fontSize: "clamp(36px, 4.2vw, 56px)",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  lineHeight: 1,
                }}
              >
                Welcome to
              </span>
              <span
                className="arcade-title-arcade whitespace-nowrap font-futura"
                style={{
                  color: "#FF0707",
                  fontSize: "clamp(52px, 5.8vw, 76px)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  textShadow: "0px 0px 12px #FF0707",
                }}
              >
                Arcade
              </span>
            </div>
            <h1
              className="arcade-title-main font-compacta text-white leading-tight"
              style={{
                fontSize: "clamp(36px, 4.2vw, 56px)",
                fontWeight: 400,
                letterSpacing: "0.1em",
                lineHeight: 1,
              }}
            >
              Registrations
            </h1>
            <div
              className="arcade-title-line mx-auto mt-3 sm:mt-4"
              style={{
                width: "100%",
                maxWidth: "1120px",
                height: "0px",
                border: "1px solid #FFFFFF",
              }}
            />
          </div>
        )}

        {submitSuccess ? (
          <SuccessState
            onBackHome={() => {
              navigate("/arcade");
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <>
            {/* Step Indicator */}
            <div className="arcade-steps-wrap">
              <StepIndicator currentStep={step} steps={STEPS} />
            </div>

            {/* Step Content */}
            <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20 mt-6 sm:mt-8">
              {step === 0 && <StepTeamInfo formData={formData} updateField={updateField} onNext={handleNext} onHome={handleHome} errors={errors} />}
              {step === 1 && (
                <StepMembersInfo
                  members={formData.members}
                  updateMember={updateMember}
                  memberLabels={memberLabels}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <StepMotivation
                  formData={formData}
                  updateField={updateField}
                  onPrev={handlePrev}
                  onRegister={handleRegister}
                  errors={errors}
                  submitError={submitError}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default RegistrationPage;
