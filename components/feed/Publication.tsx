"use client";
import { Heart, MessageSquareShare } from "lucide-react";
import { experiencesApi, formatLikes } from "@/lib/data/publications";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./VideoPlayer";
import { PublicationMeta } from "./PublicationMeta";
import { useState } from "react";
import { Publication as PublicationType } from "@/lib/data/types";
import Image from "next/image";

type PublicationProps = {
  publication: PublicationType;
  isActive: boolean;
  className?: string;
};
type FloatingHeart = {
  id: number;
  left: number;
  top: number;
  size: number;
  rotation: number;
};
export function Publication({
  publication,
  isActive,
  className,
}: PublicationProps) {
  const [like, setLike] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [totalLikes, setTotalLikes] = useState(publication.likes);
  const handleLike = async () => {
    const newHearts = Array.from({ length: 5 }, (_, index) => ({
      id: Date.now() + index,
      left: Math.random() * 80 + 10, // 10% - 90%
      top: Math.random() * 70 + 15, // 15% - 85%
      size: Math.random() * 20 + 40, // 40px - 60px
      rotation: Math.random() * 40 - 20, // -20° a 20°
    }));

    setHearts(newHearts);
    setLike(true);
    experiencesApi.like(publication.id);
    setTotalLikes(publication.likes + 1);
    setTimeout(() => {
      setLike(false);
      setHearts([]);
    }, 600);
  };
  const text = "Quiero que veas este producto de Beland";
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/publication/${publication.id}`;
    // 1. Verificamos si el navegador soporta Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: publication.name,
          text: text,
          url: shareUrl,
        });
      } catch (error) {
        // Ignoramos el error si el usuario simplemente canceló el menú de compartir
        if ((error as Error).name !== "AbortError") {
          console.error("Error al compartir:", error);
        }
      }
    } else {
      // 2. Fallback opcional si el navegador no soporta la API (ej. copiar al portapapeles)
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Enlace copiado al portapapeles");
      } catch (err) {
        console.error("Error al copiar el enlace:", err);
      }
    }
  };
  return (
    <article
      data-publication-id={publication.id}
      className={cn(
        "relative h-full w-full snap-start overflow-hidden bg-black",
        className,
      )}
    >
      {like && (
        <div className="pointer-events-none absolute inset-0 z-50">
          {hearts.map((heart) => (
            <Heart
              key={heart.id}
              aria-hidden="true"
              className="absolute animate-pop duration-200"
              style={{
                left: `${heart.left}%`,
                top: `${heart.top}%`,
                width: `${heart.size}px`,
                height: `${heart.size}px`,
                transform: `rotate(${heart.rotation}deg)`,
              }}
              color="red"
              fill="red"
            />
          ))}
        </div>
      )}
      {publication.video_url && publication.video_url !== "" ? (
        <VideoPlayer src={publication.video_url} isActive={isActive} />
      ) : (
        <Image
          src={publication.image_url}
          fill
          alt={`Imagen del producto ${publication.name}`}
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/5 to-black/30"
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 pb-8">
        <PublicationMeta
          publication={publication}
          active={isActive}
          className="flex-1"
        />

        <div
          className={cn(
            "flex shrink-0 flex-col items-center gap-1.5 pb-2",
            isActive && "animate-meta-in",
          )}
        >
          <button
            type="button"
            onClick={handleShare}
            aria-label={`compartir publicación`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 ease-out outline-none hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/40 active:scale-95"
          >
            <MessageSquareShare />
          </button>
          <button
            type="button"
            onClick={handleLike}
            aria-label={`${formatLikes(totalLikes)} me gusta`}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 ease-out outline-none hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/40 active:scale-95"
          >
            <Heart
              className="h-5 w-5"
              aria-hidden="true"
              color={like ? "red" : "white"}
              fill={like ? "red" : "white"}
            />
          </button>
          <span className="text-xs font-medium text-white">
            {formatLikes(totalLikes)}
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[15%] right-2  z-40 flex justify-center md:bottom-[18%]"></div>
    </article>
  );
}
