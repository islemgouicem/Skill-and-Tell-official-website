"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/gsap";

// The club's signature mouse sparkles, redrawn on a single canvas
// (no React re-render per mouse move) and tuned to the brand palette.
const COLORS = ["#ff6d00", "#ff9e00", "#ffc78a", "#d7aeff", "#9d4edd", "#ffd700"];

export default function CursorSparkles() {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let sparks = [];
    let raf = 0;
    let dpr = 1;
    let last = { x: 0, y: 0 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const add = (e) => {
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      last = { x: e.clientX, y: e.clientY };
      const n = Math.min(3, 1 + Math.floor(dist / 18));
      for (let i = 0; i < n; i++) {
        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 + 0.4,
          life: 1,
          size: Math.random() * 3 + 2,
          c: COLORS[(Math.random() * COLORS.length) | 0],
          star: Math.random() < 0.25,
        });
      }
      if (sparks.length > 160) sparks = sparks.slice(-160);
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const drawStar = (x, y, r) => {
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4;
        const rr = i % 2 ? r * 0.35 : r;
        ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      }
      ctx.closePath();
      ctx.fill();
    };
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.022;
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillStyle = s.c;
        ctx.shadowColor = s.c;
        ctx.shadowBlur = 10;
        const r = s.size * (0.5 + s.life * 0.5);
        if (s.star) drawStar(s.x, s.y, r * 1.6);
        else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = sparks.length ? requestAnimationFrame(loop) : 0;
      if (!raf) ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", add, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", add);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] h-screen w-screen" />;
}
