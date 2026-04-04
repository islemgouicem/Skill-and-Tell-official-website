import { cn } from "@/lib/utils/utils";

const ArcadeTextarea = ({ label, className, textareaStyle, ...props }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label
        className="font-futura text-white font-medium"
        style={{ fontSize: "clamp(16px, 2.5vw, 24px)", lineHeight: "1.3" }}
      >
        {label}
      </label>
      <textarea
        className={cn(
          "w-full font-futura transition-colors focus:outline-none resize-none",
          className
        )}
        style={{
          padding: "16px 27px",
          background: "rgba(255, 255, 255, 0.05)",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "25px",
          fontSize: "clamp(14px, 2vw, 18px)",
          lineHeight: "23px",
          color: "#B3B3B3",
          minHeight: "140px",
          ...textareaStyle,
        }}
        {...props}
      />
    </div>
  );
};

export default ArcadeTextarea;
