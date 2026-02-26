"use client";

import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/components/ui/ReducedMotionProvider";
import { cn } from "@/lib/cs";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <div
      key={pathname} // Key change = remount = animation reruns
      className={cn(
        prefersReducedMotion
          ? ""
          : "animate-[routeIn_0.35s_cubic-bezier(0.4,0,0.2,1)_both]"
      )}
    >
      {children}
    </div>
  );
}