import type { Publication } from "@/lib/data/types";
import { formatPrice } from "@/lib/data/publications";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

type OrderSummaryProps = {
  publication: Publication;
  quantity: number;
  onChange: (equation: "+" | "-") => void;
  reference?: string;
  compact?: boolean;
};

export function OrderSummary({
  publication,
  reference,
  quantity,
  onChange,
  compact = false,
}: OrderSummaryProps) {
  console.log(publication.images_url);
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-white shadow-soft ${compact ? "" : ""}`}
    >
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-linear-to-br from-primary-soft via-surface to-surface">
        <ImageCarousel
          images={publication.images_url!}
          alt={`Fotos de ${publication.name}`}
          fallback={publication.name.charAt(0)}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-t from-white/80 to-transparent"
        />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              {publication.creator}
            </p>
            <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
              {publication.name}
            </h3>
          </div>
          <p className="shrink-0 text-lg font-semibold tracking-tight text-foreground">
            {formatPrice(publication.price)}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          {publication.description}
        </p>
        <div className="flex flex-row gap-2">
          <button
            disabled={quantity <= 1}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onChange("-")}
          >
            <MinusCircle color="orange" />
          </button>
          <span className="font-semibold">{quantity}</span>
          <button
            disabled={quantity >= 5}
            className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onChange("+")}
          >
            <PlusCircle color="orange" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <Badge variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted">Subtotal · {quantity} unidad</span>
          <span className="font-semibold text-foreground">
            {formatPrice(publication.price * quantity)}
          </span>
        </div>
        {reference ? (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Referencia</span>
            <span className="font-medium tracking-wide text-foreground">
              {reference}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
