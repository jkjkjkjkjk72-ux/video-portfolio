"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { WorkRow } from "@/lib/works";

/* ── helpers ────────────────────────────────────────────────── */
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ── style tokens ───────────────────────────────────────────── */
const inputCls =
  "w-full bg-transparent border border-gray-200 dark:border-gray-800 px-3 py-2 text-sm outline-none focus:border-gray-600 dark:focus:border-gray-400 transition-colors duration-200";
const labelCls = "block font-mono-meta text-gray-400 dark:text-gray-600 mb-1.5";
const sectionCls = "pt-8 border-t border-gray-100 dark:border-gray-900";
const sectionTitle = "font-mono-meta text-gray-400 dark:text-gray-600 mb-5";

/* ── types ──────────────────────────────────────────────────── */
interface FormState {
  slug: string;
  title: string;
  client: string;
  year: number;
  genre: string[];
  thumbnail: string;
  preview_video: string;
  video_provider: "vimeo" | "youtube";
  video_id: string;
  credits: { role: string; name: string }[];
  description: string;
  stills: string[];
  featured: boolean;
  order: number;
}

interface Props {
  initialData?: Partial<WorkRow>;
  workId?: string;
}

const defaultState: FormState = {
  slug: "",
  title: "",
  client: "",
  year: new Date().getFullYear(),
  genre: [],
  thumbnail: "",
  preview_video: "",
  video_provider: "vimeo",
  video_id: "",
  credits: [{ role: "", name: "" }],
  description: "",
  stills: [""],
  featured: false,
  order: 0,
};

