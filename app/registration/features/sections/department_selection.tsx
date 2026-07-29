import DepartmentInfo from "./dep_info"
import Motivations from "./motivations"
import FormNavigation from "../../../../components/ui/form_navigation"
import { useRegistration } from "../../../../lib/hooks/useRegistration";

export default function Registered() {
    const { currentStep } = useRegistration();

    return (
        <>
            {currentStep == 1 && (<DepartmentInfo />)}
            {currentStep == 2 && (<Motivations />)}
            <FormNavigation
                submitForm={() => { }}
            />
        </>

    )
}