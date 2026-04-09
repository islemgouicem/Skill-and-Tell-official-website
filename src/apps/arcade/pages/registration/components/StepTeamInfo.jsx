import ArcadeButton from "../../../components/ArcadeButton";
import ArcadeCard from "../../../components/ArcadeCard";
import ArcadeInput from "../../../components/ArcadeInput";
import ArcadeYearSelect from "../../../components/ArcadeYearSelect";
import InfoIcon from "../../../components/InfoIcon";
import MemberIcon from "../../../components/MemberIcon";
import slashHand from "/images/arcade/reg_2.png";
import reg3 from "/images/arcade/reg_3.png";
import registrationHand from "/images/arcade/registeration_1.png";

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
        className="arcade-mobile-no-button-card"
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

export default StepTeamInfo;
