"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/components/FadeIn";
import { AvailabilityCard } from "@/components/AvailabilityCard";

export function ContactSection() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{ service?: string }>;
      if (customEvent.detail?.service) {
        setFormData((prev) => ({
          ...prev,
          subject: `I'm interested in: ${customEvent.detail.service}`,
        }));
      }
    };

    window.addEventListener("prefill-contact-service", handlePrefill);
    return () => window.removeEventListener("prefill-contact-service", handlePrefill);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${baseUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.detail || "Failed to send message. Please try again."
        );
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while submitting. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 md:px-8 bg-background border-t border-foreground/5 overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <FadeIn>
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
              Let&apos;s Build Something
            </h2>
            <p className="text-foreground/70 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Whether you need an AI agent, a full-stack web application, or want to discuss a new project — reach out below.
            </p>
          </FadeIn>
        </div>

        {/* 2-Column Responsive Layout: Desktop beside each other, Mobile stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 order-1">
            <FadeIn delay={0.1}>
              {isSubmitted ? (
                <div className="bg-surface-dark rounded-3xl p-8 sm:p-12 text-center border border-accent/40 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                  <div className="w-14 h-14 rounded-full bg-accent/20 text-accent mx-auto flex items-center justify-center mb-5">
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-white/80 font-body text-base sm:text-lg font-medium mb-6">
                    Thanks for reaching out — I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-xs sm:text-sm text-accent hover:underline font-body font-semibold"
                  >
                    Send another message &rarr;
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface-dark rounded-3xl p-7 sm:p-9 md:p-10 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)] space-y-5"
                >
                  <div className="border-b border-white/10 pb-4 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                      Send a Message
                    </h3>
                    <p className="text-white/60 font-body text-xs sm:text-sm mt-1">
                      Fill out the form below to kickstart your inquiry.
                    </p>
                  </div>

                  {/* First Name & Last Name (Side by Side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
                      >
                        First Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        required
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="Rana"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
                      >
                        Last Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        required
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Summar"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
                    >
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ranasummar@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
                    >
                      Subject <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="AI Application Project Inquiry"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-white/90 mb-1.5 font-body"
                    >
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, or requirements..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm resize-y"
                    />
                  </div>

                  {/* Inline Error Message */}
                  {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-3.5 text-center font-medium font-body">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
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
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>

          {/* Availability Card Column */}
          <div className="lg:col-span-5 order-2">
            <AvailabilityCard />
          </div>
        </div>
      </div>
    </section>
  );
}
