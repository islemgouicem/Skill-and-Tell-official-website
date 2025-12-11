import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import JudgeCard from "./eunoia_card"

const judges = [
    {
        id: 1,
        name: "Bakhti Dalila",
        subtitle: "Pharmacienne Biologiste",
        image: "/images/juries/dalila.jpeg",
        description:
            "Biologist pharmacist focused on health and well-being. Brings expertise from Laboratoire Dalila Bakhti to guide wellness projects."
    },
    {
        id: 5,
        name: "Toualbia Selsabil",
        subtitle: "Lorem Ipsum is simply dummy",
        image: "/images/juries/photo_toualbia.jpg",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 6,
        name: "Boumenir	Yasmine",
        subtitle: "Consultante en Neurosciences & Innovation",
        image: "/images/juries/yasmine.jpeg",
        description:
            "Neuroscience and innovation consultant focused on mental well-being. Brings expertise from Cognesens to support cutting-edge wellness projects."
    },
    {
        id: 2,
        name: "Boughaleb Sadek el Amine",
        subtitle: "Lorem Ipsum is simply dummy",
        image: "/images/juries/photo_boughaleb.jpg",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 4,
        name: "Hadache Ihsene",
        subtitle: "Lorem Ipsum is simply dummy",
        image: "/images/juries/photo_ihcene.jpg",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
        id: 7,
        name: "Benahmed Mohamed",
        subtitle: "Médecin, Expert en santé publique et promotion du bien-être",
        image: "/images/behahmed.jpg",
        description:
            "Public health doctor focused on well-being. Advocates daily activity to prevent disease and boost quality of life."
    },
    {
        id: 8,
        name: "Adam Selamnia",
        subtitle: "Co-Founder & Business Development Director, NIUM (Luxembourg)",
        image: "/images/adam_selmania.jpg",
        description:
            "Co-Founder & Business Development Director at NIUM. Highlights how founders’ well-being drives better decisions, resilience, and sustainable innovation."
    },
    {
        id: 9,
        name: "Droueche Hocine",
        subtitle: "CEO of Ibticar A.I.",
        image: "/images/anony.png",
        description:
            "CEO of Ibticar A.I., driving innovative business solutions. Guides projects with a focus on technology and well-being impact."
    },
    {
        id: 3,
        name: "Ibersiene Rachid",
        subtitle: "Manager of Fromagerie FAFI",
        image: "/images/juries/fafo.jpg",
        description:
            "Manager of Fromagerie FAFI with a focus on business growth. Supports projects that combine entrepreneurship and well-being."
    },
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
