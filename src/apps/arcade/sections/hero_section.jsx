import { CalendarIcon, MapPinIcon } from "lucide-react"
import { Button } from "../../../components/ui/button"
import PopUp from "../../../components/ui/popup.jsx"
import { useState } from "react"
import { Card, CardContent } from "../../../components/ui/card_eunoia"
import { useNavigate } from "react-router-dom";
import RedButton from "../components/TheRedButton.jsx"
export default function HeroSection() {


    return (
        <section
            id="home"
            className="relative  w-full  px-[2rem] md:px-[5%] lg:px-[10%]   pt-[80px] min-h-screen overflow-hidden flex flex-col  justify-center  bg-[url('/images/arcade/hero.png')]    sm:bg-cover py-[3rem] " >
            {/* Inner container that fills remaining height below navbar */}
            <div 
            className="flex flex-col items-center w-full min-h-[calc(100vh-80px)] relative z-20  pt-[4rem]">
              <img src="images\arcade\arcade_logo.png" className=" mb-[2rem]"/>
                <p className="md:w-[85%] lg:w-[75%]  2xl:w-[65%] font-[100] tracking-[0.1em]  leading-[25px] text-[#BFCBC5] text-center mb-[2rem] text-[1rem] sm:text-[1.5rem]  sm:leading-[30px] md:[2rem] md:leading-[40px] " > 
                    The zombies are hungry… are you in the menu? Face the undead, beat the clock,
                     and dominate the survival rankings.</p>
                
                <RedButton textContent={"Join The Fight"} pageName={"register"}/>
                <div className=" pt-[1rem] flex  flex-col sm:flex-row  gap-[0.5rem] sm:gap-[2rem] p-[0.5rem] justify-center text-[#77867F] flex font-compacta text-[1rem] font-normal leading-[100%] tracking-[0.08em]  align-bottom">
                    <div className="flex items-center" > 
                        <CalendarIcon className=""/>
                          <p>12 April 2026</p>

                          </div>
                    <div className=" flex items-center">
                        <MapPinIcon/>
                        <p>ENSIA SCHOOL</p>
                        </div>
                    </div>
                </div>

            <div className=" absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-[rgba(255,7,7,0.05)] via-[#990404] to-[rgba(255,7,7,0.05)] rounded-full blur-[0.5px]"></div>


        </section>
    )
}