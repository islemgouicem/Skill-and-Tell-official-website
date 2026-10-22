import wilayas from "@/data/skillntell/wilayas.json";
import { useRegistration } from "@/lib/hooks/useRegistration";
import { Field, SelectField, StepHeader, inputClass } from "../components/Fields";

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Graduate"];

export default function AcademicInfo() {
  const { formData, handleInputChange, handleSelectChange, errors } = useRegistration();
  return (
    <div>
      <StepHeader icon="/icons/acad.svg" title="Academic Information" text="Where and what you study." />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="University" required error={errors.university} htmlFor="reg-university" className="sm:col-span-2">
          <input id="reg-university" type="text" value={formData.university} onChange={(e) => handleInputChange("university", e.target.value)} className={inputClass(errors.university)} placeholder="Your university name" aria-invalid={!!errors.university} />
        </Field>
        <Field label="Year of study" required error={errors.yearOfStudy} htmlFor="reg-year">
          <SelectField id="reg-year" placeholder="Select your year" options={YEARS} value={formData.yearOfStudy} onValueChange={(v) => handleSelectChange("yearOfStudy", v)} error={errors.yearOfStudy} />
        </Field>
        <Field label="Field of study" required error={errors.field} htmlFor="reg-field">
          <input id="reg-field" type="text" value={formData.field} onChange={(e) => handleInputChange("field", e.target.value)} className={inputClass(errors.field)} placeholder="Your field or major" aria-invalid={!!errors.field} />
        </Field>
        <Field label="University city" error={errors.university_location} htmlFor="reg-city" className="sm:col-span-2">
          <SelectField id="reg-city" placeholder="Select the wilaya of your university" options={wilayas} value={formData.university_location} onValueChange={(v) => handleSelectChange("university_location", v)} error={errors.university_location} />
        </Field>
      </div>
    </div>
  );
}
