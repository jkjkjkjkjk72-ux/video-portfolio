"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import type { default as VimeoPlayer } from "@vimeo/player";

interface HeroSectionProps {
  videoId: string;
  name?: string;
  tagline?: string;
}

export default function HeroSection({
  videoId,
  name = "YOUR NAME",
  tagline = "Director / Editor based in Seoul",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [muted, setMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    let destroyed = false;

    import("@vimeo/player").then(({ default: Player }) => {
      if (destroyed || !containerRef.current) return;

      const player = new Player(containerRef.current, {
        id: parseInt(videoId, 10),
        autoplay: true,
        background: true,
        loop: true,
        muted: true,
        controls: false,
        autopause: false,
      });

      playerRef.current = player;
      player.ready().then(() => {
        if (!destroyed) setPlayerReady(true);
      });
    });

    return () => {
      destroyed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [videoId]);

  const toggleMute = async () => {
    if (!playerRef.current) return;
    const newMuted = !muted;
    try {
      await playerRef.current.setMuted(newMuted);
      setMuted(newMuted);
    } catch {
      /* some browsers block unmuting without a prior user gesture */
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Vimeo background video — SDK fills this div */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* darken top for header readability */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/35 to-transparent" />
        {/* blend into page background at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
      </div>

      {/* Mute toggle — top right, appears after player is ready */}
      {playerReady && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={toggleMute}
          className="absolute top-5 right-6 z-20 p-2 text-white/55 hover:text-white transition-colors duration-200"
          aria-label={muted ? "Unmute background video" : "Mute background video"}
        >
          {muted ? (
            <VolumeX size={16} strokeWidth={1.5} />
          ) : (
            <Volume2 size={16} strokeWidth={1.5} />
          )}
        </motion.button>
      )}

      {/* Hero text — bottom centre */}
      <div className="absolute inset-x-0 bottom-0 z-10 pb-20 flex flex-col items-center text-center px-6">
        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="mt-4 font-mono text-sm uppercase tracking-widest text-white/65"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {tagline}
        </motion.p>
      </div>

      {/* Scroll indicator — bottom right */}
      <motion.div
        className="absolute bottom-8 right-8 z-10 text-white/35"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", repeatDelay: 0.4 }}
        aria-hidden="true"
      >
        <ChevronDown size={22} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
