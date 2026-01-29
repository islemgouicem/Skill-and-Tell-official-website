import CyberInput from "../../components/CyberInput"
import FormSectionTitle from "../../components/FormSectionTitle"

const LevelAndSkillsStep = ({ formData, setFormData, errors }) => {
    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    return (
        <div>
            <FormSectionTitle title="Level and Skills" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CyberInput
                    label="Role in the team"
                    required
                    placeholder="Enter your role in the team"
                    value={formData.roleInTeam}
                    onChange={e => handleChange("roleInTeam", e.target.value)}
                    error={errors.roleInTeam}
                />

                <CyberInput
                    label="Year of Experience"
                    required
                    placeholder="Enter your year of experience"
                    value={formData.yearOfExperience}
                    onChange={e => handleChange("yearOfExperience", e.target.value)}
                    error={errors.yearOfExperience}
                />

                <CyberInput
                    label="Portfolio link (optional)"
                    placeholder="Enter your phone number"
                    value={formData.portfolioLink}
                    onChange={e => handleChange("portfolioLink", e.target.value)}
                />

                <CyberInput
                    label="Linkedin link (optional)"
                    placeholder="Enter your discord id"
                    value={formData.linkedinLink}
                    onChange={e => handleChange("linkedinLink", e.target.value)}
                />

                <CyberInput
                    label="Github link (optional)"
                    placeholder="Enter your phone number"
                    value={formData.githubLink}
                    onChange={e => handleChange("githubLink", e.target.value)}
                />
            </div>
        </div>
    )
}

export default LevelAndSkillsStep
