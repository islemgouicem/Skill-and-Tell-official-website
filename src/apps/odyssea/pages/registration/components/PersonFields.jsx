import React from "react";
import { User } from "lucide-react";
import Field from "./Field";
import { PERSON_FIELDS, personErrorKey } from "../config";
import Display from "../../../components/Display";

function PersonFields({ title, scope, person, errors, onChange, autoFocus = false }) {
  return (
    <div>
      <h2 className="ody-display flex items-center gap-2.5 text-[1.15rem] tracking-[0.1em] text-ody-ink sm:text-[1.3rem]">
        <User className="h-5 w-5 text-ody-gold-deep" />
        <Display>{title}</Display>
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
