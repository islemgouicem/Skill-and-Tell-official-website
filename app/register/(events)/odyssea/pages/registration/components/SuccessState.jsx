import React from "react";
import Link from "next/link";
import Display from "../../../components/Display";
import Image from "next/image";
import compass from "@/assets/images/odyssea/compass.webp";

function SuccessState({ teamName, email, reference = null, isTeam = true }) {
  return (
    <div className="py-8 text-center sm:py-12 lg:py-16">
      <Image
        src={compass}
        alt=""
        aria-hidden="true"
        className="ody-sun-spin-slow mx-auto w-20 select-none sm:w-24 lg:w-28"
      />

      <p className="ody-display mt-6 text-[1.1rem] tracking-[0.2em] text-ody-gold-deep sm:text-[1.3rem] lg:text-[1.5rem]">
        <Display>Registration received</Display>
      </p>
      <h2 className="ody-display mt-2 text-[clamp(2rem,6.4vw,4.6rem)] leading-[1.05] text-ody-ink">
        <Display>WE HAVE YOUR REGISTRATION</Display>
      </h2>

      <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-7 text-ody-ink/70 lg:mt-7 lg:max-w-2xl lg:text-[1.1rem] lg:leading-8">
        {teamName ? (
          <>
            <span className="font-semibold text-ody-ink">{teamName}</span>
            {isTeam ? " is on our list." : " — you are on our list."}{" "}
          </>
        ) : null}
        This is not a place yet: our team reads every application and will get back to you by
        email as soon as possible with the final confirmation.
      </p>

      <p className="mx-auto mt-4 max-w-lg text-[0.88rem] leading-7 text-ody-ink/55 lg:max-w-2xl lg:text-[1rem]">
        A receipt is on its way to <span className="font-semibold text-ody-ink/75">{email}</span>.
        Check the spam folder if it does not arrive within a few minutes.
      </p>

      {reference && (
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-ody-gold-deep/45 bg-ody-parchment/60 px-4 py-2 text-[0.78rem] font-semibold tracking-[0.12em] text-ody-ink/70 lg:text-[0.9rem]">
          REFERENCE
          <span className="font-mono tracking-normal text-ody-ink">{reference}</span>
        </p>
      )}

      <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:mt-12">
        <Link
          href="/register/odyssea"
          onClick={() => window.scrollTo(0, 0)}
          className="ody-btn ody-display text-[1.05rem] lg:text-[1.2rem]"
        >
          <Display>BACK TO ODYSSEA</Display>
        </Link>
        <Link
          href="/"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex min-h-12 items-center rounded-full border border-ody-night/35 px-7 text-[0.85rem] font-semibold text-ody-ink/75 transition hover:border-ody-night hover:text-ody-ink lg:min-h-14 lg:text-[0.95rem]"
        >
          Skill&amp;Tell home
        </Link>
      </div>
    </div>
  );
}

export default React.memo(SuccessState);
