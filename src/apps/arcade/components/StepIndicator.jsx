import { cn } from "@/lib/utils/utils";

const targetImage = "/images/arcade/target.png";

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-[760px] mx-auto py-6 sm:py-8">
      <div className="flex items-start justify-center">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isActiveOrCompleted = isActive || isCompleted;

          return (
            <div key={label} className="flex items-center">
              <div className="relative flex min-w-[110px] sm:min-w-[120px] flex-col items-center">
                {isActive && (
                  <>
                    <div
                      className="pointer-events-none absolute left-1/2 top-[-40px] h-[167px] w-[167px] -translate-x-1/2 rounded-full"
                      style={{
                        background: "rgba(255, 7, 7, 0.2)",
                        filter: "blur(50px)",
                      }}
                    />
                  </>
                )}

                <img
                  src={targetImage}
                  alt=""
                  className="relative z-10 h-[46px] w-[46px] sm:h-[84px] sm:w-[84px]"
                  style={{
                    opacity: isActiveOrCompleted ? 1 : 0.45,
                    filter: isActiveOrCompleted
                      ? "brightness(0) saturate(100%) invert(10%) sepia(100%) saturate(5600%) hue-rotate(356deg) brightness(92%) contrast(112%) drop-shadow(0 0 5px rgba(195, 18, 18, 0.5))"
                      : "none",
                  }}
                />

                <span
                  className={cn(
                    "mt-2 font-futura font-normal text-[16px] sm:text-[20px] leading-[1.3]",
                    isActiveOrCompleted ? "text-white" : "text-white/70"
                  )}
                >
                  {label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="relative mx-1 sm:mx-2 -mt-6 h-px w-[90px] sm:w-[166px]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActiveOrCompleted
                        ? "linear-gradient(90deg, rgba(255, 7, 7, 1) 0%, rgba(255, 72, 72, 0.6) 40%, rgba(255, 255, 255, 0.8) 100%)"
                        : "rgba(255, 255, 255, 0.72)",
                      boxShadow: isActiveOrCompleted ? "0px 0px 20px #FF0707" : "none",
                    }}
                  />
                  {isActiveOrCompleted && (
                    <div className="absolute -inset-y-[1px] inset-x-0 bg-red-700/25 blur-[1.5px]" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
