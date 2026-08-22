import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "inverse";
};

const sizeClasses = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-9 w-9 border-[3px]",
} as const;

const variantClasses = {
  default: "border-foreground/25 border-t-primary",
  inverse: "border-primary-foreground/30 border-t-primary-foreground",
} as const;

export function Spinner({ className, size = "md", variant = "default" }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={cn(
        "inline-block animate-spin rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    />
  );
}