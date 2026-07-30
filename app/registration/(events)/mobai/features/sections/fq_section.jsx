import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/accordion";
import faqItems from "@/data/mobai/fq.json";
import React from "react";
function FQ() {
    return (<section id="fq" className="relative w-full overflow-hidden mb-20">

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Title: same style as organizers section */}
                <h2 className="title mb-4 text-center">
                    FAQ
                </h2>
                <p className="text-base md:text-xl text-center text-white/90 mb-10 tracking-wide font-futura_lt_bt">
                    FAQ section to answer the most frequently repeated questions
                </p>

                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-0">
                        {faqItems.map((item, index) => (<AccordionItem key={item.value} value={item.value} className={`
                                    border-b border-white/20 last:border-b-0
                                    rounded-sm transition-all duration-200
                                `}>
                                <AccordionTrigger className="flex items-center w-full px-5 py-4 text-left text-base md:text-lg font-medium text-[#fdfdfd] hover:text-red-main-500 tracking-wide [&_img]:invert [&_img]:h-4 [&_img]:w-4">
                                    <span className="flex-1 pr-3 font-futura_md_bt">{item.question}</span>
                                </AccordionTrigger>
                                <AccordionContent className="px-5 text-[#FDFDFDBF] text-sm md:text-base leading-relaxed">
                                    <p className="font-futura_lt_bt">{item.answer}</p>
                                </AccordionContent>
                            </AccordionItem>))}
                    </Accordion>
                </div>
            </div>
        </section>);
}
export default React.memo(FQ);
