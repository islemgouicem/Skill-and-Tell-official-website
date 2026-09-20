import React from "react";
import {
  BookOpen,
  Building2,
  CalendarDays,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  User,
} from "lucide-react";

const ICONS = {
  user: User,
  mail: Mail,
  building: Building2,
  linkedin: Linkedin,
  phone: Phone,
  github: Github,
  calendar: CalendarDays,
  book: BookOpen,
};

function Field({ field, value, error, onChange, autoFocus = false }) {
  const Icon = ICONS[field.icon] ?? User;
  const id = `${field.scope}-${field.name}`;
  const invalid = Boolean(error);

  return (
    <label htmlFor={id} className="block">
      <span className="flex items-center gap-2 text-[0.82rem] font-semibold text-ody-ink">
        <Icon className="h-4 w-4 shrink-0 text-ody-gold-deep" />
        {field.label}
        {field.required && <span className="text-ody-danger">*</span>}
      </span>

      {field.type === "select" ? (
        <span className="relative block">
          <select
            id={id}
            name={id}
            value={value}
            aria-invalid={invalid}
            aria-describedby={invalid ? `${id}-error` : undefined}
            onChange={(event) => onChange(field.name, event.target.value)}
            className={`ody-input appearance-none pr-7 ${value ? "" : "text-ody-ink/38"}`}
          >
            <option value="">{field.placeholder}</option>
            {field.options.map((option) => (
              <option key={option} value={option} className="text-ody-ink">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute bottom-2.5 right-1 h-4 w-4 text-ody-gold-deep" />
        </span>
      ) : (
        <input
          id={id}
          name={id}
          type={field.type}
          inputMode={field.type === "tel" ? "tel" : undefined}
          autoComplete="off"
          autoFocus={autoFocus}
          maxLength={field.max}
          placeholder={field.placeholder}
          value={value}
          aria-invalid={invalid}
          aria-describedby={invalid ? `${id}-error` : undefined}
          onChange={(event) => onChange(field.name, event.target.value)}
          className="ody-input"
        />
      )}

      <span
        id={`${id}-error`}
        role={invalid ? "alert" : undefined}
        className={`block overflow-hidden text-[0.72rem] font-medium text-ody-danger transition-all duration-300 ${
          invalid ? "mt-1.5 max-h-8 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {error}
      </span>
    </label>
  );
}

export default React.memo(Field);
