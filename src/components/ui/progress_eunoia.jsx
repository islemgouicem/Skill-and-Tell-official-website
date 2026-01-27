import { cn } from "../../lib/utils/utils"

const ProgressStepper = ({ currentStep, steps }) => {
    const getStepStatus = index => {
        if (index < currentStep - 1) return "complete"
        if (index === currentStep - 1) return "active"
        return "inactive"
    }

    const processedSteps = steps.map((step, index) => ({
        id: index + 1,
        label: step.label,
        status: getStepStatus(index)
    }))

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="relative flex items-center justify-between w-full">

                {processedSteps.map((step, index) => (
                    <div
                        key={step.id}
                        className={cn(
                            "flex items-center",
                            // FIX: only steps BEFORE last get flex-1
                            index < processedSteps.length - 1 ? "flex-1" : "flex-none"
                        )}
                    >
                        {/* Vertical Column */}
                        <div className="flex flex-col items-center">

                            {/* Circle */}
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold transition-all duration-300 text-gold",
                                    {
                                        "progress_circle":
                                            step.status === "complete" || step.status === "active",
                                        "bg-transparent border-2 border-gold":
                                            step.status === "inactive"
                                    }
                                )}
                            >
                                {step.id}
                            </div>

                            {/* Label */}
                            <span
                                className={cn(
                                    "mt-2 text-sm font-medium text-center transition-colors duration-300",
                                    {
                                        "text-gold":
                                            step.status === "complete" || step.status === "active",
                                        "text-white": step.status === "inactive"
                                    }
                                )}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Line between circles */}
                        {index < processedSteps.length - 1 && (
                            <div className="flex-1 h-[3px] bg-gold/40 mx-4" />
                        )}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default ProgressStepper
