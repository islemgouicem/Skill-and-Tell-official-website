"use client";
import { useEffect, useState } from "react";
import { RegisterationProvider } from "@/lib/hooks/useRegistration";
import { Clock } from "lucide-react";
import "@/styles/site.css";
import RegistrationForm from "./features/ifregistration_active/register_if_reg_active";
import RegisterShell from "./features/components/RegisterShell";
import { StepHeader } from "./features/components/Fields";

const REGISTRATION_OPENS_AT = new Date("2026-09-27T16:00:00+01:00").getTime();

function RegistrationClosed() {
  const [remaining, setRemaining] = useState(() => Math.max(0, REGISTRATION_OPENS_AT - Date.now()));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, REGISTRATION_OPENS_AT - Date.now()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (remaining === 0) return null;

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const cell = (v, label) => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center">
      <p className="font-compacta text-5xl leading-none text-white tabular-nums sm:text-6xl">{String(v).padStart(2, "0")}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">{label}</p>
    </div>
  );

  return (
    <RegisterShell step={0}>
      <div className="reg-step" aria-live="polite">
        <StepHeader icon={Clock} title="Registrations open soon" text="Registrations will open at 4:00 PM Algiers time. Keep this page open." />
        <div className="grid grid-cols-3 gap-3">
          {cell(hours, "Hours")}
          {cell(minutes, "Minutes")}
          {cell(seconds, "Seconds")}
        </div>
      </div>
    </RegisterShell>
  );
}

export default function RegisterView() {
  const [isOpen, setIsOpen] = useState(() => Date.now() >= REGISTRATION_OPENS_AT);

  useEffect(() => {
    if (isOpen) return undefined;

    const timer = window.setInterval(() => {
      if (Date.now() >= REGISTRATION_OPENS_AT) {
        setIsOpen(true);
      }
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return <RegistrationClosed />;

  return (
    <RegisterationProvider>
      <RegistrationForm />
    </RegisterationProvider>
  );
}