import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion"
import faqItems from "../../../data/skillntell/faq.json"
import React from "react"

function FQ() {
    return (
        <section
            id="fq"
            className="relative py-10 lg:py-14 w-full overflow-hidden"
        >

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Title: same style as organizers section */}
                <h2
                    className="text-4xl sm:text-5xl text-red-main-500 lg:text-6xl font-semibold uppercase tracking-[0.2em] mb-3 text-center"
                >
                    F&Q
                </h2>
                <p className="text-base md:text-lg text-center max-w-2xl mx-auto text-white/90 mb-10 tracking-wide">
                    F&Q section to answer the most frequently repeated questions
                </p>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-0">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={item.value}
                                value={item.value}
                                className={`
                                    border-b border-white/20 last:border-b-0
                                    data-[state=open]:bg-[linear-gradient(97deg,rgba(255,0,6,0.24),rgba(255,196,198,0.36))]
                                    data-[state=open]:border data-[state=open]:border-[#FFC4C6]
                                    rounded-sm transition-all duration-200
                                `}
                            >
                                <AccordionTrigger
                                    className="flex items-center w-full px-5 py-4 text-left text-base md:text-lg font-medium text-white data-[state=open]:text-red-main-500 hover:text-red-main-500 tracking-wide [&_img]:invert [&_img]:h-4 [&_img]:w-4"
                                >
                                    <span className="flex-1 pr-3 ">{item.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-5 pb-4 text-[#C0C0C0] text-sm md:text-base leading-relaxed tracking-wide">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default React.memo(FQ)
