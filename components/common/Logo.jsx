// Logo.tsx
import React from "react";
import Image from "next/image";
import logo from "@/assets/images/shared/logo.png";

<Image src={logo} />
function Logo({ size = 100 }) {
    return (<Image src={logo}  width={size} height={size} alt="Skill & Tell Logo" className="transition-transform duration-300" fetchPriority="low"/>);
}
export default React.memo(Logo);
