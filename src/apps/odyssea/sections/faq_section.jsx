import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import CompassDivider from "../components/CompassDivider";
import Reveal from "../components/Reveal";
import faqs from "../../../data/odyssea/faq.json";
import flourish from "../../../assets/images/odyssea/flourish.webp";

function FaqSection({ parchmentImg }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="ody-parchment relative px-5 pb-28 pt-16 text-ody-ink sm:px-8 sm:pt-20 lg:pb-36"
      style={{ "--ody-parchment-img": `url(${parchmentImg})` }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <CompassDivider tone="ink" star="w-8 sm:w-10" />
          <h2 className="ody-display mt-5 text-center text-[clamp(2.1rem,7.2vw,4.9rem)] leading-none text-ody-ink [text-shadow:0_1px_0_rgba(1,27,42,0.6)]">
            WHAT YOU NEED TO KNOW
          </h2>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.32fr_0.68fr] lg:gap-6">
          <Reveal delay={80}>
            <div className="ody-faq-card rounded-2xl px-5 py-7 sm:px-9 sm:py-9">
              <h3 className="ody-display text-4xl text-ody-gold sm:text-5xl">FAQ</h3>

              <div className="mt-6 border-t border-ody-gold/35">
                {faqs.map((item, index) => {
                  const open = openIndex === index;
                  return (
                    <div key={item.q} className="border-b border-ody-gold/35">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? -1 : index)}
                        aria-expanded={open}
                        aria-controls={`odyssea-faq-${index}`}
                        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 text-left"
                      >
                        <span
                          className={`text-[0.98rem] font-semibold transition-colors duration-300 sm:text-[1.05rem] ${
                            open ? "text-ody-gold" : "text-white hover:text-ody-gold"
                          }`}
                        >
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-ody-gold transition-transform duration-400 ${
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
                          <p className="pb-5 pr-8 text-[0.88rem] leading-6 text-white/68">
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

          <Reveal delay={150} className="flex justify-center">
            <img
              src={flourish}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="ody-float w-44 select-none sm:w-56 lg:w-auto lg:max-h-[30rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default React.memo(FaqSection);
