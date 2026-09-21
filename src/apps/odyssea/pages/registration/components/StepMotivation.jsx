import React from "react";
import { Sparkles } from "lucide-react";
import StepActions from "./StepActions";
import Display from "../../../components/Display";

function Star() {
  return <span aria-hidden="true" className="text-ody-gold-deep">✦</span>;
}

function StepMotivation({ formData, errors, onChange, onBack, busy }) {
  const isTeam = formData.kind === "team";
  const left = 1500 - (formData.motivation ?? "").length;

  return (
    <div>
      <h2 className="ody-display flex items-center gap-2.5 text-[1.15rem] tracking-[0.1em] text-ody-ink sm:text-[1.3rem]">
        <Sparkles className="h-5 w-5 text-ody-gold-deep" />
        <Display>Motivation</Display>
      </h2>

      <div className="mt-6 grid gap-7">
        <label className="block">
          <span className="ody-display flex items-center gap-2 text-[1.2rem] tracking-[0.02em] text-ody-ink">
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
          <span className="ody-display flex items-center gap-2 text-[1.2rem] tracking-[0.02em] text-ody-ink">
            <Star /> <Display>Motivation</Display> <span className="text-ody-danger">*</span>
          </span>
          <span className="mt-1 block text-[0.76rem] text-ody-ink/58">
            {isTeam
              ? "Why does your team want to join The Odyssea?"
              : "Why do you want to join The Odyssea?"}
          </span>
          <textarea
            value={formData.motivation}
            maxLength={1500}
            required
            aria-invalid={Boolean(errors.motivation)}
            placeholder={isTeam ? "Tell us what drives your crew..." : "Tell us what drives you..."}
            onChange={(event) => onChange("motivation", event.target.value)}
            className="ody-textarea"
          />
          <span className="mt-1.5 flex items-center justify-between gap-4">
            <span className="text-[0.72rem] font-medium text-ody-danger">
              {errors.motivation ?? ""}
            </span>
            <span className="shrink-0 text-[0.7rem] tabular-nums text-ody-ink/45">
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
