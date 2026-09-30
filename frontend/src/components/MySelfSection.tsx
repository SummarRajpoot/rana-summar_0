"use client";

import { FadeIn } from "@/components/FadeIn";
import { ComingSoon } from "@/components/ComingSoon";

export function MySelfSection() {
  return (
    <section id="myself" className="py-24 px-6 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-3 block text-center">
            Get To Know Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-16 text-center">
            My Self
          </h2>
        </FadeIn>

        <ComingSoon message="A deeper look at who I am will be shared here soon." />
      </div>
    </section>
  );
}
