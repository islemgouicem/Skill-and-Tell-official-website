import ArcadeButton from "./ArcadeButton";
import ArcadeCard from "./ArcadeCard";
import ArcadeTextarea from "./ArcadeTextarea";
import MemberIcon from "./MemberIcon";
import Image from "next/image";
const StepMotivation = ({ formData, updateField, onPrev, onRegister, errors, submitError, isSubmitting }) => (<div className="relative isolate">
    <div className="pointer-events-none absolute inset-0 z-0 select-none">
      <Image src="/images/arcade/registeration_1.png" alt="" aria-hidden="true" className="arcade-decor-reg1 absolute left-0 top-[clamp(10px,2vw,20px)]" style={{
        width: "clamp(235px, 20vw, 340px)",
        transform: "translate(-42%, -30%)",
        opacity: 0.9,
        filter: "drop-shadow(0 0 20px rgba(255, 7, 7, 0.33))",
    }} width={340} height={340} />
      <Image src="/images/arcade/reg_2.png" alt="" aria-hidden="true" className="arcade-decor-reg2 absolute right-0 top-[clamp(260px,22vw,380px)]" style={{
        width: "clamp(235px, 20vw, 340px)",
        transform: "translate(36%, -4%)",
        opacity: 0.9,
        filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.3))",
    }} width={340} height={340} />
      <Image src="/images/arcade/registeration_1.png" alt="" aria-hidden="true" className="arcade-decor-reg1 absolute left-0 top-[clamp(560px,96vw,980px)] sm:hidden" style={{
        width: "clamp(235px, 20vw, 340px)",
        transform: "translate(-42%, -6%)",
        opacity: 0.86,
        filter: "drop-shadow(0 0 18px rgba(255, 7, 7, 0.28))",
    }} width={340} height={340} />
      <Image src="/images/arcade/reg_2.png" alt="" aria-hidden="true" className="arcade-decor-reg2 absolute right-0 top-[clamp(840px,145vw,1460px)] sm:hidden" style={{
        width: "clamp(235px, 20vw, 340px)",
        transform: "translate(36%, 18%)",
        opacity: 0.82,
        filter: "drop-shadow(0 0 16px rgba(255, 7, 7, 0.24))",
    }} width={340} height={340} />
    </div>

    <div className="relative z-10 flex flex-col gap-14 sm:gap-16 lg:gap-20">
      <ArcadeCard size="sm" cardHeight="280px" contentPadding="px-6 sm:px-10 py-8 sm:py-6" topRightCorner="/images/arcade/top_right_sm.png" bottomLeftCorner="/images/arcade/bottom_left_sm.png">
        <div className="arcade-past-wrap relative flex h-full flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="arcade-past-question relative z-10 font-futura text-white" style={{ fontSize: "20px" }}>
            Did any of your team members participated in past versions{" "}
            <span style={{ fontFamily: "Arial, system-ui, sans-serif" }}>?</span>
            <span style={{ color: "#FF6E6E" }}> *</span>
          </p>
          <div className="arcade-past-toggle relative z-10 flex items-center gap-6" style={{
        width: "229px",
        height: "61px",
        background: "rgba(255, 255, 255, 0.05)",
        border: "2px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "25px",
        padding: "11px clamp(18px, 2.2vw, 27px)",
    }}>
            <label className="flex items-center gap-2 cursor-pointer font-futura text-white" style={{ fontSize: "16px" }}>
              <input type="radio" name="pastParticipation" checked={formData.pastParticipation === true} onChange={() => updateField("pastParticipation", true)} className="sr-only"/>
              <span aria-hidden="true" style={{
        width: "16px",
        height: "16px",
        borderRadius: "9999px",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        background: formData.pastParticipation === true ? "#00C853" : "transparent",
    }}/>
              Yes
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-futura text-white" style={{ fontSize: "16px" }}>
              <input type="radio" name="pastParticipation" checked={formData.pastParticipation === false} onChange={() => updateField("pastParticipation", false)} className="sr-only"/>
              <span aria-hidden="true" style={{
        width: "16px",
        height: "16px",
        borderRadius: "9999px",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        background: formData.pastParticipation === false ? "#FF0707" : "transparent",
    }}/>
              No
            </label>
          </div>
          {errors.pastParticipation && (<p className="mt-2 text-center font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
              {errors.pastParticipation}
            </p>)}
        </div>
      </ArcadeCard>

      <ArcadeCard size="md" cardHeight="clamp(620px, 56vw, 700px)" contentPadding="px-10 sm:px-14 lg:px-16 py-12 sm:py-10 lg:py-12" title="Team Motivation" icon={<MemberIcon />}>
        <div className="relative flex h-full flex-col">
          <div className="relative flex-1 pt-5 sm:pt-3">
            <ArcadeTextarea className="arcade-motivation-textarea relative z-10" textareaStyle={{
        padding: "16px clamp(18px, 2.2vw, 27px)",
        background: "rgba(255, 255, 255, 0.05)",
        border: "2px solid rgba(255, 255, 255, 0.4)",
        borderRadius: "25px",
        minHeight: "205px",
    }} label="Show your energy !" placeholder="Write your message here ...." value={formData.motivation} onChange={(e) => updateField("motivation", e.target.value)} error={errors.motivation}/>
          </div>

          <div className="mt-6 sm:mt-auto flex flex-col items-center gap-1.5 pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-6 pb-6 sm:pb-8 lg:pb-10">
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

          {submitError && (<p className="mt-4 text-center font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
              {submitError}
            </p>)}
        </div>
      </ArcadeCard>
    </div>
  </div>);
export default StepMotivation;
