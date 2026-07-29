import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

const CyberButton = ({
    variant = "primary",
    icon = "none",
    children,
    className = "",
    ...props
}) => {
    const showLoader = icon === "loader"
    if (variant === "outline") {
        return (
            <button
                className={`
                    relative inline-flex items-center px-6 py-2.5
                    text-red-main-500 font-semibold text-sm
                    transition-all duration-300
                    hover:drop-shadow-[0_0_8px_#ff0006aa]
                    ${className}
                `}
                style={{
                    background: "linear-gradient(#380049, #380049) padding-box, linear-gradient(135deg, transparent, #ff0006, transparent) border-box",
                    border: "1.5px solid transparent",
                    borderRadius: "4px"
                }}
                {...props}
            >
                {icon === "left" && !showLoader && <ArrowLeft className="w-4 h-4 mr-2" />}
                {showLoader ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {children}
                {icon === "right" && !showLoader && <ArrowRight className="w-4 h-4" />}
            </button>
        )
    }

    return (
        <button
            className={`
                flex items-center gap-2 px-6 py-2.5 rounded-[3px]
                text-white font-semibold text-sm uppercase tracking-wide
                transition-all duration-300
                hover:drop-shadow-[0_0_8px_#ff0006aa]
                bg-gradient-to-b from-red-600/60 to-red-600 shadow-[0px_10px_45px_0px_rgba(255,0,6,0.50)] 
                outline-1 outline-offset-[-1px] outline-white/60
                ${className}
            `}
            style={{
                boxShadow: "0 0 15px hsl(345 100% 50% / 0.4)"
            }}
            {...props}
        >
            {icon === "left" && !showLoader && <ArrowLeft className="w-4 h-4" />}
            {showLoader ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {children}
            {icon === "right" && !showLoader && <ArrowRight className="w-4 h-4" />}
        </button>
    )
}

export default CyberButton
