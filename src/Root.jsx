import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainApp from "./App.jsx";
import RegistrationPage from "./sections/registration-page.jsx";

function Root() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<MainApp />} />
                <Route path="/register" element={<RegistrationPage />} />
            </Routes>
        </Router>
    );
}

export default Root;
