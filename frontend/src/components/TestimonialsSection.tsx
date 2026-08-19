"use client";

import { useState, useEffect, useRef } from "react";
import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";

const MAX_NAME_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 300;
const SUBMIT_COOLDOWN_MS = 3000;

interface Testimonial {
  id: string;
  name: string;
  message: string;
  created_at: string;
  role?: string;
  company?: string;
  rating?: number;
}

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex gap-0.5" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < clamped ? "text-accent" : "text-white/20"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function TestimonialForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  const startCooldown = () => {
    setIsCooldown(true);
    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }
    cooldownTimerRef.current = setTimeout(() => {
      setIsCooldown(false);
    }, SUBMIT_COOLDOWN_MS);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setErrorMessage("Please enter your name and message.");
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      setErrorMessage(`Name must be ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setErrorMessage(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`);
      return;
    }

    if (honeypot) {
      setIsSubmitted(true);
      setName("");
      setMessage("");
      setHoneypot("");
      startCooldown();
      return;
    }

    setIsSubmitting(true);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${baseUrl}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const detail = data.detail;
        const message =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(" ")
              : "Failed to submit testimonial. Please try again.";
        throw new Error(message || "Failed to submit testimonial. Please try again.");
      }

      setIsSubmitted(true);
      setName("");
      setMessage("");
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      startCooldown();
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-16 bg-surface-dark rounded-2xl p-8 border border-accent/30 text-center">
        <div className="w-12 h-12 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-white font-semibold font-heading text-lg mb-1">
          Thanks! Your testimonial has been submitted.
        </p>
        <p className="text-white/60 font-body text-sm">
          It will appear here after review.
        </p>
      </div>
    );
  }

  const submitDisabled = isSubmitting || isCooldown;

  return (
    <form onSubmit={handleSubmit} className="mt-16 bg-surface-dark rounded-2xl p-7 border border-foreground/10">
      <h3 className="text-white font-bold font-heading text-xl mb-1">Leave a Testimonial</h3>
      <p className="text-white/60 font-body text-sm mb-6">
        Share your experience — submissions are reviewed before publishing.
      </p>

      {/* Honeypot — hidden from users, bots often fill it */}
      <div
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="testimonial_website">Website</label>
        <input
          type="text"
          id="testimonial_website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="testimonial_name"
            className="block text-sm font-semibold text-white/80 mb-1.5"
          >
            Your Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="testimonial_name"
            name="name"
            required
            maxLength={MAX_NAME_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rana Summar"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
          />
          <p className="text-white/40 text-xs mt-1 font-body">
            {name.length}/{MAX_NAME_LENGTH}
          </p>
        </div>

        <div>
          <label
            htmlFor="testimonial_message"
            className="block text-sm font-semibold text-white/80 mb-1.5"
          >
            Your Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="testimonial_message"
            name="message"
            rows={4}
            required
            maxLength={MAX_MESSAGE_LENGTH}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your feedback..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm resize-y"
          />
          <p className="text-white/40 text-xs mt-1 font-body">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </p>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3 text-center font-medium font-body">
            {errorMessage}
          </div>
        )}

        <div className="pt-1">
          <button
            type="submit"
            disabled={submitDisabled}
            className="w-full sm:w-auto bg-accent text-foreground px-8 py-3.5 rounded-full font-semibold hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-sm"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5 text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Testimonial</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTestimonials() {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      try {
        const response = await fetch(`${baseUrl}/testimonials`);

        if (!response.ok) {
          throw new Error("Could not load testimonials.");
        }

        const data = await response.json();
        if (!cancelled && Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch {
        if (!cancelled) {
          setFetchError("Testimonials are temporarily unavailable.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTestimonials();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
            What People Say
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4 text-center">
            Testimonials
          </h2>
          <p className="text-foreground/70 font-body text-center mb-16 max-w-xl mx-auto leading-relaxed">
            Feedback from clients and collaborators I&apos;ve worked with.
          </p>
        </FadeIn>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <svg
              className="animate-spin w-8 h-8 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Loading testimonials"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}

        {!loading && fetchError && (
          <div className="text-center py-12">
            <p className="text-foreground/50 font-body text-sm">{fetchError}</p>
          </div>
        )}

        {!loading && !fetchError && testimonials.length === 0 && (
          <div className="text-center py-16 bg-surface-dark/5 border border-foreground/10 rounded-2xl">
            <p className="text-foreground/50 font-body">
              No testimonials yet — check back soon.
            </p>
          </div>
        )}

        {!loading && !fetchError && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, index) => {
              const subtitle = [t.role, t.company].filter(Boolean).join(" · ");
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="bg-surface-dark rounded-2xl p-7 border border-foreground/10 flex flex-col h-full"
                >
                  {typeof t.rating === "number" && (
                    <div className="mb-4">
                      <StarRating rating={t.rating} />
                    </div>
                  )}

                  <blockquote className="text-white/75 font-body text-sm leading-relaxed flex-grow mb-6">
                    &ldquo;{t.message}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                      <span className="text-accent font-bold text-sm font-heading">
                        {t.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{t.name}</p>
                      {subtitle && (
                        <p className="text-white/50 text-xs font-body truncate">{subtitle}</p>
                      )}
                      {t.created_at && (
                        <p className="text-white/40 text-xs font-body">{formatDate(t.created_at)}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && (
          <FadeIn delay={0.1}>
            <div className="max-w-xl mx-auto">
              <TestimonialForm />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
