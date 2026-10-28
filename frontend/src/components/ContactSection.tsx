"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AvailabilityCard } from "@/components/AvailabilityCard";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const prefersReducedMotion = useReducedMotion() ?? false;

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
  const [hasError, setHasError] = useState(false);

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
    setHasError(false);

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
      setHasError(true);
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
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-[1160px] mx-auto">
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-label mb-3 justify-center">Get In Touch</div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-[#F7F5F0] mb-4 tracking-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-[#C9D1E3] font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Whether you need an AI agent, a full-stack web application, or want to discuss a new project — reach out below.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Form Column */}
          <div className="lg:col-span-7 order-1">
            {isSubmitted ? (
              <div className="surface-card rounded-[24px] p-8 sm:p-12 text-center border border-[#4FD1C5]/40 shadow-[0_16px_50px_rgba(10,18,34,0.5)]">
                <div className="w-16 h-16 rounded-full bg-[#4FD1C5]/15 text-[#4FD1C5] mx-auto flex items-center justify-center mb-5 border border-[#4FD1C5]/30">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                <h3 className="text-2xl font-bold font-heading text-[#F7F5F0] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#C9D1E3] font-body text-base sm:text-lg mb-6 leading-relaxed">
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
                  className="text-sm text-[#4FD1C5] hover:text-[#B5F5EC] underline font-body font-semibold cursor-pointer"
                >
                  Send another message &rarr;
                </button>
              </div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                animate={hasError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                className="surface-card rounded-[24px] p-7 sm:p-10 border border-[#4FD1C5]/25 shadow-[0_16px_50px_rgba(10,18,34,0.5)] space-y-6"
              >
                <div className="border-b border-[#4FD1C5]/15 pb-4 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F7F5F0]">
                    Send a Message
                  </h3>
                  <p className="text-[#AEB8D0] font-body text-xs sm:text-sm mt-1">
                    Fill out the form below to kickstart your inquiry.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs sm:text-sm font-body">
                    {errorMessage}
                  </div>
                )}

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label
                      htmlFor="first_name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
                    >
                      First Name <span className="text-[#4FD1C5]">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Rana"
                      className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="last_name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
                    >
                      Last Name <span className="text-[#4FD1C5]">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Summar"
                      className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
                  >
                    Email Address <span className="text-[#4FD1C5]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ranasummar@example.com"
                    className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
                  >
                    Subject <span className="text-[#4FD1C5]">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="AI Application Project Inquiry"
                    className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#AEB8D0] mb-2 font-body"
                  >
                    Message <span className="text-[#4FD1C5]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and requirements..."
                    className="w-full bg-[#16203A] border border-[#4FD1C5]/20 rounded-xl px-4 py-3.5 text-[#F7F5F0] placeholder:text-[#AEB8D0]/40 focus:border-[#4FD1C5] focus:ring-2 focus:ring-[#4FD1C5]/25 focus:shadow-[0_0_15px_rgba(79,209,197,0.2)] focus:outline-none transition-all font-body text-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary-luxury py-4 px-6 rounded-full font-body font-semibold text-base text-[#1B2745] shadow-[0_0_24px_rgba(79,209,197,0.3)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-[#1B2745] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </div>

          {/* Availability Column */}
          <div className="lg:col-span-5 order-2">
            <AvailabilityCard />
          </div>
        </div>
      </div>
    </section>
  );
}
