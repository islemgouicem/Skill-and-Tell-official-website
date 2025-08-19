"use client"

import { useEffect, useState, useCallback } from "react"

export default function Loader({ onLoadingComplete }) {
    const [progress, setProgress] = useState(0)
    const [loadingText, setLoadingText] = useState("Initializing...")

    // Move loadingSteps inside useEffect or use useMemo to make it stable
    const loadingSteps = [
        { text: "Initializing...", duration: 800, targetProgress: 20 },
        { text: "Loading components...", duration: 600, targetProgress: 45 },
        { text: "Preparing experience...", duration: 500, targetProgress: 70 },
        { text: "Almost ready...", duration: 400, targetProgress: 90 },
        { text: "Welcome to Skill&Tell!", duration: 300, targetProgress: 100 },
    ]

    // Easing function for smooth animation
    const easeOutCubic = useCallback((t) => {
        return 1 - Math.pow(1 - t, 3)
    }, [])

    useEffect(() => {
        let currentStep = 0
        let animationFrame

        const updateLoader = () => {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep]
                setLoadingText(step.text)

                const startProgress = currentStep === 0 ? 0 : loadingSteps[currentStep - 1].targetProgress
                const targetProgress = step.targetProgress
                const startTime = Date.now()

                const animateProgress = () => {
                    const elapsed = Date.now() - startTime
                    const progressRatio = Math.min(elapsed / step.duration, 1)

                    // Use easing function for smooth animation
                    const easedProgress = easeOutCubic(progressRatio)
                    const currentProgress = startProgress + (targetProgress - startProgress) * easedProgress

                    setProgress(currentProgress)

                    if (progressRatio < 1) {
                        animationFrame = requestAnimationFrame(animateProgress)
                    } else {
                        currentStep++
                        if (currentStep < loadingSteps.length) {
                            setTimeout(updateLoader, 100)
                        } else {
                            // Loading complete
                            setTimeout(() => {
                                onLoadingComplete()
                            }, 500)
                        }
                    }
                }

                animateProgress()
            }
        }

        // Start loading sequence
        setTimeout(updateLoader, 500)

        // Cleanup
        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLoadingComplete, easeOutCubic])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-space-dark">
            {/* Main loader content */}
            <div className="relative z-10 text-center">
                {/* Logo/Brand */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight text-space-text drop-shadow-lg">
                        <span
                            className="text-space-accent"
                            style={{
                                color: "#422352",
                                background: "linear-gradient(90deg,#FF6D00,#8A38F5)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextStroke: "0.06em transparent",
                                letterSpacing: "0.05em",
                            }}
                        >
                            Skill&Tell
                        </span>
                    </h1>
                </div>                

                {/* Progress percentage */}
                <div className="mb-4">
                    <span className="text-2xl font-bold text-space-text">{Math.round(progress)}%</span>
                </div>

                {/* Loading text */}
                <div className="mb-8">
                    <p className="text-lg text-space-text/80 animate-pulse">{loadingText}</p>
                </div>

                {/* Progress bar */}
                <div className="w-80 max-w-sm mx-auto">
                    <div className="w-full bg-space-subtle rounded-full h-2 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-space-accent to-space-purple rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
