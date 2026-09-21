"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import "@/styles/odyssea.css";

import Brand from "../components/Brand";
import CompassDivider from "../components/CompassDivider";
import PersonFields from "./registration/components/PersonFields";
import StepActions from "./registration/components/StepActions";
import StepLeader from "./registration/components/StepLeader";
import StepMotivation from "./registration/components/StepMotivation";
import StepRail from "./registration/components/StepRail";
import SuccessState from "./registration/components/SuccessState";

import { ROMAN, createInitialFormData } from "./registration/config";
import {
  duplicateEmails,
  validateLeaderStep,
  validateMotivationStep,
  validatePerson,
} from "./registration/validation";
import { submitOdysseaRegistration } from "../lib/api";
import { TAGLINE } from "../lib/content";

import Display from "../components/Display";
import Image from "next/image";
import registrationBg from "@/assets/images/odyssea/registration-bg.webp";
import parchment from "@/assets/images/odyssea/parchment.webp";
import flourish from "@/assets/images/odyssea/flourish.webp";

export default function OdysseaRegistrationPage() {
  const [formData, setFormData] = useState(createInitialFormData);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("next");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const isTeam = formData.kind === "team";
  const memberCount = isTeam ? Math.max(0, formData.teamSize - 1) : 0;
  const motivationStep = memberCount + 1;

  const railLabels = useMemo(
    () => [
      isTeam ? "Leader" : "You",
      ...Array.from({ length: memberCount }, (_, i) => `Member ${ROMAN[i]}`),
      "Motivation",
    ],
    [memberCount, isTeam],
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Registration | Odyssea by Skill&Tell";
    document.documentElement.classList.add("odyssea-active");
    document.body.classList.add("odyssea-active");
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("odyssea-active");
      document.body.classList.remove("odyssea-active");
    };
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length === 0) return undefined;
    const id = window.requestAnimationFrame(() => {
      const node = document.querySelector('.ody-card [aria-invalid="true"]');
      if (!node) return;
      node.scrollIntoView({ behavior: "smooth", block: "center" });
      node.focus?.({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [errors]);

  const clearError = useCallback((key) => {
    setSubmitError("");
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const updateField = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      clearError(field);
    },
    [clearError],
  );

  const updatePerson = useCallback(
    (scope, field, value) => {
      setFormData((prev) => {
        if (scope === "leader") {
          return { ...prev, leader: { ...prev.leader, [field]: value } };
        }
        const index = Number(scope.replace("member", ""));
        const members = [...prev.members];
        members[index] = { ...members[index], [field]: value };
        return { ...prev, members };
      });
      clearError(`${scope}.${field}`);
    },
    [clearError],
  );

  useEffect(() => {
    setStep((current) => Math.min(current, memberCount + 1));
  }, [memberCount]);

  const move = useCallback((next, dir) => {
    setDirection(dir);
    setStep(next);
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const validateCurrent = useCallback(() => {
    if (step === 0) return validateLeaderStep(formData);
    if (step <= memberCount) {
      const index = step - 1;
      return validatePerson(formData.members[index], `member${index}`);
    }
    return validateMotivationStep(formData);
  }, [step, formData, memberCount]);

  const handleNext = useCallback(() => {
    const next = { ...validateCurrent(), ...(step <= memberCount ? duplicateEmails(formData) : {}) };
    const own = Object.keys(next).filter(
      (key) => key === "teamName" || key === "mode" || key.startsWith(step === 0 ? "leader." : `member${step - 1}.`),
    );

    if (own.length > 0) {
      setErrors(Object.fromEntries(own.map((key) => [key, next[key]])));
      return;
    }

    move(step + 1, "next");
  }, [validateCurrent, step, memberCount, formData, move]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (step !== motivationStep || isSubmitting) return;

      const motivationErrors = validateMotivationStep(formData);
      if (Object.keys(motivationErrors).length > 0) {
        setErrors(motivationErrors);
        return;
      }

      const crewErrors = {
        ...validateLeaderStep(formData),
        ...duplicateEmails(formData),
      };
      formData.members.slice(0, memberCount).forEach((member, index) => {
        Object.assign(crewErrors, validatePerson(member, `member${index}`));
      });

      if (Object.keys(crewErrors).length > 0) {
        const firstStep = Object.keys(crewErrors).some(
          (key) => key === "teamName" || key === "mode" || key.startsWith("leader."),
        )
          ? 0
          : Number(Object.keys(crewErrors)[0].match(/member(\d+)/)?.[1] ?? 0) + 1;
        setDirection("back");
        setStep(firstStep);
        setErrors(crewErrors);
        setSubmitError("Some details are missing. We took you back to the step that needs a fix.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setIsSubmitting(true);
      setSubmitError("");

      try {
        await submitOdysseaRegistration(formData);
        setDone({
          teamName: isTeam ? formData.teamName : formData.leader.fullName,
          email: formData.leader.email,
          isTeam,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        setSubmitError(error?.message ?? "Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [step, motivationStep, isSubmitting, formData, memberCount, isTeam],
  );

  const memberIndex = step - 1;

  return (
    <main
      className="odyssea-app odyssea-registration relative w-full overflow-x-hidden"
      style={{
        "--ody-registration-img": `url("${registrationBg.src}")`,
        "--ody-parchment-img": `url("${parchment.src}")`,
      }}
    >
      <Image
        src={flourish}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-28 z-0 w-44 rotate-6 select-none opacity-35 sm:-left-20 sm:-top-32 sm:w-56 lg:w-64"
      />

      <header className="relative z-20 mx-auto flex max-w-[1440px] items-start justify-between gap-4 px-5 py-6 sm:px-9 lg:px-14">
        <Link href="/register/odyssea" onClick={() => window.scrollTo(0, 0)} aria-label="Back to Odyssea">
          <Brand size="md" className="[text-shadow:0_2px_12px_rgba(1,27,42,0.95)]" />
        </Link>
        <p className="pt-2 text-right text-[0.62rem] font-semibold tracking-[0.12em] text-ody-gold sm:text-[0.82rem]">
          {TAGLINE}
        </p>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-2 sm:px-7">
        <div className="text-center">
          <CompassDivider star="w-9 sm:w-11" />
          <p className="ody-display mt-4 text-[1.1rem] tracking-[0.22em] text-ody-title sm:text-[1.35rem]">
            <Display>Join the journey</Display>
          </p>
          <h1 className="ody-display ody-weighted mt-1 text-[clamp(3.2rem,11vw,7rem)] leading-none text-ody-parchment drop-shadow-[0_6px_24px_rgba(0,19,30,0.7)]">
            <Display>REGISTRATION</Display>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[0.9rem] leading-6 text-white/78 sm:text-[1.05rem] sm:leading-7">
            Ready to make an impact? Fill in your details below
            <br className="hidden sm:block" /> to secure your spot in The Odyssea.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mx-auto mt-9">
          {/* honeypot: hidden from people, irresistible to bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={formData.website}
            onChange={(event) => updateField("website", event.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div
            key={`${step}-${memberCount}-${formData.kind}-${done ? "done" : "form"}`}
            className={`ody-card ${direction === "next" ? "ody-card-enter-next" : "ody-card-enter-back"}`}
          >
            {done ? (
              <SuccessState teamName={done.teamName} email={done.email} isTeam={done.isTeam} />
            ) : (
              <>
                <StepRail labels={railLabels} current={step} />

                {submitError && (
                  <p
                    role="alert"
                    className="mb-5 flex items-start gap-2 rounded-lg border border-ody-danger/40 bg-ody-danger/10 px-4 py-3 text-[0.82rem] font-medium text-ody-danger"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    {submitError}
                  </p>
                )}

                {step === 0 && (
                  <StepLeader
                    formData={formData}
                    errors={errors}
                    onChange={updateField}
                    onPersonChange={updatePerson}
                    onNext={handleNext}
                  />
                )}

                {step > 0 && step <= memberCount && (
                  <div>
                    <PersonFields
                      title={`Team member ${ROMAN[memberIndex]}`}
                      scope={`member${memberIndex}`}
                      person={formData.members[memberIndex]}
                      errors={errors}
                      onChange={updatePerson}
                      autoFocus
                    />
                    <StepActions
                      onBack={() => move(step - 1, "back")}
                      onNext={handleNext}
                      nextLabel={step === memberCount ? "ALMOST THERE" : "NEXT MEMBER"}
                    />
                  </div>
                )}

                {step === motivationStep && (
                  <StepMotivation
                    formData={formData}
                    errors={errors}
                    onChange={updateField}
                    onBack={() => move(step - 1, "back")}
                    busy={isSubmitting}
                  />
                )}
              </>
            )}
          </div>

          <CompassDivider className="mt-6" star="w-8" />
        </form>

        {!done && (
          <div className="mt-8 flex justify-center">
            <Link
              href="/register/odyssea"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-2 text-[0.8rem] font-medium text-white/65 transition hover:text-ody-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the Odyssea page
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
