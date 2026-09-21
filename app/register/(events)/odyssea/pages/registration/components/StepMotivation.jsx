import { Sparkles } from "lucide-react";
import React from "react";
import Display from "../../../components/Display";
import StepActions from "./StepActions";

function Star() {
  return <span aria-hidden="true" className="text-ody-gold-deep">✦</span>;
}

function StepMotivation({ formData, errors, onChange, onBack, busy, isTeam = true }) {
  const left = 1500 - (formData.motivation ?? "").length;

  return (
    <div>
      <h2 className="ody-display flex items-center gap-2.5 text-[1.15rem] tracking-[0.1em] text-ody-ink sm:text-[1.3rem] lg:text-[1.55rem] lg:font-semibold">
        <Sparkles className="h-5 w-5 text-ody-gold-deep lg:h-7 lg:w-7" />
        <Display>Motivation</Display>
      </h2>

      <div className="mt-6 grid gap-7 lg:mt-9 lg:gap-10">
        <label className="block">
          <span className="ody-display flex items-center gap-2 text-[1.2rem] tracking-[0.02em] text-[#124053] lg:text-[1.55rem] lg:font-semibold">
            <Star /> <Display>How did you hear about us?</Display>
          </span>
          <textarea
            value={formData.discovery}
            maxLength={500}
            placeholder="Instagram, a friend, a teacher, a poster on campus..."
            onChange={(event) => onChange("discovery", event.target.value)}
            className="ody-textarea min-h-24"
          />
        </label>

        <label className="block">
          <span className="ody-display flex items-center gap-2 text-[1.2rem] tracking-[0.02em] text-[#124053] lg:text-[1.55rem] lg:font-semibold">
            <Star /> <Display>Motivation</Display> <span className="text-ody-danger">*</span>
          </span>
          <span className="mt-1 block text-[0.78rem] text-ody-ink/58 lg:text-[1rem] lg:leading-6">
            {isTeam
              ? "Why does your crew want to sail the Odyssea datathon?"
              : "Why do you want to sail the Odyssea datathon?"}
          </span>
          <textarea
            value={formData.motivation}
            maxLength={1500}
            required
            aria-invalid={Boolean(errors.motivation)}
            placeholder={isTeam ? "Tell us what drives your crew..." : "Tell us what drives you..."}
            onChange={(event) => onChange("motivation", event.target.value)}
            className="ody-textarea lg:min-h-40"
          />
          <span className="mt-1.5 flex items-center justify-between gap-4">
            <span className="text-[0.72rem] font-medium text-ody-danger lg:text-[0.82rem]">
              {errors.motivation ?? ""}
            </span>
            <span className="shrink-0 text-[0.7rem] tabular-nums text-ody-ink/45 lg:text-[0.8rem]">
              {left} left
            </span>
          </span>
        </label>
      </div>

      <StepActions onBack={onBack} nextLabel="REGISTER" submit busy={busy} />
    </div>
  );
}

export default React.memo(StepMotivation);
