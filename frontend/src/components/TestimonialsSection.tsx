"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";

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
      </div>
    </section>
  );
}
