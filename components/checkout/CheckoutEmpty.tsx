import { ArrowLeft, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function CheckoutEmpty() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="flex h-14 items-center justify-center border-b border-border">
        <Logo />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-surface text-muted">
          <PackageSearch className="h-7 w-7" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-xl font-semibold tracking-tight">
            Producto no encontrado
          </h1>
          <p className="text-sm text-muted">
            No pudimos identificar el producto que quieres comprar.
          </p>
        </div>
        <Button href="/" size="lg">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al feed
        </Button>
      </main>
    </div>
  );
}