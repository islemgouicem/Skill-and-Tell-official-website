
import { useState } from "react"

const Agenda = () => {
  const agendaData = [
    {
      day: 1,
      events: [
        {
          time: "08:00 - 09:00",
          description: "Lorem ipsum"
        },
        {
          time: "09:00 - 12:00",
          description: "Lorem ipsum"
        },
        {
          time: "12:30 - 14:30",
          description: "Lorem ipsum"
        },
        {
          time: "13:00 - 17:00",
          description: "Lorem ipsum"
        },
        {
          time: "17:00 - 17:30",
          description: "Lorem ipsum"
        },
        {
          time: "17:30 - 20:00",
          description: "Lorem ipsum"
        },
        {
          time: "20:00 - 21:00",
          description: "Lorem ipsum"
        },
        {
          time: "21:00 - 01:00",
          description: "Lorem ipsum"
        },
        {
          time: "01:00 - 01:30",
          description: "Lorem ipsum"
        }
      ]
    },
    {
      day: 2,
      events: [
        {
          time: "08:00 - 09:00",
          description: "Lorem ipsum"
        },
        {
          time: "09:00 - 12:00",
          description: "Lorem ipsum"
        },
        {
          time: "12:30 - 14:30",
          description: "Lorem ipsum"
        },
        {
          time: "13:00 - 17:00",
          description: "Lorem ipsum"
        },
        {
          time: "17:00 - 17:30",
          description: "Lorem ipsum"
        },
        {
          time: "17:30 - 20:00",
          description: "Lorem ipsum"
        },
        {
          time: "20:00 - 21:00",
          description: "Lorem ipsum"
        },
        {
          time: "21:00 - 01:00",
          description: "Lorem ipsum"
        },
        {
          time: "01:00 - 01:30",
          description: "Lorem ipsum"
        }
      ]
    }
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState("right")
  const [isAnimating, setIsAnimating] = useState(false)
  const currentDay = agendaData[activeIndex]

  const goToPrevious = () => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev === 0 ? agendaData.length - 1 : prev - 1))
      setIsAnimating(false)
    }, 220)
  }

  const goToNext = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev === agendaData.length - 1 ? 0 : prev + 1))
      setIsAnimating(false)
    }, 220)
  }

  return (
    <section className="relative mt-6 w-full px-[2rem] md:px-[5%] lg:px-[10%] flex flex-col justify-center items-center overflow-visible py-2" id="agenda">

      <img src="/images/arcade/agenda.png" alt="" className="w-45 md:w-50 lg:w-65 mb-8" />

      <div className="w-[90%] sm:w-[85%] md:w-[82%] lg:w-[80%] xl:w-[78%] max-w-[1100px] flex items-center justify-between">
        <img src="/images/arcade/agenda_zombie.png" className="z-10 hidden md:block md:w-[10rem] lg:w-[14rem] xl:w-[18rem]" />
        <div className="relative w-full md:w-[58%] lg:w-[50%] xl:w-[50%]">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous agenda card"
            className="absolute left-[-46px] sm:left-[-62px] md:left-[-56px] lg:left-[-50px] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <img src="/images/arcade/left.svg" alt="" className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11" />
          </button>

          <div className={`relative h-[26rem] sm:h-[30rem] md:h-[30rem] py-[1.5rem] sm:py-[2rem] px-[1.25rem] sm:px-[2rem] flex flex-col transition-all duration-200 ease-out ${isAnimating
            ? direction === "right"
              ? "opacity-0 translate-x-6"
              : "opacity-0 -translate-x-6"
            : "opacity-100 translate-x-0"
            }
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
              {currentDay.events.map((item, index) => (
                <div key={index} className="w-full flex px-5 items-center justify-between mb-2">
                  <span className="text-white text-sm lg:text-base font-bold leading-tight text-center whitespace-nowrap">
                    {item.time}
                  </span>
                  <span className="text-subtitle text-sm lg:text-base whitespace-pre-line font-extralight leading-tight text-center">
                    {item.description}
                  </span>
                </div>
              ))}
            </div>



            <img src="/images/arcade/top_right_sm_mobile.png" className="absolute top-[-13px] right-[-15px] " />
            <img src="/images/arcade/bottom_left_sm_mobile.png" alt="" className=" absolute bottom-[-13px] left-[-15px]" />
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next agenda card"
            className="absolute right-[-46px] sm:right-[-62px] md:right-[-56px] lg:right-[-50px] top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <img src="/images/arcade/right.svg" alt="" className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11" />
          </button>
        </div>

      </div>

      <div className="pointer-events-none absolute left-0 top-0 sm:left-100 sm:top-20 sm:h-[80rem] sm:w-[80rem] h-[100rem] w-[100rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,7,7,0.18)_0%,rgba(255,7,7,0.08)_38%,rgba(255,7,7,0)_72%)] blur-5xl" />
    </section>
  )
}

export default Agenda
