"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { navLinks } from "../constants";
import { PrimaryButton } from "./Shared";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const checkActive = useCallback(() => {
    const ids = ["features", "howitworks", "pricing", "roadmap"];
    let found = "";
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && window.scrollY + 130 >= el.offsetTop) found = `#${id}`;
    }
    setActiveSection(found);
  }, []);

  useEffect(() => {
    const handler = () => { setScrolled(window.scrollY > 20); checkActive(); };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [checkActive]);

  const navStyle: React.CSSProperties = {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 50,
    transition: "all 0.5s",
    background: scrolled ? "rgba(14,12,21,0.85)" : "transparent",
    backdropFilter: scrolled ? "blur(16px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
    boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
  };

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", height: "4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <Image src="/brainwave.svg" alt="Brainwave" width={120} height={26} />
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hide-mobile">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a key={link.href} href={link.href} style={{ fontSize: "0.875rem", color: isActive ? "#fff" : "rgba(255,255,255,0.6)", textDecoration: "none", position: "relative", transition: "color 0.2s" }}>
                {link.label}
                <span style={{ position: "absolute", bottom: -2, left: 0, height: 1, background: "var(--color-1)", width: isActive ? "100%" : 0, transition: "width 0.3s" }} />
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hide-mobile">
          <a href="/login" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "0.5rem 1rem", transition: "color 0.2s" }}>Sign in</a>
          <PrimaryButton href="/signup" style={{ padding: "0.875rem 2rem", fontSize: "0.9375rem" }}>Get started</PrimaryButton>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ display: "none", flexDirection: "column", gap: 6, padding: 8, background: "none", border: "none", cursor: "pointer" }}
          className="mobile-menu-btn"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2,
              transition: "all 0.3s",
              transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px, 6px)" : menuOpen && i === 1 ? "scaleX(0)" : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -6px)" : "none",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        maxHeight: menuOpen ? "20rem" : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease",
        background: "rgba(14,12,21,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}>
        <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.875rem" }}>
              {link.label}
            </a>
          ))}
          <PrimaryButton href="/signup">Get started</PrimaryButton>
        </div>
      </div>

      {/* Mobile menu CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}