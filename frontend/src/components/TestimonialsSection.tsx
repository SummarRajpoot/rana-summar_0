"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Send } from "lucide-react";

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
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < clamped
              ? "text-[#4FD1C5] fill-[#4FD1C5]"
              : "text-[#AEB8D0]/30 fill-none"
          }`}
          aria-hidden="true"
        />
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
          message: trimmedMessage,
          role: trimmedRole || null,
          company: trimmedCompany || null,
          rating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to submit testimonial.");
      }

      const savedTestimonial = await response.json();
      setIsSubmitted(true);
      setName("");
      setRole("");
      setCompany("");
      setMessage("");
      startCooldown();

      if (onSuccess) {
        onSuccess(savedTestimonial);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="surface-card rounded-[24px] p-8 sm:p-12 text-center border border-[#4FD1C5]/40 shadow-[0_16px_50px_rgba(10,18,34,0.5)]">
        <div className="w-16 h-16 rounded-full bg-[#4FD1C5]/15 text-[#4FD1C5] mx-auto flex items-center justify-center mb-5 border border-[#4FD1C5]/30">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h4 className="text-[#F7F5F0] font-bold font-heading text-xl sm:text-2xl mb-2">
          Thank you! Your review is now live.
        </h4>
        <p className="text-[#C9D1E3] font-body text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
          Your feedback has been added directly to the reviews section above. Thank you for your support!
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="text-sm text-[#4FD1C5] hover:text-[#B5F5EC] underline font-body font-semibold cursor-pointer"
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
      className="surface-card rounded-[24px] p-7 sm:p-10 border border-[#4FD1C5]/25 shadow-[0_16px_50px_rgba(10,18,34,0.5)]"
    >
      <div className="eyebrow-label text-xs mb-2">Feedback</div>
      <h3 className="text-[#F7F5F0] font-bold font-heading text-2xl sm:text-3xl mb-1.5">
        Leave a Testimonial
      </h3>
      <p className="text-[#AEB8D0] font-body text-sm sm:text-base mb-8">
        Share your experience working with me.
      </p>

      {/* Honeypot for bot filtering */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
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

      <div className="space-y-6">
        {/* Name and Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="testimonial_name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
            >
              Your Name <span className="text-[#4FD1C5]">*</span>
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
              className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
            />
            <p className="text-[#AEB8D0]/60 text-xs mt-1 font-body">
              {name.length}/{MAX_NAME_LENGTH}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body">
              Rating
            </label>
            <div
              className="flex items-center gap-1.5 py-2.5 px-3.5 bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl w-fit"
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
                  className="p-1 text-[#4FD1C5] transition-transform hover:scale-120 focus:outline-none cursor-pointer"
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      (hoverRating || rating) >= star
                        ? "text-[#4FD1C5] fill-[#4FD1C5]"
                        : "text-[#AEB8D0]/30 fill-none"
                    }`}
                  />
                </button>
              ))}
              <span className="text-[#B5F5EC] font-body text-xs ml-2 font-semibold">
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
              className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
            >
              Role / Title <span className="text-[#AEB8D0]/50 text-xs normal-case">(Optional)</span>
            </label>
            <input
              type="text"
              id="testimonial_role"
              name="role"
              maxLength={MAX_ROLE_LENGTH}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Founder, Product Lead"
              className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="testimonial_company"
              className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
            >
              Company / Platform <span className="text-[#AEB8D0]/50 text-xs normal-case">(Optional)</span>
            </label>
            <input
              type="text"
              id="testimonial_company"
              name="company"
              maxLength={MAX_COMPANY_LENGTH}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Upwork, Tech Startup"
              className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="testimonial_message"
              className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] font-body"
            >
              Your Review <span className="text-[#4FD1C5]">*</span>
            </label>
            <span className="text-xs text-[#AEB8D0]/60 font-body">
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
            placeholder="Share your feedback (minimum 20 characters)..."
            className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm resize-none"
          />
          <div className="flex items-center justify-between mt-1 text-xs font-body">
            <span className={message.trim().length > 0 && message.trim().length < MIN_MESSAGE_LENGTH ? "text-[#4FD1C5]" : "text-[#AEB8D0]/60"}>
              {message.trim().length < MIN_MESSAGE_LENGTH
                ? `${MIN_MESSAGE_LENGTH - message.trim().length} more characters needed`
                : "Length requirement met"}
            </span>
            <span className="text-[#AEB8D0]/60">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm rounded-xl p-3.5 text-center font-body">
            {errorMessage}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitDisabled}
            className="w-full sm:w-auto btn-primary-luxury px-9 py-3.5 rounded-full font-body font-semibold hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base text-[#1B2745] cursor-pointer shadow-[0_0_20px_rgba(79,209,197,0.3)]"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-[#1B2745] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Submit Testimonial</span>
                <Send className="w-4 h-4" />
              </>
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
    if (newTestimonial && newTestimonial.id) {
      setTestimonials((prev) => {
        const exists = prev.some((t) => t.id === newTestimonial.id);
        if (exists) return prev;
        return [newTestimonial, ...prev];
      });
    }
    loadTestimonials();
  };

  return (
    <section id="testimonials" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-3 justify-center">What People Say</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight mb-4">
            Testimonials
          </h2>
          <p className="text-[#C9D1E3] font-body text-center max-w-xl mx-auto leading-relaxed">
            Genuine feedback from clients and collaborators I&apos;ve worked with.
          </p>
        </div>

        {/* Skeleton Loaders */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="surface-card rounded-[20px] p-7 border border-[#4FD1C5]/15 animate-pulse flex flex-col justify-between h-64"
              >
                <div>
                  <div className="flex gap-1 mb-5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-4 h-4 bg-[#4FD1C5]/10 rounded" />
                    ))}
                  </div>
                  <div className="space-y-2.5">
                    <div className="h-3.5 bg-[#4FD1C5]/10 rounded w-full" />
                    <div className="h-3.5 bg-[#4FD1C5]/10 rounded w-5/6" />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-[#4FD1C5]/15 mt-6">
                  <div className="w-11 h-11 rounded-full bg-[#4FD1C5]/15 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 bg-[#4FD1C5]/10 rounded w-1/2" />
                    <div className="h-3 bg-[#4FD1C5]/05 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Banner */}
        {!loading && fetchError && (
          <div className="text-center py-10 px-6 mb-12 surface-card border border-[#4FD1C5]/20 rounded-2xl max-w-xl mx-auto">
            <p className="text-[#C9D1E3] font-body text-sm leading-relaxed">
              {fetchError}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !fetchError && testimonials.length === 0 && (
          <div className="max-w-xl mx-auto mb-16 text-center">
            <div className="rounded-[24px] border border-dashed border-[#4FD1C5]/30 bg-[#212F54]/40 p-10 sm:p-12">
              <span className="eyebrow-label text-xs mb-3 justify-center">No reviews yet</span>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0] mb-2">
                Be the first to leave feedback
              </h3>
              <p className="text-[#C9D1E3] font-body text-sm leading-relaxed mb-6">
                Have we collaborated on an AI solution, project, or contract? Share your thoughts below.
              </p>
              <button
                type="button"
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary-luxury px-7 py-3 rounded-full text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Write a Review
              </button>
            </div>
          </div>
        )}

        {/* Testimonials List */}
        {!loading && !fetchError && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {testimonials.map((t, index) => {
              const subtitle = [t.role, t.company].filter(Boolean).join(" · ");
              const initials = getInitials(t.name);

              return (
                <motion.div
                  key={t.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="surface-card rounded-[20px] p-7 sm:p-8 border border-[#4FD1C5]/20 hover:border-[#4FD1C5]/50 transition-all duration-300 shadow-[0_12px_35px_rgba(10,18,34,0.4)] flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-5 flex items-center justify-between">
                      <StarRating rating={t.rating || 5} />
                      <span className="text-[#AEB8D0] text-xs font-mono">
                        Verified
                      </span>
                    </div>

                    <blockquote className="text-[#F7F5F0]/90 font-body text-sm sm:text-base leading-relaxed mb-6 italic">
                      &ldquo;{t.message}&rdquo;
                    </blockquote>
                  </div>

                  <div className="flex items-center gap-3 pt-5 border-t border-[#4FD1C5]/15 mt-2">
                    <div className="w-11 h-11 rounded-full bg-[#16203A] border border-[#4FD1C5]/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(79,209,197,0.2)]">
                      <span className="text-[#B5F5EC] font-bold text-sm font-heading">
                        {initials}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[#F7F5F0] font-bold font-heading text-base truncate">
                        {t.name}
                      </p>
                      {subtitle && (
                        <p className="text-[#4FD1C5] text-xs font-body truncate mt-0.5">
                          {subtitle}
                        </p>
                      )}
                      {t.created_at && (
                        <p className="text-[#AEB8D0] text-xs font-body mt-0.5">
                          {formatDate(t.created_at)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
