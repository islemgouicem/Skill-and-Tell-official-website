import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button.jsx"
import CyberButton from "../components/CyberButton.jsx"

export default function HeroSection() {
    const navigate = useNavigate();


    const handleRegisterClick = () => {
        navigate("/mobai/register");
    };
    return (
        <section
            id="home"
            className="relative w-full pt-[80px] min-h-screen overflow-hidden flex"
        >
            <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-80px)] relative z-20">
                <CyberButton variant="primary" onClick={handleRegisterClick}>
                    Register Now
                </CyberButton>
            </div>
        </section>

    )
}