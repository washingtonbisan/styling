"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay ensures animation triggers after paint
    const timer = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      className={cn(
        "transition-all duration-500",
        // motion-safe: only apply animation if user hasn't opted out
        "motion-safe:opacity-0 motion-safe:translate-y-2",
        isVisible && "motion-safe:!opacity-100 motion-safe:!translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Staggered children — each child fades in with increasing delay
export function StaggeredList({
  children,
  className,
  staggerMs = 50,
}: {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className="motion-safe:animate-fade-in"
          style={{
            animationDelay: `${i * staggerMs}ms`,
            animationFillMode: "both",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
