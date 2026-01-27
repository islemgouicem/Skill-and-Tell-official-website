import { Suspense, useState } from "react";
import Navbar from "./layout/Navbar.jsx";
import LoadingScreen from "../../components/common/Loading.jsx";
import HeroSection from "./sections/hero-section.jsx";
import MouseSparkles from "../../components/effects/mouse-sparkles.jsx";
import Footer from "./layout/Footer.jsx";
import AboutSection from "./sections/about-section.jsx";
import TeamSection from "./sections/team-section.jsx";
import DepartmentTestSection from "./sections/dep_test.jsx";
import StatisticsSection from "./sections/statistics-section.jsx";
import EventsSection from "./sections/events-section.jsx";
import AppSection from "./sections/app-section.jsx";
import FQ from "./sections/FQ-section.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);


  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-space-dark text-space-text transition-opacity duration-500">
      <MouseSparkles />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <Suspense>
          <AboutSection />
          <TeamSection />
          <StatisticsSection />
          <EventsSection />
          <AppSection />
          <DepartmentTestSection />
          <FQ />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
