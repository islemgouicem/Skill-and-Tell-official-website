"use client";

import "@/styles/odyssea.css";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import Brand from "../components/Brand";
import Display from "../components/Display";

const sections = [
  {
    title: "Why we use your data",
    body: "We use the information you submit to process your registration, form teams, communicate important event updates, manage attendance, coordinate judging and deliver the Odyssea experience.",
  },
  {
    title: "Who receives it",
    body: "Your registration data may be shared with Skill&Tell and Inspired Minds Media Ltd, the World AI Week 2026 event organiser, only where it is needed to run this affiliated event. We do not sell your personal data or share it with unrelated third parties for their own purposes.",
  },
  {
    title: "How long we keep it",
    body: "We keep registration information only for as long as it is reasonably needed to administer the event, resolve registration or participation questions, meet applicable record-keeping duties and protect the integrity of the event. When it is no longer needed, it is deleted or securely anonymised where practical.",
  },
  {
    title: "Your choices",
    body: "The fields marked as required are needed to register and participate. You may ask what registration information we hold about you, request a correction, or ask us to delete it where applicable. Deletion may mean that we can no longer keep your registration active.",
  },
];

export default function OdysseaDataUsePage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Data-use notice | Odyssea by Skill&Tell";
    document.documentElement.classList.add("odyssea-active");
    document.body.classList.add("odyssea-active");

    return () => {
      document.title = previousTitle;
      document.documentElement.classList.remove("odyssea-active");
      document.body.classList.remove("odyssea-active");
    };
  }, []);

  return (
    <main className="odyssea-app min-h-screen w-full overflow-x-hidden px-5 py-6 sm:px-9 sm:py-9 lg:px-14 lg:py-12">
      <header className="mx-auto flex max-w-5xl items-start justify-between gap-4">
        <Link href="/register/odyssea/register" aria-label="Back to Odyssea registration">
          <Brand size="nav" variant="row" />
        </Link>
        <p className="pt-2 text-right text-[0.62rem] font-semibold tracking-[0.12em] text-ody-gold sm:text-[0.82rem]">
          IDEAS · TALENT · IMPACT
        </p>
      </header>

      <section className="mx-auto max-w-4xl pb-16 pt-16 sm:pt-24">
        <Link
          href="/register/odyssea/register"
          className="inline-flex items-center gap-2 text-[0.82rem] font-medium text-white/65 transition hover:text-ody-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to registration
        </Link>

        <div className="mt-10 border-y border-ody-gold/35 py-9 sm:py-12">
          <div className="flex items-center gap-3 text-ody-title">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em]">Registration data-use notice</p>
          </div>
          <h1 className="ody-display ody-weighted mt-4 text-[clamp(2.8rem,8vw,6.4rem)] leading-none text-ody-parchment">
            <Display>Your data, handled with purpose</Display>
          </h1>
          <p className="mt-6 max-w-3xl text-[1rem] leading-7 text-white/78 sm:text-[1.15rem] sm:leading-8">
            By registering for this World AI Week affiliated event, you consent to the sharing of your registration data with the event organiser, Inspired Minds Media Ltd, for the sole purpose of running the event.
          </p>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="ody-display text-[1.35rem] tracking-[0.06em] text-ody-title sm:text-[1.6rem]">
                <Display>{section.title}</Display>
              </h2>
              <p className="mt-3 text-[0.92rem] leading-7 text-white/72 sm:text-[1rem]">{section.body}</p>
            </section>
          ))}
        </div>

        <section className="border-t border-ody-gold/25 pt-8">
          <div className="flex items-start gap-3 rounded-lg border border-ody-gold/30 bg-ody-night-soft/55 p-5 sm:p-6">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-ody-title" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-ody-parchment">Questions about your registration data?</h2>
              <p className="mt-2 text-[0.9rem] leading-6 text-white/72">
                Contact Skill&Tell at{" "}
                <a className="font-semibold text-ody-title underline underline-offset-2" href="mailto:skill.and.tell@ensia.edu.dz">
                  skill.and.tell@ensia.edu.dz
                </a>
                . Tell us what you need and include the email address used for your registration so we can locate the record.
              </p>
            </div>
          </div>
          <p className="mt-6 text-[0.72rem] leading-5 text-white/45">This notice applies to information submitted through the Odyssea registration form.</p>
        </section>
      </section>
    </main>
  );
}
