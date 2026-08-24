"use client";
import { Logo } from "@/components/ui/Logo";
import { Publication } from "./Publication";
import { Button } from "../ui/Button";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
import { useFeed } from "./hooks/useFeed";
import { Spinner } from "../ui/Spinner";
interface FeedProps {
  initialActiveId?: string;
}
export const Feed: React.FC<FeedProps> = ({ initialActiveId }) => {
  const {
    publications,
    isFirst,
    isLast,
    containerRef,
    scrollToPublication,
    active,
    loading,
  } = useFeed(initialActiveId);

  if (loading)
    return (
      <main className="flex flex-col gap-2 h-dvh bg-black items-center justify-center p-12">
        <Logo animated />
        <span className="text-white">Cargando productos únicos para ti</span>
        <Spinner />
      </main>
    );

  if (publications.length === 0)
    return (
      <main className="flex flex-col h-dvh bg-black p-12">
        <header className="hidden md:flex items-center justify-between px-5">
          <Logo />
          <Button target="_blank" href="https:beland.app/Login">
            Conoce nuestra App <ArrowUpRight />
          </Button>
        </header>
        <div className="flex flex-col gap-2 m-auto items-center justify-center">
          <span className="text-white text-center">
            Lamentablemente no encontramos productos de experiencia, pero puedes
            ver las novedades en nuestra app:
          </span>
          <Button target="_blank" href="https:beland.app/Login">
            Conoce nuestra App <ArrowUpRight />
          </Button>
        </div>
      </main>
    );
  return (
    <main className="relative flex h-dvh flex-col overflow-hidden">
      <header className="hidden md:flex items-center justify-between px-5">
        <Logo />
        <Button target="_blank" href="https:beland.app/Login">
          Conoce nuestra App <ArrowUpRight />
        </Button>
      </header>
      <div className="relative h-full min-h-0 flex-1 md:mx-auto md:w-full md:max-w-100 md:py-5">
        <header className="absolute top-3 z-10 md:hidden">
          <Logo />
        </header>
        <div
          ref={containerRef}
          className="h-full snap-y snap-mandatory overflow-y-auto no-scrollbar bg-black md:rounded-4xl md:border md:border-border md:shadow-lift"
        >
          {publications.map((publication) => (
            <Publication
              key={publication.id}
              publication={publication}
              isActive={publication.id === active?.id}
            />
          ))}
        </div>
      </div>
      <div className="hidden md:flex absolute right-3 bottom-3 flex-col gap-1 items-center">
        <Button onClick={() => scrollToPublication("up")} disabled={isFirst}>
          <ArrowUp />
        </Button>
        <Button onClick={() => scrollToPublication("down")} disabled={isLast}>
          <ArrowDown />
        </Button>
      </div>
    </main>
  );
};
