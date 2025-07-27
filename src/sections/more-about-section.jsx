import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Atom, Brain, Globe, Lightbulb } from "lucide-react"

export default function MoreAboutSection() {
  const faqItems = [
    {
      value: "item-1",
      icon: Atom,
      question: "What kind of activities does the club offer?",
      answer:
        "We offer a wide range of activities including hands-on workshops, interactive seminars, hackathons, coding challenges, research projects, and field trips to scientific institutions. Our events cover various scientific disciplines.",
    },
    {
      value: "item-2",
      icon: Brain,
      question: "Who can join Skill & Tell?",
      answer:
        "Skill & Tell is open to all students with a passion for science and learning, regardless of their academic background or prior experience. We welcome curious minds from all fields!",
    },
    {
      value: "item-3",
      icon: Globe,
      question: "How can I contribute to the club?",
      answer:
        "There are many ways to contribute! You can join our project teams, volunteer for events, share your knowledge in workshops, or even propose new initiatives. We encourage active participation from all members.",
    },
    {
      value: "item-4",
      icon: Lightbulb,
      question: "Are there opportunities for leadership roles?",
      answer:
        "We believe in nurturing leadership skills. Members can apply for various leadership positions within the club, lead projects, or become mentors for new members.",
    },
  ]

  return (
    <section
      id="more-about"
      className="relative py-16 md:py-24 bg-space-dark text-space-text overflow-hidden"
      style={{ background: "url(/more_About.svg)" }}
    >
      {/* Blurred orange spheres */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-space-accent rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-space-subtle rounded-full mix-blend-screen filter blur-3xl opacity-8 animate-float animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="titles text-center mb-4 text-space-text animate-fade-in-up">
          More About S&T
        </h2>
        <p className="text-base md:text-lg text-center max-w-2xl mx-auto text-[#6B7280]">
          F&Q section to answer the most frequently repeated questions
        </p>
        <div className="max-w-3xl mx-auto animate-fade-in-up animation-delay-200 mt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <div key={item.value}>
                <AccordionItem
                  value={item.value}
                  className="rounded-xl bg-transparent transition-all duration-300
          data-[state=open]:bg-[linear-gradient(-97deg,_#FFC78A4D,_#D7AEFF4D)]
          data-[state=open]:border-2 data-[state=open]:border-[#D7AEFF]"
                >
                  <AccordionTrigger
                    className="flex items-center gap-4 p-4 md:p-6 text-left text-lg md:text-xl font-semibold
          text-space-text transition-all duration-300
          data-[state=open]:text-violet-500"
                  >
                    <item.icon className="h-6 w-6 md:h-7 md:w-7 text-space-accent flex-shrink-0" />
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 md:px-6 md:pb-6 text-space-text/90 text-base md:text-lg">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
                <hr className="border-t border-[#D7AEFF4D] my-4" />
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
