import CyberInput from "../../components/CyberInput";
import CyberSelect from "../../components/CyberSelect";
import FormSectionTitle from "../../components/FormSectionTitle";
const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5", label: "5th Year" },
    { value: "graduate", label: "Graduate" },
    { value: "postgraduate", label: "Post-Graduate" }
];
const EducationalInfoStep = ({ formData, setFormData, errors }) => {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (<div>
            <FormSectionTitle title="Educational Info"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CyberInput label="University name" required placeholder="Enter your university name" value={formData.universityName} onChange={e => handleChange("universityName", e.target.value)} error={errors.universityName}/>

                <CyberInput label="Field of Study" required placeholder="Enter your field of study" value={formData.fieldOfStudy} onChange={e => handleChange("fieldOfStudy", e.target.value)} error={errors.fieldOfStudy}/>

                <CyberSelect label="Year" required placeholder="Select your year of study" options={yearOptions} value={formData.year} onChange={e => handleChange("year", e.target.value)} error={errors.year}/>
            </div>
        </div>);
};
export default EducationalInfoStep;
