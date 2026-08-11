"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function describeFetchError(err: unknown, url: string): string {
  if (err instanceof DOMException && err.name === "AbortError") {
    return "Connection timed out — the backend may be slow or not running on port 8000.";
  }
  if (err instanceof TypeError) {
    // Browser throws TypeError("Failed to fetch") for connection refused, CORS blocks, DNS failures, etc.
    return `Network error reaching ${url}. Is the FastAPI backend running? (cd backend && python -m uvicorn main:app --reload)`;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Failed to connect to backend";
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", message: "" });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    try {
      setError(null);
      console.log("[Testimonials] Fetching from:", `${API_BASE}/testimonials`);
      const res = await fetch(`${API_BASE}/testimonials`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      console.log("[Testimonials] GET response status:", res.status, res.statusText);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        throw new Error("Invalid response format: expected array");
      }
    } catch (err: unknown) {
      const url = `${API_BASE}/testimonials`;
      console.error("[Testimonials] fetchTestimonials failed:", {
        url,
        apiBase: API_BASE,
        envApiUrl: process.env.NEXT_PUBLIC_API_URL ?? "(not set — using default)",
        name: err instanceof Error ? err.name : typeof err,
        message: err instanceof Error ? err.message : String(err),
        cause: err instanceof Error ? err.cause : undefined,
        stack: err instanceof Error ? err.stack : undefined,
      });
      setError(`Could not load comments (${describeFetchError(err, url)}).`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const nameTrimmed = form.name.trim();
    const messageTrimmed = form.message.trim();
    
    if (!nameTrimmed || !messageTrimmed) {
      setError("Name and message cannot be empty.");
      return;
    }
    
    if (nameTrimmed.length > 80) {
      setError("Name must be under 80 characters.");
      return;
    }
    
    if (messageTrimmed.length > 500) {
      setError("Message must be under 500 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s — Atlas free-tier cold starts can be slow

    try {
      console.log("[Testimonials] POSTing to:", `${API_BASE}/testimonials`);
      const res = await fetch(`${API_BASE}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameTrimmed, message: messageTrimmed }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      console.log("[Testimonials] POST response status:", res.status);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Failed to submit comment");
      }
      
      const newTestimonial = await res.json();
      setTestimonials((prev) => [newTestimonial, ...prev]);
      setForm({ name: "", message: "" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      console.error("[Testimonials] POST error:", err);
      if (err.name === "AbortError") {
        setError("Submission timed out. Please try again.");
      } else {
        setError(err.message || "Could not submit your comment. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
          What People Say
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4 text-center">
          Testimonials
        </h2>
        <p className="text-foreground/60 font-body text-center mb-16 max-w-xl mx-auto">
          Real comments from visitors and collaborators — stored permanently in the database.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Comment List */}
        <div className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          )}

          {!loading && testimonials.length === 0 && !error && (
            <div className="text-center py-16 text-foreground/40 font-body">
              No comments yet — be the first to leave one!
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-400 font-body text-sm">{error}</div>
          )}

          <AnimatePresence>
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-dark rounded-2xl p-6 border border-foreground/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm font-heading">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs font-body">
                      {new Date(t.created_at).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-white/75 font-body text-sm leading-relaxed">{t.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right: Submit Form */}
        <FadeIn delay={0.2}>
          <div className="bg-surface-dark rounded-2xl p-8 border border-foreground/10 sticky top-28">
            <h3 className="text-xl font-bold font-heading text-white mb-6">Leave a Comment</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/60 text-sm font-body mb-2" htmlFor="testimonial-name">
                  Your Name
                </label>
                <input
                  id="testimonial-name"
                  type="text"
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Ahmed Khan"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/60 text-sm font-body mb-2" htmlFor="testimonial-message">
                  Your Message
                </label>
                <textarea
                  id="testimonial-message"
                  required
                  maxLength={500}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Share your experience or comment..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 font-body focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <p className="text-white/30 text-xs font-body mt-1 text-right">{form.message.length}/500</p>
              </div>

              {error && <p className="text-red-400 text-sm font-body">{error}</p>}

              <button
                type="submit"
                disabled={submitting || !form.name.trim() || !form.message.trim()}
                className="w-full bg-accent text-foreground py-3.5 rounded-xl font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
                    Submitting...
                  </>
                ) : submitted ? (
                  "✓ Comment Posted!"
                ) : (
                  "Post Comment"
                )}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
