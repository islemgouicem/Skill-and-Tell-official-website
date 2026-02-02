import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import CyberCard from "./cyberCard"
import leftArrow from "../../../assets/images/mobai/left arrow.svg"
import rightArrow from "../../../assets/images/mobai/right arrow.svg"

const mentors = [
    {
        id: 1,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 2,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 3,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 4,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 5,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 6,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 7,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    },
    {
        id: 8,
        name: "TBD",
        subtitle: "Lorem ipsum dolor sit amet consectetur. Sapien ullamcorper suspendisse eget quisque at ac placerat consequat tempus. Nulla at tellus congue a. Non et dui semper at consectetur. Blandit augue nec ullamcorper at egestas urna in ipper at egestas urna in ipsum sapien.",
        image: "/images/anon.png"
    }
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
            <div className="relative w-full max-w-6xl">
                <button
                    onClick={scrollPrev}
                    className="ml-6 absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 z-10 w-15 h-15 flex items-center justify-center"
                    aria-label="Previous slide"
                >
                    <img src={leftArrow} className="w-full h-full" alt="Previous" />
                </button>

                <button
                    onClick={scrollNext}
                    className="mr-6 absolute -right-6 md:-right-16 top-1/2 -translate-y-1/2 z-10 w-15 h-15 flex items-center justify-center"
                    aria-label="Next slide"
                >
                    <img src={rightArrow} className="w-full h-full" alt="Next" />
                </button>

                <div className="overflow-hidden w-[85%] mx-auto md:w-full" ref={emblaRef}>
                    <div className="flex">
                        {mentors.map(judge => (
                            <div
                                key={judge.id}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                            >
                                <CyberCard className="h-full w-full sm:max-w-sm mx-auto" shadow={false} mentors="min-h-[calc(50vh)] lg:min-h-[calc(40vh)]  flex flex-col items-center justify-around">
                                    <div className="relative mb-4">
                                        <img
                                            src={judge.image}
                                            alt={judge.name}
                                            className="w-full h-48 sm:h-56 md:h-58 object-contain rounded-md"
                                        />

                                        <h3
                                            className="font-[100] text-[#F7F0FF] text-center text-3xl lg:text-4xl uppercase -mt-6 sm:-mt-7"
                                            style={{
                                                textShadow:
                                                    "0px 10px 30px #9045d5ff,0px -10px 30px #9045d5ff"
                                            }}
                                        >
                                            {judge.name}
                                        </h3>
                                    </div>

                                    <p className="text-center font-[100] text-sm sm:text-base text-gold">
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
