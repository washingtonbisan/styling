"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cs";

interface AnimatedInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  successMessage?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function AnimatedInput({
  label,
  type = "text",
  value = "",
  onChange,
  errorMessage,
  successMessage,
  helperText,
  disabled,
  required,
  className,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const prevError = useRef(errorMessage);

  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  // Trigger shake whenever a NEW error appears
  useEffect(() => {
    if (errorMessage && errorMessage !== prevError.current) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    }
    prevError.current = errorMessage;
  }, [errorMessage]);

  const state = errorMessage ? "error" : successMessage ? "success" : isFocused ? "focused" : "default";

  const borderColor = {
    error:   "border-[var(--status-error)]",
    success: "border-[var(--status-success)]",
    focused: "border-[var(--border-focus)]",
    default: "border-[var(--border-default)]",
  }[state];

  const ringColor = {
    error:   "ring-[var(--status-error)]/20",
    success: "ring-[var(--status-success)]/20",
    focused: "ring-[var(--border-focus)]/20",
    default: "",
  }[state];

  return (
    <div
      className={cn(
        "relative",
        isShaking && "animate-[shake_0.5s_cubic-bezier(0.36,0.07,0.19,0.97)_both]",
        className
      )}
    >
      {/* The input wrapper with border */}
      <div
        className={cn(
          "relative rounded-lg border-2 bg-[var(--surface-elevated)]",
          "transition-all duration-200",
          borderColor,
          isFocused && "ring-4",
          ringColor,
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Floating label */}
        <label
          className={cn(
            "absolute left-4 pointer-events-none select-none",
            "transition-all duration-200 origin-left",
            "text-[var(--text-secondary)]",
            isFloating
              ? "top-2 text-xs scale-90 font-semibold"
              : "top-1/2 -translate-y-1/2 text-sm",
            state === "error" && "text-[var(--status-error)]",
            state === "success" && "text-[var(--status-success)]",
            isFocused && state === "default" && "text-[var(--text-primary)]"
          )}
        >
          {label}
          {required && <span className="text-[var(--status-error)] ml-0.5">*</span>}
        </label>

        {/* The actual input */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent outline-none",
            "pt-6 pb-2 px-4 text-sm text-[var(--text-primary)]",
            "transition-colors duration-200",
            disabled && "cursor-not-allowed"
          )}
          aria-invalid={!!errorMessage}
          aria-describedby={errorMessage ? "input-error" : successMessage ? "input-success" : undefined}
        />

        {/* State icon — right side */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {state === "success" && (
            <svg
              className="w-5 h-5 text-[var(--status-success)] animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {state === "error" && (
            <svg
              className="w-5 h-5 text-[var(--status-error)] animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both]"
              fill="currentColor" viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>

      {/* Messages below */}
      {errorMessage && (
        <p
          id="input-error"
          className="mt-1.5 text-xs text-[var(--status-error)] flex items-center gap-1 animate-[slideDown_0.2s_ease-out_both]"
        >
          {errorMessage}
        </p>
      )}
      {successMessage && !errorMessage && (
        <p
          id="input-success"
          className="mt-1.5 text-xs text-[var(--status-success)] flex items-center gap-1 animate-[slideDown_0.2s_ease-out_both]"
        >
          {successMessage}
        </p>
      )}
      {helperText && !errorMessage && !successMessage && (
        <p className="mt-1.5 text-xs text-[var(--text-disabled)]">{helperText}</p>
      )}
    </div>
  );
}