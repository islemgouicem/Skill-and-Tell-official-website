import CyberInput from "../../components/CyberInput";
import CyberSwitch from "../../components/CyberSwitch";
import FormSectionTitle from "../../components/FormSectionTitle";
const PersonalInfoStep = ({ isTeamLeader, setIsTeamLeader, formData, setFormData, errors }) => {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (<div>
            <FormSectionTitle title="Personal Info"/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CyberInput label="Full Name" required placeholder="Enter your full name" value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} error={errors.fullName}/>

                <CyberInput label="Email" required type="email" placeholder="Enter your email" value={formData.email} onChange={e => handleChange("email", e.target.value)} error={errors.email}/>

                <CyberInput label="Phone Number" required placeholder="Enter your phone number" value={formData.phoneNumber} onChange={e => handleChange("phoneNumber", e.target.value)} error={errors.phoneNumber}/>

                <CyberInput label="Discord ID" required placeholder="Enter your discord id" value={formData.discordId} onChange={e => handleChange("discordId", e.target.value)} error={errors.discordId}/>
            </div>

            <div className="mt-6 mb-6">
                <CyberSwitch label="Are you a team leader or not ?" checked={isTeamLeader} onChange={setIsTeamLeader}/>
            </div>

            {isTeamLeader ? (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <CyberInput label="Team Name" required placeholder="Enter your team name" value={formData.teamName || ""} onChange={e => handleChange("teamName", e.target.value)} error={errors.teamName}/>
                    </div>
                </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <CyberInput label="Team Code" required placeholder="Enter your team code" value={formData.teamCode || ""} onChange={e => handleChange("teamCode", e.target.value)} error={errors.teamCode}/>
                    </div>
                </div>)}
        </div>);
};
export default PersonalInfoStep;
