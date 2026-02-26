"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { AudioPlayer } from "@/components/player/AudioPlayer";
import { cn } from "@/lib/cs";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen flex flex-col overflow-hidden",
        "bg-[var(--surface-base)]"
      )}
    >
      {/* Main area: sidebar + content side by side */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — hidden on mobile, shown on md+ */}
        <aside
          className={cn(
            "hidden md:flex flex-col flex-shrink-0",
            "transition-all duration-300 ease-out",
            "bg-black", // Spotify's sidebar is always pure black
            isSidebarCollapsed ? "w-[72px]" : "w-[240px]"
          )}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((p) => !p)}
          />
        </aside>

        {/* Main scrollable content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden",
            "bg-[var(--surface-base)]",
            // Gradient at top for depth (classic Spotify look)
            "relative"
          )}
          id="main-content"
        >
          {/* Top gradient overlay */}
          <div
            className="absolute top-0 left-0 right-0 h-64 pointer-events-none z-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(29,185,84,0.15) 0%, transparent 100%)",
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Fixed Audio Player — always at bottom */}
      <AudioPlayer />
    </div>
  );
}