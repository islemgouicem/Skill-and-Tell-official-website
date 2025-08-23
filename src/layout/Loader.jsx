import { useEffect, useState } from "react"

const BlackHoleLoader = ({ onLoadingComplete }) => {
    const [isVisible, setIsVisible] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval)
                    setTimeout(() => {
                        setIsVisible(false)
                        onLoadingComplete()
                    }, 500)
                    return 100
                }
                return prev + Math.random() * 10
            })
        }, 150)

        return () => clearInterval(progressInterval)
    }, [onLoadingComplete])

    // if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "hsl(240, 15%, 5%)" }}>

            {/* Starfield Background */}
            <div className="absolute inset-0">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-particle-float"
                        style={{
                            backgroundColor: "hsl(280, 90%, 70%)",
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            opacity: Math.random() * 0.8 + 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Main Black Hole Container */}
            <div className="relative flex items-center justify-center">
                {/* Outer Matter Ring */}
                <div className="absolute w-80 h-80 rounded-full animate-matter-orbit"
                    style={{ border: "1px solid hsla(270, 80%, 65%, 0.3)" }}>
                    <div className="w-4 h-4 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2 shadow-lg"
                        style={{ backgroundColor: "hsl(280, 90%, 70%)", boxShadow: "0 0 10px hsl(280,90%,70%)" }} />
                    <div className="w-3 h-3 rounded-full absolute top-1/2 -right-1 transform -translate-y-1/2 shadow-lg"
                        style={{ backgroundColor: "hsl(270, 80%, 65%)", boxShadow: "0 0 10px hsl(270,80%,65%)" }} />
                    <div className="w-2 h-2 rounded-full absolute -bottom-1 left-1/4 shadow-lg"
                        style={{ backgroundColor: "hsl(280, 90%, 70%)", boxShadow: "0 0 6px hsl(280,90%,70%)" }} />
                </div>

                {/* Inner Matter Ring */}
                <div className="absolute w-64 h-64 rounded-full animate-matter-orbit-reverse"
                    style={{ border: "1px solid hsla(280, 90%, 70%, 0.4)" }}>
                    <div className="w-3 h-3 rounded-full absolute -top-1 right-1/4 shadow-lg"
                        style={{ backgroundColor: "hsl(280,90%,70%)", boxShadow: "0 0 8px hsl(280,90%,70%)" }} />
                    <div className="w-4 h-4 rounded-full absolute top-1/3 -left-2 shadow-lg"
                        style={{ backgroundColor: "hsl(270,80%,65%)", boxShadow: "0 0 8px hsl(270,80%,65%)" }} />
                    <div className="w-2 h-2 rounded-full absolute -bottom-1 right-1/3 shadow-lg"
                        style={{ backgroundColor: "hsl(280,90%,70%)", boxShadow: "0 0 6px hsl(280,90%,70%)" }} />
                </div>

                {/* Accretion Disk */}
                <div className="absolute w-48 h-48 rounded-full animate-black-hole-spin"
                    style={{ background: "linear-gradient(to right, transparent, hsla(270,80%,65%,0.2), transparent)" }}>
                    <div className="absolute inset-0 rounded-full animate-black-hole-spin"
                        style={{
                            background: "linear-gradient(to right, hsla(280,90%,70%,0.3), transparent, hsla(270,80%,65%,0.3))",
                            animationDirection: "reverse"
                        }} />
                </div>

                {/* Event Horizon */}
                <div className="absolute w-32 h-32 rounded-full animate-void-pulse border-2"
                    style={{
                        background: "radial-gradient(circle, hsl(240,100%,2%), hsl(270,60%,15%), hsl(240,100%,2%))",
                        borderColor: "hsla(280,90%,70%,0.5)"
                    }}>
                    <div className="absolute -inset-4 rounded-full animate-void-pulse"
                        style={{ backgroundColor: "hsla(280,90%,70%,0.1)", animationDelay: "0.5s" }} />
                    <div className="absolute -inset-8 rounded-full animate-void-pulse"
                        style={{ backgroundColor: "hsla(280,90%,70%,0.05)", animationDelay: "1s" }} />
                </div>

                {/* Black Hole Core */}
                <div className="w-20 h-20 rounded-full relative overflow-hidden"
                    style={{ backgroundColor: "hsl(240,100%,2%)", border: "1px solid hsla(280,90%,70%,0.3)" }}>
                    <div className="absolute inset-0 animate-black-hole-spin"
                        style={{
                            background: "radial-gradient(circle, transparent, hsl(240,100%,2%), hsl(240,100%,2%))"
                        }} />
                </div>

                {/* Gravitational Lensing */}
                <div className="absolute w-96 h-96 rounded-full animate-pulse"
                    style={{ border: "1px solid hsla(280,90%,70%,0.1)" }} />
                <div className="absolute w-[28rem] h-[28rem] rounded-full animate-pulse"
                    style={{ border: "1px solid hsla(270,80%,65%,0.05)", animationDelay: "1s" }} />
            </div>

            {/* Loading Text */}
            <div className="absolute bottom-20 text-center">
                <div className="text-2xl font-light mb-4 animate-pulse"
                    style={{ color: "hsl(280,90%,70%)" }}>
                    ENTERING THE VOID
                </div>
                <div className="w-64 h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "hsl(270,60%,15%)" }}>
                    <div className="h-full rounded-full shadow-lg transition-all duration-300"
                        style={{
                            width: `${loadingProgress}%`,
                            background: "linear-gradient(to right, hsl(270,80%,65%), hsl(280,90%,70%))",
                            boxShadow: "0 0 6px hsl(280,90%,70%)"
                        }} />
                </div>
                <div className="text-sm mt-2 font-mono"
                    style={{ color: "hsl(270,80%,65%)" }}>
                    {Math.round(loadingProgress)}%
                </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-particle-float"
                        style={{
                            backgroundColor: "hsl(280,90%,70%)",
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default BlackHoleLoader
