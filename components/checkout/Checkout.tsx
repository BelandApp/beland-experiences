"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Publication } from "@/lib/data/types";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { OrderSummary } from "./OrderSummary";
import {
  PaymentMethodSelector,
  type PaymentMethod,
} from "./PaymentMethodSelector";
import { PayphoneModal } from "./PayphoneModal";
import { CashPaymentForm } from "./CashPaymentForm";
import { TransferPaymentForm } from "./TransferPaymentForm";

type CheckoutProps = {
  publication: Publication;
};

export function Checkout({ publication }: CheckoutProps) {
  const [method, setMethod] = useState<PaymentMethod>(undefined);
  const [totalAmount, setTotalAmount] = useState(publication.price);
  const [quantity, setQuantity] = useState(1);
  const [payphoneOpen, setPayphoneOpen] = useState(false);
  const handleChange = (equation: "+" | "-") => {
    if (quantity === 0 && equation === "-") return;
    if (quantity === 5 && equation === "+") return;
    if (equation === "+") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => prev - 1);
    }
    setTotalAmount(publication.price * quantity);
  };
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

        <OrderSummary
          quantity={quantity}
          publication={publication}
          onChange={handleChange}
        />

        {method === undefined ? (
          <PaymentMethodSelector value={method} onChange={setMethod} />
        ) : (
          <Button
            className="w-fit"
            variant="outline"
            onClick={() => setMethod(undefined)}
          >
            <ArrowLeft size={12} />
            <span className="text-sm">Cambiar método</span>
          </Button>
        )}
        {method === "payphone" && (
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
        )}
        {method === "cash" && (
          <CashPaymentForm quantity={quantity} publication={publication} />
        )}
        {method === "transfer" && (
          <TransferPaymentForm quantity={quantity} publication={publication} />
        )}
      </main>

      <PayphoneModal
        quantity={quantity}
        totalAmount={totalAmount}
        publication={publication}
        open={payphoneOpen}
        onClose={() => setPayphoneOpen(false)}
      />
    </div>
  );
}
