import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RegisterationProvider } from "./lib/hooks/useRegistration.jsx";

// Lazy load route components
const MainApp = lazy(() => import("./apps/skillntell/SkillnTellApp.jsx"));
const RegisterationPage = lazy(() => import("./apps/skillntell/pages/RegistrationPage.jsx"));
const Registered = lazy(() => import("./apps/skillntell/pages/RegisteredPage.jsx"));
const Eunoia = lazy(() => import("./apps/eunoia/pages/EunoiaPage.jsx"));
const MobAI = lazy(() => import("./apps/mobai/pages/MobaiPage.jsx"));
const MobaiRegistration = lazy(() => import("./apps/mobai/pages/RegistrationPage.jsx"));

// Loading component
const Loading = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground">Loading...</div>
    </div>
);

function Root() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<MainApp />} />

                    <Route
                        path="/registeration"
                        element={
                            <RegisterationProvider>
                                <RegisterationPage />
                            </RegisterationProvider>
                        }
                    />

                    <Route path="/registered" element={<Registered />} />
                    <Route path="/eunoia" element={<Eunoia />} />
                    <Route path="/mobai" element={<MobAI />} />
                    <Route path="/mobai/register" element={<MobaiRegistration />} />
                    {/* <Route path="/eunoia/register" element={<EunoiaRegisteration />} /> */}
                    {/* <Route path="/eunoia/organizers" element={<OrganizerRegistration />} /> */}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default Root;
