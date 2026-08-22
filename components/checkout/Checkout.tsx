"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Publication } from "@/lib/data/publications";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";
import {
  PaymentMethodSelector,
  type PaymentMethod,
} from "./PaymentMethodSelector";
import { PayphoneModal } from "./PayphoneModal";
import { CashPaymentForm } from "./CashPaymentForm";

type CheckoutProps = {
  publication: Publication;
};

export function Checkout({ publication }: CheckoutProps) {
  const [method, setMethod] = useState<PaymentMethod>("payphone");
  const [payphoneOpen, setPayphoneOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-md items-center justify-between px-4">
          <Button
            href="/"
            variant="ghost"
            size="sm"
            ariaLabel="Volver al feed"
            className="-ml-2 text-muted"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver
          </Button>
          <Logo row />
          <span className="w-14" aria-hidden="true" />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-6 pb-16">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Finalizar compra
          </h1>
          <p className="text-sm text-muted">
            Elige cómo quieres pagar tu producto.
          </p>
        </div>

        <OrderSummary publication={publication} />

        <PaymentMethodSelector value={method} onChange={setMethod} />

        {method === "payphone" ? (
          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              className="w-full"
              onClick={() => setPayphoneOpen(true)}
            >
              Pagar con Payphone
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Serás redirigido a un entorno seguro de Payphone.
            </p>
          </div>
        ) : (
          <CashPaymentForm publication={publication} />
        )}
      </main>

      <PayphoneModal
        publication={publication}
        open={payphoneOpen}
        onClose={() => setPayphoneOpen(false)}
      />
    </div>
  );
}
