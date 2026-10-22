"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Building2, Check, Landmark, Mail, Mic, Phone, Users, Plus } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/motion/gsap";
import { useReveals } from "@/components/motion/useReveals";
import PageHero from "@/components/site/PageHero";
import Magnetic from "@/components/motion/Magnetic";
import Tilt from "@/components/motion/Tilt";
import Counter from "@/components/motion/Counter";
import Marquee from "@/components/motion/Marquee";
import Faq from "../features/home/Faq";
import { STATS, PARTNER_LOGOS, CONTACT_EMAIL, CONTACT_PHONE, SOCIALS } from "@/data/skillntell/site";
import { AUDIENCES, FORMATS, PROCESS, PARTNER_TYPES, PARTNER_FAQ } from "@/data/skillntell/partner";

const ICONS = { Users, Building2, Landmark, Mic };

function scrollToForm(e) {
  e?.preventDefault();
  const el = document.getElementById("contact");
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90, duration: 1.6 });
  else el?.scrollIntoView({ behavior: "smooth" });
}

function Formats() {
  const root = useRef(null);
  const [active, setActive] = useState(0);

  const pick = (i) => {
    if (i === active) return;
    setActive(i);
    if (prefersReducedMotion()) return;
    gsap.fromTo(root.current.querySelector(`[data-fimg="${i}"]`), { clipPath: "inset(0% 0% 100% 0% round 24px)", scale: 1.15 }, {
      clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1, duration: 0.9, ease: "expo.out",
    });
  };

  return (
    <section ref={root} className="snt-light relative py-24 md:py-32">
      <div className="snt-grid-bg snt-grid-bg--light absolute inset-0" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <span data-reveal="fade" className="snt-eyebrow snt-eyebrow--dark">03 — Formats</span>
        <h2 data-split="chars" className="snt-h2 mt-5 max-w-3xl text-neutral-600">Ways to work together</h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <ul className="lg:col-span-7">
            {FORMATS.map((f, i) => {
              const on = i === active;
              return (
                <li key={f.key} data-reveal="up" className="border-b border-Main-400/20">
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    onMouseEnter={() => window.matchMedia("(hover: hover)").matches && pick(i)}
                    aria-expanded={on}
                    className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
                  >
                    <span className={`font-compacta text-3xl transition-colors md:text-4xl ${on ? "text-accent-500" : "text-Main-300"}`}>0{i + 1}</span>
                    <span className={`flex-1 font-futura_bold text-2xl transition-all duration-500 md:text-[2.4rem] ${on ? "translate-x-2 text-Main-600" : "text-neutral-500"}`}>{f.title}</span>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? "rotate-45 border-accent-500 bg-accent-500 text-white" : "border-Main-400/30 text-Main-500"}`}>
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>
                  <div className={`grid transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-xl pb-7 pl-14 text-neutral-500 md:pl-16 md:text-lg">{f.body}</p>
                      <div className="relative mb-7 ml-14 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
                        <Image src={f.image} alt="" fill sizes="90vw" className="object-cover" />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-32 aspect-[4/5] w-full">
              {FORMATS.map((f, i) => (
                <div key={f.key} data-fimg={i} className={`absolute inset-0 overflow-hidden rounded-[24px] shadow-[0_40px_80px_-30px_rgba(60,9,108,0.5)] transition-opacity duration-500 ${i === active ? "z-10 opacity-100" : "z-0 opacity-0"}`}>
                  <Image src={f.image} alt={f.title} fill sizes="40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-Main-700/80 via-transparent to-transparent" />
                  <span className="absolute bottom-6 left-6 font-futura_bold text-2xl text-white">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const root = useRef(null);
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo("[data-proc-line]", { scaleX: 0 }, {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 70%", scrub: true },
      });
      gsap.utils.toArray("[data-proc]").forEach((el, i) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 0.9, delay: i * 0.12, scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
      });
    },
    { scope: root }
  );
  return (
    <section ref={root} className="relative bg-space-dark py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <span data-reveal="fade" className="snt-eyebrow">05 — Process</span>
        <h2 data-split="chars" className="snt-h2 mt-5 text-white">From first message to launch</h2>
        <div className="relative mt-16">
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-white/10 md:block" />
          <span data-proc-line className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-accent-500 via-accent-300 to-Main-400 md:block" />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {PROCESS.map((p, i) => (
              <li key={p.title} data-proc className="relative">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-accent-400/60 bg-Main-700 font-futura_bold text-accent-300 shadow-[0_0_30px_rgba(255,109,0,0.35)]">{i + 1}</span>
                <h3 className="mt-6 font-futura_bold text-2xl text-white">{p.title}</h3>
                <p className="mt-2 text-white/60">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const errs = {};
    if (!data.name?.trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) errs.email = "Please enter a valid email.";
    if (!data.message?.trim()) errs.message = "A few words about your idea help a lot.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const subject = `Partnership — ${data.organization || data.name} (${data.type})`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Organization: ${data.organization || "—"}`,
      `Partnership type: ${data.type}`,
      "",
      data.message,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    if (!prefersReducedMotion()) gsap.fromTo("[data-sent]", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.6)" });
  };

  const field = "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-colors focus:border-accent-300 focus:bg-white/[0.07]";

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0d0022] py-24 md:py-32">
      <div className="absolute inset-0" style={{ background: "radial-gradient(45% 50% at 85% 20%, rgba(255,109,0,0.18), transparent 70%), radial-gradient(45% 55% at 10% 90%, rgba(123,44,191,0.35), transparent 70%)" }} />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span data-reveal="fade" className="snt-eyebrow">06 — Contact</span>
          <h2 data-split="chars" className="snt-h2 mt-5 text-white">Let&apos;s talk.</h2>
          <p data-reveal="up" className="snt-lead mt-6 max-w-md text-white/65">
            Tell us about your organization and your idea. We usually answer within a few days.
          </p>
          <div data-reveal-stagger className="mt-10 space-y-3">
            <a href={`mailto:${CONTACT_EMAIL}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/15 text-accent-300"><Mail className="h-5 w-5" /></span>
              <span className="flex-1"><span className="block text-xs uppercase tracking-widest text-white/45">Email</span><span className="text-white">{CONTACT_EMAIL}</span></span>
              <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={CONTACT_PHONE.href} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-Main-400/20 text-Main-300"><Phone className="h-5 w-5" /></span>
              <span className="flex-1"><span className="block text-xs uppercase tracking-widest text-white/45">Phone</span><span className="text-white">{CONTACT_PHONE.label}</span></span>
              <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {SOCIALS.filter((s) => s.href).map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white"><img src={s.icon} alt="" className="h-5 w-5" /></span>
                <span className="flex-1 text-white">{s.name}</span>
                <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>

        <div data-reveal="up" className="lg:col-span-7">
          <div className="snt-card p-6 md:p-10">
            {sent ? (
              <div data-sent className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-Main-400 text-white shadow-[0_0_40px_rgba(255,109,0,0.5)]"><Check className="h-9 w-9" /></span>
                <h3 className="mt-6 font-futura_bold text-3xl text-white">Your email is ready</h3>
                <p className="mt-3 max-w-sm text-white/65">Your mail app should have opened with everything filled in — just hit send. If it didn&apos;t, write to us at <a className="text-accent-300 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-8 text-sm text-white/60 underline-offset-4 hover:underline">Edit my message</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-white/70">Full name *</span>
                  <input name="name" autoComplete="name" className={field} placeholder="Your name" aria-invalid={!!errors.name} />
                  {errors.name && <span className="mt-1 block text-sm text-error-200">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-white/70">Email *</span>
                  <input name="email" type="email" autoComplete="email" className={field} placeholder="you@organization.com" aria-invalid={!!errors.email} />
                  {errors.email && <span className="mt-1 block text-sm text-error-200">{errors.email}</span>}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-white/70">Organization / club</span>
                  <input name="organization" autoComplete="organization" className={field} placeholder="Company, club or institution" />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-white/70">Partnership type</span>
                  <select name="type" className={`${field} appearance-none bg-[url('/icons/chevron.svg')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat`} defaultValue={PARTNER_TYPES[0]}>
                    {PARTNER_TYPES.map((t) => <option key={t} className="bg-Main-700">{t}</option>)}
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm text-white/70">Your idea *</span>
                  <textarea name="message" rows={6} className={`${field} resize-none`} placeholder="What would you like to build with Skill&Tell?" aria-invalid={!!errors.message} />
                  {errors.message && <span className="mt-1 block text-sm text-error-200">{errors.message}</span>}
                </label>
                <div className="flex flex-col items-start justify-between gap-4 md:col-span-2 md:flex-row md:items-center">
                  <p className="text-sm text-white/45">Opens your email app with the message ready to send.</p>
                  <Magnetic>
                    <button type="submit" className="snt-btn snt-btn--primary">Send proposal <ArrowRight className="snt-btn__arrow h-5 w-5" /></button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PartnerView() {
  const root = useRef(null);
  useReveals(root);

  return (
    <div ref={root}>
      <PageHero
        eyebrow="Partner with us"
        title={<>Let&apos;s create <span className="gradient-text">impact</span> together</>}
        lead="Skill&Tell connects clubs, companies and organizations with a growing community of motivated students at ENSIA — through events, workshops, Missions and more."
        aside={
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a href="#contact" onClick={scrollToForm} className="snt-btn snt-btn--primary">Start a partnership <ArrowRight className="snt-btn__arrow h-5 w-5" /></a>
            </Magnetic>
            <Magnetic>
              <a href={`mailto:${CONTACT_EMAIL}`} className="snt-btn snt-btn--ghost">Email us</a>
            </Magnetic>
          </div>
        }
      />

      <section className="relative bg-space-dark py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <span data-reveal="fade" className="snt-eyebrow">01 — Why Skill&amp;Tell</span>
          <div data-reveal-stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[26px] bg-white/10 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-space-dark p-6 md:p-9">
                <div className="font-compacta text-[clamp(3.4rem,7vw,6.5rem)] leading-[0.85] gradient-text"><Counter value={s.value} suffix={s.suffix} /></div>
                <p className="mt-3 font-futura_bold text-white">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-space-dark pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <span data-reveal="fade" className="snt-eyebrow">02 — Who it&apos;s for</span>
          <h2 data-split="chars" className="snt-h2 mt-5 max-w-3xl text-white">Built for collaborators of every kind</h2>
          <div data-reveal-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a) => {
              const Icon = ICONS[a.icon];
              return (
                <Tilt key={a.key} className="snt-card group p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-Main-400 text-white shadow-[0_10px_30px_-8px_rgba(255,109,0,0.6)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-8 font-futura_bold text-xl text-white">{a.title}</h3>
                  <p className="mt-3 text-white/60">{a.body}</p>
                </Tilt>
              );
            })}
          </div>
        </div>
      </section>

      <Formats />

      <section className="relative bg-white py-16 md:py-20">
        <p data-reveal="fade" className="text-center font-futura_md_bt text-xs uppercase tracking-[0.3em] text-Main-500">04 — They trusted us</p>
        <div className="mt-10">
          <Marquee speed={45} pauseOnHover>
            {PARTNER_LOGOS.map((l) => (
              <div key={l.name} title={l.name} className={`mx-4 flex h-24 w-52 items-center justify-center rounded-2xl border px-6 transition-all duration-500 md:h-28 md:w-64 ${l.dark ? "border-Main-600 bg-Main-700" : "border-neutral-200 bg-white grayscale hover:grayscale-0"}`}>
                <Image src={l.src} alt={l.name} width={200} height={80} className="max-h-14 w-auto object-contain" />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      <Process />
      <ContactForm />
      <Faq items={PARTNER_FAQ} title="Partnership F&Q" subtitle="Quick answers before you reach out." id="partner-faq" index="07" />
    </div>
  );
}
