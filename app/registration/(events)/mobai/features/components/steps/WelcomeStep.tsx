const WelcomeStep = () => {
    return (
        <div className="space-y-6 text-white">
            {/* Hero Title */}
            <div className="text-center space-y-2 pb-4 border-b-2 border-white/30">
                <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
                    Team Registration Guidelines
                </h1>
                <p className="text-sm text-gray-300">
                    Please read carefully before proceeding
                </p>
            </div>

            {/* Mission Brief */}
            <section className="space-y-2">
                <h2 className="text-xl font-bold text-red-main-500 uppercase tracking-wide border-l-4 border-red-main-500 pl-3">
                    Mission Overview
                </h2>
                <div className="pl-3 text-gray-300 text-sm leading-relaxed">
                    <p>
                        <span className="text-white font-semibold">6 members.</span>{" "}
                        <span className="text-red-main-500 font-semibold">3 responsibilities.</span>{" "}
                        <span className="text-white font-semibold">1 mission.</span>
                    </p>
                    <p className="mt-2">
                        Design and develop an AI-powered mobile application combining Design, Mobile Development, and AI.
                    </p>
                </div>
            </section>

            {/* Team Requirements */}
            <section className="space-y-3">
                <h2 className="text-xl font-bold text-red-main-500 uppercase tracking-wide border-l-4 border-red-main-500 pl-3">
                    Requirements
                </h2>

                <div className="space-y-3 pl-3 text-sm">
                    {/* Requirement 1 */}
                    <div className="border-l-2 border-[#663380] pl-3 py-1">
                        <h3 className="font-bold text-white mb-1 uppercase text-xs tracking-wide">
                            1. Team Composition
                        </h3>
                        <p className="text-gray-300">
                            Exactly 6 members required. All must be registered before submission.
                        </p>
                    </div>

                    {/* Requirement 2 */}
                    <div className="border-l-2 border-[#663380] pl-3 py-1">
                        <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-wide">
                            2. Role Distribution
                        </h3>
                        <div className="space-y-2">
                            <p className="text-gray-300">Three core responsibilities:</p>
                            <div className="space-y-1 ml-3">
                                <div className="flex items-start gap-2">
                                    <span className="text-red-main-500 font-bold">›</span>
                                    <div className="flex-1">
                                        <span className="text-white font-semibold">Design:</span>
                                        <span className="text-gray-400"> UI/UX, Visual Identity</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-red-main-500 font-bold">›</span>
                                    <div className="flex-1">
                                        <span className="text-white font-semibold">Mobile Dev:</span>
                                        <span className="text-gray-400"> Flutter, React Native</span>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-red-main-500 font-bold">›</span>
                                    <div className="flex-1">
                                        <span className="text-white font-semibold">AI:</span>
                                        <span className="text-gray-400"> Machine Learning, AI Integration</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 italic bg-[#2d0d3d]/50 p-2 rounded mt-2">
                                Recommended: 2 members per responsibility. Flexible distribution allowed based on expertise.
                            </p>
                        </div>
                    </div>

                    {/* Requirement 3 */}
                    <div className="border-l-2 border-[#663380] pl-3 py-1">
                        <h3 className="font-bold text-white mb-1 uppercase text-xs tracking-wide">
                            3. Mandatory Policy
                        </h3>
                        <p className="text-gray-300">
                            Each responsibility must have at least one member assigned. Teams are accountable for assignments.
                        </p>
                    </div>
                </div>
            </section>

            {/* Registration Philosophy */}
            <section className="space-y-2 pt-3 border-t-2 border-white/30">
                <h2 className="text-xl font-bold text-red-main-500 uppercase tracking-wide border-l-4 border-red-main-500 pl-3">
                    About Registration
                </h2>
                <div className="pl-3 text-gray-300 text-sm leading-relaxed">
                    <p>
                        MobAI's registration is designed to be engaging and participant-centered.
                        We value authentic responses showcasing your team's vision and capabilities.
                    </p>
                </div>
            </section>

            {/* Proceed Section */}
            <div className="text-center pt-4 border-t border-[#663380]/50">
                <p className="text-base font-semibold text-white mb-1">
                    Ready to Begin?
                </p>
                <p className="text-xs text-gray-400">
                    Click <span className="text-white font-bold">NEXT</span> to proceed with registration
                </p>
            </div>
        </div>
    )
}

export default WelcomeStep
