import { cn } from "@/lib/cs";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

const sizeMap = {
  sm: "max-w-2xl", // 672px — forms, auth pages
  md: "max-w-4xl", // 896px — articles, focused content
  lg: "max-w-6xl", // 1152px — main app content
  full: "max-w-full", // No max-width constraint
};

export function Container({
  children,
  className,
  size = "lg",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
