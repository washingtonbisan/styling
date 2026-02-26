// "use client";

// import { useTheme, type Theme } from "@/context/ThemeContext";
// import { cn } from "@/lib/cs";

// const themeConfig: Record<
//   Theme,
//   { icon: string; label: string; next: string }
// > = {
//   dark: {
//     icon: "🌙",
//     label: "Dark mode — click for Light",
//     next: "light",
//   },
//   light: {
//     icon: "☀️",
//     label: "Light mode — click for High Contrast",
//     next: "high-contrast",
//   },
//   "high-contrast": {
//     icon: "◐",
//     label: "High Contrast — click for Dark",
//     next: "dark",
//   },
// };

// interface ThemeToggleProps {
//   className?: string;
//   showLabel?: boolean;
// }

// export function ThemeToggle({
//   className,
//   showLabel = false,
// }: ThemeToggleProps) {
//   const { theme, toggleTheme } = useTheme();
//   const config = themeConfig[theme];

//   return (
//     <button
//       onClick={toggleTheme}
//       className={cn(
//         "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold",
//         "bg-[var(--surface-elevated)] hover:bg-[var(--surface-overlay)]",
//         "text-[var(--text-primary)] transition-all duration-200",
//         "border border-[var(--border-default)] hover:border-[var(--border-strong)]",
//         className,
//       )}
//       aria-label={config.label}
//       title={config.label}
//     >
//       <span className="text-base leading-none" aria-hidden="true">
//         {config.icon}
//       </span>
//       {showLabel && (
//         <span className="hidden sm:inline capitalize">
//           {theme.replace("-", " ")}
//         </span>
//       )}
//     </button>
//   );
// }



"use client";

import { useTheme, type Theme } from "@/context/ThemeContext";
import { cn } from "@/lib/cs";

const themeConfig: Record< // ✅ Fixed: was missing the opening <
  Theme,
  { icon: string; label: string }
> = {
  dark: { icon: "🌙", label: "Dark" },
  light: { icon: "☀️", label: "Light" },
  "high-contrast": { icon: "◐", label: "High Contrast" },
};

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const config = themeConfig[theme];

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold",
        "bg-[var(--surface-overlay)] hover:bg-[var(--border-default)]",
        "text-[var(--text-primary)]",
        "border border-[var(--border-default)] hover:border-[var(--border-strong)]",
        "transition-all duration-200 cursor-pointer",
        className
      )}
      aria-label={`Current theme: ${config.label}. Click to switch.`}
      title={`Switch theme (currently ${config.label})`}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {config.icon}
      </span>
      {showLabel && (
        <span className="hidden sm:inline">{config.label}</span>
      )}
    </button>
  );
}
