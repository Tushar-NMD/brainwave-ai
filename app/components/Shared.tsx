"use client";
import React from "react";
import Image from "next/image";

export function GridBackground() {
  return (
    <div
      className="absolute inset-0 opacity-[0.18] pointer-events-none"
      style={{ backgroundImage: "url('/grid.png')", backgroundRepeat: "repeat", backgroundSize: "60px 60px" }}
    />
  );
}

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute w-[600px] h-[600px] rounded-full animate-orb" style={{ top: "10%", left: "5%", background: "radial-gradient(circle, rgba(172,106,255,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full" style={{ bottom: "20%", right: "5%", background: "radial-gradient(circle, rgba(255,200,118,0.06) 0%, transparent 70%)", filter: "blur(40px)", animation: "orb-move 15s ease-in-out infinite reverse" }} />
      <div className="absolute w-[400px] h-[400px] rounded-full" style={{ top: "50%", left: "50%", background: "radial-gradient(circle, rgba(133,141,255,0.05) 0%, transparent 70%)", filter: "blur(40px)", animation: "orb-move 20s ease-in-out infinite", transform: "translate(-50%, -50%)" }} />
    </div>
  );
}

export function PrimaryButton({ children, href, onClick, style }: { children: React.ReactNode; href?: string; onClick?: () => void; style?: React.CSSProperties }) {
  const cls = "btn-primary inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm cursor-pointer";
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

export function OutlineButton({ children, href, style }: { children: React.ReactNode; href?: string; style?: React.CSSProperties }) {
  const cls = "btn-outline inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white font-semibold text-sm cursor-pointer";
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button className={cls} style={style}>{children}</button>;
}