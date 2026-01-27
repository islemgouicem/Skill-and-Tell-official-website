import DepartmentInfo from "./dep_info"
import Motivations from "./motivations"
import AcademicInfo from "./academic_info"
import PersonalInofo from "./personal_info"
import { useRegistration } from "../../../../lib/hooks/useRegistration";
import FormNavigation from "../../../../components/ui/form_navigation"


export default function NotRegistered() {
    const { currentStep } = useRegistration();
    return (
        <>
            {currentStep == 1 && (<PersonalInofo />)}
            {currentStep == 2 && (<AcademicInfo />)}
            {currentStep == 3 && (<DepartmentInfo />)}
            {currentStep == 4 && (<Motivations />)}
            <FormNavigation
                submitForm={() => { }}
            />

        </>

    )
}