import React from "react";
const CyberSwitch = ({ label, checked, onChange }) => {
    return (<div className="flex items-center gap-3">
            <span className="text-white text-sm">{label}</span>
            <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`
                            relative w-12 h-6 rounded-full transition-all duration-300
                            ${checked
            ? "bg-red-main-500 shadow-red-main-500"
            : "transparent border border-red-main-500"}
                        `}>
                <div className={`
            absolute top-1 w-4 h-4 rounded-full transition-all duration-300
            ${checked ? "left-7 bg-white" : "left-1 bg-red-main-500/80"}
          `}/>
            </button>
        </div>);
};
export default CyberSwitch;
