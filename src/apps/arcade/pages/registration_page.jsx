import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArcadeButton from "../components/ArcadeButton";
import ArcadeCard from "../components/ArcadeCard";
import ArcadeInput from "../components/ArcadeInput";
import ArcadeTextarea from "../components/ArcadeTextarea";
import ArcadeYearSelect from "../components/ArcadeYearSelect";
import InfoIcon from "../components/InfoIcon";
import MemberIcon from "../components/MemberIcon";
import StepIndicator from "../components/StepIndicator";
import { submitArcadeRegistration } from "../lib/api";
import slashHand from "/images/arcade/reg_2.png";
import reg3 from "/images/arcade/reg_3.png";
import registrationHand from "/images/arcade/registeration_1.png";

const STEPS = ["Team Info", "Members info", "Motivation"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const algerianPhonePattern = /^0[5-7]\d{8}$/;

const isValidStudyYear = (value) => {
  const year = Number(value);
  return Number.isInteger(year) && year >= 1 && year <= 5;
};

const emptyMember = () => ({ name: "", email: "", number: "", year: "" });

const createInitialFormData = () => ({
  teamName: "",
  leaderName: "",
  leaderEmail: "",
  leaderNumber: "",
  leaderYear: "",
  members: [emptyMember(), emptyMember(), emptyMember(), emptyMember()],
  pastParticipation: null,
  motivation: "",
});

const memberErrorKey = (index, field) => `member_${index}_${field}`;

const validateArcadeStep = (stepIndex, data) => {
  const nextErrors = {};

  if (stepIndex === 0) {
    if (!data.teamName.trim()) nextErrors.teamName = "Team name is required";
    if (!data.leaderName.trim()) nextErrors.leaderName = "Leader name is required";
    if (!data.leaderEmail.trim()) {
      nextErrors.leaderEmail = "Leader email is required.";
    } else if (!emailPattern.test(data.leaderEmail.trim())) {
      nextErrors.leaderEmail = "Please enter a valid email address";
    }
    if (!data.leaderNumber.trim()) {
      nextErrors.leaderNumber = "Leader number is required.";
    } else if (!algerianPhonePattern.test(data.leaderNumber.trim())) {
      nextErrors.leaderNumber = "Please enter a valid number";
    }
    if (!data.leaderYear.trim()) {
      nextErrors.leaderYear = "Leader year is required.";
    } else if (!isValidStudyYear(data.leaderYear.trim())) {
      nextErrors.leaderYear = "Year must be between 1 and 5";
    }
  }

  if (stepIndex === 1) {
    data.members.forEach((member, index) => {
      if (!member.name.trim()) nextErrors[memberErrorKey(index, "name")] = "Member name is required";
      if (!member.email.trim()) {
        nextErrors[memberErrorKey(index, "email")] = "Member email is required";
      } else if (!emailPattern.test(member.email.trim())) {
        nextErrors[memberErrorKey(index, "email")] = "Please enter a valid email address";
      }
      if (!member.number.trim()) {
        nextErrors[memberErrorKey(index, "number")] = "Member number is required";
      } else if (!algerianPhonePattern.test(member.number.trim())) {
        nextErrors[memberErrorKey(index, "number")] = "Please enter a valid number";
      }
      if (!member.year.trim()) {
        nextErrors[memberErrorKey(index, "year")] = "Member year is required.";
      } else if (!isValidStudyYear(member.year.trim())) {
        nextErrors[memberErrorKey(index, "year")] = "Year must be between 1 and 5.";
      }
    });
  }

  if (stepIndex === 2) {
    if (data.pastParticipation === null) {
      nextErrors.pastParticipation = "Please choose Yes or No.";
    }
    if (!data.motivation.trim()) {
      nextErrors.motivation = "Motivation is required.";
    }
  }

  return nextErrors;
};

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

  const memberLabels = ["First", "Second", "Third", "Fourth"];

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
      <style>{`
        html.arcade-active,
        body.arcade-active {
          background: #080000 !important;
        }

        html.arcade-active,
        body.arcade-active {
          scrollbar-color: #ff0707 #080000;
        }

        html.arcade-active::-webkit-scrollbar,
        body.arcade-active::-webkit-scrollbar {
          width: 14px;
        }

        html.arcade-active::-webkit-scrollbar-track,
        body.arcade-active::-webkit-scrollbar-track {
          background: #080000;
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.8);
        }

        html.arcade-active::-webkit-scrollbar-thumb,
        body.arcade-active::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ff0707 0%, #8b0000 50%, #ff0707 100%);
          border-radius: 10px;
          border: 2px solid #080000;
          box-shadow: 0 0 6px rgba(255, 7, 7, 0.6);
        }

        html.arcade-active::-webkit-scrollbar-thumb:hover,
        body.arcade-active::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ff3333 0%, #cc0000 50%, #ff3333 100%);
          box-shadow: 0 0 10px rgba(255, 7, 7, 1);
        }

        .arcade-registration-page {
          background-attachment: fixed;
          background-color: #080000;
          min-height: 100vh;
        }

        .arcade-registration-content {
          width: 85vw;
          max-width: 1203px;
          margin-left: auto;
          margin-right: auto;
        }

        .arcade-success-back-btn > span {
          font-size: clamp(22px, 2.4vw, 28px) !important;
          line-height: clamp(22px, 2.4vw, 28px) !important;
          height: auto !important;
          width: 100% !important;
          justify-content: center !important;
          gap: 0 !important;
          transform: translateY(0) !important;
        }

        .arcade-success-decor-reg1-a,
        .arcade-success-decor-reg1-b,
        .arcade-success-decor-reg2-a,
        .arcade-success-decor-reg2-b {
          opacity: 0.62;
          pointer-events: none;
          user-select: none;
          filter: blur(3.6px) drop-shadow(0 0 18px rgba(255, 7, 7, 0.34));
        }

        .arcade-success-inner {
          min-height: 100%;
          width: 100%;
          justify-content: center;
          align-items: center;
          padding-top: 0;
          padding-bottom: 0;
        }

        .arcade-success-content {
          position: relative;
          z-index: 10;
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 12px;
        }

        @media (max-width: 639px) {
          .arcade-mobile-top-line {
            width: 80px;
            height: 1px;
            margin: 0 auto 20px;
            background: rgba(255, 255, 255, 0.85);
          }

          .arcade-title-main {
            font-size: 32px !important;
          }

          .arcade-title-arcade {
            font-size: 36px !important;
          }

          .arcade-title-line {
            width: 70% !important;
            max-width: none !important;
          }

          .arcade-steps-wrap {
            width: 70%;
            margin-left: auto;
            margin-right: auto;
          }

          .arcade-decor-reg1 {
            width: clamp(170px, 30vw, 240px) !important;
          }

          .arcade-decor-reg2 {
            width: clamp(145px, 26vw, 210px) !important;
          }

          .arcade-decor-reg3 {
            width: clamp(160px, 28vw, 230px) !important;
          }

          .arcade-past-wrap {
            align-items: center;
            justify-content: center;
            text-align: center;
            gap: 40px;
            padding-top: 4px;
            padding-bottom: 4px;
          }

          .arcade-past-question {
            text-align: center;
            max-width: 92%;
          }

          .arcade-past-toggle {
            width: 210px !important;
            height: 46px !important;
            padding: 8px 30px !important;
            margin: 0 auto;
            justify-content: center;
          }

          .arcade-motivation-textarea {
            min-height: 371px !important;
          }

          .arcade-success-inner {
            min-height: 100% !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            text-align: center !important;
          }

          .arcade-success-content {
            min-height: 100% !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
            gap: 14px !important;
          }

          .arcade-success-copy {
            width: 100% !important;
            max-width: 88% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .arcade-success-card {
            width: 92% !important;
            height: min(500px, calc(100vh - 120px)) !important;
            min-height: min(500px, calc(100vh - 120px)) !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          .arcade-success-decor-reg1-a,
          .arcade-success-decor-reg1-b {
            width: clamp(136px, 26vw, 190px) !important;
            left: 0 !important;
            right: auto !important;
            transform: translate(-42%, -34%) !important;
          }

          .arcade-success-decor-reg1-a {
            top: 16% !important;
          }

          .arcade-success-decor-reg1-b {
            top: 34% !important;
          }

          .arcade-success-decor-reg2-a,
          .arcade-success-decor-reg2-b {
            width: clamp(126px, 24vw, 176px) !important;
            right: 0 !important;
            left: auto !important;
            transform: translate(36%, 8%) !important;
          }

          .arcade-success-decor-reg2-a {
            bottom: 28% !important;
          }

          .arcade-success-decor-reg2-b {
            bottom: 12% !important;
            transform: translate(36%, 18%) !important;
          }
        }

        @media (min-width: 768px) {
          .arcade-registration-content {
            width: 86.68vw;
            max-width: 1203px;
          }
        }
      `}</style>
      <div
        className="arcade-registration-page overflow-hidden"
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
          <ArcadeCard
            size="lg"
            cardHeight="min(440px, calc(100vh - 170px))"
            contentPadding="px-4 sm:px-6 py-2 sm:py-4"
            className="arcade-success-card mt-0 mx-auto w-[92%] sm:w-[78%] lg:w-[66%]"
          >
            <div className="arcade-success-inner relative flex flex-1 w-full flex-col text-center sm:gap-5">
              <img
                src={registrationHand}
                alt=""
                aria-hidden="true"
                className="arcade-success-decor-reg1-a absolute left-[12%] top-[12%] -translate-x-1/2 -translate-y-1/2"
                style={{ width: "clamp(124px, 11vw, 162px)" }}
              />
              <img
                src={registrationHand}
                alt=""
                aria-hidden="true"
                className="arcade-success-decor-reg1-b absolute left-[18%] top-[26%] -translate-x-1/2 -translate-y-1/2"
                style={{ width: "clamp(114px, 10vw, 150px)" }}
              />
              <img
                src={slashHand}
                alt=""
                aria-hidden="true"
                className="arcade-success-decor-reg2-a absolute right-[16%] bottom-[24%] translate-x-1/2 translate-y-1/2"
                style={{ width: "clamp(110px, 10vw, 146px)" }}
              />
              <img
                src={slashHand}
                alt=""
                aria-hidden="true"
                className="arcade-success-decor-reg2-b absolute right-[10%] bottom-[10%] translate-x-1/2 translate-y-1/2"
                style={{ width: "clamp(104px, 10vw, 140px)" }}
              />

              <div className="arcade-success-content">
                <div className="arcade-success-copy mx-auto w-full max-w-2xl space-y-2 sm:space-y-3">
                  <h2 className="font-compacta text-[clamp(28px,3.4vw,48px)] uppercase tracking-[0.08em] text-white">
                    Registration Complete
                  </h2>
                  <p className="mx-auto max-w-xl font-futura text-[clamp(14px,1.4vw,18px)] leading-relaxed text-white/85">
                    Your Arcade registration has been submitted successfully. The Umbra Lab is reviewing your profile… await their verdict.
                    and stay alert
                  </p>
                </div>

                <div className="arcade-success-actions flex flex-col items-center gap-3 sm:flex-row">
                  <div style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
                    <ArcadeButton
                      variant="register"
                      className="arcade-success-back-btn"
                      onClick={() => {
                        navigate("/arcade");
                        window.scrollTo(0, 0);
                      }}
                    >
                      Back to Arcade
                    </ArcadeButton>
                  </div>
                </div>
              </div>
            </div>
          </ArcadeCard>
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

/* ─── Step 1: Team Info ─── */
const StepTeamInfo = ({ formData, updateField, onNext, onHome, errors }) => (
  <div className="relative isolate">
    <img
      src={reg3}
      alt=""
      aria-hidden="true"
      className="arcade-decor-reg3 pointer-events-none absolute right-0 top-[clamp(214px,20vw,330px)] z-0 select-none"
      style={{
        width: "clamp(220px, 22vw, 360px)",
        transform: "translate(4%, -55%)",
        filter: "drop-shadow(0 0 26px rgba(255, 7, 7, 0.34))",
        opacity: 0.95,
      }}
    />

    <div className="relative z-10 flex flex-col gap-14 sm:gap-16 lg:gap-20">
      <ArcadeCard
        size="sm"
        title="Team Information"
        icon={<MemberIcon />}
        cardHeight="clamp(226px, 52vw, 254px)"
      >
        <div className="flex h-full flex-col justify-center items-center sm:items-start sm:-mt-1">
          <div className="w-full" style={{ maxWidth: "clamp(320px, 52vw, 467px)" }}>
            <ArcadeInput
              label="Team Name"
              placeholder="Enter The Team Name"
              value={formData.teamName}
              onChange={(e) => updateField("teamName", e.target.value)}
              error={errors.teamName}
            />
          </div>
        </div>
      </ArcadeCard>

      <div className="relative">
        <img
          src={registrationHand}
          alt=""
          aria-hidden="true"
          className="arcade-decor-reg1 pointer-events-none absolute left-0 bottom-0 z-0 select-none"
          style={{
            width: "clamp(270px, 24vw, 390px)",
            transform: "translate(-24%, 48%)",
            opacity: 0.94,
            filter: "drop-shadow(0 0 22px rgba(255, 7, 7, 0.32))",
          }}
        />
        <img
          src={slashHand}
          alt=""
          aria-hidden="true"
          className="arcade-decor-reg2 pointer-events-none absolute right-0 bottom-0 z-0 select-none"
          style={{
            width: "clamp(225px, 20vw, 330px)",
            transform: "translate(38%, 44%)",
            opacity: 0.94,
            filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.3))",
          }}
        />

      <ArcadeCard size="lg" title="Leader Information" icon={<InfoIcon />}>
        <div className="relative flex h-full flex-col">
          <div className="flex flex-1 items-start pt-5 sm:pt-4">
          <div className="relative grid w-full content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-10 sm:gap-y-10 pb-3 sm:pb-4">

          <div className="relative z-10">
            <ArcadeInput
              label="Leader Name"
              placeholder="Enter your full Name"
              value={formData.leaderName}
              onChange={(e) => updateField("leaderName", e.target.value)}
              error={errors.leaderName}
            />
          </div>
          <div className="relative z-10">
            <ArcadeInput
              label="Leader Email"
              placeholder="Enter Your Email"
              value={formData.leaderEmail}
              onChange={(e) => updateField("leaderEmail", e.target.value)}
              error={errors.leaderEmail}
            />
          </div>
          <div className="relative z-10">
            <ArcadeInput
              label="Leader Number"
              placeholder="Enter your phone Number"
              value={formData.leaderNumber}
              onChange={(e) => updateField("leaderNumber", e.target.value)}
              error={errors.leaderNumber}
            />
          </div>
          <div className="relative z-10">
            <ArcadeYearSelect
              label="Year of studying"
              value={formData.leaderYear}
              onValueChange={(value) => updateField("leaderYear", value)}
              error={errors.leaderYear}
            />
          </div>
        </div>
        </div>

        <div className="relative z-10 mt-12 sm:mt-auto flex flex-col items-center gap-1 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-6 pb-1">
          <div className="order-2 sm:order-1" style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
            <ArcadeButton variant="previous" onClick={onHome} className="order-2 sm:order-1">
              Previous
            </ArcadeButton>
          </div>
          <div className="order-1 sm:order-2" style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
            <ArcadeButton variant="next" onClick={onNext} className="order-1 sm:order-2">
              Next
            </ArcadeButton>
          </div>
        </div>
        </div>
      </ArcadeCard>
      </div>
    </div>
  </div>
);

