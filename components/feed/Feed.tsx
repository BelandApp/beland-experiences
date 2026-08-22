"use client";

import { useEffect, useRef, useState } from "react";
import { getPublications } from "@/lib/data/publications";
import { Logo } from "@/components/ui/Logo";
import { Publication } from "./Publication";
import { Button } from "../ui/Button";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";
export function Feed() {
  const publications = getPublications();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | undefined>(
    publications[0]?.id,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-publication-id]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveId(
            visible.target.getAttribute("data-publication-id") ?? undefined,
          );
        }
      },
      { root: container, threshold: 0.6 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  const scrollToPublication = (direction: "up" | "down") => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-publication-id]"),
    );

    const currentIndex = cards.findIndex(
      (card) => card.dataset.publicationId === activeId,
    );

    if (currentIndex === -1) return;

    const nextIndex =
      direction === "down" ? currentIndex + 1 : currentIndex - 1;

    const nextCard = cards[nextIndex];

    if (!nextCard) return;

    nextCard.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const activeIndex = publications.findIndex(
    (publication) => publication.id === activeId,
  );

  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= publications.length - 1;

  const active =
    publications.find((publication) => publication.id === activeId) ??
    publications[0];

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
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
    </div>
  );
}
