"use client"
import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import CyberCard from "./cyberCard"

const mentors = [
    {
        id: 1,
        name: "Lakehal, Soumaya",
        subtitle: "University Lecturer at ENSIA, specialized in OR, Discrete Mathematics, and Optimization for industrial systems and scheduling.",
        image: "/images/mobai/sumia.png"
    },

]

const MentorsCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1
    })

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <section className="gradient-purple-bg px-2 sm:px-4 md:px-8 flex flex-col items-center justify-center mb-10 py-8">
            <div className="relative w-full max-w-5xl">
                <div className="overflow-hidden w-[95%] mx-auto md:w-full" ref={emblaRef}>
                    <div className="flex justify-center">
                        {mentors.map(judge => (
                            <div
                                key={judge.id}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33%] px-4 sm:px-8"
                            >
                                <CyberCard className="h-full w-full mx-auto" shadow={false} mentors="min-h-[calc(40vh)] lg:min-h-[calc(35vh)]  flex flex-col items-center justify-around">
                                    <div className="relative mb-3">
                                        <Image width={400} height={300}
                                            src={judge.image}
                                            alt={judge.name}
                                            className="w-full h-32 sm:h-40 md:h-44 object-cover rounded-md"
                                        />

                                        <h3
                                            className="font-[100] text-[#F7F0FF] text-center text-2xl uppercase -mt-4 sm:-mt-5"
                                            style={{
                                                textShadow:
                                                    "0px 10px 30px #9045d5ff,0px -10px 30px #9045d5ff"
                                            }}
                                        >
                                            {judge.name}
                                        </h3>
                                    </div>

                                    <p className="text-center font-[100] text-xs sm:text-sm text-subtitle">
                                        {judge.subtitle}
                                    </p>

                                </CyberCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MentorsCarousel
