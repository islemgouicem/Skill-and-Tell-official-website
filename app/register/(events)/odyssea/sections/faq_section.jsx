import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import faqs from "@/data/odyssea/faq.json";
import Display from "../components/Display";
import Image from "next/image";
import flourish from "@/assets/images/odyssea/flourish.webp";

function FaqSection({ parchmentImg }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="ody-parchment relative -mt-px px-5 pb-28 pt-16 text-ody-ink sm:px-8 sm:pt-20 lg:pb-40"
      style={{ "--ody-parchment-img": `url(${parchmentImg})` }}
    >
      <div className="mx-auto max-w-[1360px]">
        {/* the rules run the full width of the heading beneath them */}
        <Reveal>
          <SectionTitle>WHAT YOU NEED TO KNOW</SectionTitle>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.42fr_0.58fr] lg:gap-8">
          <Reveal delay={80}>
            <div className="ody-faq-card rounded-2xl px-6 py-8 sm:px-10 sm:py-10">
              <h3 className="ody-display ody-weighted text-[2.6rem] leading-none text-ody-title sm:text-[3.5rem]">
                <Display>FAQ</Display>
              </h3>

              <div className="mt-7 border-t border-ody-title/60">
                {faqs.map((item, index) => {
                  const open = openIndex === index;
                  return (
                    <div key={item.q} className="border-b border-ody-title/60">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? -1 : index)}
                        aria-expanded={open}
                        aria-controls={`odyssea-faq-${index}`}
                        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-6 text-left"
                      >
                        <span
                          className={`ody-display text-[1.45rem] tracking-[0.02em] transition-colors duration-300 sm:text-[1.8rem] ${
                            open ? "text-ody-title" : "text-ody-white hover:text-ody-title"
                          }`}
                        >
                          <Display>{item.q}</Display>
                        </span>
                        <ChevronDown
                          className={`h-7 w-7 shrink-0 text-ody-title transition-transform duration-400 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className="ody-faq-answer"
                        data-open={open}
                        id={`odyssea-faq-${index}`}
                        role="region"
                      >
                        <div>
                          <p className="pb-6 pr-6 text-[1.05rem] leading-[1.45] text-ody-white/80 sm:text-[1.25rem]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <Image
              src={flourish}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="ody-float w-56 select-none sm:w-72 lg:w-[28vw] lg:max-w-[28rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default React.memo(FaqSection);
