import CyberInput from "./CyberInput";
import CyberSelect from "./CyberSelect";
import FormSectionTitle from "./FormSectionTitle";
const RESPONSIBILITY_OPTIONS = [
    { value: "design", label: "Design" },
    { value: "mobile", label: "Mobile" },
    { value: "ai", label: "AI" }
];
const INTENT_OPTIONS = [
    { value: "learn", label: "Learn" },
    { value: "win", label: "Win" },
    { value: "fun", label: "Fun" },
    { value: "forced", label: "Forced" }
];
const YEAR_OPTIONS = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
];
const MemberCard = ({ memberIndex, member, errors, onChange, isLeader, icon, fieldIdPrefix }) => {
    const handleChange = (field, value) => {
        onChange(memberIndex, { ...member, [field]: value });
    };
    const id = (name) => (fieldIdPrefix ? `${fieldIdPrefix}-${name}` : undefined);
    return (<div className="space-y-4">
            <div className="flex items-center gap-3">
                <FormSectionTitle title={isLeader ? `Leader (Member 1)` : `Member ${memberIndex + 1}`} icon={icon}/>
                {/* {isLeader && (
            <span
                className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded"
                style={{
                    background: "linear-gradient(135deg, rgba(255,0,6,0.3), rgba(255,0,6,0.2))",
                    border: "1px solid rgba(255,0,6,0.6)",
                    color: "#ff6e6e"
                }}
            >
                Leader
            </span>
        )} */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CyberInput id={id("full_name")} label="Full Name" required placeholder="Full name" value={member.full_name ?? ""} onChange={e => handleChange("full_name", e.target.value)} error={errors?.full_name}/>
                <CyberInput id={id("school_or_uni")} label="School or University" required placeholder="School or University" value={member.school_or_uni ?? ""} onChange={e => handleChange("school_or_uni", e.target.value)} error={errors?.school_or_uni}/>
                <CyberInput id={id("field_of_study")} label="Field of Study" required placeholder="Field of study" value={member.field_of_study ?? ""} onChange={e => handleChange("field_of_study", e.target.value)} error={errors?.field_of_study}/>
                <CyberSelect id={id("year_of_study")} label="Year of Study" required placeholder="Select year" options={YEAR_OPTIONS} value={String(member.year_of_study ?? "")} onChange={e => handleChange("year_of_study", e.target.value ? parseInt(e.target.value, 10) : "")} error={errors?.year_of_study}/>
                <CyberInput id={id("phone_telegram")} label="Telegram Phone Number" required placeholder="e.g. +1234567890" value={member.phone_telegram ?? ""} onChange={e => handleChange("phone_telegram", e.target.value)} error={errors?.phone_telegram}/>
                <CyberInput id={id("email")} label="Email" required type="email" placeholder="email@example.com" value={member.email ?? ""} onChange={e => handleChange("email", e.target.value)} error={errors?.email}/>
                <CyberInput id={id("linkedin_url")} label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." value={member.linkedin_url ?? ""} onChange={e => handleChange("linkedin_url", e.target.value)} error={errors?.linkedin_url}/>
                <CyberInput id={id("github")} label="GitHub/portfolio link" required placeholder="https://github.com/username" value={member.github ?? ""} onChange={e => handleChange("github", e.target.value)} error={errors?.github}/>
                <CyberSelect id={id("responsibility")} label="Responsibility" required placeholder="Select responsibility" options={RESPONSIBILITY_OPTIONS} value={member.responsibility ?? ""} onChange={e => handleChange("responsibility", e.target.value)} error={errors?.responsibility}/>
                {isLeader && (<CyberSelect id={id("intent")} label="Intent" required placeholder="Select intent" options={INTENT_OPTIONS} value={member.intent ?? ""} onChange={e => handleChange("intent", e.target.value)} error={errors?.intent}/>)}
            </div>
        </div>);
};
export default MemberCard;
