import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../components/ui/accordion"
import faqItems from "../../../data/skillntell/faq.json"
import React from 'react'

import snt from "../../../assets/images/skillntell/snt.svg"

function FQ() {
  return (
    <section
      id="FQ"
      className="relative py-12 md:py-18 bg-space-dark text-space-text overflow-hidden"
      style={{
        background: "url('/images/more_About.webp')",
        backgroundSize: "cover",   // makes it scale and fill the section
        backgroundPosition: "center", // keeps it centered
        backgroundRepeat: "no-repeat", // avoids tiling
      }}
    >

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="titles text-center mb-4 text-space-text">
          More About S&T
        </h2>
        <p className="text-base md:text-lg text-center max-w-2xl mx-auto text-[#6B7280]">
          F&Q section to answer the most frequently repeated questions
        </p>
        <div className="max-w-3xl mx-auto mt-6 py-0">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <div key={item.value}>
                <AccordionItem
                  value={item.value}
                  className="pointer rounded-sm bg-transparent transition-all duration-100
          data-[state=open]:bg-[linear-gradient(89.06deg,rgba(255,199,138,0.18)_-0.9%,rgba(215,174,255,0.18)_102.86%)]
          data-[state=open]:border-2 data-[state=open]:border-Main-300"
                >
                  <AccordionTrigger
                    className="flex items-center md:px-6 text-left text-lg md:text-xl font-semibold
          text-neutral-200 transition-all duration-100
          data-[state=open]:text-Main-300"
                  >
                    <div className="flex items-center text-sm sm:text-base md:text-lg">
                      <img
                        src={snt}
                        alt="Logo"
                        className="h-15 w-15 md:h-15 md:w-15 flex-shrink-0"
                      />
                      {item.question}
                    </div>

                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-2 md:px-6 md:pb-4 text-neutral-200 md:text-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
                <hr className="border-t border-[#D7AEFF4D] my-2" />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
export default React.memo(FQ)
