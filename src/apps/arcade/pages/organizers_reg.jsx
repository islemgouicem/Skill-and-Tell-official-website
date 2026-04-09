import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/arcade.css";
import ArcadeButton from "../components/ArcadeButton";
import ArcadeCard from "../components/ArcadeCard";
import ArcadeInput from "../components/ArcadeInput";
import ArcadeTextarea from "../components/ArcadeTextarea";
import InfoIcon from "../components/InfoIcon";
import ArcadeRadioToggle from "../components/ArcadeRadioToggle";
import ArcadeCheckboxGroup from "../components/ArcadeCheckboxGroup";
import SuccessState from "./registration/components/SuccessState";
import { submitArcadeOrganizerRegistration } from "../lib/api";

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
      //await submitArcadeOrganizerRegistration(formData);
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
    { value: "25 Avril", label: "25 Avril" },
    { value: "26 Avril", label: "26 Avril" },
  ];

  const shiftOptions = [
    { value: "24 April morning", label: "24 April morning" },
    { value: "24 April afternoon", label: "24 April afternoon" },
    { value: "25 April morning", label: "25 April morning" },
    { value: "25 April afternoon", label: "25 April afternoon" },
  ];

  return (
    <div
      className="arcade-registration-page overflow-hidden"
      style={{ background: "#080000", minHeight: "100vh" }}
    >
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
                src={registrationHand} // This is actually registeration_1.png (slashes)
                alt=""
                aria-hidden="true"
                className="arcade-decor-slashes pointer-events-none absolute left-0 top-0 z-0 select-none"
                style={{
                  width: "clamp(320px, 32vw, 440px)",
                  transform: "translate(-30%, -20%) rotate(-5deg)",
                  filter: "drop-shadow(0 0 35px rgba(255, 7, 7, 0.45))",
                  opacity: 0.9,
                }}
              />
              <ArcadeCard
                size="md"
                title="Personal Information"
                icon={<InfoIcon />}
                cardHeight="auto"
              >
                <div className="relative flex h-full flex-col">
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
                      <ArcadeInput
                        label="Year of studying"
                        placeholder="Enter your year of studying"
                        value={formData.schoolYear}
                        onChange={(e) =>
                          updateField("schoolYear", e.target.value)
                        }
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
                  className="arcade-decor-hand1 absolute right-[-8%] top-[-12%]"
                  style={{
                    width: "clamp(80px, 22vw, 100px)",
                    transform: "translateX(-100px) rotate(-30deg)",
                    opacity: 0.9,
                    filter: "drop-shadow(0 0 30px rgba(255, 7, 7, 0.4))",
                  }}
                />
                <img
                  src={slashHand} // This is reg_2.png (HELP hand)
                  alt=""
                  aria-hidden="true"
                  className="arcade-decor-hand2 absolute right-[-5%] bottom-[-5%]"
                  style={{
                    width: "clamp(440px, 44vw, 600px)",
                    transform: "rotate(-10deg) translate(20%, -5  %)",
                    opacity: 0.9,
                    filter: "drop-shadow(0 0 35px rgba(255, 7, 7, 0.45))",
                  }}
                />
              </div>

              <ArcadeCard
                size="lg"
                title="Organizers registration"
                icon={<InfoIcon />}
                // overriding height to be auto based on content for this large form
                cardHeight="auto"
                contentPadding="px-8 sm:px-11 lg:px-12 py-10 sm:py-9"
              >
                <div className="relative flex h-full flex-col z-10 pt-5 sm:pt-4">
                  <div className="flex flex-col gap-8 sm:gap-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <label
                        className="font-futura text-white font-medium"
                        style={{
                          fontSize: "clamp(15px, 1.5vw, 20px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Are you a member ?
                      </label>
                      <div className="md:w-[300px]">
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
                        Are you available in the days of the event ?
                      </label>
                      <div className="md:w-auto">
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
                        Are you available for the pre organization meet ?
                      </label>
                      <div className="md:w-[300px]">
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
                        Do you have previous experience ?
                      </label>
                      <div className="md:w-[300px]">
                        <ArcadeRadioToggle
                          name="hasExperience"
                          options={yesNoOptions}
                          value={formData.hasExperience}
                          onChange={(val) => updateField("hasExperience", val)}
                          error={errors.hasExperience}
                        />
                      </div>
                    </div>

                    <div className="w-full mt-2">
                      <ArcadeTextarea
                        label="Describe your experience :"
                        placeholder="Write here .."
                        value={formData.experienceDescription}
                        onChange={(e) =>
                          updateField("experienceDescription", e.target.value)
                        }
                        error={errors.experienceDescription}
                        textareaStyle={{ minHeight: "120px" }}
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
                      <div className="md:w-[300px]">
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
                        Which shift suits you best ?
                      </label>
                      <ArcadeCheckboxGroup
                        options={shiftOptions}
                        selected={formData.preferredShifts}
                        onChange={(val) => updateField("preferredShifts", val)}
                        error={errors.preferredShifts}
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-center mb-4">
                    <div
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
