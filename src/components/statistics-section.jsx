import { Users, CalendarDays, FlaskConical, Star } from "lucide-react"

export default function StatisticsSection() {
  const stats = [
    { icon: Users, value: "534+", label: "Active Members" },
    { icon: CalendarDays, value: "400+", label: "Events Hosted" },
    { icon: FlaskConical, value: "50+", label: "Research Projects" },
    { icon: Star, value: "5+", label: "Years of Excellence" },
  ]

  return (
    <section id="statistics" className="relative py-16 md:py-24 bg-[#F7F0FF] text-space-text overflow-hidden">
      <div className="grid-pattern"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#222631] animate-fade-in-up">
          Some Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-space-light p-8 rounded-xl shadow-xl border border-space-subtle flex flex-col items-center text-center hover:shadow-space-glow/40 transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className="h-16 w-16 text-space-accent mb-4 animate-float" />
              <p className="text-5xl font-extrabold text-space-glow mb-2">{stat.value}</p>
              <p className="text-xl text-space-text/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
