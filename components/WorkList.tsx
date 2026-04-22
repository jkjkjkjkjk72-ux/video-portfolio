"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WorkCard from "./WorkCard";
import type { Work } from "@/data/works";

interface WorkListProps {
  works: Work[];
  genres: string[];
}

export default function WorkList({ works, genres }: WorkListProps) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = activeGenre
    ? works.filter((w) => w.genre.includes(activeGenre))
    : works;

  const chipBase =
    "font-mono-meta px-3 py-1.5 border transition-colors duration-200 cursor-pointer";
  const chipActive =
    "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900";
  const chipIdle =
    "border-gray-300 dark:border-gray-800 text-gray-400 hover:border-gray-500 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300";

  return (
    <>
      {/* Genre filter chips */}
      <div className="flex flex-wrap gap-2 mb-14">
        <button
          onClick={() => setActiveGenre(null)}
          className={`${chipBase} ${activeGenre === null ? chipActive : chipIdle}`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre === activeGenre ? null : genre)}
            className={`${chipBase} ${activeGenre === genre ? chipActive : chipIdle}`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Work grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="font-mono-meta text-gray-400 text-center py-20">
          No works found.
        </p>
      )}
    </>
  );
}
