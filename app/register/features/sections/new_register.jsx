import DepartmentInfo from "./dep_info";
import Motivations from "./motivations";
import AcademicInfo from "./academic_info";
import PersonalInofo from "./personal_info";
import { useRegistration } from "@/lib/hooks/useRegistration";
import StepNav from "../components/StepNav";

export default function NotRegistered() {
  const { currentStep, nextStep, totalSteps } = useRegistration();
  return (
    // Enter moves to the next step; the last step only submits through its button.
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep < totalSteps) nextStep();
      }}
    >
      <div key={currentStep} className="reg-step">
        {currentStep == 1 && <PersonalInofo />}
        {currentStep == 2 && <AcademicInfo />}
        {currentStep == 3 && <DepartmentInfo />}
        {currentStep == 4 && <Motivations />}
      </div>
      <StepNav />
    </form>
  );
}
