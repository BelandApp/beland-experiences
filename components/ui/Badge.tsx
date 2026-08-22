import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border border-white/25 bg-white/10 px-3 text-xs font-medium tracking-wide text-white backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}