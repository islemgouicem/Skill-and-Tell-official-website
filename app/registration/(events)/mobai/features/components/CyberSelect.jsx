import { ChevronDown } from "lucide-react";
const CyberSelect = ({ label, required = false, error, options, placeholder = "Select...", className = "", ...props }) => {
    return (<div className="flex flex-col gap-1">
            <label className="text-white text-sm font-medium">
                {label}
                {required && <span className="text-red-main-500"> *</span>}
            </label>
            <div className="relative">
                <select className={`
                        w-full px-4 py-2.5 rounded-sm appearance-none
                        bg-transparent border border-red-main-500
                        text-white
                        focus:outline-none focus:shadow-red-main-500
                        transition-all duration-300
                        cursor-pointer
                        ${className}
                    `} style={{
            boxShadow: "inset 0 0 10px hsl(345 100% 50% / 0.1)"
        }} {...props}>
                    <option value="" className="bg-[hsl(280,50%,15%)] text-white">
                        {placeholder}
                    </option>
                    {options.map(option => (<option key={option.value} value={option.value} className="bg-[hsl(280,50%,15%)] text-white">
                            {option.label}
                        </option>))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-main-500 pointer-events-none"/>
            </div>
            {error && (<span className="text-error text-xs mt-1">* {error}</span>)}
        </div>);
};
export default CyberSelect;
