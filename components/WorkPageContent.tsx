"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import WorkCard from "./WorkCard";
import type { Work } from "@/data/works";

const chip = "font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-200 cursor-pointer whitespace-nowrap";
const chipOn = "border-gray-900 dark:border-gray-100 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900";
const chipOff = "border-gray-300 dark:border-gray-800 text-gray-400 hover:border-gray-600 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-gray-300";

interface Props {
  works: Work[];
  genres: string[];
}

export default function WorkPageContent({ works, genres }: Props) {
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const filtered = activeGenre
    ? works.filter((w) => w.genre.includes(activeGenre))
    : works;

  const toggle = (g: string) => setActiveGenre((prev) => (prev === g ? null : g));

  return (
    <>
      {/* Genre filter chips — horizontally scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-14 [scrollbar-width:none] [-webkit-overflow-scrolling:touch]">
        <button
          onClick={() => setActiveGenre(null)}
          className={`${chip} ${activeGenre === null ? chipOn : chipOff}`}
        >
          All
        </button>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => toggle(g)}
            className={`${chip} ${activeGenre === g ? chipOn : chipOff}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Grid with filter reflow animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="col-span-full font-mono text-sm text-center py-24 opacity-40">
          No works in this genre.
        </p>
      )}
    </>
  );
}
