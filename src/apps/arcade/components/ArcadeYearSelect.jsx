import { cn } from "@/lib/utils/utils";
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const YEAR_OPTIONS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
];

const ArcadeYearSelect = ({
  label,
  value,
  onValueChange,
  error,
  required = true,
  placeholder = "Select year",
  className,
  options = YEAR_OPTIONS,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={cn("arcade-field-container flex w-full flex-col gap-3", className)}>
      <label
        className="arcade-form-label font-futura text-white font-medium"
        style={{ fontSize: "clamp(13px, 1.2vw, 17px)", lineHeight: "1.25" }}
      >
        {label}
        {required && <span style={{ color: "#FF6E6E" }}> *</span>}
      </label>

      <Select.Root value={value} onValueChange={onValueChange}>
        <Select.Trigger
          aria-label={label}
          aria-invalid={Boolean(error)}
          className="arcade-form-select-trigger group relative inline-flex w-full items-center justify-between gap-3 font-futura transition-colors focus:outline-none"
          style={{
            padding: "11px clamp(18px, 2.2vw, 27px)",
            background: "rgba(255, 255, 255, 0.05)",
            border: error ? "2px solid rgba(255, 107, 107, 0.9)" : "2px solid rgba(255, 255, 255, 0.4)",
            borderRadius: "25px",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            lineHeight: "23px",
            color: value ? "#FFFFFF" : "#B3B3B3",
            boxShadow: error ? "0 0 0 1px rgba(255, 107, 107, 0.22)" : "none",
          }}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="text-white/80 transition-transform duration-200 group-data-[state=open]:rotate-180">
            <ChevronDown className="h-5 w-5" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            align="start"
            sideOffset={isMobile ? 8 : 10}
            avoidCollisions={!isMobile}
            collisionPadding={isMobile ? 0 : 10}
            className="z-[9999] overflow-hidden rounded-[24px] border border-white/20 bg-[#140404] shadow-[0_0_32px_rgba(255,7,7,0.22)] backdrop-blur-xl"
            style={{ width: "var(--radix-select-trigger-width)", minWidth: "var(--radix-select-trigger-width)" }}
          >
            <Select.ScrollUpButton className="flex items-center justify-center py-2 text-white/80">
              <ChevronUp className="h-4 w-4" />
            </Select.ScrollUpButton>

            <Select.Viewport className="p-2">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-pointer select-none items-center rounded-[16px] px-4 py-3 pr-10 font-futura text-[15px] text-white/90 outline-none transition-colors data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-4 inline-flex items-center justify-center text-[#ff7070]">
                    <Check className="h-4 w-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center py-2 text-white/80">
              <ChevronDown className="h-4 w-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      {error && (
        <p className="font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ArcadeYearSelect;