import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import WorkGrid from "@/components/WorkGrid";
import { featuredReel } from "@/data/works";
import { getFeaturedWorks } from "@/lib/works";

export const revalidate = 300; // ISR: 5분

export default async function Home() {
  const selectedWorks = await getFeaturedWorks(4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <HeroSection
        videoId={featuredReel.videoId}
        name="YOUR NAME"
        tagline="Director / Editor based in Seoul"
      />

      {/* ── Selected Work ─────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <p className="font-mono text-sm text-gray-400 dark:text-gray-600 mb-10">
          — Selected Work
        </p>

        {selectedWorks.length > 0 ? (
          <WorkGrid works={selectedWorks} columns={2} />
        ) : (
          <p className="font-mono text-sm text-gray-400 py-10">
            No featured works yet.
          </p>
        )}

        <div className="mt-12 flex justify-end">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
          >
            View all work
            <ArrowRight
              size={12}
              strokeWidth={1.5}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center border-t border-gray-100 dark:border-gray-900">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          Let&apos;s make something.
        </h2>
        <div className="mt-10">
          <a
            href="mailto:hello@studio.com"
            className="font-mono text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity duration-200 border-b border-current pb-0.5"
          >
            hello@studio.com
          </a>
        </div>
      </section>
    </>
  );
}
