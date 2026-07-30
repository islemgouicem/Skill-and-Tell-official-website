import { MessageCircleQuestion } from "lucide-react";
import CyberSelect from "../../components/CyberSelect";
import CyberTextarea from "../../components/CyberTextArea";
import FormSectionTitle from "../../components/FormSectionTitle";
const WORKED_TOGETHER_OPTIONS = [
    { value: "yes", label: "Yes" },
    { value: "some", label: "Some" },
    { value: "never", label: "Never" }
];
const TeamQuestionsStep = ({ formData, setFormData, errors }) => {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (<div className="space-y-6">
            <FormSectionTitle title="Team questions" icon={MessageCircleQuestion}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CyberSelect id="mobai-worked_together_before" label="Worked together before" required placeholder="Select" options={WORKED_TOGETHER_OPTIONS} value={formData.worked_together_before ?? ""} onChange={e => handleChange("worked_together_before", e.target.value)} error={errors?.worked_together_before}/>
            </div>
            <CyberTextarea id="mobai-team_quality_opinion" label="Team quality" required placeholder="In your opinion, how can a team be good enough to come up with valuable solutions?" value={formData.team_quality_opinion ?? ""} onChange={e => handleChange("team_quality_opinion", e.target.value)} error={errors?.team_quality_opinion} rows={4}/>
            <CyberTextarea id="mobai-prize_not_wanted" label="A prize you don't want?" required placeholder="what are the prizes that you wouldn't like" value={formData.prize_not_wanted ?? ""} onChange={e => handleChange("prize_not_wanted", e.target.value)} error={errors?.prize_not_wanted} rows={4}/>
        </div>);
};
export default TeamQuestionsStep;
