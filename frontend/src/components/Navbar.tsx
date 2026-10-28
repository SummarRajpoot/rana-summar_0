"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";

const navLinks = [
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "My Self", href: "#myself" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll detection: glass effect after 40px, hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 40);

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
          // Scrolling down
          setIsVisible(false);
        } else if (lastScrollY - currentScrollY > 10) {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Active section observer
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.22, 0.7, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-400 ${
          isScrolled
            ? "bg-[#212F54]/75 backdrop-blur-md border-b border-[#4FD1C5]/20 shadow-[0_8px_32px_rgba(10,16,30,0.4)] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1160px] mx-auto px-6 flex items-center justify-between">
          {/* Logo Monogram */}
          <Magnetic strength={0.25}>
            <Link
              href="#home"
              className="relative group flex shrink-0 items-center justify-center w-11 h-11 rounded-full border border-[#4FD1C5]/40 bg-[#293962]/80 backdrop-blur-sm shadow-[0_0_15px_rgba(79,209,197,0.2)] hover:border-[#4FD1C5] transition-all duration-300"
              aria-label="Rana Summar - Home"
            >
              {/* Initials */}
              <span className="font-heading font-bold text-sm text-[#B5F5EC] group-hover:text-white transition-colors z-10 select-none">
                RS
              </span>

              {/* Little corner teal dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#4FD1C5] shadow-[0_0_6px_#4FD1C5] ring-2 ring-[#1B2745]" />
            </Link>
          </Magnetic>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-1.5 text-[13px] font-medium text-[#C9D1E3] hover:text-[#F7F5F0] transition-colors group"
                >
                  {/* Sliding Underline on Hover */}
                  <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#4FD1C5] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-250" />

                  {/* Active Section Gliding Pill */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-[#4FD1C5]/15 border border-[#4FD1C5]/30 -z-10"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <Magnetic strength={0.2}>
              <a
                href="https://www.fiverr.com/rana_summar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-luxury px-4 py-1.5 rounded-full text-xs font-semibold hover:shadow-[0_0_20px_rgba(79,209,197,0.4)] transition-all flex items-center justify-center"
              >
                Fiverr
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="https://www.upwork.com/freelancers/ranasummar"
                target="_blank"
                rel="noopener noreferrer"
                className="border-[1.5px] border-[#4FD1C5] text-[#F7F5F0] hover:bg-[#4FD1C5]/15 px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center justify-center"
              >
                Upwork
              </a>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#F7F5F0] p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6 text-[#4FD1C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 0.7, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[#1B2745]/95 backdrop-blur-xl pt-24 pb-12 px-6 lg:hidden flex flex-col justify-between overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-5 my-auto">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading text-2xl font-semibold text-[#F7F5F0] hover:text-[#4FD1C5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col gap-3 mt-8 w-full max-w-xs mx-auto"
            >
              <a
                href="https://www.fiverr.com/rana_summar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary-luxury py-3 rounded-full text-center text-sm font-semibold"
              >
                Hire Me on Fiverr
              </a>
              <a
                href="https://www.upwork.com/freelancers/ranasummar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-[1.5px] border-[#4FD1C5] text-[#F7F5F0] py-3 rounded-full text-center text-sm font-semibold"
              >
                Hire Me on Upwork
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