/* ─── Step 2: Members Info ─── */
const StepMembersInfo = ({ members, updateMember, memberLabels, onPrev, onNext, errors }) => (
  <div className="relative isolate">
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg1 absolute left-0 top-[clamp(28px,4vw,52px)]"
        style={{
          width: "clamp(285px, 24vw, 410px)",
          transform: "translate(-42%, -34%)",
          opacity: 0.92,
          filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.34))",
        }}
      />
      <img
        src={slashHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg2 absolute right-0 top-[clamp(320px,27vw,470px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, -6%)",
          opacity: 0.92,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.31))",
        }}
      />
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg1 absolute left-0 top-[clamp(580px,50vw,860px)]"
        style={{
          width: "clamp(285px, 24vw, 410px)",
          transform: "translate(-42%, -18%)",
          opacity: 0.9,
          filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.33))",
        }}
      />
      <img
        src={slashHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg2 absolute right-0 top-[clamp(980px,82vw,1440px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, 8%)",
          opacity: 0.9,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.3))",
        }}
      />
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg1 absolute left-0 top-[clamp(1220px,102vw,1760px)]"
        style={{
          width: "clamp(285px, 24vw, 410px)",
          transform: "translate(-42%, -12%)",
          opacity: 0.88,
          filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.32))",
        }}
      />
      <img
        src={slashHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg2 absolute right-0 top-[clamp(1560px,130vw,2240px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, 14%)",
          opacity: 0.88,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.29))",
        }}
      />
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg1 absolute left-0 top-[clamp(1880px,154vw,2620px)] sm:hidden"
        style={{
          width: "clamp(285px, 24vw, 410px)",
          transform: "translate(-42%, -10%)",
          opacity: 0.86,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.28))",
        }}
      />
      <img
        src={slashHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg2 absolute right-0 top-[clamp(2140px,176vw,2980px)] sm:hidden"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, 16%)",
          opacity: 0.84,
          filter: "drop-shadow(0 0 16px rgba(255, 7, 7, 0.26))",
        }}
      />
    </div>

    <div className="relative z-10 flex flex-col gap-14 sm:gap-16 lg:gap-20">
      {members.map((member, i) => (
        <ArcadeCard
          key={i}
          size={i === members.length - 1 ? "lg" : "md"}
          title={`${memberLabels[i]} Member Information`}
          icon={<InfoIcon />}
        >
        <div className={i === members.length - 1 ? "relative flex h-full flex-col" : "relative flex h-full flex-col justify-center sm:-mt-1"}>
          <div className={i === members.length - 1 ? "relative z-10 grid content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-10 sm:gap-y-10 pt-5 sm:pt-3" : "relative z-10 grid content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-10 sm:gap-y-8 pt-5 sm:pt-0"}>
          <ArcadeInput
            label="Member Name"
            placeholder="Enter your full Name"
            value={member.name}
            onChange={(e) => updateMember(i, "name", e.target.value)}
            error={errors[memberErrorKey(i, "name")]}
          />
          <ArcadeInput
            label="Member Email"
            placeholder="Enter Your Email"
            value={member.email}
            onChange={(e) => updateMember(i, "email", e.target.value)}
            error={errors[memberErrorKey(i, "email")]}
          />
          <ArcadeInput
            label="Member Number"
            placeholder="Enter your phone Number"
            value={member.number}
            onChange={(e) => updateMember(i, "number", e.target.value)}
            error={errors[memberErrorKey(i, "number")]}
          />
          <ArcadeYearSelect
            label="Year of studying"
            value={member.year}
            onValueChange={(value) => updateMember(i, "year", value)}
            error={errors[memberErrorKey(i, "year")]}
          />
        </div>

        {i === members.length - 1 && (
          <div className="mt-12 sm:mt-auto flex flex-col items-center gap-1 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-6 pb-1">
            <div className="order-2 sm:order-1" style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
              <ArcadeButton variant="previous" onClick={onPrev} className="order-2 sm:order-1">
                Previous
              </ArcadeButton>
            </div>
            <div className="order-1 sm:order-2" style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
              <ArcadeButton variant="next" onClick={onNext} className="order-1 sm:order-2">
                Next
              </ArcadeButton>
            </div>
          </div>
        )}
        </div>
      </ArcadeCard>
    ))}
    </div>
  </div>
);

