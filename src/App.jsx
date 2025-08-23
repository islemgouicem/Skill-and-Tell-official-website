import { useState, Suspense, lazy } from "react"
import Navbar from "./layout/navbar.jsx"
import HeroSection from "./sections/hero-section.jsx"
import MouseSparkles from "./components/effects/mouse-sparkles.jsx"
const Footer = lazy(() => import("./layout/footer.jsx"));
const AboutSection = lazy(() => import("./sections/about-section.jsx"));
const TeamSection = lazy(() => import("./sections/team-section.jsx"));
const StatisticsSection = lazy(() => import("./sections/statistics-section.jsx"));
const EventsSection = lazy(() => import("./sections/events-section.jsx"));
const AppSection = lazy(() => import("./sections/app-section.jsx"));
const MoreAboutSection = lazy(() => import("./sections/more-about-section.jsx"));
const RegistrationPage = lazy(() => import("./sections/registration-page.jsx"));

function App() {
  const [showRegistration, setShowRegistration] = useState(false)

  const handleRegisterClick = () => setShowRegistration(true)
  const handleBackToHome = () => setShowRegistration(false)

  if (showRegistration) {
    return <RegistrationPage onBack={handleBackToHome} />
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-space-dark text-space-text transition-opacity duration-500 "
    >
      <MouseSparkles/>
      <Navbar />
      <main className="flex-1">
        <HeroSection onRegisterClick={handleRegisterClick} />
        <Suspense>
          <AboutSection />
          <TeamSection />
          <StatisticsSection />
          <EventsSection />
          <AppSection />
          <MoreAboutSection />
        </Suspense>
      </main>
      <Footer />
    </div >
  )
}

export default App
