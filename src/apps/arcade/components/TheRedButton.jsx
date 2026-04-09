import { useNavigate } from "react-router-dom";


export default function RedButton({ textContent, pageName, className = "", textClassName = "" }) {
    const navigate = useNavigate();

    return (
        <div className={`relative flex items-center justify-center ${className}`.trim()} >
            {/* The image defines the size of the container */}
            <img src="/images/arcade/Red_button.png" alt="Button Background" className="block" />

            {/* The link is positioned absolutely and centered via flex alignment */}
            <a
                onClick={() => { navigate(pageName) }}
                className={`hover:text-[#BFCBC5] absolute inset-0 flex items-center justify-center font-compacta text-4xl font-normal leading-none tracking-[0.06em] text-[#330001] drop-shadow-[3px_1px_10.8px_rgba(255,255,255,0.54)] whitespace-nowrap ${textClassName}`.trim()}
            >
                {textContent}
            </a>
        </div>
    );
}