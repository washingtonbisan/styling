"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cs";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const mainNav = [
  {
    label: "Home",
    href: "/dashboard",
    icon: (active: boolean) => (
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill={active ? "white" : "none"} stroke={active ? "none" : "currentColor"} strokeWidth={2}>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Search",
    href: "/search",
    icon: (active: boolean) => (
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill={active ? "white" : "none"} stroke="currentColor" strokeWidth={active ? 3 : 2}>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: "Your Library",
    href: "/library",
    icon: (active: boolean) => (
      <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill={active ? "white" : "none"} stroke="currentColor" strokeWidth={active ? 3 : 2}>
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
];

const playlists = [
  { id: 1, title: "Liked Songs", type: "Playlist", color: "#4a0082" },
  { id: 2, title: "Midnight Vibes", type: "Playlist", color: "#1a3a5c" },
  { id: 3, title: "Afrobeats Mix", type: "Playlist", color: "#5c1a1a" },
  { id: 4, title: "Coding Flow", type: "Playlist", color: "#1a5c2a" },
  { id: 5, title: "Sunday Acoustic", type: "Playlist", color: "#5c4a1a" },
];

export function Sidebar({ isCollapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Logo + Collapse Toggle */}
      <div className={cn(
        "flex items-center h-16 px-3 flex-shrink-0",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 11-.277-1.215c3.809-.87 7.076-.496 9.712 1.115.294.18.387.565.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.793c3.532-1.072 9.404-.865 13.115 1.338a.937.937 0 01-.955 1.612z" />
              </svg>
            </div>
            <span className="font-display font-bold text-white text-lg">Spotify</span>
          </Link>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 text-[#b3b3b3] hover:text-white transition-colors rounded-md hover:bg-white/10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className={cn("w-5 h-5 transition-transform duration-300", isCollapsed && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M18 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Nav */}
      <nav className="px-3 space-y-1 flex-shrink-0">
        {mainNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-3 py-2 rounded-md",
                "transition-colors duration-150",
                isCollapsed && "justify-center px-2",
                active
                  ? "text-white"
                  : "text-[#b3b3b3] hover:text-white hover:bg-white/10"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {item.icon(active)}
              {!isCollapsed && (
                <span className="font-semibold text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 my-3 border-t border-white/10 flex-shrink-0" />

      {/* Create Playlist */}
      {!isCollapsed && (
        <div className="px-3 flex-shrink-0">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-[#b3b3b3] hover:text-white transition-colors group">
            <div className="w-6 h-6 rounded-sm bg-[#b3b3b3] group-hover:bg-white flex items-center justify-center transition-colors flex-shrink-0">
              <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
                <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Create Playlist</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 w-full text-[#b3b3b3] hover:text-white transition-colors group">
            <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
            </div>
            <span className="text-sm font-semibold">Liked Songs</span>
          </button>
        </div>
      )}

      <div className="mx-3 my-2 border-t border-white/10 flex-shrink-0" />

      {/* Playlist List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {playlists.map((playlist) => (
          <Link
            key={playlist.id}
            href={`/playlist/${playlist.id}`}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md",
              "text-[#b3b3b3] hover:text-white hover:bg-white/10",
              "transition-colors duration-150",
              isCollapsed && "justify-center px-2"
            )}
            title={isCollapsed ? playlist.title : undefined}
          >
            {/* Color swatch as playlist art */}
            <div
              className="w-8 h-8 rounded-sm flex-shrink-0"
              style={{ backgroundColor: playlist.color }}
            />
            {!isCollapsed && (
              <div className="min-w-0">
                <p className="text-sm truncate">{playlist.title}</p>
                <p className="text-xs text-[#535353]">{playlist.type}</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}