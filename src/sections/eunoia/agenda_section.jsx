import { cn } from "../../lib/utils"

const AgendaItem = ({ item, index }) => {
    const isLeft = item.side === "left";

    return (
        <>
            {/* Desktop/Tablet View (md and up) */}
            <div className={cn(
                "hidden md:flex relative items-center gap-8",
                isLeft ? "justify-start" : "justify-end"
            )}>
                {isLeft ? (
                    <>
                        {/* Left side: Card */}
                        <div dir="rtl" className="w-[45%] transparency backdrop-blur-sm rounded-2xl p-6 relative border-1 border-gold">
                            <div className="flex items-center">
                                <div className="w-8 h-8 mr-2 rounded-full bg-gold/30 flex items-center justify-center">
                                    <img src={`/images/${item.icon}.svg`} className="w-6" />
                                </div>
                                <p className="text-gold text-sm font-bold mb-1">{item.time}</p>
                            </div>
                            <h3 className="text-white font-semibold text-lg my-2">
                                {item.title}
                            </h3>
                            <p className="text-[#999999] text-sm">
                                {item.description}
                            </p>
                        </div>
                        {/* Marker */}
                        <div className="absolute bg-white/10 w-6 h-6 rounded-full left-1/2 -translate-x-1/2 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_15px_rgba(252,211,77,0.6)]" />
                        </div>
                    </>
                ) : (
                    <>
                        {/* Marker */}
                        <div className="absolute bg-white/10 w-6 h-6 rounded-full left-1/2 -translate-x-1/2 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_15px_rgba(252,211,77,0.6)]" />
                        </div>
                        {/* Right side: Card */}
                        <div className="w-[45%] transparency_right backdrop-blur-[42] rounded-2xl p-6 relative border-1 border-gold">
                            <div className="flex items-center">
                                <div className="w-8 h-8 mr-2 rounded-full bg-gold/30 flex items-center justify-center">
                                    <img src={`/images/${item.icon}.svg`} className="w-6" />
                                </div>
                                <p className="text-gold text-sm font-bold mb-1">{item.time}</p>
                            </div>
                            <h3 className="text-white font-semibold text-lg my-2">
                                {item.title}
                            </h3>
                            <p className="text-[#999999] text-sm">
                                {item.description}
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Mobile View (below md) */}
            <div className="md:hidden relative flex items-start gap-4 pl-9">
                {/* Marker - positioned to align with the line */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-6 h-6">
                    <div className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gold shadow-[0_0_15px_rgba(252,211,77,0.6)]" />
                    </div>
                </div>

                {/* Card */}
                <div className="flex-1 transparency backdrop-blur-sm rounded-2xl p-4 border-1 border-gold">
                    <div className="flex items-center mb-2">
                        <div className="w-7 h-7 mr-2 rounded-full bg-gold/30 flex items-center justify-center">
                            <img src={`/images/${item.icon}.svg`} className="w-5" />
                        </div>
                        <p className="text-gold text-xs font-bold">{item.time}</p>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2">
                        {item.title}
                    </h3>
                    <p className="text-[#999999] text-sm">
                        {item.description}
                    </p>
                </div>
            </div>
        </>
    );
};

// --- Data: Agenda Items ---

const agendaItems = [
    {
        time: "08:30 – 09:00",
        title: "Check-In",
        icon: "p1",
        description: "Participant check-in",
        side: "left"
    },
    {
        time: "09:00 – 09:30",
        title: "Opening Ceremony ",
        icon: "p2",
        description: "Welcome remarks, Overview of event objectives & flow",
        side: "right"
    },
    {
        time: "09:30 – 10:10",
        icon: "p3",
        title: "Well-Being Walk Activity ",
        description: "30-minute physical activity",
        side: "left"

    },
    {
        time: "10:10 – 10:40",
        title: "Picnic Break ",
        icon: "p4",
        description: "Light outdoor gathering (snacks / refreshments)",
        side: "right"
    },
    {
        time: "10:40 – 12:00",
        icon: "p5",
        title: "Well-Being talks ",
        description: "A concise talk offering practical and innovative insights to help students improve their mental and physical well-being.",
        side: "left"
    },
    {
        time: "12:00 – 13:00",
        title: "Lunch Break ",
        description: "Light outdoor gathering (snacks / refreshments)",
        icon: "p6",
        side: "right"
    },
    {
        time: "13:00 – 16:00",
        title: "Working Session ",
        icon: "p7",
        description: " Teams work on:Business Model Canvas, Slide presentation, Final pitch preparation.",
        side: "left"
    },
    {
        time: "16:00 – 17:00",
        icon: "p1",
        title: "Pitching Session ",
        description: "  Each team presents in front of the judges.",
        side: "right"
    },
    {
        time: "17:30 – 18:00",
        icon: "p2",
        title: "Closing Ceremony & Winners Announcement ",
        description: "  Announcement of winning teams .",
        side: "left"
    },
];

// --- Component: EventAgenda ---

const EventAgenda = () => {
    return (
        <section className="relative w-full overflow-hidden py-20" id="agenda">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl eunoia-title py-2 text-center">
                Event Agenda
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-12 md:mb-16 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>

            {/* Desktop/Tablet Timeline */}
            <div className="hidden md:block relative max-w-[80%] lg:max-w-[70%] mx-auto mb-12">
                {/* Central vertical line */}
                <div className="absolute strokes left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2" />

                {/* Timeline items container */}
                <div className="space-y-16">
                    {agendaItems.map((item, index) => (
                        <AgendaItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden relative max-w-full px-4 mb-12">
                {/* Vertical line for mobile */}
                <div className="absolute strokes left-[26px] top-3 bottom-0 w-[4px]" />

                {/* Timeline items container */}
                <div className="space-y-8">
                    {agendaItems.map((item, index) => (
                        <AgendaItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>

            {/* Footer Decorative Line */}
            <img
                onClick={() => {
                    document.getElementById("rules")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute cursor-pointer left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px] hidden md:block"
                alt="Line"
                src="/images/down_arrow.svg"
            />

            {/* Corner Decorative Groups */}
            <img
                className="absolute top-2 right-2 w-20 h-auto -rotate-90
            sm:top-3 sm:right-4 sm:w-24
            md:top-4 md:right-6 md:w-32
            lg:top-5 lg:right-5 lg:w-40"
                alt="Group"
                src="/images/corners.svg"
            />
            <img
                className="absolute bottom-2 left-2 w-20 h-auto rotate-90
            sm:bottom-3 sm:left-4 sm:w-24
            md:bottom-4 md:left-6 md:w-32
            lg:bottom-5 lg:left-5 lg:w-40"
                alt="Group"
                src="/images/corners.svg"
            />

            <img
                src="/images/shadow.svg"
                alt="Shadow"
                className="
                        absolute
                        -top-40 -left-40
                        sm:-top-48 sm:-left-48
                        lg:-top-60 lg:-left-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "
            />

            {/* Bottom shadow */}
            <img
                src="/images/shadow.svg"
                alt="Shadow"
                className="
                        absolute
                        -bottom-40 -right-40
                        sm:-bottom-48 sm:-right-48
                        lg:-bottom-60 lg:-right-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "
            />
        </section>
    )
}

export default EventAgenda