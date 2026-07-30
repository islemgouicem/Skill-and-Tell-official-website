const StepCircle = ({ stepNumber, label, isActive, isCompleted }) => {
    return (<div className="flex items-center gap-3">
            {/* Circle */}
            <div className={`
                    w-10 h-10 flex items-center justify-center rounded-full border
                    transition-all duration-300 text-white
                    ${isCompleted ? "bg-gradient-to-br from-[#FF6D00] to-[#7B2CBF] border-transparent" : ""}
                    ${isActive ? "border-[#FF6D00]" : "border-[#7B2CBF]"}
                `}>
                {stepNumber}
            </div>

            {/* Label */}
            <span className="text-white/80 text-sm">{label}</span>
        </div>);
};
export default StepCircle;
