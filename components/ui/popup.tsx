import { useState, useEffect } from "react"
import { X, AlertCircle } from "lucide-react"

const BouncingPopup = ({ isOpen, onClose,
    title = "Registration",
    subtitle = "Comming soon",
    msg = "Registration isn't open just yet, Stay tuned for an amazing experience!",
    color = "bg-accent-400",
}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [isAnimatingOut, setIsAnimatingOut] = useState(false)

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
                backgroundColor: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(12px)"
            }}
        >
            <div
                style={{
                    position: "relative",
                    maxWidth: "28rem",
                    width: "100%",
                    borderRadius: "1rem",
                    border: "1px solid hsl(250,60%,18%)",
                    background:
                        "linear-gradient(145deg, hsl(250,80%,12%), hsl(250,60%,18%))",
                    boxShadow: "0 25px 50px -12px hsl(250,100%,8% / 0.8)",
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
                    className="bg-Main-700"
                    style={{
                        position: "relative",
                        borderRadius: "1rem",
                        padding: "2rem",
                        boxShadow: "inset 0 2px 4px hsl(250,100%,8% / 0.6)",
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
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
                        onMouseOver={e =>
                            (e.currentTarget.style.backgroundColor = "rgba(250,60%,18%,0.7)")
                        }
                        onMouseOut={e =>
                            (e.currentTarget.style.backgroundColor = "rgba(250,60%,18%,0.5)")
                        }
                    >
                        <X size={20} color={`${color == null ? "hsl(25,100%,60%)": "#ff0006"}`} />
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
                                        "linear-gradient(135deg, hsl(25,100%,60%), hsl(25,100%,70%))",
                                    opacity: 0.6,
                                    filter: "blur(10px)"
                                }}
                            />
                            <div
                                className={`${color == null ? "bg-accent-500": color}`}

                                style={{
                                    position: "relative",
                                    borderRadius: "9999px",
                                    padding: "1rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <AlertCircle size={32} />
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "white",
                            marginBottom: "1rem"
                        }}
                    >
                        {title}
                        <span className={`block ${color == null ? "text-accent-500": "text-red-main-500"}`}>
                            {subtitle}
                        </span>
                    </h2>

                    {/* Message */}
                    <p
                        className="text-white"
                        style={{
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
                            className={`${color == null ? "bg-accent-500": color}`}
                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                animation: "pulse 1s infinite"
                            }}
                        />
                        <div
                            className={color}
                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                opacity: 0.7,
                                animation: "pulse 1s infinite",
                                animationDelay: "0.2s"
                            }}
                        />
                        <div
                            className={`${color == null ? "bg-accent-500": color}`}

                            style={{
                                width: "0.5rem",
                                height: "0.5rem",
                                borderRadius: "50%",
                                opacity: 0.4,
                                animation: "pulse 1s infinite",
                                animationDelay: "0.4s"
                            }}
                        />
                    </div>

                    {/* Action button */}
                    <button
                        onClick={handleClose}
                        className="text-white bg-red-main-500"
                        style={{
                            width: "100%",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "1rem",
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            boxShadow: "0 2px 8px -2px hsl(250,100%,8% / 0.2)",
                            transition: "all 0.3s"
                        }}
                        onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}

                    >
                        Got it!
                    </button>
                </div>
            </div>


        </div>
    )
}

export default BouncingPopup
