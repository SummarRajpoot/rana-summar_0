import Link from "next/link";
import { BookOpen } from "lucide-react";

export function ReadStoryHeroButton() {
  return (
    <Link
      href="/story"
      aria-label="Read My Story — Personal journey from village fields to AI engineering"
      className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-accent to-amber-500 text-surface-dark px-8 py-3.5 sm:px-9 sm:py-4 font-body font-semibold text-[0.9375rem] tracking-[0.01em] shadow-[0_0_25px_rgba(201,162,39,0.45)] hover:shadow-[0_0_40px_rgba(201,162,39,0.75)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer z-10 border border-amber-300/60"
    >
      <BookOpen className="w-5 h-5 shrink-0 transition-transform group-hover:scale-115 group-hover:rotate-[-6deg]" />
      <span>Read My Story</span>

      {/* Light-sweep shimmer highlight on hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out pointer-events-none"
      />
    </Link>
  );
}
