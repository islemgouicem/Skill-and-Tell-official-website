// Logo.jsx
import React from "react";

function Logo({ size = 100 }) {
    return (
        <img
            src="/images/logo.png"
            width={size}
            height={size}
            alt="Skill & Tell Logo"
            className="transition-transform duration-300"
        />
    );
}

export default React.memo(Logo);
