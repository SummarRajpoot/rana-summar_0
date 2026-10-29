"use client";

import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/motion/Magnetic";
import { Phone, Mail, ArrowUp } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const FiverrIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5v2H9v2h2v6h2v-6h2v-2h-2V7h-2z" />
  </svg>
);

const UpworkIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.396-2.007 1.258-3.328 2.838-3.328 1.408 0 2.502 1.134 2.502 2.766 0 1.632-1.094 2.907-2.502 2.907zM18.561 5.5c-3.03 0-4.838 2.05-5.66 4.353-1.085-1.632-1.74-3.79-2.124-5.853H8.318v7.414c0 1.846-1.127 3.328-2.838 3.328-1.71 0-2.838-1.482-2.838-3.328V4h-2.64v7.414c0 3.308 2.274 5.966 5.478 5.966 3.204 0 5.478-2.658 5.478-5.966v-1.196c.456 1.482 1.232 3.013 2.378 4.298l-2.004 9.484h2.75l1.458-6.904c.91.564 1.944.876 3.074.876 3.03 0 5.478-2.482 5.478-6.136 0-3.654-2.448-6.136-5.478-6.136z" />
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4 shrink-0" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const socialLinks = [
  {
    name: "Phone",
    href: "tel:+923087322219",
    isExternal: false,
    icon: <Phone className="w-4 h-4 shrink-0" />,
  },
  {
    name: "Email",
    href: "mailto:ranasummar48@gmail.com",
    isExternal: false,
    icon: <Mail className="w-4 h-4 shrink-0" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/SummarRajpoot",
    isExternal: true,
    icon: <FaGithub className="w-4 h-4 shrink-0" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rana-summar-295a1a262/",
    isExternal: true,
    icon: <FaLinkedin className="w-4 h-4 shrink-0" />,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/rana.summar.756",
    isExternal: true,
    icon: <FaFacebook className="w-4 h-4 shrink-0" />,
  },
  {
    name: "Fiverr",
    href: "https://www.fiverr.com/rana_summar",
    isExternal: true,
    icon: <FiverrIcon />,
  },
  {
    name: "Upwork",
    href: "https://www.upwork.com/freelancers/ranasummar",
    isExternal: true,
    icon: <UpworkIcon />,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/RanaSummar4",
    isExternal: true,
    icon: <FaXTwitter className="w-4 h-4 shrink-0" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@ranasummar_0",
    isExternal: true,
    icon: <TikTokIcon />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ranasummar_0",
    isExternal: true,
    icon: <FaYoutube className="w-4 h-4 shrink-0" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ranasummar_0/",
    isExternal: true,
    icon: <FaInstagram className="w-4 h-4 shrink-0" />,
  },
];

export function FooterSection() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion() ?? false;

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = smoothProgress;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#141D35] border-t border-[#4FD1C5]/20 pt-20 pb-12 px-6 overflow-hidden select-none">
      <div className="max-w-[1160px] mx-auto">
        {/* Giant Outlined Wordmark that fills with teal gradient on scroll */}
        <div className="text-center mb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0.7 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group inline-block cursor-default"
          >
            <p className="font-heading italic text-xl sm:text-2xl md:text-3xl font-semibold text-[#B5F5EC] mb-4 tracking-wide">
              Rana Summar
            </p>
            <h2
              className="font-heading font-black text-[clamp(2rem,7.5vw,6.5rem)] tracking-tight uppercase leading-none transition-all duration-700 text-transparent hover:text-[#4FD1C5] hover:drop-shadow-[0_0_35px_rgba(79,209,197,0.5)]"
              style={{
                WebkitTextStroke: "1.5px #4FD1C5",
              }}
            >
              SOFTWARE ENGINEER
            </h2>
          </motion.div>
        </div>

        {/* Social Icons with Magnetic pull and Teal Glow */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
          {socialLinks.map((social) => (
            <Magnetic key={social.name} strength={0.25}>
              <a
                href={social.href}
                target={social.isExternal ? "_blank" : undefined}
                rel={social.isExternal ? "noopener noreferrer" : undefined}
                title={social.name}
                aria-label={social.name}
                className="w-10 h-10 rounded-full surface-card border border-[#4FD1C5]/25 flex items-center justify-center text-[#C9D1E3] hover:text-[#B5F5EC] hover:border-[#4FD1C5] hover:shadow-[0_0_15px_rgba(79,209,197,0.35)] transition-all duration-200"
              >
                {social.icon}
              </a>
            </Magnetic>
          ))}
        </div>

        {/* Bottom Row: Copyright, Nav Links & Back to Top with circular progress */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#4FD1C5]/15 text-xs sm:text-sm text-[#AEB8D0]">
          <p className="font-body">
            &copy; {new Date().getFullYear()} Rana Summar. All rights reserved.
          </p>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="#projects" className="hover:text-[#4FD1C5] transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-[#4FD1C5] transition-colors">
              Contact
            </Link>
            <Link href="/story" className="hover:text-[#4FD1C5] transition-colors">
              My Story
            </Link>
          </div>

          {/* Back to top button with circular progress ring */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2.5 text-xs font-semibold text-[#C9D1E3] hover:text-[#4FD1C5] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-[#4FD1C5]/20 fill-none"
                  strokeWidth="2.5"
                />
                {!prefersReducedMotion && (
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    className="stroke-[#4FD1C5] fill-none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      pathLength,
                    }}
                  />
                )}
              </svg>
              <ArrowUp className="w-3.5 h-3.5 text-[#4FD1C5] absolute group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

