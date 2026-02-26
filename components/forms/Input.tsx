import { cn } from "@/lib/cs";
import { inputVariants } from "@/lib/variants";
import type { VariantProps } from "class-variance-authority";

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
}

export function Input({
  label,
  helperText,
  errorMessage,
  successMessage,
  leftIcon,
  state,
  size,
  className,
  id,
  ...props
}: InputProps) {
  // Determine state from props if not explicitly set
  const resolvedState = errorMessage
    ? "error"
    : successMessage
      ? "success"
      : state;
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-[var(--text-primary)]"
        >
          {label}
        </label>
      )}

      {/* Input wrapper for icon positioning */}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            inputVariants({ state: resolvedState, size }),
            leftIcon && "pl-10", // Extra left padding when icon present
            className,
          )}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />
      </div>

      {/* Error message (red) */}
      {errorMessage && (
        <p
          id={`${inputId}-error`}
          className="text-xs text-red-500 flex items-center gap-1"
        >
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errorMessage}
        </p>
      )}

      {/* Success message (green) */}
      {successMessage && (
        <p
          id={`${inputId}-success`}
          className="text-xs text-spotify-green flex items-center gap-1"
        >
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          {successMessage}
        </p>
      )}

      {/* Helper text (neutral) */}
      {helperText && !errorMessage && !successMessage && (
        <p
          id={`${inputId}-helper`}
          className="text-xs text-[var(--text-secondary)]"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
