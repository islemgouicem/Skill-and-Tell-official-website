import React, { useState, useEffect } from "react";
import gurl from "../../lib/image-util"

function HeroSpline() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setReady(true));
    }, []);

    return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[55vh] md:h-[50vh] lg:h-[45vh] overflow-hidden z-10 pointer-events-none bg-transparent">
            {ready && (
                <video
                    src={`${gurl('planet.mp4')}`} // place your mp4 file in public/ folder
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] -translate-y-[10vh] md:-translate-y-[15vh] lg:-translate-y-[20vh] object-contain bg-transparent"
                />
            )}
        </div>
    );
}

export default React.memo(HeroSpline);
