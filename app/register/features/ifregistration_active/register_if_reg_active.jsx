"use client";
import React, { useState } from "react";
import { supabase } from "@/lib/services/supabase";
import NotRegistered from "../sections/new_register";
import { useRegistration } from "@/lib/hooks/useRegistration";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import RegisterShell from "../components/RegisterShell";
import { Field, StepHeader, inputClass } from "../components/Fields";

function RegistrationForm() {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const {
    phase1, setPhase1, formData, errors, setErrors,
    handleInputChange, setTotalSteps, currentStep,
    setIsRegistered,
    completionTitle, completionMsg,
  } = useRegistration();
  const router = useRouter();

  const redirect = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter your email address",
      }));
      return;
    }

    setIsCheckingEmail(true);
    try {
      const { data, error } = await supabase
        .from("registration")
        .select("id")
        .eq("email", formData.email.trim());
      if (error) throw error;

      if (data && data.length > 0) {
        // Already registered , just show the message, no further steps.
        setIsRegistered(true);
        setPhase1(4);
      } else {
        setIsRegistered(false);
        setTotalSteps(4);
        setPhase1(2);
      }
    } catch (error) {
      console.error("Error checking registration:", error);
      alert("An error occurred while checking your registration. Please try again.");
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const done = phase1 === 3 || phase1 === 4;
  const step = phase1 === 1 ? 0 : phase1 === 2 ? currentStep : 4;

  return (
    <RegisterShell step={step} done={done} wide={phase1 !== 1}>
      {/* Step 0 , email check */}
      {phase1 === 1 && (
        <form
          noValidate
          className="reg-step"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isCheckingEmail) redirect();
          }}
        >
          <StepHeader icon="/icons/Profile.svg" title="Enter Your Email" text="We'll check if you're already registered." />
          <Field label="Email address" required error={errors.email} htmlFor="reg-email">
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={inputClass(errors.email)}
              placeholder="your.email@example.com"
              aria-invalid={!!errors.email}
              autoFocus
            />
          </Field>

          <div className="mt-10 flex items-center justify-between gap-3 border-t border-Main-500/40 pt-6">
            <button
              type="button"
              onClick={() => {
                router.push("/");
                window.scrollTo(0, 0);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-Main-500 px-4 text-sm text-white/85 transition-colors hover:border-Main-300 hover:bg-white/5 sm:px-5"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </button>
            <button type="submit" disabled={isCheckingEmail} className="reg-next inline-flex h-11 items-center gap-2 rounded-lg border border-Main-300/50 px-5 text-sm text-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,109,0,0.8)] disabled:pointer-events-none disabled:opacity-60 sm:px-6">
              {isCheckingEmail ? (<><Loader2 className="h-4 w-4 animate-spin" /> Checking…</>) : (<>Continue <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </div>
        </form>
      )}

      {/* Steps 1–4 , new member */}
      {phase1 === 2 && <NotRegistered />}

      {/* Completion (new member finished all steps) */}
      {phase1 === 3 && (
        <Outcome icon={CheckCircle} title={completionTitle} text={completionMsg} onHome={() => router.push("/")} />
      )}

      {/* Already registered (no further steps) */}
      {phase1 === 4 && (
        <Outcome
          icon={AlertCircle}
          tone="warm"
          title="You're already registered!"
          text="You've already registered with Skill & Tell. Your information is already saved."
          onHome={() => router.push("/")}
        />
      )}
    </RegisterShell>
  );
}

function Outcome({ icon: Icon, title, text, onHome, tone }) {
  return (
    <div className="reg-step py-4 text-center sm:py-8">
      <Icon className={`mx-auto h-16 w-16 ${tone === "warm" ? "text-orange-400" : "text-green-400"}`} />
      <h2 className="gradient-text mt-5 inline-block p-1 text-4xl font-bold md:text-5xl">{title}</h2>
      <p className="mx-auto mt-6 max-w-md leading-relaxed text-white/75">{text}</p>
      <button type="button" onClick={onHome} className="reg-next mt-9 inline-flex h-11 items-center gap-2 rounded-lg border border-Main-300/50 px-6 text-sm text-white transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(255,109,0,0.8)]">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </button>
    </div>
  );
}

export default React.memo(RegistrationForm);
