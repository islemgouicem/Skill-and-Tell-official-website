import { useState } from "react"
import agendaFrame from "../../../assets/images/mobai/agenda.svg"
import leftArrow from "../../../assets/images/mobai/left arrow.svg"
import rightArrow from "../../../assets/images/mobai/right arrow.svg"

const agendaData = [
    {
        day: 1,
        events: [
            { time: "08:00 - 09:00 AM", description: "Lorem ipsum dolor sit" },
            { time: "08:00 - 09:00 AM", description: "Lorem ipsum dolor sit,\nLorem ipsum dolor sit" },
            { time: "08:00 - 09:00 AM", description: "Lorem ipsum dolor" },
            { time: "08:00 - 09:00 AM", description: "Lorem ipsum dolor sit,\nLorem ipsum dolor sit" },
            { time: "08:00 - 09:00 AM", description: "Lorem ipsum dolor" },
            { time: "08:00 - 09:00 AM", description: "Lorem ipsum dolor sit,\nLorem ipsum dolor sit" },
        ]
    },
    {
        day: 2,
        events: [
            { time: "09:00 - 10:00 AM", description: "Day 2 Event 1" },
            { time: "10:00 - 11:00 AM", description: "Day 2 Event 2" },
            { time: "11:00 - 12:00 PM", description: "Day 2 Event 3" },
        ]
    }
]

export default function Agenda() {
    const [currentDay, setCurrentDay] = useState(0)

    const nextDay = () => {
        setCurrentDay((prev) => (prev + 1) % agendaData.length)
    }

    const prevDay = () => {
        setCurrentDay((prev) => (prev - 1 + agendaData.length) % agendaData.length)
    }

    return (
        <section
            id="agenda"
            className="relative w-full py-20 min-h-screen overflow-hidden flex flex-col items-center justify-center"
        >
            {/* Title */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-title tracking-wider mb-12">
                AGENDA
            </h2>

            {/* Agenda Card Container */}
            <div className="relative w-full max-w-[450px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 flex items-center justify-center">
                {/* Left Arrow */}
                <button
                    onClick={prevDay}
                    className="absolute left-[-20px] sm:left-[-40px] md:left-[-80px] z-10 p-2 hover:opacity-80 transition-opacity"
                    aria-label="Previous day"
                >
                    <img src={leftArrow} alt="Previous" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                </button>

                {/* Card with SVG background */}
                <div className="relative w-full">
                    {/* SVG Frame as background */}
                    <img 
                        src={agendaFrame} 
                        alt="" 
                        className="w-full h-auto"
                    />
                    
                    {/* Card content overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-[12%] sm:pb-[10%] p-4 sm:p-6 md:p-10 lg:p-12">
                        {/* Day Header */}
                        <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-10 w-full max-w-lg">
                            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-white/60"></div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-3 md:px-6 tracking-widest">
                                DAY {String(agendaData[currentDay].day).padStart(2, '0')}:
                            </h3>
                            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-white/60 to-white/60"></div>
                        </div>

                        {/* Events List */}
                        <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
                            {agendaData[currentDay].events.map((event, index) => (
                                <div key={index} className="flex flex-row items-start justify-center gap-5 sm:gap-6 md:gap-10 lg:gap-14">
                                    <span className="text-white/90 text-base sm:text-xl md:text-2xl lg:text-3xl font-medium min-w-[100px] sm:min-w-[140px] md:min-w-[200px] text-right">
                                        {event.time}
                                    </span>
                                    <span className="text-white/80 text-base sm:text-xl md:text-2xl lg:text-3xl whitespace-pre-line min-w-[120px] sm:min-w-[160px] md:min-w-[220px] text-left">
                                        {event.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextDay}
                    className="absolute right-[-30px] sm:right-[-40px] md:right-[-80px] z-10 p-2 hover:opacity-80 transition-opacity"
                    aria-label="Next day"
                >
                    <img src={rightArrow} alt="Next" className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24" />
                </button>
            </div>
        </section>
    )
}