"use client";
import Image from "next/image";
import { useState } from "react";
import { PrimaryButton, OutlineButton } from "./Shared";
import { pricingPlans } from "../constants";


export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
      {/* Stars bg */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}>
        <Image src="/pricing/stars.svg" alt="" fill style={{ objectFit: "cover" }} />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", border: "1px solid rgba(133,141,255,0.3)", marginBottom: "1rem" }}>
            <Image src="/plus-square.svg" alt="" width={14} height={14} />
            <span style={{ fontSize: "0.75rem", color: "var(--color-5)", fontWeight: 500 }}>Transparent Pricing</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Pay once, use <span className="shimmer-text">forever</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "36rem", margin: "0 auto 2rem" }}>
            Every plan comes with a 30-day free trial. No credit card required.
          </p>
          {/* Toggle */}
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 1rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: "0.875rem", color: !annual ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ position: "relative", width: 48, height: 24, borderRadius: 9999, background: annual ? "var(--color-1)" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", transition: "background 0.3s" }}>
              <span style={{ position: "absolute", top: 2, left: 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "transform 0.3s", transform: annual ? "translateX(24px)" : "none", display: "block" }} />
            </button>
            <span style={{ fontSize: "0.875rem", color: annual ? "#fff" : "rgba(255,255,255,0.4)", transition: "color 0.2s" }}>
              Annual <span style={{ fontSize: "0.75rem", color: "var(--color-4)", marginLeft: 2 }}>(−20%)</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
          {pricingPlans.map((plan) => {
            const price = annual ? (parseFloat(plan.price) * 0.8).toFixed(2) : plan.price;
            return (
              <div key={plan.name} className={plan.active ? "animate-pulse-glow card-hover" : "glass card-hover"} style={{ position: "relative", borderRadius: "1.5rem", padding: "2rem", display: "flex", flexDirection: "column", border: plan.active ? "1px solid rgba(172,106,255,0.5)" : "1px solid rgba(255,255,255,0.1)", background: plan.active ? "linear-gradient(180deg, rgba(172,106,255,0.1) 0%, transparent 100%)" : "var(--glass-bg)", transition: "transform 0.25s, box-shadow 0.25s" }}>
                {plan.active && (
                  <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, var(--color-1), var(--color-5))", color: "#fff", fontSize: "0.75rem", fontWeight: 700, padding: "0.375rem 1.25rem", borderRadius: "9999px", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(172,106,255,0.3)" }}>Most Popular</div>
                )}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "3rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>${price === "0.00" ? "0" : price}</span>
                    {plan.price !== "0" && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>/mo</span>}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>{plan.desc}</p>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                  {plan.features.map((feat) => (
                    <div key={feat} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <Image src="/check.svg" alt="✓" width={16} height={16} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: 1.5 }}>{feat}</span>
                    </div>
                  ))}
                </div>
                {plan.active
                  ? <PrimaryButton href="/signup" style={{ width: "100%", padding: "1rem 2rem", fontSize: "1rem", justifyContent: "center" }}>Get started</PrimaryButton>
                  : <OutlineButton href="/signup" style={{ width: "100%", padding: "1rem 2rem", fontSize: "1rem", justifyContent: "center" }}>Get started</OutlineButton>
                }
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem", opacity: 0.3 }}>
          <Image src="/4-small.png" alt="" width={80} height={80} className="animate-float" />
        </div>
      </div>
    </section>
  );
}