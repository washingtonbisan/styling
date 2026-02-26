"use client";

import { useState } from "react";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

const weeklyData = [
  { day: "Mon", hours: 1.5, color: "var(--accent-primary)" },
  { day: "Tue", hours: 3.2, color: "var(--accent-primary)" },
  { day: "Wed", hours: 2.8, color: "var(--accent-primary)" },
  { day: "Thu", hours: 4.1, color: "var(--accent-primary)" },
  { day: "Fri", hours: 5.5, color: "var(--accent-primary)" },
  { day: "Sat", hours: 3.9, color: "var(--accent-primary)" },
  { day: "Sun", hours: 2.2, color: "var(--accent-primary)" },
];

const topGenres = [
  { name: "Afrobeats", percentage: 38, color: "#1DB954" },
  { name: "Hip-Hop", percentage: 27, color: "#3b82f6" },
  { name: "R&B", percentage: 18, color: "#a855f7" },
  { name: "Electronic", percentage: 11, color: "#f97316" },
  { name: "Acoustic", percentage: 6, color: "#facc15" },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));
const totalHours = weeklyData.reduce((sum, d) => sum + d.hours, 0);

export function ListeningStats() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* Bar Chart — 2/3 width */}
      <div className="md:col-span-2 bg-[var(--surface-elevated)] rounded-xl p-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider">Hours per day</span>
          <span className="text-sm font-bold text-[var(--accent-primary)]">{totalHours.toFixed(1)}h total</span>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-2 h-32 mt-4">
          {weeklyData.map((item, i) => {
            const heightPct = (item.hours / maxHours) * 100;
            const isHovered = hoveredBar === i;
            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                <div className={cn(
                  "text-xs font-bold text-[var(--accent-primary)] transition-all duration-150",
                  isHovered ? "opacity-100 -translate-y-1" : "opacity-0 translate-y-0"
                )}>
                  {item.hours}h
                </div>

                {/* Bar */}
                <div className="w-full flex items-end" style={{ height: "96px" }}>
                  <div
                    className="w-full rounded-t-sm transition-all duration-500"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: isHovered ? "var(--accent-hover)" : "var(--accent-primary)",
                      opacity: hoveredBar !== null && !isHovered ? 0.4 : 1,
                      // Staggered grow-in animation
                      animation: `barGrow 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms both`,
                    }}
                  />
                </div>

                {/* Day label */}
                <span className={cn(
                  "text-xs transition-colors duration-150",
                  isHovered ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-secondary)]"
                )}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bar grow keyframe — injected inline */}
        <style>{`
          @keyframes barGrow {
            from { transform: scaleY(0); transform-origin: bottom; }
            to { transform: scaleY(1); transform-origin: bottom; }
          }
        `}</style>
      </div>

      {/* Top Genres — 1/3 width */}
      <div className="bg-[var(--surface-elevated)] rounded-xl p-6">
        <span className="text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider">Top genres</span>
        <div className="mt-4 space-y-3">
          {topGenres.map((genre, i) => (
            <div key={genre.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[var(--text-primary)] font-medium">{genre.name}</span>
                <span className="text-xs text-[var(--text-secondary)]">{genre.percentage}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--surface-overlay)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${genre.percentage}%`,
                    backgroundColor: genre.color,
                    animation: `barGrow 0.8s cubic-bezier(0.34,1.56,0.64,1) ${i * 80 + 200}ms both`,
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats summary */}
        <div className="mt-6 pt-4 border-t border-[var(--border-default)] grid grid-cols-2 gap-3">
          <div>
            <p className="text-2xl font-display font-bold text-[var(--text-primary)]">248</p>
            <p className="text-xs text-[var(--text-secondary)]">Songs played</p>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-[var(--accent-primary)]">12</p>
            <p className="text-xs text-[var(--text-secondary)]">Artists discovered</p>
          </div>
        </div>
      </div>

    </div>
  );
}
