import React from "react"

const CyberInput = ({
    label,
    required = false,
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">
                {label}
                {required && <span className="text-red-main-500"> *</span>}
            </label>
            <input
                className={`
                    w-full p-[12px] pl-[20px] rounded-[3px]
                    bg-transparent border border-red-main-500
                    text-white placeholder-white/50
                    focus:outline-none focus:shadow-red-main-500
                    transition-all duration-300
                    ${className}
                `}
                style={{
                    boxShadow: "inset 0 0 10px hsl(345 100% 50% / 0.1)"
                }}
                {...props}
            />
            {error && (
                <span className="text-[#FF6E6E] text-xs mt-1">* {error}</span>
            )}
        </div>
    )
}

export default CyberInput
