"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : undefined;
  const stateClasses = error
    ? "border-destructive focus:border-destructive focus:ring-destructive/15"
    : "border-border-strong focus:border-primary focus:ring-primary/15";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-[13px] font-medium tracking-wide text-foreground"
      >
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-12 w-full rounded-lg border bg-white px-4 text-[15px] text-foreground placeholder:text-muted-foreground transition-all duration-200 ease-out outline-none focus:ring-4",
          stateClasses,
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={describedBy} role="alert" className="text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}