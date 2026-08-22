"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconButton } from "@/components/ui/IconButton";
import { Spinner } from "@/components/ui/Spinner";

type VideoPlayerProps = {
  src: string;
  isActive: boolean;
  className?: string;
};

export function VideoPlayer({ src, isActive, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      if (ready) {
        video.play().catch(() => undefined);
      } else {
        video.load();
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, ready]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div className={cn("absolute inset-0 bg-black", className)}>
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        loop
        playsInline
        preload={isActive ? "auto" : "metadata"}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
        onLoadStart={() => setReady(false)}
        className="h-full w-full object-cover"
      />
      {!ready && isActive ? (
        <div className="absolute inset-0 grid place-items-center bg-black/30">
          <Spinner size="lg" variant="inverse" />
        </div>
      ) : null}
      <div className="absolute right-3 top-3 z-10">
        <IconButton
          label={muted ? "Activar sonido" : "Silenciar"}
          size="sm"
          onClick={() => setMuted((value) => !value)}
          aria-pressed={!muted}
        >
          {muted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </IconButton>
      </div>
    </div>
  );
}
