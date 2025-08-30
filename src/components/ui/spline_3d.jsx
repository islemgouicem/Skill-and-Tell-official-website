import React, { useState, useEffect } from "react";

function HeroSpline() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setReady(true));
    }, []);

    return (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[45vh] md:h-[50vh] lg:h-[45vh] overflow-hidden z-10 pointer-events-none">
            <spline-viewer
                url="https://prod.spline.design/SPeUB6kJeccOWbLo/scene.splinecode"
                // Adjusted height and vertical translation for better scaling on different screen sizes
                class="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] -translate-y-[10vh] md:-translate-y-[15vh] lg:-translate-y-[30vh]"
            ></spline-viewer>
        </div>
    );
}

export default React.memo(HeroSpline);
