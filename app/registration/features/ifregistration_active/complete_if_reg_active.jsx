"use client";
import React, { Suspense } from "react";
import Footer from "@/app/(main)/features/layout/Footer";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { RegisterationProvider } from "@/lib/hooks/useRegistration";
// react-router's `navigate(path, { state })` has no equivalent in next/navigation —
// you can't attach arbitrary data to a client-side push() and read it back here.
// This keyed lookup + `?status=` query param is one straightforward replacement.
// If you need fully dynamic/free-text messages instead of a fixed set, consider
// sessionStorage or a small shared client store (Zustand/Context) written right
// before router.push("/registration/complete?status=...").
const MESSAGES = {
    default: {
        title: "Registration Complete!",
        msg: "Thanks for registering to be part of Skill & Tell. We're excited to have you on board, and welcome to our creative community!",
    },
};
function RegistrationCompleteContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const statusKey = searchParams.get("status") ?? "default";
    const { title, msg } = MESSAGES[statusKey] ?? MESSAGES.default;
    return (<RegisterationProvider>
    
      <div className="p-2 bg-cover bg-center bg-no-repeat h-screen" style={{ backgroundImage: "url('images/Team_Section.webp')" }}>
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
        }}>
              Join Skill&amp;Tell
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#7B2CBF] rounded-full h-2 mb-8">
            <div className="h-2 rounded-full transition-all duration-500" style={{
            width: "100%",
            background: "linear-gradient(90deg,#FF6D00,#7B2CBF)",
        }}></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="glass rounded-2xl p-8">
            <div className="mb-2 text-center animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4"/>
              <h1 className="inline-block text-5xl md:text-14xl p-2 gradient-text text-center font-bold">
                {title}
              </h1>

              <p className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] mx-auto text-center my-10">
                {msg}
              </p>
              <Button onClick={() => router.push("/")} className="text-white rounded-md mt-4 px-8 py-3 bg-gradient-to-r from-[#8A38F5]/0 to-[#FF6D00] hover:from-space-orange-light hover:to-space-purple">
                <ArrowLeft className="w-5 h-5 mr-2"/>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    
    </RegisterationProvider>);
}
// useSearchParams requires a Suspense boundary in the App Router, otherwise
// Next will error/opt the whole route into fully dynamic rendering at build time.
function RegistrationComplete() {
    return (<Suspense fallback={null}>
      <RegistrationCompleteContent />
    </Suspense>);
}
export default React.memo(RegistrationComplete);
