import React from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import Display from "../../../components/Display";

function StepActions({ onBack, onNext, nextLabel = "NEXT", busy = false, submit = false }) {
  return (
    <div className="mt-9 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={busy}
          className="inline-flex items-center gap-2 justify-self-start rounded-full px-3 py-2 text-[0.82rem] font-semibold text-ody-ink/70 transition hover:text-ody-ink disabled:opacity-40"
        >
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
        className="ody-display inline-flex min-h-12 min-w-48 items-center justify-center gap-2 rounded-full bg-ody-night px-8 text-[1.05rem] tracking-wide text-ody-gold shadow-[0_10px_26px_rgba(1,27,42,0.4)] transition duration-300 hover:-translate-y-0.5 hover:bg-ody-night-soft hover:shadow-[0_14px_34px_rgba(1,27,42,0.5)] disabled:translate-y-0 disabled:opacity-60"
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
