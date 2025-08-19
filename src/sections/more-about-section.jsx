import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import gurl from "../lib/image-util.js"
import React from 'react'

function MoreAboutSection() {
  const faqItems = [
    {
      value: "item-1",
      question: "What kind of activities does the club offer?",
      answer:
        "We offer a wide range of activities including hands-on workshops, interactive seminars, hackathons, coding challenges, research projects, and field trips to scientific institutions. Our events cover various scientific disciplines.",
    },
    {
      value: "item-2",
      question: "Who can join Skill & Tell?",
      answer:
        "Skill & Tell is open to all students with a passion for science and learning, regardless of their academic background or prior experience. We welcome curious minds from all fields!",
    },
    {
      value: "item-3",
      question: "How can I contribute to the club?",
      answer:
        "There are many ways to contribute! You can join our project teams, volunteer for events, share your knowledge in workshops, or even propose new initiatives. We encourage active participation from all members.",
    },
    {
      value: "item-4",
      question: "Are there opportunities for leadership roles?",
      answer:
        "We believe in nurturing leadership skills. Members can apply for various leadership positions within the club, lead projects, or become mentors for new members.",
    },
  ]

  return (
    <section
      id="more-about"
      className="relative py-16 md:py-24 bg-space-dark text-space-text overflow-hidden"
      style={{ background: `url(${gurl('images/more_About.svg')})` }}
    >

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="titles text-center mb-4 text-space-text animate-fade-in-up">
          More About S&T
        </h2>
        <p className="text-base md:text-lg text-center max-w-2xl mx-auto text-[#6B7280]">
          F&Q section to answer the most frequently repeated questions
        </p>
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-200 mt-6 py-0">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <div key={item.value}>
                <AccordionItem
                  value={item.value}
                  className="rounded-sm bg-transparent transition-all duration-100
          data-[state=open]:bg-[linear-gradient(89.06deg,rgba(255,199,138,0.18)_-0.9%,rgba(215,174,255,0.18)_102.86%)]
          data-[state=open]:border-2 data-[state=open]:border-Main-300"
                >
                  <AccordionTrigger
                    className="flex items-center md:px-6 text-left text-lg md:text-xl font-semibold
          text-space-text transition-all duration-100
          data-[state=open]:text-violet-500"
                  >
                    <img
                      src={gurl("images/snt.svg")}
                      alt="Logo"
                      className="h-15 w-15 md:h-15 md:w-15 flex-shrink-0"
                    />
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 md:px-6 md:pb-6 text-space-text/90 text-base md:text-lg">
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
export default React.memo(MoreAboutSection)
