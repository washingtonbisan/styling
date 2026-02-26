export const primitives = {
  color: {
    // Spotify brand
    green100: "#e8f8ee",
    green300: "#57d287",
    green500: "#1DB954", // Core brand green
    green600: "#1ed760", // Hover
    green700: "#169c46", // Active/pressed

    // Neutrals
    black: "#191414",
    white: "#FFFFFF",

    gray100: "#F6F6F6",
    gray200: "#E8E8E8",
    gray300: "#B3B3B3",
    gray400: "#777777",
    gray500: "#535353",
    gray600: "#3E3E3E",
    gray700: "#282828",
    gray800: "#212121",
    gray900: "#181818",

    // Status colors
    red400: "#f87171",
    red500: "#ef4444",
    red600: "#dc2626",

    blue400: "#60a5fa",
    blue500: "#3b82f6",

    yellow400: "#facc15",
    yellow500: "#eab308",
  },

  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
  },

  radius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
    circle: "50%",
  },

  fontSize: {
    "2xs": "0.625rem", // 10px
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },

  fontWeight: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  duration: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    slower: "500ms",
  },

  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  shadow: {
    sm: "0 2px 8px rgba(0,0,0,0.3)",
    md: "0 8px 24px rgba(0,0,0,0.5)",
    lg: "0 16px 48px rgba(0,0,0,0.7)",
    xl: "0 24px 64px rgba(0,0,0,0.8)",
    glow: "0 0 20px rgba(29, 185, 84, 0.3)",
    "glow-lg": "0 0 40px rgba(29, 185, 84, 0.5)",
  },
} as const;

// ─────────────────────────────────────────────
// TIER 2: SEMANTIC TOKENS
// Map primitives to PURPOSE. These drive the theme system.
// The CSS variables in globals.css mirror these names exactly.
// ─────────────────────────────────────────────
export const semantic = {
  // These are the CSS variable names — values come from globals.css
  // and switch automatically when dark/light theme changes
  color: {
    // Backgrounds / surfaces
    surfaceBase: "var(--surface-base)",
    surfaceElevated: "var(--surface-elevated)",
    surfaceOverlay: "var(--surface-overlay)",
    surfaceSubtle: "var(--surface-subtle)",

    // Text
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
    textDisabled: "var(--text-disabled)",
    textInverse: "var(--text-inverse)",

    // Accent / brand
    accentPrimary: "var(--accent-primary)",
    accentHover: "var(--accent-hover)",
    accentActive: "var(--accent-active)",
    accentSubtle: "var(--accent-subtle)",

    // Status
    statusError: "var(--status-error)",
    statusSuccess: "var(--status-success)",
    statusWarning: "var(--status-warning)",
    statusInfo: "var(--status-info)",

    // Border
    borderDefault: "var(--border-default)",
    borderStrong: "var(--border-strong)",
    borderFocus: "var(--border-focus)",
  },
} as const;

// ─────────────────────────────────────────────
// TIER 3: COMPONENT TOKENS
// Specific values consumed by individual components.
// Makes it easy to restyle one component without touching others.
// ─────────────────────────────────────────────
export const components = {
  button: {
    radiusPill: primitives.radius.full,
    radiusDefault: primitives.radius.md,
    paddingSmX: primitives.spacing[4],
    paddingSmY: primitives.spacing[2],
    paddingMdX: primitives.spacing[6],
    paddingMdY: primitives.spacing[3],
    paddingLgX: primitives.spacing[8],
    paddingLgY: primitives.spacing[4],
    fontWeight: primitives.fontWeight.bold,
    transitionDuration: primitives.duration.base,
  },

  card: {
    radius: primitives.radius.md,
    padding: primitives.spacing[4],
    shadow: primitives.shadow.md,
    shadowHover: primitives.shadow.lg,
    transitionDuration: primitives.duration.slow,
  },

  input: {
    radius: primitives.radius.md,
    paddingX: primitives.spacing[4],
    paddingY: primitives.spacing[3],
    fontSize: primitives.fontSize.sm,
    transitionDuration: primitives.duration.base,
  },

  modal: {
    radius: primitives.radius.xl,
    shadow: primitives.shadow.xl,
    backdropBlur: "8px",
    maxWidthSm: "384px",
    maxWidthMd: "448px",
    maxWidthLg: "512px",
  },

  sidebar: {
    width: "240px",
    widthCollapsed: "72px",
  },

  player: {
    height: "90px",
  },

  navbar: {
    height: "64px",
  },
} as const;

// Export a unified tokens object for convenience
export const tokens = { primitives, semantic, components } as const;

// Type exports — useful for TypeScript consumers
export type PrimitiveTokens = typeof primitives;
export type SemanticTokens = typeof semantic;
export type ComponentTokens = typeof components;
