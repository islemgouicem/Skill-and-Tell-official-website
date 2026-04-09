import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { RegisterationProvider } from "./lib/hooks/useRegistration.jsx";

// Lazy load route components
const MainApp = lazy(() => import("./apps/skillntell/SkillnTellApp.jsx"));
const RegisterationPage = lazy(() => import("./apps/skillntell/pages/RegistrationPage.jsx"));
const Registered = lazy(() => import("./apps/skillntell/pages/RegisteredPage.jsx"));
const Eunoia = lazy(() => import("./apps/eunoia/pages/EunoiaPage.jsx"));
const MobAI = lazy(() => import("./apps/mobai/pages/MobaiPage.jsx"));
const Arcade = lazy(() => import("./apps/arcade/pages/arcade_page.jsx"));

const ArcadeRegistration = lazy(() => import("./apps/arcade/pages/registration_page.jsx"));
const ArcadeOrganizersReg = lazy(() => import("./apps/arcade/pages/organizers_reg.jsx"));

// const MobaiRegistration = lazy(() => import("./apps/mobai/pages/RegistrationPage.jsx"));
// const MobaiOrganizersReg = lazy(() => import("./apps/mobai/pages/OrganizersRegPage.jsx"));

// Loading component
const Loading = () => (
    <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-foreground">Loading...</div>
    </div>
);

const ScrollbarThemeManager = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const isArcadeRoute = pathname.startsWith("/arcade");

        document.documentElement.classList.toggle("arcade-active", isArcadeRoute);
        document.body.classList.toggle("arcade-active", isArcadeRoute);
    }, [pathname]);

    return null;
};

function Root() {
    return (
        <Router>
            <ScrollbarThemeManager />
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
                    <Route path="/arcade" element={<Arcade />} />

                    <Route path="/arcade/register" element={<ArcadeRegistration />} />
                    <Route path="/arcade/organizers" element={<ArcadeOrganizersReg />} />

                    {/* <Route path="/mobai/register" element={<MobaiRegistration />} /> */}
                    {/* <Route path="/mobai/organizers" element={<MobaiOrganizersReg />} /> */}
                    {/* <Route path="/eunoia/register" element={<EunoiaRegisteration />} /> */}
                    {/* <Route path="/eunoia/organizers" element={<OrganizerRegistration />} /> */}
                </Routes>
            </Suspense>
        </Router>
    );
}

export default Root;
