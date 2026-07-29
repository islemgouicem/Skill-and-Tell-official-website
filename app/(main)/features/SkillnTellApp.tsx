import { Suspense, useState } from "react";
import Navbar from "./layout/Navbar";
import LoadingScreen from "../../components/common/Loading";
import HeroSection from "./sections/hero-section";
import MouseSparkles from "../../components/effects/mouse-sparkles";
import Footer from "./layout/Footer";
import AboutSection from "./sections/about-section";
import TeamSection from "./sections/team-section";
import DepartmentTestSection from "./sections/dep_test";
import StatisticsSection from "./sections/statistics-section";
import EventsSection from "./sections/events-section";
import AppSection from "./sections/app-section";
import FQ from "./sections/FQ-section";

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
