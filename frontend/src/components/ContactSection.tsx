"use client";

import { useState } from "react";
import { FadeIn } from "@/components/FadeIn";

export function ContactSection() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

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
    } catch (err: any) {
      setErrorMessage(
        err.message || "Something went wrong while submitting. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background border-t border-foreground/5">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn>
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-foreground/70 font-body text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Whether you need an AI agent, a full-stack web application, or want to discuss a new project — reach out below.
          </p>

          {isSubmitted ? (
            <div className="bg-surface-dark/5 border border-accent/30 rounded-2xl p-8 sm:p-12 text-center shadow-sm transition-all duration-300">
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
              <h3 className="text-2xl font-bold font-heading text-foreground mb-3">
                Message Sent!
              </h3>
              <p className="text-foreground/80 font-body text-lg font-medium">
                Thanks — I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              {/* First Name & Last Name (Side by Side) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-semibold text-foreground/80 mb-1.5"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Rana"
                    className="w-full bg-[#F5F5F3] border border-foreground/20 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-semibold text-foreground/80 mb-1.5"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Summar"
                    className="w-full bg-[#F5F5F3] border border-foreground/20 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground/80 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ranasummar@example.com"
                  className="w-full bg-[#F5F5F3] border border-foreground/20 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-foreground/80 mb-1.5"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="AI Application Project Inquiry"
                  className="w-full bg-[#F5F5F3] border border-foreground/20 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-foreground/80 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className="w-full bg-[#F5F5F3] border border-foreground/20 rounded-xl px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body text-sm resize-y"
                />
              </div>

              {/* Inline Error Message */}
              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm rounded-xl p-3 text-center font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
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
                      <span>Sending...</span>
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
    </section>
  );
}
