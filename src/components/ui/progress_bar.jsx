import StepCircle from "./step_circle";

const ProgressBar = ({ currentStep, totalSteps, stepLabels }) => {
    return (
        <div className="max-w-5xl mx-auto py-6 relative">

            {/* Horizontal line that runs behind the circles */}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-5">
                {Array.from({ length: totalSteps - 1 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 h-[2px] mx-1"
                        style={{
                            background:
                                i < currentStep - 1
                                    ? "linear-gradient(90deg, #FF6D00, #7B2CBF)"
                                    : "rgba(255,255,255,0.2)",
                        }}
                    ></div>
                ))}
            </div>

            {/* Circles */}
            <div className="relative z-10 flex justify-between px-5">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <StepCircle
                        key={i}
                        stepNumber={i + 1}
                        label={stepLabels[i]}
                        isActive={currentStep === i + 1}
                        isCompleted={currentStep > i + 1}
                    />
                ))}
            </div>

        </div>
    );
};

export default ProgressBar;
