import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./apps/skillntell/SkillnTellApp.jsx";
import RegisterationPage from "./apps/skillntell/pages/RegistrationPage.jsx";
import Registered from "./apps/skillntell/pages/RegisteredPage.jsx";
import Eunoia from "./apps/eunoia/pages/EunoiaPage.jsx";
import MobAI from "./apps/mobai/pages/MobaiPage.jsx";
import EunoiaRegisteration from "./apps/eunoia/pages/RegistrationPage.jsx";
import OrganizerRegistration from "./apps/eunoia/pages/OrganizersPage.jsx";
import { RegisterationProvider } from "./lib/hooks/useRegistration.jsx";

function Root() {
    return (
        <Router>
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
                {/* <Route path="/eunoia/register" element={<EunoiaRegisteration />} /> */}
                {/* <Route path="/eunoia/organizers" element={<OrganizerRegistration />} /> */}
            </Routes>
        </Router>
    );
}

export default Root;
