"use client";

import { RotateCcw, TriangleAlert, House } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#23003B] px-6">

      {/* Background glow */}
      <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-orange-500/25 blur-[120px]" />
      <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-violet-500/25 blur-[150px]" />

      {/* Top gradient line */}
      <div className="absolute top-12 left-1/2 h-1 w-[75%] -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 via-pink-400 to-violet-500" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-violet-500/40 bg-[#2B0546]/80 p-12 backdrop-blur-xl shadow-[0_0_60px_rgba(124,58,237,.25)]">

        <div className="flex justify-center">
          <div className="rounded-full border border-orange-400/30 bg-orange-500/10 p-5">
            <TriangleAlert size={50} className="text-orange-400" />
          </div>
        </div>

        <h1 className="mt-8 text-center text-5xl font-bold bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
          Oops!
        </h1>

        <h2 className="mt-4 text-center text-2xl font-semibold text-white">
          Something went wrong
        </h2>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-400">
          An unexpected error occurred while loading this page.
          Please try again.
        </p>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-sm text-red-300 break-words">
              {error.message}
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
          >
            <RotateCcw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-violet-400 px-6 py-3 font-semibold text-white transition hover:bg-violet-500/10"
          >
            <House size={18} />
            Back Home
          </Link>

        </div>
      </div>
    </main>
  );
}