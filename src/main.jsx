import React from "react"
import ReactDOM from "react-dom/client"
import Loader from "./layout/Loader.jsx";

import App from "./App.jsx" // Your main App component
import "./index.css" // Your global CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
