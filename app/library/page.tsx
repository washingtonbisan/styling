"use client";

import { useState } from "react";
import { TopNav } from "@/components/shell/TopNav";
import { ArtistCard } from "@/components/cards/ArtistCard";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

type Filter = "playlists" | "albums" | "artists";
type ViewMode = "list" | "grid";

const playlists = [
  { id: 1, title: "Liked Songs", description: "430 songs • Playlist", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop", updatedAt: "2 days ago" },
  { id: 2, title: "Midnight Vibes", description: "12 songs • Playlist", imageUrl: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=400&auto=format&fit=crop", updatedAt: "1 week ago" },
  { id: 3, title: "Afrobeats Mix", description: "24 songs • Playlist", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop", updatedAt: "3 days ago" },
  { id: 4, title: "Coding Flow", description: "55 songs • Playlist", imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop", updatedAt: "Today" },
];

const artists = [
  { id: 1, name: "Burna Boy", genre: "Afrobeats", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop", isVerified: true },
  { id: 2, name: "The Weeknd", genre: "R&B / Pop", imageUrl: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=400&auto=format&fit=crop", isVerified: true },
  { id: 3, name: "Kendrick Lamar", genre: "Hip-Hop", imageUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop", isVerified: true },
  { id: 4, name: "Tems", genre: "Afrobeats / R&B", imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop", isVerified: false },
];

export default function LibraryPage() {
  const [filter, setFilter] = useState<Filter>("playlists");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filters: Filter[] = ["playlists", "albums", "artists"];

  return (
    <div className="min-h-full pb-8">
      <TopNav />

      <div className="px-4 md:px-6 lg:px-8 pt-4 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-heading-lg text-[var(--text-primary)]">Your Library</h1>
          <button className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Filter Pills + View Toggle */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap",
                  filter === f
                    ? "bg-[var(--text-primary)] text-[var(--text-inverse)]"
                    : "bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface-overlay)]"
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setViewMode("list")}
              className={cn("p-1.5 rounded transition-colors", viewMode === "list" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn("p-1.5 rounded transition-colors", viewMode === "grid" ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]")}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={2} />
                <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={2} />
                <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={2} />
                <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="animate-[routeIn_0.25s_ease-out_both]" key={filter}>

          {/* Playlists - List View */}
          {filter === "playlists" && viewMode === "list" && (
            <div className="space-y-1">
              {playlists.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors group"
                >
                  <img src={p.imageUrl} alt={p.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{p.title}</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{p.description}</p>
                  </div>
                  <span className="text-xs text-[var(--text-disabled)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {p.updatedAt}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Playlists - Grid View */}
          {filter === "playlists" && viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {playlists.map((p) => (
                <AlbumCard key={p.id} title={p.title} description={p.description} imageUrl={p.imageUrl} />
              ))}
            </div>
          )}

          {/* Artists */}
          {filter === "artists" && (
            <div className={cn(
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                : "space-y-1"
            )}>
              {artists.map((a) => (
                viewMode === "grid" ? (
                  <ArtistCard key={a.id} name={a.name} genre={a.genre} imageUrl={a.imageUrl} isVerified={a.isVerified} />
                ) : (
                  <div key={a.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors">
                    <img src={a.imageUrl} alt={a.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{a.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{a.genre}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          )}

          {/* Albums placeholder */}
          {filter === "albums" && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--surface-elevated)] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                </svg>
              </div>
              <p className="text-[var(--text-primary)] font-semibold mb-1">No saved albums yet</p>
              <p className="text-sm text-[var(--text-secondary)]">Save albums by tapping the heart icon</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}