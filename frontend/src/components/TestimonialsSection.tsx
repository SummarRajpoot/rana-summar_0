"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FadeIn } from "@/components/FadeIn";
import { motion, useReducedMotion } from "framer-motion";

const MAX_NAME_LENGTH = 60;
const MAX_ROLE_LENGTH = 80;
const MAX_COMPANY_LENGTH = 80;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 500;
const SUBMIT_COOLDOWN_MS = 4000;

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  role?: string | null;
  company?: string | null;
  rating?: number | null;
  created_at: string;
}

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(1, Math.round(rating)));
  return (
    <div className="flex gap-1" aria-label={`${clamped} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < clamped ? "text-accent fill-accent" : "text-white/20 fill-none"}`}
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface TestimonialFormProps {
  onSuccess?: (newTestimonial?: Testimonial) => void;
}

function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
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
    const trimmedRole = role.trim();
    const trimmedCompany = company.trim();

    if (!trimmedName || !trimmedMessage) {
      setErrorMessage("Please enter your name and review message.");
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      setErrorMessage(`Name must be ${MAX_NAME_LENGTH} characters or fewer.`);
      return;
    }

    if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      setErrorMessage(`Review message must be at least ${MIN_MESSAGE_LENGTH} characters long.`);
      return;
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setErrorMessage(`Review message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`);
      return;
    }

    if (honeypot) {
      setIsSubmitted(true);
      setName("");
      setRole("");
      setCompany("");
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
          role: trimmedRole || undefined,
          company: trimmedCompany || undefined,
          rating,
          message: trimmedMessage,
          website: honeypot || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const detail = data.detail;
        const errMsg =
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((d: { msg?: string }) => d.msg).filter(Boolean).join(" ")
              : "Failed to submit testimonial. Please check your input.";
        throw new Error(errMsg || "Failed to submit testimonial. Please try again.");
      }

      const savedTestimonial: Testimonial = await response.json();

      setIsSubmitted(true);
      setName("");
      setRole("");
      setCompany("");
      setMessage("");
      setRating(5);

      if (onSuccess) {
        onSuccess(savedTestimonial);
      }
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
      <div className="mt-16 bg-surface-dark rounded-3xl p-8 sm:p-10 border border-accent/40 text-center shadow-[0_10px_30px_rgba(201,162,39,0.12)]">
        <div className="w-14 h-14 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center mb-5">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h4 className="text-white font-bold font-heading text-xl sm:text-2xl mb-2">
          Thank you! Your review is now live.
        </h4>
        <p className="text-white/60 font-body text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
          Your feedback has been added directly to the reviews section above. Thank you for your support!
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="text-xs sm:text-sm text-accent hover:underline font-body font-semibold"
        >
          Submit another feedback &rarr;
        </button>
      </div>
    );
  }

  const submitDisabled = isSubmitting || isCooldown;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 bg-surface-dark rounded-3xl p-7 sm:p-10 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent text-xs font-heading font-bold uppercase tracking-widest">
          Feedback
        </span>
      </div>
      <h3 className="text-white font-bold font-heading text-2xl sm:text-3xl mb-1.5">
        Leave a Testimonial
      </h3>
      <p className="text-white/60 font-body text-sm sm:text-base mb-8">
        Share your experience working with me.
      </p>

      {/* Honeypot for bot filtering */}
      <div
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website_honeypot">Website</label>
        <input
          type="text"
          id="website_honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="space-y-5">
        {/* Name and Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="testimonial_name"
              className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
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
              placeholder="e.g. John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
            />
            <p className="text-white/40 text-xs mt-1 font-body">
              {name.length}/{MAX_NAME_LENGTH}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/90 mb-1.5 font-body">
              Rating
            </label>
            <div
              className="flex items-center gap-1 py-2 px-3 bg-white/5 border border-white/10 rounded-xl w-fit"
              role="radiogroup"
              aria-label="Rating out of 5"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-accent transition-transform hover:scale-120 focus:outline-none"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <svg
                    className={`w-6 h-6 ${(hoverRating || rating) >= star ? "text-accent fill-accent" : "text-white/20 fill-none"}`}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              ))}
              <span className="text-white/60 font-body text-xs ml-2">
                {hoverRating || rating}/5
              </span>
            </div>
          </div>
        </div>

        {/* Role & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="testimonial_role"
              className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
            >
              Role / Title <span className="text-white/40 text-xs font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="testimonial_role"
              name="role"
              maxLength={MAX_ROLE_LENGTH}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Founder, Product Manager"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="testimonial_company"
              className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
            >
              Company / Platform <span className="text-white/40 text-xs font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              id="testimonial_company"
              name="company"
              maxLength={MAX_COMPANY_LENGTH}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Upwork, Tech Startup"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="testimonial_message"
              className="block text-sm font-semibold text-white/90 font-body"
            >
              Your Review <span className="text-accent">*</span>
            </label>
            <span className="text-xs text-white/40 font-body">
              Min {MIN_MESSAGE_LENGTH} characters
            </span>
          </div>
          <textarea
            id="testimonial_message"
            name="message"
            rows={4}
            required
            minLength={MIN_MESSAGE_LENGTH}
            maxLength={MAX_MESSAGE_LENGTH}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your feedback (minimum 20 characters, no links or HTML)..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm resize-y"
          />
          <div className="flex items-center justify-between mt-1 text-xs font-body">
            <span className={message.trim().length > 0 && message.trim().length < MIN_MESSAGE_LENGTH ? "text-amber-400" : "text-white/40"}>
              {message.trim().length < MIN_MESSAGE_LENGTH
                ? `${MIN_MESSAGE_LENGTH - message.trim().length} more characters needed`
                : "Length requirement met"}
            </span>
            <span className="text-white/40">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3.5 text-center font-medium font-body leading-relaxed">
            {errorMessage}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitDisabled}
            className="w-full sm:w-auto bg-accent text-surface-dark px-9 py-3.5 rounded-full font-heading font-semibold hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-[0_0_20px_rgba(201,162,39,0.3)]"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5 text-surface-dark"
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
                <span>Publishing Review...</span>
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
  const formRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const loadTestimonials = useCallback(async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${baseUrl}/testimonials`);

      if (!response.ok) {
        throw new Error("Could not load testimonials.");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
        setFetchError(null);
      }
    } catch {
      setFetchError("Testimonials are temporarily unavailable. Please check back soon.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const handleTestimonialSubmitted = (newTestimonial?: Testimonial) => {
    // If backend returned the newly saved testimonial, prepend it immediately
    if (newTestimonial && newTestimonial.id) {
      setTestimonials((prev) => {
        // Avoid duplicate if it already exists
        const exists = prev.some((t) => t.id === newTestimonial.id);
        if (exists) return prev;
        return [newTestimonial, ...prev];
      });
    }
    // Also re-fetch in the background to ensure consistency with backend
    loadTestimonials();
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
            What People Say
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4 text-center">
            Testimonials
          </h2>
          <p className="text-foreground/70 font-body text-center mb-16 max-w-xl mx-auto leading-relaxed">
            Genuine feedback from clients and collaborators I&apos;ve worked with.
          </p>
        </FadeIn>

        {/* Skeleton Loaders while fetching */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface-dark rounded-3xl p-7 border border-white/10 animate-pulse flex flex-col justify-between h-64"
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-4 h-4 bg-white/10 rounded" />
                    ))}
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-3.5 bg-white/10 rounded w-full" />
                    <div className="h-3.5 bg-white/10 rounded w-5/6" />
                    <div className="h-3.5 bg-white/10 rounded w-3/4" />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10 mt-6">
                  <div className="w-11 h-11 rounded-full bg-white/10 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 bg-white/10 rounded w-1/2" />
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Friendly Error Banner */}
        {!loading && fetchError && (
          <div className="text-center py-10 px-6 mb-12 bg-surface-dark/5 border border-foreground/10 rounded-2xl max-w-xl mx-auto">
            <p className="text-foreground/70 font-body text-sm leading-relaxed">
              {fetchError}
            </p>
          </div>
        )}

        {/* Fallback Empty State Card when zero approved/visible reviews */}
        {!loading && !fetchError && testimonials.length === 0 && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mb-16"
          >
            <div className="rounded-3xl border border-dashed border-foreground/20 bg-surface-dark/5 px-6 py-12 sm:px-10 sm:py-14 text-center shadow-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold font-heading text-accent mb-4">
                No reviews yet
              </span>
              <h3 className="text-foreground font-bold font-heading text-xl sm:text-2xl mb-2">
                Be the first to leave feedback
              </h3>
              <p className="text-foreground/60 font-body text-sm sm:text-base leading-relaxed max-w-sm mx-auto mb-6">
                Have we collaborated on an AI solution, project, or contract? Share your thoughts below.
              </p>
              <button
                type="button"
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent text-surface-dark font-heading font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(201,162,39,0.3)]"
              >
                <span>Write a Review</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}

        {/* Testimonials List: Desktop Grid & Mobile Swipeable Snap Carousel */}
        {!loading && !fetchError && testimonials.length > 0 && (
          <div className="mb-16">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
              {testimonials.map((t, index) => {
                const subtitle = [t.role, t.company].filter(Boolean).join(" · ");
                const initials = getInitials(t.name);

                return (
                  <motion.div
                    key={t.id}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { duration: 0.4, delay: index * 0.08 }
                    }
                    className="bg-surface-dark rounded-3xl p-7 sm:p-8 border border-white/10 hover:border-accent/40 shadow-[0_10px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_40px_rgba(201,162,39,0.15)] transition-all duration-300 flex flex-col justify-between shrink-0 w-[85vw] sm:w-[360px] md:w-auto snap-center"
                  >
                    <div>
                      {/* Rating Stars */}
                      <div className="mb-5 flex items-center justify-between">
                        <StarRating rating={t.rating || 5} />
                        <span className="text-white/30 text-xs font-body font-mono">
                          Verified
                        </span>
                      </div>

                      {/* Review Message */}
                      <blockquote className="text-white/80 font-body text-sm sm:text-base leading-relaxed mb-6 italic">
                        &ldquo;{t.message}&rdquo;
                      </blockquote>
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center gap-3 pt-5 border-t border-white/10 mt-2">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-accent/25 to-accent/10 border border-accent/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(201,162,39,0.2)]">
                        <span className="text-accent font-bold text-sm font-heading">
                          {initials}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-bold font-heading text-base truncate">
                          {t.name}
                        </p>
                        {subtitle && (
                          <p className="text-accent/90 text-xs font-body truncate mt-0.5">
                            {subtitle}
                          </p>
                        )}
                        {t.created_at && (
                          <p className="text-white/40 text-xs font-body mt-0.5">
                            {formatDate(t.created_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Submission Form Section */}
        <div ref={formRef} className="max-w-2xl mx-auto">
          <TestimonialForm onSuccess={handleTestimonialSubmitted} />
        </div>
      </div>
    </section>
  );
}
