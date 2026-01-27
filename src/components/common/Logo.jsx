// Logo.jsx
import React from "react";
import logo from "../../assets/images/shared/logo.png"

function Logo({ size = 100 }) {
    return (
        <img
            src={logo}
            width={size}
            height={size}
            alt="Skill & Tell Logo"
            className="transition-transform duration-300"
            fetchPriority="low"
        />
    );
}

export default React.memo(Logo);
