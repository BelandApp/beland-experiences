import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  size?: "sm" | "md";
  variant?: "glass" | "surface" | "ghost";
};

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
} as const;

const variantClasses = {
  glass: "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
  surface: "bg-surface text-foreground hover:bg-border",
  ghost: "bg-transparent text-muted hover:bg-surface hover:text-foreground",
} as const;

export function IconButton({
  label,
  size = "md",
  variant = "glass",
  className,
  type = "button",
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-200 ease-out outline-none focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}