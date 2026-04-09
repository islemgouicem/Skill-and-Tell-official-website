import { cn } from "@/lib/utils/utils";

const ArcadeTextarea = ({ label, className, textareaStyle, error, ...props }) => {
  return (
    <div className="arcade-field-container flex flex-col gap-3 w-full">
      <label
        className="arcade-form-label font-futura text-white font-medium"
        style={{ fontSize: "clamp(15px, 1.8vw, 24px)", lineHeight: "1.3" }}
      >
        {label}
      </label>
      <textarea
        aria-invalid={Boolean(error)}
        className={cn(
          "arcade-form-textarea w-full font-futura transition-colors focus:outline-none resize-none placeholder:text-white/70",
          className
        )}
        style={{
          padding: "16px clamp(18px, 2.2vw, 27px)",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "25px",
          fontSize: "clamp(15px, 1.6vw, 18px)",
          lineHeight: "23px",
          color: "#FFFFFF",
          minHeight: "140px",
          ...textareaStyle,
          border: error ? "2px solid rgba(255, 107, 107, 0.9)" : (textareaStyle?.border ?? "2px solid rgba(255, 255, 255, 0.4)"),
          boxShadow: error ? "0 0 0 1px rgba(255, 107, 107, 0.22)" : (textareaStyle?.boxShadow ?? "none"),
        }}
        {...props}
      />
      {error && (
        <p className="font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ArcadeTextarea;
