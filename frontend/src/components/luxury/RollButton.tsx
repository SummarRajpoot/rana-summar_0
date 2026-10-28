"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";

interface RollButtonProps {
  href: string;
  children: string;
  isExternal?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  icon?: ReactNode;
}

export function RollButton({
  href,
  children,
  isExternal = false,
  className = "",
  variant = "primary",
  icon,
}: RollButtonProps) {
  const content = (
    <span className="relative flex items-center justify-center gap-2 overflow-hidden h-[1.25em]">
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="inline-flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="inline-block">{children}</span>
        <span className="inline-block" aria-hidden="true">{children}</span>
      </span>
    </span>
  );

  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "btn-primary-luxury ring-2 ring-[#4FD1C5]/30 shadow-[0_0_24px_rgba(79,209,197,0.3)] hover:shadow-[0_0_32px_rgba(181,245,236,0.5)]";
  } else if (variant === "secondary") {
    variantClasses =
      "border-[1.5px] border-[#4FD1C5] text-[#F7F5F0] hover:bg-[#4FD1C5]/15 hover:border-[#B5F5EC]";
  } else {
    // Tertiary (ivory solid button)
    variantClasses =
      "bg-[#F7F5F0] text-[#1B2745] hover:bg-[#B5F5EC] hover:shadow-[0_0_20px_rgba(181,245,236,0.4)]";
  }

  const baseClasses = `group relative inline-flex items-center justify-center px-7 py-3 rounded-full font-body font-semibold text-[0.9375rem] tracking-[0.01em] transition-all duration-300 overflow-hidden ${variantClasses} ${className}`;

  if (isExternal) {
    return (
      <Magnetic strength={0.3}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {/* Light-sweep shine for primary button */}
          {variant === "primary" && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-none animate-[sweep_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          )}
          {content}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={0.3}>
      <Link href={href} className={baseClasses}>
        {variant === "primary" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-none animate-[sweep_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        )}
        {content}
      </Link>
    </Magnetic>
  );
}

