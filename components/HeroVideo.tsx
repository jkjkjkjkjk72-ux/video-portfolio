"use client";

interface HeroVideoProps {
  videoProvider: "vimeo" | "youtube";
  videoId: string;
  title?: string;
}

export default function HeroVideo({
  videoProvider,
  videoId,
  title = "Hero reel",
}: HeroVideoProps) {
  const src =
    videoProvider === "vimeo"
      ? `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&muted=1&loop=1&controls=0&byline=0&portrait=0&title=0&dnt=1`
      : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&playlist=${videoId}&rel=0&modestbranding=1&playsinline=1&disablekb=1`;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/*
       * Scale the iframe well beyond 100% so it fills the container
       * regardless of the viewport aspect ratio vs. the video's 16:9.
       */}
      <iframe
        src={src}
        allow="autoplay; fullscreen"
        allowFullScreen
        title={title}
        className="
          absolute border-0 pointer-events-none
          w-[200%] h-[200%]
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          min-w-[177.78vh] min-h-[56.25vw]
        "
      />
    </div>
  );
}
