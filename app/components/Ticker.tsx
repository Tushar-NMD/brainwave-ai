"use client";
import Image from "next/image";


export default function Ticker() {
  const items = [
    { icon: "/brainwave-symbol-white.svg", text: "AI Chatbot" },
    { icon: "/recording-01.svg", text: "Voice AI" },
    { icon: "/file-02.svg", text: "Doc Intelligence" },
    { icon: "/disc-02.svg", text: "Audio Analysis" },
    { icon: "/search-md.svg", text: "Smart Search" },
    { icon: "/home-smile.svg", text: "Smart Home" },
    { icon: "/sliders-04.svg", text: "Fine-tuned Models" },
    { icon: "/chrome-cast.svg", text: "Cast & Stream" },
    { icon: "/plus-square.svg", text: "Infinite Plugins" },
    { icon: "/loading-01.svg", text: "Real-time AI" },
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
      <div className="ticker-track flex items-center" style={{ gap: "3rem" }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center flex-shrink-0" style={{ gap: "0.625rem" }}>
            <Image src={item.icon} alt="" width={14} height={14} style={{ opacity: 0.5 }} />
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.text}</span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}