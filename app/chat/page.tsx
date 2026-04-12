"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  userMessage: string;
  aiResponse: string;
  imageUrl?: string | null;
  createdAt?: Date | null;
}

// ─── Markdown-lite renderer (bold, inline code, newlines) ────────────────────
function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, '<code style="background:rgba(172,106,255,0.15);padding:2px 6px;border-radius:4px;font-size:0.85em">$1</code>')
    .replace(/\n/g, "<br/>");
}

export default function ChatPage() {
  const router = useRouter();

  // Auth
  const [token, setToken]   = useState("");
  const [userId, setUserId] = useState("");

  // History / messages
  const [history, setHistory]     = useState<ChatMessage[]>([]);
  const [selected, setSelected]   = useState<ChatMessage | null>(null);
  const [activeMsgs, setActiveMsgs] = useState<{ role: "user" | "ai"; text: string; img?: string | null }[]>([]);

  // Input
  const [input, setInput]   = useState("");
  const [image, setImage]   = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileRef        = useRef<HTMLInputElement>(null);

  // ── Bootstrap ────────────────────────────────────────────────────────────
  useEffect(() => {
    const t  = localStorage.getItem("token")  || "";
    const uid = localStorage.getItem("userId") || "";
    if (!t || !uid) { router.push("/login"); return; }
    setToken(t);
    setUserId(uid);
  }, [router]);

  const fetchHistory = useCallback(async () => {
    if (!token || !userId) return;
    try {
      const res  = await fetch(`/api/history?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (res.ok) setHistory(data.messages || []);
    } catch { /* silent */ }
  }, [token, userId]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [activeMsgs, loading]);

  // ── Select a history item ─────────────────────────────────────────────────
  const selectChat = (msg: ChatMessage) => {
    setSelected(msg);
    setActiveMsgs([
      { role: "user", text: msg.userMessage, img: msg.imageUrl },
      { role: "ai",   text: msg.aiResponse },
    ]);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const newChat = () => {
    setSelected(null);
    setActiveMsgs([]);
    setInput("");
    setImage(null);
    setPreview(null);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // ── Image pick ────────────────────────────────────────────────────────────
  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => { setImage(null); setPreview(null); if (fileRef.current) fileRef.current.value = ""; };

  // ── Send ──────────────────────────────────────────────────────────────────
  const sendMessage = async () => {
    if (!input.trim() && !image) return;
    setLoading(true);

    const userText = input.trim();
    setActiveMsgs(prev => [...prev, { role: "user", text: userText, img: preview }]);
    setInput("");

    let imageUrl: string | null = null;

    // Upload image if present
    if (image) {
      try {
        const fd = new FormData();
        fd.append("file", image);
        const upRes  = await fetch("/api/upload", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd });
        const upData = await upRes.json();
        imageUrl = upData.imageUrl || null;
      } catch { /* skip image on upload fail */ }
      removeImage();
    }

    try {
      const res  = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: userText, userId, imageUrl }),
      });
      const data = await res.json();
      const reply = res.ok ? (data.response || "…") : (data.error || "Something went wrong.");
      setActiveMsgs(prev => [...prev, { role: "ai", text: reply }]);
      fetchHistory();
    } catch {
      setActiveMsgs(prev => [...prev, { role: "ai", text: "Network error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; font-family: 'Inter', sans-serif; background: #0E0C15; color: #fff; overflow: hidden; }

        @keyframes orb-move {
          0%,100% { transform: translate(0,0); }
          33%      { transform: translate(40px,-30px); }
          66%      { transform: translate(-20px,20px); }
        }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer  { to   { background-position:200% center; } }
        @keyframes pulse-glow {
          0%,100% { box-shadow:0 0 0 0 rgba(172,106,255,0); }
          50%      { box-shadow:0 0 24px 4px rgba(172,106,255,0.2); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes msgIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }

        .shimmer-text {
          background: linear-gradient(90deg, #AC6AFF, #858DFF, #FFC876, #AC6AFF);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .sidebar {
          width: 280px; flex-shrink: 0;
          background: #11101A;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column;
          height: 100vh; overflow: hidden;
          transition: transform 0.3s ease, width 0.3s ease;
        }
        .sidebar.closed { transform: translateX(-100%); width: 0; overflow: hidden; border: none; }
        .hist-item {
          padding: 0.75rem 1rem;
          border-radius: 0.625rem;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.55);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          border: 1px solid transparent;
        }
        .hist-item:hover { background: rgba(172,106,255,0.1); color: #fff; border-color: rgba(172,106,255,0.2); }
        .hist-item.active { background: rgba(172,106,255,0.15); color: #fff; border-color: rgba(172,106,255,0.3); }
        .new-chat-btn {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, rgba(172,106,255,0.25), rgba(133,141,255,0.15));
          border: 1px solid rgba(172,106,255,0.35);
          border-radius: 0.75rem; cursor: pointer; color: #fff;
          font-size: 0.875rem; font-weight: 600; font-family: 'Inter', sans-serif;
          transition: background 0.2s, transform 0.2s;
          width: 100%;
        }
        .new-chat-btn:hover { background: linear-gradient(135deg,rgba(172,106,255,0.4),rgba(133,141,255,0.25)); transform: translateY(-1px); }
        .logout-btn {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.75rem 1rem;
          background: rgba(255,119,111,0.08);
          border: 1px solid rgba(255,119,111,0.2);
          border-radius: 0.75rem; cursor: pointer; color: #FF776F;
          font-size: 0.875rem; font-weight: 600; font-family: 'Inter', sans-serif;
          transition: background 0.2s, transform 0.2s;
          width: 100%;
        }
        .logout-btn:hover { background: rgba(255,119,111,0.16); transform: translateY(-1px); }
        .msg-bubble {
          max-width: 72%; padding: 0.875rem 1.125rem;
          border-radius: 1.125rem; font-size: 0.9125rem; line-height: 1.65;
          animation: msgIn 0.3s ease both;
        }
        .msg-user {
          background: linear-gradient(135deg, #AC6AFF, #858DFF);
          color: #fff; border-bottom-right-radius: 0.25rem;
          align-self: flex-end;
        }
        .msg-ai {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.88);
          border-bottom-left-radius: 0.25rem;
          align-self: flex-start;
        }
        .chat-input {
          flex: 1; background: transparent; border: none; outline: none;
          color: #fff; font-size: 0.9375rem; font-family: 'Inter', sans-serif;
          resize: none; line-height: 1.5; max-height: 120px;
        }
        .chat-input::placeholder { color: rgba(255,255,255,0.28); }
        .send-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #AC6AFF, #858DFF);
          border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: transform 0.2s, box-shadow 0.2s;
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .send-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(172,106,255,0.5); }
        .send-btn:disabled { opacity: 0.5; cursor: not-allowed; animation: none; }
        .icon-btn {
          width: 38px; height: 38px; border-radius: 0.625rem;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; flex-shrink: 0; color: rgba(255,255,255,0.55);
        }
        .icon-btn:hover { background: rgba(172,106,255,0.15); color: #fff; border-color: rgba(172,106,255,0.3); }
        .toggle-btn {
          width: 32px; height: 32px; border-radius: 0.5rem;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; flex-shrink: 0; color: rgba(255,255,255,0.55);
        }
        .toggle-btn:hover { background: rgba(172,106,255,0.15); color: #fff; }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(172,106,255,0.8);
          animation: blink 1.2s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @media (max-width: 768px) {
          .sidebar { position: absolute; z-index: 100; height: 100vh; padding-top: 5rem !important; background: #0E0C15; width: 85vw; max-width: 320px; transform: translateX(0); }
          .sidebar.closed { transform: translateX(-100%); width: 0; background: transparent; }
          .top-title { display: none; }
          .mobile-logo { display: block !important; }
          .toggle-btn { z-index: 110; position: relative; }
        }
      `}</style>

      {/* Fixed orb BG */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: "10%", left: "5%", background: "radial-gradient(circle, rgba(172,106,255,0.08) 0%, transparent 70%)", filter: "blur(40px)", animation: "orb-move 18s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: "15%", right: "5%", background: "radial-gradient(circle, rgba(133,141,255,0.06) 0%, transparent 70%)", filter: "blur(40px)", animation: "orb-move 15s ease-in-out infinite reverse" }} />
      </div>

      {/* App shell */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", height: "100vh", overflow: "hidden" }}>

        {/* ── Sidebar ─────────────────────────────────────────────────────── */}
        <aside className={`sidebar${sidebarOpen ? "" : " closed"}`}>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1.5rem", height: "100%", overflow: "hidden" }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
              <Image src="/brainwave.svg" alt="Brainwave" width={110} height={24} />
            </Link>

            {/* New Chat */}
            <button className="new-chat-btn" onClick={newChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              New Chat
            </button>

            {/* History list */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "0.25rem", paddingLeft: "0.25rem" }}>History</p>
              {history.length === 0 && (
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)", paddingLeft: "0.25rem" }}>No conversations yet</p>
              )}
              {[...history].reverse().map((msg) => (
                <div
                  key={msg.id}
                  className={`hist-item${selected?.id === msg.id ? " active" : ""}`}
                  onClick={() => selectChat(msg)}
                  title={msg.userMessage}
                >
                  <span style={{ marginRight: "0.5rem", opacity: 0.5 }}>💬</span>
                  {msg.userMessage}
                </div>
              ))}
            </div>

            {/* Logout */}
            <button className="logout-btn" onClick={logout} style={{ flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Logout
            </button>
          </div>
        </aside>

        {/* ── Main chat area ───────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Top bar */}
          <header style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0, backdropFilter: "blur(12px)", background: "rgba(14,12,21,0.6)" }}>
            <button className="toggle-btn" onClick={() => setSidebarOpen(o => !o)} aria-label="Toggle sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div className="mobile-logo" style={{ display: "none", opacity: sidebarOpen ? 0 : 1 }}>
              <Image src="/brainwave.svg" alt="Brainwave" width={100} height={20} />
            </div>
            <h1 className="top-title" style={{ fontSize: "1rem", fontWeight: 700, flex: 1 }}>
              {selected ? <span className="shimmer-text">{selected.userMessage.slice(0, 50)}{selected.userMessage.length > 50 ? "…" : ""}</span> : <span className="shimmer-text">Brainwave AI</span>}
            </h1>
          </header>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {activeMsgs.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "1.25rem", opacity: 0.55 }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "radial-gradient(circle, rgba(172,106,255,0.3), transparent)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(172,106,255,0.3)", animation: "pulse-glow 3s ease-in-out infinite" }}>
                  <Image src="/brainwave-symbol.svg" alt="" width={36} height={36} />
                </div>
                <p style={{ fontSize: "1.125rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>How can I help you today?</p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textAlign: "center", maxWidth: "320px" }}>Ask me anything — text, images, code, or ideas.</p>
              </div>
            )}
            {activeMsgs.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start", gap: "0.5rem" }}>
                {/* Avatar label */}
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.05em", paddingInline: "0.25rem" }}>
                  {m.role === "user" ? "You" : "Brainwave AI"}
                </span>
                {/* Image preview */}
                {m.img && (
                  <img src={m.img} alt="attached" style={{ maxWidth: "240px", borderRadius: "0.875rem", border: "1px solid rgba(255,255,255,0.1)", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }} />
                )}
                <div className={`msg-bubble ${m.role === "user" ? "msg-user" : "msg-ai"}`}
                  dangerouslySetInnerHTML={m.role === "ai" ? { __html: renderMarkdown(m.text) } : undefined}
                >
                  {m.role === "user" ? m.text : undefined}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontWeight: 600, letterSpacing: "0.05em", paddingTop: "0.5rem" }}>Brainwave AI</span>
                <div className="msg-bubble msg-ai" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "0.875rem 1.125rem" }}>
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Input bar ────────────────────────────────────────────────── */}
          <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            {/* Image preview strip */}
            {preview && (
              <div style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img src={preview} alt="preview" style={{ height: 60, borderRadius: "0.625rem", border: "1px solid rgba(172,106,255,0.3)" }} />
                <button onClick={removeImage} style={{ background: "rgba(255,119,111,0.15)", border: "1px solid rgba(255,119,111,0.3)", borderRadius: "0.5rem", color: "#FF776F", padding: "0.25rem 0.75rem", cursor: "pointer", fontSize: "0.8rem", fontFamily: "'Inter',sans-serif" }}>Remove</button>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "0.75rem 1rem", transition: "border-color 0.2s" }}>
              {/* Image upload */}
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImagePick} id="img-upload" />
              <label htmlFor="img-upload" className="icon-btn" title="Attach image" style={{ cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </label>

              {/* Text area */}
              <textarea
                className="chat-input"
                rows={1}
                placeholder="Ask anything… (Shift+Enter for new line)"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ overflowY: "auto" }}
              />

              {/* Send */}
              <button className="send-btn" onClick={sendMessage} disabled={loading || (!input.trim() && !image)} aria-label="Send">
                {loading
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><path d="M21 12a9 9 0 1 1-9-9"/></svg>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                }
              </button>
            </div>
            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "rgba(255,255,255,0.18)", marginTop: "0.625rem" }}>Brainwave AI · Powered by Groq · Responses may be inaccurate</p>
          </div>
        </div>
      </div>
    </>
  );
}
