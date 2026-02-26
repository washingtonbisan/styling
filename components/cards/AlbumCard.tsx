"use client";

import Image from "next/image";
import { cn } from "@/lib/cs";

interface AlbumCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  isRounded?: boolean; // Artist cards are circular, album cards are square
  className?: string;
  onClick?: () => void;
}

export function AlbumCard({
  title,
  description,
  imageUrl,
  isRounded = false,
  className,
  onClick,
}: AlbumCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-[var(--surface-elevated)] rounded-card p-4",
        "hover:bg-[var(--surface-overlay)] transition-colors duration-300 cursor-pointer",
        className,
      )}
      onClick={onClick}
    >
      {/* Album Art with hover play button */}
      <div
        className={cn(
          "relative mb-4 overflow-hidden shadow-card",
          isRounded ? "rounded-circle" : "rounded-md",
        )}
      >
        <Image
          src={imageUrl}
          alt={title}
          width={200}
          height={200}
          className="w-full aspect-square object-cover"
        />

        {/* Play button — appears on card hover */}
        <div
          className={cn(
            "absolute bottom-2 right-2",
            "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
            "transition-all duration-300 ease-out",
          )}
        >
          <button
            className="w-12 h-12 bg-spotify-green rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
            aria-label={`Play ${title}`}
            onClick={(e) => e.stopPropagation()} // Don't trigger card onClick
          >
            {/* Play triangle */}
            <svg
              className="w-5 h-5 text-spotify-black fill-current ml-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Card Text */}
      <div className="space-y-1 min-h-[3rem]">
        <p className="font-semibold text-sm text-[var(--text-primary)] truncate">
          {title}
        </p>
        {description && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
