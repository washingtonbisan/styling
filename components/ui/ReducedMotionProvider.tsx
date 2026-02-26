"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MotionContextValue {
  prefersReducedMotion: boolean;
  // Duration helper: returns 0 if reduced motion, else the provided duration
  duration: (ms: number) => number;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
  duration: (ms) => ms,
});

export function ReducedMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <MotionContext.Provider
      value={{
        prefersReducedMotion,
        duration: (ms) => (prefersReducedMotion ? 0 : ms),
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export const useReducedMotion = () => useContext(MotionContext);
