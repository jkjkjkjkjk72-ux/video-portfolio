import { supabase } from "./supabase";
import type { Work } from "@/data/works";

/** Raw shape returned from Supabase (snake_case) */
export interface WorkRow {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: number;
  genre: string[];
  thumbnail: string;
  preview_video: string | null;
  video_provider: "vimeo" | "youtube";
  video_id: string;
  credits: { role: string; name: string }[];
  description: string;
  stills: string[];
  featured: boolean;
  order: number;
  created_at: string;
}

export function rowToWork(row: WorkRow): Work {
  return {
    slug: row.slug,
    title: row.title,
    client: row.client,
    year: row.year,
    genre: row.genre ?? [],
    thumbnail: row.thumbnail,
    previewVideo: row.preview_video ?? undefined,
    videoProvider: row.video_provider,
    videoId: row.video_id,
    credits: row.credits ?? [],
    description: row.description,
    stills: row.stills ?? [],
  };
}

export async function getAllWorks(): Promise<Work[]> {
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("[getAllWorks]", error.message);
    return [];
  }
  return (data as WorkRow[]).map(rowToWork);
}

export async function getFeaturedWorks(limit = 4): Promise<Work[]> {
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("featured", true)
    .order("order", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("[getFeaturedWorks]", error.message);
    return [];
  }

  // Fallback: if no featured works, return first `limit` works
  if (!data || data.length === 0) {
    const { data: fallback } = await supabase
      .from("works")
      .select("*")
      .order("order", { ascending: true })
      .limit(limit);
    return (fallback as WorkRow[] ?? []).map(rowToWork);
  }

  return (data as WorkRow[]).map(rowToWork);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return rowToWork(data as WorkRow);
}

export async function getAllSlugs(): Promise<string[]> {
  const { data } = await supabase.from("works").select("slug").order("order");
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

/** Returns works immediately before and after the given slug (by order) */
export async function getAdjacentWorks(
  slug: string
): Promise<{ prev: Work | null; next: Work | null }> {
  const all = await getAllWorks();
  const idx = all.findIndex((w) => w.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}
