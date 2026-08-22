"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setNotice(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="maria@correo.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" size="lg" className="mt-1 w-full">
        Entrar
      </Button>
      {notice ? (
        <p
          role="status"
          className="flex items-center gap-2 rounded-xl bg-warning-soft px-4 py-3 text-[13px] leading-relaxed text-warning animate-fade-in"
        >
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
          El acceso estará disponible próximamente. Pronto podrás reclamar tu
          regalo aquí.
        </p>
      ) : null}
    </form>
  );
}