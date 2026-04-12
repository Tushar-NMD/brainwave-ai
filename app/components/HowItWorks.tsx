"use client";
import Image from "next/image";
import { GridBackground, PrimaryButton } from "./Shared";
import { collabApps } from "../constants";


export default function HowItWorks() {
  return (
    <section id="howitworks" className="section-bg" style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
      <GridBackground />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", border: "1px solid rgba(255,200,118,0.3)", marginBottom: "1rem" }}>
            <Image src="/chrome-cast.svg" alt="" width={14} height={14} />
            <span style={{ fontSize: "0.75rem", color: "var(--color-2)", fontWeight: 500 }}>Collaboration Made Easy</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem", lineHeight: 1.2 }}>
            AI Powers Your{" "}
            <span className="shimmer-text">Favourite Apps</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "36rem", margin: "0 auto" }}>
            Brainwave seamlessly integrates with the tools you already love — no setup headaches.
          </p>
        </div>

        {/* Content row */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4rem" }}>
          {/* Orbit */}
          <div style={{ position: "relative", width: 380, height: 380, flexShrink: 0, margin: "0 auto" }}>
            {/* Center */}
            <div className="glass animate-pulse-glow" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 80, height: 80, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(172,106,255,0.4)", zIndex: 20 }}>
              <Image src="/brainwave-symbol-white.svg" alt="Brainwave" width={36} height={36} />
            </div>
            {/* Rings */}
            <div className="animate-rotateSlow" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 256, height: 256, borderRadius: "50%", border: "1px solid rgba(172,106,255,0.2)" }} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(172,106,255,0.1)", animation: "rotateSlow 30s linear infinite reverse" }} />
            {/* Icons */}
            {collabApps.map((app, i) => {
              const angle = (i / collabApps.length) * 360;
              const rad = (angle * Math.PI) / 180;
              const r = 140;
              return (
                <div key={app.name} className="glass card-hover" style={{ position: "absolute", width: 48, height: 48, borderRadius: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", top: `calc(50% + ${Math.sin(rad) * r}px - 24px)`, left: `calc(50% + ${Math.cos(rad) * r}px - 24px)`, animation: "fadeIn 0.5s ease forwards", animationDelay: `${i * 0.1}s`, opacity: 0 }} title={app.name}>
                  <Image src={app.src} alt={app.name} width={28} height={28} style={{ objectFit: "contain" }} />
                </div>
              );
            })}
            {/* Curves */}
            <div style={{ position: "absolute", top: 0, left: 0, opacity: 0.4 }}><Image src="/collabration/curve-1.svg" alt="" width={100} height={100} /></div>
            <div style={{ position: "absolute", bottom: 0, right: 0, opacity: 0.4 }}><Image src="/collabration/curve-2.svg" alt="" width={100} height={100} /></div>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: "20rem" }}>
            <h3 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#fff", marginBottom: "1.5rem", lineHeight: 1.3 }}>
              One platform — <span style={{ color: "var(--color-1)" }}>infinite integrations</span>
            </h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.125rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Connect Brainwave to Figma, Notion, Slack, Discord, and dozens of other tools you rely on. Let AI automate workflows while you focus on what truly matters.
            </p>
            {/* Mini feature grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2.5rem" }}>
              {[{ icon: "/home-smile.svg", label: "Smart Suggestions" }, { icon: "/file-02.svg", label: "Document AI" }, { icon: "/recording-01.svg", label: "Voice Commands" }, { icon: "/disc-02.svg", label: "Audio Analysis" }].map((f) => (
                <div key={f.label} className="glass card-hover" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Image src={f.icon} alt={f.label} width={20} height={20} />
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>{f.label}</span>
                </div>
              ))}
            </div>
            <PrimaryButton href="#features" style={{ padding: "1rem 2.25rem", fontSize: "1rem" }}>
              <Image src="/plus-square.svg" alt="" width={18} height={18} />
              Explore integrations
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}