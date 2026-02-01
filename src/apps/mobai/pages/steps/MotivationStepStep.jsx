import CyberSelect from "../../components/CyberSelect"
import CyberTextarea from "../../components/CyberTextArea"
import CyberSwitch from "../../components/CyberSwitch"
import FormSectionTitle from "../../components/FormSectionTitle"

const howDidYouHearOptions = [
    { value: "social_media", label: "Social Media" },
    { value: "friend", label: "Friend/Colleague" },
    { value: "university", label: "University" },
    { value: "website", label: "Website" },
    { value: "event", label: "Previous Event" },
    { value: "other", label: "Other" }
]

const MotivationStep = ({ formData, setFormData, errors }) => {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <div>
            <FormSectionTitle title="Motivation" />

            <div className="flex flex-col gap-6">
                <CyberSelect
                    label="How did you hear about MobAI"
                    required
                    placeholder="Select"
                    options={howDidYouHearOptions}
                    value={formData.howDidYouHear}
                    onChange={e => handleChange("howDidYouHear", e.target.value)}
                    error={errors.howDidYouHear}
                />

                <CyberTextarea
                    label="Motivation to Participate"
                    required
                    placeholder="Enter your motivation"
                    value={formData.motivation}
                    onChange={e => handleChange("motivation", e.target.value)}
                    error={errors.motivation}
                />

                <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">
                        I consent to the use of photos/videos taking during the event for
                        promotional purposes
                    </span>
                    <CyberSwitch
                        label=""
                        checked={formData.consentPhotos}
                        onChange={checked => handleChange("consentPhotos", checked)}
                    />
                </div>
            </div>
        </div>
    )
}

export default MotivationStep
