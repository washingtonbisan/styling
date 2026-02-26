"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";
import styles from "./AudioPlayer.module.css";

// Waveform bars component (using CSS Module animation from styles/components.css)
function Waveform() {
  return (
    <div className={styles.waveform} aria-label="Now playing">
      {[12, 20, 8, 16, 10].map((height, i) => (
        <span
          key={i}
          className={styles.waveBar} /* from styles/components.css via module */
          style={{ height: `${height}px` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

interface AudioPlayerProps {
  track?: {
    title: string;
    artist: string;
    albumArt: string;
    duration: number; // seconds
  };
}

export function AudioPlayer({ track }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // percentage
  const [volume, setVolume] = useState(75); // percentage
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const currentTrack = track ?? {
    title: "Blinding Lights",
    artist: "The Weeknd",
    albumArt: "/placeholder.jpg",
    duration: 200,
  };

  const currentSeconds = (progress / 100) * currentTrack.duration;

  return (
    <footer className={styles.player} role="region" aria-label="Audio player">
      {/* LEFT: Track Info */}
      <div className={styles.trackInfo}>
        <div className={styles.albumArt}>
          <Image
            src={currentTrack.albumArt}
            alt={`${currentTrack.title} album art`}
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={styles.trackText}>
          {isPlaying && <Waveform />}
          <span className={styles.trackName}>{currentTrack.title}</span>
          <span className={styles.artistName}>{currentTrack.artist}</span>
        </div>
        {/* Heart icon — Tailwind utility here is fine */}
        <button
          className={cn(
            "p-1 ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors",
          )}
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
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* CENTER: Controls */}
      <div className={styles.controls}>
        <div className={styles.controlButtons}>
          {/* Shuffle */}
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={cn(styles.controlBtn, isShuffled && styles.activeBtn)}
            aria-label={isShuffled ? "Disable shuffle" : "Enable shuffle"}
            aria-pressed={isShuffled}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
            </svg>
          </button>

          {/* Previous */}
          <button className={styles.controlBtn} aria-label="Previous track">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={styles.playBtn}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button className={styles.controlBtn} aria-label="Next track">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>

          {/* Repeat */}
          <button
            onClick={() => setIsRepeating(!isRepeating)}
            className={cn(styles.controlBtn, isRepeating && styles.activeBtn)}
            aria-label={isRepeating ? "Disable repeat" : "Enable repeat"}
            aria-pressed={isRepeating}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <span className={styles.timeLabel} aria-label="Current time">
            {formatTime(currentSeconds)}
          </span>
          <div
            className={styles.progressBar}
            role="slider"
            aria-label="Playback progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setProgress((x / rect.width) * 100);
            }}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.timeLabel} aria-label="Total duration">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      {/* RIGHT: Volume */}
      <div className={styles.volumeSection}>
        <button className={cn(styles.controlBtn)} aria-label="Toggle mute">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </button>
        <div
          className={styles.volumeBar}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setVolume(((e.clientX - rect.left) / rect.width) * 100);
          }}
          role="slider"
          aria-label="Volume"
          aria-valuenow={Math.round(volume)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={styles.volumeFill} style={{ width: `${volume}%` }} />
        </div>
      </div>
    </footer>
  );
}
