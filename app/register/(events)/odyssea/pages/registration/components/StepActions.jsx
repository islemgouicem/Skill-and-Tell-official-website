import React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Display from "../../../components/Display";

function StepActions({ onBack, onNext, nextLabel = "NEXT", busy = false, submit = false }) {
  return (
    <div className="mt-9 grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:mt-12">
      {onBack ? (
        <button type="button" onClick={onBack} disabled={busy} className="ody-btn-ghost justify-self-start text-[0.85rem] lg:text-[0.95rem]">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      ) : (
        <span />
      )}

      <button
        type={submit ? "submit" : "button"}
        onClick={submit ? undefined : onNext}
        disabled={busy}
        className="ody-btn ody-display min-w-52 text-[1.1rem] tracking-wide lg:min-w-60 lg:text-[1.3rem]"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        <Display>{busy ? "SENDING..." : nextLabel}</Display>
        {!busy && <ArrowRight className="h-4 w-4" />}
      </button>

      <span />
    </div>
  );
}

export default React.memo(StepActions);
