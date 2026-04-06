import ArcadeButton from "../../../components/ArcadeButton";
import ArcadeCard from "../../../components/ArcadeCard";
import ArcadeInput from "../../../components/ArcadeInput";
import ArcadeYearSelect from "../../../components/ArcadeYearSelect";
import InfoIcon from "../../../components/InfoIcon";
import { memberErrorKey } from "../config";
import slashHand from "/images/arcade/reg_2.png";
import registrationHand from "/images/arcade/registeration_1.png";

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

export default StepMembersInfo;
