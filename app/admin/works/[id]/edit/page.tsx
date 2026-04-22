import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { WorkRow } from "@/lib/works";
import WorkForm from "@/components/admin/WorkForm";

interface Props {
  params: { id: string };
}

export default async function EditWorkPage({ params }: Props) {
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) notFound();

  const work = data as WorkRow;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 font-mono-meta text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors mb-6"
        >
          <ArrowLeft size={11} strokeWidth={1.5} />
          Dashboard
        </Link>
        <p className="font-mono-meta text-gray-400 dark:text-gray-600 mb-1">Editing</p>
        <h1 className="text-2xl font-bold tracking-tight">{work.title}</h1>
      </div>

      <WorkForm initialData={work} workId={work.id} />
    </div>
  );
}
