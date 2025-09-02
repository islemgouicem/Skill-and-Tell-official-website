import React, { useState, useEffect } from "react";

function HeroVideo() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setReady(true));
    }, []);

    return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[45vh] md:h-[50vh] lg:h-[45vh] overflow-hidden z-10 pointer-events-none">
            <video
                src="/video/planet.webm" // place your .webm file in /public/videos
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover -translate-y-[10vh] md:-translate-y-[15vh] lg:-translate-y-[30vh]"
            />
        </div>
    );
}

export default React.memo(HeroVideo);
