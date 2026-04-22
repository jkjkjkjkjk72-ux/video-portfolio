"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import VideoPlayer from "@/components/VideoPlayer";
import StillsGallery from "@/components/StillsGallery";
import type { Work } from "@/data/works";

/* ── helpers ────────────────────────────────────────────────────── */
function MetaTable({ work }: { work: Work }) {
  const directorCredit = work.credits.find(
    (c) => c.role.toLowerCase() === "director"
  );
  const rows = [
    { label: "Client", value: work.client },
    { label: "Year", value: String(work.year) },
    { label: "Genre", value: work.genre.join(", ") },
    ...(directorCredit
      ? [{ label: directorCredit.role, value: directorCredit.name }]
      : []),
  ];
  return (
    <dl className="flex flex-col gap-5">
      {rows.map(({ label, value }) => (
        <div key={label}>
          <dt className="font-mono-meta text-gray-400 dark:text-gray-600 mb-1">
            {label}
          </dt>
          <dd className="font-mono text-sm leading-relaxed">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: "-70px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── main component ─────────────────────────────────────────────── */
interface Props {
  work: Work;
  prev: Work | null;
  next: Work | null;
}

export default function WorkDetailContent({ work, prev, next }: Props) {
  return (
    <article className="max-w-7xl mx-auto px-6 pt-10 pb-28">

      {/* ── Video ─────────────────────────────────────────────── */}
      <VideoPlayer
        videoProvider={work.videoProvider}
        videoId={work.videoId}
        controls
        title={work.title}
      />

      {/* ── Project info ──────────────────────────────────────── */}
      {/*
       * CSS grid reorder trick:
       *   Mobile (1-col): Title → Meta → Description (DOM order)
       *   Desktop (3-col): [Title  col 1-2] [Meta col 3, row-span 2]
       *                    [Desc   col 1-2] [Meta continues        ]
       */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-14">

        {/* Title */}
        <motion.div
          className="md:col-span-2 pb-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-5xl sm:text-6xl font-sans font-light tracking-tighter leading-[1.05]">
            {work.title}
          </h1>
        </motion.div>

        {/* Meta — right column on desktop, between title & desc on mobile */}
        <motion.div
          className="
            md:row-span-2 pb-8 md:pb-0
            border-b border-gray-100 dark:border-gray-900
            md:border-b-0 md:border-l md:border-gray-100 md:dark:border-gray-900 md:pl-10 pt-1
          "
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
        >
          <MetaTable work={work} />
        </motion.div>

        {/* Description */}
        <motion.div
          className="md:col-span-2 pt-6 md:pt-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-gray-600 dark:text-gray-400 leading-[1.85] text-base">
            {work.description}
          </p>
        </motion.div>
      </div>

      {/* ── Credits ───────────────────────────────────────────── */}
      <Reveal className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-900">
        <h2 className="font-mono-meta text-gray-400 dark:text-gray-600 mb-7">
          Credits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
          {work.credits.map(({ role, name }, i) => (
            <div key={`${role}-${i}`} className="flex items-baseline gap-3">
              <span className="font-mono-meta text-gray-400 dark:text-gray-600 min-w-[120px] shrink-0">
                {role}
              </span>
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Stills gallery ────────────────────────────────────── */}
      {work.stills.length > 0 && (
        <Reveal className="mt-16 pt-10 border-t border-gray-100 dark:border-gray-900">
          <h2 className="font-mono-meta text-gray-400 dark:text-gray-600 mb-7">
            Stills
          </h2>
          <StillsGallery stills={work.stills} title={work.title} />
        </Reveal>
      )}

      {/* ── Prev / Next ───────────────────────────────────────── */}
      <nav
        aria-label="Project navigation"
        className="mt-20 pt-10 border-t border-gray-100 dark:border-gray-900 grid grid-cols-2"
      >
        <div>
          {prev && (
            <Link
              href={`/work/${prev.slug}`}
              className="group inline-flex flex-col gap-1.5"
            >
              <span className="flex items-center gap-1.5 font-mono-meta text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                <ArrowLeft
                  size={11}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />
                Previous
              </span>
              <span className="font-sans text-sm font-medium group-hover:opacity-60 transition-opacity duration-200 max-w-[20ch] leading-snug">
                {prev.title}
              </span>
            </Link>
          )}
        </div>

        <div className="flex flex-col items-end">
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group inline-flex flex-col gap-1.5 items-end"
            >
              <span className="flex items-center gap-1.5 font-mono-meta text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                Next
                <ArrowRight
                  size={11}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
              <span className="font-sans text-sm font-medium group-hover:opacity-60 transition-opacity duration-200 max-w-[20ch] leading-snug text-right">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
