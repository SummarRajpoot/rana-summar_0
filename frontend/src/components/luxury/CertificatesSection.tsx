"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ExternalLink, Download, ShieldCheck, Award } from "lucide-react";
import { Counter } from "@/components/motion/Counter";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  pdf?: string;
}

const certificatesData: Certificate[] = [
  {
    id: "chase-value",
    title: "Certificate of Achievement — Star Badge Award",
    issuer: "Chase Value",
    date: "Mar 2023",
    description:
      "For extraordinary customer service & selling skills and in recognition of Star Badge Award.",
    image: "/certificates/chase_value_certificate.jpeg",
  },
  {
    id: "cs50x-puzzle-day-2026",
    title: "CS50x Puzzle Day 2026",
    issuer: "Harvard University",
    date: "2026",
    description:
      "Recognition for participation in CS50x Puzzle Day 2026 — an online, social event promoting collaboration and problem-solving.",
    image: "/certificates/cs50x_puzzle_day_2026.jpg",
    pdf: "/certificates/cs50x_puzzle_day_2026.pdf",
  },
  {
    id: "intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "01 Mar 2026",
    description:
      "Successfully completed Introduction to Cybersecurity offered by Networking Academy through the Cisco Networking Academy program.",
    image: "/certificates/introduction_to_cybersecurity_certificate.jpg",
    pdf: "/certificates/introduction_to_cybersecurity_certificate.pdf",
  },
  {
    id: "networking-devices",
    title: "Networking Devices and Initial Configuration",
    issuer: "Cisco Networking Academy",
    date: "09 Mar 2026",
    description:
      "Successfully completed Networking Devices and Initial Configuration offered by Networking Academy through the Cisco Networking Academy program.",
    image: "/certificates/networking_devices_and_initial_configuration.jpg",
    pdf: "/certificates/networking_devices_and_initial_configuration.pdf",
  },
  {
    id: "saylani-agentic-ai",
    title: "Agentic AI (Batch-1)",
    issuer: "Saylani IT Training Programme",
    date: "May 2026",
    description:
      "Successfully completed the Agentic AI (Batch-1) training course, 7 months duration (Nov 2025 – May 2026), as a student under the Education Department of Saylani Welfare International Trust.",
    image: "/certificates/saylani-agentic-ai.jpg",
    pdf: "/certificates/saylani-agentic-ai.png.pdf",
  },
];

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section id="certificates" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="eyebrow-label mb-3 justify-center">Credentials</div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] tracking-tight">
            Certificates &amp; Verification
          </h2>
        </div>

        {/* Horizontal Drag Carousel */}
        <div className="relative mb-20">
          <p className="text-xs text-[#AEB8D0] font-body text-center mb-4 sm:hidden">
            Swipe sideways to explore &rarr;
          </p>

          <motion.div
            ref={carouselRef}
            data-cursor="drag"
            className="flex gap-6 overflow-x-auto pb-8 pt-2 no-scrollbar cursor-grab active:cursor-grabbing select-none"
            whileTap={{ cursor: "grabbing" }}
          >
            {certificatesData.map((cert) => (
              <motion.div
                key={cert.id}
                layoutId={`cert-card-${cert.id}`}
                onClick={() => setSelectedCert(cert)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="shrink-0 w-[290px] sm:w-[350px] surface-card rounded-[20px] p-5 flex flex-col justify-between shadow-[0_12px_40px_rgba(10,18,34,0.4)] border border-[#4FD1C5]/20 hover:border-[#4FD1C5]/60 transition-colors cursor-pointer group"
              >
                <div>
                  {/* Certificate Thumbnail */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#16203A] mb-4 border border-[#4FD1C5]/15">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="350px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2745]/70 to-transparent" />
                    <span className="absolute bottom-2.5 right-2.5 text-[11px] font-semibold text-[#B5F5EC] bg-[#16203A]/85 px-2.5 py-1 rounded-full border border-[#4FD1C5]/30 backdrop-blur-sm">
                      Click to View
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#F7F5F0] mb-1 line-clamp-2 group-hover:text-[#B5F5EC] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[#4FD1C5] text-xs font-semibold mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-[#AEB8D0] text-xs mb-3">{cert.date}</p>
                  <p className="text-[#C9D1E3] text-xs line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── VERIFICATION STATS BLOCK ────────────────────────── */}
        <div className="surface-card rounded-[24px] p-8 sm:p-12 shadow-[0_16px_50px_rgba(10,18,34,0.4)] border border-[#4FD1C5]/25">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 text-[#4FD1C5] mb-2">
              <ShieldCheck className="w-5 h-5 text-[#4FD1C5]" />
              <span className="font-heading font-bold text-sm tracking-wider uppercase">
                Verified Credentials
              </span>
            </div>
            <p className="text-[#C9D1E3] text-sm leading-relaxed">
              Every course and award is backed by official digital certificates and institution verifications.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#16203A]/60 border border-[#4FD1C5]/15">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#B5F5EC] mb-1">
                <Counter value={5} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-body text-[#AEB8D0]">
                Certifications
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#16203A]/60 border border-[#4FD1C5]/15">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#B5F5EC] mb-1">
                <Counter value={4} />
              </div>
              <div className="text-xs sm:text-sm font-body text-[#AEB8D0]">
                Institutions
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#16203A]/60 border border-[#4FD1C5]/15">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#B5F5EC] mb-1">
                <Counter value={2026} />
              </div>
              <div className="text-xs sm:text-sm font-body text-[#AEB8D0]">
                Active &amp; Current
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#16203A]/60 border border-[#4FD1C5]/15">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#B5F5EC] mb-1">
                <Counter value={100} suffix="%" />
              </div>
              <div className="text-xs sm:text-sm font-body text-[#AEB8D0]">
                Verified Authenticity
              </div>
            </div>
          </div>
        </div>

        {/* ── SHARED-ELEMENT MODAL (layoutId) ─────────────────── */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="absolute inset-0 bg-[#0E1528]/85 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                layoutId={`cert-card-${selectedCert.id}`}
                className="relative z-10 w-full max-w-2xl surface-card rounded-[24px] p-6 sm:p-8 border border-[#4FD1C5]/40 shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#16203A] border border-[#4FD1C5]/30 text-[#F7F5F0] hover:text-[#4FD1C5] hover:border-[#4FD1C5] flex items-center justify-center transition-all cursor-pointer z-20"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative w-full h-64 sm:h-84 rounded-xl overflow-hidden bg-[#16203A] mb-6 border border-[#4FD1C5]/20">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[#4FD1C5] text-xs font-semibold uppercase tracking-wider">
                      {selectedCert.issuer}
                    </span>
                    <span className="text-[#AEB8D0] text-xs">{selectedCert.date}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0]">
                    {selectedCert.title}
                  </h3>

                  <p className="font-body text-[#C9D1E3] text-sm leading-relaxed pt-1">
                    {selectedCert.description}
                  </p>

                  {selectedCert.pdf && (
                    <div className="pt-4">
                      <a
                        href={selectedCert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 btn-primary-luxury px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        <span>View / Download Official PDF</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

