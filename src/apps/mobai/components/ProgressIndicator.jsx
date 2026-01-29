import React from "react"

const ProgressIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: totalSteps }, (_, index) => (
                <React.Fragment key={index}>
                    <div
                        className={`
                                    w-3 h-3 rounded-full border-2 transition-all duration-300
                                    ${index < currentStep
                                        ? "bg-red-main-500 border-red-main-500 shadow-red-main-500"
                                        : index === currentStep
                                            ? "bg-red-main-500 border-red-main-500 shadow-red-main-500 scale-125"
                                            : "bg-transparent border-red-main-500/50"
                                    }
                                `}
                        style={{
                            boxShadow:
                                index <= currentStep
                                    ? "0 0 12px hsl(345 100% 50% / 0.8)"
                                    : "none"
                        }}
                    />
                    {index < totalSteps - 1 && (
                        <div
                            className={`
                                        w-16 h-[2px] transition-all duration-300
                                        ${index < currentStep ? "bg-red-main-500" : "bg-red-main-500/30"}
                                    `}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default ProgressIndicator
