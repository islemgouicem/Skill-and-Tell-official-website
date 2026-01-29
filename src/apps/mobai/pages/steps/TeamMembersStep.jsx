import { User, UserCircle, UserSquare, UserCheck, UserCog } from "lucide-react"
import MemberCard from "../../components/MemberCard"
import ResponsibilityEnforcement from "../../components/ResponsibilityEnforcement"
import CyberCard from "../../components/cyberCard"

const MEMBER_ICONS = [User, UserCircle, UserSquare, UserCheck, UserCog]

const TeamMembersStep = ({ members, setMembers, errors }) => {
    const handleMemberChange = (index, updated) => {
        const next = [...members]
        next[index] = { ...updated, is_leader: false }
        setMembers(next)
    }

    return (
        <div className="space-y-8">
            <ResponsibilityEnforcement members={members} />
            {[1, 2, 3, 4, 5].map((i, idx) => (
                <CyberCard key={i}>
                    <MemberCard
                        memberIndex={i}
                        member={members[i] ?? {}}
                        errors={errors?.members?.[i]}
                        onChange={handleMemberChange}
                        isLeader={false}
                        icon={MEMBER_ICONS[idx]}
                    />
                </CyberCard>
            ))}
        </div>
    )
}

export default TeamMembersStep
