"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Pencil, Trash2, Star } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { WorkRow } from "@/lib/works";

type Cols = Pick<WorkRow, "id" | "slug" | "title" | "client" | "year" | "featured" | "order">;

export default function WorksTable() {
  const [works, setWorks] = useState<Cols[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("works")
      .select("id, slug, title, client, year, featured, order")
      .order("order", { ascending: true });
    setWorks((data as Cols[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}"을(를) 삭제하시겠습니까?`)) return;
    await supabase.from("works").delete().eq("id", id);
    load();
  };

  if (loading) {
    return (
      <p className="font-mono text-sm text-gray-400 py-10 text-center">Loading...</p>
    );
  }

  if (works.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-gray-200 dark:border-gray-800">
        <p className="font-mono text-sm text-gray-400 mb-4">No works yet.</p>
        <Link href="/admin/works/new" className="font-mono-meta text-gray-600 dark:text-gray-400 underline">
          Add the first one →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-900">
            {["#", "Title", "Client", "Year", "Featured", ""].map((h) => (
              <th
                key={h}
                className="text-left font-mono-meta text-gray-400 dark:text-gray-600 pb-3 pr-6 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {works.map((w) => (
            <tr
              key={w.id}
              className="border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
            >
              <td className="py-3 pr-6 font-mono text-xs text-gray-400 dark:text-gray-600 w-8">
                {w.order}
              </td>
              <td className="py-3 pr-6 font-medium max-w-[200px] truncate">
                {w.title}
              </td>
              <td className="py-3 pr-6 font-mono text-xs text-gray-500 dark:text-gray-500">
                {w.client}
              </td>
              <td className="py-3 pr-6 font-mono text-xs text-gray-500 dark:text-gray-500">
                {w.year}
              </td>
              <td className="py-3 pr-6">
                {w.featured && (
                  <Star size={12} className="text-gray-400" fill="currentColor" />
                )}
              </td>
              <td className="py-3 flex items-center gap-3 justify-end">
                <Link
                  href={`/admin/works/${w.id}/edit`}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  title="Edit"
                >
                  <Pencil size={14} strokeWidth={1.5} />
                </Link>
                <button
                  onClick={() => handleDelete(w.id, w.title)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
