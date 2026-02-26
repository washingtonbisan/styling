"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  isFullWidth?: boolean;
}

export function SearchBar({
  placeholder = "What do you want to play?",
  onSearch,
  className,
  isFullWidth = false,
}: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClear();
      inputRef.current?.blur();
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center",
        isFullWidth ? "w-full" : "w-64 md:w-80",
        // Expands slightly on focus
        isFocused && !isFullWidth && "md:w-96",
        "transition-all duration-300",
        className,
      )}
    >
      {/* Search icon */}
      <div className="absolute left-3 pointer-events-none">
        <svg
          className={cn(
            "w-4 h-4 transition-colors duration-200",
            isFocused
              ? "text-[var(--text-primary)]"
              : "text-[var(--text-secondary)]",
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-10 py-3 rounded-full",
          "bg-white text-spotify-black",
          "placeholder:text-spotify-gray-400",
          "text-sm font-medium",
          "border-2 border-transparent",
          "focus:outline-none focus:border-white",
          "transition-all duration-200",
          // Scale up slightly on focus
          isFocused && "shadow-glow",
        )}
        aria-label="Search"
        role="searchbox"
        autoComplete="off"
        spellCheck="false"
      />

      {/* Clear button — only shows when there's text */}
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-spotify-gray-400 hover:text-spotify-black transition-colors"
          aria-label="Clear search"
          tabIndex={-1}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
