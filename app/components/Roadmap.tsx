"use client";
import Image from "next/image";
import { GridBackground } from "./Shared";
import { roadmapItems } from "../constants";


export default function Roadmap() {
  return (
    <section id="roadmap" className="section-bg" style={{ position: "relative", padding: "7rem 0", overflow: "hidden" }}>
      <GridBackground />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 1rem", borderRadius: "9999px", border: "1px solid rgba(255,200,118,0.3)", marginBottom: "1rem" }}>
            <Image src="/roadmap/done.svg" alt="" width={14} height={14} />
            <span style={{ fontSize: "0.75rem", color: "var(--color-2)", fontWeight: 500 }}>What&apos;s Coming</span>
          </div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
            Our <span className="shimmer-text">Roadmap</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "36rem", margin: "0 auto" }}>
            We&apos;re building toward the future. Here&apos;s what we&apos;re working on next.
          </p>
        </div>

        {/* Grid - 2 columns, 2 items each side vertically */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
          {roadmapItems.map((item, i) => (
            <div key={item.title} className={`glass card-hover ${i % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight"}`} style={{ borderRadius: "1.5rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Image */}
              <div style={{ position: "relative", height: "12rem", overflow: "hidden" }}>
                <Image src={item.img} alt={item.title} fill style={{ objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(14,12,21,0.9) 100%)" }} />
                {/* Badge */}
                <div style={{ position: "absolute", top: "1rem", right: "1rem", display: "flex", alignItems: "center", gap: "0.375rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, background: item.status === "done" ? "rgba(122,219,120,0.2)" : "rgba(255,200,118,0.2)", color: item.status === "done" ? "var(--color-4)" : "var(--color-2)" }}>
                  <Image src={item.status === "done" ? "/roadmap/done.svg" : "/roadmap/undone.svg"} alt={item.status} width={12} height={12} />
                  {item.status === "done" ? "Done" : "In Progress"}
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500, marginBottom: "0.5rem" }}>{item.date}</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", marginTop: "4rem", opacity: 0.3 }}>
          <Image src="/roadmap/coins.png" alt="" width={80} height={80} className="animate-float" />
          <Image src="/roadmap/hero.png" alt="" width={120} height={120} style={{ borderRadius: "1rem" }} className="animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}