"use client";

import { useScrollReveal, GlobalStyles } from "./components/GlobalStyles";
import { BackgroundOrbs } from "./components/Shared";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Benefits from "./components/Benefits";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";
import AboutSection from "./components/AboutSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import app from "./lib/firebase";

// Log app to keep it from being tree-shaken if it was doing side effects
if (typeof window !== "undefined") {
  console.log("firebase connected", app);
}

export default function Home() {
  useScrollReveal();

  return (
    <>
      <GlobalStyles />
      <div style={{ position: "relative", minHeight: "100vh", background: "#0E0C15", color: "#fff", overflowX: "hidden" }}>
        <BackgroundOrbs />
        <Navbar />
        <main style={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <Ticker />
          <div className="section-line" />
          <HowItWorks />
          <div className="section-line" />
          <Services />
          <div className="section-line" />
          <Benefits />
          <div className="section-line" />
          <Pricing />
          <div className="section-line" />
          <Roadmap />
          <div className="section-line" />
          <AboutSection />
          <div className="section-line" />
          <CTASection />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
