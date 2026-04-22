import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";
import { getAllWorks } from "@/lib/works";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work",
  description: "All video projects — commercials, documentaries, music videos, and more.",
};

export default async function WorkPage() {
  const works = await getAllWorks();
  const allGenres = Array.from(new Set(works.flatMap((w) => w.genre))).sort();

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="pt-32 pb-12">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
          Work
        </h1>
        <p className="mt-4 font-mono text-sm opacity-60">
          {works.length} {works.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="py-12">
        <WorkPageContent works={works} genres={allGenres} />
      </div>
    </div>
  );
}
