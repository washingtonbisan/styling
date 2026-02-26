"use client";

import { useState } from "react";
import { TopNav } from "@/components/shell/TopNav";
import { SearchBar } from "@/components/forms/SearchBar";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { Grid } from "@/components/layout/Grid";

const genres = [
  { label: "Pop", color: "#E13300", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop" },
  { label: "Hip-Hop", color: "#BA5D07", img: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=300&auto=format&fit=crop" },
  { label: "Afrobeats", color: "#1E3264", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop" },
  { label: "R&B", color: "#7358FF", img: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=300&auto=format&fit=crop" },
  { label: "Electronic", color: "#0D73EC", img: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop" },
  { label: "Acoustic", color: "#148A08", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&auto=format&fit=crop" },
  { label: "Latin", color: "#C62D34", img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop" },
  { label: "Jazz", color: "#503750", img: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&auto=format&fit=crop" },
  { label: "Classical", color: "#477D95", img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&auto=format&fit=crop" },
  { label: "Podcasts", color: "#E8115B", img: "https://images.unsplash.com/photo-1478737270197-2b4d8a7f7a4b?w=300&auto=format&fit=crop" },
];

const searchResults = [
  { id: 1, title: "Essence", description: "Wizkid ft. Tems", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop" },
  { id: 2, title: "Love Nwantiti", description: "CKay", imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop" },
  { id: 3, title: "Ye", description: "Burna Boy", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop" },
  { id: 4, title: "Mood", description: "24KGoldn ft. iann dior", imageUrl: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=400&auto=format&fit=crop" },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-full pb-8">
      <TopNav />

      <div className="px-4 md:px-6 lg:px-8 pt-4 space-y-8">

        {/* Search Bar — big centered version */}
        <div className="max-w-xl">
          <h1 className="text-heading-lg text-[var(--text-primary)] mb-4">Search</h1>
          <SearchBar
            isFullWidth
            onSearch={setQuery}
            placeholder="What do you want to listen to?"
          />
        </div>

        {/* Browse genres (when no query) */}
        {!hasQuery && (
          <section>
            <h2 className="text-heading-md text-[var(--text-primary)] mb-4">Browse all</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {genres.map((genre, i) => (
                <div
                  key={genre.label}
                  className="relative rounded-lg overflow-hidden cursor-pointer h-24 group"
                  style={{
                    backgroundColor: genre.color,
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <span className="absolute top-3 left-3 font-display font-bold text-white text-base z-10 drop-shadow">
                    {genre.label}
                  </span>
                  <img
                    src={genre.img}
                    alt={genre.label}
                    className="absolute bottom-0 right-0 w-16 h-16 object-cover rounded-tl-md rotate-[25deg] translate-x-2 translate-y-2 shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Search results (when query exists) */}
        {hasQuery && (
          <section className="animate-[routeIn_0.3s_ease-out_both]">
            <h2 className="text-heading-md text-[var(--text-primary)] mb-4">
              Results for <span className="text-[var(--accent-primary)]">{query}</span>
            </h2>
            <Grid cols={4} gap="md">
              {searchResults.map((r) => (
                <AlbumCard key={r.id} title={r.title} description={r.description} imageUrl={r.imageUrl} />
              ))}
            </Grid>
          </section>
        )}
      </div>
    </div>
  );
}