import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Acceso — Maroon",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center justify-center border-b border-border">
        <Logo />
      </header>

      <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-10">
        <div className="flex flex-col gap-1.5 animate-fade-in-up">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Acceso Maroon
          </h1>
          <p className="text-sm text-muted">
            Inicia sesión para reclamar tu regalo y seguir tus pedidos.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-5 shadow-soft animate-fade-in-up">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}