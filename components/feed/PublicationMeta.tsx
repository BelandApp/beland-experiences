import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Publication } from "@/lib/data/types";
import { formatPrice } from "@/lib/data/publications";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

type PublicationMetaProps = {
  publication: Publication;
  active: boolean;
  className?: string;
};

export function PublicationMeta({
  publication,
  active,
  className,
}: PublicationMetaProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        active && "animate-meta-in",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
          {publication.creator}
        </p>
        <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight text-white">
          {publication.name}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {publication.tags.map((tag: string) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <Link
        href={`/checkout?product=${publication.id}`}
        className="mt-1 inline-flex h-9 w-fit items-center gap-1.5 rounded-full bg-primary px-4 text-[13px] font-semibold tracking-wide text-white transition-all duration-200 ease-out outline-none hover:bg-white/90 focus-visible:ring-4 focus-visible:ring-white/40 active:scale-[0.97]"
      >
        Comprar · {formatPrice(publication.price)}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
