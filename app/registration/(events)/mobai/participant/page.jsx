"use client"
import { useState } from "react";
import ProgressIndicator from "../features/components/ProgressIndicator";
import CyberButton from "../features/components/CyberButton";
import WelcomeStep from "../features/components/steps/WelcomeStep";
import TeamNameAndLeaderStep from "../features/steps/TeamNameAndLeaderStep";
import SingleMemberStep from "../features/components/steps/SingleMemberStep";
import TeamQuestionsStep from "../features/components/steps/TeamQuestionsStep";
import ResponsibilityEnforcement from "../features/components/ResponsibilityEnforcement";
import { validateTeamName, validateMember, isResponsibilityCoverageValid, validateMobaiForm } from "../features/lib/validation";
import { submitMobaiRegistration } from "../features/lib/api";
import "@/styles/mobai.css";
import regBg from "@/assets/images/mobai/reg_bg.svg";
import CyberCard from "../features/components/cyberCard";
import { useNavigate } from "react-router-dom";
const EMPTY_MEMBER = {
    full_name: "",
    school_or_uni: "",
    field_of_study: "",
    year_of_study: "",
    phone_telegram: "",
    email: "",
    linkedin_url: "",
    github: "",
    responsibility: "",
    intent: "",
    is_leader: false
};
const INITIAL_MEMBERS = [
    { ...EMPTY_MEMBER, is_leader: true },
    { ...EMPTY_MEMBER },
    { ...EMPTY_MEMBER },
    { ...EMPTY_MEMBER },
    { ...EMPTY_MEMBER },
    { ...EMPTY_MEMBER }
];
const totalSteps = 7;
function scrollToFirstError(errors, step) {
    const run = () => {
        let id = null;
        if (step === 0) {
            if (errors?.team_name)
                id = "mobai-team_name";
            else if (errors?.members?.[0])
                id = `mobai-member-0-${Object.keys(errors.members[0])[0]}`;
        }
        else if (step >= 1 && step <= 5 && errors?.members?.[step]) {
            id = `mobai-member-${step}-${Object.keys(errors.members[step])[0]}`;
        }
        else if (step === 6) {
            if (errors?.worked_together_before)
                id = "mobai-worked_together_before";
            else if (errors?.team_quality_opinion)
                id = "mobai-team_quality_opinion";
            else if (errors?.prize_not_wanted)
                id = "mobai-prize_not_wanted";
        }
        if (id) {
            const el = document.getElementById(id);
            if (el)
                el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };
    setTimeout(run, 150);
}
const RegistrationForm = () => {
    const [currentStep, setCurrentStep] = useState(-1);
    const [teamName, setTeamName] = useState("");
    const [members, setMembers] = useState(INITIAL_MEMBERS);
    const [teamQuestions, setTeamQuestions] = useState({
        worked_together_before: "",
        team_quality_opinion: "",
        prize_not_wanted: ""
    });
    const [errors, setErrors] = useState({});
    const [rotation, setRotation] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();
    const formData = {
        team_name: teamName,
        members,
        ...teamQuestions
    };
    const validateStep = (step) => {
        const newErrors = {};
        if (step === 0) {
            const teamNameErr = validateTeamName(teamName);
            if (teamNameErr)
                newErrors.team_name = teamNameErr;
            const leaderErr = validateMember(members[0], 0);
            if (Object.keys(leaderErr).length > 0)
                newErrors.members = [leaderErr, {}, {}, {}, {}, {}];
        }
        if (step >= 1 && step <= 5) {
            const memberErr = validateMember(members[step], step);
            if (Object.keys(memberErr).length > 0) {
                newErrors.members = Array(6).fill(null).map(() => ({}));
                newErrors.members[step] = memberErr;
            }
            if (step === 5 && !isResponsibilityCoverageValid(members)) {
                newErrors._responsibility = true;
            }
        }
        if (step === 6) {
            if (!teamQuestions.worked_together_before)
                newErrors.worked_together_before = "Required";
            const quality = (teamQuestions.team_quality_opinion ?? "").trim();
            if (quality.length < 30)
                newErrors.team_quality_opinion = "Min 30 characters";
            const prize = (teamQuestions.prize_not_wanted ?? "").trim();
            if (prize.length < 10)
                newErrors.prize_not_wanted = "Min 10 characters";
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).filter(k => k !== "_responsibility").length > 0) {
            scrollToFirstError(newErrors, step);
        }
        return Object.keys(newErrors).filter(k => k !== "_responsibility").length === 0;
    };
    const canProceedFromStep5 = () => {
        const memberErr = validateMember(members[5], 5);
        const memberOk = Object.keys(memberErr).length === 0;
        const responsibilityOk = isResponsibilityCoverageValid(members);
        return memberOk && responsibilityOk;
    };
    const handleNext = () => {
        setSubmitError(null);
        if (currentStep === -1) {
            setRotation(prev => prev + 180);
            setTimeout(() => setCurrentStep(0), 250);
            window.scrollTo(0, 0);
            return;
        }
        if (!validateStep(currentStep))
            return;
        if (currentStep >= totalSteps - 1)
            return;
        window.scrollTo(0, 0);
        setRotation(prev => prev + 180);
        setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    };
    const handleBack = () => {
        setSubmitError(null);
        if (currentStep !== -1) {
            setRotation(prev => prev - 180);
        }
        setTimeout(() => {
            setCurrentStep(prev => (prev > -1 ? prev - 1 : -1));
            if (currentStep === -1) {
                navigate("/mobai");
            }
        }, 250);
        window.scrollTo(0, 0);
    };
    const handleSubmit = async () => {
        setSubmitError(null);
        const { valid, errors: fullErrors } = validateMobaiForm(formData);
        if (!valid) {
            setErrors(fullErrors);
            setSubmitError(fullErrors._responsibility || "Please fix the errors above.");
            scrollToFirstError(fullErrors, 6);
            return;
        }
        setIsSubmitting(true);
        try {
            await submitMobaiRegistration(formData);
            setErrors({});
            setSubmitSuccess(true);
        }
        catch (err) {
            const msg = err.message || "Submission failed. Please try again.";
            setSubmitError(msg);
            alert(msg);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const isSubmitStep = currentStep === totalSteps - 1;
    const nextDisabled = currentStep === 5 && !canProceedFromStep5();
    const renderStep = () => {
        switch (currentStep) {
            case -1:
                return <WelcomeStep />;
            case 0:
                return (<TeamNameAndLeaderStep teamName={teamName} setTeamName={setTeamName} members={members} setMembers={setMembers} errors={errors}/>);
            case 1:
            case 2:
            case 3:
            case 4:
                return (<SingleMemberStep memberIndex={currentStep} members={members} setMembers={setMembers} errors={errors}/>);
            case 5:
                return (<div className="space-y-6">
                        <ResponsibilityEnforcement members={members}/>
                        <SingleMemberStep memberIndex={5} members={members} setMembers={setMembers} errors={errors}/>
                    </div>);
            case 6:
                return (<TeamQuestionsStep formData={teamQuestions} setFormData={setTeamQuestions} errors={errors}/>);
            default:
                return null;
        }
    };
    return (<div className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center py-18 px-4" style={{
            backgroundImage: `url(${regBg})`,
            imageRendering: "crisp-edges"
        }}>
            <div className="w-full max-w-4xl" style={{ perspective: "2000px" }}>
                <div style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.5s ease-in-out",
            transform: `rotateY(${rotation}deg)`
        }}>
                    <div style={{
            transform: (rotation / 180) % 2 !== 0 ? "scaleX(-1)" : "scaleX(1)",
            transition: "transform 0.5s ease-in-out"
        }}>
                        {submitSuccess ? (<CyberCard>
                                <div className="text-center space-y-6 py-4">
                                    <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
                                        Congratulations
                                    </h2>
                                    <p className="text-white/90 text-lg">
                                        Registration successful.
                                    </p>
                                    <p className="text-white/80">
                                        Wait for us to contact you.
                                    </p>
                                    <div className="flex justify-center mt-8">
                                        <CyberButton variant="primary" icon="right" onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
            }}>
                                            Return to SkillnTell
                                        </CyberButton>
                                    </div>
                                </div>
                            </CyberCard>) : (<CyberCard>
                                {currentStep >= 0 && (<ProgressIndicator currentStep={currentStep} totalSteps={totalSteps}/>)}

                                {renderStep()}

                                {submitError && (<p className="text-[#FF6E6E] text-sm mt-4">* {submitError}</p>)}

                                <div className="flex justify-between items-center mt-8">
                                    <CyberButton variant="outline" icon="left" onClick={handleBack} disabled={isSubmitting}>
                                        BACK
                                    </CyberButton>

                                    {!isSubmitStep ? (<CyberButton variant="primary" icon="right" onClick={handleNext} disabled={nextDisabled}>
                                            NEXT
                                        </CyberButton>) : (<CyberButton variant="primary" icon={isSubmitting ? "loader" : "right"} onClick={handleSubmit} disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting…" : "SUBMIT"}
                                        </CyberButton>)}
                                </div>
                            </CyberCard>)}
                    </div>
                </div>
            </div>
        </div>);
};
export default RegistrationForm;
