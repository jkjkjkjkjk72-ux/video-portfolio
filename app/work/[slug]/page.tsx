import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getWorkBySlug, getAllSlugs, getAdjacentWorks } from "@/lib/works";
import WorkDetailContent from "@/components/WorkDetailContent";

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return []; // DB 미준비 시 빌드 통과, 첫 요청 때 SSR
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = await getWorkBySlug(params.slug);
  if (!work) return { title: "Not Found" };
  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const [work, { prev, next }] = await Promise.all([
    getWorkBySlug(params.slug),
    getAdjacentWorks(params.slug),
  ]);

  if (!work) notFound();

  return <WorkDetailContent work={work} prev={prev} next={next} />;
}
