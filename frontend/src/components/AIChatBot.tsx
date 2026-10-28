"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  { label: "💼 Top Skills & Tech Stack", prompt: "What are Rana Summar's core skills and technical expertise?" },
  { label: "🚀 Featured AI Projects", prompt: "Tell me about his key projects like JobScout AI and OutbreakIQ." },
  { label: "🎓 Education & Certificates", prompt: "What is Rana's education background and certifications?" },
  { label: "📞 How to Hire Rana", prompt: "How can I contact or hire Rana Summar for a freelance project?" },
  { label: "📜 Quick Resume Summary", prompt: "Give me a brief summary of Rana Summar's CV / Resume." },
];

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "👋 **Hi! I'm Summar AI**, Rana Summar's official AI assistant.\n\nI can answer anything about Rana's **CV, technical skills, AI projects, certifications, work experience, and hiring details**.\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      const customEvent = e as CustomEvent<{ question?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.question) {
        const q = customEvent.detail.question;
        setTimeout(() => {
          handleSend(q);
        }, 180);
      }
    };

    window.addEventListener("open-chat", handleOpenChat);
    return () => window.removeEventListener("open-chat", handleOpenChat);
  }, [messages, isLoading]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "✨ **Chat cleared!** Ask me anything about Rana Summar's projects, experience, or skills.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome-1")
        .map((m) => ({
          role: m.role === "assistant" ? ("model" as const) : ("user" as const),
          content: m.content,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.response || "No response received.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `❌ **Error:** ${
          err.message || "Something went wrong while connecting to the AI."
        }\n\nPlease verify your network or Gemini API key configuration.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMarkdown = (content: string) => {
    const lines = content.split("\n");

    return lines.map((line, lineIndex) => {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={`link-${lineIndex}-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4FD1C5] underline underline-offset-2 hover:text-[#B5F5EC] inline-flex items-center gap-0.5 font-medium"
          >
            {match[1]}
            <ExternalLink className="w-3 h-3 ml-0.5 inline opacity-80" />
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const processedParts = parts.map((part, partIdx) => {
        if (typeof part !== "string") return part;

        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith("**") && bPart.endsWith("**")) {
            return (
              <strong key={`b-${bIdx}`} className="font-bold text-[#F7F5F0]">
                {bPart.slice(2, -2)}
              </strong>
            );
          }
          if (bPart.startsWith("`") && bPart.endsWith("`")) {
            return (
              <code
                key={`c-${bIdx}`}
                className="bg-[#16203A] px-1.5 py-0.5 rounded text-xs font-mono text-[#B5F5EC] border border-[#4FD1C5]/20"
              >
                {bPart.slice(1, -1)}
              </code>
            );
          }
          return bPart;
        });
      });

      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        return (
          <div key={`line-${lineIndex}`} className="flex items-start gap-2 my-1 pl-1">
            <span className="text-[#4FD1C5] text-xs mt-1.5">•</span>
            <span className="flex-1 text-[#C9D1E3]">{processedParts}</span>
          </div>
        );
      }

      if (line.trim().startsWith("### ")) {
        return (
          <h4 key={`line-${lineIndex}`} className="text-base font-bold text-[#B5F5EC] mt-3 mb-1 font-heading">
            {line.replace("### ", "")}
          </h4>
        );
      }

      if (line.trim() === "") {
        return <div key={`line-${lineIndex}`} className="h-2" />;
      }

      return (
        <p key={`line-${lineIndex}`} className="my-1 text-[#C9D1E3] leading-relaxed">
          {processedParts}
        </p>
      );
    });
  };

  return (
    <>
      {/* ── FLOATING LAUNCHER BUTTON ──────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full surface-card border border-[#4FD1C5]/40 text-[#F7F5F0] shadow-[0_8px_30px_rgba(10,18,34,0.6)] hover:border-[#4FD1C5] cursor-pointer group transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-ping" />
              <span className="text-xs font-medium text-[#F7F5F0] group-hover:text-[#B5F5EC] transition-colors">
                Chat with Summar AI
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#4FD1C5] group-hover:rotate-12 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
          className="relative w-14 h-14 rounded-full surface-card border-2 border-[#4FD1C5]/60 shadow-[0_0_25px_rgba(79,209,197,0.35)] flex items-center justify-center text-[#4FD1C5] hover:border-[#4FD1C5] hover:shadow-[0_0_35px_rgba(79,209,197,0.6)] transition-all cursor-pointer focus:outline-none"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#F7F5F0]" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-[#4FD1C5]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4FD1C5] border-2 border-[#1B2745] rounded-full shadow-[0_0_6px_#4FD1C5]" />
            </>
          )}
        </motion.button>
      </div>

      {/* ── CHAT MODAL WINDOW ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            style={{ transformOrigin: "bottom right" }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className={`fixed bottom-24 right-4 sm:right-6 z-50 bg-[#1F2D52]/95 backdrop-blur-2xl border border-[#4FD1C5]/30 rounded-[20px] shadow-[0_20px_60px_rgba(10,18,34,0.8)] flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "w-[calc(100vw-2rem)] sm:w-[680px] h-[85vh] max-h-[750px]"
                : "w-[calc(100vw-2rem)] sm:w-[410px] h-[600px] max-h-[80vh]"
            }`}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#293962]/90 border-b border-[#4FD1C5]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-[#16203A] border border-[#4FD1C5]/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#4FD1C5]" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#4FD1C5] border-2 border-[#1B2745] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-[#F7F5F0] text-base">Summar AI</h3>
                    <span className="text-[10px] font-semibold bg-[#4FD1C5]/20 text-[#B5F5EC] px-2 py-0.5 rounded-full border border-[#4FD1C5]/30 uppercase tracking-wider">
                      AI Assistant
                    </span>
                  </div>
                  <p className="text-xs text-[#AEB8D0]">Verified CV &amp; Projects Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  className="p-2 text-[#AEB8D0] hover:text-rose-400 hover:bg-[#16203A] rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  title={isExpanded ? "Collapse view" : "Expand view"}
                  className="hidden sm:flex p-2 text-[#AEB8D0] hover:text-[#4FD1C5] hover:bg-[#16203A] rounded-lg transition-colors cursor-pointer"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-2 text-[#AEB8D0] hover:text-[#F7F5F0] hover:bg-[#16203A] rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-body select-text custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-[#16203A] border border-[#4FD1C5]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-[#4FD1C5]" />
                    </div>
                  )}

                  <div
                    className={`group relative max-w-[85%] rounded-2xl px-4 py-3 border shadow-sm ${
                      msg.role === "user"
                        ? "btn-primary-luxury text-[#1B2745] font-semibold border-[#4FD1C5] rounded-tr-xs"
                        : "bg-[#212F54] border-[#4FD1C5]/20 text-[#F7F5F0] rounded-tl-xs"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-invert max-w-none text-xs sm:text-sm">
                        {formatMarkdown(msg.content)}
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
                        {msg.content}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-3 mt-1.5 pt-1 border-t border-[#4FD1C5]/10 text-[10px] text-[#AEB8D0]">
                      <span>{msg.timestamp}</span>
                      {msg.role === "assistant" && (
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-[#4FD1C5] cursor-pointer"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-[#4FD1C5]" />
                              <span className="text-[#4FD1C5]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-[#293962] border border-[#4FD1C5]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-[#F7F5F0]" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator with 3 Bouncing Teal Dots */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-[#16203A] border border-[#4FD1C5]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#4FD1C5]" />
                  </div>
                  <div className="bg-[#212F54] border border-[#4FD1C5]/20 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-2">
                    <span className="text-xs text-[#AEB8D0]">Summar AI is thinking</span>
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-[#4FD1C5] animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-[#4FD1C5]/10 bg-[#16203A]/70 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {STARTER_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    disabled={isLoading}
                    onClick={() => handleSend(item.prompt)}
                    className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#212F54] hover:bg-[#4FD1C5]/15 hover:border-[#4FD1C5]/50 border border-[#4FD1C5]/20 text-[#C9D1E3] hover:text-[#B5F5EC] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#1F2D52] border-t border-[#4FD1C5]/20 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Rana's CV, skills, projects..."
                disabled={isLoading}
                className="flex-1 bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3 text-sm text-[#F7F5F0] placeholder-[#AEB8D0]/40 focus:outline-none focus:border-[#4FD1C5] focus:ring-1 focus:ring-[#4FD1C5]/30 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 rounded-xl btn-primary-luxury text-[#1B2745] flex items-center justify-center hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
