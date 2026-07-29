import { cn } from "@/lib/utils/utils";

const ArcadeInput = ({ label, className, error, required = true, ...props }) => {
  return (
    <div className="arcade-field-container flex flex-col gap-3 w-full">
      <style>{`
        @media (max-width: 767px) {
          .arcade-registration-page .arcade-form-label {
            font-size: 15px !important;
            line-height: 1.25 !important;
          }

          .arcade-registration-page .arcade-form-input,
          .arcade-registration-page .arcade-form-textarea,
          .arcade-registration-page .arcade-form-select-trigger {
            font-size: 15px !important;
            line-height: 1.35 !important;
          }
        }
      `}</style>
      <label
        className="arcade-form-label font-futura text-white font-medium"
        style={{ fontSize: "clamp(13px, 1.2vw, 17px)", lineHeight: "1.25" }}
      >
        {label}
        {required && <span style={{ color: "#FF6E6E" }}> *</span>}
      </label>
      <input
        aria-invalid={Boolean(error)}
        className={cn(
          "arcade-form-input w-full font-futura transition-colors focus:outline-none placeholder:text-white/70",
          className
        )}
        style={{
          padding: "11px clamp(18px, 2.2vw, 27px)",
          background: "rgba(255, 255, 255, 0.05)",
          border: error ? "2px solid rgba(255, 107, 107, 0.9)" : "2px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "25px",
          fontSize: "clamp(15px, 1.6vw, 18px)",
          lineHeight: "23px",
          color: "#FFFFFF",
          boxShadow: error ? "0 0 0 1px rgba(255, 107, 107, 0.22)" : "none",
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

export default ArcadeInput;
