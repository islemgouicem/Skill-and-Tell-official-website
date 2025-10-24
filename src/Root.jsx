import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./App.jsx";
import RegistrationPage from "./sections/registration-page.jsx";
import Registered from "./sections/registered.jsx";
import { RegistrationProvider } from "./lib/registerationData.jsx";

function Root() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<MainApp />} />

                <Route
                    path="/registeration"
                    element={
                        <RegistrationProvider>
                            <RegistrationPage />
                        </RegistrationProvider>
                    }
                />

                <Route path="/registered" element={<Registered />} />
            </Routes>
        </Router>
    );
}

export default Root;