/* ── component ──────────────────────────────────────────────── */
export default function WorkForm({ initialData, workId }: Props) {
  const router = useRouter();
  const isEditing = Boolean(workId);

  const [form, setForm] = useState<FormState>({
    ...defaultState,
    ...(initialData
      ? {
          slug: initialData.slug ?? "",
          title: initialData.title ?? "",
          client: initialData.client ?? "",
          year: initialData.year ?? new Date().getFullYear(),
          genre: initialData.genre ?? [],
          thumbnail: initialData.thumbnail ?? "",
          preview_video: initialData.preview_video ?? "",
          video_provider: initialData.video_provider ?? "vimeo",
          video_id: initialData.video_id ?? "",
          credits:
            initialData.credits && initialData.credits.length > 0
              ? initialData.credits
              : [{ role: "", name: "" }],
          description: initialData.description ?? "",
          stills:
            initialData.stills && initialData.stills.length > 0
              ? initialData.stills
              : [""],
          featured: initialData.featured ?? false,
          order: initialData.order ?? 0,
        }
      : {}),
  });

  const [genreInput, setGenreInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title when creating
  useEffect(() => {
    if (!isEditing) {
      setForm((prev) => ({ ...prev, slug: slugify(prev.title) }));
    }
  }, [form.title, isEditing]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* genre */
  const handleGenreKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && genreInput.trim()) {
      e.preventDefault();
      if (!form.genre.includes(genreInput.trim())) {
        set("genre", [...form.genre, genreInput.trim()]);
      }
      setGenreInput("");
    }
  };

  /* credits */
  const setCredit = (i: number, field: "role" | "name", val: string) => {
    const next = [...form.credits];
    next[i] = { ...next[i], [field]: val };
    set("credits", next);
  };

  /* stills */
  const setStill = (i: number, val: string) => {
    const next = [...form.stills];
    next[i] = val;
    set("stills", next);
  };

  /* submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      slug: form.slug,
      title: form.title,
      client: form.client,
      year: form.year,
      genre: form.genre,
      thumbnail: form.thumbnail,
      preview_video: form.preview_video.trim() || null,
      video_provider: form.video_provider,
      video_id: form.video_id,
      credits: form.credits.filter((c) => c.role.trim() || c.name.trim()),
      description: form.description,
      stills: form.stills.filter(Boolean),
      featured: form.featured,
      order: form.order,
    };

    try {
      if (isEditing) {
        const { error: err } = await supabase
          .from("works")
          .update(payload)
          .eq("id", workId!);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("works").insert(payload);
        if (err) throw err;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-w-3xl">

      {/* ── Basic info ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className={labelCls}>Title *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            required
            placeholder="Project title"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            required
            placeholder="auto-generated"
            className={`${inputCls} font-mono text-xs`}
          />
        </div>

        <div>
          <label className={labelCls}>Client</label>
          <input
            value={form.client}
            onChange={(e) => set("client", e.target.value)}
            placeholder="Client name"
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Year</label>
          <input
            type="number"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
            min={2000}
            max={2099}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Sort order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
            min={0}
            className={inputCls}
          />
        </div>
      </div>

      {/* ── Genre ──────────────────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Genre</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {form.genre.map((g) => (
            <span
              key={g}
              className="inline-flex items-center gap-1.5 font-mono-meta px-2.5 py-1 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
            >
              {g}
              <button
                type="button"
                onClick={() =>
                  set("genre", form.genre.filter((x) => x !== g))
                }
                className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
        <input
          value={genreInput}
          onChange={(e) => setGenreInput(e.target.value)}
          onKeyDown={handleGenreKey}
          placeholder="장르 입력 후 Enter"
          className={inputCls}
        />
        <p className="font-mono text-xs text-gray-400 dark:text-gray-600 mt-1.5">
          Enter 키로 추가
        </p>
      </div>

      {/* ── Video ──────────────────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Video</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Provider</label>
            <select
              value={form.video_provider}
              onChange={(e) =>
                set("video_provider", e.target.value as "vimeo" | "youtube")
              }
              className={`${inputCls} cursor-pointer`}
            >
              <option value="vimeo">Vimeo</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Video ID *</label>
            <input
              value={form.video_id}
              onChange={(e) => set("video_id", e.target.value)}
              required
              placeholder="e.g. 76979871"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── Thumbnail & Preview ────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Thumbnail &amp; Preview</p>
        <div className="flex flex-col gap-5">
          <div>
            <label className={labelCls}>Thumbnail URL *</label>
            <input
              value={form.thumbnail}
              onChange={(e) => set("thumbnail", e.target.value)}
              required
              placeholder="https://..."
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Preview Video URL (optional)</label>
            <input
              value={form.preview_video}
              onChange={(e) => set("preview_video", e.target.value)}
              placeholder="https://...mp4 (카드 hover 시 재생)"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── Description ────────────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Description</p>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={5}
          placeholder="프로젝트 설명..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* ── Credits ────────────────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Credits</p>
        <div className="flex flex-col gap-3">
          {form.credits.map((credit, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={credit.role}
                onChange={(e) => setCredit(i, "role", e.target.value)}
                placeholder="Role"
                className={`${inputCls} flex-1`}
              />
              <input
                value={credit.name}
                onChange={(e) => setCredit(i, "name", e.target.value)}
                placeholder="Name"
                className={`${inputCls} flex-1`}
              />
              {form.credits.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    set("credits", form.credits.filter((_, idx) => idx !== i))
                  }
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            set("credits", [...form.credits, { role: "", name: "" }])
          }
          className="mt-3 inline-flex items-center gap-1.5 font-mono-meta text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <Plus size={12} />
          Add credit
        </button>
      </div>

      {/* ── Stills ─────────────────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Stills</p>
        <div className="flex flex-col gap-3">
          {form.stills.map((url, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                value={url}
                onChange={(e) => setStill(i, e.target.value)}
                placeholder={`Still ${i + 1} URL (https://...)`}
                className={`${inputCls} flex-1`}
              />
              {form.stills.length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    set("stills", form.stills.filter((_, idx) => idx !== i))
                  }
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <X size={14} strokeWidth={1.5} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => set("stills", [...form.stills, ""])}
          className="mt-3 inline-flex items-center gap-1.5 font-mono-meta text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <Plus size={12} />
          Add still
        </button>
      </div>

      {/* ── Options ────────────────────────────────────────── */}
      <div className={sectionCls}>
        <p className={sectionTitle}>Options</p>
        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-4 h-4 accent-gray-900 dark:accent-gray-100"
          />
          <span className="font-mono-meta text-gray-600 dark:text-gray-400">
            Featured (홈 페이지 노출)
          </span>
        </label>
      </div>

      {/* ── Submit ─────────────────────────────────────────── */}
      <div className="flex items-center gap-6 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 font-mono-meta border border-gray-900 dark:border-gray-100 px-8 py-3 hover:bg-gray-900 hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-200 disabled:opacity-40"
        >
          {loading && <Loader2 size={13} className="animate-spin" />}
          {loading ? "Saving..." : isEditing ? "Save changes" : "Publish work"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="font-mono-meta text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>

      {error && (
        <p className="font-mono text-xs text-red-500 mt-2">{error}</p>
      )}
    </form>
  );
}
