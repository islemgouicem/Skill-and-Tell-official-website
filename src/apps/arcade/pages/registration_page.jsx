import { useEffect, useState } from "react";
import ArcadeButton from "../components/ArcadeButton";
import ArcadeCard from "../components/ArcadeCard";
import ArcadeInput from "../components/ArcadeInput";
import ArcadeTextarea from "../components/ArcadeTextarea";
import InfoIcon from "../components/InfoIcon";
import MemberIcon from "../components/MemberIcon";
import StepIndicator from "../components/StepIndicator";
import slashHand from "/images/arcade/reg_2.png";
import reg3 from "/images/arcade/reg_3.png";
import registrationHand from "/images/arcade/registeration_1.png";

const STEPS = ["Team Info", "Members info", "Motivation"];

const emptyMember = () => ({ name: "", email: "", number: "", year: "" });

const RegistrationPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    leaderNumber: "",
    leaderYear: "",
    members: [emptyMember(), emptyMember(), emptyMember(), emptyMember()],
    pastParticipation: null,
    motivation: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMember = (index, field, value) => {
    setFormData((prev) => {
      const members = [...prev.members];
      members[index] = { ...members[index], [field]: value };
      return { ...prev, members };
    });
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const handleRegister = () => {
    console.log("Registration submitted:", formData);
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
      `}</style>
      <div
        className="arcade-registration-page"
        style={{ background: "#080000" }}
      >
      <div className="relative z-10 max-w-[1203px] mx-auto px-4 sm:px-8 py-8 sm:py-12 pb-20">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex flex-col items-center justify-center gap-0 sm:flex-row sm:items-end sm:gap-[17px]">
            <span
              className="font-compacta text-white"
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
              className="font-futura"
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
            className="font-compacta text-white leading-tight"
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
            className="mx-auto mt-3 sm:mt-4"
            style={{
              width: "100%",
              maxWidth: "1120px",
              height: "0px",
              border: "1px solid #FFFFFF",
            }}
          />
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} steps={STEPS} />

        {/* Step Content */}
        <div className="flex flex-col gap-14 sm:gap-16 lg:gap-20 mt-6 sm:mt-8">
          {step === 0 && <StepTeamInfo formData={formData} updateField={updateField} onNext={handleNext} />}
          {step === 1 && (
            <StepMembersInfo
              members={formData.members}
              updateMember={updateMember}
              memberLabels={memberLabels}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}
          {step === 2 && <StepMotivation formData={formData} updateField={updateField} onPrev={handlePrev} onRegister={handleRegister} />}
        </div>
      </div>
      </div>
    </>
  );
};

/* ─── Step 1: Team Info ─── */
const StepTeamInfo = ({ formData, updateField, onNext }) => (
  <div className="relative isolate">
    <img
      src={reg3}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-[clamp(214px,20vw,330px)] z-0 select-none"
      style={{
        width: "clamp(220px, 22vw, 360px)",
        transform: "translate(4%, -55%)",
        filter: "drop-shadow(0 0 26px rgba(255, 7, 7, 0.34))",
        opacity: 0.95,
      }}
    />

    <div className="relative z-10 flex flex-col gap-14 sm:gap-16 lg:gap-20">
      <ArcadeCard size="sm" title="Team Information" icon={<MemberIcon />}>
        <div className="flex h-full flex-col justify-center items-center sm:items-start sm:-mt-1">
          <div className="w-full" style={{ maxWidth: "clamp(320px, 52vw, 467px)" }}>
            <ArcadeInput
              label="Team Name"
              placeholder="Enter The Team Name"
              value={formData.teamName}
              onChange={(e) => updateField("teamName", e.target.value)}
            />
          </div>
        </div>
      </ArcadeCard>

      <div className="relative">
        <img
          src={registrationHand}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 bottom-0 z-0 select-none"
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
          className="pointer-events-none absolute right-0 bottom-0 z-0 select-none"
          style={{
            width: "clamp(225px, 20vw, 330px)",
            transform: "translate(38%, 44%)",
            opacity: 0.94,
            filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.3))",
          }}
        />

      <ArcadeCard size="lg" title="Leader Information" icon={<InfoIcon />}>
        <div className="relative flex h-full flex-col">
          <div className="flex flex-1 items-start pt-2 sm:pt-4">
          <div className="relative grid w-full content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-2 sm:gap-y-10 pb-3 sm:pb-4">

          <div className="relative z-10">
            <ArcadeInput
              label="Leader Name"
              placeholder="Enter your full Name"
              value={formData.leaderName}
              onChange={(e) => updateField("leaderName", e.target.value)}
            />
          </div>
          <div className="relative z-10">
            <ArcadeInput
              label="Leader Email"
              placeholder="Enter Your Email"
              value={formData.leaderEmail}
              onChange={(e) => updateField("leaderEmail", e.target.value)}
            />
          </div>
          <div className="relative z-10">
            <ArcadeInput
              label="Leader Number"
              placeholder="Enter your phone Number"
              value={formData.leaderNumber}
              onChange={(e) => updateField("leaderNumber", e.target.value)}
            />
          </div>
          <div className="relative z-10">
            <ArcadeInput
              label="Year of studying"
              placeholder="Enter your year"
              value={formData.leaderYear}
              onChange={(e) => updateField("leaderYear", e.target.value)}
            />
          </div>
        </div>
        </div>

        <div className="relative z-10 mt-auto flex items-center justify-between pt-5 sm:pt-6 pb-1">
          <ArcadeButton variant="previous" disabled>
            Previous
          </ArcadeButton>
          <ArcadeButton variant="next" onClick={onNext}>
            Next
          </ArcadeButton>
        </div>
        </div>
      </ArcadeCard>
      </div>
    </div>
  </div>
);

/* ─── Step 2: Members Info ─── */
const StepMembersInfo = ({ members, updateMember, memberLabels, onPrev, onNext }) => (
  <div className="relative isolate">
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-[clamp(28px,4vw,52px)]"
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
        className="absolute right-0 top-[clamp(320px,27vw,470px)]"
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
        className="absolute left-0 top-[clamp(580px,50vw,860px)]"
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
        className="absolute right-0 top-[clamp(980px,82vw,1440px)]"
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
        className="absolute left-0 top-[clamp(1220px,102vw,1760px)]"
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
        className="absolute right-0 top-[clamp(1560px,130vw,2240px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, 14%)",
          opacity: 0.88,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.29))",
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
          <div className={i === members.length - 1 ? "relative z-10 grid content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-2 sm:gap-y-10 pt-2 sm:pt-3" : "relative z-10 grid content-start auto-rows-min grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-[130px] gap-y-2 sm:gap-y-8"}>
          <ArcadeInput
            label="Member Name"
            placeholder="Enter your full Name"
            value={member.name}
            onChange={(e) => updateMember(i, "name", e.target.value)}
          />
          <ArcadeInput
            label="Member Email"
            placeholder="Enter Your Email"
            value={member.email}
            onChange={(e) => updateMember(i, "email", e.target.value)}
          />
          <ArcadeInput
            label="Member Number"
            placeholder="Enter your phone Number"
            value={member.number}
            onChange={(e) => updateMember(i, "number", e.target.value)}
          />
          <ArcadeInput
            label="Year of studying"
            placeholder="Enter your year"
            value={member.year}
            onChange={(e) => updateMember(i, "year", e.target.value)}
          />
        </div>

        {i === members.length - 1 && (
          <div className="mt-auto flex items-center justify-between pt-5 sm:pt-6 pb-1">
            <ArcadeButton variant="previous" onClick={onPrev}>
              Previous
            </ArcadeButton>
            <ArcadeButton variant="next" onClick={onNext}>
              Next
            </ArcadeButton>
          </div>
        )}
        </div>
      </ArcadeCard>
    ))}
    </div>
  </div>
);

/* ─── Step 3: Motivation ─── */
const StepMotivation = ({ formData, updateField, onPrev, onRegister }) => (
  <div className="relative isolate">
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <img
        src={registrationHand}
        alt=""
        aria-hidden="true"
        className="absolute left-0 top-[clamp(10px,2vw,20px)]"
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
        className="absolute right-0 top-[clamp(260px,22vw,380px)]"
        style={{
          width: "clamp(235px, 20vw, 340px)",
          transform: "translate(36%, -4%)",
          opacity: 0.9,
          filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.3))",
        }}
      />
    </div>

    <div className="relative z-10 flex flex-col gap-14 sm:gap-16 lg:gap-20">
    {/* Past Participation */}
    <ArcadeCard
      size="sm"
      cardHeight="148px"
      contentPadding="px-6 sm:px-10 py-4 sm:py-4"
      topRightCorner="/images/arcade/top_right_sm.png"
      bottomLeftCorner="/images/arcade/bottom_left_sm.png"
    >
      <div className="relative flex h-full flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">

        <p
          className="relative z-10 font-futura text-white"
          style={{ fontSize: "clamp(14px, 2vw, 18px)" }}
        >
          Did any of your team members participated in past versions ?
        </p>
        <div
          className="relative z-10 flex items-center gap-6"
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
      </div>
    </ArcadeCard>

    {/* Motivation */}
    <ArcadeCard size="md" cardHeight="580px" title="Team Motivation" icon={<MemberIcon />}>
      <div className="relative flex h-full flex-col">
        <div className="relative flex-1 pt-2 sm:pt-3">

          <ArcadeTextarea
            className="relative z-10"
            textareaStyle={{
              padding: "18px 43px 147px 43px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              borderRadius: "40px",
              minHeight: "189px",
            }}
            label="Show your energy !"
            placeholder="Write your message here ...."
            value={formData.motivation}
            onChange={(e) => updateField("motivation", e.target.value)}
          />
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 sm:pt-6 pb-1">
          <ArcadeButton variant="previous" onClick={onPrev}>
            Previous
          </ArcadeButton>
          <ArcadeButton variant="register" onClick={onRegister}>
            Register
          </ArcadeButton>
        </div>
      </div>
    </ArcadeCard>
    </div>
  </div>
);

export default RegistrationPage;
