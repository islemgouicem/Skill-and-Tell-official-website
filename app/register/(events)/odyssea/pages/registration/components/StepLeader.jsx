import React from "react";
import { Laptop, MapPin, User, Users } from "lucide-react";
import PersonFields from "./PersonFields";
import StepActions from "./StepActions";
import { MODES, TEAM_SIZES } from "../config";
import Display from "../../../components/Display";

function Pill({ active, icon: Icon, children, onClick, className = "" }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={`ody-pill ${className}`}>
      {Icon && <Icon className="h-4 w-4 lg:h-[1.1rem] lg:w-[1.1rem]" />}
      {children}
    </button>
  );
}

function BlockTitle({ icon: Icon, children }) {
  return (
    <p className="ody-display flex items-center gap-2.5 text-[1.15rem] tracking-[0.1em] text-ody-ink sm:text-[1.3rem] lg:text-[1.55rem]">
      <Icon className="h-5 w-5 text-ody-gold-deep lg:h-6 lg:w-6" />
      <Display>{children}</Display>
    </p>
  );
}

function StepLeader({ formData, errors, onChange, onPersonChange, onNext }) {
  const isTeam = formData.kind === "team";

  return (
    <div>
      <div className="grid gap-7 border-b border-ody-gold-deep/35 pb-7 md:grid-cols-2 md:gap-10 lg:gap-14 lg:pb-10">
        <div>
          <BlockTitle icon={Users}>How are you sailing?</BlockTitle>

          <div className="mt-3.5 flex gap-3 lg:mt-5">
            <Pill active={isTeam} icon={Users} onClick={() => onChange("kind", "team")} className="flex-1">
              Team
            </Pill>
            <Pill active={!isTeam} icon={User} onClick={() => onChange("kind", "individual")} className="flex-1">
              Individual
            </Pill>
          </div>

          {isTeam ? (
            <>
              <label htmlFor="team-name" className="mt-5 block">
                <span className="text-[0.82rem] font-semibold text-ody-ink/80 lg:text-[0.95rem]">
                  Team name <span className="text-ody-danger">*</span>
                </span>
                <input
                  id="team-name"
                  value={formData.teamName}
                  maxLength={60}
                  placeholder="Your crew's name"
                  aria-invalid={Boolean(errors.teamName)}
                  onChange={(event) => onChange("teamName", event.target.value)}
                  className="ody-input"
                />
                <span
                  className={`block overflow-hidden text-[0.72rem] font-medium text-ody-danger transition-all duration-300 lg:text-[0.82rem] ${
                    errors.teamName ? "mt-1.5 max-h-8 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {errors.teamName}
                </span>
              </label>

              <div className="mt-5">
                <span className="text-[0.82rem] font-semibold text-ody-ink/80 lg:text-[0.95rem]">Team size</span>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {TEAM_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onChange("teamSize", size)}
                      aria-pressed={size === formData.teamSize}
                      aria-label={`${size} members`}
                      className="ody-chip"
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <span className="mt-2.5 block text-[0.76rem] leading-5 text-ody-ink/55 lg:text-[0.88rem]">
                  <span className="font-semibold text-ody-ink/75">{formData.teamSize} members</span>
                  <br />
                  including the team leader
                </span>
              </div>
            </>
          ) : (
            <p className="mt-5 text-[0.8rem] leading-6 text-ody-ink/60 lg:text-[0.95rem] lg:leading-7">
              Sailing solo is welcome. We pair individual voyagers into balanced crews on the
              morning of day one, so you still build with a team.
            </p>
          )}
        </div>

        <div className="md:border-l md:border-ody-gold-deep/30 md:pl-10 lg:pl-14">
          <BlockTitle icon={MapPin}>Participation mode</BlockTitle>
          <div className="mt-3.5 flex gap-3 lg:mt-5">
            {MODES.map((mode) => (
              <Pill
                key={mode.value}
                active={formData.mode === mode.value}
                icon={mode.value === "onsite" ? MapPin : Laptop}
                onClick={() => onChange("mode", mode.value)}
                className="flex-1"
              >
                {mode.label}
              </Pill>
            ))}
          </div>
          <p className="mt-3.5 text-[0.76rem] leading-5 text-ody-ink/55 lg:text-[0.88rem] lg:leading-6">
            {formData.mode === "onsite"
              ? "Two days on site at World AI Week in Amsterdam, with mentors, workshops and the final defence in the room."
              : "You follow the briefings, the mentoring rounds and the final defence through our live stream, wherever you are."}
          </p>
        </div>
      </div>

      <div className="pt-7 lg:pt-10">
        <PersonFields
          title={isTeam ? "Team leader info" : "Your info"}
          scope="leader"
          person={formData.leader}
          errors={errors}
          onChange={onPersonChange}
        />
      </div>

      <StepActions onNext={onNext} nextLabel={isTeam ? "REGISTER TEAM" : "CONTINUE"} />
    </div>
  );
}

export default React.memo(StepLeader);
