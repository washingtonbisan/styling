"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { FeaturedCard } from "@/components/cards/FeaturedCard";
import { ListeningStats } from "@/components/visualizations/ListeningStats";
import { TopNav } from "@/components/shell/TopNav";

const recentlyPlayed = [
  { id: 1, title: "Liked Songs", description: "430 songs", imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop", color: "#4a0082" },
  { id: 2, title: "Midnight Vibes", description: "The Weeknd, SZA", imageUrl: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?w=400&auto=format&fit=crop", color: "#1a3a5c" },
  { id: 3, title: "Afrobeats Essentials", description: "Burna Boy, Wizkid", imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop", color: "#5c1a1a" },
  { id: 4, title: "Coding Flow", description: "Lo-fi beats", imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop", color: "#1a5c2a" },
  { id: 5, title: "Street Rap Energy", description: "J. Cole, Travis Scott", imageUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop", color: "#5c3a1a" },
  { id: 6, title: "Electronic Rush", description: "Calvin Harris, Guetta", imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop", color: "#1a3a5c" },
];

const madeForYou = [
  { id: 7, title: "Daily Mix 1", description: "Drake, Kendrick Lamar and more", imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop" },
  { id: 8, title: "Discover Weekly", description: "Fresh picks every Monday", imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop" },
  { id: 9, title: "Release Radar", description: "New music from artists you follow", imageUrl: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&auto=format&fit=crop" },
  { id: 10, title: "Time Capsule", description: "Songs from your past", imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&auto=format&fit=crop" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  return (
    <div className="min-h-full pb-8">
      <TopNav />

      <div className="px-4 md:px-6 lg:px-8 pt-4 space-y-10">

        {/* Greeting + Quick Picks grid */}
        <section>
          <h1 className="text-heading-lg text-[var(--text-primary)] mb-6">
            {getGreeting()}
          </h1>
          {/* 2-col grid of recent items — classic Spotify home top section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentlyPlayed.slice(0, 6).map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-4 bg-[var(--surface-elevated)] hover:bg-[var(--surface-overlay)] rounded-md overflow-hidden transition-colors duration-150 group text-left"
              >
                <div
                  className="w-16 h-16 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold text-sm text-[var(--text-primary)] pr-4 truncate">
                  {item.title}
                </span>
                {/* Play button on hover */}
                <div className="ml-auto mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)] flex items-center justify-center shadow-glow">
                    <svg className="w-4 h-4 fill-black ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Banner */}
        <section>
          <FeaturedCard
            title="Afrobeats 2025"
            subtitle="Featured Playlist"
            description="The hottest Afrobeats tracks dominating 2025. Updated weekly."
            imageUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop"
            accentColor="#5c1a1a"
          />
        </section>

        {/* Listening Stats Data Visualization */}
        <section>
          <h2 className="text-heading-md text-[var(--text-primary)] mb-4">Your listening this week</h2>
          <ListeningStats />
        </section>

        {/* Made For You */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-md text-[var(--text-primary)]">Made for you</h2>
            <button className="text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] uppercase tracking-wider transition-colors">
              Show all
            </button>
          </div>
          <Grid cols={4} gap="md">
            {madeForYou.map((item) => (
              <AlbumCard
                key={item.id}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
              />
            ))}
          </Grid>
        </section>

      </div>
    </div>
  );
}