import { ShieldCheck } from "lucide-react"
import FormSectionTitle from "./FormSectionTitle"

const RESPONSIBILITIES = [
    { id: "design", label: "Design" },
    { id: "mobile", label: "Mobile" },
    { id: "ai", label: "AI" }
]

const ResponsibilityEnforcement = ({ members }) => {
    const assigned = members
        .map(m => m.responsibility)
        .filter(Boolean)
    const covered = {
        design: assigned.filter(r => r === "design").length,
        mobile: assigned.filter(r => r === "mobile").length,
        ai: assigned.filter(r => r === "ai").length
    }
    const allCovered = covered.design >= 1 && covered.mobile >= 1 && covered.ai >= 1
    const totalMembers = members.length
    const hasSixMembers = totalMembers === 6

    return (
        <div className="mt-6 pt-6 border-t border-red-main-500/30">
            <FormSectionTitle title="Responsibility check" icon={ShieldCheck} />
            <p className="text-gray-300 text-sm mb-3">
                All three responsibilities must be assigned at least once across your 6 members.
            </p>
            <div className="flex flex-wrap gap-4">
                {RESPONSIBILITIES.map(({ id, label }) => {
                    const count = covered[id] ?? 0
                    const ok = count >= 1
                    return (
                        <div
                            key={id}
                            className={`
                                px-4 py-2 rounded border text-sm font-medium
                                ${ok
                                    ? "border-green-500/60 text-green-400 bg-green-500/10"
                                    : "border-red-main-500/60 text-red-main-500 bg-red-main-500/10"
                                }
                            `}
                        >
                            {label}: {count} {count === 1 ? "member" : "members"}
                            {!ok && " (required)"}
                        </div>
                    )
                })}
            </div>
            {!hasSixMembers && (
                <p className="text-red-main-500 text-xs mt-2">
                    * You must have exactly 6 team members.
                </p>
            )}
            {!allCovered && hasSixMembers && (
                <p className="text-red-main-500 text-xs mt-2">
                    * Assign at least one member to Design, one to Mobile, and one to AI to proceed.
                </p>
            )}
        </div>
    )
}

export default ResponsibilityEnforcement
export { RESPONSIBILITIES }
