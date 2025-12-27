import { ArrowRight } from "lucide-react"

const DepartmentTestSection = () => {
    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#12101f] to-[#0f0a15]" />

            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#F472B6]/8 blur-[100px]" />

            {/* Creative floating elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* TECH - Floating code snippet */}
                <div
                    className="absolute top-[10%] left-[5%] font-mono text-[10px] md:text-xs leading-relaxed opacity-80"
                    style={{ animation: "float 6s ease-in-out infinite" }}
                >
                    <div className="bg-[#1a1a2e]/80 backdrop-blur-sm rounded-lg p-3 border border-[#2DD4A8]/30 shadow-[0_0_20px_rgba(45,212,168,0.15)]">
                        <div className="flex gap-1.5 mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                            <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                            <span className="w-2 h-2 rounded-full bg-[#28CA41]" />
                        </div>
                        <code className="text-[#2DD4A8]">const</code>
                        <code className="text-white"> you </code>
                        <code className="text-[#F472B6]">=</code>
                        <code className="text-[#FBBF24]"> "developer"</code>
                        <code className="text-gray-500">;</code>
                    </div>
                </div>

                {/* DESIGN - Color palette */}
                <div
                    className="absolute bottom-[10%] left-[5%]"
                    style={{
                        animation: "float 5s ease-in-out infinite",
                        animationDelay: "0.5s"
                    }}
                >
                    <div className="flex gap-1 rotate-[-8deg]">
                        <div className="w-8 h-16 md:w-10 md:h-20 rounded-t-full bg-[#F472B6] shadow-lg" />
                        <div className="w-8 h-14 md:w-10 md:h-18 rounded-t-full bg-[#A78BFA] shadow-lg" />
                        <div className="w-8 h-12 md:w-10 md:h-16 rounded-t-full bg-[#60A5FA] shadow-lg" />
                        <div className="w-8 h-10 md:w-10 md:h-14 rounded-t-full bg-[#2DD4A8] shadow-lg" />
                    </div>
                </div>

                {/* STRATEGY - Chess piece / Target */}
                <div
                    className="absolute top-[60%] right-[8%]"
                    style={{
                        animation: "float 6s ease-in-out infinite",
                        animationDelay: "2.5s"
                    }}
                >
                    <svg className="w-12 h-12 md:w-16 md:h-16" viewBox="0 0 64 64">
                        {/* Target rings */}
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#FB923C"
                            strokeWidth="2"
                            opacity="0.3"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="20"
                            fill="none"
                            stroke="#FB923C"
                            strokeWidth="2"
                            opacity="0.5"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="12"
                            fill="none"
                            stroke="#FB923C"
                            strokeWidth="2"
                            opacity="0.7"
                        />
                        <circle cx="32" cy="32" r="4" fill="#FB923C" />
                        {/* Arrow */}
                        <line
                            x1="48"
                            y1="16"
                            x2="36"
                            y2="28"
                            stroke="#FB923C"
                            strokeWidth="2"
                        />
                        <polygon points="50,12 52,20 44,18" fill="#FB923C" />
                    </svg>
                </div>

                {/* Floating sparkles */}
                <div
                    className="absolute top-[5%] right-[40%] w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"
                    style={{ animationDelay: "0s" }}
                />
                <div
                    className="absolute bottom-[40%] left-[25%] w-1.5 h-1.5 bg-[#A78BFA] rounded-full animate-pulse shadow-[0_0_8px_#A78BFA]"
                    style={{ animationDelay: "0.5s" }}
                />
                <div
                    className="absolute top-[35%] right-[30%] w-1 h-1 bg-[#2DD4A8] rounded-full animate-pulse shadow-[0_0_6px_#2DD4A8]"
                    style={{ animationDelay: "1s" }}
                />
            </div>

            {/* Center content */}
            <div className="container relative z-10 mx-auto px-6 h-[55%] flex justify-center">
                <div className="max-w-2xl flex flex-col items-center justify-between mx-auto text-center">
                    {/* "Our Test" badge */}
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#A78BFA]/50" />
                        <span
                            className="text-xs uppercase tracking-[0.3em] text-[#A78BFA] font-semibold"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            BY Skill&Tell
                        </span>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#A78BFA]/50" />
                    </div>

                    {/* Title */}
                    <h2
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Where Do{" "}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#FBBF24]">
                                You
                            </span>
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 100 12"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 8 Q25 0 50 8 Q75 12 100 6"
                                    stroke="url(#underlineGradient)"
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient
                                        id="underlineGradient"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="0%"
                                    >
                                        <stop offset="0%" stopColor="#A78BFA" />
                                        <stop offset="50%" stopColor="#F472B6" />
                                        <stop offset="100%" stopColor="#FBBF24" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>{" "}
                        Belong?
                    </h2>

                    {/* Description */}
                    <p
                        className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg mx-auto"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        Discover your ideal department through our personality-based
                        assessment.
                    </p>

                    {/* Console-style CTA button */}
                    <a
                        href="https://departments-test.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center"
                    >
                        <div className="relative px-8 py-4 rounded-xl border-2 border-[#8B5CF6] bg-[#8B5CF6]/10 hover:bg-[#8B5CF6] hover:border-[#8B5CF6] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]">
                            <div className="flex items-center gap-3">
                                
                                <span
                                    className="text-white font-semibold tracking-wide text-lg"
                                    style={{ fontFamily: "'Poppins', sans-serif" }}
                                >
                                    Take the Test
                                </span>
                                <ArrowRight className="w-5 h-5 text-[#A78BFA] group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </a>

                    {/* Minimal stats */}
                    <div
                        className="flex items-center justify-center gap-6 mt-10 text-sm text-gray-500"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#2DD4A8]" />
                            <span>6 Departments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                            <span>~3 min</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                            <span>Instant match</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DepartmentTestSection
