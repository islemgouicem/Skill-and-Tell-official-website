import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/arcade.css";
import ArcadeButton from "../components/ArcadeButton";
import ArcadeCard from "../components/ArcadeCard";
import ArcadeCheckboxGroup from "../components/ArcadeCheckboxGroup";
import ArcadeInput from "../components/ArcadeInput";
import ArcadeRadioToggle from "../components/ArcadeRadioToggle";
import ArcadeTextarea from "../components/ArcadeTextarea";
import ArcadeYearSelect from "../components/ArcadeYearSelect";
import InfoIcon from "../components/InfoIcon";
import { submitArcadeOrganizerRegistration } from "../lib/api";
import SuccessState from "./registration/components/SuccessState";

import slashHand from "/images/arcade/reg_2.png";
import reg3 from "/images/arcade/reg_3.png";
import registrationHand from "/images/arcade/registeration_1.png";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const algerianPhonePattern = /^0[5-7]\d{8}$/;

const createInitialFormData = () => ({
  name: "",
  school: "",
  email: "",
  phone: "",
  schoolYear: "",
  isMember: null,
  availableDays: [],
  availablePreMeet: null,
  hasExperience: null,
  experienceDescription: "",
  role: null, // "Logistics" | "Media"
  preferredShifts: [],
});

const validateForm = (data) => {
  const errors = {};

  // Personal Info
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.school.trim()) errors.school = "School name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!algerianPhonePattern.test(data.phone.trim())) {
    errors.phone = "Please enter a valid number.";
  }
  if (!data.schoolYear.trim()) errors.schoolYear = "School year is required.";

  // Organizers Registration
  if (data.isMember === null) errors.isMember = "Please select Yes or No.";
  if (data.availableDays.length === 0)
    errors.availableDays = "Please select at least one available day.";
  if (data.availablePreMeet === null)
    errors.availablePreMeet = "Please select Yes or No.";
  if (data.hasExperience === null)
    errors.hasExperience = "Please select Yes or No.";
  if (data.hasExperience && !data.experienceDescription.trim())
    errors.experienceDescription = "Please describe your experience.";
  if (data.role === null) errors.role = "Please select a role.";
  if (data.preferredShifts.length === 0)
    errors.preferredShifts = "Please select at least one preferred shift.";

  return errors;
};

