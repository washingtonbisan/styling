// lib/variants.ts
import { cva } from "class-variance-authority";

// Button variants — defines all possible combinations
export const buttonVariants = cva(
  // Base classes always applied
  "btn-base rounded-pill text-sm font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        // Primary: filled green button
        primary:
          "bg-spotify-green text-spotify-black hover:bg-spotify-green-hover hover:scale-[1.04] active:scale-[0.98]",
        // Secondary: outlined button
        secondary:
          "border border-spotify-gray-300 text-[var(--text-primary)] hover:border-white hover:scale-[1.04]",
        // Ghost: text-only button
        ghost:
          "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]",
        // Destructive: red for dangerous actions
        destructive: "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        sm: "px-4 py-1.5 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        icon: "p-2 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// Card variants
export const cardVariants = cva(
  "rounded-card transition-all duration-300 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--surface-elevated)] hover:bg-[var(--surface-overlay)]",
        featured: "bg-gradient-to-br from-spotify-gray-700 to-spotify-gray-900",
        transparent: "bg-transparent hover:bg-[var(--surface-elevated)]",
      },
      padding: {
        none: "",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
      },
      hoverable: {
        true: "cursor-pointer hover:shadow-card-hover hover:-translate-y-1",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hoverable: true,
    },
  },
);

// Input variants
export const inputVariants = cva(
  "w-full rounded-md font-body text-sm transition-all duration-200 outline-none",
  {
    variants: {
      state: {
        default:
          "bg-[var(--surface-elevated)] border border-transparent text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:border-white focus:ring-1 focus:ring-white",
        error:
          "bg-[var(--surface-elevated)] border border-red-500 text-[var(--text-primary)] focus:border-red-400 focus:ring-1 focus:ring-red-400",
        success:
          "bg-[var(--surface-elevated)] border border-spotify-green text-[var(--text-primary)] focus:border-spotify-green focus:ring-1 focus:ring-spotify-green",
        disabled:
          "bg-[var(--surface-base)] border border-[var(--surface-overlay)] text-[var(--text-disabled)] cursor-not-allowed",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
    },
  },
);
