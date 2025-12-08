import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import JudgeCard from "./eunoia_card"

const judges = [
    {
        id: 1,
        name: "To be announced",
        subtitle: "Lorem Ipsum is simply dummy",
        image:"/images/anony.png",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 2,
        name: "To be announced",
        subtitle: "Lorem Ipsum is simply dummy",
        image:"/images/anony.png",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 3,
        name: "To be announced",
        subtitle: "Lorem Ipsum is simply dummy",
        image:"/images/anony.png",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 4,
        name: "To be announced",
        subtitle: "Lorem Ipsum is simply dummy",
        image:"/images/anony.png",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 5,
        name: "To be announced",
        subtitle: "Lorem Ipsum is simply dummy",
        image:"/images/anony.png",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    }
]

const JudgesCarousel = () => {
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
        <section className="gradient-purple-bg px-4 md:px-8 flex flex-col items-center justify-center mb-10">
            

            {/* Carousel container */}
            <div className="relative w-full max-w-6xl">
                {/* Navigation arrows */}
                <button
                    onClick={scrollPrev}
                    className="ml-6 absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-gold/60 hover:text-gold transition-colors"
                    aria-label="Previous slide"
                >
                    <img src="/images/left.svg" className="w-20 h-20" strokeWidth={1} />
                </button>

                <button
                    onClick={scrollNext}
                    className="mr-6 absolute -right-6 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-gold/60 hover:text-gold transition-colors"
                    aria-label="Next slide"
                >
                    <img src="/images/right.svg" className="w-20 h-20" strokeWidth={1} />
                </button>

                {/* Embla Carousel */}
                <div className="overflow-hidden px-6 md:px-4" ref={emblaRef}>
                    <div className="flex">
                        {judges.map(judge => (
                            <div
                                key={judge.id}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                            >
                                <JudgeCard
                                    name={judge.name}
                                    subtitle={judge.subtitle}
                                    image={judge.image}
                                    description={judge.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JudgesCarousel
