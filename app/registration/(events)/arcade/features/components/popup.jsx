import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import RedButton from "./TheRedButton";
const BouncingPopup = ({ isOpen, onClose, title = "Registration", subtitle = "Coming soon", msg = "Registration isn't open just yet, Stay tuned for an amazing experience!", color = "bg-accent-400", }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const arcade = {
        accent: "#A9562A",
        accentSoft: "#C7784E",
        dark: "#330001",
        deep: "#180001",
        text: "#F3E8DA",
        muted: "#77867F"
    };
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setIsAnimatingOut(false);
        }
    }, [isOpen]);
    const handleClose = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 300);
    };
    const handleBackdropClick = e => {
        if (e.target === e.currentTarget)
            handleClose();
    };
    if (!isVisible)
        return null;
    return (<div onClick={handleBackdropClick} style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(8, 1, 1, 0.78)",
            backdropFilter: "blur(10px)"
        }}>
            <div style={{
            position: "relative",
            maxWidth: "28rem",
            width: "100%",
            borderRadius: "1rem",
            background: `linear-gradient(145deg, ${arcade.deep}, ${arcade.dark})`,
            boxShadow: "0 24px 50px -20px rgba(0, 0, 0, 0.85), 0 0 24px rgba(169, 86, 42, 0.18)",
            overflow: "hidden",
            transform: isAnimatingOut
                ? "scale(0.3) translateY(-50px)"
                : "scale(1) translateY(0)",
            opacity: isAnimatingOut ? 0 : 1,
            animation: isAnimatingOut
                ? "bounceOut 0.3s ease-in-out forwards"
                : "bounceIn 0.6s cubic-bezier(0.68,-0.55,0.265,1.55)"
        }}>

                {/* Main content */}
                <div style={{
            position: "relative",
            borderRadius: "1rem",
            padding: "2rem",
            background: "radial-gradient(circle at top, rgba(169,86,42,0.08) 0%, rgba(169,86,42,0.02) 35%, rgba(0,0,0,0) 80%), linear-gradient(180deg, rgba(51,0,1,0.92), rgba(24,0,1,0.97))",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.45)",
            textAlign: "center"
        }}>
                    {/* Close button */}
                    <button onClick={handleClose} style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.5rem",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "rgba(169,86,42,0.12)",
            cursor: "pointer",
            transition: "all 0.2s"
        }} onMouseOver={e => (e.currentTarget.style.backgroundColor = "rgba(169,86,42,0.24)")} onMouseOut={e => (e.currentTarget.style.backgroundColor = "rgba(169,86,42,0.12)")}>
                        <X size={20} color={arcade.accent}/>
                    </button>

                    {/* Icon */}
                    <div style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem"
        }}>
                        <div style={{ position: "relative" }}>
                            <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            background: "linear-gradient(135deg, rgba(169,86,42,0.7), rgba(199,120,78,0.6))",
            opacity: 0.45,
            filter: "blur(10px)"
        }}/>
                            <div style={{
            position: "relative",
            borderRadius: "9999px",
            padding: "1rem",
            background: "linear-gradient(135deg, #8D3F1F, #B56136)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
                                <AlertCircle size={32} color={arcade.dark}/>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: arcade.text,
            marginBottom: "1rem"
        }}>
                        {title}
                        <span className="block" style={{ color: arcade.muted }}>
                            {subtitle}
                        </span>
                    </h2>

                    {/* Message */}
                    <p style={{
            color: "#E8D6C2",
            fontSize: "1rem",
            lineHeight: 1.5,
            marginBottom: "1.5rem"
        }}>
                        {msg}
                    </p>

                    {/* Decorative dots */}
                    <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem"
        }}>
                        <div style={{
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "50%",
            backgroundColor: arcade.accent,
            animation: "pulse 1s infinite"
        }}/>
                        <div style={{
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "50%",
            backgroundColor: arcade.accentSoft,
            opacity: 0.7,
            animation: "pulse 1s infinite",
            animationDelay: "0.2s"
        }}/>
                        <div style={{
            width: "0.5rem",
            height: "0.5rem",
            borderRadius: "50%",
            backgroundColor: arcade.muted,
            opacity: 0.4,
            animation: "pulse 1s infinite",
            animationDelay: "0.4s"
        }}/>
                    </div>

                    {/* Action button */}
                    <RedButton textContent="Got it!" pageName={handleClose} className="mx-auto scale-[0.88] sm:scale-95" textClassName="text-[1.8rem] sm:text-[2rem]"/>
                </div>
            </div>


        </div>);
};
export default BouncingPopup;