const OrganizersRegPage = () => {
  const [formData, setFormData] = useState(createInitialFormData());
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
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

  const handleHome = () => {
    navigate("/arcade");
    window.scrollTo(0, 0);
  };

  const handleRegister = async () => {
    const nextErrors = validateForm(formData);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      // Scroll to the first error roughly
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      await submitArcadeOrganizerRegistration(formData);
      setSubmitSuccess(true);
      setFormData(createInitialFormData());
      setErrors({});
      window.scrollTo(0, 0);
    } catch (error) {
      setSubmitError(
        error?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("arcade-active");
    document.body.classList.add("arcade-active");

    return () => {
      document.documentElement.classList.remove("arcade-active");
      document.body.classList.remove("arcade-active");
    };
  }, []);

  const yesNoOptions = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  const roleOptions = [
    { value: "Logistics", label: "Logistics" },
    { value: "Media", label: "Media" },
  ];

  const daysOptions = [
    { value: "24 Avril", label: "24 Avril" },
    { value: "25 Avril", label: "25 Avril" },
  ];

  const shiftOptions = [
    { value: "24 April 10 to 15", label: "24 April 10 to 15" },
    { value: "24 April 15 to 22", label: "24 April 15 to 22" },
    { value: "25 April 8 to 13", label: "25 April 8 to 13" },
    { value: "25 April 13 to 19", label: "25 April 13 to 19" },
  ];

  return (
    <div
      className="arcade-registration-page arcade-organizers-reg-page overflow-hidden"
      style={{ background: "#080000", minHeight: "100vh" }}
    >
      <style>{`
        @media (min-width: 768px) {
          .arcade-organizers-reg-page .org-card-organizers .arcade-card-content {
            padding-left: clamp(36px, 7vw, 120px) !important;
            padding-right: clamp(36px, 7vw, 120px) !important;
            padding-top: clamp(36px, 3vw, 54px) !important;
            padding-bottom: clamp(38px, 3.2vw, 58px) !important;
          }

          .arcade-organizers-reg-page .org-card-body {
            padding-top: clamp(34px, 3vw, 48px) !important;
          }

          .arcade-organizers-reg-page .org-card-personal .org-card-body {
            padding-top: clamp(14px, 1.4vw, 22px) !important;
          }

          .arcade-organizers-reg-page .org-personal-last-field {
            margin-bottom: 14px !important;
          }

          .arcade-organizers-reg-page .org-control-206 {
            width: 206px !important;
            margin-left: auto;
          }

          .arcade-organizers-reg-page .org-control-311 {
            width: 311px !important;
            margin-left: auto;
          }

          .arcade-organizers-reg-page .org-control-full {
            width: 100% !important;
          }

          .arcade-organizers-reg-page .org-control-206 .relative.z-10,
          .arcade-organizers-reg-page .org-control-311 .relative.z-10,
          .arcade-organizers-reg-page .org-control-full .relative.z-10 {
            box-sizing: border-box !important;
            width: 100% !important;
            justify-content: center !important;
            min-height: 52px !important;
            padding-top: 13px !important;
            padding-bottom: 13px !important;
            padding-left: 39px !important;
            padding-right: 45px !important;
            gap: 24px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 25px !important;
          }

          .arcade-organizers-reg-page .org-checkbox .relative.z-10 {
            gap: 32px !important;
          }

          .arcade-organizers-reg-page .org-checkbox .relative.z-10 label > span {
            width: 22px !important;
            height: 22px !important;
            border-color: rgba(255, 255, 255, 0.6) !important;
          }

          .arcade-organizers-reg-page .org-checkbox .relative.z-10 input:checked + span {
            border-color: rgba(255, 255, 255, 0.6) !important;
            background: transparent !important;
          }

          .arcade-organizers-reg-page .org-checkbox .relative.z-10 input:checked + span svg {
            width: 18px !important;
            height: 18px !important;
            color: #00c853 !important;
            stroke-width: 3.2 !important;
          }

          .arcade-organizers-reg-page .org-register-wrap {
            margin-top: clamp(104px, 10vw, 146px) !important;
            margin-bottom: clamp(44px, 2vw, 76px) !important;
          }
        }

        @media (max-width: 767px) {
          .arcade-organizers-reg-page .org-questions-stack {
            gap: clamp(34px, 12vw, 44px) !important;
          }

          .arcade-organizers-reg-page .org-decor-reg1-mobile {
            width: clamp(285px, 24vw, 410px) !important;
            left: 0 !important;
            top: clamp(28px, 4vw, 52px) !important;
            transform: translate(-42%, -34%) !important;
            opacity: 0.92 !important;
            filter: drop-shadow(0 0 20px rgba(255, 7, 7, 0.34)) !important;
          }

          .arcade-organizers-reg-page .org-decor-reg2-mobile {
            width: clamp(235px, 20vw, 340px) !important;
            right: 0 !important;
            top: clamp(320px, 27vw, 470px) !important;
            transform: translate(36%, -6%) !important;
            opacity: 0.92 !important;
            filter: drop-shadow(0 0 18px rgba(255, 7, 7, 0.31)) !important;
          }

          .arcade-organizers-reg-page .org-decor-reg3-mobile {
            display: none !important;
          }

          .arcade-organizers-reg-page .org-personal-last-field {
            margin-bottom: 12px !important;
          }

          .arcade-organizers-reg-page .org-card-organizers .org-row-member {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 8px !important;
          }

          .arcade-organizers-reg-page .org-card-organizers .org-row-member > label {
            flex: 1 1 auto;
            margin-right: 8px;
            white-space: nowrap;
            font-size: clamp(12px, 3.4vw, 14px) !important;
            line-height: 1.2 !important;
          }

          .arcade-organizers-reg-page .org-mobile-yesno {
            width: clamp(112px, 34vw, 122px) !important;
            margin-left: 0 !important;
            flex: 0 0 auto;
          }

          .arcade-organizers-reg-page .org-mobile-yesno .relative.z-10 {
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: 27px !important;
            height: 27px !important;
            padding: 5px 13px !important;
            gap: 10px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 25px !important;
          }

          .arcade-organizers-reg-page .org-mobile-yesno .relative.z-10 label {
            font-size: 12px !important;
            line-height: 1 !important;
            gap: 6px !important;
          }

          .arcade-organizers-reg-page .org-mobile-yesno .relative.z-10 label > span {
            width: 10px !important;
            height: 10px !important;
          }

          .arcade-organizers-reg-page .org-mobile-role {
            width: min(194px, 100%) !important;
            margin-left: 0 !important;
            margin-right: auto !important;
            align-self: flex-start;
          }

          .arcade-organizers-reg-page .org-mobile-role .relative.z-10 {
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: 35px !important;
            height: 35px !important;
            padding: 8px 34px 9px 30px !important;
            gap: 10px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 25px !important;
          }

          .arcade-organizers-reg-page .org-mobile-role .relative.z-10 label {
            font-size: 12px !important;
            line-height: 1 !important;
            gap: 6px !important;
          }

          .arcade-organizers-reg-page .org-mobile-days {
            width: min(198px, 100%) !important;
            margin-left: 0 !important;
            margin-right: auto !important;
            align-self: flex-start;
          }

          .arcade-organizers-reg-page .org-mobile-days .relative.z-10 {
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: 28px !important;
            height: 28px !important;
            padding: 4px 13px 6px 15px !important;
            gap: 10px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 25px !important;
          }

          .arcade-organizers-reg-page .org-mobile-days .relative.z-10 label {
            font-size: 11px !important;
            line-height: 1 !important;
            gap: 5px !important;
            white-space: nowrap;
          }

          .arcade-organizers-reg-page .org-mobile-days .relative.z-10 label > span {
            width: 11px !important;
            height: 11px !important;
          }

          .arcade-organizers-reg-page .org-mobile-shifts {
            width: min(294px, 100%) !important;
          }

          .arcade-organizers-reg-page .org-mobile-shifts .relative.z-10 {
            box-sizing: border-box !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            align-items: center !important;
            justify-items: start !important;
            width: 100% !important;
            min-height: 98px !important;
            padding: 18px 9px 12px !important;
            gap: 10px 12px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 25px !important;
          }

          .arcade-organizers-reg-page .org-mobile-shifts .relative.z-10 label {
            font-size: 11px !important;
            line-height: 1.1 !important;
            gap: 6px !important;
            white-space: nowrap;
          }

          .arcade-organizers-reg-page .org-mobile-shifts .relative.z-10 label > span {
            width: 12px !important;
            height: 12px !important;
          }

          .arcade-organizers-reg-page .org-mobile-experience {
            width: min(294px, 100%) !important;
            align-self: stretch;
          }

          .arcade-organizers-reg-page .org-mobile-experience .arcade-form-textarea {
            box-sizing: border-box !important;
            width: 100% !important;
            min-height: 110px !important;
            height: 110px !important;
            padding: 15px 10px 82px 10px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 2px solid rgba(255, 255, 255, 0.4) !important;
            border-radius: 25px !important;
          }
        }

      `}</style>
      <div
        className={`arcade-registration-content relative z-10 ${submitSuccess ? "min-h-[100dvh] flex flex-col justify-center py-0" : "py-8 sm:py-12 pt-20"}`}
      >
        {/* Title */}
        {!submitSuccess && (
          <div className="text-center mb-24 sm:mb-32">
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
          <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20">
            {/* --- Card 1: Personal Information --- */}
            <div className="relative isolate">
              <img
                src={registrationHand}
                alt=""
                aria-hidden="true"
                className="org-decor-reg1-mobile arcade-decor-slashes pointer-events-none absolute left-0 top-0 z-0 select-none"
                style={{
                  width: "clamp(320px, 32vw, 440px)",
                  transform: "translate(-30%, -20%) rotate(-5deg)",
                  filter: "drop-shadow(0 0 35px rgba(255, 7, 7, 0.45))",
                  opacity: 0.9,
                }}
              />
              <ArcadeCard
                className="org-card-personal arcade-mobile-no-button-card"
                size="md"
                title="Personal Information"
                icon={<InfoIcon />}
                cardHeight="auto"
                contentPadding="px-8 sm:px-14 lg:px-16 py-10 sm:py-10"
              >
                <div className="org-card-body relative flex h-full flex-col">
                  <div className="flex flex-1 items-start pt-5 sm:pt-4">
                    <div className="relative z-10 grid w-full content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-10 sm:gap-y-10 pb-3 sm:pb-4">
                      <ArcadeInput
                        label="Your Name"
                        placeholder="Enter your full Name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        error={errors.name}
                      />
                      <ArcadeInput
                        label="Your school"
                        placeholder="Enter your school name"
                        value={formData.school}
                        onChange={(e) => updateField("school", e.target.value)}
                        error={errors.school}
                      />
                      <ArcadeInput
                        label="Your email"
                        placeholder="example@gmail.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        error={errors.email}
                      />
                      <ArcadeInput
                        label="Your phone number"
                        placeholder="Enter your phone Number"
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        error={errors.phone}
                      />
                      <ArcadeYearSelect
                        className="org-personal-last-field"
                        label="Year of studying"
                        value={formData.schoolYear}
                        onValueChange={(value) => updateField("schoolYear", value)}
                        error={errors.schoolYear}
                      />
                    </div>
                  </div>
                </div>
              </ArcadeCard>
            </div>

            {/* --- Card 2: Organizers Registration --- */}
            <div className="relative isolate">
              {/* Hand decorations around the large bottom card */}
              <div className="pointer-events-none absolute inset-0 z-0 select-none">
                <img
                  src={reg3} // This is reg_3.png (bony hand)
                  alt=""
                  aria-hidden="true"
                  className="org-decor-reg3-mobile arcade-decor-reg2 absolute right-[-8%] top-[-12%]"
                  style={{
                    width: "clamp(100px, 22vw, 120px)",
                    transform: "translateX(-120px) rotate(-30deg)",
                    opacity: 0.9,
                    filter: "blur(1px) drop-shadow(0 0 30px rgba(255, 7, 7, 0.4))",
                  }}
                />
                <img
                  src={slashHand} // This is reg_2.png (HELP hand)
                  alt=""
                  aria-hidden="true"
                  className="org-decor-reg2-mobile arcade-decor-hand2 absolute right-[-5%] bottom-[-5%]"
                  style={{
                    width: "clamp(300px, 30vw, 400px)",
                    transform: "rotate(0deg) translate(20%, -30%)",
                    opacity: 0.9,
                    filter: "blur(2px) drop-shadow(0 0 35px rgba(255, 7, 7, 0.45))",
                  }}
                />
              </div>

              <ArcadeCard
                className="org-card-organizers"
                size="lg"
                title="Organizers registration"
                icon={<InfoIcon />}
                // overriding height to be auto based on content for this large form
                cardHeight="auto"
                contentPadding="px-8 sm:px-14 lg:px-16 py-10 sm:py-10"
                topRightCorner="/images/arcade/top_right_org.png"
                bottomLeftCorner="/images/arcade/bottom_left_org.png"
              >
                <div className="org-card-body relative flex h-full flex-col z-10 pt-5 sm:pt-4">
                  <div className="org-questions-stack flex flex-col gap-8 sm:gap-10">
                    <div className="org-row-member flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <label
                        className="font-futura text-white font-medium"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Are you a member <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
                      </label>
                      <div className="org-control-206 org-mobile-yesno md:ml-auto">
                        <ArcadeRadioToggle
                          name="isMember"
                          options={yesNoOptions}
                          value={formData.isMember}
                          onChange={(val) => updateField("isMember", val)}
                          error={errors.isMember}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <label
                        className="font-futura text-white font-medium"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Are you available in the days of the event <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
                      </label>
                      <div className="org-control-311 org-checkbox org-mobile-days md:ml-auto">
                        <ArcadeCheckboxGroup
                          options={daysOptions}
                          selected={formData.availableDays}
                          onChange={(val) => updateField("availableDays", val)}
                          error={errors.availableDays}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <label
                        className="font-futura text-white font-medium"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Are you available for the pre organization meet <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
                      </label>
                      <div className="org-control-206 org-mobile-yesno md:ml-auto">
                        <ArcadeRadioToggle
                          name="availablePreMeet"
                          options={yesNoOptions}
                          value={formData.availablePreMeet}
                          onChange={(val) =>
                            updateField("availablePreMeet", val)
                          }
                          error={errors.availablePreMeet}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <label
                        className="font-futura text-white font-medium"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Do you have previous experience <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
                      </label>
                      <div className="org-control-206 org-mobile-yesno md:ml-auto">
                        <ArcadeRadioToggle
                          name="hasExperience"
                          options={yesNoOptions}
                          value={formData.hasExperience}
                          onChange={(val) => updateField("hasExperience", val)}
                          error={errors.hasExperience}
                        />
                      </div>
                    </div>

                    <div className="org-mobile-experience w-full mt-2">
                      <ArcadeTextarea
                        label="Describe your experience :"
                        placeholder="Write here .."
                        className="no-scrollbar"
                        value={formData.experienceDescription}
                        onChange={(e) =>
                          updateField("experienceDescription", e.target.value)
                        }
                        error={errors.experienceDescription}
                        showErrorState={false}
                        textareaStyle={{
                          minHeight: "120px",
                          border: "2px solid rgba(255, 255, 255, 0.4)",
                        }}
                      />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
                      <label
                        className="font-futura text-white font-medium"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Select your role :
                      </label>
                      <div className="org-control-206 org-mobile-role md:ml-auto">
                        <ArcadeRadioToggle
                          name="role"
                          options={roleOptions}
                          value={formData.role}
                          onChange={(val) => updateField("role", val)}
                          error={errors.role}
                        />
                      </div>
                    </div>

                    <div className="w-full mt-2 flex flex-col gap-3">
                      <label
                        className="font-futura text-white font-medium mb-1"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Which shift suits you best <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
                      </label>
                      <div className="org-control-full org-checkbox org-mobile-shifts">
                        <ArcadeCheckboxGroup
                          options={shiftOptions}
                          selected={formData.preferredShifts}
                          onChange={(val) => updateField("preferredShifts", val)}
                          error={errors.preferredShifts}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="org-register-wrap mt-12 flex flex-col items-center gap-1 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-6 mb-4">
                    <div
                      className="order-2 sm:order-1"
                      style={{
                        filter:
                          "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))",
                        borderRadius: "40px",
                      }}
                    >
                      <ArcadeButton variant="previous" onClick={handleHome}>
                        Previous
                      </ArcadeButton>
                    </div>
                    <div
                      className="order-1 sm:order-2"
                      style={{
                        filter:
                          "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))",
                        borderRadius: "40px",
                      }}
                    >
                      <ArcadeButton
                        variant="register"
                        onClick={handleRegister}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Register"}
                      </ArcadeButton>
                    </div>
                  </div>

                  {submitError && (
                    <p
                      className="mt-4 text-center font-futura text-sm text-[#ff9b9b]"
                      style={{ lineHeight: 1.2 }}
                    >
                      {submitError}
                    </p>
                  )}
                </div>
              </ArcadeCard>
            </div>
            {/* Added some padding to ensure we can scroll past bottom shadow */}
            <div className="h-8"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizersRegPage;
