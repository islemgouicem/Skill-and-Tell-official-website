import cardBg from "../../../assets/images/mobai/cardbg.svg"
import { useEffect, useState } from "react"

const CyberCard = ({ children, className = "" }) => {
    const getPolygonShape = (width = 1024) => {
        const innerCorner = width <= 640 ? "20% 0%, 25% 2%, 30% 0%" : "20% 0%, 23% 3%, 26% 0%"
        return `polygon(
            0% 24px,
            24px 0%,
            ${innerCorner},
            calc(100% - 24px) 0%,
            100% 24px,
            100% calc(100% - 24px),
            calc(100% - 24px) 100%,
            24px 100%,
            0% calc(100% - 24px)
        )`
    }

    const [polygonShape, setPolygonShape] = useState(() =>
        typeof window === "undefined" ? getPolygonShape() : getPolygonShape(window.innerWidth)
    )

    useEffect(() => {
        const handleResize = () => setPolygonShape(getPolygonShape(window.innerWidth))
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <div className={`relative ${className}`}>
            {/* Lens flare - Top Right Corner */}
            <div
                className="absolute top-25 -right-4 pointer-events-none z-30"
                style={{
                    width: "35px",
                    height: "100px",
                    background: "radial-gradient(ellipse at 50% 50%, rgba(193, 177, 193, 1) 0%, rgba(193, 177, 193, 0.9) 15%, rgba(193, 177, 193, 0.3) 35%, transparent 65%)",
                    filter: "blur(2px)",
                    borderRadius: "50%"
                }}
            />

            {/* Lens flare - Bottom Left Corner */}
            <div
                className="absolute -bottom-4 left-20 pointer-events-none z-30"
                style={{
                    width: "100px",
                    height: "40px",
                    background: "radial-gradient(ellipse at 50% 50%, rgba(193, 177, 193, 1) 0%, rgba(193, 177, 193, 0.9) 15%, rgba(193, 177, 193, 0.3) 35%, transparent 65%)",
                    filter: "blur(2px)",
                    borderRadius: "50%"
                }}
            />

            {/* Outer card wrapper with shadow */}
            <div
                style={{
                    filter: "drop-shadow(0 0 20px rgba(88, 34, 94, 1)) drop-shadow(0 15px 50px rgba(0, 0, 0, 0.9))"
                }}
            >
                {/* Outer card - acts as border */}
                <div
                    className="relative bg-[#966996] p-[5px]"
                    style={{
                        clipPath: polygonShape
                    }}
                >
                    {/* Inner card wrapper with shadow */}
                    <div
                        className="relative"
                        style={{
                            filter: "drop-shadow(0 0px 5px rgba(179, 202, 202, 0.8)) drop-shadow(0 0 15px rgba(0, 0, 0, 0.7))"
                        }}
                    >
                        {/* Inner card - content area */}
                        <div
                            className="relative"
                            style={{
                                clipPath: polygonShape,
                                backgroundImage: `url(${cardBg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backdropFilter: "blur(12px)",
                                WebkitBackdropFilter: "blur(12px)"
                            }}
                        >


                            {/* Content */}
                            <div className="relative z-10 p-8">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CyberCard
