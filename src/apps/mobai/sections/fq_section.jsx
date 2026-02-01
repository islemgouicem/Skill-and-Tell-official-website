import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion"
import faqItems from "../../../data/skillntell/faq.json"
import React from "react"

function FQ() {
    return (
        <section
            id="fq"
            className="relative w-full overflow-hidden"
        >

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Title: same style as organizers section */}
                <h2
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-red-main-500 tracking-wider mb-4 text-center"
                >
                    FAQ
                </h2>
                <p className="text-base md:text-2xl text-center text-white/90 mb-10 tracking-wide">
                    FAQ section to answer the most frequently repeated questions
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
                                    className="flex items-center w-full px-5 py-4 text-left text-base md:text-2xl font-medium text-white data-[state=open]:text-red-main-500 hover:text-red-main-500 tracking-wide [&_img]:invert [&_img]:h-4 [&_img]:w-4"
                                >
                                    <span className="flex-1 pr-3 ">{item.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-5 text-[#C0C0C0] text-sm md:text-base leading-relaxed tracking-wide">
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
