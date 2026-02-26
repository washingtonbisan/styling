import Image from "next/image";
import { cn } from "@/lib/cs";
// import { cn } from "@/lib/cn";

interface FeaturedCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  accentColor?: string; // Dynamic color extracted from album art
  ctaLabel?: string;
  onPlay?: () => void;
  className?: string;
}

export function FeaturedCard({
  title,
  subtitle,
  description,
  imageUrl,
  accentColor = "#1DB954",
  ctaLabel = "Play",
  onPlay,
  className,
}: FeaturedCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "min-h-[280px] md:min-h-[360px]",
        "group cursor-pointer",
        className,
      )}
    >
      {/* Background image */}
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />

      {/* Gradient overlay — ensures text readability regardless of image */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor}cc 0%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 100%)`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {subtitle && (
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
            {subtitle}
          </p>
        )}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-none mb-2 drop-shadow-lg">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-white/80 mb-4 max-w-md line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={onPlay}
            className="flex items-center gap-2 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-spotify-black px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-[1.04] active:scale-[0.98]"
          >
            <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            {ctaLabel}
          </button>
          <button className="flex items-center gap-2 text-white border border-white/40 hover:border-white px-6 py-3 rounded-full font-semibold text-sm transition-all hover:bg-white/10">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
