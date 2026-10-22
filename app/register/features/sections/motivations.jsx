import { useRegistration } from "@/lib/hooks/useRegistration";
import { Field, StepHeader, inputClass } from "../components/Fields";

export default function Motivations() {
  const { formData, handleInputChange, errors } = useRegistration();
  return (
    <div>
      <StepHeader icon="/icons/motivation.svg" title="Club Experience" text="Last step! Tell us about clubs, organizations or communities you've been part of." />
      <Field label="Your experience" optional error={errors.club_experience} htmlFor="reg-exp">
        <textarea
          id="reg-exp"
          rows={5}
          value={formData.club_experience}
          onChange={(e) => {
            handleInputChange("club_experience", e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          className={`${inputClass(errors.club_experience)} min-h-[150px] resize-none leading-relaxed`}
          placeholder="E.g. member of a robotics club, volunteer at an event, organizer of a workshop… or nothing yet, that's fine too!"
        />
      </Field>
    </div>
  );
}
