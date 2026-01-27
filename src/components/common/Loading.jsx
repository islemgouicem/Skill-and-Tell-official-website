import { useEffect, useState } from "react"
import BlackHole from "./Blackhole"

const LoadingScreen = ({ onLoadingComplete }) => {
    const [visible, setVisible] = useState(() => {
        // Loader should only appear if not shown this session
        return !sessionStorage.getItem("loaderShown")
    })

    useEffect(() => {
        if (!visible) {
            // Already shown → instantly complete
            onLoadingComplete()
            return
        }

        const handleLoad = () => {
            // Add a small delay for smooth transition
            setTimeout(() => {
                sessionStorage.setItem("loaderShown", "true")
                setVisible(false)         // remove loader from DOM
                onLoadingComplete()
            }, 10000)
        }

        // Check if already loaded
        if (document.readyState === "complete") {
            handleLoad()
        } else {
            window.addEventListener("load", handleLoad)
            return () => window.removeEventListener("load", handleLoad)
        }
    }, [visible, onLoadingComplete])

    if (!visible) return null // Loader is fully removed from the DOM

    return (
        <div className="fixed inset-0 z-50">
            <BlackHole />
        </div>
    )
}

export default LoadingScreen
