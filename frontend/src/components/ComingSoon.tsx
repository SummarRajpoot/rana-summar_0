"use client";

import { FadeIn } from "@/components/FadeIn";
import { motion } from "framer-motion";

interface ComingSoonProps {
  message: string;
}

export function ComingSoon({ message }: ComingSoonProps) {
  return (
    <FadeIn delay={0.08}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.35 }}
        className="max-w-lg mx-auto"
      >
        <div className="rounded-2xl border border-dashed border-foreground/20 bg-surface-dark/5 px-6 py-12 sm:px-10 sm:py-14 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold font-heading text-accent mb-5">
            🚧 Coming Soon
          </span>
          <p className="text-foreground/60 font-body text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            {message}
          </p>
        </div>
      </motion.div>
    </FadeIn>
  );
}
