import React from 'react';

const ArcadeRadioToggle = ({ label, options, value, onChange, name, error }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="font-futura text-white font-medium" style={{ fontSize: "clamp(15px, 1.5vw, 20px)", lineHeight: "1.3" }}>
          {label}
        </label>
      )}
      <div
        className="relative z-10 flex items-center justify-between sm:justify-start sm:gap-6"
        style={{
          width: "clamp(240px, 100%, 300px)",
          minHeight: "61px",
          background: "rgba(255, 255, 255, 0.05)",
          border: error ? "2px solid rgba(255, 107, 107, 0.9)" : "1px solid rgba(255, 255, 255, 0.6)",
          borderRadius: "30px",
          padding: "10px 30px",
          boxShadow: error ? "0 0 0 1px rgba(255, 107, 107, 0.22)" : "none",
        }}
      >
        {options.map((option, index) => {
          const isSelected = value === option.value;
          // Determine the active color. The design uses #00C853 (green) typically for 'Yes' (first option)
          // and a transparent/grey outline for unselected. If it's a specific role toggle, it might use other logic,
          // but relying on truthy checks aligns with the provided example.
          // For simplicity, let's use the provided design's logic from StepMotivation:
          const activeColor = index === 0 ? "#00C853" : "transparent";

          // If the toggle is Yes/No type and the value is specifically false, use red for "No"
          const resolvedActiveColor = isSelected ? (option.label === 'No' ? '#FF0707' : activeColor) : "transparent";

          return (
            <label key={`${name}-${option.value}`} className="flex items-center gap-2 cursor-pointer font-futura text-white" style={{ fontSize: "16px" }}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className="flex-shrink-0 transition-colors duration-200"
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.9)",
                  background: isSelected ? (option.label === 'No' ? '#FF0707' : '#00C853') : "transparent",
                }}
              />
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

export default ArcadeRadioToggle;
