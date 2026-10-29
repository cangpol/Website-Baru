"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  X, 
  Bot, 
  Sparkles, 
  MessageSquare, 
  ChevronDown, 
  ExternalLink,
  PhoneCall
} from "lucide-react";

interface Message {
  role: "user" | "ai";
  text: string;
  time?: string;
}

const quickQuestions = [
  "🎯 Bagaimana cara daftar di UPITRA?",
  "📚 Apa saja 4 fakultas & program studi?",
  "💰 Apa saja info beasiswa yang ada?",
  "💼 Bagaimana sistem magang & kurikulum 3+1?",
  "📍 Di mana alamat kampus & kontak admisi?"
];

// WhatsApp direct contact
const WA_ADMISI_URL = "https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA,%20saya%20ingin%20konsultasi%20pendaftaran%20PMB%202026/2027";

// Safe, lightweight markdown & link formatter
function FormattedMessage({ content, isUser }: { content: string; isUser: boolean }) {
  const paragraphs = content.split(/\n\n+/);

  return (
    <div className={`space-y-2 text-xs sm:text-[13px] leading-relaxed ${isUser ? "text-white" : "text-slate-700"}`}>
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n");
        return (
          <div key={pIdx} className="space-y-1">
            {lines.map((line, lIdx) => {
              const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
              const isNumber = /^\d+\.\s/.test(line.trim());
              const cleanLine = isBullet ? line.replace(/^[\s•\-]+/, "") : isNumber ? line.replace(/^\d+\.\s*/, "") : line;

              const renderParts = (text: string) => {
                const tokenRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|(https?:\/\/[^\s]+))/g;
                const elements = [];
                let lastIdx = 0;
                let match;

                while ((match = tokenRegex.exec(text)) !== null) {
                  if (match.index > lastIdx) {
                    elements.push(text.substring(lastIdx, match.index));
                  }

                  if (match[2] && match[3]) {
                    // [label](url)
                    elements.push(
                      <a
                        key={match.index}
                        href={match[3]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`underline font-bold inline-flex items-center gap-0.5 ${
                          isUser ? "text-sky-200 hover:text-white" : "text-sky-600 hover:text-sky-700"
                        }`}
                      >
                        <span>{match[2]}</span>
                        <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
                      </a>
                    );
                  } else if (match[4]) {
                    // **bold**
                    elements.push(
                      <strong key={match.index} className={isUser ? "text-white font-bold" : "text-[#0b2545] font-black"}>
                        {match[4]}
                      </strong>
                    );
                  } else if (match[5]) {
                    // bare url
                    elements.push(
                      <a
                        key={match.index}
                        href={match[5]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`underline font-bold break-all ${
                          isUser ? "text-sky-200 hover:text-white" : "text-sky-600 hover:text-sky-700"
                        }`}
                      >
                        {match[5]}
                      </a>
                    );
                  }

                  lastIdx = match.index + match[0].length;
                }

                if (lastIdx < text.length) {
                  elements.push(text.substring(lastIdx));
                }

                return elements;
              };

              if (isBullet) {
                return (
                  <div key={lIdx} className="flex items-start gap-1.5 pl-1">
                    <span className={`text-[10px] shrink-0 mt-0.5 ${isUser ? "text-sky-200" : "text-sky-500 font-bold"}`}>•</span>
                    <span className="leading-snug">{renderParts(cleanLine)}</span>
                  </div>
                );
              }

              if (isNumber) {
                return (
                  <div key={lIdx} className="flex items-start gap-1.5 pl-1">
                    <span className={`text-[11px] font-bold shrink-0 ${isUser ? "text-sky-200" : "text-sky-600"}`}>
                      {line.match(/^\d+\./)?.[0] || "•"}
                    </span>
                    <span className="leading-snug">{renderParts(cleanLine)}</span>
                  </div>
                );
              }

              return <p key={lIdx} className="leading-relaxed">{renderParts(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Halo! Saya **Veronica** ✨\n\nSelamat datang di Universitas Pignatelli Triputra! Saya siap membantu menjawab pertanyaan Anda seputar:\n• **Pendaftaran Mahasiswa Baru (PMB)**\n• **Program Studi & 4 Fakultas Unggulan**\n• **Beasiswa (KIP-K, Triputra, Mitra)**\n• **Kurikulum 3+1 (Kuliah + Immersion)**\n\nApa yang ingin Anda tanyakan hari ini?",
      time: "Baru saja"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [open, messages, loading]);

  const sendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await res.json();
      const aiReplyText = data.reply || "Maaf, terjadi kendala koneksi ke server AI.";

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: aiReplyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Maaf, terjadi gangguan jaringan. Silakan hubungi langsung WhatsApp Admisi resmi kami di **0811-290-7500**.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[9999] font-sans">
      
      {/* 1. Backdrop on Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[#06172e]/60 backdrop-blur-xs sm:hidden z-[9998]"
          />
        )}
      </AnimatePresence>

      {/* 2. Floating Action Button & Tooltip (Tampil eksklusif saat obrolan ditutup) */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[10000] flex items-center"
          >
            {/* Tooltip callout badge on desktop */}
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="hidden md:flex items-center gap-2.5 mr-4 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-sky-200/80 shadow-xl shadow-sky-900/10 text-slate-800"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div className="text-left">
                  <p className="text-[11px] font-bold text-[#0b2545] leading-none flex items-center gap-1">
                    <span>Tanya Veronica</span>
                    <Sparkles className="w-3 h-3 text-sky-500 inline" />
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Asisten Virtual Online 24/7</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors ml-1"
                  aria-label="Tutup info"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )}

            {/* Ambient Glow Pulse Halo */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full bg-sky-400/35 blur-xl pointer-events-none"
            />

            {/* 3D Character Floating Assistant Launcher (Tanpa Round) */}
            <motion.button
              onClick={() => {
                setOpen(true);
                setShowTooltip(false);
              }}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Buka Veronica - AI Assistant UPITRA"
              className="relative cursor-pointer group flex items-center justify-center select-none"
            >
              {/* Character Avatar Image (Natural Cutout Tanpa Round) */}
              <img
                src="/images/ai/upitra-ai-assistant.png"
                alt="Veronica - AI Assistant UPITRA"
                className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_12px_24px_rgba(2,132,199,0.35)] group-hover:drop-shadow-[0_16px_32px_rgba(2,132,199,0.5)] transition-all duration-300"
              />

              {/* Active Status Badge (Dekat Headset) */}
              <span className="absolute top-1 right-2 z-20 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white shadow-xs"></span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. The Interactive Chat Drawer Window (Viewport-Constrained Height & Anchored to Corner) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-0 sm:bottom-6 right-0 sm:right-6 w-full sm:w-[420px] max-w-[420px] h-[88dvh] sm:h-[580px] max-h-[88dvh] sm:max-h-[calc(100dvh-3rem)] bg-white rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(6,23,46,0.35)] flex flex-col overflow-hidden border border-slate-200/90 z-[9999]"
          >
            {/* Header: Executive Gradient with Brand, WhatsApp Button & Close */}
            <div className="relative bg-gradient-to-r from-[#06172e] via-[#0b2545] to-[#0284c7] p-4 sm:p-4.5 text-white shrink-0 overflow-hidden shadow-md">
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/15 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-3">
                
                {/* Assistant Info */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                    <img
                      src="/images/ai/upitra-ai-assistant.png"
                      alt="Veronica - AI Assistant UPITRA"
                      className="w-12 h-12 object-contain drop-shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#06172e] rounded-full"></span>
                  </div>

                  <div>
                    <h3 className="font-black text-white text-sm sm:text-base leading-tight flex items-center gap-1.5">
                      <span>Veronica</span>
                      <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                    </h3>
                    <p className="text-[11px] text-sky-100 font-medium flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Asisten Virtual UPITRA (Online)</span>
                    </p>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2">
                  
                  {/* Direct WhatsApp Admisi Handoff Button */}
                  <a
                    href={WA_ADMISI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Hubungi Admin WhatsApp"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span className="hidden xs:inline">WhatsApp</span>
                  </a>

                  {/* Close window */}
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Tutup Obrolan"
                  >
                    <X className="w-5 h-5" />
                  </button>

                </div>

              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#f8fafc] space-y-4">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "ai" && (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center mr-2 mt-0.5">
                      <img
                        src="/images/ai/upitra-ai-assistant.png"
                        alt="AI"
                        className="w-full h-full object-contain drop-shadow-xs"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 sm:p-4 rounded-2xl shadow-xs ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white rounded-tr-xs"
                        : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs"
                    }`}
                  >
                    <FormattedMessage content={m.text} isUser={m.role === "user"} />
                    {m.time && (
                      <div
                        className={`text-[9px] mt-1.5 text-right font-medium ${
                          m.role === "user" ? "text-sky-200/80" : "text-slate-400"
                        }`}
                      >
                        {m.time}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-slate-500"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center mr-1">
                    <img
                      src="/images/ai/upitra-ai-assistant.png"
                      alt="AI"
                      className="w-full h-full object-contain drop-shadow-xs"
                    />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} className="h-1" />
            </div>

            {/* Quick Question Chips & Input Form */}
            <div className="bg-white border-t border-slate-100 p-3 sm:p-4 space-y-2.5">
              
              {/* Quick Questions (Scrollable without visible scrollbar) */}
              {messages.length <= 1 && (
                <div 
                  className="overflow-x-auto pb-1.5 flex gap-2 no-scrollbar scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {quickQuestions.map((q, qIdx) => (
                    <motion.button
                      key={qIdx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => sendMessage(q)}
                      className="shrink-0 text-left px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-sky-500 hover:bg-sky-50 text-[11px] font-semibold text-slate-700 hover:text-sky-700 transition-colors shadow-2xs"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200 transition-all shadow-xs"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pertanyaan Anda seputar UPITRA..."
                  className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden"
                />

                <motion.button
                  type="submit"
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-[#0369a1] hover:to-[#0b2545] disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 shadow-sm transition-all cursor-pointer"
                  aria-label="Kirim Pesan"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </motion.button>
              </form>

              {/* Footer Note with WhatsApp fallback link */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5 px-1">
                <span>Veronica • Virtual Assistant UPITRA</span>
                <a
                  href={WA_ADMISI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <PhoneCall className="w-2.5 h-2.5" />
                  <span>CS WhatsApp</span>
                </a>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
