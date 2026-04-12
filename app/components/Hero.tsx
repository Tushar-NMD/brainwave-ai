"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { GridBackground, PrimaryButton, OutlineButton } from "./Shared";
import { notifications } from "../constants";


export default function Hero() {
  const [typed, setTyped] = useState("");
  const phrases = ["AI-Powered Future", "Smarter Conversations", "Limitless Creativity"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) { deleting.current = true; setTimeout(tick, 1800); return; }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; phraseIdx.current = (phraseIdx.current + 1) % phrases.length; }
      }
      setTimeout(tick, deleting.current ? 50 : 100);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "4rem", background: "linear-gradient(180deg, #0e0c15 0%, #15131d 100%)" }}>
      {/* BG image */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src="/hero/hero-background.jpg" alt="" fill className="object-cover" style={{ opacity: 0.2 }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,12,21,0.4) 0%, rgba(14,12,21,0.85) 100%)" }} />
      </div>
      <GridBackground />

      {/* Radial glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(172,106,255,0.12) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "72rem", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center", width: "100%" }}>
        {/* Badge */}
        <div className="animate-fadeInDown glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "9999px", border: "1px solid rgba(172,106,255,0.3)", marginBottom: "2rem" }}>
          <Image src="/loading-01.svg" alt="" width={16} height={16} className="animate-rotateSlow" />
          <span style={{ fontSize: "0.75rem", color: "var(--color-1)", fontWeight: 500, letterSpacing: "0.05em" }}>Explore the Possibilities of AI</span>
        </div>

        {/* Heading */}
        <h1 className="animate-fadeInUp" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, color: "#fff", marginBottom: "1.5rem", lineHeight: 1.15, animationDelay: "0.1s" }}>
          Explore the Future of{" "}
          <br />
          <span className="shimmer-text">
            {typed}
            <span style={{ display: "inline-block", width: 2, height: "1em", background: "var(--color-1)", marginLeft: 4, verticalAlign: "middle", animation: "typing-cursor 0.8s step-end infinite" }} />
          </span>
        </h1>

        {/* Subtext */}
        <p className="animate-fadeInUp" style={{ fontSize: "1.125rem", color: "rgba(255,255,255,0.6)", maxWidth: "40rem", margin: "0 auto 2.5rem", lineHeight: 1.7, animationDelay: "0.25s" }}>
          Brainwave unlocks the potential of AI-powered applications — chatbots, image generation, and much more. Supercharge your creativity and productivity.
        </p>

        {/* Buttons */}
        <div className="animate-fadeInUp" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", alignItems: "center", animationDelay: "0.4s" }}>
          <PrimaryButton href="/signup" style={{ padding: "1rem 2.25rem", fontSize: "1rem" }}>
            <Image src="/play.svg" alt="" width={18} height={18} />
            Get started
          </PrimaryButton>
          <OutlineButton href="#howitworks" style={{ padding: "1rem 2.25rem", fontSize: "1rem" }}>
            <Image src="/search-md.svg" alt="" width={18} height={18} />
            How it works
          </OutlineButton>
        </div>

        {/* Stats */}
        <div className="animate-fadeIn" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", marginTop: "4rem", animationDelay: "0.6s" }}>
          {[{ val: "1M+", label: "Happy Users" }, { val: "99.9%", label: "Uptime" }, { val: "50+", label: "AI Models" }].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="shimmer-text" style={{ fontSize: "2rem", fontWeight: 700 }}>{s.val}</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Hero image */}
        <div className="animate-scaleIn gradient-border" style={{ position: "relative", marginTop: "4rem", borderRadius: "1.5rem", overflow: "hidden", animationDelay: "0.5s" }}>
          {/* Glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(172,106,255,0.3) 0%, transparent 70%)", filter: "blur(30px)", transform: "scale(1.1)", borderRadius: "inherit", zIndex: 0, pointerEvents: "none" }} />
          <Image src="/hero/robot.jpg" alt="AI Robot" width={960} height={540} style={{ width: "100%", height: "auto", display: "block", borderRadius: "inherit" }} priority />
          {/* Notification cards */}
          <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {notifications.map((n, i) => (
              <div key={n.name} className="glass animate-fadeInUp" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 1rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)", animationDelay: `${0.8 + i * 0.15}s` }}>
                <Image src={n.img} alt={n.name} width={32} height={32} style={{ borderRadius: "50%" }} />
                <div>
                  <p style={{ fontSize: "0.75rem", color: "#fff", fontWeight: 600, margin: 0 }}>{n.name}</p>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>{n.text}</p>
                </div>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginLeft: "0.5rem" }}>{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}