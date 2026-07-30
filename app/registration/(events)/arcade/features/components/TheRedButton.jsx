export default function RedButton({ textContent, pageName, className = "", textClassName = "" }) {
    return (<div className={`relative flex items-center justify-center ${className}`.trim()}>
            {/* The image defines the size of the container */}
            <img src="/images/arcade/redbtn.png" alt="Button Background" className="block w-[12.5rem] sm:w-[13rem]"/>

            {/* The link is positioned absolutely and centered via flex alignment */}
            <a onClick={pageName} className={`absolute inset-0 flex items-center justify-center font-compacta text-3xl font-normal leading-none tracking-[0.06em] text-[#330001] drop-shadow-[3px_1px_10.8px_rgba(255,255,255,0.54)] whitespace-nowrap ${textClassName}`.trim()}>
                {textContent}
            </a>
        </div>);
}
