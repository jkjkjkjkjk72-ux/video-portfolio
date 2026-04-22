import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { works, getWorkBySlug } from "@/data/works";
import WorkDetailContent from "@/components/WorkDetailContent";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWorkBySlug(params.slug);
  if (!work) return { title: "Not Found" };
  return {
    title: work.title,
    description: work.description,
  };
}

export default function WorkDetailPage({ params }: Props) {
  const work = getWorkBySlug(params.slug);
  if (!work) notFound();

  const idx = works.findIndex((w) => w.slug === params.slug);
  const prev = idx > 0 ? works[idx - 1] : null;
  const next = idx < works.length - 1 ? works[idx + 1] : null;

  return <WorkDetailContent work={work} prev={prev} next={next} />;
}
