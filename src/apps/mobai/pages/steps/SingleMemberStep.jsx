import { User, UserCircle, UserSquare, UserCheck, UserCog } from "lucide-react"
import MemberCard from "../../components/MemberCard"

const MEMBER_ICONS = [User, UserCircle, UserSquare, UserCheck, UserCog]

const SingleMemberStep = ({ memberIndex, members, setMembers, errors }) => {
    const handleMemberChange = (_index, updated) => {
        const next = [...members]
        next[memberIndex] = { ...updated, is_leader: false }
        setMembers(next)
    }

    const icon = MEMBER_ICONS[memberIndex - 1]
    return (
        <MemberCard
            memberIndex={memberIndex}
            member={members[memberIndex] ?? {}}
            errors={errors?.members?.[memberIndex]}
            onChange={handleMemberChange}
            isLeader={false}
            icon={icon}
            fieldIdPrefix={`mobai-member-${memberIndex}`}
        />
    )
}

export default SingleMemberStep
