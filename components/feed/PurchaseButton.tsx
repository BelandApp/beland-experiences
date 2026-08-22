"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/data/publications";
import { cn } from "@/lib/utils";

type PurchaseButtonProps = {
  productId: string;
  productName: string;
  price: number;
  className?: string;
};

export function PurchaseButton({
  productId,
  productName,
  price,
  className,
}: PurchaseButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/checkout?product=${productId}`)}
      aria-label={`Comprar ${productName} por ${formatPrice(price)}`}
      className={cn(
        "inline-flex h-13 items-center gap-2.5 rounded-full bg-primary px-7 text-[15px] font-semibold tracking-wide text-primary-foreground shadow-lift outline-none transition-all duration-200 ease-out hover:bg-primary-hover focus-visible:ring-4 focus-visible:ring-primary/25 active:scale-95",
        className,
      )}
    >
      <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
      Comprar
      <span
        aria-hidden="true"
        className="font-medium text-primary-foreground/85"
      >
        {formatPrice(price)}
      </span>
    </button>
  );
}
