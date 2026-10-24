"use client";
import { useRef } from "react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useReveals } from "@/components/motion/useReveals";
import faqItems from "@/data/skillntell/faq.json";
import snt from "@/assets/images/shared/snt_mark.png";

export default function Faq({ items = faqItems, title = "More About S&T", subtitle = "F&Q section to answer the most frequently repeated questions", id = "FQ", index = "07", transparent = false }) {
  const root = useRef(null);
  useReveals(root);

  return (
    <section ref={root} id={id} className="relative overflow-hidden py-24 md:py-32" style={transparent ? undefined : { backgroundImage: "url('/images/bg/more-about.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span data-reveal="fade" className="snt-eyebrow">{index} , Questions</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">{title}</h2>
          <p data-reveal="up" className="mt-5 max-w-sm text-white/60">{subtitle}</p>
        </div>
        <div data-reveal-stagger className="lg:col-span-7">
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="mb-3 rounded-2xl border border-white/10 bg-white/[0.03] px-2 backdrop-blur transition-all duration-300 data-[state=open]:border-Main-300 data-[state=open]:bg-[linear-gradient(89deg,rgba(255,199,138,0.16)_-1%,rgba(215,174,255,0.16)_103%)]"
              >
                <AccordionTrigger className="py-3 text-left font-futura_md_bt text-base text-neutral-200 data-[state=open]:text-Main-300 md:px-3 md:text-lg">
                  <span className="flex items-center gap-2">
                    <Image src={snt} alt="" sizes="28px" className="mx-2 h-7 w-auto shrink-0" />
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 text-neutral-200/90 md:px-6 md:text-base">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
