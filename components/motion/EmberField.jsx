"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

const PALETTE = [
  [255, 109, 0],
  [255, 158, 0],
  [255, 199, 138],
  [215, 174, 255],
  [157, 78, 221],
];

function sprite(rgb) {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(255,255,255,1)`);
  grad.addColorStop(0.18, `rgba(${rgb},1)`);
  grad.addColorStop(0.45, `rgba(${rgb},0.35)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
}

/**
 * Glowing embers drifting through space , the floating orange lights of the
 * Skill&Tell backgrounds, brought to life. Reacts softly to the pointer.
 */
export default function EmberField({ density = 1, className = "", interactive = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const sprites = PALETTE.map((c) => sprite(c.join(",")));
    // Weaker machines get a still starfield instead of an animated one.
    const lowEnd =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4);
    const reduced = prefersReducedMotion() || lowEnd;
    let w = 0, h = 0, dpr = 1, raf = 0, running = false;
    let particles = [];
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const make = (initial) => {
      const depth = Math.random();
      const warm = Math.random() < 0.72;
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 20,
        r: 2 + depth * depth * 16,
        depth,
        vy: 0.08 + depth * 0.35,
        vx: (Math.random() - 0.5) * 0.12,
        sway: Math.random() * Math.PI * 2,
        tw: Math.random() * Math.PI * 2,
        s: sprites[warm ? Math.floor(Math.random() * 3) : 3 + Math.floor(Math.random() * 2)],
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(60, (w * h) / 22000) * density);
      particles = Array.from({ length: count }, () => make(true));
      if (!running) draw(0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        if (running) {
          p.y -= p.vy;
          p.sway += 0.01;
          p.x += p.vx + Math.sin(p.sway) * 0.15;
          if (p.y < -30) Object.assign(p, make(false));
        }
        const px = p.x + mouse.x * (p.depth * 28);
        const py = p.y + mouse.y * (p.depth * 28);
        const twinkle = 0.55 + Math.sin(t * 0.002 + p.tw) * 0.3;
        ctx.globalAlpha = Math.min(1, twinkle * (0.35 + p.depth * 0.65));
        ctx.drawImage(p.s, px - p.r, py - p.r, p.r * 2, p.r * 2);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(canvas);
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", vis);
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density, interactive]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
