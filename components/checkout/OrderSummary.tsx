import type { Publication } from "@/lib/data/publications";
import { formatPrice } from "@/lib/data/publications";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

type OrderSummaryProps = {
  publication: Publication;
  reference?: string;
  compact?: boolean;
};

export function OrderSummary({
  publication,
  reference,
  compact = false,
}: OrderSummaryProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-white shadow-soft ${compact ? "" : ""}`}
    >
      <div className="relative flex h-50 items-center justify-center overflow-hidden bg-linear-to-br from-primary-soft via-surface to-surface">
        <span
          aria-hidden="true"
          className="font-display text-7xl font-semibold tracking-tight text-primary/25"
        >
          {publication.image_url != "" ? (
            <Image
              src={publication.image_url}
              alt={`Foto de ${publication.name}`}
              fill
              objectFit="center"
            />
          ) : (
            <span>{publication.name.charAt(0)}</span>
          )}
        </span>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/80 to-transparent"
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

        <div className="flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <Badge
              key={tag}
              className="border-border-strong bg-surface text-muted backdrop-blur-none"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted">Subtotal · 1 unidad</span>
          <span className="font-semibold text-foreground">
            {formatPrice(publication.price)}
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
