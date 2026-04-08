import React from 'react';
import { Check } from "lucide-react";

const ArcadeCheckboxGroup = ({ label, options, selected, onChange, error }) => {
  const toggleSelection = (value) => {
    let newSelected = [...selected];
    if (newSelected.includes(value)) {
      newSelected = newSelected.filter(v => v !== value);
    } else {
      newSelected.push(value);
    }
    onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="font-futura text-white font-medium" style={{ fontSize: "clamp(15px, 1.5vw, 20px)", lineHeight: "1.3" }}>
          {label}
        </label>
      )}
      <div
        className="relative z-10 flex flex-wrap items-center justify-start gap-4 sm:gap-6"
        style={{
          width: "100%",
          minHeight: "61px",
          background: "rgba(255, 255, 255, 0.05)",
          border: error ? "2px solid rgba(255, 107, 107, 0.9)" : "1px solid rgba(255, 255, 255, 0.6)",
          borderRadius: "30px",
          padding: "10px 30px",
          boxShadow: error ? "0 0 0 1px rgba(255, 107, 107, 0.22)" : "none",
        }}
      >
        {options.map((option) => {
          const isSelected = selected.includes(option.value);

          return (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer font-futura text-white" style={{ fontSize: "16px" }}>
              <input
                type="checkbox"
                value={option.value}
                checked={isSelected}
                onChange={() => toggleSelection(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className="flex-shrink-0 flex items-center justify-center transition-colors duration-200"
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "2px",
                  border: "1px solid rgba(255, 255, 255, 0.6)", // Faded white outline when not checked
                  background: isSelected ? 'transparent' : "transparent",
                  borderColor: isSelected ? '#00C853' : 'rgba(255, 255, 255, 0.6)' // Green outline when checked
                }}
              >
                 {isSelected && <Check className="w-3 h-3 text-[#00C853]" strokeWidth={3} />}
              </span>
              {option.label}
            </label>
          )
        })}
      </div>
      {error && (
        <p className="font-futura text-sm text-[#ff9b9b]" style={{ lineHeight: 1.2 }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ArcadeCheckboxGroup;
