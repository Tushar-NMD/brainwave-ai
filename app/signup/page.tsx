"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phoneNumber: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Restrict Phone and Password to digits only
    if ((name === "phoneNumber" || name === "password" || name === "confirmPassword") && value && !/^\d+$/.test(value)) {
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.phoneNumber)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (!/^\d{5}$/.test(form.password)) {
      setError("Password must be exactly 5 digits.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phoneNumber: form.phoneNumber, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registration failed."); return; }
      router.push("/login");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #0E0C15; color: #fff; overflow-x: hidden; }

        @keyframes orb-move {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(40px,-30px); }
          66%      { transform: translate(-20px,20px); }
        }
        @keyframes fadeInUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmer { to { background-position: 200% center; } }
        @keyframes pulse-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(172,106,255,0); }
          50%      { box-shadow: 0 0 30px 6px rgba(172,106,255,0.18); }
        }

        .auth-card {
          animation: fadeInUp 0.7s ease both;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.5rem;
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
        }
        .auth-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 0.75rem;
          padding: 0.875rem 1.125rem;
          color: #fff;
          font-size: 0.9375rem;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.3); }
        .auth-input:focus {
          border-color: rgba(172,106,255,0.6);
          box-shadow: 0 0 0 3px rgba(172,106,255,0.12);
        }
        .auth-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #AC6AFF, #858DFF);
          border: none;
          border-radius: 0.75rem;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .auth-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(172,106,255,0.4); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .shimmer-text {
          background: linear-gradient(90deg, #AC6AFF, #858DFF, #FFC876, #AC6AFF);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .auth-link { color: rgba(172,106,255,0.9); text-decoration: none; font-weight: 600; transition: color 0.2s; }
        .auth-link:hover { color: #fff; }
        .error-box {
          background: rgba(255,119,111,0.12);
          border: 1px solid rgba(255,119,111,0.35);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #FF776F;
          font-size: 0.875rem;
        }
      `}</style>

      {/* Orb backgrounds */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: "10%", left: "5%", background: "radial-gradient(circle, rgba(172,106,255,0.1) 0%, transparent 70%)", filter: "blur(40px)", animation: "orb-move 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: "15%", right: "5%", background: "radial-gradient(circle, rgba(133,141,255,0.08) 0%, transparent 70%)", filter: "blur(40px)", animation: "orb-move 15s ease-in-out infinite reverse" }} />
      </div>

      <main style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        {/* Logo */}
        <Link href="/" style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <Image src="/brainwave.svg" alt="Brainwave" width={130} height={28} />
        </Link>

        <div className="auth-card">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Create your <span className="shimmer-text">account</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>Join Brainwave and start exploring AI</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem", fontWeight: 500 }}>Full Name</label>
              <input className="auth-input" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem", fontWeight: 500 }}>Phone Number</label>
              <input className="auth-input" name="phoneNumber" type="tel" placeholder="10-digit number" value={form.phoneNumber} onChange={handleChange} maxLength={10} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem", fontWeight: 500 }}>Password</label>
              <input className="auth-input" name="password" type="password" placeholder="5-digit PIN" value={form.password} onChange={handleChange} maxLength={5} required />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem", fontWeight: 500 }}>Confirm Password</label>
              <input className="auth-input" name="confirmPassword" type="password" placeholder="Repeat your PIN" value={form.confirmPassword} onChange={handleChange} maxLength={5} required />
            </div>

            {error && <div className="error-box">{error}</div>}

            <button type="submit" className="auth-btn" disabled={loading} style={{ marginTop: "0.5rem" }}>
              {loading ? "Creating Account…" : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link href="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </main>
    </>
  );
}
