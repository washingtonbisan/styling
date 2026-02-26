"use client";

import { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { AlbumCard } from "@/components/cards/AlbumCard";
import { Button } from "@/components/forms/Button";
import { Input } from "@/components/forms/Input";
import { Modal } from "@/components/modal/Modal";
import { useModal } from "@/components/modal/useModal";

// Sample data for cards
const albums = [
  {
    id: 1,
    title: "Midnight Vibes",
    description: "The Weeknd, SZA, Frank Ocean and more",
    imageUrl: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Afrobeats Essentials",
    description: "Burna Boy, Wizkid, Tems and more",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Coding Flow",
    description: "Lo-fi beats to focus and build",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Global Pop Hits",
    description: "Dua Lipa, Taylor Swift, Olivia Rodrigo and more",
    imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Chill Instrumentals",
    description: "Relaxing piano and ambient sounds",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Street Rap Energy",
    description: "J. Cole, Travis Scott, Lil Baby and more",
    imageUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Sunday Acoustic",
    description: "Ed Sheeran, John Mayer, Adele and more",
    imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Electronic Rush",
    description: "Calvin Harris, David Guetta, Tiësto and more",
    imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop",
  },
];
export default function Home() {
  const modal = useModal();
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen bg-[var(--surface-base)]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <Container>
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-heading-xl text-5xl md:text-6xl font-display font-bold">
              Spotify
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Tap into the world of endless music with Spotify.
            </p>

            {/* Button Variants */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Button variant="primary" size="lg">
                Get Premium
              </Button>
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
              <Button variant="ghost" size="lg">
                Sign In
              </Button>
              <Button variant="primary" size="md" isLoading>
                Loading...
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Cards Section */}
      <section className="py-12 px-4">
        <Container>
          <h2 className="text-heading-md mb-6">Featured Playlists</h2>
          <Grid cols={4} gap="md">
            {albums.map((album) => (
              <AlbumCard
                key={album.id}
                title={album.title}
                description={album.description}
                imageUrl={album.imageUrl}
              />
            ))}
          </Grid>
        </Container>
      </section>

      {/* Forms Section */}
      <section className="py-12 px-4 bg-[var(--surface-elevated)]">
        <Container size="sm">
          <h2 className="text-heading-md mb-8">Form Elements & States</h2>
          <div className="space-y-6">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              helperText="We'll never share your email with anyone."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Input
              label="Password (Error State)"
              type="password"
              placeholder="Enter password"
              errorMessage="Password must be at least 8 characters"
            />
            <Input
              label="Username (Success State)"
              type="text"
              defaultValue="spotifyfan_99"
              successMessage="Username is available!"
            />
            <Input
              label="Disabled Input"
              placeholder="Cannot edit this"
              state="disabled"
              disabled
            />
            <Button variant="primary" className="w-full" size="lg">
              Create Account
            </Button>
          </div>
        </Container>
      </section>

      {/* Modal Demo Section */}
      <section className="py-12 px-4">
        <Container>
          <h2 className="text-heading-md mb-6">Modal Components</h2>
          <Button onClick={modal.open}>Open Accessible Modal</Button>

          <Modal
            isOpen={modal.isOpen}
            onClose={modal.close}
            title="Add to Playlist"
          >
            <div className="space-y-4">
              <Input label="Playlist name" placeholder="My awesome playlist" />
              <p className="text-sm text-[var(--text-secondary)]">
                Your playlist will be created and this song will be added to it.
              </p>
              <div className="flex gap-3 pt-2">
                <Button variant="primary" className="flex-1">
                  Create Playlist
                </Button>
                <Button
                  variant="secondary"
                  onClick={modal.close}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </Container>
      </section>
    </div>
  );
}
