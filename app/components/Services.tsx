"use client";
import Image from "next/image";
import { GridBackground } from "./Shared";


export default function Services() {
  return (
    <section id="features" style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
      <GridBackground />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", border: "1px solid rgba(122,219,120,0.3)", marginBottom: "1rem" }}>
            <Image src="/sliders-04.svg" alt="" width={14} height={14} />
            <span style={{ fontSize: "0.75rem", color: "var(--color-4)", fontWeight: 500 }}>What We Offer</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Explore Our <span className="shimmer-text">AI Services</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "36rem", margin: "0 auto" }}>
            From intelligent chat to stunning AI art — Brainwave has everything your creative workflow needs.
          </p>
        </div>

        {/* Big card */}
        <div className="gradient-border" style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden", marginBottom: "2rem" }}>
          <Image src="/services/service-1.png" alt="AI Chat" width={1200} height={550} style={{ width: "100%", height: "420px", objectFit: "cover", display: "block", transition: "transform 0.7s" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(14,12,21,0.85) 0%, rgba(14,12,21,0.2) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div className="glass" style={{ display: "inline-flex", padding: "0.375rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", color: "var(--color-1)", fontWeight: 500, border: "1px solid rgba(172,106,255,0.3)", marginBottom: "1rem", width: "fit-content" }}>
              Featured Service
            </div>
            <h3 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>Intelligent AI Chatbot</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: "36rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Chat with a state-of-the-art AI that understands context, remembers your preferences, and learns from every interaction.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {["NLP", "Context-aware", "Multi-language", "24/7 Active"].map((tag) => (
                <span key={tag} className="glass" style={{ padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 2-col cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {[
            { src: "/services/service-2.png", title: "AI Image Generation", desc: "Turn your text into stunning visuals. Realistic art, illustrations, or abstract designs — all with one prompt.", tags: ["Stable Diffusion", "DALL-E", "Midjourney"] },
            { src: "/services/service-3.png", title: "AI Code Assistant", desc: "Auto-complete, debug, and refactor code across 30+ languages. Your pair programmer that never sleeps.", tags: ["Code Review", "Auto-fix", "30+ Languages"] },
          ].map((s) => (
            <div key={s.title} className="gradient-border card-hover" style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden" }}>
              <Image src={s.src} alt={s.title} width={600} height={400} style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(14,12,21,0.95) 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: 1.6 }}>{s.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {s.tags.map((t) => (
                    <span key={t} className="glass" style={{ padding: "0.25rem 0.625rem", borderRadius: "9999px", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}