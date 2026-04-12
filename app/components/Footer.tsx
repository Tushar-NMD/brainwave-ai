"use client";
import Image from "next/image";
import { socialLinks, footerLinks } from "../constants";


export default function Footer() {
  return (
    <footer style={{ position: "relative", borderTop: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none", backgroundImage: "url('/grid.png')", backgroundRepeat: "repeat", backgroundSize: "60px 60px" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Top row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              {/* <Image src="/brainwave-symbol.svg" alt="" width={28} height={28} /> */}
              <Image src="/brainwave.svg" alt="Brainwave" width={90} height={20} />
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: "20rem" }}>
              Brainwave is the AI platform for the modern era — making intelligent tools accessible to everyone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="glass card-hover" style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.1)", textDecoration: "none", transition: "border-color 0.2s" }}>
                  <Image src={s.icon} alt={s.label} width={16} height={16} style={{ opacity: 0.6 }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "1rem" }}>{section}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* <Image src="/brainwave-symbol.svg" alt="" width={16} height={16} style={{ opacity: 0.4 }} /> */}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem" }}>© 2026 Brainwave. All rights reserved.</span>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}