/* ─── Step 3: Motivation ─── */
const StepMotivation = ({ formData, updateField, onPrev, onRegister, errors, submitError, isSubmitting }) => (
  <div className="relative isolate">
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg1 absolute left-0 top-[clamp(10px,2vw,20px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(-42%, -30%)",
          opacity: 0.9,
          filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.33))",
        }}
      />
      <img
        src={slashHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg2 absolute right-0 top-[clamp(260px,22vw,380px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, -4%)",
          opacity: 0.9,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.3))",
        }}
      />
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg1 absolute left-0 top-[clamp(560px,96vw,980px)] sm:hidden"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(-42%, -6%)",
          opacity: 0.86,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.28))",
        }}
      />
      <img
        src={slashHand}
        alt=""
        aria-hidden="true"
        className="arcade-decor-reg2 absolute right-0 top-[clamp(840px,145vw,1460px)] sm:hidden"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, 18%)",
          opacity: 0.82,
          filter: "drop-shadow(0 0 16px rgba(255, 7, 7, 0.24))",
        }}
      />
    </div>

    <div className="relative z-10 flex flex-col gap-14 sm:gap-16 lg:gap-20">
    {/* Past Participation */}
    <ArcadeCard
      size="sm"
      cardHeight="280px"
      contentPadding="px-6 sm:px-10 py-8 sm:py-6"
      topRightCorner="/images/arcade/top_right_sm.png"
      bottomLeftCorner="/images/arcade/bottom_left_sm.png"
    >
      <div className="arcade-past-wrap relative flex h-full flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">

        <p
          className="arcade-past-question relative z-10 font-futura text-white"
          style={{ fontSize: "20px" }}
        >
          Did any of your team members participated in past versions{" "}
          <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
        </p>
        <div
          className="arcade-past-toggle relative z-10 flex items-center gap-6"
          style={{
            width: "229px",
            height: "61px",
            background: "rgba(255, 255, 255, 0.11)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            borderRadius: "30px",
            padding: "18px 60px 17px 47px",
          }}
        >
          <label className="flex items-center gap-2 cursor-pointer font-futura text-white" style={{ fontSize: "16px" }}>
            <input
              type="radio"
              name="pastParticipation"
              checked={formData.pastParticipation === true}
              onChange={() => updateField("pastParticipation", true)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "9999px",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                background: formData.pastParticipation === true ? "#00C853" : "transparent",
              }}
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-futura text-white" style={{ fontSize: "16px" }}>
            <input
              type="radio"
              name="pastParticipation"
              checked={formData.pastParticipation === false}
              onChange={() => updateField("pastParticipation", false)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "9999px",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                background: formData.pastParticipation === false ? "#FF0707" : "transparent",
              }}
            />
            No
          </label>
        </div>
            {errors.pastParticipation && (
              <p className="mt-2 text-center font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
                {errors.pastParticipation}
              </p>
            )}
      </div>
    </ArcadeCard>

    {/* Motivation */}
    <ArcadeCard
      size="md"
      cardHeight="580px"
      contentPadding="px-10 sm:px-14 lg:px-16 py-12 sm:py-10 lg:py-12"
      title="Team Motivation"
      icon={<MemberIcon />}
    >
      <div className="relative flex h-full flex-col">
        <div className="relative flex-1 pt-5 sm:pt-3">

          <ArcadeTextarea
            className="arcade-motivation-textarea relative z-10"
            textareaStyle={{
              padding: "18px 43px 147px 43px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              borderRadius: "40px",
              minHeight: "205px",
            }}
            label="Show your energy !"
            placeholder="Write your message here ...."
            value={formData.motivation}
            onChange={(e) => updateField("motivation", e.target.value)}
            error={errors.motivation}
          />
        </div>

        <div className="mt-1 sm:mt-auto flex flex-col items-center gap-1 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-6 pb-1">
          <div className="order-2 sm:order-1" style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
            <ArcadeButton variant="previous" onClick={onPrev} className="order-2 sm:order-1">
              Previous
            </ArcadeButton>
          </div>
          <div className="order-1 sm:order-2" style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))", borderRadius: "40px" }}>
            <ArcadeButton variant="register" onClick={onRegister} className="order-1 sm:order-2" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </ArcadeButton>
          </div>
        </div>

        {submitError && (
          <p className="mt-4 text-center font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
            {submitError}
          </p>
        )}
      </div>
    </ArcadeCard>
    </div>
  </div>
);

export default RegistrationPage;
