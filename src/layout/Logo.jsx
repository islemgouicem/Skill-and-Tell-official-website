// Logo.jsx
import React from "react";
import gurl from "../lib/image-util.js";

function Logo({ size = 100 }) {
    return (
        <img
            src={gurl("images/logo.png")}
            width={size}
            height={size}
            alt="Skill & Tell Logo"
            className="transition-transform duration-300"
        />
    );
}

export default React.memo(Logo);
