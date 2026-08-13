"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background shadow-md py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#home"
            className="relative group flex shrink-0 items-center justify-center w-10.5 h-10.5 rounded-full border-2 border-accent bg-surface-dark shadow-md hover:scale-105 transition-all duration-300"
            aria-label="Rana Summar - Home"
          >
            {/* Background Code Icon Watermark */}
            <svg
              className="absolute w-6.5 h-6.5 text-accent/25 group-hover:text-accent/40 group-hover:rotate-6 transition-all duration-300 pointer-events-none select-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>

            {/* Initials */}
            <span className="font-heading font-extrabold tracking-tight text-xs text-accent group-hover:text-white transition-colors z-10 select-none">
              RS
            </span>

            {/* Corner Terminal Accent Badge */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-accent text-surface-dark border border-background shadow-sm flex items-center justify-center z-20 group-hover:scale-110 transition-transform">
              <svg className="w-2 h-2 text-surface-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l3 3-3 3m5 0h3" />
              </svg>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-foreground/80 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://www.fiverr.com/rana_summar"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-foreground px-4.5 py-2 rounded-full text-xs sm:text-sm font-bold hover:brightness-110 transition-all"
            >
              Fiverr
            </a>
            <a
              href="https://www.upwork.com/freelancers/ranasummar"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-accent text-foreground hover:bg-accent hover:text-foreground px-4.5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all"
            >
              Upwork
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface-dark pt-24 pb-8 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col items-center gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold font-heading text-white hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://www.fiverr.com/rana_summar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-accent text-foreground px-8 py-3.5 rounded-full text-base font-bold hover:brightness-110 transition-all mt-4 w-full text-center"
              >
                Hire Me on Fiverr
              </a>
              <a
                href="https://www.upwork.com/freelancers/ranasummar"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-2 border-accent text-white px-8 py-3.5 rounded-full text-base font-bold hover:bg-accent hover:text-foreground transition-all w-full text-center"
              >
                Hire Me on Upwork
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
