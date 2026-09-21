import React from "react";
import { Laptop, MapPin, User, Users } from "lucide-react";
import PersonFields from "./PersonFields";
import StepActions from "./StepActions";
import { MODES, TEAM_SIZES } from "../config";
import Display from "../../../components/Display";

function Pill({ active, icon: Icon, children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 text-[0.85rem] font-semibold transition duration-300 ${
        active
          ? "border-ody-night bg-ody-night text-ody-gold shadow-[0_8px_20px_rgba(1,27,42,0.32)]"
          : "border-ody-gold-deep/60 text-ody-ink/75 hover:border-ody-night hover:text-ody-ink"
      } ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

function StepLeader({ formData, errors, onChange, onPersonChange, onNext }) {
  const isTeam = formData.kind === "team";

  return (
    <div>
      <div className="grid gap-7 border-b border-ody-gold-deep/35 pb-7 md:grid-cols-2 md:gap-10">
        <div>
          <p className="ody-display flex items-center gap-2.5 text-[1.15rem] tracking-[0.1em] text-ody-ink sm:text-[1.3rem]">
            <Users className="h-5 w-5 text-ody-gold-deep" />
            <Display>How are you sailing?</Display>
          </p>

          <div className="mt-3 flex gap-3">
            <Pill
              active={isTeam}
              icon={Users}
              onClick={() => onChange("kind", "team")}
              className="flex-1"
            >
              Team
            </Pill>
            <Pill
              active={!isTeam}
              icon={User}
              onClick={() => onChange("kind", "individual")}
              className="flex-1"
            >
              Individual
            </Pill>
          </div>

          {isTeam ? (
            <>
              <label htmlFor="team-name" className="mt-4 block">
                <span className="text-[0.78rem] font-semibold text-ody-ink/80">
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
                  className={`block overflow-hidden text-[0.72rem] font-medium text-ody-danger transition-all duration-300 ${
                    errors.teamName ? "mt-1.5 max-h-8 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {errors.teamName}
                </span>
              </label>

              <div className="mt-4">
                <span className="text-[0.78rem] font-semibold text-ody-ink/80">Team size</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TEAM_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => onChange("teamSize", size)}
                      aria-pressed={size === formData.teamSize}
                      aria-label={`${size} members`}
                      className={`h-9 w-9 rounded-full border text-[0.85rem] font-semibold transition duration-300 ${
                        size === formData.teamSize
                          ? "border-ody-night bg-ody-night text-ody-gold"
                          : "border-ody-gold-deep/55 text-ody-ink/70 hover:border-ody-night hover:text-ody-ink"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <span className="mt-2 block text-[0.72rem] text-ody-ink/55">
                  {formData.teamSize} members, including the team leader
                </span>
              </div>
            </>
          ) : (
            <p className="mt-4 text-[0.78rem] leading-5 text-ody-ink/60">
              Sailing solo is welcome. We pair individual voyagers into balanced crews on the
              morning of day one, so you still build with a team.
            </p>
          )}
        </div>

        <div>
          <p className="ody-display flex items-center gap-2.5 text-[1.15rem] tracking-[0.1em] text-ody-ink sm:text-[1.3rem]">
            <MapPin className="h-5 w-5 text-ody-gold-deep" />
            <Display>Participation mode</Display>
          </p>
          <div className="mt-3 flex gap-3">
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
          <p className="mt-3 text-[0.72rem] leading-5 text-ody-ink/55">
            {formData.mode === "onsite"
              ? "You join us on campus at ENSIA, Sidi Abdellah, for the full two days."
              : "You follow the workshops, the mentoring rounds and the final pitch through our live stream."}
          </p>
        </div>
      </div>

      <div className="pt-7">
        <PersonFields
          title={isTeam ? "Team leader info" : "Your info"}
          scope="leader"
          person={formData.leader}
          errors={errors}
          onChange={onPersonChange}
        />
      </div>

      <StepActions onNext={onNext} nextLabel="CONTINUE" />
    </div>
  );
}

export default React.memo(StepLeader);
