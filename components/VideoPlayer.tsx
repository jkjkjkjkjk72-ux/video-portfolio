"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  videoProvider: "vimeo" | "youtube";
  videoId: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  title?: string;
}

function buildVimeoUrl(
  videoId: string,
  { autoplay, muted, loop, controls }: Omit<VideoPlayerProps, "videoProvider" | "videoId" | "className" | "title">
): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    muted: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    controls: controls ? "1" : "0",
    background: !controls ? "1" : "0",
    byline: "0",
    portrait: "0",
    title: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}

function buildYouTubeUrl(
  videoId: string,
  { autoplay, muted, loop, controls }: Omit<VideoPlayerProps, "videoProvider" | "videoId" | "className" | "title">
): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: muted ? "1" : "0",
    loop: loop ? "1" : "0",
    controls: controls ? "1" : "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    ...(loop ? { playlist: videoId } : {}),
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export default function VideoPlayer({
  videoProvider,
  videoId,
  autoplay = false,
  muted = true,
  loop = false,
  controls = true,
  className = "",
  title = "Video",
}: VideoPlayerProps) {
  const src =
    videoProvider === "vimeo"
      ? buildVimeoUrl(videoId, { autoplay, muted, loop, controls })
      : buildYouTubeUrl(videoId, { autoplay, muted, loop, controls });

  const allow = [
    "accelerometer",
    autoplay ? "autoplay" : "",
    "clipboard-write",
    "encrypted-media",
    "gyroscope",
    "picture-in-picture",
    "fullscreen",
  ]
    .filter(Boolean)
    .join("; ");

  return (
    <div className={`relative w-full aspect-video bg-black overflow-hidden ${className}`}>
      <iframe
        src={src}
        title={title}
        allow={allow}
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
      />
    </div>
  );
}
