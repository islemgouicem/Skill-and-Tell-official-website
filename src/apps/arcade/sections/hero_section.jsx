import { CalendarIcon, MapPinIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import PopUp from "../../../components/ui/popup.jsx"
import { useState } from "react"
import { Card, CardContent } from "../../../components/ui/card_eunoia"
import { useNavigate } from "react-router-dom";


export default function HeroSection() {


    return (
        <section
            id="home"
            className="relative w-full pt-[80px] min-h-screen overflow-hidden flex"
        >
            {/* Inner container that fills remaining height below navbar */}
            <div className="flex flex-col justify-between items-center w-full min-h-[calc(100vh-80px)] relative z-20">

            </div>

        </section>
    )
}