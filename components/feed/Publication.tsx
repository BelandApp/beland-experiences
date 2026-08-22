"use client";

import { Heart } from "lucide-react";
import type { Publication } from "@/lib/data/publications";
import { formatLikes, postLike } from "@/lib/data/publications";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./VideoPlayer";
import { PublicationMeta } from "./PublicationMeta";
import { useState } from "react";

type PublicationProps = {
  publication: Publication;
  isActive: boolean;
  className?: string;
};

export function Publication({
  publication,
  isActive,
  className,
}: PublicationProps) {
  const [like, setLike] = useState(false);
  const handleLike = async () => {
    setLike(!like);
    await postLike(publication.id);
  };
  return (
    <article
      data-publication-id={publication.id}
      className={cn(
        "relative h-full w-full snap-start overflow-hidden bg-black",
        className,
      )}
    >
      <VideoPlayer src={publication.video_url} isActive={isActive} />

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
            onClick={handleLike}
            aria-label={`${formatLikes(publication.likes)} me gusta`}
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
            {formatLikes(publication.likes)}
          </span>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-[15%] right-2  z-40 flex justify-center md:bottom-[18%]"></div>
    </article>
  );
}
