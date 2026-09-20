import React from "react";
import { Link } from "react-router-dom";
import compass from "../../../../../assets/images/odyssea/compass.webp";

function SuccessState({ teamName, email, isTeam = true }) {
  return (
    <div className="py-8 text-center sm:py-12">
      <img
        src={compass}
        alt=""
        aria-hidden="true"
        className="ody-sun-spin-slow mx-auto w-20 select-none sm:w-24"
      />

      <p className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-ody-gold-deep">
        Congratulations, voyager
      </p>
      <h2 className="ody-display mt-2 text-[clamp(2.2rem,7vw,4rem)] leading-none text-ody-ink">
        YOUR PLACE IS SECURED
      </h2>

      <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-7 text-ody-ink/70">
        {teamName ? (
          <>
            <span className="font-semibold text-ody-ink">{teamName}</span>{" "}
            {isTeam ? "is registered for Odyssea." : "— your seat is booked for Odyssea."}{" "}
          </>
        ) : null}
        A confirmation has been sent to{" "}
        <span className="font-semibold text-ody-ink">{email}</span>. Check the spam folder if it
        does not arrive within a few minutes.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/odyssea"
          onClick={() => window.scrollTo(0, 0)}
          className="ody-display inline-flex min-h-12 items-center rounded-full bg-ody-night px-8 text-[1.05rem] text-ody-gold transition hover:-translate-y-0.5 hover:bg-ody-night-soft"
        >
          BACK TO ODYSSEA
        </Link>
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex min-h-12 items-center rounded-full border border-ody-night/35 px-7 text-[0.85rem] font-semibold text-ody-ink/75 transition hover:border-ody-night hover:text-ody-ink"
        >
          Skill&amp;Tell home
        </Link>
      </div>
    </div>
  );
}

export default React.memo(SuccessState);
