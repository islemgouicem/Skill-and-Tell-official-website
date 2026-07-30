import { Users, Crown } from "lucide-react";
import CyberInput from "../../components/CyberInput";
import FormSectionTitle from "../../components/FormSectionTitle";
import MemberCard from "../../components/MemberCard";
const TeamNameAndLeaderStep = ({ teamName, setTeamName, members, setMembers, errors }) => {
    const leader = members[0] ?? {};
    const leaderErrors = errors?.members?.[0];
    const handleLeaderChange = (_index, updated) => {
        const next = [...members];
        next[0] = { ...updated, is_leader: true };
        setMembers(next);
    };
    return (<div className="space-y-6">
            <FormSectionTitle title="Team name & leader" icon={Users}/>
            <div className="max-w-md">
                <CyberInput id="mobai-team_name" label="Team Name" required placeholder="Min 3, max 100 characters" value={teamName} onChange={e => setTeamName(e.target.value)} error={errors?.team_name}/>
            </div>
            <MemberCard memberIndex={0} member={leader} errors={leaderErrors} onChange={handleLeaderChange} isLeader icon={Crown} fieldIdPrefix="mobai-member-0"/>
        </div>);
};
export default TeamNameAndLeaderStep;
