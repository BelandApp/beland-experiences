"use client";
import { Check } from "lucide-react";
import type { Publication } from "@/lib/data/types";
import { formatPrice } from "@/lib/data/publications";
import { Logo } from "@/components/ui/Logo";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useState } from "react";
import Image from "next/image";

type SuccessStateProps = {
  publication?: Publication;
  reference?: string;
  transactionId?: string;
};

export function SuccessState({
  publication,
  reference,
  transactionId,
}: SuccessStateProps) {
  const [email, setEmail] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("email-order");
  });

  const handleClaim = async () => {
    try {
      if (!email) return;
      localStorage.removeItem("email-order");
      window.location.href = "https://beland.app/Login";
    } catch (error) {
      console.error(error);
    }
  };
  const COMMUNICATE = `https://wa.me/593995269974?text=Hola,%20realicé%20la%20compra%20de%20un%20${publication?.name ? publication.name : "Producto"}%20con%20este%20código%20de%20compra%20${transactionId}%20donde%20lo%20retiro?`;
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-center border-b border-border">
        <Logo row />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-10">
        <div className="flex flex-col items-center gap-4 text-center animate-fade-in-up">
          <span className="grid h-20 w-20 animate-pop place-items-center rounded-full bg-success-soft text-success">
            <Check className="h-9 w-9" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              ¡Compra realizada!
            </h1>
            <p className="text-sm leading-relaxed text-muted">
              Recibimos tu pago. En breve recibirás la confirmación y los
              detalles de envío en tu correo.
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
          {transactionId ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Transacción</span>
              <span className="text-sm font-medium tracking-wide text-foreground">
                {transactionId}
              </span>
            </div>
          ) : null}
        </div>
        <span>
          Ademas ganaste {publication ? publication.price * 0.5 : null} Becoins!
        </span>
        {!email && (
          <Input
            label="email"
            className=""
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <span>
          Regístrate con este mismo correo {email} para recibirla en tu
          billetera.
        </span>
        <Button
          disabled={!email}
          onClick={handleClaim}
          className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all duration-200 ease-out outline-none hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Reclamar
        </Button>

        <Button
          className="inline-flex h-14 items-center justify-center rounded-full bg-green-600! px-8 text-base font-semibold text-primary-foreground transition-all duration-200 ease-out outline-none hover:bg-green-700 focus-visible:ring-4 focus-visible:ring-primary/20 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
          href={COMMUNICATE}
        >
          <Image width={30} height={30} alt="" src={"/whatsapp.svg"} />
          Comunicarme por mi compra
        </Button>
      </main>
    </div>
  );
}
