"use client"
import React from "react"
import Footer from "../layout/Footer"
import { Button } from "../../../components/ui/button"
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react"


function Registered() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const title = state?.title || "Registration Complete!";
    const msg = state?.msg || "Thanks for registering to be part of Skill & Tell. We're excited to have you on board, and welcome to our creative community!";

    return (
        <>
            <div
                className="p-2 bg-cover bg-center bg-no-repeat h-screen"
                style={{ backgroundImage: "url('images/Team_Section.webp')" }}
            >
                {/* Header */}
                <div className="max-w-6xl mx-auto pt-2 pb-2">
                    <div className="mb-2 text-center">
                        <h1 className="inline-block text-3xl font-bold p-2" style={{
                            color: "#190432",
                            background: "linear-gradient(90deg,#FF6D00,#8A38F5)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextStroke: "3px transparent",
                            letterSpacing: "0.05em",
                        }}>Join Skill&Tell</h1>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-[#7B2CBF] rounded-full h-2 mb-8">
                        <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{
                                width: "100%",
                                background: "linear-gradient(90deg,#FF6D00,#7B2CBF)",
                            }}
                        ></div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="max-w-5xl mx-auto mb-10">
                    <div className="glass rounded-2xl p-8">
                        <div className="mb-2 text-center animate-fade-in-up">
                            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <h1
                                className="inline-block text-5xl md:text-14xl p-2 gradient-text text-center font-bold"
                            >
                                {title}
                            </h1>


                            <p className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto text-center my-10">{msg}</p>
                            <Button
                                onClick={() => navigate("/")}
                                className="text-white rounded-md mt-4 px-8 py-3 bg-gradient-to-r from-[#8A38F5]/0 to-[#FF6D00] hover:from-space-orange-light hover:to-space-purple"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Home
                            </Button>

                        </div>
                    </div>
                </div>

            </div >
            <Footer />
        </>


    )
}
export default React.memo(Registered)

