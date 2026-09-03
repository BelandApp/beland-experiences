"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  fallback?: string;
};

export function ImageCarousel({ images, alt, fallback }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((current) =>
        current === images.length - 1 ? 0 : current + 1,
      );
    }, 3500);

    return () => window.clearInterval(interval);
  }, [images.length, isPaused]);

  if (images.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span
          aria-hidden="true"
          className="font-display text-7xl font-semibold tracking-tight text-primary/25"
        >
          {fallback}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full"
      // onMouseEnter={() => setIsPaused(true)}
      // onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={image}
              alt={`${alt} - imagen ${index + 1}`}
              width={450}
              height={450}
              className="object-fill"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-primary/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
