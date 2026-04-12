"use client";
import { useEffect } from 'react';

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --color-1: #AC6AFF;
    --color-2: #FFC876;
    --color-3: #FF776F;
    --color-4: #7ADB78;
    --color-5: #858DFF;
    --color-6: #FF98E2;
    --n-1: #FFFFFF;
    --n-8: #0E0C15;
    --glass-bg: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.10);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: #0E0C15;
    color: #fff;
    overflow-x: hidden;
  }

  /* ── Glass utility ── */
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* ── Gradient border card ── */
  .gradient-border {
    position: relative;
  }
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(172,106,255,0.5), rgba(133,141,255,0.2), transparent);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    z-index: 1;
  }

  /* ── Buttons ── */
  .btn-primary {
    background: linear-gradient(135deg, #AC6AFF, #858DFF);
    border: none;
    transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
    opacity: 0;
    transition: opacity 0.2s;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(172,106,255,0.35); }
  .btn-primary:hover::after { opacity: 1; }
  .btn-primary:active { transform: translateY(0); }

  .btn-outline {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.18);
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
  }
  .btn-outline:hover { border-color: var(--color-1); background: rgba(172,106,255,0.08); transform: translateY(-1px); }

  /* ── Section separators ── */
  .section-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
  }

  /* ── Shimmer text ── */
  .shimmer-text {
    background: linear-gradient(90deg, #AC6AFF, #858DFF, #FFC876, #AC6AFF);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  /* ── Alternating section bg ── */
  .section-bg { background: rgba(255,255,255,0.015); }

  /* ── Card hover ── */
  .card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }

  /* ── Ticker ── */
  .ticker-track {
    width: max-content;
    animation: ticker 30s linear infinite;
  }
  .ticker-track:hover { animation-play-state: paused; }

  /* ── Nav active ── */
  .nav-active { color: #fff !important; }

  /* ─── Animations ─── */
  @keyframes shimmer { to { background-position: 200% center; } }

  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  @keyframes orb-move {
    0%, 100% { transform: translate(0, 0); }
    33%       { transform: translate(40px, -30px); }
    66%       { transform: translate(-20px, 20px); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-12px); }
  }

  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-6px); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(172,106,255,0); }
    50%       { box-shadow: 0 0 30px 6px rgba(172,106,255,0.18); }
  }

  @keyframes typing-cursor {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .animate-fadeInDown  { animation: fadeInDown  0.7s ease both; }
  .animate-fadeInUp    { animation: fadeInUp    0.7s ease both; }
  .animate-fadeIn      { animation: fadeIn      0.8s ease both; }
  .animate-scaleIn     { animation: scaleIn     0.9s ease both; }
  .animate-rotateSlow  { animation: rotateSlow  12s linear infinite; }
  .animate-float       { animation: float       4s ease-in-out infinite; }
  .animate-bounce-subtle { animation: bounce-subtle 3s ease-in-out infinite; }
  .animate-pulse-glow  { animation: pulse-glow  3s ease-in-out infinite; }
  .animate-slideInLeft  { animation: slideInLeft  0.7s ease both; }
  .animate-slideInRight { animation: slideInRight 0.7s ease both; }
  .animate-orb         { animation: orb-move 18s ease-in-out infinite; }

  /* ── Scroll reveal ── */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  .reveal-left  { transform: translateX(-30px); }
  .reveal-left.visible { transform: none; }
  .reveal-right { transform: translateX(30px); }
  .reveal-right.visible { transform: none; }
  .reveal-scale { transform: scale(0.94); }
  .reveal-scale.visible { transform: none; }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }
  .reveal-delay-6 { transition-delay: 0.6s; }

  /* ─── Responsive helpers ─── */
  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
  }
`;

export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}