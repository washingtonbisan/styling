"use client";

import { useState } from "react";
import { useTheme, type Theme } from "@/context/ThemeContext";
import { cn } from "@/lib/cs";

// import { useTheme, type Theme } from "@/contexts/ThemeContext";
// import { cn } from "@/lib/cn";

const themes: { value: Theme; label: string; icon: string; desc: string }[] = [
  { value: "dark", label: "Dark", icon: "🌙", desc: "Spotify's classic look" },
  { value: "light", label: "Light", icon: "☀️", desc: "Clean and bright" },
  {
    value: "high-contrast",
    label: "High Contrast",
    icon: "◐",
    desc: "Maximum readability",
  },
];

const accentColors = [
  { label: "Spotify Green", value: "#1DB954" },
  { label: "Electric Blue", value: "#3b82f6" },
  { label: "Purple", value: "#a855f7" },
  { label: "Orange", value: "#f97316" },
  { label: "Pink", value: "#ec4899" },
  { label: "Red", value: "#ef4444" },
];

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#1DB954");

  const handleAccentChange = (color: string) => {
    setAccentColor(color);
    // Dynamically update the CSS variable
    document.documentElement.style.setProperty("--accent-primary", color);
    // Persist
    localStorage.setItem("spotify-ds-accent", color);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-28 z-30 w-10 h-10 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all shadow-card"
        aria-label="Customize theme"
        title="Theme settings"
      >
        {/* Settings/paint icon */}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-80",
          "bg-[var(--surface-elevated)] border-l border-[var(--border-default)]",
          "flex flex-col overflow-y-auto",
          "transition-transform duration-300 ease-out",
          "shadow-modal",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Theme customizer"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-default)]">
          <h2 className="font-display font-bold text-lg text-[var(--text-primary)]">
            Customize
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-overlay)] rounded-md transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-5 space-y-8">
          {/* Theme Selection */}
          <section>
            <h3 className="text-caption text-[var(--text-disabled)] mb-3">
              Theme
            </h3>
            <div className="space-y-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg text-left",
                    "transition-all duration-200",
                    theme === t.value
                      ? "bg-[var(--accent-subtle)] border border-[var(--accent-primary)]"
                      : "bg-[var(--surface-overlay)] hover:bg-[var(--surface-base)] border border-transparent",
                  )}
                >
                  <span className="text-xl">{t.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {t.label}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {t.desc}
                    </p>
                  </div>
                  {theme === t.value && (
                    <div className="ml-auto w-4 h-4 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-2.5 h-2.5 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Accent Color */}
          <section>
            <h3 className="text-caption text-[var(--text-disabled)] mb-3">
              Accent Color
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleAccentChange(color.value)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all",
                    accentColor === color.value
                      ? "bg-[var(--surface-overlay)] ring-2 ring-[var(--text-primary)]"
                      : "hover:bg-[var(--surface-overlay)]",
                  )}
                  title={color.label}
                >
                  <div
                    className="w-8 h-8 rounded-full shadow-md"
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-2xs text-[var(--text-secondary)] text-center leading-tight">
                    {color.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Reset */}
          <section>
            <button
              onClick={() => {
                setTheme("dark");
                handleAccentChange("#1DB954");
              }}
              className="w-full py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--border-strong)] rounded-lg transition-colors"
            >
              Reset to defaults
            </button>
          </section>
        </div>
      </div>
    </>
  );
}
