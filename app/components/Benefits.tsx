"use client";
import Image from "next/image";
import { GridBackground } from "./Shared";
import { benefits } from "../constants";


export default function Benefits() {
  return (
    <section className="section-bg" style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
      <GridBackground />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "4rem" }}>
          {/* Left sticky panel */}
          <div style={{ width: "18rem", flexShrink: 0, position: "sticky", top: "6rem", textAlign: "left" }}>
            <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", border: "1px solid rgba(255,152,226,0.3)", marginBottom: "1rem" }}>
              <Image src="/check-02.svg" alt="" width={14} height={14} />
              <span style={{ fontSize: "0.75rem", color: "var(--color-6)", fontWeight: 500 }}>Why Brainwave?</span>
            </div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#fff", marginBottom: "1.25rem", lineHeight: 1.2 }}>
              Explore the <span className="shimmer-text">Benefits</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Discover how Brainwave empowers individuals and teams to ship smarter, faster, and with more creativity.
            </p>
            <Image src="/benifits/image-2.png" alt="" width={280} height={280} className="animate-float" style={{ borderRadius: "1.5rem", display: "block" }} />
          </div>

          {/* Cards grid */}
          <div style={{ flex: 1, minWidth: "20rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
            {benefits.map((b, i) => (
              <div key={b.title + i} className="glass card-hover" style={{ borderRadius: "1.5rem", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}>
                <div style={{ width: 48, height: 48, borderRadius: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", background: `${b.color}20`, border: `1px solid ${b.color}40` }}>
                  <Image src={b.icon} alt={b.title} width={24} height={24} />
                </div>
                <h3 style={{ fontWeight: 700, color: "#fff", fontSize: "1.125rem", marginBottom: "0.5rem" }}>{b.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>{b.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.75rem", fontWeight: 500, color: b.color }}>
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}