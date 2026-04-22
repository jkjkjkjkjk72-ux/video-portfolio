"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Work } from "@/data/works";

interface WorkCardProps {
  work: Work;
  index?: number;
}

export default function WorkCard({ work, index = 0 }: WorkCardProps) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const meta = [work.client, String(work.year), work.genre.join(" / ")].join(
    " · "
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      layout
    >
      <Link href={`/work/${work.slug}`} className="group block">
        {/* ── Thumbnail ──────────────────────────────────── */}
        <div
          className="relative aspect-video overflow-hidden bg-gray-900 dark:bg-gray-950"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Static thumbnail — scales on hover */}
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Preview video fades in on top of the scaled image */}
          {work.previewVideo && (
            <video
              ref={videoRef}
              src={work.previewVideo}
              muted
              loop
              playsInline
              preload="none"
              className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-500 ease-out
                ${hovered ? "opacity-100" : "opacity-0"}
              `}
            />
          )}
        </div>

        {/* ── Card info ──────────────────────────────────── */}
        <div className="mt-4">
          <h3 className="text-lg font-medium leading-snug">{work.title}</h3>
          <p className="mt-1 font-mono text-xs opacity-60 uppercase tracking-wider">
            {meta}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
