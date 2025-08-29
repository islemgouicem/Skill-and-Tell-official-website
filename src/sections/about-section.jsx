"use client"

import { Lightbulb, Rocket, Users, Award } from "lucide-react"
import { useInView } from "../components/ui/use_in_view.js"
import React from 'react'

//images
import aboutus1 from "../assets/images/about_us1.png"
import aboutus2 from "../assets/images/about_us2.png"
import phone from "../assets/images/phone.png"

function AboutSection() {
  const [sectionRef, sectionInView] = useInView({ threshold: 0.1 })
  const [phoneRef, phoneInView] = useInView({ threshold: 0.3 })
  const [card1Ref, card1InView] = useInView({ threshold: 0.3 })
  const [card2Ref, card2InView] = useInView({ threshold: 0.3 })
  const [card3Ref, card3InView] = useInView({ threshold: 0.3 })
  const [card4Ref, card4InView] = useInView({ threshold: 0.3 })

  return (
    <section id="about" ref={sectionRef} className="relative bg-Main-100 text-space-text overflow-hidden lg:h-screen">
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-no-repeat bg-top bg-contain pointer-events-none select-none w-full`}
        style={{ backgroundImage: "url('/images/white_bg.png')",}}
      />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 h-full flex flex-col py-4 sm:py-6 md:py-8">
        <h2
          className={`titles text-neutral-600 transition-all duration-1000 mt-4
            ${sectionInView ? "lg:opacity-100 lg:translate-y-0" : "lg:opacity-0 lg:translate-y-10"}
            opacity-100 translate-y-0`}
        >
          Who Are We?
        </h2>

        <div className="flex-1 flex flex-col">
          {/* Mobile Layout (Phone on left, cards on right) */}
          <div className=" lg:hidden flex-1 flex flex-row items-stretch">
            {/* Phone container - positioned absolutely to crop half */}
            <div className="relative w-[100px] sm:w-[120px] md:w-[140px] flex-shrink-0">
              <img
                ref={phoneRef}
                loading="lazy"
                src={phone}
                alt="Skill & Tell App Mockup"
                className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[130%] object-contain 
                  transition-all duration-1000 w-auto h-[400px]
                  opacity-100 scale-220`}
              />
            </div>

            {/* Cards container - takes the rest of the width, stacks vertically */}
            <div className="flex-1 flex flex-col justify-center space-y-4 pl-2 sm:pl-4">
              {/* About Us Card */}
              <div
                ref={card1Ref}
                className="about-cont abouty opacity-100 translate-y-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">About us :</h3>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-0.5 bg-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white/90 text-sm leading-tight mb-2">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                    <p className="text-white/90 text-sm leading-tight">
                      Cum enim quis pellentesque vestibulum elementum nulla. Bibendum netus id feugiat purus fringilla.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Vision Card with Image */}
              <div className="flex items-stretch gap-2 sm:gap-3">
                <div
                  ref={card2Ref}
                  className={`bg-Main-600 abouty flex-1`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">Our vision :</h3>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-0.5 bg-white/50 flex-shrink-0" />
                    <p className="text-white/90 text-sm leading-tight">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                  </div>
                </div>
                <img
                  src={aboutus1}
                  loading="lazy"
                  alt="Group photo 1"
                  className="rounded-md object-cover w-16 sm:w-20 md:w-24 h-full flex-shrink-0"
                />
              </div>

              {/* Our Specialty Card with Image */}
              <div className="flex items-stretch gap-2 sm:gap-3">
                <img
                  src={aboutus2}
                  loading="lazy"
                  alt="Group photo 2"
                  className="rounded-md object-cover w-16 sm:w-20 md:w-24 h-full flex-shrink-0"
                />
                <div
                  ref={card3Ref}
                  className={`bg-Main-600 abouty flex-1`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">Our specialty :</h3>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-0.5 bg-white/50 flex-shrink-0" />
                    <p className="text-white/90 text-sm leading-tight">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Achievements Card */}
              <div
                ref={card4Ref}
                className={`about-cont abouty`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">Our achievements :</h3>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-0.5 bg-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white/90 text-sm leading-tight mb-2">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                    <p className="text-white/90 text-sm leading-tight">
                      Cum enim quis pellentesque vestibulum elementum nulla. Bibendum netus id feugiat purus fringilla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 flex-1">
            {/* Left Column */}
            <div className="flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-4 mb-20">
              {/* About Us Card (top-left) */}
              <div
                ref={card1Ref}
                className={`about-cont p-3 sm:p-4 rounded-md shadow-lg transition-all duration-700 ${card1InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">About us :</h3>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-0.5 bg-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white/90 text-sm leading-tight mb-2">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                    <p className="text-white/90 text-sm leading-tight">
                      Cum enim quis pellentesque vestibulum elementum nulla. Bibendum netus id feugiat purus fringilla.
                    </p>
                  </div>
                </div>
              </div>

              {/* Our Vision Card + Image (bottom-left) */}
              <div className="flex items-stretch gap-2 sm:gap-3">
                <img
                  src={aboutus1}
                  loading="lazy"
                  alt="Group photo 1"
                  className="rounded-md object-cover w-16 sm:w-20 md:w-24 lg:w-20 xl:w-24 h-full flex-shrink-0"
                />
                <div
                  ref={card2Ref}
                  className={`bg-Main-600 p-3 sm:p-4 rounded-md shadow-lg flex-1 transition-all duration-700 delay-200 ${card2InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Rocket className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">Our vision :</h3>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-0.5 bg-white/50 flex-shrink-0" />
                    <p className="text-white/90 text-sm leading-tight">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Central Phone Mockup - Stuck at bottom */}
            <div className="flex justify-center items-end">
              <img
                ref={phoneRef}
                src={phone}
                alt="Skill & Tell App Mockup"
                className={`object-contain translate-y-0 transition-all duration-1000 w-full max-w-[140px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[240px] xl:max-w-[260px] h-auto ${phoneInView ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
              />
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center space-y-2 sm:space-y-3 md:space-y-4 mb-20">
              {/* Our Specialty Card + Image (top-right) */}
              <div className="flex items-stretch gap-2 sm:gap-3">
                <div
                  ref={card3Ref}
                  className={`bg-Main-600 p-3 sm:p-4 rounded-md shadow-lg flex-1 transition-all duration-700 ${card3InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">Our specialty :</h3>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-0.5 bg-white/50 flex-shrink-0" />
                    <p className="text-white/90 text-sm leading-tight">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                  </div>
                </div>
                <img
                  src={aboutus2}
                  loading="lazy"
                  alt="Group photo 2"
                  className="rounded-md object-cover w-16 sm:w-20 md:w-24 lg:w-20 xl:w-24 h-full flex-shrink-0"
                />
              </div>

              {/* Our Achievements Card (bottom-right) */}
              <div
                ref={card4Ref}
                className={`about-cont p-3 sm:p-4 rounded-md shadow-lg transition-all duration-700 delay-200 ${card4InView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white flex-shrink-0" />
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white">Our achievements :</h3>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-0.5 bg-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white/90 text-sm leading-tight mb-2">
                      Lorem ipsum dolor sit amet consectetur. Dolor enim facilisis maecenas interdum amet. Vitae viverra
                      risus mi cursus eu pharetra.
                    </p>
                    <p className="text-white/90 text-sm leading-tight">
                      Cum enim quis pellentesque vestibulum elementum nulla. Bibendum netus id feugiat purus fringilla.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default React.memo(AboutSection)