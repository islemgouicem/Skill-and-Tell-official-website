"use client";
import { useEffect, useState } from "react";
import { RegisterationProvider } from "@/lib/hooks/useRegistration";
import RegistrationForm from "./features/ifregistration_active/register_if_reg_active";

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

  return (
    <main className="min-h-screen p-6 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/Team_Section.webp')" }}>
      <section className="glass rounded-2xl p-8 md:p-12 w-full max-w-xl text-center animate-fade-in-up">
        <h1 className="section-title">Registrations are closed</h1>
        <p className="text-gray-200 mt-4">Registrations will open at 4:00 PM Algiers time.</p>
        <div className="mt-8 text-4xl md:text-5xl font-bold gradient-text tabular-nums" aria-live="polite">
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <p className="text-gray-300 text-sm mt-3">Opening soon</p>
      </section>
    </main>
  );
}

export default function Page() {
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