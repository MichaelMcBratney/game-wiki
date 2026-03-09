"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function titleToSlug(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "untitled";
}

type Category = { id: string; name: string };

type NewPageFormProps = {
  categories: Category[];
};

export function NewPageForm({ categories }: NewPageFormProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === titleToSlug(title)) {
      setSlug(titleToSlug(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/wiki/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim() || titleToSlug(title),
          categoryId: categoryId || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || res.statusText);
      }
      router.push(`/wiki/${data.slug}/edit`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create page");
    } finally {
      setCreating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-wiki-muted mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. Fire Sword"
          className="w-full rounded-lg border border-wiki-border bg-wiki-surface px-3 py-2 text-gray-200 placeholder:text-wiki-muted focus:outline-none focus:ring-2 focus:ring-wiki-accent"
          required
          autoFocus
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-wiki-muted mb-1">
          URL slug (optional)
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. fire-sword"
          className="w-full rounded-lg border border-wiki-border bg-wiki-surface px-3 py-2 text-gray-200 placeholder:text-wiki-muted focus:outline-none focus:ring-2 focus:ring-wiki-accent font-mono text-sm"
        />
        <p className="text-wiki-muted text-xs mt-1">
          Used in the page URL: /wiki/{slug || "…"}
        </p>
      </div>
      {categories.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-wiki-muted mb-1">
            Category (optional)
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-wiki-border bg-wiki-surface px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-wiki-accent"
          >
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {error && (
        <p className="text-wiki-danger text-sm">{error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={creating}
          className="px-4 py-2 rounded-lg bg-wiki-accent text-white hover:bg-wiki-accent-hover disabled:opacity-50"
        >
          {creating ? "Creating…" : "Create page"}
        </button>
        <Link
          href="/wiki"
          className="px-4 py-2 rounded-lg border border-wiki-border text-gray-300 hover:bg-wiki-surface"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
