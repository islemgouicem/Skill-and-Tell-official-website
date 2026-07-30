"use client";
import { useState } from "react";
import Image from "next/image";
const Agenda = () => {
    const agendaData = [
        {
            day: 1,
            events: [
                {
                    time: "15:00 - 15:30",
                    description: "Check-in"
                },
                {
                    time: "15:30 - 16:00",
                    description: "Opening Ceremony"
                },
                {
                    time: "16:00 - 21:00",
                    description: "Treasure Hunt"
                },
                {
                    time: "16:15 - 16:45",
                    description: "Laser Maze"
                },
                {
                    time: "16:20 - 16:40",
                    description: "Zombie Chase"
                },
                {
                    time: "17:00 - 18:00",
                    description: "Memory Game"
                },
                {
                    time: "17:05 - 17:45",
                    description: "4 in a Row"
                },
                {
                    time: "18:00 - 18:30",
                    description: "Coffee Break"
                },
                {
                    time: "18:35 - 18:50",
                    description: "Faces Game"
                },
                {
                    time: "18:40 - 19:00",
                    description: "Numbers Game"
                },
                {
                    time: "19:00 - 19:40",
                    description: "Guess the Color"
                },
                {
                    time: "19:45 - 20:30",
                    description: "Catch Me if you can"
                }
            ]
        },
        {
            day: 2,
            events: [
                {
                    time: "09:30 - 17:00",
                    description: "Treasure Hunt"
                },
                {
                    time: "10:00 - 14:00",
                    description: "Video Game"
                },
                {
                    time: "10:00 - 10:45",
                    description: "Chess"
                },
                {
                    time: "10:05 - 10:15",
                    description: "Letters Game"
                },
                {
                    time: "10:30 - 11:30",
                    description: "Invisible Maze"
                },
                {
                    time: "11:00 - 11:10",
                    description: "Pixels"
                },
                {
                    time: "11:30 - 11:45",
                    description: "Cross Sums"
                },
                {
                    time: "11:45 - 13:00",
                    description: "Colored Cups"
                },
                {
                    time: "13:00 - 14:00",
                    description: "Lunch Break"
                },
                {
                    time: "14:00 - 15:00",
                    description: "Triple Balance Game"
                },
                {
                    time: "15:00 - 16:00",
                    description: "Number Rush"
                },
                {
                    time: "15:00 - 16:00",
                    description: "Password"
                },
                {
                    time: "16:30 - 17:00",
                    description: "Coffee break"
                },
                {
                    time: "17:00 - 17:30",
                    description: "Closing ceremony"
                }
            ]
        }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState("right");
    const [isAnimating, setIsAnimating] = useState(false);
    const currentDay = agendaData[activeIndex];
    const goToPrevious = () => {
        if (isAnimating)
            return;
        setDirection("left");
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev === 0 ? agendaData.length - 1 : prev - 1));
            setIsAnimating(false);
        }, 220);
    };
    const goToNext = () => {
        if (isAnimating)
            return;
        setDirection("right");
        setIsAnimating(true);
        setTimeout(() => {
            setActiveIndex((prev) => (prev === agendaData.length - 1 ? 0 : prev + 1));
            setIsAnimating(false);
        }, 220);
    };
    return (<section className="relative mt-6 w-full px-[2rem] md:px-[5%] lg:px-[10%] flex flex-col justify-center items-center overflow-visible py-2" id="agenda">

      <Image width={300} height={400} src="/images/arcade/agenda.png" alt="" className="w-45 md:w-50 lg:w-65 mb-8"/>

      <div className="w-[90%] sm:w-[85%] md:w-[82%] lg:w-[80%] xl:w-[78%] max-w-[1100px] flex items-center justify-between">
        <Image width={300} height={400} src="/images/arcade/agenda_zombie.png" className="z-10 hidden md:block md:w-[10rem] lg:w-[14rem] xl:w-[18rem]"/>
        <div className="relative w-full md:w-[58%] lg:w-[50%] xl:w-[50%]">
          <button type="button" onClick={goToPrevious} aria-label="Previous agenda card" className="absolute left-[-46px] sm:left-[-62px] md:left-[-56px] lg:left-[-50px] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center transition-all duration-200 hover:scale-105">
            <Image width={300} height={400} src="/images/arcade/left.svg" alt="" className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"/>
          </button>

          <div className={`relative h-[38rem] md:h-[40rem] py-[1.5rem] sm:py-[2rem] px-[1.25rem] sm:px-[2rem] flex flex-col transition-all duration-200 ease-out ${isAnimating
            ? direction === "right"
                ? "opacity-0 translate-x-6"
                : "opacity-0 -translate-x-6"
            : "opacity-100 translate-x-0"}
                    bg-[#FF0000]/[0.05] 
                    backdrop-blur-[30px] 
                    border border-[#8C1414] 
                    shadow-[inset_0_0_20px_0_rgba(255,114,114,0.4)]
                    rounded-[50px]
                `}>
            <div className="mb-4 sm:mb-5 flex items-center justify-center shrink-0">
              <span className="font-compacta text-[#CB7822] text-3xl tracking-[0.08em]">
                DAY {String(currentDay.day).padStart(2, "0")}
              </span>
            </div>

            <div className={`min-h-0 flex-1 overflow-y-auto lg:overflow-y-visible pr-1 lg:pr-0 flex flex-col gap-2.5 sm:gap-3 md:gap-3 lg:gap-3 justify-center`}>
              {currentDay.events.map((item, index) => (<div key={index} className="w-full flex px-5 items-center justify-between mb-2">
                  <span className="text-white text-sm lg:text-base font-bold leading-tight text-center whitespace-nowrap">
                    {item.time}
                  </span>
                  <span className="text-subtitle text-sm lg:text-base whitespace-pre-line font-extralight leading-tight text-center">
                    {item.description}
                  </span>
                </div>))}
            </div>



            <Image width={80} height={80} src="/images/arcade/top_right_sm_mobile.png" className="absolute top-[-13px] right-[-15px] "/>
            <Image width={80} height={80} src="/images/arcade/bottom_left_sm_mobile.png" alt="" className=" absolute bottom-[-13px] left-[-15px]"/>
          </div>

          <button type="button" onClick={goToNext} aria-label="Next agenda card" className="absolute right-[-46px] sm:right-[-62px] md:right-[-56px] lg:right-[-50px] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center transition-all duration-200 hover:scale-105">
            <Image width={300} height={400} src="/images/arcade/right.svg" alt="" className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11"/>
          </button>
        </div>

      </div>

      <div className="pointer-events-none absolute left-0 top-0 sm:left-100 sm:top-20 sm:h-[80rem] sm:w-[80rem] h-[100rem] w-[100rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.18)_0%,rgba(255,7,7,0.08)_38%,rgba(255,7,7,0)_72%)] blur-5xl"/>
    </section>);
};
export default Agenda;
