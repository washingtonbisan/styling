"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchBar } from "@/components/forms/SearchBar";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

export function TopNav({ showSearch = false }: { showSearch?: boolean }) {
  const router = useRouter();

  return (
    <div className={cn(
      "sticky top-0 z-30",
      "flex items-center justify-between gap-4",
      "px-4 md:px-6 lg:px-8 py-4",
      "bg-[var(--surface-base)]/80 backdrop-blur-md",
    )}>

      {/* Back / Forward */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[var(--text-primary)] hover:bg-black/60 transition-colors"
          aria-label="Go back"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => router.forward()}
          className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[var(--text-primary)] hover:bg-black/60 transition-colors"
          aria-label="Go forward"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Optional search bar */}
      {showSearch && (
        <div className="flex-1 max-w-md">
          <SearchBar isFullWidth />
        </div>
      )}

      {/* Right: Theme toggle + User */}
      <div className="flex items-center gap-3 flex-shrink-0 ml-auto">
        <ThemeToggle showLabel />
        <button className="w-8 h-8 rounded-full bg-[var(--surface-overlay)] flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-default)] transition-colors font-bold text-sm">
          U
        </button>
      </div>
    </div>
  );
}