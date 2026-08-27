"use client";

import { Banknote, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "payphone" | "cash" | "transfer" | undefined;

type PaymentMethodSelectorProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
};

const methods: Array<{
  id: PaymentMethod;
  title: string;
  description: string;
  icon: typeof CreditCard;
}> = [
  {
    id: "payphone",
    title: "Pagar con Payphone",
    description: "Tarjeta de crédito o débito",
    icon: CreditCard,
  },
  {
    id: "transfer",
    title: "Pagar con transferencia Bancaria",
    description: "Desde tu banco",
    icon: Banknote,
  },
  {
    id: "cash",
    title: "Pagar en efectivo",
    description: "Reserva y paga al recibir",
    icon: Banknote,
  },
];

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Método de pago"
      className="flex flex-col gap-3"
    >
      {methods.map((method) => {
        const Icon = method.icon;
        const selected = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(method.id)}
            className={cn(
              "flex w-full items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-all duration-200 ease-out outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
              selected
                ? "border-primary ring-1 ring-primary"
                : "border-border hover:border-border-strong hover:bg-surface",
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-200",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface text-muted",
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold tracking-wide text-foreground">
                {method.title}
              </span>
              <span className="text-[13px] text-muted">
                {method.description}
              </span>
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "ml-auto grid h-5 w-5 place-items-center rounded-full border transition-colors duration-200",
                selected ? "border-primary bg-primary" : "border-border-strong",
              )}
            >
              {selected ? (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
