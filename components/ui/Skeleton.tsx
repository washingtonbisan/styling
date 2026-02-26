// import { cn } from "@/lib/cn";
import { cn } from "@/lib/cs";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rect";
  width?: string;
  height?: string;
  lines?: number; // For text variant with multiple lines
}

// The shimmer class is defined inline here for the CSS Module pattern
const shimmerClass = [
  "animate-pulse", // Tailwind fallback
  "relative overflow-hidden",
  "before:absolute before:inset-0",
  "before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
  "before:translate-x-[-200%] before:animate-[shimmer_1.5s_infinite]",
].join(" ");

export function Skeleton({
  className,
  variant = "rect",
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClass = cn(
    "bg-[var(--surface-elevated)]",
    shimmerClass,
    variant === "circle" && "rounded-full",
    variant === "text" && "rounded",
    variant === "rect" && "rounded-md",
    className,
  );

  if (variant === "text" && lines > 1) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={baseClass}
            style={{
              width: i === lines - 1 ? "60%" : (width ?? "100%"), // Last line shorter
              height: height ?? "0.875rem",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={baseClass}
      style={{ width: width ?? "100%", height: height ?? "1rem" }}
      aria-hidden="true"
      role="presentation"
    />
  );
}

// Pre-composed skeleton patterns for common components
export function AlbumCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("p-4 rounded-lg bg-[var(--surface-elevated)]", className)}
    >
      <Skeleton variant="rect" height="200px" className="mb-4 rounded-md" />
      <Skeleton variant="text" height="0.875rem" width="80%" className="mb-2" />
      <Skeleton variant="text" height="0.75rem" width="60%" />
    </div>
  );
}

export function TrackRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <Skeleton variant="rect" width="16px" height="16px" />
      <Skeleton
        variant="rect"
        width="40px"
        height="40px"
        className="rounded-sm flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Skeleton
          variant="text"
          height="0.875rem"
          width="50%"
          className="mb-1.5"
        />
        <Skeleton variant="text" height="0.75rem" width="35%" />
      </div>
      <Skeleton variant="text" width="40px" height="0.75rem" />
    </div>
  );
}
