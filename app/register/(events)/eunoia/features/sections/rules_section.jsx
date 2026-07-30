"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion_eunoia";
import rules from "@/data/eunoia/rules.json";
import Image from "next/image";
const Rules = () => {
    return (<section className="relative w-full overflow-hidden py-20" id="rules">
            {/* Title */}
            <h2 className="text-4xl md:text-6xl eunoia-title py-2 text-center ">
                Q&A
                <div className="w-full h-[1px] mx-auto max-w-[250px] mt-5 mb-4 bg-gradient-to-r from-gold/0 via-gold to-gold/0"></div>
            </h2>

            <div className="container mx-auto px-8 md:px-6 relative z-10">
                <p className="text-base md:text-lg text-center max-w-2xl mx-auto text-[#999999]">
                    Everything you need to know about EUNOIA
                </p>
                <div className="max-w-3xl mx-auto my-10 py-0">
                    <Accordion type="single" collapsible className="w-full">
                        {rules.map((item) => (<div key={item.value}>
                                <AccordionItem value={item.value} className="pointer rounded-sm bg-transparent transition-all duration-100">
                                    <AccordionTrigger className="flex items-center md:px-6 text-left text-lg md:text-xl font-semibold
        text-neutral-200 transition-all duration-100
        data-[state=open]:text-gold">
                                        <div className="flex items-center text-sm sm:text-base md:text-lg">
                                            {item.question}
                                        </div>

                                    </AccordionTrigger>
                                    <AccordionContent className="whitespace-pre-line px-4 pb-2 md:px-6 md:pb-4 text-neutral-200 md:text-lg">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="border-t border-gold/80 my-2"/>
                            </div>))}
                    </Accordion>
                </div>
            </div>

            {/* Footer Decorative Line */}
            <Image height={400} width={300} onClick={() => {
            document.getElementById("organizers")?.scrollIntoView({ behavior: "smooth" });
        }} className="absolute cursor-pointer left-[calc(50%_-_46px)] bottom-[26px] w-[94px] h-[30px]" alt="Line" src="/images/down_arrow.svg"/>

            {/* Corner Decorative Groups */}
            <Image height={400} width={300} className="absolute top-2 left-3 w-20 h-auto rotate-180
            sm:top-3 sm:left-4 sm:w-24
            md:top-4 md:left-6 md:w-32
            lg:top-5 lg:left-8 lg:w-40" alt="Group" src="/images/corners.svg"/>
            <Image height={400} width={300} className="absolute bottom-2 right-3 w-20 h-auto
            sm:bottom-3 sm:right-4 sm:w-24
            md:bottom-4 md:right-6 md:w-32
            lg:bottom-5 lg:right-8 lg:w-40" alt="Group" src="/images/corners.svg"/>

            <Image height={400} width={300} src="/images/shadow.svg" alt="Shadow" className="
                        absolute
                        -top-40 -right-40
                        sm:-top-48 sm:-right-48
                        lg:-top-60 lg:-right-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "/>

            {/* Bottom shadow */}
            <Image height={400} width={300} src="/images/shadow.svg" alt="Shadow" className="
                        absolute
                        -bottom-40 -left-40
                        sm:-bottom-48 sm:-left-48
                        lg:-bottom-60 lg:-left-60
                        w-[400px] sm:w-[450px] lg:w-[620px]
                        pointer-events-none
                    "/>
        </section>);
};
export default Rules;
