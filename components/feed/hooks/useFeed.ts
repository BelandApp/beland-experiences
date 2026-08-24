import { getPublications } from "@/lib/data/publications";
import { useEffect, useRef, useState } from "react";

export const useFeed = (initialActiveId?: string) => {
  const publications = getPublications();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | undefined>(
    initialActiveId || publications[0]?.id,
  );
  // Si abren la página desde una publicación específica, hacemos scroll hasta ella al cargar
  useEffect(() => {
    if (initialActiveId && containerRef.current) {
      const card = containerRef.current.querySelector<HTMLElement>(
        `[data-publication-id="${initialActiveId}"]`,
      );
      if (card) {
        card.scrollIntoView();
      }
    }
  }, [initialActiveId]);

  // Actualizar la publication activa por observer
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
          const newId =
            visible.target.getAttribute("data-publication-id") ?? undefined;
          setActiveId(newId);

          // actualiza la URL en la barra de direcciones mientras hace scroll sin recargar la página:
          if (newId) {
            window.history.replaceState(null, "", `/publication/${newId}`);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // cambiar de publicación por button
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

  // valores derivados
  const activeIndex = publications.findIndex(
    (publication) => publication.id === activeId,
  );

  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= publications.length - 1;

  const active =
    publications.find((publication) => publication.id === activeId) ??
    publications[0];

  return {
    publications,
    containerRef,
    scrollToPublication,
    active,
    isFirst,
    isLast,
  };
};
