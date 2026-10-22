import { useRegistration } from "@/lib/hooks/useRegistration";
import { Field, FieldError, SelectField, StepHeader } from "../components/Fields";

// Values stored in the database are kept exactly as before.
const DEPARTMENTS = [
  "Design Department",
  "Events Department",
  "IT Department",
  "Marketing Department",
  "Relex Department",
  "Human Resources Department",
];

const PRIORITIES = [
  { key: "dep1", label: "Priority 1 (First choice)", placeholder: "Select your first choice" },
  { key: "dep2", label: "Priority 2 (Second choice)", placeholder: "Select your second choice" },
  { key: "dep3", label: "Priority 3 (Third choice)", placeholder: "Select your third choice" },
];

export default function DepartmentInfo() {
  const { formData, handleSelectChange, errors } = useRegistration();
  return (
    <div>
      <StepHeader icon="/icons/department.svg" title="Department Preferences" text="Pick your top 3 departments by priority. Choose wisely: your first choice is your preferred department." />
      <div className="grid gap-6 md:grid-cols-2">
        {PRIORITIES.map((p, i) => (
          <Field key={p.key} label={p.label} required error={errors[p.key]} htmlFor={`reg-${p.key}`} className={i === 0 ? "md:col-span-2" : ""}>
            <SelectField
              id={`reg-${p.key}`}
              placeholder={p.placeholder}
              options={DEPARTMENTS}
              value={formData[p.key]}
              onValueChange={(v) => handleSelectChange(p.key, v)}
              error={errors[p.key] || errors.similar}
            />
          </Field>
        ))}
      </div>
      <FieldError>{errors.similar}</FieldError>
    </div>
  );
}
