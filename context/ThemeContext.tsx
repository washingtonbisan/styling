"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

// All supported themes
export type Theme = "light" | "dark" | "high-contrast";

// What the context exposes
interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void; // Cycles: light → dark → high-contrast → light
  isDark: boolean; // Convenience boolean
  isHighContrast: boolean;
  systemTheme: "light" | "dark"; // What the OS prefers
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "spotify-ds-theme";

// Maps theme name → CSS class on <html>
const themeClassMap: Record<Theme, string> = {
  light: "light",
  dark: "dark",
  "high-contrast": "high-contrast",
};

// Cycle order for toggle
const themeOrder: Theme[] = ["dark", "light", "high-contrast"];

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  // On mount: read saved preference or fall back to system preference
  useEffect(() => {
    setMounted(true);

    // Detect system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const detectedSystem: "light" | "dark" = mediaQuery.matches
      ? "dark"
      : "light";
    setSystemTheme(detectedSystem);

    // Read saved preference
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = saved ?? detectedSystem;
    setThemeState(initialTheme);

    // Listen for system theme changes
    const handleSystemChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
      // Only auto-switch if user hasn't saved a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  // Apply theme class to <html> whenever theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Remove all theme classes first
    Object.values(themeClassMap).forEach((cls) => root.classList.remove(cls));

    // Add the current theme class
    root.classList.add(themeClassMap[theme]);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const currentIndex = themeOrder.indexOf(current);
      return themeOrder[(currentIndex + 1) % themeOrder.length];
    });
  }, []);

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark" || theme === "high-contrast",
    isHighContrast: theme === "high-contrast",
    systemTheme,
  };

  // Prevent flash of wrong theme — don't render until mounted
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// The hook — throws if used outside ThemeProvider
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
