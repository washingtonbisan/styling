import { cn } from "@/lib/cs";
import { cardVariants } from "@/lib/variants";
import type { VariantProps } from "class-variance-authority";

// VariantProps automatically infers the valid prop types from cardVariants
interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  variant,
  padding,
  hoverable,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, hoverable }), className)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      {children}
    </div>
  );
}
