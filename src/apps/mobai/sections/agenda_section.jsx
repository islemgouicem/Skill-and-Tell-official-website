import { useState } from "react"
import leftArrow from "/images/mobai/left arrow.svg"
import rightArrow from "/images/mobai/right arrow.svg"
import CyberCard from "../components/cyberCard"

const agendaData = [
    {
        day: 1,
        events: [
            { time: "10:00 - 11:00 AM", description: "TBD" },
            { time: "11:00 - 12:00 PM", description: "TBD" },
            { time: "12:00 - 01:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
        ]
    },
    {
        day: 2,
        events: [
            { time: "08:00 - 09:00 AM", description: "TBD" },
            { time: "09:00 - 10:00 AM", description: "TBD" },
            { time: "10:00 - 11:00 AM", description: "TBD" },
            { time: "11:00 - 12:00 PM", description: "TBD" },
            { time: "12:00 - 01:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
            { time: "01:00 - 02:00 PM", description: "TBD" },
        ]
    },
    {
        day: 3,
        events: [
            { time: "08:00 - 09:00 AM", description: "TBD" },
            { time: "09:00 - 10:00 AM", description: "TBD" },
            { time: "10:00 - 11:00 AM", description: "TBD" },
            { time: "11:00 - 12:00 PM", description: "TBD" },
            { time: "11:00 - 12:00 PM", description: "TBD" },
            { time: "11:00 - 12:00 PM", description: "TBD" },
            { time: "11:00 - 12:00 PM", description: "TBD" },
        ]
    }
]

export default function Agenda() {
    const [currentDay, setCurrentDay] = useState(0)
    const [direction, setDirection] = useState(null)
    const [isAnimating, setIsAnimating] = useState(false)

    const nextDay = () => {
        if (isAnimating) return
        setDirection('right')
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentDay((prev) => (prev + 1) % agendaData.length)
            setIsAnimating(false)
        }, 300)
    }

    const prevDay = () => {
        if (isAnimating) return
        setDirection('left')
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentDay((prev) => (prev - 1 + agendaData.length) % agendaData.length)
            setIsAnimating(false)
        }, 300)
    }

    return (
        <section
            id="agenda"
            className="relative w-full pb-20  flex flex-col items-center justify-center"
        >
            {/* Title */}
            <h2 className="title">
                AGENDA
            </h2>

            {/* Agenda Card Container */}
            <div className="relative w-full max-w-[380px] sm:max-w-lg md:max-w-lg lg:max-w-xl mx-auto px-4 flex items-center justify-center">
                {/* Left Arrow */}
                <button
                    onClick={prevDay}
                    className="absolute left-[-35px] sm:left-[-60px] md:left-[-100px] z-10 p-2 hover:opacity-80 transition-opacity"
                    aria-label="Previous day"
                >
                    <img src={leftArrow} alt="Previous" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                </button>

                {/* Card with CyberCard component */}
                <CyberCard className="w-full shadow-none overflow-hidden">
                    <div
                        className={`flex flex-col items-center justify-center py-3 sm:py-4 md:py-4 lg:py-5 px-3 sm:px-4 md:px-5 transition-all duration-300 ease-in-out ${isAnimating
                            ? direction === 'right'
                                ? 'opacity-0 translate-x-8'
                                : 'opacity-0 -translate-x-8'
                            : 'opacity-100 translate-x-0'
                            }`}
                    >
                        {/* Day Header */}
                        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6 w-full max-w-lg">
                            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-white/60"></div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white px-2 md:px-4 tracking-widest">
                                DAY {String(agendaData[currentDay].day).padStart(2, '0')}:
                            </h3>
                            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-white/60 to-white/60"></div>
                        </div>

                        {/* Events List */}
                        <div className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4">
                            {agendaData[currentDay].events.map((event, index) => (
                                <div key={index} className="w-full flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                                    <span className="text-mwhite text-md lg:text-xl font-light text-right">
                                        {event.time}
                                    </span>
                                    <span className="text-subtitle text-md lg:text-xl whitespace-pre-line font-light text-left">
                                        {event.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CyberCard>

                {/* Right Arrow */}
                <button
                    onClick={nextDay}
                    className="absolute right-[-35px] sm:right-[-60px] md:right-[-100px] z-10 p-2 hover:opacity-80 transition-opacity"
                    aria-label="Next day"
                >
                    <img src={rightArrow} alt="Next" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                </button>
            </div>
        </section>
    )
}