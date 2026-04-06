export default function RedButton({ textContent,pageName }) {
    return (
        <div className="relative flex items-center justify-center inline-block " >
            {/* The image defines the size of the container */}
            <img src="images/arcade/Red_button.png" alt="Button Background" className="block" />

            {/* The link is positioned absolutely and centered via flex alignment */}
            <a 
                href={`arcade/${pageName}`} 
                className=" hover:text-[#BFCBC5] absolute inset-0 flex items-center justify-center font-compacta text-[25px] font-normal leading-none tracking-[0.06em] text-[#330001] drop-shadow-[3px_1px_10.8px_rgba(255,255,255,0.54)] whitespace-nowrap"
            >
                {textContent}
            </a>
        </div>
    );
}