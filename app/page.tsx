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
    title: "Liked Songs",
    description: "Your personal playlist",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 2,
    title: "Daily Mix 1",
    description: "Drake, Kendrick Lamar and more",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 3,
    title: "Discover Weekly",
    description: "Made for you – fresh picks every Monday",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: 4,
    title: "Release Radar",
    description: "Catch all the latest music from artists you follow",
    imageUrl: "/placeholder.jpg",
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
              Design System <span className="text-spotify-green">Showcase</span>
            </h1>
            <p className="text-body-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Spotify-caliber components built with Tailwind CSS, design tokens,
              and accessibility-first principles.
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
