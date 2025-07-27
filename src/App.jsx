import Navbar from "./layout/navbar.jsx"
import Footer from "./layout/footer.jsx"
import HeroSection from "./sections/hero-section.jsx"
import AboutSection from "./sections/about-section.jsx"
import TeamSection from "./sections/team-section.jsx"
import StatisticsSection from "./sections/statistics-section.jsx"
import EventsSection from "./sections/events-section.jsx"
import AppSection from "./sections/app-section.jsx"
import MoreAboutSection from "./sections/more-about-section.jsx"
import MouseSparkles from "./components/effects/mouse-sparkles.jsx"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-space-dark text-space-text">
      <MouseSparkles />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <StatisticsSection />
        <EventsSection />
        <AppSection />
        <MoreAboutSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
