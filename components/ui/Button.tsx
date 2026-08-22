import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:scale-102 active:scale-[0.98]",
  secondary: "bg-surface text-foreground hover:bg-border active:scale-[0.98]",
  outline:
    "border border-border-strong bg-transparent text-foreground hover:bg-surface active:scale-[0.98]",
  ghost: "bg-transparent text-foreground hover:bg-surface active:scale-[0.98]",
  destructive: "bg-destructive text-white hover:opacity-90 active:scale-[0.98]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

const baseClasses =
  "inline-flex select-none items-center justify-center rounded-full font-medium tracking-wide transition-all duration-200 ease-out outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;

  if (props.href !== undefined) {
    const { href, ariaLabel, target, rel, onClick } = props;
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        onClick={onClick}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...(props as ButtonAsButton)}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
