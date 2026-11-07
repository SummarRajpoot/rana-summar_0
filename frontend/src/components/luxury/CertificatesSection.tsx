"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ExternalLink, Download, ShieldCheck, Award, Copy, Check, Eye } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Counter } from "@/components/motion/Counter";
import { Certificate, certificatesData } from "@/data/certificates";

export type { Certificate };
export { certificatesData };

export function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;

  const copyToClipboard = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  useEffect(() => {
    if (selectedCert) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedCert]);

  const totalCertifications = certificatesData.length;
  const totalInstitutions = new Set(certificatesData.map((c) => c.issuer)).size;

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
            {certificatesData.map((cert, index) => {
              const isNewest = index === 0;
              return (
                <motion.div
                  key={cert.id}
                  layoutId={`cert-card-${cert.id}`}
                  onClick={() => setSelectedCert(cert)}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className={`shrink-0 w-[290px] sm:w-[350px] surface-card rounded-[20px] p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                    isNewest
                      ? "border-[#4FD1C5]/50 shadow-[0_0_30px_rgba(79,209,197,0.18)] hover:shadow-[0_0_45px_rgba(79,209,197,0.3)] hover:border-[#4FD1C5]"
                      : "border-[#4FD1C5]/20 hover:border-[#4FD1C5]/60 shadow-[0_12px_40px_rgba(10,18,34,0.4)] hover:shadow-[0_20px_50px_rgba(79,209,197,0.18)]"
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#4FD1C5]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[20px]"
                  />

                  <div>
                    {/* Top Badges / Tags */}
                    {(cert.badge || cert.result) && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {cert.badge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide uppercase bg-[#4FD1C5]/15 text-[#4FD1C5] border border-[#4FD1C5]/35 shadow-sm">
                            <Award className="w-3 h-3" />
                            {cert.badge}
                          </span>
                        )}
                        {cert.result && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide uppercase bg-amber-400/15 text-amber-300 border border-amber-400/35">
                            {cert.result}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Certificate Thumbnail (3:4 for portrait hackathon cert, h-44 for others) */}
                    <div
                      className={`relative w-full ${
                        cert.badge === "Hackathon" ? "aspect-[3/4]" : "h-44"
                      } rounded-xl overflow-hidden bg-[#16203A] mb-4 border border-[#4FD1C5]/15`}
                    >
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="350px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1B2745]/70 to-transparent" />
                      <span className="absolute bottom-2.5 right-2.5 text-[11px] font-semibold text-[#B5F5EC] bg-[#16203A]/85 px-2.5 py-1 rounded-full border border-[#4FD1C5]/30 backdrop-blur-sm flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>View</span>
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

                    {/* Credential ID Line with Copy Button */}
                    {cert.credentialId && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-between gap-2 mt-3 p-2 rounded-lg bg-[#16203A]/80 border border-[#4FD1C5]/20 text-[11px] font-mono"
                      >
                        <div className="truncate text-[#AEB8D0]">
                          <span className="text-[#4FD1C5] font-semibold">ID:</span>{" "}
                          <span className="text-[#F7F5F0] select-all">{cert.credentialId}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(cert.credentialId!)}
                          className="shrink-0 text-[#4FD1C5] hover:text-[#B5F5EC] p-1 rounded hover:bg-[#4FD1C5]/15 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Copy Credential ID"
                          aria-label="Copy Credential ID"
                        >
                          {copiedId === cert.credentialId ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-teal-300" />
                              <span className="text-[10px] text-teal-300 font-sans">Copied</span>
                            </>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Card Actions: View Certificate & Download PDF */}
                  <div className="mt-4 pt-3 border-t border-[#4FD1C5]/10 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-[#4FD1C5]/15 text-[#4FD1C5] hover:bg-[#4FD1C5]/25 border border-[#4FD1C5]/30 hover:border-[#4FD1C5] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                    </button>
                    {cert.pdf && (
                      <a
                        href={cert.pdf}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-3 rounded-xl text-xs font-semibold border border-[#4FD1C5]/30 hover:border-[#4FD1C5] hover:bg-[#4FD1C5]/15 text-[#B5F5EC] flex items-center justify-center gap-1.5 transition-all"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
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
                <Counter value={totalCertifications} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm font-body text-[#AEB8D0]">
                Certifications
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#16203A]/60 border border-[#4FD1C5]/15">
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#B5F5EC] mb-1">
                <Counter value={totalInstitutions} />
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
            <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0 bg-[#0E1528]/85 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                layoutId={`cert-card-${selectedCert.id}`}
                className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto surface-card rounded-[24px] p-6 sm:p-8 border border-[#4FD1C5]/40 shadow-[0_24px_80px_rgba(0,0,0,0.8)] my-auto"
              >
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#16203A] border border-[#4FD1C5]/30 text-[#F7F5F0] hover:text-[#4FD1C5] hover:border-[#4FD1C5] flex items-center justify-center transition-all cursor-pointer z-20"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* PDF Viewer with Small-Screen Fallback */}
                {selectedCert.pdf ? (
                  <div className="mb-6">
                    {/* Desktop / Large Screen: PDF embed with toolbar=0&view=FitH */}
                    <div className="hidden sm:block relative w-full h-[520px] rounded-xl overflow-hidden bg-[#0E1528] border border-[#4FD1C5]/20">
                      <object
                        data={`${selectedCert.pdf}#toolbar=0&view=FitH`}
                        type="application/pdf"
                        className="w-full h-full"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={selectedCert.image}
                            alt={selectedCert.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </object>
                    </div>

                    {/* Small / Mobile Screen Fallback */}
                    <div className="block sm:hidden relative w-full h-64 rounded-xl overflow-hidden bg-[#0E1528] border border-[#4FD1C5]/20">
                      <Image
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-64 sm:h-84 rounded-xl overflow-hidden bg-[#16203A] mb-6 border border-[#4FD1C5]/20">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  {/* Badge & Type */}
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedCert.badge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide uppercase bg-[#4FD1C5]/15 text-[#4FD1C5] border border-[#4FD1C5]/35">
                        <Award className="w-3 h-3" />
                        {selectedCert.badge}
                      </span>
                    )}
                    {selectedCert.result && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide uppercase bg-amber-400/15 text-amber-300 border border-amber-400/35">
                        {selectedCert.result}
                      </span>
                    )}
                    {selectedCert.type && (
                      <span className="text-xs font-mono text-[#AEB8D0] bg-[#16203A]/60 px-2.5 py-0.5 rounded-full border border-[#4FD1C5]/15">
                        {selectedCert.type}
                      </span>
                    )}
                  </div>

                  {/* Issuer & Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[#4FD1C5] text-xs font-semibold uppercase tracking-wider">
                      {selectedCert.issuer}
                    </span>
                    <span className="text-[#AEB8D0] text-xs font-mono">{selectedCert.date}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F7F5F0]">
                    {selectedCert.title}
                  </h3>

                  <p className="font-body text-[#C9D1E3] text-sm leading-relaxed">
                    {selectedCert.description}
                  </p>

                  {/* Credential ID with Copy in Modal */}
                  {selectedCert.credentialId && (
                    <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-[#16203A]/70 border border-[#4FD1C5]/20 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#4FD1C5] font-semibold">Credential ID:</span>
                        <span className="text-[#F7F5F0] select-all">{selectedCert.credentialId}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedCert.credentialId!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#4FD1C5]/15 text-[#4FD1C5] hover:bg-[#4FD1C5]/25 border border-[#4FD1C5]/30 text-xs transition-colors cursor-pointer"
                      >
                        {copiedId === selectedCert.credentialId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal-300" />
                            <span className="text-teal-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Project Strip in Modal */}
                  {selectedCert.project && (
                    <div className="p-4 rounded-xl bg-[#16203A]/60 border border-[#4FD1C5]/20 space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono text-[#AEB8D0] uppercase tracking-wider">
                          Associated Project:
                        </span>
                        <span className="text-sm font-semibold text-[#F7F5F0]">
                          {selectedCert.project}
                        </span>
                      </div>
                      {selectedCert.links && (
                        <div className="flex flex-wrap items-center gap-2.5 pt-1">
                          {selectedCert.links.demo && (
                            <a
                              href={selectedCert.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#4FD1C5]/15 text-[#4FD1C5] hover:bg-[#4FD1C5]/25 border border-[#4FD1C5]/30 hover:border-[#4FD1C5] transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                          {selectedCert.links.github && (
                            <a
                              href={selectedCert.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1F2D52] text-[#F7F5F0] hover:text-[#B5F5EC] border border-[#4FD1C5]/20 hover:border-[#4FD1C5]/50 transition-all"
                            >
                              <FaGithub className="w-3.5 h-3.5" />
                              <span>GitHub</span>
                            </a>
                          )}
                          {selectedCert.links.linkedin && (
                            <a
                              href={selectedCert.links.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0A66C2]/20 text-[#70B5F9] hover:bg-[#0A66C2]/30 border border-[#0A66C2]/40 transition-all"
                            >
                              <FaLinkedin className="w-3.5 h-3.5" />
                              <span>LinkedIn Post</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* PDF Action Buttons */}
                  {selectedCert.pdf && (
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={selectedCert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 btn-primary-luxury px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-md"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Official PDF</span>
                      </a>
                      <a
                        href={selectedCert.pdf}
                        download
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-[#4FD1C5]/30 hover:border-[#4FD1C5] hover:bg-[#4FD1C5]/15 text-[#B5F5EC] transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
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

