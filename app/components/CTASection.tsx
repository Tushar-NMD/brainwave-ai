"use client";
import Image from "next/image";
import { PrimaryButton, OutlineButton } from "./Shared";


export default function CTASection() {
  return (
    <section style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(172,106,255,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="glass animate-pulse-glow gradient-border" style={{ borderRadius: "2rem", padding: "4rem 3rem", textAlign: "center", border: "1px solid rgba(172,106,255,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, background: "radial-gradient(circle at 30% 50%, #AC6AFF 0%, transparent 60%), radial-gradient(circle at 70% 50%, #858DFF 0%, transparent 60%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 10 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1.5rem", lineHeight: 1.2 }}>
              Ready to unlock the{" "}
              <span className="shimmer-text">power of AI?</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.125rem", marginBottom: "2rem", maxWidth: "36rem", margin: "0 auto 2rem", lineHeight: 1.6 }}>
              Join over 1 million users who are already building smarter with Brainwave. Start free today.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              <PrimaryButton href="/signup" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
                <Image src="/play.svg" alt="" width={16} height={16} />
                Start for free
              </PrimaryButton>
              <OutlineButton href="#" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
                <Image src="/file-02.svg" alt="" width={16} height={16} />
                View documentation
              </OutlineButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}