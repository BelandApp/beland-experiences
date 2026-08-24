import { getPublications } from "@/lib/data/publications";
import { useEffect, useRef, useState } from "react";

export const useFeed = () => {
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

  return {
    publications,
    containerRef,
    scrollToPublication,
    active,
    isFirst,
    isLast,
  };
};
