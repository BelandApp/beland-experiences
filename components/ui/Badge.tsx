import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Badge({
  children,
  className,
  variant = "primary",
}: BadgeProps) {
  const color = {
    primary: "border-white/25 bg-white/10 text-white",
    secondary: "border-primary/50 bg-white text-primary",
  };
  return (
    <span
      className={cn(
        "inline-flex h-7 cursor-default items-center rounded-full border px-3 text-xs font-medium tracking-wide  backdrop-blur-sm",
        color[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
