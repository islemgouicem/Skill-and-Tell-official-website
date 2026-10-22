import { useRegistration } from "@/lib/hooks/useRegistration";
import { Field, StepHeader, inputClass } from "../components/Fields";

export default function PersonalInofo() {
  const { formData, handleInputChange, errors } = useRegistration();
  return (
    <div>
      <StepHeader icon="/icons/Profile.svg" title="Personal Information" text="How should we call you, and how can we reach you?" />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={errors.fullname} htmlFor="reg-fullname" className="sm:col-span-2">
          <input id="reg-fullname" type="text" autoComplete="name" value={formData.fullname} onChange={(e) => handleInputChange("fullname", e.target.value)} className={inputClass(errors.fullname)} placeholder="Your full name" aria-invalid={!!errors.fullname} />
        </Field>
        <Field label="Phone number" required error={errors.phone} htmlFor="reg-phone">
          <input id="reg-phone" type="tel" inputMode="numeric" autoComplete="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} className={inputClass(errors.phone)} placeholder="0712435687" aria-invalid={!!errors.phone} />
        </Field>
        <Field label="Discord ID" optional error={errors.discordID} htmlFor="reg-discord">
          <input id="reg-discord" type="text" value={formData.discordID} onChange={(e) => handleInputChange("discordID", e.target.value)} className={inputClass(errors.discordID)} placeholder="username" />
        </Field>
      </div>
    </div>
  );
}
