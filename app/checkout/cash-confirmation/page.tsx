import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Home } from "lucide-react";
import { experiencesApi, formatPrice } from "@/lib/data/publications";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Pedido registrado — Maroon",
};

export default async function CashConfirmationPage(
  props: PageProps<"/checkout/cash-confirmation">,
) {
  const searchParams = await props.searchParams;
  const productId = Array.isArray(searchParams.product)
    ? searchParams.product[0]
    : searchParams.product;
  const name = Array.isArray(searchParams.name)
    ? searchParams.name[0]
    : searchParams.name;
  const reference = Array.isArray(searchParams.ref)
    ? searchParams.ref[0]
    : searchParams.ref;

  const publication = await experiencesApi.getById(productId!);

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-center border-b border-border">
        <Logo />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-10">
        <div className="flex flex-col items-center gap-4 text-center animate-fade-in-up">
          <span className="grid h-20 w-20 animate-pop place-items-center rounded-full bg-success-soft text-success">
            <Gift className="h-8 w-8" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              ¡Pedido registrado!
            </h1>
            <span>
              Gracias
              {name ? <span className="capitalize">, {name}.</span> : ""}
            </span>
            <p className="text-sm leading-relaxed text-muted">
              Tu pedido quedó reservado. Nos pondremos en contacto contigo para
              coordinar el pago en efectivo y la entrega.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-5 shadow-soft animate-fade-in-up">
          {publication ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{publication.name}</span>
              <span className="text-sm font-semibold text-foreground">
                {formatPrice(publication.price)}
              </span>
            </div>
          ) : null}
          {reference ? (
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm text-muted">Referencia</span>
              <span className="text-sm font-medium tracking-wide text-foreground">
                {reference}
              </span>
            </div>
          ) : null}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Pago</span>
            <span className="text-sm font-medium tracking-wide text-foreground">
              Efectivo al recibir
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 animate-fade-in-up">
          <Link
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://beland.app/Login"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-200 ease-out outline-none hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-[0.98]"
          >
            <Gift className="h-4.5 w-4.5" aria-hidden="true" />
            Iniciar sesión para reclamar tu regalo
          </Link>
          <Link
            href="/"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border-strong px-8 text-base font-semibold tracking-wide text-foreground transition-all duration-200 ease-out outline-none hover:bg-surface focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-[0.98]"
          >
            <Home className="h-4.5 w-4.5" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
