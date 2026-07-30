import { LoaderCircle } from "lucide-react";
export default function Loader() {
    return (<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#22003D] px-6">
      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-40 w-40 rounded-full bg-orange-500/30 blur-[120px]"/>
      <div className="absolute bottom-20 right-20 h-52 w-52 rounded-full bg-violet-600/30 blur-[150px]"/>

      {/* Glass Card */}
      <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-violet-500/50 bg-[#2b0447]/80 p-12 shadow-[0_0_50px_rgba(168,85,247,.25)] backdrop-blur-xl">

        {/* Spinner */}
        <div className="relative flex h-24 w-24 items-center justify-center">

          {/* Outer Ring */}
          <div className="absolute h-24 w-24 animate-spin rounded-full border-[5px] border-violet-500/20 border-t-orange-500 border-r-violet-500"/>

          {/* Glow */}
          <div className="absolute h-16 w-16 rounded-full bg-gradient-to-r from-orange-500/20 to-violet-500/20 blur-xl"/>

          {/* Icon */}
          <LoaderCircle size={34} className="animate-spin text-orange-400" style={{ animationDuration: "2s" }}/>
        </div>

        <h2 className="mt-8 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
          Loading
        </h2>

        <p className="mt-3 text-center text-gray-400">
          Preparing something awesome...
        </p>

        {/* Loading Dots */}
        <div className="mt-8 flex gap-2">
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-500 [animation-delay:0ms]"/>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-violet-400 [animation-delay:150ms]"/>
          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-500 [animation-delay:300ms]"/>
        </div>
      </div>
    </main>);
}
