import { cn } from "@/lib/utils/utils";

const ArcadeInput = ({ label, className, ...props }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label
        className="font-futura text-white font-medium"
        style={{ fontSize: "clamp(15px, 1.5vw, 20px)", lineHeight: "1.3" }}
      >
        {label}
      </label>
      <input
        className={cn(
          "w-full font-futura transition-colors focus:outline-none",
          className
        )}
        style={{
          padding: "11px clamp(18px, 2.2vw, 27px)",
          background: "rgba(255, 255, 255, 0.05)",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "25px",
          fontSize: "clamp(15px, 1.6vw, 18px)",
          lineHeight: "23px",
          color: "#B3B3B3",
        }}
        {...props}
      />
    </div>
  );
};

export default ArcadeInput;
