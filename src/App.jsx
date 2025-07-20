import Navbar from "./components/navbar.jsx"
import Footer from "./components/footer.jsx"
import HeroSection from "./components/hero-section.jsx"
import AboutSection from "./components/about-section.jsx"
import TeamSection from "./components/team-section.jsx"
import StatisticsSection from "./components/statistics-section.jsx"
import EventsSection from "./components/events-section.jsx"
import AppSection from "./components/app-section.jsx"
import MoreAboutSection from "./components/more-about-section.jsx"
import MouseSparkles from "./components/mouse-sparkles.jsx"

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
