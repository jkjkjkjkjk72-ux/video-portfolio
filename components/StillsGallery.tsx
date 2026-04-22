"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface StillsGalleryProps {
  stills: string[];
  title: string;
}

export default function StillsGallery({ stills, title }: StillsGalleryProps) {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = stills.map((src) => ({ src }));

  const openAt = (i: number) => {
    setLightboxIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
        {stills.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.07,
              ease: [0.4, 0, 0.2, 1],
            }}
            viewport={{ once: true, margin: "-40px" }}
            className="relative aspect-video overflow-hidden bg-gray-900 dark:bg-gray-950 group cursor-zoom-in"
            aria-label={`${title} — still ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${title} still ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 group-hover:opacity-75"
            />
          </motion.button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.96)" },
          button: { filter: "invert(0.4)" },
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
