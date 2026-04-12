"use client";
import Image from "next/image";
import { GridBackground } from "./Shared";


export default function AboutSection() {
  return (
    <section style={{ position: "relative", padding: "7rem 0", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src="/background.jpg" alt="" fill style={{ objectFit: "cover", opacity: 0.1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0e0c15 0%, transparent 30%, transparent 70%, #0e0c15 100%)" }} />
      </div>
      <GridBackground />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", border: "1px solid rgba(255,119,111,0.3)", marginBottom: "2rem" }}>
          <Image src="/recording-03.svg" alt="" width={14} height={14} />
          <span style={{ fontSize: "0.75rem", color: "var(--color-3)", fontWeight: 500 }}>About Brainwave</span>
        </div>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", fontWeight: 700, color: "#fff", marginBottom: "1.5rem", maxWidth: "56rem", margin: "0 auto 1.5rem", lineHeight: 1.15 }}>
          Bringing AI to every corner of your
          <span className="shimmer-text"> digital life</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "40rem", margin: "0 auto 3rem", fontSize: "1.125rem", lineHeight: 1.7 }}>
          We believe that AI should be accessible to everyone — from solo creators to enterprise teams. Brainwave is the single platform that ties it all together.
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", opacity: 0.4, marginBottom: "4rem" }}>
          <Image src="/yourlogo.svg" alt="Logo" width={120} height={40} />
          <Image src="/yourlogo.svg" alt="Logo" width={100} height={36} style={{ opacity: 0.6 }} />
          <Image src="/yourlogo.svg" alt="Logo" width={80} height={28} style={{ opacity: 0.4 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
          <Image src="/loading.png" alt="" width={48} height={48} className="animate-rotateSlow" style={{ opacity: 0.6 }} />
          <Image src="/loading-01.svg" alt="" width={40} height={40} style={{ opacity: 0.4, animation: "rotateSlow 12s linear infinite reverse" }} />
        </div>
      </div>
    </section>
  );
}