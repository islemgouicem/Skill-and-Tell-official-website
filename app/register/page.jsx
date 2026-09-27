"use client"
import { RegisterationProvider } from "@/lib/hooks/useRegistration";
import RegistrationForm from "./features/ifregistration_active/register_if_reg_active";

export default function Page() {
  return (
    <RegisterationProvider>
      <RegistrationForm />
    </RegisterationProvider>
  );
}