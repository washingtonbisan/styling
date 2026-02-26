import Image from "next/image";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

interface ArtistCardProps {
  name: string;
  genre?: string;
  imageUrl: string;
  isVerified?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ArtistCard({
  name,
  genre,
  imageUrl,
  isVerified,
  className,
  onClick,
}: ArtistCardProps) {
  return (
    <div
      className={cn(
        "group p-4 rounded-card cursor-pointer",
        "bg-[var(--surface-elevated)] hover:bg-[var(--surface-overlay)]",
        "transition-colors duration-300",
        className,
      )}
      onClick={onClick}
    >
      {/* Circular image */}
      <div className="relative mb-4">
        <div className="w-full aspect-square rounded-full overflow-hidden shadow-card group-hover:shadow-card-hover transition-shadow duration-300">
          <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Play button (same as AlbumCard, positioned differently) */}
        <div className="absolute bottom-1 right-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
            aria-label={`Play ${name}`}
          >
            <svg
              className="w-4 h-4 text-spotify-black fill-current ml-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Text */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-sm text-[var(--text-primary)] truncate">
            {name}
          </p>
          {isVerified && (
            <svg
              className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          )}
        </div>
        <p className="text-xs text-[var(--text-secondary)] capitalize">
          {genre ?? "Artist"}
        </p>
      </div>
    </div>
  );
}
