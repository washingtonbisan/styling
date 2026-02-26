import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Tell Tailwind where to find class names so it can purge unused ones
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 2. Enable class-based dark mode (add 'dark' class to <html>)
  darkMode: "class",

  theme: {
    extend: {
      // DESIGN TOKENS: Cos
      colors: {
        // Spotify Brand Colors
        spotify: {
          green: "#1DB954",
          "green-hover": "#1ed760",
          black: "#191414",
          white: "#FFFFFF",
          gray: {
            100: "#F6F6F6",
            200: "#E8E8E8",
            300: "#B3B3B3",
            400: "#777777",
            500: "#535353",
            600: "#3E3E3E",
            700: "#282828",
            800: "#212121",
            900: "#181818",
          },
        },

        // Semantic Colors — purpose-driven names
        surface: {
          base: "var(--surface-base)",
          elevated: "var(--surface-elevated)",
          overlay: "var(--surface-overlay)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          disabled: "var(--text-disabled)",
        },
        accent: {
          primary: "var(--accent-primary)",
          hover: "var(--accent-hover)",
        },
      },

      // ── DESIGN TOKENS: Typography ──────────────────────────────────
      fontFamily: {
        // Spotify uses a custom Circular font; we'll use similar alternatives
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        //  body: ["Inter", "sans-serif"],
      },

      fontSize: {
        // Custom type scale beyond Tailwind defaults
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },

      // ── DESIGN TOKENS: Spacing ─────────────────────────────────────
      spacing: {
        // Spotify uses an 8px base grid
        // Tailwind's default is 4px base, so we add named values
        18: "4.5rem",
        22: "5.5rem",
        sidebar: "240px",
        player: "90px",
      },

      // ── DESIGN TOKENS: Border Radius ───────────────────────────────
      borderRadius: {
        card: "8px",
        pill: "500px",
        circle: "50%",
      },

      // ── DESIGN TOKENS: Box Shadows ─────────────────────────────────
      boxShadow: {
        card: "0 8px 24px rgba(0, 0, 0, 0.5)",
        "card-hover": "0 16px 48px rgba(0, 0, 0, 0.7)",
        modal: "0 24px 64px rgba(0, 0, 0, 0.8)",
        glow: "0 0 20px rgba(29, 185, 84, 0.3)",
      },

      // ── BREAKPOINTS ────────────────────────────────────────────────
      screens: {
        // Mobile-first breakpoints
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // ── ANIMATIONS ─────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },

  plugins: [
    // Add any Tailwind plugins here (e.g., @tailwindcss/forms)
  ],
};

export default config;
