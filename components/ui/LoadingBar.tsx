"use client";

import { useEffect, useState } from "react";

interface LoadingBarProps {
  isLoading: boolean;
}

export function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setProgress(0);

      // Simulate progress — advances quickly at first, slows near 90%
      const intervals = [
        setTimeout(() => setProgress(30), 100),
        setTimeout(() => setProgress(60), 400),
        setTimeout(() => setProgress(80), 900),
        setTimeout(() => setProgress(90), 1500),
      ];
      return () => intervals.forEach(clearTimeout);
    } else {
      // Complete the bar then fade out
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-transparent pointer-events-none"
      role="progressbar"
      aria-label="Page loading"
      aria-valuenow={progress}
    >
      <div
        className="h-full bg-[var(--accent-primary)] shadow-[0_0_8px_var(--accent-primary)]"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? "width 0.2s ease-out"
              : "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
