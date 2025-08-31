import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("./layout/navbar.jsx"));
// import LoadingScreen from "./layout/Loading.jsx";
const HeroSection = lazy(() => import("./sections/hero-section.jsx"));
const MouseSparkles = lazy(() => import("./components/effects/mouse-sparkles.jsx"));
const Footer = lazy(() => import("./layout/footer.jsx"));
const AboutSection = lazy(() => import("./sections/about-section.jsx"));
const TeamSection = lazy(() => import("./sections/team-section.jsx"));
const StatisticsSection = lazy(() => import("./sections/statistics-section.jsx"));
const EventsSection = lazy(() => import("./sections/events-section.jsx"));
const AppSection = lazy(() => import("./sections/app-section.jsx"));
const FQ = lazy(() => import("./sections/more-about-section.jsx"));

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // const handleLoadingComplete = () => {
  //   setIsLoading(false);
  // };

  // if (isLoading) {
  //   return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  // }

  return (
    <div className="min-h-screen flex flex-col bg-space-dark text-space-text transition-opacity duration-500">
      <MouseSparkles />
      <Navbar />
      <main className="flex-1">
        <HeroSection onRegisterClick={handleRegisterClick} />
        <Suspense>
          <AboutSection />
          <TeamSection />
          <StatisticsSection />
          <EventsSection />
          <AppSection />
          <FQ />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
