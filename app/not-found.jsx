import Link from "next/link";
import { Home, SearchX } from "lucide-react";
export default function NotFound() {
    return (<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#22003D] px-6">
      {/* Background glow */}
    
      <div className="absolute left-20 top-20 h-40 w-40 rounded-full bg-orange-500/30 blur-[120px]"/>
      <div className="absolute bottom-20 right-20 h-52 w-52 rounded-full bg-violet-600/30 blur-[150px]"/>

      <div className="relative w-full max-w-xl rounded-3xl border border-violet-500/50 bg-[#2b0447]/80 p-12 text-center shadow-[0_0_50px_rgba(168,85,247,.25)] backdrop-blur-xl">
        <SearchX size={70} className="mx-auto mb-6 text-orange-400"/>

        <h1 className="bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-7xl font-black text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link href="/" className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-7 py-3 font-semibold text-white transition hover:scale-105">
          <Home size={18}/>
          Back to Home
        </Link>
      </div>
    </main>);
}
