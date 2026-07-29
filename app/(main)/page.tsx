"use client"
import { Suspense, useState } from "react";
import LoadingScreen from "../../components/common/Loading"
import HeroSection from "./features/sections/hero-section";
import MouseSparkles from "../../components/effects/mouse-sparkles";
import AboutSection from "./features/sections/about-section";
import TeamSection from "./features/sections/team-section";
import DepartmentTestSection from "./features/sections/dep_test";
import StatisticsSection from "./features/sections/statistics-section";
import EventsSection from "./features/sections/events-section";
import AppSection from "./features/sections/app-section";
import FQ from "./features/sections/FQ-section";

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
    </div>
  );
}

export default App;
