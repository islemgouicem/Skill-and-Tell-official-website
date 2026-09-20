import React from "react";
import { User } from "lucide-react";
import Field from "./Field";
import { PERSON_FIELDS, personErrorKey } from "../config";

function PersonFields({ title, scope, person, errors, onChange, autoFocus = false }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-ody-ink">
        <User className="h-4 w-4 text-ody-gold-deep" />
        {title}
      </h2>

      <div className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
        {PERSON_FIELDS.map((field, index) => (
          <Field
            key={field.name}
            field={{ ...field, scope }}
            value={person[field.name] ?? ""}
            error={errors[personErrorKey(scope, field.name)]}
            onChange={(name, value) => onChange(scope, name, value)}
            autoFocus={autoFocus && index === 0}
          />
        ))}
      </div>
    </div>
  );
}

export default React.memo(PersonFields);
