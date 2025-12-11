import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./App.jsx";
import RegisterationPage from "./pages/registration-page.jsx";
import Registered from "./pages/registered.jsx";
import Eunoia from "./pages/eunoia_page.jsx";
import EunoiaRegisteration from "./pages/eunoia_registeration.jsx";
import OrganizerRegistration from "./pages/organizers_registration.jsx";
import { RegisterationProvider } from "./lib/registerationData.jsx";

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
                {/* <Route path="/eunoia/register" element={<EunoiaRegisteration />} /> */}
                {/* <Route path="/eunoia/organizers" element={<OrganizerRegistration />} /> */}
            </Routes>
        </Router>
    );
}

export default Root;
