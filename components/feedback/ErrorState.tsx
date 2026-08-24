import Link from "next/link";
import { RotateCcw, XCircle } from "lucide-react";
import type { Publication } from "@/lib/data/types";
import { Logo } from "@/components/ui/Logo";

type ErrorStateProps = {
  publication?: Publication;
  reference?: string;
};

export function ErrorState({ publication, reference }: ErrorStateProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-center border-b border-border">
        <Logo row />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-10">
        <div className="flex flex-col items-center gap-4 text-center animate-fade-in-up">
          <span className="grid h-20 w-20 animate-pop place-items-center rounded-full bg-destructive-soft text-destructive">
            <XCircle className="h-9 w-9" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              El pago no se completó
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              No se realizó ningún cargo a tu cuenta. Puedes intentarlo de nuevo
              o cambiar de método de pago.
            </p>
          </div>
        </div>

        {reference ? (
          <div className="flex items-center justify-between rounded-2xl border border-border bg-white px-5 py-4 shadow-soft animate-fade-in-up">
            <span className="text-sm text-muted">Referencia del intento</span>
            <span className="text-sm font-medium tracking-wide text-foreground">
              {reference}
            </span>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 animate-fade-in-up">
          <Link
            href={
              publication ? `/checkout?product=${publication.id}` : "/checkout"
            }
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-200 ease-out outline-none hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-[0.98]"
          >
            <RotateCcw className="h-4.5 w-4.5" aria-hidden="true" />
            Reintentar pago
          </Link>
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center rounded-full border border-border-strong px-8 text-base font-semibold tracking-wide text-foreground transition-all duration-200 ease-out outline-none hover:bg-surface focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-[0.98]"
          >
            Volver al feed
          </Link>
        </div>
      </main>
    </div>
  );
}
