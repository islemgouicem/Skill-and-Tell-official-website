"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { X, AlertCircle } from "lucide-react"

const PopUp = ({ isOpen, onClose,
    title = "Registration",
    subtitle = "Coming soon",
    msg = "Registration isn't open just yet, Stay tuned for an amazing experience!",
    color = "bg-Main-500",
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isAnimatingOut, setIsAnimatingOut] = useState(false)
    const router = useRouter()
    const theme = {
        accent: "#8A38F5",
        accentSoft: "#B573F7",
        dark: "#422352",
        deep: "#190432",
        text: "#F1E8FB",
        muted: "#B9A7D9"
    }

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            setIsAnimatingOut(false)
        }
    }, [isOpen])

    const handleClose = () => {
        setIsAnimatingOut(true)
        setTimeout(() => {
            setIsVisible(false)
            onClose()
            router.push("/")
        }, 300)
    }

    const handleBackdropClick = e => {
        if (e.target === e.currentTarget) handleClose()
    }

    if (!isVisible) return null

    return (
        <div
            onClick={handleBackdropClick}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                backgroundColor: "rgba(15, 4, 32, 0.78)",
                backdropFilter: "blur(10px)"
            }}
        >
            <div
                style={{
                    position: "relative",
                    maxWidth: "28rem",
                    width: "100%",
                    borderRadius: "1rem",
                    background:
                        `linear-gradient(145deg, ${theme.deep}, ${theme.dark})`,
                    boxShadow: "0 24px 50px -20px rgba(0, 0, 0, 0.85), 0 0 24px rgba(138, 56, 245, 0.18)",
                    overflow: "hidden",
                    transform: isAnimatingOut
                        ? "scale(0.3) translateY(-50px)"
                        : "scale(1) translateY(0)",
                    opacity: isAnimatingOut ? 0 : 1,
                    animation: isAnimatingOut
                        ? "bounceOut 0.3s ease-in-out forwards"
                        : "bounceIn 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)"
                }}
            >

                {/* Main content */}
                <div
                    style={{
                        position: "relative",
                        borderRadius: "1rem",
                        padding: "2rem",
                        background: "radial-gradient(circle at top, rgba(138,56,245,0.08) 0%, rgba(138,56,245,0.02) 35%, rgba(0,0,0,0) 80%), linear-gradient(180deg, rgba(66,35,82,0.92), rgba(25,4,50,0.97))",
                        boxShadow: "inset 0 2px 10px rgba(0,0,0,0.45)",
                        textAlign: "center"
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            padding: "0.5rem",
                            borderRadius: "9999px",
                            border: "none",
                            backgroundColor: "rgba(138,56,245,0.12)",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseOver={e =>
                            (e.currentTarget.style.backgroundColor = "rgba(138,56,245,0.24)")
                        }
                        onMouseOut={e =>
                            (e.currentTarget.style.backgroundColor = "rgba(138,56,245,0.12)")
                        }
                    >
                        <X size={20} color={theme.accent} />
                    </button>

                    {/* Icon */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1.5rem"
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "9999px",
                                    background:
                                        "linear-gradient(135deg, rgba(138,56,245,0.7), rgba(181,115,247,0.6))",
                                    opacity: 0.45,
                                    filter: "blur(10px)"
                                }}
                            />
                            <div
                                style={{
                                    position: "relative",
                                    borderRadius: "9999px",
                                    padding: "1rem",
                                    background: "linear-gradient(135deg, #5B21B6, #8A38F5)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <AlertCircle size={32} color={theme.deep} />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: theme.text,
                            marginBottom: "1rem"
                        }}
                    >
                        {title}
                        <span className="block" style={{ color: theme.muted }}>
                            {subtitle}
                        </span>
                    </h2>

                    {/* Message */}
                    <p
                        style={{
                            color: "#E4D6F5",
                            fontSize: "1rem",
                            lineHeight: 1.5,
                            marginBottom: "1.5rem"
                        }}
                    >
                        {msg}
                    </p>

                    {/* Decorative dots */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "0.5rem",
                            marginBottom: "1.5rem"
                        }}
                    >
                        <div
                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                backgroundColor: theme.accent,
                                animation: "pulse 1s infinite"
                            }}
                        />
                        <div
                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                backgroundColor: theme.accentSoft,
                                opacity: 0.7,
                                animation: "pulse 1s infinite",
                                animationDelay: "0.2s"
                            }}
                        />
                        <div
                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                backgroundColor: theme.muted,
                                opacity: 0.4,
                                animation: "pulse 1s infinite",
                                animationDelay: "0.4s"
                            }}
                        />
                    </div>

                    {/* Action button */}
                    <button
                        onClick={handleClose}
                        className="mx-auto bg-gradient-to-r from-[#8A38F5]/0 to-[#FF6D00] hover:from-space-orange-light hover:to-space-purple text-white rounded-md px-8 py-3"
                    >
                        Got it!
                    </button>
                </div>
            </div>


        </div>
    )
}

export default PopUp
